import React from "react";
import { Link } from "react-router-dom";
// You may need to install react-icons: npm install react-icons
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"],
    },
    {
      title: "Need Help?",
      links: [
        "Delivery Information",
        "Return & Refund Policy",
        "Payment Methods",
        "Track your Order",
        "Contact Us",
      ],
    },
  ];

  return (
    <footer className="px-4 md:px-20 py-12 bg-gradient-to-br from-pink-50 via-white to-purple-100 shadow-lg mt-16">
      <div className="flex flex-col md:flex-row items-start justify-between gap-14 py-12 border-b border-gray-300 text-gray-600">
        {/* Logo and About */}
        <div className="flex flex-col items-start mb-6 md:mb-0 max-w-xs">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-extrabold text-4xl">S</span>
            </div>
            <h1 className="text-3xl font-extrabold bg-pink-600 bg-clip-text text-transparent select-none">
              <Link to={"/"}>Status</Link>
            </h1>
          </div>
          <p className="text-base text-gray-500 mb-4">
            Discover, create, and share the best status updates for every mood
            and moment.
          </p>
          {/* Newsletter */}
          <form className="flex w-full mt-2">
            <input
              type="email"
              placeholder="Subscribe to newsletter"
              className="rounded-l-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 w-full"
            />
            <button
              type="submit"
              className="bg-pink-600 text-white px-4 py-2 rounded-r-lg font-semibold hover:bg-pink-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Links */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-10">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="text-base space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* Socials */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">Follow Us</h3>
            <div className="flex space-x-5 text-2xl">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-pink-600 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-blue-400 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-blue-700 transition"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="hover:text-red-600 transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="py-6 text-center text-base md:text-lg text-gray-600 font-semibold tracking-wide">
        © 2025 Status. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
