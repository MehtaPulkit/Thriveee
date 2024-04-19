import React, { useEffect } from "react";
import Heading from "../../../hooks/Heading";
import Subheading from "../../../hooks/Subheading";
import Input from "../../../elements/Input";
import { useForm } from "react-hook-form";
import {
  MaxNameLength,
  MaxURLLength,
  MinNameLength,
  MinURLLength,
} from "../../../config/minMax";
import {
  abnPattern,
  emailPattern,
  mobilePattern,
  namePattern,
  phonePattern,
} from "../../../config/regexPatterns";
import RadioGrp from "../../../elements/RadioGrp";
import FormCheckbox from "../../../elements/FormCheckbox";
import ContactAddress from "./ContactAddress";
import TextArea from "../../../elements/TextArea";
import {
  useGetContactQuery,
  useUpdateContactMutation,
} from "./contactApiSlice";
import { Bounce, toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditContact = () => {
  const { id } = useAuth();
  const { cID } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contactDesignation: "Individual",
    },
  });
  const {
    data,
    isLoading: contactIsLoading,
    isError: contactIsError,
  } = useGetContactQuery(cID, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
const navigate= useNavigate();
  const options = ["Customer", "Supplier", "Personal"];
  const designationOptions = ["Company", "Individual"];
  const sameAddress = watch("contactAddIsSame");
  const watchDesignation = watch("contactDesignation");

  const [updateContact, { isLoading, isSuccess, isError, error }] =
    useUpdateContactMutation();

  const handleEditContactForm = async ({
    abn,
    billingAdd1,
    billingAdd2,
    billingPostCode,
    billingState,
    billingSuburb,
    postalAdd1,
    postalAdd2,
    postalPostCode,
    postalSuburb,
    postalState,
    phoneNo,
    contactAddIsSame,
    contactDesignation,
    contactId,
    contactIsActive,
    companyName,
    contactNotes,
    contactType,
    email,
    firstName,
    lastName,
    mobileNo,
    websiteURL,
  }) => {
    //TODO: Add conditional logic
    const res = await updateContact({
      cID: cID,
      userId: id,
      contactId: contactId,
      contactType: contactType,
      isActive: contactIsActive,
      firstName: firstName,
      lastName: lastName,
      email: email,
      designation: contactDesignation,
      mobileNo: mobileNo,
      phoneNo: phoneNo,
      abn: abn,
      websiteURL: websiteURL,
      companyName: companyName,
      notes: contactNotes,
      billingAddress: {
        addressLine1: billingAdd1,
        addressLine2: billingAdd2,
        suburb: billingSuburb,
        state: billingState,
        postalCode: billingPostCode,
      },
      shippingAddress: {
        addressLine1: contactAddIsSame ? billingAdd1 : postalAdd1,
        addressLine2: contactAddIsSame ? billingAdd2 : postalAdd2,
        suburb: contactAddIsSame ? billingSuburb : postalSuburb,
        state: contactAddIsSame ? billingState : postalState,
        postalCode: contactAddIsSame ? billingPostCode : postalPostCode,
      },
    });
    if (res.data) {
      toast.success("Your details are updated!", {
        theme: localStorage.theme,
        transition: Bounce,
      });
      navigate("/dashboard/contacts")
    } else if (res.error) {
      toast.error("There was some error!", {
        theme: localStorage.theme,
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        abn: data?.abn,
        billingAdd1: data?.billingAddress?.addressLine1,
        billingAdd2: data?.billingAddress?.addressLine2,
        billingPostCode: data?.billingAddress?.postalCode,
        billingState: data?.billingAddress?.state,
        billingSuburb: data?.billingAddress?.suburb,
        postalAdd1: data?.shippingAddress?.addressLine1,
        postalAdd2: data?.shippingAddress?.addressLine2,
        postalPostCode: data?.shippingAddress?.postalCode,
        postalSuburb: data?.shippingAddress?.suburb,
        postalState: data?.shippingAddress?.state,
        phoneNo: data?.phoneNo,
        contactDesignation: data?.designation,
        contactId: data?.contactId,
        contactIsActive: data?.isActive,
        companyName: data?.companyName,
        contactNotes: data?.notes,
        contactType: data?.contactType,
        email: data?.email,
        firstName: data?.firstName,
        lastName: data?.lastName,
        mobileNo: data?.mobileNo,
        websiteURL: data?.websiteURL,
      });
    }
  }, [data]);

  if (contactIsLoading && cID) {
    return <h3>....loading</h3>;
  }
  if (contactIsError && cID) {
    return <h3>Sorry.. some error occurred</h3>;
  }
  return (
    <div>
      <Heading heading="Create new contact" />
      <form className="w-full" onSubmit={handleSubmit(handleEditContactForm)}>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow md:flex md:flex-col md:items-start md:justify-center md:p-6 xl:p-8">
          <Subheading subheading="Details" />
          <div className="grid grid-cols-6 gap-6">
            <RadioGrp
              id="contact-type"
              register={register}
              errors={errors}
              name="contactType"
              required={true}
              requiredMessage="Contact Type is required"
              options={options}
              needHeading={true}
              heading="Contact Type"
            />
            <RadioGrp
              id="contact-designation"
              register={register}
              errors={errors}
              name="contactDesignation"
              required={true}
              requiredMessage="Contact Designation is required"
              options={designationOptions}
              needHeading={true}
              heading="Designation"
            />
            {watchDesignation === "Individual" ? (
              <>
                <Input
                  id="contact-firstName"
                  name="firstName"
                  label="First Name"
                  placeholder=""
                  key="contact-firstName"
                  type="text"
                  errors={errors}
                  pattern={namePattern}
                  register={register}
                  min={MinNameLength}
                  max={MaxNameLength}
                  required={true}
                />
                <Input
                  id="contact-lastName"
                  name="lastName"
                  label="Last Name"
                  placeholder=""
                  key="contact-lastName"
                  type="text"
                  errors={errors}
                  pattern={namePattern}
                  register={register}
                  min={MinNameLength}
                  max={MaxNameLength}
                  required={true}
                />
              </>
            ) : (
              <Input
                id="contact-companyName"
                name="companyName"
                label="Company Name"
                placeholder=""
                key="contact-companyName"
                type="text"
                errors={errors}
                pattern={namePattern}
                register={register}
                min={MinNameLength}
                max={MaxNameLength}
                required={true}
              />
            )}
            <Input
              id="contact-email"
              name="email"
              label="Email"
              key="contact-email"
              type="email"
              errors={errors}
              pattern={emailPattern}
              register={register}
              required={false}
            />
            <Input
              id="contact-mobileNo"
              name="mobileNo"
              label="Mobile Number"
              placeholder="e.g. 04XX XXX XXX"
              key="contact-mobileNo"
              type="text"
              errors={errors}
              pattern={mobilePattern}
              register={register}
              required={false}
            />
            {watchDesignation === "Company" && (
              <>
                <Input
                  id="contact-phoneNo"
                  name="phoneNo"
                  label="Phone Number"
                  placeholder="e.g. XX XXXX XXXX"
                  key="contact-phoneNo"
                  type="text"
                  errors={errors}
                  pattern={phonePattern}
                  register={register}
                  required={false}
                />
                <Input
                  id="contact-websiteURL"
                  name="websiteURL"
                  label="Website"
                  key="contact-websiteURL"
                  type="text"
                  errors={errors}
                  register={register}
                  required={false}
                  min={MinURLLength}
                  max={MaxURLLength}
                />
              </>
            )}
            <Input
              id="contact-contactId"
              name="contactId"
              label="Contact ID"
              placeholder=""
              key="contact-contactId"
              type="text"
              errors={errors}
              register={register}
              required={false}
            />
            <Input
              id="contact-abn"
              name="abn"
              label="ABN"
              placeholder=""
              key="contact-abn"
              type="text"
              errors={errors}
              pattern={abnPattern}
              register={register}
              required={false}
            />

            <FormCheckbox
              id="contact-isActive"
              key="contact-isActive"
              name="contactIsActive"
              errors={errors}
              register={register}
              required={false}
              label="is Active"
            />
          </div>
        </div>
        <div className="p-4 mt-6 bg-white dark:bg-gray-800 rounded-lg shadow md:flex md:flex-col md:items-start md:justify-center md:p-6 xl:p-8">
          <Subheading subheading="Billing Address" />
          <ContactAddress type="billing" errors={errors} register={register} />
        </div>
        <div className="p-4 mt-6 bg-white dark:bg-gray-800 rounded-lg shadow md:flex md:flex-col md:items-start md:justify-center md:p-6 xl:p-8">
          <Subheading subheading="Shipping Address" />
          <ContactAddress
            type="postal"
            errors={errors}
            register={register}
            sameAddress={sameAddress}
            isSameText="same as billing address"
          />
        </div>
        <div className="p-4 mt-6 bg-white dark:bg-gray-800 rounded-lg shadow md:p-6 xl:p-8">
          <Subheading subheading="More information" />
          <TextArea
            register={register}
            errors={errors}
            label="Notes"
            name="contactNotes"
            id="contact-notes"
          />
        </div>
        <div className="col-span-6 mt-6 sm:col-full">
          <button
            className="text-blue-600 mr-4 bg-white hover:bg-gray-100 focus:ring-4 border focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-primary-800"
            type="button"
            onClick={()=>navigate("/dashboard/contacts")}
          >
            Cancel
          </button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
            type="submit"
          >
            Save all
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContact;
