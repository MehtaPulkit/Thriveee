import React, { useEffect, useState } from "react";
import Heading from "../../../hooks/Heading";
import Table from "../../../hooks/Table";
// import {
//   useDeleteQuoteMutation,
//   useGetQuotesQuery,
// } from "./quoteApiSlice";
import { useNavigate } from "react-router-dom";
import SelectFilter from "../../../elements/SelectFilter";
import { Link } from "react-router-dom";
import DeleteConfirmationDialog from "../../../hooks/DeleteConfirmationDialog";
import { Bounce, toast } from "react-toastify";
import AddNewBlue from "../../../hooks/IconHooks/AddNewWhite";
import {
  CalendarIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import DatePickerFilter from "../../../elements/DatePickerFilter";

const QuotesList = () => {
  const navigate = useNavigate();
  //   const { data, isError, isLoading, isFetching, isSuccess } =
  //     useGetQuotesQuery();
  const [selectedOption, setSelectedOption] = useState({
    value: "All",
    name: "All",
  });
  const quoteStatusOptions = [
    { value: "All", name: "All" },
    { value: "Open", name: "Open" },
    { value: "Accepted", name: "Accepted" },
    { value: "Declined", name: "Declined" },
    { value: "Invoiced", name: "Invoiced" },
  ];

  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [rowData, setRowData] = useState({});
  let defaultDate = new Date();

  const columns = [
    {
      Header: "Name",
      accessor: (row) => row.companyName || row.firstName + row.lastName,
      needsSorting: true,
      sortType: (rowA, rowB, columnId) => {
        const valueA = rowA.values[columnId].toLowerCase();
        const valueB = rowB.values[columnId].toLowerCase();
        return valueA.localeCompare(valueB);
      },
      // Custom sorting
    },
    {
      Header: "Quote ID",
      accessor: "quoteId",
      needsSorting: true,
      sortType: (rowA, rowB, columnId) => {
        const valueA = rowA.values[columnId].toLowerCase();
        const valueB = rowB.values[columnId].toLowerCase();
        return valueA.localeCompare(valueB);
      },
    },
    {
      Header: "Quote no",
      accessor: (row) => row.phoneNo || row.mobileNo,
      needsSorting: true,
    },
    {
      Header: "Email",
      accessor: "email",
      needsSorting: true,
      sortType: (rowA, rowB, columnId) => {
        const valueA = rowA.values[columnId].toLowerCase();
        const valueB = rowB.values[columnId].toLowerCase();
        return valueA.localeCompare(valueB);
      },
    },
    {
      Header: "Status",
      accessor: "isActive",
      needsSorting: true,
      Cell: ({ value }) => (
        <>
          {value ? (
            <span className="text-green-700 bg-green-100 p-2 rounded-md dark:bg-green-800 dark:text-gray-100">
              Active
            </span>
          ) : (
            <span className="bg-red-100 text-red-700 p-2 rounded-md dark:bg-red-800 dark:text-gray-100">
              Inactive
            </span>
          )}
        </>
      ),
    },
    {
      Header: "Actions",
      minWidth: "320px",
      Cell: ({ row }) => (
        <>
          <button
            type="button"
            id="updateProductButton"
            className="inline items-center px-3 py-2 text-sm mr-4 mb-2 font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleEdit(row.original)}
          >
            <PencilSquareIcon className="w-4 h-4 text-color-white" />
          </button>

          <button
            type="button"
            id="deleteProductButton"
            onClick={() => handleDelete(row.original)}
            className="inline  items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
          >
            <TrashIcon className="w-4 h-4 text-color-white" />
          </button>
        </>
      ),
    },
  ];

  //   const [
  //     deleteQuote,
  //     // { isLoading: deleteloading, isSuccess, isError, error },
  //   ] = useDeleteQuoteMutation();
  const handleEdit = (rowData) => {
    const path = "edit/" + rowData._id;
    navigate(path);
  };
  const handleDelete = (rowData) => {
    // Logic to handle delete action

    if (rowData) {
      setShowDeletePopup(true);
      setRowData(rowData);
    }
  };

  //   const handleDeleteQuote = async () => {
  //     const res = await deleteQuote({ id: rowData._id });

  //     setShowDeletePopup(false);
  //     if (res.data) {
  //       toast.success("Quote deleted succesfully!", {
  //         theme: localStorage.theme,
  //         transition: Bounce,
  //       });
  //     } else if (res.error) {
  //       toast.error("There was some error!", {
  //         theme: localStorage.theme,
  //         transition: Bounce,
  //       });
  //     }
  //   };
  const handleRowSelect = (rowData) => {
    // Logic to handle row selection
  };

  //   useEffect(() => {
  //     if (!data?.entities) return;

  //     let filteredData = Object.values(data.entities).filter(
  //       (t) => t.isActive === !showInactive
  //     );

  //     if (selectedOption.value !== "All") {
  //       filteredData = filteredData.filter(
  //         (t) =>
  //           t.quoteType === selectedOption.value && t.isActive === !showInactive
  //       );
  //     }

  //     setTableData(filteredData);
  //   }, [data, selectedOption, showInactive]);

  return (
    <div>
      <Heading heading="All quotes" />
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow md:flex flex-col md:items-start md:justify-between md:p-6 xl:p-8">
        <div className="flex items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-6">
            <label
              htmlFor="table-search"
              className="block mb-2 font-semibold text-sm text-gray-700 dark:text-gray-400"
            >
              Search
              <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </label>
          </div>
          <Link id="createLink" to="create">
            <span className="hidden md:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Add new quote
            </span>
            <AddNewBlue />
          </Link>
        </div>
        <div date-rangepicker className="flex flex-col gap-4 md:flex-row">
          <SelectFilter
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            options={quoteStatusOptions}
            id="quoteType"
            label="Quote Type"
          />
          <DatePickerFilter
            label="Issue from"
            id="issueFrom"
            defaultValue={defaultDate}
          />

          <DatePickerFilter
            label="Issue to"
            id="issueTo"
            defaultValue={defaultDate}
          />
        </div>
      </div>
      <div className="p-4 mt-4 bg-white dark:bg-gray-800 rounded-lg shadow md:flex flex-col md:items-start md:justify-between md:p-6 xl:p-8">
        {tableData && selectedOption.value && (
          <Table
            columns={columns}
            data={tableData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRowSelect={handleRowSelect}
            urltoNew="create"
            page="quote"
            searchText={searchText}
            selectionRequired={false}
            entriesName="quotes"
          />
        )}
      </div>
      <DeleteConfirmationDialog
        open={showDeletePopup}
        onClose={() => setShowDeletePopup(!showDeletePopup)}
        // onConfirm={handleDeleteQuote}
      />
    </div>
  );
};

export default QuotesList;
