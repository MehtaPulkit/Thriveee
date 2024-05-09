import React from "react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import Table from "./Table";
import AddNewBlue from "./IconHooks/AddNewWhite";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Heading from "./Heading";
/*
Page List includes:
Filters and table

Filter: 
    Search and Add new button
Table:
    With Selection
    With Sorting
    With action buttons
    Columns example
    Delete field
    Edit field
*/

const PageList = () => {
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [rowData, setRowData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const columns = [
    {
      Header: "Header1",
      accessor: "accessor1",
      needsSorting: false,
      sortType: (rowA, rowB, columnId) => {
        const valueA = rowA.values[columnId].toLowerCase();
        const valueB = rowB.values[columnId].toLowerCase();
        return valueA.localeCompare(valueB);
      },
      // Custom sorting
    },
    {
      Header: "Header2",
      accessor: "Accessor2",
      needsSorting: false,
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
  const { data, isError, isLoading, isFetching, isSuccess } = useGetAllQuery();
  //  Delete query
  // const [
  // deleteTaxCode,
  // { isLoading: deleteloading, isSuccess, isError, error },
  //   ] = useDeleteTaxCodeMutation();

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

  useEffect(() => {
    // update if you more filters
    if (!data?.entities) return;

    let filteredData = Object.values(data.entities);

    setTableData(filteredData);
  }, [data]);
  return (
    <div>
      <Heading heading="Tax Codes" />
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
              Add new entry
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
        onConfirm={handleDeleteTaxCode}
      />
    </div>
  );
};

export default PageList;
