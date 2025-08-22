import React from "react";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";

const FAQ = () => {
  return (
    <>
      <Header />
      <CategoryFilter />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="mb-6">
          <h3 className="font-semibold mb-1">What is StatusApp?</h3>
          <p>
            StatusApp is a platform where users can share, discover, and save
            creative status updates for social media, messaging apps, and more.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-1">How do I create a new status?</h3>
          <p>
            Click the <strong>Create</strong> button in the header, write your
            status, and submit it to share with the community.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-1">Can I save or bookmark statuses?</h3>
          <p>
            Yes! You can like and bookmark any status to save it for later.
            Access your saved statuses from your profile.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-1">Is StatusApp free to use?</h3>
          <p>
            Absolutely. StatusApp is free for everyone. Simply sign up and start
            exploring!
          </p>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-1">How do I contact support?</h3>
          <p>
            Visit our{" "}
            <a
              href="/contact"
              className="text-pink-600 underline"
            >
              Contact
            </a>{" "}
            page to reach out to our support team.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Can I suggest new features?</h3>
          <p>
            We welcome your feedback! Please use the contact form to share your
            suggestions and ideas.
          </p>
        </div>
      </div>
    </>
  );
};

export default FAQ;
