import React, { useEffect } from "react";
import {
  useAddNewTxAccountMutation,
  useGetTxAccountsQuery,
  useUpdateTxAccountMutation,
} from "./txAccountApiSlice";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import LoadingMsg from "../../../../hooks/LoadingMsg";
import ErrorMsg from "../../../../hooks/ErrorMsg";
import Heading from "../../../../hooks/Heading";
import Subheading from "../../../../hooks/Subheading";
import SimpleSelect from "../../../../elements/SimpleSelect";
import CancelBtn from "../../../../elements/CancelBtn";
import SubmitBtn from "../../../../elements/SubmitBtn";
import { accountType, cashFlowType } from "../../../../config/types";
import Input from "../../../../elements/Input";
import ComplexSelect from "../../../../elements/ComplexSelect";
import TextArea from "../../../../elements/TextArea";
import FormCheckbox from "../../../../elements/FormCheckbox";

const TxAccount = () => {
  const { id } = useAuth();
  const { coaID } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: !coaID && {
      openingBalance: 0,
      isActive: true,
    },
  });

  const watchType = watch("accountType");
  const {
    data,
    isLoading: txAccountIsLoading,
    isError: txAccountIsError,
  } = useGetTxAccountsQuery(coaID, {
    refetchOnMountOrArgChange: true,
    skip: !coaID,
  });

  const [
    updateTxAccount,
    {
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      isError: updateIsError,
      error,
    },
  ] = useUpdateTxAccountMutation();
  const [addNewTxAccount, { isLoading, isError, isSuccess }] =
    useAddNewTxAccountMutation();

  const handleTxAccount = async ({ txAccount, description, rate, taxType }) => {
    const res = coaID
      ? await updateTxAccount({
          txAccountId: coaID,
          txAccount: txAccount,
          rate: rate,
          description: description,
          taxType: taxType,
        })
      : await addNewTxAccount({
          userId: id,
          txAccount: txAccount,
          rate: rate,
          taxType: taxType,
          description: description,
        });
    if (res?.data?.isError || res.error) {
      toast.error("There was some error!", {
        theme: localStorage.theme,
        transition: Bounce,
      });
    } else {
      toast.success(coaID ? "Account is updated!" : "New account created!", {
        theme: localStorage.theme,
        transition: Bounce,
      });
      navigate("/dashboard/accounting/tax-codes");
    }
  };
  useEffect(() => {
    if (data) {
      reset({
        txAccount: data.txAccount,
        taxType: data.taxType,
        rate: data.rate,
        description: data.description,
      });
    }
  }, [data]);
  if (txAccountIsLoading && coaID) {
    return <LoadingMsg />;
  }
  if (txAccountIsError && coaID) {
    return <ErrorMsg />;
  }
  return (
    <div>
      <Heading heading={coaID ? "Update Tax Code" : "Create new Tax Code"} />
      <form className="w-full" onSubmit={handleSubmit(handleTxAccount)}>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow md:flex md:flex-col md:items-start md:justify-center md:p-6 xl:p-8">
          <Subheading subheading="Details" />
          <div className="grid grid-cols-6 gap-6">
            <SimpleSelect
              id="txAccount-accountType"
              label="Type"
              options={accountType}
              register={register}
              errors={errors}
              name="accountType"
              optWithGrp={true}
            />

            <Input
              id="txAccount-code"
              name="code"
              label="Code"
              placeholder=""
              key="txAccount-code"
              type="text"
              errors={errors}
              register={register}
              required={true}
            />
            <Input
              id="txAccount-name"
              name="name"
              label="Name"
              placeholder=""
              key="txAccount-name"
              type="text"
              errors={errors}
              register={register}
              required={true}
            />
            <Input
              id="txAccount-openingBalance"
              name="openingBalance"
              label="Opening Balance"
              placeholder=""
              key="txAccount-openingBalance"
              type="text"
              errors={errors}
              register={register}
              required={false}
            />
            {/* <ComplexSelect  id="txAccount-taxCode"
              label="Type"
              options={taxCode}
              register={register}
              errors={errors}
              name="taxCode"
              optWithGrp={true} /> */}
            <TextArea
              id="txAccount-notes"
              register={register}
              errors={errors}
              label="Notes"
              name="notes"
            />
            <SimpleSelect
              id="txAccount-classifyCashflow"
              label="Classification for statements of cash flows"
              options={cashFlowType}
              register={register}
              errors={errors}
              name="classifyCashflow"
            />
            <FormCheckbox
              id="txAccount-isActive"
              register={register}
              errors={errors}
              label="Is Active"
              name="isActive"
            />
            {(watchType == "Bank" || watchType == "Credit Card") && (
              <>
                <div className="col-span-6 w-full">
                  <hr class="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
                </div>
                <Input
                  id="txAccount-bsb"
                  name="bsb"
                  label="BSB"
                  placeholder=""
                  key="txAccount-bsb"
                  type="text"
                  errors={errors}
                  register={register}
                  required={false}
                />
                <Input
                  id="txAccount-bankAccNo"
                  name="bankAccNo"
                  label="Bank Account Number"
                  placeholder=""
                  key="txAccount-bankAccNo"
                  type="text"
                  errors={errors}
                  register={register}
                  required={false}
                />
                <Input
                  id="txAccount-bankAccName"
                  name="bankAccName"
                  label="Bank Account Name"
                  placeholder=""
                  key="txAccount-bankAccName"
                  type="text"
                  errors={errors}
                  register={register}
                  required={false}
                />
                <Input
                  id="txAccount-companyTradingName"
                  name="companyTradingName"
                  label="Company Trading Name"
                  placeholder=""
                  key="txAccount-companyTradingName"
                  type="text"
                  errors={errors}
                  register={register}
                  required={false}
                />
              </>
            )}
          </div>
        </div>

        <div className="col-span-6 mt-6 sm:col-full">
          <CancelBtn
            handleClick={() =>
              navigate("/dashboard/accounting/chart-of-accounts")
            }
          />
          <SubmitBtn text={coaID ? "Update" : "Save"} />
        </div>
      </form>
    </div>
  );
};

export default TxAccount;
