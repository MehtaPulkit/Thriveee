import React from "react";
import Input from "../../../elements/Input";
import FormCheckbox from "../../../elements/FormCheckbox";

const ContactAddress = ({
  type,
  errors,
  register,
  sameAddress,
  setSameAddress,
  isSameText,
}) => {
  return (
    <div className="grid grid-cols-6 gap-6">
      {type == "postal" && (
        <FormCheckbox
          register={register}
          errors={errors}
          id={`contact-isSame`}
          label={isSameText}
          name="contactAddIsSame"
        />
      )}
      {!sameAddress && (
        <>
          <Input
            id={`contact-${type}Add1`}
            name={`${type}Add1`}
            label="Address Line 1"
            placeholder=""
            key={`contact-${type}Add1`}
            type="text"
            errors={errors}
            register={register}
            required={false}
          />
          <Input
            id={`contact-${type}Add2`}
            name={`${type}Add2`}
            label="Address Line 2"
            placeholder=""
            key={`contact-${type}Add2`}
            type="text"
            errors={errors}
            register={register}
            required={false}
          />
          <Input
            id={`contact-${type}Suburb`}
            name={`${type}Suburb`}
            label="Suburb"
            placeholder=""
            key={`contact-${type}Suburb`}
            type="text"
            errors={errors}
            register={register}
            required={false}
          />
          <Input
            id={`contact-${type}State`}
            name={`${type}State`}
            label="State"
            placeholder=""
            key={`contact-${type}State`}
            type="text"
            errors={errors}
            register={register}
            required={false}
          />
          <Input
            id={`contact-${type}PostCode`}
            name={`${type}PostCode`}
            label="Postal Code"
            placeholder=""
            key={`contact-${type}PostCode`}
            type="text"
            errors={errors}
            register={register}
            required={false}
          />
        </>
      )}
    </div>
  );
};

export default ContactAddress;
