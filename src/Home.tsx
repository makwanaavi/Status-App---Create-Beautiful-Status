import React from "react";
import Header from "./components/Header";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Welcome to Home Page</h2>
        <p>This is the home page content.</p>
      </div>
    </>
  );
};

export default Home;
