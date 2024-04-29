import React, { useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useAddNewTaxCodeMutation,
  useGetTaxCodeQuery,
} from "./taxCodeApiSlice";
import Heading from "../../../../hooks/Heading";
import Subheading from "../../../../hooks/Subheading";
import { MaxNameLength, MinNameLength } from "../../../../config/minMax";
import { namePattern } from "../../../../config/regexPatterns";
import CancelBtn from "../../../../elements/CancelBtn";
import SubmitBtn from "../../../../elements/SubmitBtn";
import Input from "../../../../elements/Input";

const TaxCode = () => {
  const { id } = useAuth();
  const { tcID } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues:
      !tcID &&
      {
        //   contactDesignation: "Individual",
        //   contactType: "Customer",
        //   contactIsActive: true,
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

  const [addNewTaxCode, { isLoading, isError, isSuccess }] =
    useAddNewTaxCodeMutation();

  const handleTaxCode = () => {};
  //   useEffect(() => {
  //     if (data) {
  //       reset({
  //         abn: data?.abn,
  //         billingAdd1: data?.billingAddress?.addressLine1,
  //         billingAdd2: data?.billingAddress?.addressLine2,
  //         billingPostCode: data?.billingAddress?.postalCode,
  //         billingState: data?.billingAddress?.state,
  //         billingSuburb: data?.billingAddress?.suburb,
  //         postalAdd1: data?.shippingAddress?.addressLine1,
  //         postalAdd2: data?.shippingAddress?.addressLine2,
  //         postalPostCode: data?.shippingAddress?.postalCode,
  //         postalSuburb: data?.shippingAddress?.suburb,
  //         postalState: data?.shippingAddress?.state,
  //         phoneNo: data?.phoneNo,
  //         contactDesignation: data?.designation,
  //         contactId: data?.contactId,
  //         contactIsActive: data?.isActive,
  //         companyName: data?.companyName,
  //         contactNotes: data?.notes,
  //         contactType: data?.contactType,
  //         email: data?.email,
  //         firstName: data?.firstName,
  //         lastName: data?.lastName,
  //         mobileNo: data?.mobileNo,
  //         websiteURL: data?.websiteURL,
  //       });
  //     }
  //   }, [data]);
  //   if (contactIsLoading && tcID) {
  //     return <LoadingMsg />;
  //   }
  //   if (contactIsError && tcID) {
  //     return <ErrorMsg />;
  //   }
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
            
          </div>
        </div>

        <div className="col-span-6 mt-6 sm:col-full">
          <CancelBtn handleClick={() => navigate("/dashboard/contacts")} />
          <SubmitBtn text={tcID ? "Update" : "Save"} />
        </div>
      </form>
    </div>
  );
};

export default TaxCode;
