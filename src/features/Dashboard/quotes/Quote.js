import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import Heading from "../../../hooks/Heading";

const Quote = () => {
  const { id } = useAuth();
  const { qID } = useParams();
  return (
    <div>
      <Heading heading={qID ? "Update quote" : "Create new quote"} />
    </div>
  );
};

export default Quote;
