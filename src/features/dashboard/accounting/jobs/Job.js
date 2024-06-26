import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toastAlerts } from "../../../../hooks/utils";
import Heading from "../../../../hooks/Heading";
import Subheading from "../../../../hooks/Subheading";
import CancelBtn from "../../../../elements/CancelBtn";
import SubmitBtn from "../../../../elements/SubmitBtn";
import DeleteConfirmationDialog from "../../../../hooks/DeleteConfirmationDialog";
import {
  useAddNewJobMutation,
  useDeleteJobMutation,
  useGetJobQuery,
  useUpdateJobMutation,
} from "./jobsApiSlice";
import TextArea from "../../../../elements/TextArea";
import FormCheckbox from "../../../../elements/FormCheckbox";
import DeleteBtn from "../../../../elements/DeleteBtn";
import Input from "../../../../elements/Input";
import ErrorMsg from "../../../../hooks/ErrorMsg";
import LoadingMsg from "../../../../hooks/LoadingMsg";
import SelectWithAdd from "../../../../elements/SelectWithAdd";
import PopUpModal from "../../../../hooks/PopupModal";
import { useGetContactsQuery } from "../../contacts/contactApiSlice";
import Contact from "../../contacts/Contact";

const Job = () => {
  //User Id
  const { id } = useAuth();

  // Edit Id
  const { jobID } = useParams();
  //navigate to url
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [customerOptions, setCustomerOptions] = useState();
  const [customerOptLabels, setCustomerOptLabels] = useState();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  // Use form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: !jobID && {
      status: "Open",
    },
  });
  const {
    data: contacts,
    isError,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetContactsQuery();

  // any watch fields
  const watchContact = watch("contactId");
  // Get Edit data
  const {
    data,
    isLoading: jobIsLoading,
    isError: jobIsError,
  } = useGetJobQuery(jobID, {
    refetchOnMountOrArgChange: true,
    skip: !jobID,
  });

  // Add mutation

  const [addNewJob] = useAddNewJobMutation();

  const [updateJob] = useUpdateJobMutation();
  //Delete mutation
  const [deleteJob] = useDeleteJobMutation();

  //  handle form edit and add
  const handleForm = async ({
    jobNo,
    jobName,
    description,
    inActive,
    contactId,
  }) => {
    const res = jobID
      ? await updateJob({
          jobId: jobID,
          jobNo,
          jobName,
          description,
          inActive,
          contactId,
        })
      : await addNewJob({
          userId: id,
          jobNo,
          jobName,
          description,
          inActive,
          contactId,
        });
    if (res?.data?.isError || res?.error) {
      toastAlerts({ type: "error", message: "There was some error!" });
    } else {
      toastAlerts({
        type: "success",
        message: jobID ? "Job is updated!" : "New job created!",
      });
      navigate("/dashboard/accounting/jobs");
    }
  };
  // Reset for Edit form

  //handle Delete
  const handleDelete = async () => {
    const res = await deleteJob({ id: jobID });

    setShowDeletePopup(false);
    if (res?.data?.isError || res?.error) {
      toastAlerts({ type: "error", message: "There was some error!" });
    } else {
      toastAlerts({
        type: "success",
        message: "Job deleted successfully!",
      });
      navigate("/dashboard/jobs");
    }
  };
  useEffect(() => {
    if (data) {
      reset({
        jobNo: data?.jobNo,
        jobName: data?.jobName,
        description: data?.description,
        inActive: data?.inActive,
        contactId: data?.contactId,
      });
    }
  }, [data]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    if (watchContact == "add") {
      setOpenModal(true);
    }
  }, [watchContact]);

  useEffect(() => {
    if (!contacts?.entities) return;

    let filteredData = Object.values(contacts.entities).filter(
      (t) => t.contactType === "Customer"
    );
    setCustomerOptions(filteredData);
    setCustomerOptLabels(
      filteredData.map((d) => ({
        _id: d._id,
        label:
          d.designation == "Company"
            ? d.companyName
            : d.firstName + " " + d.lastName,
      }))
    );
  }, [contacts]);

  //Edit data loading or error msgs
  if (jobIsLoading && jobID) {
    return <LoadingMsg />;
  }
  if (jobIsError && jobID) {
    return <ErrorMsg />;
  }

  return (
    <div>
      <Heading heading={jobID ? "Update job" : "Create job"} />
      <form className="w-full" onSubmit={handleSubmit(handleForm)}>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow md:flex md:flex-col md:items-start md:justify-center md:p-6 xl:p-8">
          <Subheading subheading="Details" />
          <div className="grid grid-cols-6 gap-6">
            <Input
              id="job-jobNo"
              name="jobNo"
              label="Job number"
              key="job-jobNo"
              type="jobNo"
              errors={errors}
              register={register}
              required={true}
            />
            <Input
              id="job-jobName"
              name="jobName"
              label="Job name"
              key="job-jobName"
              type="jobName"
              errors={errors}
              register={register}
              required={true}
            />
            <TextArea
              id="job-description"
              name="description"
              label="Description"
              key="job-description"
              type="description"
              errors={errors}
              register={register}
            />
            <SelectWithAdd
              id="job-contactId"
              name="contactId"
              label="Linked customer"
              key="job-contactId"
              type="contactId"
              options={customerOptions}
              objvalue={"_id"}
              optLabels={customerOptLabels}
              errors={errors}
              register={register}
              value={watchContact}
              addTitle="Create Customer"
            />
            <FormCheckbox
              id="job-inActive"
              name="inActive"
              label="Inactive job"
              key="job-inActive"
              type="inActive"
              errors={errors}
              register={register}
            />
          </div>
        </div>
        <div className="col-span-6 mt-6 flex gap-4 justify-between sm:col-full">
          <div>
            <CancelBtn
              handleClick={() => navigate("/dashboard/accounting/jobs")}
            />
            <SubmitBtn text={jobID ? "Update" : "Save"} />
          </div>
          {jobID && <DeleteBtn handleClick={() => setShowDeletePopup(true)} />}
        </div>
      </form>
      <DeleteConfirmationDialog
        open={showDeletePopup}
        onClose={() => setShowDeletePopup(!showDeletePopup)}
        onConfirm={handleDelete}
      />
      <PopUpModal
        title={"Create Customer"}
        content={
          <Contact
            defaultContactType="Customer"
            setOpenModal={setOpenModal}
            resetJob={reset}
            isPopup={true}
          />
        }
        openModal={openModal}
        setOpenModal={setOpenModal}
        reset={reset}
      />
    </div>
  );
};

export default Job;
