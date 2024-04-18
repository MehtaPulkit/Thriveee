import React, { useEffect, useState } from "react";
import Heading from "../../../hooks/Heading";
import Table from "../../../hooks/Table";
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from "./contactApiSlice";
import { useNavigate } from "react-router-dom";
import Select from "../../../elements/Select";
import { Link } from "react-router-dom";
import DeleteConfirmationDialog from "../../../hooks/DeleteConfirmationDialog";

const ContactsList = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading, isFetching, isSuccess } =
    useGetContactsQuery();
  const [selectedOption, setSelectedOption] = useState({
    value: "All",
    name: "All",
  });
  const contactTypeOptions = [
    { value: "All", name: "All" },
    { value: "Customer", name: "Customer" },
    { value: "Personal", name: "Personal" },
    { value: "Supplier", name: "Supplier" },
  ];

  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [rowData, setRowData] = useState({});
  const columns = [
    {
      Header: "Name",
      accessor: (row) => row.companyName || row.firstName + row.lastName,
    },
    {
      Header: "Contact ID",
      accessor: "contactId",
    },
    {
      Header: "Contact no",
      accessor: (row) => row.phoneNo || row.mobileNo,
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Status",
      accessor: "isActive",
    },
  ];

  const [
    deleteContact,
    // { isLoading: deleteloading, isSuccess, isError, error },
  ] = useDeleteContactMutation();
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

  const handleDeleteContact = async () => {
    const res = await deleteContact({ id: rowData._id });
    setShowDeletePopup(false);
  };
  const handleRowSelect = (rowData) => {
    // Logic to handle row selection
  };
  
  useEffect(() => {
    if (!data?.entities) return;

    let filteredData = Object.values(data.entities).filter(
      (t) => t.isActive === !showInactive
    );

    if (selectedOption.value !== "All") {
      filteredData = filteredData.filter(
        (t) =>
          t.contactType === selectedOption.value && t.isActive === !showInactive
      );
    }

    setTableData(filteredData);
  }, [data, selectedOption, showInactive]);

  return (
    <div>
      <Heading heading="All contacts" />
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow md:flex flex-col md:items-start md:justify-between md:p-6 xl:p-8">
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <Select
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              options={contactTypeOptions}
              id="contactType"
              label="Contact Type"
            />

            <label
              htmlFor="table-search"
              className="block mb-2 font-semibold text-sm text-gray-700 dark:text-gray-400"
            >
              Search
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
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
                for="checked-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
              Add new contact
            </span>
            <svg
              className="w-8 h-8 text-blue-600 md:hidden dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        {tableData && selectedOption.value && (
          <Table
            columns={columns}
            data={tableData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRowSelect={handleRowSelect}
            urltoNew="create"
            page="contact"
            searchText={searchText}
          />
        )}
      </div>

      <DeleteConfirmationDialog
        open={showDeletePopup}
        onClose={() => setShowDeletePopup(!showDeletePopup)}
        onConfirm={handleDeleteContact}
      />
    </div>
  );
};

export default ContactsList;
