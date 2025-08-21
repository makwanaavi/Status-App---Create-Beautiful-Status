import React from "react";
import Header from "./components/Header";

const About: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p>This is the about page content.</p>
      </div>
    </>
  );
};

export default About;
