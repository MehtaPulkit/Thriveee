import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../../hooks/Heading";
import Subheading from "../../../hooks/Subheading";
import { useForm } from "react-hook-form";
import CancelBtn from "../../../elements/CancelBtn";
import SubmitBtn from "../../../elements/SubmitBtn";
import Input from "../../../elements/Input";
import SimpleSelect from "../../../elements/SimpleSelect";
import DeleteBtn from "../../../elements/DeleteBtn";
import DeleteConfirmationDialog from "../../../hooks/DeleteConfirmationDialog";
import DatePicker from "../../../elements/DatePicker";
// import { Datepicker } from "flowbite-react";

const Quote = () => {
  //User Id
  const { id } = useAuth();

  // Edit Id
  const { qID } = useParams();

  //navigate to url
  const navigate = useNavigate();

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  // Use form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: !qID && {
      status: "Open",
    },
  });

  // any watch fields
  // const watchDesignation = watch("contactDesignation");

  // Get Edit data

  // const {
  //   data,
  //   isLoading: contactIsLoading,
  //   isError: contactIsError,
  // } = useGetContactQuery(cID, {
  //   refetchOnMountOrArgChange: true,
  //   skip: !cID,
  // });

  // Add mutation

  // const [addNewContact, { isLoading, isError, isSuccess }] =
  //   useAddNewContactMutation();

  //  handle form edit and add
  const handleForm = async (data) => {
    console.log(data);
  };
  // Reset for Edit form

  //Delete
  //Delete mutation
  // const [
  //   deleteContact,
  // { isLoading: deleteloading, isSuccess, isError, error },
  // ] = useDeleteContactMutation();

  const handleDelete = async () => {};

  // useEffect(() => {
  //   if (data) {
  //     reset({
  //       abn: data?.abn,
  //       billingAdd1: data?.billingAddress?.addressLine1,
  //      });
  //   }
  // }, [data]);

  //Edit data loading or error msgs

  // if (contactIsLoading && cID) {
  //   return <LoadingMsg />;
  // }
  // if (contactIsError && cID) {
  //   return <ErrorMsg />;
  // }
  return (
    <div>
      <Heading heading={qID ? "Update quote" : "Create quote"} />
      <form className="w-full" onSubmit={handleSubmit(handleForm)}>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow md:flex md:flex-col md:items-start md:justify-center md:p-6 xl:p-8">
          <Subheading subheading="Details" />
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-2">
              {/* <Input
                id="quote-quoteNo"
                name="quoteNo"
                label="Quote number"
                key="quote-quoteNo"
                type="text"
                errors={errors}
                // pattern={emailPattern}
                register={register}
                required={true}
              /> */}
            </div>
            <div className="col-span-6 sm:col-start-4 grid grid-cols-3 gap-6">
              <Input
                id="quote-quoteNo"
                name="quoteNo"
                label="Quote number"
                key="quote-quoteNo"
                type="text"
                errors={errors}
                // pattern={emailPattern}
                register={register}
                required={true}
              />
              <Input
                id="quote-purchaseOrderNo"
                name="purchaseOrderNo"
                label="Customer PO number"
                key="quote-purchaseOrderNo"
                type="text"
                errors={errors}
                // pattern={emailPattern}
                register={register}
                required={true}
              />
              <DatePicker
                name="issueDate"
                id="quote-issueDate"
                label="Issue Date"
                key="quote-issueDate"
                register={register}
                errors={errors}
                required={true}
              />
              <DatePicker
                name="expiryDate"
                id="quote-expiryDate"
                label="Expiry Date"
                key="quote-expiryDate"
                register={register}
                errors={errors}
                required={true}
              />
              <SimpleSelect
                id="quote-status"
                label="Status"
                key="quote-status"
                name="status"
                options={["Open", "Accepted", "Pending"]}
                register={register}
                errors={errors}
              />
              <SimpleSelect
                id="quote-amountWithTax"
                label="Amounts are"
                key="quote-amountWithTax"
                name="amountWithTax"
                options={["Tax inclusive", "Tax exclusive", "No Tax"]}
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </div>
        <div className="col-span-6 mt-6 flex gap-4 justify-between sm:col-full">
          <div>
            <CancelBtn handleClick={() => navigate("/dashboard/quotes")} />
            <SubmitBtn text={qID ? "Update" : "Save"} />
          </div>{" "}
          {qID && <DeleteBtn handleClick={() => setShowDeletePopup(true)} />}
        </div>
      </form>
      <DeleteConfirmationDialog
        open={showDeletePopup}
        onClose={() => setShowDeletePopup(!showDeletePopup)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Quote;
