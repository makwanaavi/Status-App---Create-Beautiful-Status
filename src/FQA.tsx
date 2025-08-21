import React from "react";
import Header from "./components/Header";

const FQA: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <p>This is the FQA page content.</p>
      </div>
    </>
  );
};

export default FQA;
