import { store } from "../../app/store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { userApiSlice } from "../Dashboard/account/userApiSlice";
import { addressApiSlice } from "../Dashboard/account/Address/addressApiSlice";

const Prefetch = () => {
  useEffect(() => {
    // store.dispatch(
    //   userApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    // );
    // store.dispatch(
    //   addressApiSlice.util.prefetch("getAddresses", "addressesList", { force: true })
    // );
  }, []);

  return <Outlet />;
};
export default Prefetch;
