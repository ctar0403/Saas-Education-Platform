"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
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
          href="/templates/teaching"
          style={{
            color: "#032C3D",
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
              color: "rgba(3,44,61,1)",
            }}
          >
            FINX
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
            href="/templates/teaching"
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
                fontWeight: isActive("/templates/teaching") ? 600 : 400,
                lineHeight: "40px",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: isActive("/templates/teaching") ? 700 : 400,
                color: "rgba(3,44,61,1)",
              }}
            >
              Home
            </span>
          </Link>

          <Link
            href="/templates/teaching/about"
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
                fontWeight: isActive("/templates/teaching/about") ? 600 : 400,
                lineHeight: "40px",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: isActive("/templates/teaching/about") ? 700 : 400,
                color: "rgba(3,44,61,1)",
              }}
            >
              About
            </span>
          </Link>

          <Link
            href="/templates/teaching/store"
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
                fontWeight: isActive("/templates/teaching/store") ? 600 : 400,
                lineHeight: "40px",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: isActive("/templates/teaching/store") ? 700 : 400,
                color: "rgba(3,44,61,1)",
              }}
            >
              Store
            </span>
          </Link>

          <Link
            href="/templates/teaching/blogs"
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
                fontWeight: isActive("/templates/teaching/blogs") ? 600 : 400,
                lineHeight: "40px",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: isActive("/templates/teaching/blogs") ? 700 : 400,
                color: "rgba(46,46,46,1)",
              }}
            >
              Blogs
            </span>
          </Link>

          <Link
            href="/templates/teaching/contact"
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
                fontWeight: isActive("/templates/teaching/contact") ? 600 : 400,
                lineHeight: "40px",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: isActive("/templates/teaching/contact") ? 700 : 400,
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
              background: "#08AD98",
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
              Login
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
