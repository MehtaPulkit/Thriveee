import React from "react";
import Banner from "./Banner";
import Services from "./Services";
import InfoPara from "./InfoPara";
import Features from "./Features";
import Products from "./Products";


const Home = () => {
  return (
    <main className="mt-8 home">
     <Banner/>
     {/* <Products/> */}

     <Features/>
     <InfoPara/>
     <Services/>
    </main>
  );
};

export default Home;
