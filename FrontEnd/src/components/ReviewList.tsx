"use client";
import React, { useEffect, useState } from "react";
import { fetchDfetchDatafromBackata } from "@/service/api";
import Image from "next/image";
import bg from "../../public/240_F_287113569_12KPHNVT0eDYos0LvgaZsbuy5H2xf1BW.jpg";

export default function ReviewList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    async function fetchDataFromAPI() {
      try {
        const response = await fetchDfetchDatafromBackata();
        if (response.success) {
          setData(response.userDatas.reverse());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDataFromAPI();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
      {/* Background Image */}
      <Image
        src={bg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-4 text-center">User Reviews</h1>
          
          {/* Review Table */}
          <table className="w-full border-collapse border border-red-300">
            <thead>
              <tr className="bg-green-400">
                <th className="border p-3">#</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Usage</th>
                <th className="border p-3">Goal</th>
                <th className="border p-3">Rating</th>
                <th className="border p-3">Suggestion</th>
                <th className="border p-3">Birthday</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item: any, index) => (
                <tr key={index} className="border">
                  <td className="border p-3 text-center">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="border p-3 text-center">{item.Name || "N/A"}</td>
                  <td className="border p-3 text-center">{item.usage}</td>
                  <td className="border p-3 text-center">
                    {item.userGoal?.join(", ") || "N/A"}
                  </td>
                  <td className="border p-3 text-center">{item.rateUserValue}</td>
                  <td className="border p-3 text-center">
                    {item.suggestion || "No suggestion"}
                  </td>
                  <td className="border p-3 text-center">{item.birthday}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 font-bold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
