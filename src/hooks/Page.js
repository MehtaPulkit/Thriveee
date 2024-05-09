import React from "react";

const Page = () => {
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

  //Delete mutation
  // const [
  //   deleteContact,
    // { isLoading: deleteloading, isSuccess, isError, error },
  // ] = useDeleteContactMutation();


  //  handle form edit and add
  const handleForm = async () => {
    // const re=await ;
    // if (res?.data?.isError || res?.error) {
    //   toastAlerts({ type: "error", message: "There was some error!" });
    // } else {
    //   toastAlerts({
    //     type: "success",
    //     message: cID ? "Contact is updated!" : "New contact created!",
    //   });
    //   navigate("/dashboard/pages");
    // }
  };
  // Reset for Edit form

  //handle Delete
  const handleDelete = async () => {
    const res = await deleteContact({ id: cID });

    setShowDeletePopup(false);
    if (res?.data?.isError || res?.error) {
      toastAlerts({ type: "error", message: "There was some error!" });
    } else {
      toastAlerts({
        type: "success",
        message: "Contact deleted successfully!",
      });
      navigate("/dashboard/pages");
    }
  };
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
            <Input
              id="page-text"
              name="text"
              label="Text"
              key="page-text"
              type="text"
              errors={errors}
              // pattern={emailPattern}
              register={register}
              required={false}
            />
          </div>
        </div>
        <div className="col-span-6 mt-6 flex gap-4 justify-between sm:col-full">
          <CancelBtn handleClick={() => navigate("/dashboard/contacts")} />
          <SubmitBtn text={qID ? "Update" : "Save"} />
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

export default Page;
