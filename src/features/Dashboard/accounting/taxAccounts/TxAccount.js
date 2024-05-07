import React, { useEffect, useState } from "react";
import {
  useAddNewTxAccountMutation,
  useCheckDuplicateTxAccountMutation,
  useGetTxAccountQuery,
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
  const {
    data,
    isLoading: txAccountIsLoading,
    isError: txAccountIsError,
  } = useGetTxAccountQuery(coaID, {
    refetchOnMountOrArgChange: true,
    skip: !coaID,
  });

  const {
    data: allAccounts,
    allAccountsIsError,
    allAccountsIsLoading,
    allAccountsIsFetching,
    allAccountsIsSuccess,
  } = useGetTxAccountsQuery();
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

  const [
    checkDuplicateTxAccount,
    {
      isLoading: checkDuplicateIsLoading,
      isSuccess: checkDuplicateIsSuccess,
      isError: checkDuplicateIsError,
    },
  ] = useCheckDuplicateTxAccountMutation();

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
    const [taxCodeId] =
      taxCodes &&
      Object.values(taxCodes.entities).filter(
        (code) => code.taxCode == taxCode
      );
    // Check if COA exists
    if (!coaID) {
      const checkDuplicate = await checkDuplicateTxAccount({ accountCode });
      if (checkDuplicate?.data?.isError || checkDuplicate?.error) {
        toast.error(`${checkDuplicate?.error?.data?.message}`, {
          theme: localStorage.theme,
          transition: Bounce,
        });
        return;
      }
    } else if (coaID && accountCode != data.accountCode) {
      toast.error(
        `An account already exists, please check account code and try again.`,
        {
          theme: localStorage.theme,
          transition: Bounce,
        }
      );
      return;
    }

    const res = coaID
      ? await updateTxAccount({
          accountId: coaID,
          classification,
          accountType,
          accountCode,
          accountName,
          taxCode: taxCodeId?.id,
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
          classification,
          accountType,
          accountCode,
          accountName,
          taxCode: taxCodeId?.id,
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

    if (res?.data?.isError || res?.error) {
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
      const taxCodeName =
        taxCodes &&
        Object.values(taxCodes?.entities).find((tc) => tc._id == data.taxCode)
          ?.taxCode;
      reset({
        classification: data.classification,
        accountType: data.accountType,
        accountCode: data.accountCode,
        accountName: data.accountName,
        taxCode: taxCodeName,
        notes: data.notes,
        openingBalance: data.openingBalance,
        classifyCashflow: data.classifyCashflow,
        inactiveAccount: data.inactiveAccount,
        bsb: data.bsb,
        bankAccountNo: data.bankAccountNo,
        bankAccountName: data.bankAccountName,
        companyTradingName: data.companyTradingName,
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
    }
  }, [watchType]);

  useEffect(() => {
    if (allAccounts && classification && !coaID) {
      const maxAccountCode =
        allAccounts &&
        Object.values(allAccounts?.entities)
          .filter(
            (acc) =>
              acc.classification === classification && !isNaN(acc.accountCode)
          )
          .reduce((max, acc) => Math.max(max, parseInt(acc.accountCode)), 0);

      const nextCode = maxAccountCode + 1;

      reset({
        accountCode: nextCode,
      });
    }
  }, [allAccounts, classification]);

  if (txAccountIsLoading && coaID) {
    return <LoadingMsg />;
  }
  if (txAccountIsError && coaID) {
    return <ErrorMsg />;
  }

  return (
    <div>
      <Heading heading={coaID ? "Update an account" : "Create new account"} />
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
            {![
              "Bank",
              "Income",
              "Other income",
              "Equity",
              "Other expense",
              "Expense",
              "",
              undefined,
              null,
            ].includes(watchType) && (
              <SimpleSelect
                id="txAccount-classifyCashflow"
                label="Classification for statements of cash flows"
                options={cashFlowType}
                register={register}
                errors={errors}
                name="classifyCashflow"
              />
            )}
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
