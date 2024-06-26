import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../../../hooks/Heading";
import { Link } from "react-router-dom";
import AddNewBlue from "../../../../hooks/IconHooks/AddNewWhite";
import Table from "../../../../hooks/Table";
import DeleteConfirmationDialog from "../../../../hooks/DeleteConfirmationDialog";
import {
  useDeleteTxAccountMutation,
  useGetTxAccountsQuery,
} from "./txAccountApiSlice";
import Tabs from "../../../../hooks/Tabs";
import { txAccList } from "../../../../config/txAccountData";
import { useGetTaxCodesQuery } from "../taxCodes/taxCodeApiSlice";
import { toastAlerts } from "../../../../hooks/utils";

/*
TODO:
Amount to account
Grouping in table
selection to delete
*/
const TxAccountsList = () => {
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [rowData, setRowData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tab, setTab] = useState();
  const [showInactive, setShowInactive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All categories");

  const {
    data: taxCodes,
    isError: taxCodesIsError,
    isLoading: taxCodesIsLoading,
    isFetching: taxCodesIsFetching,
    isSuccess: taxCodesIsSuccess,
  } = useGetTaxCodesQuery();

  const columns = [
    {
      Header: "Code",
      accessor: "accountCode",
      initialSort: true,
      sortType: (rowA, rowB, columnId) => {
        const valueA = rowA.values[columnId].toLowerCase();
        const valueB = rowB.values[columnId].toLowerCase();
        return valueA.localeCompare(valueB);
      },

      // Custom sorting
    },
    {
      Header: "Name",
      accessor: "accountName",
    },
    {
      Header: "Type",
      accessor: "accountType",
    },
    {
      Header: "Tax Code",
      accessor: (row) =>
        Object.values(taxCodes?.entities).filter(
          (tc) => tc._id == row.taxCode
        )[0]?.taxCode || "",
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

  //   Add Get all query
  const { data, isError, isLoading, isFetching, isSuccess } =
    useGetTxAccountsQuery();
  //  Delete query
  const [deleteTxAccount, {}] = useDeleteTxAccountMutation();

  // Handle Edit function
  const handleEdit = (rowData) => {
    const path = "edit/" + rowData._id;
    navigate(path);
  };
  // Handle Delete function
  const handleDelete = (rowData) => {
    // Logic to handle delete action

    if (rowData) {
      setShowDeletePopup(true);
      setRowData(rowData);
    }
  };
  //TODO: handleDelete code
  const handleDeleteAccount = async () => {
    const res = await deleteTxAccount({ id: rowData._id });

    setShowDeletePopup(false);
    if (res?.data?.isError || res?.error) {
      toastAlerts({ type: "error", message: "There was some error!" });
    } else {
      toastAlerts({
        type: "success",
        message: "Account deleted successfully!",
      });
    }
  };
  useEffect(() => {
    // update if you more filters
    if (!data?.entities) return;

    let filteredData = Object.values(data.entities);

    setTableData(filteredData);
  }, [data]);

  useEffect(() => {
    if (!data?.entities) return;
    const [selectedOptionValue] = txAccList.filter(
      (type) => type.index == activeTabIndex
    );
    let filteredData = Object.values(data.entities).filter(
      (t) => t.inactiveAccount === showInactive
    );
    console.log(selectedOptionValue);

    if (selectedOptionValue?.filterValue !== "All") {
      filteredData = filteredData.filter(
        (t) =>
          t.classification === selectedOptionValue?.filterValue &&
          t.inactiveAccount === showInactive
      );
    }
    console.log(filteredData.filter((f) => f.classification == "Assets"));
    setTableData(filteredData);
  }, [data, showInactive, activeTabIndex]);
  return (
    <div>
      <Heading heading="Chart of accounts" />
      <Tabs
        tablist={txAccList}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
      />
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
            <div className="flex items-center">
              <label
                htmlFor="contact-showInactive"
                className="ms-2 text-sm font-semibold text-gray-900 dark:text-gray-300"
              >
                <input
                  id="contact-showInactive"
                  type="checkbox"
                  value={showInactive}
                  className="w-4 h-4 m-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                  onChange={() => setShowInactive(!showInactive)}
                />
                Show inactive
              </label>
            </div>
          </div>
          <Link id="createLink" to="create">
            <span className="hidden md:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Add new account
            </span>
            <AddNewBlue />
          </Link>
        </div>
      </div>
      <div className="p-4 mt-4 bg-white dark:bg-gray-800 rounded-lg shadow md:flex flex-col md:items-start md:justify-between md:p-6 xl:p-8">
        {tableData && (
          <Table
            columns={columns}
            data={tableData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            urltoNew="create"
            searchText={searchText}
            selectionRequired={false}
            entriesName="Entries"
          />
        )}
      </div>
      <DeleteConfirmationDialog
        open={showDeletePopup}
        onClose={() => setShowDeletePopup(!showDeletePopup)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
};

export default TxAccountsList;
