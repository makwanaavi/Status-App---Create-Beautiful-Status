import React from "react";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";

const Contact = () => {
  return (
    <>
      <Header />
      <CategoryFilter />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">
          Have questions, feedback, or need support? We'd love to hear from you! Fill out the form below or reach us through the provided contact details.
        </p>
        <form className="mb-8 max-w-lg">
          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="name">Name</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              id="name"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="email">Email</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="email"
              id="email"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="message">Message</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2"
              id="message"
              rows={4}
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
          >
            Send Message
          </button>
        </form>
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
          <p>Email: <a href="mailto:support@statusapp.com" className="text-pink-600 underline">support@statusapp.com</a></p>
          <p>Address: 123 Status Lane, Creativity City, 45678</p>
        </div>
      </div>
    </>
  );
};

export default Contact;
