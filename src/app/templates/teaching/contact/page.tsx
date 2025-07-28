import React from "react";
import Navigation from "../components/Navigation/Navigation";
import LightFooter from "../components/Footer/LightFooter";
import ContactHero from "./components/ContactHero/ContactHero";
import ContactFooter from "./components/ContactFooter/ContactFooter";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <ContactHero />
      <LightFooter />
    </div>
  );
};

export default ContactPage;
