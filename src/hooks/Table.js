import React, { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useRowSelect,
  usePagination,
} from "react-table";
import Subheading from "./Subheading";
import LeftArrow from "./IconHooks.js/LeftArrow";
import RightArrow from "./IconHooks.js/RightArrow";
import SortDesc from "./IconHooks.js/SortDesc";
import SortAesc from "./IconHooks.js/SortAesc";

const Table = ({
  columns,
  data,
  onRowSelect,
  searchText,
  selectionRequired,
  entriesName,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize },
    setPageSize,
    setGlobalFilter,
    selectedFlatRows,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    // Enable global filtering
    useSortBy, // Enable sorting
    usePagination,
    useRowSelect,
    (hooks) => {
      // Add a custom column for selecting rows
      selectionRequired &&
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <input
                type="checkbox"
                {...getToggleAllRowsSelectedProps()}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            ),
            Cell: ({ row }) => (
              <input
                type="checkbox"
                {...row.getToggleRowSelectedProps()}
                onChange={() => onRowSelect(row.original)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            ),
          },
          ...columns,
        ]);
    }
  );

  const startIndex = pageIndex * pageSize + 1;
  const endIndex = Math.min((pageIndex + 1) * pageSize, data.length);

  useEffect(() => {
    if (searchText.length > 0) {
      setGlobalFilter(searchText);
    }
  }, [searchText]);
  return (
    <>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
        <table
          {...getTableProps()}
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="p-4"
                  >
                    <div className="flex items-center gap-2">
                      {column.render("Header")}
                      {console.log(column)}
                      {column.needsSorting && (
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <SortDesc />
                            ) : (
                              <SortAesc />
                            )
                          ) : (
                            <></>
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="p-4 max-w-120 text-ellipsis overflow-hidden"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {data.length > 0 ? (
        <div
          className="flex flex-col gap-4 md:flex-row
        justify-between mt-6 p-4"
        >
          <div className="flex">
            <button
            onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
            >
              <LeftArrow />
              Previous
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
            >
              Next
              <RightArrow />
            </button>
          </div>

          <div className="flex gap-6 items-center">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {startIndex}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {endIndex}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {data.length}
              </span>{" "}
              {entriesName || "entries"}
            </span>
            <select
              value={pageSize}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4">
          <Subheading subheading="No data available" />
          <svg
            className="w-[48px] h-[48px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 11H4m15.5 5a.5.5 0 0 0 .5-.5V8a1 1 0 0 0-1-1h-3.75a1 1 0 0 1-.829-.44l-1.436-2.12a1 1 0 0 0-.828-.44H8a1 1 0 0 0-1 1M4 9v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-3.75a1 1 0 0 1-.829-.44L9.985 8.44A1 1 0 0 0 9.157 8H5a1 1 0 0 0-1 1Z"
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default Table;
