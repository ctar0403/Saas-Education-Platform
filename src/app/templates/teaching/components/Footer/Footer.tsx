import React from "react";
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

interface FooterProps {
  copyright?: string;
  poweredByText?: string;
  poweredByBrand?: string;
  termsText?: string;
  privacyText?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  backgroundColor?: string;
}

const Footer: React.FC<FooterProps> = ({
  copyright = "@2024 Kadnya",
  poweredByText = "Powered By",
  poweredByBrand = "Kadnya",
  termsText = "Terms & Conditions",
  privacyText = "Privacy Policy",
  instagramUrl = "#",
  facebookUrl = "#",
  twitterUrl = "#",
  linkedinUrl = "#",
  backgroundColor = "#043A51",
}) => {
  const socialIcons = [
    {
      icon: (
        <Instagram className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
      ),
      href: instagramUrl,
    },
    {
      icon: (
        <Facebook className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
      ),
      href: facebookUrl,
    },
    {
      icon: (
        <Twitter className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
      ),
      href: twitterUrl,
    },
    {
      icon: (
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white">
          <svg
            width="20"
            height="20"
            className="sm:w-7 sm:h-7 md:w-8 md:h-8"
            viewBox="0 0 35 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 5.18994C17.6196 5.19577 17.7509 5.19577 17.7684 5.19577C18.83 5.19577 22.4394 5.48963 24.1398 9.32577C24.7064 10.6047 24.5635 12.8491 24.4497 14.6501C24.4315 14.9323 24.414 15.1963 24.4023 15.4544C24.4322 15.4843 24.6706 15.7184 25.2073 15.7184C25.6011 15.7184 26.0546 15.5981 26.5614 15.3582C26.6452 15.3159 26.7524 15.2984 26.8654 15.2984C27.2949 15.2984 27.8199 15.5747 27.8972 15.9707C27.9388 16.2047 27.8498 16.6612 26.7276 17.1053C26.6263 17.1475 26.495 17.1891 26.3579 17.2314C25.7972 17.4115 24.9441 17.6813 24.6874 18.2996C24.5445 18.6358 24.5861 19.0499 24.8187 19.5239C24.8245 19.5239 24.8245 19.5297 24.8245 19.5356C24.896 19.6974 26.5964 23.5992 30.3902 24.2299C30.5273 24.2482 30.6287 24.3743 30.6228 24.518C30.617 24.5719 30.6046 24.6259 30.5813 24.6798C30.426 25.0459 29.7223 25.568 27.2526 25.9522C27.0441 25.988 26.9661 26.3008 26.853 26.8046C26.8115 27.003 26.7634 27.2071 26.7036 27.4171C26.6321 27.6629 26.471 27.6935 26.3215 27.6935C26.1786 27.6935 25.9875 27.6578 25.7666 27.6155C25.4086 27.5433 24.9135 27.447 24.2871 27.447C23.9407 27.447 23.5769 27.4769 23.2196 27.5374C22.4737 27.6636 21.8473 28.1076 21.1794 28.5816C20.2205 29.2736 19.2179 29.9816 17.667 29.9816C17.6196 29.9816 17.5 29.9758 17.5 29.9758C17.5 29.9758 17.3804 29.9816 17.333 29.9816C15.7821 29.9816 14.7795 29.2736 13.8192 28.5831C13.1513 28.1091 12.5249 27.6643 11.779 27.5389C11.421 27.4791 11.0571 27.4485 10.7115 27.4485C10.0851 27.4485 9.59002 27.5447 9.232 27.6169C9.01106 27.6592 8.82002 27.6949 8.6771 27.6949C8.52762 27.6949 8.36721 27.665 8.29502 27.4186C8.23523 27.2086 8.18783 27.0044 8.14554 26.8061C8.03252 26.3022 7.9545 25.9894 7.74596 25.9537C5.27627 25.5694 4.57189 25.0473 4.41731 24.6813C4.39325 24.6273 4.38158 24.5734 4.37502 24.5187C4.36919 24.3743 4.47054 24.2489 4.60762 24.2307C8.40148 23.6007 10.1019 19.6989 10.1734 19.5363C10.1734 19.5305 10.1734 19.5246 10.1792 19.5246C10.4118 19.0507 10.4534 18.6365 10.3104 18.3004C10.0538 17.682 9.20064 17.4122 8.63..."
              fill="white"
            />
          </svg>
        </div>
      ),
      href: "#",
    },
    {
      icon: (
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white">
          <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
        </div>
      ),
      href: linkedinUrl,
    },
  ];

  return (
    <footer className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24" style={{ backgroundColor }}>
      <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-4xl text-center">
        <h3 className="w-full text-white font-poppins text-base sm:text-lg font-semibold leading-8 sm:leading-10">
          {copyright}
        </h3>

        <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 w-full flex-wrap">
          {socialIcons.map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="hover:scale-110 transition-transform"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <p className="w-full text-center font-poppins text-xs sm:text-sm font-normal leading-8 sm:leading-10">
          <span className="text-white">{poweredByText} </span>
          <span className="text-[#08AD98]">{poweredByBrand}</span>
        </p>

        <p className="w-full text-white text-center font-poppins text-xs font-light leading-8 sm:leading-10 underline">
          <span className="font-semibold">{termsText}</span>
          <span> | </span>
          <span className="font-semibold">{privacyText}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
