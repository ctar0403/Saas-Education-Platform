"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  logoText?: string;
  logoColor?: string;
  homeLink?: string;
  aboutLink?: string;
  storeLink?: string;
  blogsLink?: string;
  contactLink?: string;
  buttonText?: string;
  buttonColor?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  logoText = "FINX",
  logoColor = "#032C3D",
  homeLink = "/templates/teaching",
  aboutLink = "/templates/teaching/about",
  storeLink = "/templates/teaching/store",
  blogsLink = "/templates/teaching/blogs",
  contactLink = "/templates/teaching/contact",
  buttonText = "Login",
  buttonColor = "#08AD98",
}) => {
  const pathname = usePathname();

  // Helper function to check if link is active
  const isActive = (path: string) => {
    if (path === "/templates/teaching") {
      return pathname === "/templates/teaching";
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <style>
        {`
          :root {
            --Temp2-Background-bg-Primary: #FFF;
            --Temp2-Text-Primary: #032C3D;
            --Temp2-Button-Primary-bg-primary: #08AD98;
          }
        `}
      </style>

      {/* Navigation - Exact Figma Design */}
      <div
        style={{
          display: "flex",
          padding: "24px 80px",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
          background: "#FFF",
          position: "relative",
        }}
      >
        {/* Logo */}
        <Link
          href={homeLink}
          style={{
            color: logoColor,
            fontFamily: "Roboto",
            fontSize: "36px",
            fontStyle: "normal",
            fontWeight: 800,
            lineHeight: "normal",
            position: "relative",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily:
                "Roboto, -apple-system, Roboto, Helvetica, sans-serif",
              fontWeight: 700,
              fontSize: "36px",
              color: logoColor,
            }}
          >
            {logoText}
          </span>
        </Link>

        {/* Navigation Menu */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            position: "relative",
          }}
        >
          <Link
            href={homeLink}
            style={{
              display: "flex",
              padding: "10px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              position: "relative",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                color: "#032C3D",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: isActive(homeLink) ? 600 : 400,
                lineHeight: "40px",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: isActive(homeLink) ? 700 : 400,
                color: "rgba(3,44,61,1)",
              }}
            >
              Home
            </span>
          </Link>

          <Link
            href={aboutLink}
            style={{
              display: "flex",
              padding: "10px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              position: "relative",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                color: "#032C3D",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: isActive(aboutLink) ? 600 : 400,
                lineHeight: "40px",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: isActive(aboutLink) ? 700 : 400,
                color: "rgba(3,44,61,1)",
              }}
            >
              About
            </span>
          </Link>

          <Link
            href={storeLink}
            style={{
              display: "flex",
              padding: "10px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              position: "relative",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                color: "#032C3D",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: isActive(storeLink) ? 600 : 400,
                lineHeight: "40px",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: isActive(storeLink) ? 700 : 400,
                color: "rgba(3,44,61,1)",
              }}
            >
              Store
            </span>
          </Link>

          <Link
            href={blogsLink}
            style={{
              display: "flex",
              padding: "10px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              position: "relative",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                color: "#2E2E2E",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: isActive(blogsLink) ? 600 : 400,
                lineHeight: "40px",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: isActive(blogsLink) ? 700 : 400,
                color: "rgba(46,46,46,1)",
              }}
            >
              Blogs
            </span>
          </Link>

          <Link
            href={contactLink}
            style={{
              display: "flex",
              padding: "10px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              position: "relative",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                color: "#2E2E2E",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: isActive(contactLink) ? 600 : 400,
                lineHeight: "40px",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: isActive(contactLink) ? 700 : 400,
                color: "rgba(46,46,46,1)",
              }}
            >
              Contact Us
            </span>
          </Link>
        </div>

        {/* Right Side Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "16px",
            position: "relative",
          }}
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/74db43e54b5ead003c9723b411c6410c05ffd34c?width=64"
            style={{
              width: "32px",
              height: "32px",
              position: "relative",
            }}
            alt="Global"
          />
          <div
            style={{
              display: "flex",
              padding: "16px 32px",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px",
              borderRadius: "10px",
              background: buttonColor,
              position: "relative",
            }}
          >
            <span
              style={{
                color: "#FFF",
                textAlign: "center",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "120%",
                letterSpacing: "0.32px",
              }}
            >
              {buttonText}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
