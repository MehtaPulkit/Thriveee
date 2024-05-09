import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../../elements/Input";
import useAuth from "../../../../hooks/useAuth";
import { useUpdateUserAddressMutation } from "../user/userApiSlice";
import SubmitBtn from "../../../../elements/SubmitBtn";
import { toastAlerts } from "../../../../hooks/utils";

const UserAddress = ({ type, address }) => {
  const { id } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues:
      type == "Postal"
        ? {
            PostalAdd1: address?.addressLine1,
            PostalAdd2: address?.addressLine2,
            PostalSuburb: address?.suburb,
            PostalState: address?.state,
            PostalPostCode: address?.postalCode,
          }
        : {
            CurrentAdd1: address?.addressLine1,
            CurrentAdd2: address?.addressLine2,
            CurrentSuburb: address?.suburb,
            CurrentState: address?.state,
            CurrentPostCode: address?.postalCode,
          },
  });
  useEffect(() => {
    reset(
      type == "Postal"
        ? {
            PostalAdd1: address?.addressLine1,
            PostalAdd2: address?.addressLine2,
            PostalSuburb: address?.suburb,
            PostalState: address?.state,
            PostalPostCode: address?.postalCode,
          }
        : {
            CurrentAdd1: address?.addressLine1,
            CurrentAdd2: address?.addressLine2,
            CurrentSuburb: address?.suburb,
            CurrentState: address?.state,
            CurrentPostCode: address?.postalCode,
          }
    );
  }, [address]);

  const [updateUserAddress, { isLoading, isSuccess, isError, error }] =
    useUpdateUserAddressMutation();

  const handleAddressChange = async (data) => {
    const res = await updateUserAddress({
      id: id,
      type: type,
      addressLine1: type == "Postal" ? data?.PostalAdd1 : data?.CurrentAdd1,
      addressLine2: type == "Postal" ? data?.PostalAdd2 : data?.CurrentAdd2,
      suburb: type == "Postal" ? data?.PostalSuburb : data?.CurrentSuburb,
      state: type == "Postal" ? data?.PostalState : data?.CurrentState,
      postalCode:
        type == "Postal" ? data?.PostalPostCode : data?.CurrentPostCode,
    });

    if (res?.data?.isError || res?.error) {
      toastAlerts({ type: "error", message: `${res.error.data.message}` });
    } else {
      toastAlerts({
        type: "success",
        message: "Your address details are updated!",
      });
    }
  };
  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-semibold dark:text-white">
        {type} Address
      </h3>
      <form onSubmit={handleSubmit(handleAddressChange)}>
        <div className="grid grid-cols-6 gap-6">
          <Input
            id={`profile-${type}Add1`}
            name={`${type}Add1`}
            label="Address Line 1"
            placeholder=""
            key={`profile-${type}Add1`}
            type="text"
            errors={errors}
            //   pattern={namePattern}
            register={register}
            //   min={MinNameLength}
            //   max={MaxNameLength}
            required={true}
          />
          <Input
            id={`profile-${type}Add2`}
            name={`${type}Add2`}
            label="Address Line 2"
            placeholder=""
            key={`profile-${type}Add2`}
            type="text"
            errors={errors}
            //   pattern={namePattern}
            register={register}
            //   min={MinNameLength}
            //   max={MaxNameLength}
            required={false}
          />
          <Input
            id={`profile-${type}Suburb`}
            name={`${type}Suburb`}
            label="Suburb"
            placeholder=""
            key={`profile-${type}Suburb`}
            type="text"
            errors={errors}
            //   pattern={namePattern}
            register={register}
            //   min={MinNameLength}
            //   max={MaxNameLength}
            required={true}
          />
          <Input
            id={`profile-${type}State`}
            name={`${type}State`}
            label="State"
            placeholder=""
            key={`profile-${type}State`}
            type="text"
            errors={errors}
            //   pattern={namePattern}
            register={register}
            //   min={MinNameLength}
            //   max={MaxNameLength}
            required={true}
          />
          <Input
            id={`profile-${type}PostCode`}
            name={`${type}PostCode`}
            label="Postal Code"
            placeholder=""
            key={`profile-${type}PostCode`}
            type="text"
            errors={errors}
            //   pattern={namePattern}
            register={register}
            //   min={MinNameLength}
            //   max={MaxNameLength}
            required={true}
          />

          <div className="col-span-6 sm:col-full">
            <SubmitBtn text="Save" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserAddress;
