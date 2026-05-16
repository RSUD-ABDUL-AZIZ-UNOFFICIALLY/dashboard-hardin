"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import KamarSelect from "../Component/KamarSelect";

// Registrasi elemen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function BorChart({
  initialBangsal = "VIP",
  initialNMBangsal = "VIP",
  title
}) {
  const base_url = process.env.base_url;
  const initialPeriode = `${new Date().getFullYear()}-${new Date().getMonth() < 10 ? "0" + new Date().getMonth() : new Date().getMonth()}`;
  // const initialBangsal = "ZS";
  // console.log(initialPeriode, initialBangsal);
  // State untuk form input (yang sedang diketik user)
  const [inputPeriode, setInputPeriode] = useState(initialPeriode);
  const [inputBangsal, setInputBangsal] = useState(initialBangsal);

  // State untuk parameter API (yang aktif setelah user klik tombol Cari)
  const [activePeriode, setActivePeriode] = useState(initialPeriode);
  const [activeBangsal, setActiveBangsal] = useState(initialBangsal);
  const [activeNMBangsal, setactiveNMBangsal] = useState(initialNMBangsal);

  // State untuk Data dan Status
  const [dataIndikator, setDataIndikator] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Pastikan baseUrl tidak berakhiran slash
      const url = `${base_url}/api/ranap/kamar/bor?periode=${activePeriode}&kd_bangsal=${activeBangsal}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Gagal mengambil data (Status: ${response.status})`);
      }

      const result = await response.json();

      if (result.status && result.data) {
        setDataIndikator(result.data);
      } else {
        throw new Error(
          result.message || "Data tidak ditemukan untuk parameter tersebut",
        );
      }
    } catch (err) {
      setError(err.message);
      setDataIndikator(null); // Kosongkan data jika error
    } finally {
      setIsLoading(false);
    }
  }, [activePeriode, activeBangsal]);

  // Fetch data setiap kali activePeriode atau activeBangsal berubah
  useEffect(() => {
    fetchData();
    // setActivePeriode(inputPeriode);
    // setActiveBangsal(inputBangsal);
  }, [activePeriode, activeBangsal]);

  // Konfigurasi Data Chart
  const chartData = {
    labels: [
      "BOR (Bed Occupancy Rate)",
      "AVLOS (Hari)",
      "TOI (Hari)",
      "BTO (Kali)",
    ],
    datasets: [
      {
        label: "Nilai Indikator",
        data: dataIndikator
          ? [
              parseFloat(dataIndikator.BOR),
              parseFloat(dataIndikator.AVLOS),
              parseFloat(dataIndikator.TOI),
              parseFloat(dataIndikator.BTO),
            ]
          : [],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // Blue
          "rgba(16, 185, 129, 0.8)", // Emerald
          "rgba(245, 158, 11, 0.8)", // Amber
          "rgba(239, 68, 68, 0.8)", // Red
        ],
        borderRadius: 6,
      },
    ],
  };

  // Konfigurasi Tampilan Chart
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Indikator Rawat Inap - ${activeNMBangsal} (${activePeriode})`,
        font: { size: 16, family: "'Inter', sans-serif" },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || "";
            if (label) label += ": ";
            if (context.parsed.y !== null) {
              label += context.parsed.y;
              if (context.dataIndex === 0) {
                label += ` (${(context.parsed.y * 100).toFixed(0)}%)`;
              }
            }
            return label;
          },
        },
      },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-center ">
        <div className="text-center uppercase w-full bg-[#00bb9b] p-3 text-white shadow-lg">
          {title}
        </div>
      </div>
      <div className="w-full border border-gray-200 bg-white p-6 shadow-sm">
        {/* Bagian Form Filter */}
        <form
          // onSubmit={handleFilterSubmit}
          className="mb-6 flex flex-col items-end gap-4 rounded-lg bg-gray-50 p-4 sm:flex-row sm:items-end border border-gray-100"
        >
          <div className="w-full sm:w-auto flex-1">
            <label
              htmlFor="periode"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Periode
            </label>
            <input
              type="month"
              id="periode"
              value={`${inputPeriode}`}
              onChange={(e) => {
                setInputPeriode(e.target.value);
                setActivePeriode(e.target.value);
              }}
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="w-full sm:w-auto flex-1">
            <KamarSelect
              nmBangsal="Nama Bangsal"
              defaultValue={inputBangsal}
              onSelectChange={(value, name) => {
                setActiveBangsal(value);
                setactiveNMBangsal(name);
              }}
            />
          </div>
        </form>

        {/* Tampilan Error */}
        {error && (
          <div className="mb-6 flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-6">
            <span className="mb-1 font-semibold text-red-600">
              Gagal Memuat Data
            </span>
            <span className="text-sm text-red-500">{error}</span>
          </div>
        )}

        {/* Konten Data & Chart (Ditampilkan jika tidak error dan data ada) */}
        {!error && dataIndikator && (
          <>
            {/* Header Info Singkat */}
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  BOR (Bed Occupancy Rate)
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {(parseFloat(dataIndikator.BOR) * 100).toFixed(1)}%
                </p>
                <p className="text-[10px] text-blue-500 mt-1">
                  Persentase pemakaian tempat tidur
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-100">
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                  AVLOS (Avg Length of Stay)
                </p>
                <p className="text-2xl font-bold text-emerald-900">
                  {parseFloat(dataIndikator.AVLOS).toFixed(1)}{" "}
                  <span className="text-sm font-normal">Hari</span>
                </p>
                <p className="text-[10px] text-emerald-500 mt-1">
                  Rata-rata lama pasien dirawat
                </p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4 border border-amber-100">
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                  TOI (Turn Over Interval)
                </p>
                <p className="text-2xl font-bold text-amber-900">
                  {parseFloat(dataIndikator.TOI).toFixed(1)}{" "}
                  <span className="text-sm font-normal">Hari</span>
                </p>
                <p className="text-[10px] text-amber-500 mt-1">
                  Rata-rata hari tempat tidur kosong
                </p>
              </div>
              <div className="rounded-lg bg-purple-50 p-4 border border-purple-100">
                <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                  BTO (Bed Turn Over)
                </p>
                <p className="text-2xl font-bold text-purple-900">
                  {parseFloat(dataIndikator.BTO).toFixed(1)}{" "}
                  <span className="text-sm font-normal">Kali</span>
                </p>
                <p className="text-[10px] text-purple-500 mt-1">
                  Frekuensi pemakaian tempat tidur
                </p>
              </div>
            </div>

            {/* Chart Container */}
            <div className="relative w-full h-72 md:h-96 mb-6">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                  <div className="animate-pulse font-medium text-gray-500">
                    Memperbarui grafik...
                  </div>
                </div>
              ) : null}
              <Bar data={chartData} options={chartOptions} />
            </div>

            {/* Penjelasan Indikator */}
            <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
              <p className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Keterangan Indikator Rawat Inap:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[11px] text-gray-600">
                <li>
                  <span className="font-semibold text-blue-600">BOR:</span>{" "}
                  Tingkat penggunaan tempat tidur dalam satu periode.
                </li>
                <li>
                  <span className="font-semibold text-emerald-600">AVLOS:</span>{" "}
                  Rata-rata lama rawat pasien keluar atau meninggal.
                </li>
                <li>
                  <span className="font-semibold text-amber-600">TOI:</span>{" "}
                  Rata-rata hari tempat tidur tidak terisi antara dua pasien.
                </li>
                <li>
                  <span className="font-semibold text-purple-600">BTO:</span>{" "}
                  Berapa kali satu tempat tidur digunakan oleh pasien yang
                  berbeda.
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
