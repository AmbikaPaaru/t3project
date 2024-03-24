"use client";
import React, { useEffect, useState } from "react";
import { generateProductCategories } from "~/utils/products";
import './style.css'

type Props = {};
interface Types {
  id: string;
  name: string;
}

function index({}: Props) {
  const [list, setList] = useState<Types[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = list.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    const listdata = generateProductCategories(100);
    if (listdata) {
      setList(listdata);
    }
  }, []);
  return (
    <div className="h-screen bg-[#fff]">
      <div className="border-[#C1C1C1]-600 relative top-[176px] m-auto h-[658px] w-[576px] rounded-[20px] border-2">
        <div className="grid grid-cols-1 gap-4 p-6">
          <div className="text-center text-[32px] font-[600]">
            Please mark your interests!
          </div>
          <span className="text-center text-[16px] font-[400]">
            We will keep you notified.
          </span>
          <div className="m-auto grid w-[456px] gap-1">
            <span className="mb-10 text-[20px] font-[500]">
              My saved interests!
            </span>
            {currentItems?.map((item) => (
              <div className="flex my-4">
                <label className="main">
            <input type="checkbox"/>
            <span className="checkbox-container"></span>
        </label>

                <div className="pt-[-25px]">{item?.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={`mt-4  ml-12 flex justify-center text-[#ACACAC]`}>
          <button
            onClick={() => handlePageChange(1)}
            className={`px-2 ${currentPage === 1 ? "cursor-not-allowed text-[#ACACAC]" : "text-[#000]"} disabled:opacity-50`}
          >
            {"<<"}
          </button>

          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-2 ${currentPage === 1 ? "cursor-not-allowed text-[#ACACAC]" : "text-[#000]"} disabled:opacity-50`}
          >
            {"<"}
          </button>

          {Array.from({ length: Math.ceil(list.length / itemsPerPage) }).map(
            (_, index) => {
              if (index === 7) {
                return (
                  <span key={index} className="px-2">
                    {"..."}
                  </span>
                );
              }

              if (
                index < 7 ||
                (index >= currentPage - 1 && index <= currentPage + 1) ||
                index === Math.ceil(list.length / itemsPerPage) - 1
              ) {
                return (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-2 ${currentPage === index + 1 ? "text-[#000]" : "text-[#ACACAC]"}`}
                  >
                    {index + 1}
                  </button>
                );
              }
              return null;
            },
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-2 ${currentPage === Math.ceil(list.length / itemsPerPage) ? "cursor-not-allowed text-[#ACACAC]" : "text-[#000]"} disabled:opacity-50`}
          >
            {">"}
          </button>
          <button
            onClick={() =>
              handlePageChange(Math.ceil(list?.length / itemsPerPage))
            }
            className={`px-2 ${currentPage === Math.ceil(list.length / itemsPerPage) ? "cursor-not-allowed text-[#ACACAC]" : "text-[#000]"} disabled:opacity-50`}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default index;
