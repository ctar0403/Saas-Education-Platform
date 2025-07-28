"use client";
import { Mail, Phone } from "lucide-react";

type ContactSectionProps = {
  heading?: string;
  description?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  messagePlaceholder?: string;
  buttonText?: string;
  buttonColor?: string;
  bgColor?: string;
  phoneLabel?: string;
  phoneValue?: string;
  emailLabel?: string;
  emailValue?: string;
};

const ContactSection = ({
  heading = "Get in Touch",
  description = "We're here to answer your questions and help you embark on your culinary journey.",
  namePlaceholder = "Your Name",
  emailPlaceholder = "Email Address",
  messagePlaceholder = "Message",
  buttonText = "Send Message",
  buttonColor = "#FB923C",
  bgColor = "#1E1A1A",
  phoneLabel = "Phone",
  phoneValue = "03 5432 1234",
  emailLabel = "Email",
  emailValue = "info@cook.com",
}: ContactSectionProps) => {
  return (
    <section
      className="text-white py-16 px-10 md:px-4"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">{heading}</h2>
        <p className="text-sm md:text-base text-gray-300">{description}</p>

        {/* Form */}
        <form className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder={namePlaceholder}
              className="w-full px-4 py-3 focus:outline-0 rounded-md bg-white text-black placeholder:text-gray-500"
            />
            <input
              type="email"
              placeholder={emailPlaceholder}
              className="w-full px-4 py-3 focus:outline-0 rounded-md bg-white text-black placeholder:text-gray-500"
            />
          </div>
          <textarea
            placeholder={messagePlaceholder}
            rows={5}
            className="w-full px-4 py-3 focus:outline-0 rounded-md bg-white text-black placeholder:text-gray-500 resize-none"
          ></textarea>
          <button
            type="submit"
            style={{ backgroundColor: buttonColor }}
            className="hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-md transition"
          >
            {buttonText}
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-start md:justify-center items-center gap-6 pt-8 text-sm text-gray-300">
          <div className="flex items-start gap-2">
            <Phone size={48} className="border border-white rounded-full p-3" />
            <div>
              <p className="text-start text-white font-semibold">{phoneLabel}</p>
              <p>{phoneValue}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Mail size={48} className="border border-white rounded-full p-3" />
            <div>
              <p className="text-start text-white font-semibold">{emailLabel}</p>
              <p>{emailValue}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
