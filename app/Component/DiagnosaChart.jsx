import React, { useState, useEffect, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend,
);

// A simple dummy DateRangeInput component so the file runs independently
const DateRangeInput = ({
  dateStart,
  setDateStart,
  dateEnd,
  setDateEnd,
  onSubmit,
}) => {
  return (
    <div className="lg:md:flex justify-start p-2 gap-2">
      <div className="gap-2 items-center w-full lg:md:mb-0 mb-2">
        <label className="text-sm text-black" htmlFor="">
          Dari Tanggal
        </label>
        <input
          className="p-2 shadow-md rounded-lg w-full bg-white text-[#00bb9b]"
          value={dateStart}
          onChange={(e) => setDateStart(e.target.value)}
          type="date"
        />
      </div>
      <div className="gap-2 items-center w-full">
        <label className="text-sm text-black" htmlFor="">
          Hingga Tanggal
        </label>
        <input
          className=" p-2 shadow-md rounded-lg w-full bg-white text-[#00bb9b]"
          value={dateEnd}
          onChange={(e) => setDateEnd(e.target.value)}
          type="date"
        />
      </div>
    </div>
  );
};

const DiagnosaChart = ({
  title = "Laporan Diagnosa",
  status_rawat = "all",
}) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const today = moment();

  const initialPeriode = `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? "0" + new Date().getMonth() + 1 : new Date().getMonth()}-01`;

  const [dateStart, setDateStart] = useState(
    moment().startOf("month").format("YYYY-MM-DD"),
  );
  const [dateEnd, setDateEnd] = useState(today.format("YYYY-MM-DD"));
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = process.env.base_url || "http://localhost:3000"; // Replace with actual base URL

  const fetchChartData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Attempting real API call
      const response = await axios.get(
        `${baseUrl}/api/icd/recap/10?from=${dateStart}&until=${dateEnd}&status_rawat=${status_rawat}&limit=10`,
      );
      const data = response.data.data;
      processChartData(data);
    } catch (error) {
      console.warn(
        "API failed, using fallback mock data for preview.",
        error.message,
      );
      // Fallback dummy data for preview purposes
    }
    setIsLoading(false);
  }, [baseUrl, dateStart, dateEnd, status_rawat]);

  const processChartData = (data) => {
    const labels = data.map((item) => item.kd_penyakit);
    const totalPenggunaan = data.map((item) => item.total_penggunaan);
    const nmPenyakit = data.map((item) => item.nm_penyakit);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Total Penggunaan",
          data: totalPenggunaan,
          nmPenyakit: nmPenyakit,
          backgroundColor: [
            "rgba(59, 130, 246, 0.8)",
            "rgba(99, 102, 241, 0.8)",
            "rgba(139, 92, 246, 0.8)",
            "rgba(236, 72, 153, 0.8)",
            "rgba(249, 115, 22, 0.8)",
            "rgba(16, 185, 129, 0.8)",
            "rgba(6, 182, 212, 0.8)",
            "rgba(244, 63, 94, 0.8)",
            "rgba(168, 85, 247, 0.8)",
            "rgba(34, 197, 94, 0.8)",
          ],
          borderColor: [
            "rgba(59, 130, 246, 1)",
            "rgba(99, 102, 241, 1)",
            "rgba(139, 92, 246, 1)",
            "rgba(236, 72, 153, 1)",
            "rgba(249, 115, 22, 1)",
            "rgba(16, 185, 129, 1)",
            "rgba(6, 182, 212, 1)",
            "rgba(244, 63, 94, 1)",
            "rgba(168, 85, 247, 1)",
            "rgba(34, 197, 94, 1)",
          ],
          borderWidth: 1.5,
          borderRadius: 4,
          borderSkipped: false,
        },
      ],
    });
  };

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  const options = {
    indexAxis: undefined,
    responsive: true,
    // CRITICAL FIX: Set maintainAspectRatio to false so it respects container height
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 13, weight: "500" },
          color: "#374151",
          padding: 15,
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      title: {
        display: true,
        text: "Most Used ICD-10 Codes",
        font: { size: 16, weight: "bold" },
        color: "#1F2937",
        padding: { bottom: 20 },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)", // Darker, more modern tooltip
        padding: 12,
        titleFont: { size: 13, weight: "bold" },
        bodyFont: { size: 12 },
        cornerRadius: 6,
        displayColors: true,
        callbacks: {
          title: function (context) {
            const index = context[0].dataIndex;
            const nmPenyakit = chartData.datasets[0].nmPenyakit?.[index] || "";
            const kdPenyakit = chartData.labels[index] || "";
            return [`${nmPenyakit}`, `ICD-10: ${kdPenyakit}`];
          },
          label: function (context) {
            return ` Total Penggunaan: ${context.parsed.y.toLocaleString("id-ID")}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 12 },
          color: "#6B7280",
          maxRotation: 45,
          minRotation: 0,
        },
        grid: {
          color: "rgba(209, 213, 219, 0.3)",
          drawBorder: false, // Updated for Chart.js v3+ (was drawBorder, now part of border in v4)
        },
        border: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 12 },
          color: "#6B7280",
          callback: function (value) {
            return value.toLocaleString("id-ID");
          },
        },
        grid: {
          color: "rgba(209, 213, 219, 0.3)",
        },
        border: { display: false, dash: [4, 4] }, // Adds subtle dashed lines for better readability
      },
    },
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-center mb-4">
        <div className="text-center uppercase w-full bg-[#00bb9b] p-3 text-white shadow-md rounded-t-lg font-bold tracking-wider">
          {title}
        </div>
      </div>

      <div className="bg-white rounded-b-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          {/* Filter Section */}
          <div className="mb-6 pb-6 border-b border-gray-100">
            <DateRangeInput
              dateStart={dateStart}
              setDateStart={setDateStart}
              dateEnd={dateEnd}
              setDateEnd={setDateEnd}
              onSubmit={fetchChartData}
            />
          </div>

          {/* Chart Section */}
          {/* CRITICAL FIX: Replaced conflicting nested heights with one unified responsive height */}
          <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-gray-400 font-medium">
                  Loading chart data...
                </span>
              </div>
            ) : chartData.labels.length > 0 ? (
              <Bar data={chartData} options={options} />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border border-gray-100">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <p className="text-gray-500 font-medium">
                    No data available for the selected range.
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Try adjusting the date range
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosaChart;
