import React from "react";
import Header from "./components/Header";

const Contact: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p>This is the contact page content.</p>
      </div>
    </>
  );
};

export default Contact;
