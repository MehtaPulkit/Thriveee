import React, { useEffect } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useRowSelect,
  usePagination,
} from "react-table";
import Subheading from "./Subheading";
import SortDesc from "./IconHooks/SortDesc";
import SortAesc from "./IconHooks/SortAesc";
import { FolderOpenIcon } from "@heroicons/react/24/outline";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";

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
              console.log(row.cells);
              return (
                <tr
                  {...row.getRowProps()}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {row.cells.map((cell) => {
                    return cell.column.Header == "Actions" ? (
                      <td {...cell.getCellProps()} className="p-2 min-w-120">
                        {cell.render("Cell")}
                      </td>
                    ) : (
                      <td
                        {...cell.getCellProps()}
                        className="p-2 max-w-120 text-ellipsis overflow-hidden whitespace-nowrap"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
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
              <ArrowLongLeftIcon className="w-6 mx-1" />
              Previous
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
            >
              Next
              <ArrowLongRightIcon className="w-6 mx-1" />
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
          <FolderOpenIcon className="w-11 h-11 dark:text-gray-400" />
        </div>
      )}
    </>
  );
};

export default Table;
