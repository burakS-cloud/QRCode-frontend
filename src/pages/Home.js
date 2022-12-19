import React from "react";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import Navbar from "../components/Navbar";
import travel_01 from "../assets/travel-01.jpg";
import travel_02 from "../assets/travel-02.jpg";
import travel_03 from "../assets/travel-03.jpg";
import peopleImg from "../assets/people.jpeg";
import "./Home.css";
import ContactForm from "../components/ContactForm";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <Hero imageSrc={peopleImg} />
        <Slider
          imageSrc={travel_02}
          title={"Be an explorer."}
          subtitle={
            "Our platform offers a wide variety of unique travel locations!"
          }
        />
        <Slider
          imageSrc={travel_03}
          title={"Memories for a lifetime."}
          subtitle={"Your dream vacation is only a few clicks away."}
          flipped={true}
        />
        <Slider
          imageSrc={travel_01}
          title={"Be an extrovert."}
          subtitle={
            "Make your loved ones happy by sending them custom messages."
          }
        />
        <ContactForm />
      </div>
    </>
  );
};

export default Home;
