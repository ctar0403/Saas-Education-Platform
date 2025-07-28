import { Facebook, Instagram, X } from "lucide-react";
import Link from "next/link";

type FooterProps = {
  copyright?: string;
  poweredByText?: string;
  poweredByBrand?: string;
  poweredByColor?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  xUrl?: string;
  termsUrl?: string;
  privacyUrl?: string;
  bgColor?: string;
};

const Footer = ({
  copyright = "@2024 Kadnya",
  poweredByText = "Powered By",
  poweredByBrand = "Kadnya",
  poweredByColor = "#FB923C",
  instagramUrl = "#",
  facebookUrl = "#",
  xUrl = "#",
  termsUrl = "#",
  privacyUrl = "#",
  bgColor = "#1C1817",
}: FooterProps) => {
  return (
    <footer
      className="text-white py-10 px-4 text-center"
      style={{ backgroundColor: bgColor }}
    >
      <div className="space-y-6">
        {/* Copyright */}
        <p className="text-sm font-semibold tracking-wide">{copyright}</p>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-6">
          <Link href={instagramUrl} aria-label="Instagram">
            <Instagram className="w-8 h-8 hover:text-orange-500 transition" />
          </Link>
          <Link href={facebookUrl} aria-label="Facebook">
            <Facebook className="w-8 h-8 hover:text-orange-500 transition" />
          </Link>
          <Link href={xUrl} aria-label="X (Twitter)">
            <X className="w-8 h-8 hover:text-orange-500 transition" />
          </Link>
        </div>

        {/* Powered by */}
        <p className="text-sm">
          {poweredByText}{" "}
          <span className="font-medium" style={{ color: poweredByColor }}>
            {poweredByBrand}
          </span>
        </p>

        {/* Links */}
        <div className="space-x-2 text-xs tracking-wide">
          <Link
            href={termsUrl}
            className="underline hover:text-orange-500 transition"
          >
            Terms & Conditions
          </Link>
          <span>|</span>
          <Link
            href={privacyUrl}
            className="underline hover:text-orange-500 transition"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
