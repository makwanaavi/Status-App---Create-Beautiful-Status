import React from "react";
import Header from "./components/Header";

const About: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">About StatusApp</h2>
        <p className="mb-4">
          <strong>StatusApp</strong> is your go-to platform for sharing, discovering,
          and saving creative status updates for all occasions. Whether you want to
          express your mood, share a thought, or find inspiration, StatusApp provides
          a vibrant community and a rich collection of statuses across various
          categories.
        </p>
        <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
        <p className="mb-4">
          Our mission is to connect people through words and creativity. We believe
          that a simple status can brighten someone's day, spark a conversation, or
          inspire new ideas. StatusApp empowers users to express themselves and
          connect with others in meaningful ways.
        </p>
        <h3 className="text-xl font-semibold mb-2">Features</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Browse and search thousands of statuses in multiple categories.</li>
          <li>Create and share your own statuses with the community.</li>
          <li>Save your favorite statuses for quick access.</li>
          <li>Like and bookmark statuses you enjoy.</li>
          <li>Personalized user profiles and avatars.</li>
        </ul>
        <p>
          Join StatusApp today and become part of a growing community that celebrates
          creativity and connection!
        </p>
      </div>
    </>
  );
};

export default About;
