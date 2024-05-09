import { Bounce, toast } from "react-toastify";

export const toastAlerts = ({ type, message }) => {
  return toast[type](message, {
    theme: localStorage.theme,
    transition: Bounce,
  });
};
