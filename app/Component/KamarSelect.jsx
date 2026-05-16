"use client";

import React, { useState, useEffect } from "react";

export default function KamarSelect({ onSelectChange, defaultValue = "" }) {
  const base_url = process.env.base_url || "";
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    const fetchKamars = async () => {
      setIsLoading(true);
      setError(null);
      try {
         const token_api = localStorage.getItem('token_api')
        const url = `${base_url}/api/ranap/kamar?nm_bangsal=`;
        const response = await fetch(url,{
                headers: {
                    'Authorization': 'Bearer ' + token_api
                }
            });

        if (!response.ok) {
          throw new Error(`Gagal mengambil data (Status: ${response.status})`);
        }

        const result = await response.json();

        if (result.status && result.data) {
          setOptions(result.data);
          if (result.data.length > 0 && !selectedValue) {
            const firstItem = result.data[0];
            const firstValue = firstItem.kd_bangsal;
            const firstName = firstItem.nm_bangsal;
            setSelectedValue(firstValue);
            if (onSelectChange) {
              onSelectChange(firstValue, firstName);
            }
          }
        } else {
          throw new Error(result.message || "Data kamar tidak ditemukan");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKamars();
  }, [ base_url]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);

    // Cari objek kamar yang dipilih untuk mendapatkan namanya
    const selectedOption = options.find(opt => opt.kd_bangsal === value);
    const name = selectedOption ? selectedOption.nm_bangsal : "";

    if (onSelectChange) {
      onSelectChange(value, name);
    }
  };

  return (
    <div className="w-full">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Pilih Kamar
      </label>
      <div className="relative">
        <select
          value={selectedValue}
          onChange={handleChange}
          disabled={isLoading || !!error}
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
        >
          {isLoading ? (
            <option>Memuat data...</option>
          ) : error ? (
            <option value="">Error: {error}</option>
          ) : (
            <>
              <option value="">-- Pilih Kamar --</option>
              {options.map((item) => (
                <option key={item.nm_bangsal} value={item.kd_bangsal}>
                  {item.kd_bangsal} ({item.nm_bangsal})
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}