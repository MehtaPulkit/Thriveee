import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useAddNewTaxCodeMutation,
  useCheckDuplicateTaxCodeMutation,
  useDeleteTaxCodeMutation,
  useGetTaxCodeQuery,
  useUpdateTaxCodeMutation,
} from "./taxCodeApiSlice";
import Heading from "../../../../hooks/Heading";
import Subheading from "../../../../hooks/Subheading";
import { MaxNameLength, MinNameLength } from "../../../../config/minMax";
import { namePattern, taxCodePattern } from "../../../../config/regexPatterns";
import CancelBtn from "../../../../elements/CancelBtn";
import SubmitBtn from "../../../../elements/SubmitBtn";
import Input from "../../../../elements/Input";
import SimpleSelect from "../../../../elements/SimpleSelect";
import { taxType } from "../../../../config/types";
import ComplexSelect from "../../../../elements/ComplexSelect";
import LoadingMsg from "../../../../hooks/LoadingMsg";
import ErrorMsg from "../../../../hooks/ErrorMsg";
import { toastAlerts } from "../../../../hooks/utils";
import DeleteConfirmationDialog from "../../../../hooks/DeleteConfirmationDialog";
import DeleteBtn from "../../../../elements/DeleteBtn";

const TaxCode = () => {
  const { id } = useAuth();
  const { tcID } = useParams();
  const navigate = useNavigate();

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: !tcID && {
      taxType: "Goods & Services Tax",
    },
  });

  const {
    data,
    isLoading: taxCodeIsLoading,
    isError: taxCodeIsError,
  } = useGetTaxCodeQuery(tcID, {
    refetchOnMountOrArgChange: true,
    skip: !tcID,
  });
  const watchTaxType = watch("taxType");

  const [
    checkDuplicateTaxCode,
    {
      isLoading: checkDuplicateIsLoading,
      isSuccess: checkDuplicateIsSuccess,
      isError: checkDuplicateIsError,
    },
  ] = useCheckDuplicateTaxCodeMutation();

  const [
    updateTaxCode,
    {
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      isError: updateIsError,
      error,
    },
  ] = useUpdateTaxCodeMutation();

  const [addNewTaxCode, { isLoading, isError, isSuccess }] =
    useAddNewTaxCodeMutation();
  const [
    deleteTaxCode,
    // { isLoading: deleteloading, isSuccess, isError, error },
  ] = useDeleteTaxCodeMutation();

  const handleTaxCode = async ({ taxCode, description, rate, taxType }) => {
    if (!tcID) {
      const checkDuplicate = await checkDuplicateTaxCode({ taxCode });
      if (checkDuplicate?.data?.isError || checkDuplicate?.error) {
        toastAlerts({
          type: "error",
          message: `${checkDuplicate?.error?.data?.message}`,
        });
        return;
      }
    } else if (tcID && taxCode != data.taxCode) {
      toastAlerts({
        type: "error",
        message:
          "An account already exists, please check account code and try again!",
      });

      return;
    }

    const res = tcID
      ? await updateTaxCode({
          taxCodeId: tcID,
          taxCode: taxCode,
          rate: rate,
          description: description,
          taxType: taxType,
        })
      : await addNewTaxCode({
          userId: id,
          taxCode: taxCode,
          rate: rate,
          taxType: taxType,
          description: description,
        });
    if (res?.data?.isError || res.error) {
      toastAlerts({ type: "error", message: "There was some error!" });
    } else {
      toastAlerts({
        type: "success",
        message: tcID ? "TaxCode is updated!" : "New taxCode created!",
      });
      navigate("/dashboard/accounting/tax-codes");
    }
  };

  const handleDelete = async () => {
    const res = await deleteTaxCode({ id: tcID });
    setShowDeletePopup(false);

    if (res?.data?.isError || res?.error) {
      toastAlerts({ type: "error", message: "There was some error!" });
    } else {
      toastAlerts({
        type: "success",
        message: "Tax Code deleted successfully!",
      });
      navigate("/dashboard/accounting/tax-codes");
    }
  };
  useEffect(() => {
    if (data) {
      reset({
        taxCode: data.taxCode,
        taxType: data.taxType,
        rate: data.rate,
        description: data.description,
      });
    }
  }, [data]);
  if (taxCodeIsLoading && tcID) {
    return <LoadingMsg />;
  }
  if (taxCodeIsError && tcID) {
    return <ErrorMsg />;
  }
  return (
    <div>
      <Heading heading={tcID ? "Update Tax Code" : "Create new Tax Code"} />
      <form className="w-full" onSubmit={handleSubmit(handleTaxCode)}>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow md:flex md:flex-col md:items-start md:justify-center md:p-6 xl:p-8">
          <Subheading subheading="Details" />
          <div className="grid grid-cols-6 gap-6">
            <Input
              id="taxCode-taxCode"
              name="taxCode"
              label="Tax code"
              placeholder=""
              key="taxCode-taxCode"
              type="text"
              pattern={taxCodePattern}
              errors={errors}
              register={register}
              required={true}
            />
            <Input
              id="taxCode-description"
              name="description"
              label="Description"
              placeholder=""
              key="taxCode-description"
              type="text"
              errors={errors}
              register={register}
            />
            <Input
              id="taxCode-rate"
              name="rate"
              label="Rate (%)"
              placeholder=""
              key="taxCode-rate"
              type="text"
              errors={errors}
              register={register}
            />
            <SimpleSelect
              id="taxCode-taxtype"
              label="Tax type"
              options={taxType}
              register={register}
              errors={errors}
              name="taxType"
            />
            {taxType == "Import Duty" &&
              {
                /* <ComplexSelect
             id="taxCode-AccruedDuty"
             label="Linked account for accrued duty"
             options={AccruedDuty}
             register={register}
             errors={errors}
             name="AccruedDuty"
            /> */
                /* <ComplexSelect
             id="taxCode-ImportAgent"
             label="Linked contact for import agent"
             options={ImportAgent}
             register={register}
             errors={errors}
             name="ImportAgent"
            /> */
              }}
            {/* <ComplexSelect
             id="taxCode-taxPaid"
             label="Tax type"
             options={taxPaid}
             register={register}
             errors={errors}
             name="taxPaid"
            /> */}
            {/* <ComplexSelect
             id="taxCode-linkedContact"
             label="Linked contact for tax authority"
             options={linkedContact}
             register={register}
             errors={errors}
             name="linkedContact"
            /> */}
            {/* <ComplexSelect
             id="taxCode-WithholdingCrAccount"
             label="Tax type"
             options={Withholding}
             register={register}
             errors={errors}
             name="WithholdingCrAccount"
            /> */}
            {/* <ComplexSelect
             id="taxCode-WithholdingPyAccount"
             label="Tax type"
             options={WithholdingPyAccount}
             register={register}
             errors={errors}
             name="WithholdingPyAccount"
            /> */}

            {/* <ComplexSelect
             id="taxCode-LinkedAccTaxPaid"
             label="Linked account for tax paid"
             options={LinkedAccTaxPaid}
             register={register}
             errors={errors}
             name="LinkedAccTaxPaid"
            /> */}
          </div>
        </div>

        <div className="col-span-6 mt-6 flex gap-4 justify-between sm:col-full">
          <div>
            <CancelBtn
              handleClick={() => navigate("/dashboard/accounting/tax-codes")}
            />
            <SubmitBtn text={tcID ? "Update" : "Save"} />
          </div>
          {tcID && <DeleteBtn handleClick={() => setShowDeletePopup(true)} />}
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

export default TaxCode;
