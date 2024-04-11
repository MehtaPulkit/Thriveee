import { Link } from "react-router-dom";
import confirm from "../../assets/signup-confirm.jpeg";
import tick from "../../assets/tick-gif.gif";
const SignupConfirmation = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-gray-600 flex justify-center items-center">
        <img src={tick} alt="tick" className="inline " />
        You are all set to Thrive!
      </h2>
      <img src={confirm} alt="confirmation" className="confirm-img" />
      <Link
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        to="/auth/login"
      >
        Lets go!
      </Link>
    </div>
  );
};

export default SignupConfirmation;