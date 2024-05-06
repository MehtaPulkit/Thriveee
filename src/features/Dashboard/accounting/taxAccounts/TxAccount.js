import React, { useEffect, useState } from "react";
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
import { useGetTaxCodesQuery } from "../taxCodes/taxCodeApiSlice";

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
    },
  });

  const watchType = watch("accountType");
  const watchTaxCode = watch("taxCode");
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

  const {
    data: taxCodes,
    isError: taxCodesIsError,
    isLoading: taxCodesIsLoading,
    isFetching: taxCodesIsFetching,
    isSuccess: taxCodesIsSuccess,
  } = useGetTaxCodesQuery();
  const [classification, setClassification] = useState();
  const handleTxAccount = async ({
    accountType,
    accountCode,
    accountName,
    taxCode,
    notes,
    openingBalance,
    classifyCashflow,
    inactiveAccount,
    bsb,
    bankAccountNo,
    bankAccountName,
    companyTradingName,
  }) => {
    // return
    console.log(taxCode);
    const [taxCodeId] = Object.values(taxCodes.entities).filter(
      (code) => code.taxCode == taxCode
    );
    console.log(taxCodeId.id);

    const res = coaID
      ? await updateTxAccount({
          classification: classification,
          accountType,
          accountCode,
          accountName,
          taxCode: taxCodeId.id,
          notes,
          openingBalance,
          classifyCashflow,
          inactiveAccount,
          bankDetails: {
            bsb,
            bankAccountNo,
            bankAccountName,
            companyTradingName,
          },
        })
      : await addNewTxAccount({
          userId: id,
          classification: classification,
          accountType,
          accountCode,
          accountName,
          taxCode: taxCodeId.id,
          notes,
          openingBalance,
          classifyCashflow,
          inactiveAccount,
          bankDetails: {
            bsb,
            bankAccountNo,
            bankAccountName,
            companyTradingName,
          },
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
      navigate("/dashboard/accounting/chart-of-accounts");
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
  useEffect(() => {
    if (watchType && watchType != "Select") {
      const classify = accountType
        .flatMap((type) => type.options)
        .find((opt) => opt.value === watchType).classification;

      if (classify) {
        setClassification(classify);
      }
      console.log(classify);
    }
  }, [watchType]);

  // useEffect(() => {
  //   if (taxCodes) {
  //     console.log(Object.values(taxCodes.entities)[0].taxCode);
  //     reset({ taxCode: Object.values(taxCodes.entities)[0].taxCode });
  //   }
  // }, []);

  if (txAccountIsLoading && coaID) {
    return <LoadingMsg />;
  }
  if (txAccountIsError && coaID) {
    return <ErrorMsg />;
  }

  console.log(
    accountType.map((group, i) => group.options.map((option, i) => i))
  );
  return (
    <div>
      <Heading heading={coaID ? "Update Tax Code" : "Create new Tax Code"} />
      <form className="w-full" onSubmit={handleSubmit(handleTxAccount)}>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow md:flex md:flex-col md:items-start md:justify-center md:p-6 xl:p-8">
          <Subheading subheading="Details" />
          <div className="grid grid-cols-6 gap-6">
            <SimpleSelect
              needSelect={true}
              id="txAccount-accountType"
              label="Type"
              options={accountType}
              register={register}
              errors={errors}
              name="accountType"
              required={true}
              optWithGrp={true}
            />
            <Input
              id="txAccount-accountCode"
              name="accountCode"
              label="Code"
              placeholder=""
              key="txAccount-accountCode"
              type="text"
              errors={errors}
              register={register}
              required={true}
            />
            <Input
              id="txAccount-accountName"
              name="accountName"
              label="Name"
              placeholder=""
              key="txAccount-accountName"
              type="text"
              errors={errors}
              register={register}
              required={true}
            />
            <ComplexSelect
              id="txAccount-taxCode"
              label="Tax Code"
              options={taxCodes ? Object.values(taxCodes?.entities) : []}
              register={register}
              errors={errors}
              name="taxCode"
              objvalue="taxCode"
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

            <SimpleSelect
              id="txAccount-classifyCashflow"
              label="Classification for statements of cash flows"
              options={cashFlowType}
              register={register}
              errors={errors}
              name="classifyCashflow"
            />
            <TextArea
              id="txAccount-notes"
              register={register}
              errors={errors}
              label="Notes"
              name="notes"
            />
            <FormCheckbox
              id="txAccount-inactiveAccount"
              register={register}
              errors={errors}
              label="Inactive Account"
              name="inactiveAccount"
            />
            {(watchType == "Bank" || watchType == "Credit Card") && (
              <>
                <div className="col-span-6 w-full">
                  <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
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
                  id="txAccount-bankAccountNo"
                  name="bankAccountNo"
                  label="Bank Account Number"
                  placeholder=""
                  key="txAccount-bankAccountNo"
                  type="text"
                  errors={errors}
                  register={register}
                  required={false}
                />
                <Input
                  id="txAccount-bankAccountName"
                  name="bankAccountName"
                  label="Bank Account Name"
                  placeholder=""
                  key="txAccount-bankAccountName"
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
