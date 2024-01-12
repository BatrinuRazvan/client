import React from "react";
import Formats from "../components/Formats";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <Formats />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
