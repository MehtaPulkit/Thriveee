import React, { useEffect, useState } from "react";
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
  useAddNewContactMutation,
  useDeleteContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
} from "./contactApiSlice";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useNavigate, u } from "react-router-dom";
import SubmitBtn from "../../../elements/SubmitBtn";
import CancelBtn from "../../../elements/CancelBtn";
import ErrorMsg from "../../../hooks/ErrorMsg";
import LoadingMsg from "../../../hooks/LoadingMsg";
import DeleteBtn from "../../../elements/DeleteBtn";
import DeleteConfirmationDialog from "../../../hooks/DeleteConfirmationDialog";
import { toastAlerts } from "../../../hooks/utils";

const ContactPopup = ({ defaultContactType, setOpenModal, resetJob }) => {
  const { id } = useAuth();
  const { cID } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: !cID && {
      contactDesignation: "Individual",
      contactType: defaultContactType,
      contactIsActive: true,
    },
  });

  const {
    data,
    isLoading: contactIsLoading,
    isError: contactIsError,
  } = useGetContactQuery(cID, {
    refetchOnMountOrArgChange: true,
    skip: !cID,
  });

  const options = ["Customer", "Supplier", "Personal"];
  const designationOptions = ["Company", "Individual"];
  const sameAddress = watch("contactAddIsSame");
  const watchDesignation = watch("contactDesignation");

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [
    updateContact,
    {
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      isError: updateIsError,
      error,
    },
  ] = useUpdateContactMutation();

  const [addNewContact, { isLoading, isError, isSuccess }] =
    useAddNewContactMutation();

  const [
    deleteContact,
    // { isLoading: deleteloading, isSuccess, isError, error },
  ] = useDeleteContactMutation();

  const handleContactForm = async ({
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
    const res = cID
      ? await updateContact({
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
        })
      : await addNewContact({
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
    if (res?.data?.isError || res?.error) {
      toastAlerts({ type: "error", message: "There was some error!" });
    } else {
      toastAlerts({
        type: "success",
        message: cID ? "Contact is updated!" : "New customer created!",
      });
      resetJob({ contactId: res.data.id });
      setOpenModal(false);
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

  const handleDeleteContact = async () => {
    const res = await deleteContact({ id: cID });

    setShowDeletePopup(false);

    if (res?.data?.isError || res?.error) {
      toastAlerts({ type: "error", message: "There was some error!" });
    } else {
      toastAlerts({
        type: "success",
        message: "Contact deleted successfully!",
      });
      navigate("/dashboard/contacts");
    }
  };
  if (contactIsLoading && cID) {
    return <LoadingMsg />;
  }
  if (contactIsError && cID) {
    return <ErrorMsg />;
  }
  return (
    <div>
      <form className="w-full" onSubmit={handleSubmit(handleContactForm)}>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow md:flex md:flex-col md:items-start md:justify-center md:p-6 xl:p-8">
          <Subheading subheading="Details" />
          <div className="grid grid-cols-6 gap-6">
            {!defaultContactType && (
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
            )}
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
        <div className="col-span-6 mt-6 flex gap-4 justify-between sm:col-full">
          <div>
            <CancelBtn handleClick={() => setOpenModal(false)} />
            <SubmitBtn text={cID ? "Update" : "Save"} />
          </div>
          {cID && <DeleteBtn handleClick={() => setShowDeletePopup(true)} />}
        </div>
      </form>
      <DeleteConfirmationDialog
        open={showDeletePopup}
        onClose={() => setShowDeletePopup(!showDeletePopup)}
        onConfirm={handleDeleteContact}
      />
    </div>
  );
};

export default ContactPopup;
