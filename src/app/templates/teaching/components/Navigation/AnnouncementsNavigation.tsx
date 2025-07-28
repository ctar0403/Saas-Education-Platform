"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AnnouncementsNavigation = () => {
  const pathname = usePathname();

  // Helper function to check if link is active
  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <>
      <style>
        {`
          :root {
            --Temp1-Background-bg-Primary: #FFF;
            --Text-color2: #011117;
          }
        `}
      </style>

      {/* Navigation - Member Menu Design */}
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
            color: "#011117",
            fontFamily: "Poppins",
            fontSize: "36px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
            position: "relative",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily:
                "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
              fontWeight: 700,
              fontSize: "36px",
              color: "rgba(1,17,23,1)",
            }}
          >
            FinX
          </span>
        </Link>

        {/* Navigation Menu */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
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
                color: "#2E2E2E",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight:
                  isActive("/templates/teaching") &&
                  pathname === "/templates/teaching"
                    ? 600
                    : 400,
                lineHeight: "40px",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight:
                  isActive("/templates/teaching") &&
                  pathname === "/templates/teaching"
                    ? 700
                    : 400,
                color: "rgba(46,46,46,1)",
              }}
            >
              Dashboard
            </span>
          </Link>

          <Link
            href="/templates/teaching/member-directory"
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
                fontWeight: isActive("/templates/teaching/member-directory")
                  ? 600
                  : 400,
                lineHeight: "40px",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: isActive("/templates/teaching/member-directory")
                  ? 700
                  : 400,
                color: "rgba(46,46,46,1)",
              }}
            >
              Member directory
            </span>
          </Link>

          <Link
            href="/templates/teaching/announcements"
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
                fontWeight: isActive("/templates/teaching/announcements")
                  ? 600
                  : 400,
                lineHeight: "40px",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: isActive("/templates/teaching/announcements")
                  ? 700
                  : 400,
                color: "rgba(46,46,46,1)",
              }}
            >
              Announcements
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
                color:
                  pathname === "/templates/teaching/store"
                    ? "#011117"
                    : "#2E2E2E",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight:
                  pathname === "/templates/teaching/store" ? 700 : 400,
                lineHeight: "40px",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Store
            </span>
          </Link>

          <Link
            href="/templates/teaching/library"
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
                color: "#011117",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: isActive("/templates/teaching/library") ? 600 : 400,
                lineHeight: "40px",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: isActive("/templates/teaching/library") ? 700 : 400,
                color: "rgba(1,17,23,1)",
              }}
            >
              My Library
            </span>
          </Link>
        </div>

        {/* Right Side Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            position: "relative",
          }}
        >
          {/* Notification Icon */}
          <svg
            style={{
              width: "32px",
              height: "32px",
              position: "relative",
            }}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5182 2.67838C10.1292 2.93221 5.99997 7.56226 5.99997 12.9206V17.7656L4.23304 21.3203C4.22993 21.3268 4.22689 21.3333 4.22393 21.3398C3.51309 22.8515 4.66377 24.6667 6.3346 24.6667H12C12 26.8639 13.8027 28.6667 16 28.6667C18.1972 28.6667 20 26.8639 20 24.6667H25.664C27.3349 24.6667 28.487 22.8519 27.776 21.3398C27.773 21.3333 27.77 21.3268 27.7669 21.3203L26 17.7656V12.6667C26 6.99586 21.2422 2.40891 15.5182 2.67838ZM15.6119 4.67578C20.2253 4.45859 24 8.10813 24 12.6667V18C23.9998 18.1545 24.0355 18.3069 24.1041 18.4453L25.9661 22.1927C26.0859 22.4493 25.9473 22.6667 25.664 22.6667H6.3346C6.05132 22.6667 5.9139 22.4497 6.03382 22.1927V22.1914L7.8958 18.4453C7.96445 18.3069 8.00011 18.1545 7.99997 18V12.9206C7.99997 8.58688 11.3196 4.87795 15.6119 4.67578ZM14 24.6667H18C18 25.7828 17.1161 26.6667 16 26.6667C14.8839 26.6667 14 25.7828 14 24.6667Z"
              fill="#232024"
            />
          </svg>

          {/* Unread Message Icon */}
          <svg
            style={{
              width: "32px",
              height: "32px",
              position: "relative",
            }}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.99996 3.33333C4.61329 3.33333 2.66663 5.28 2.66663 7.66667V20.3333C2.66663 22.72 4.61329 24.6667 6.99996 24.6667H14.7669C14.7002 24.2333 14.6666 23.7867 14.6666 23.3333C14.6666 23.1067 14.6738 22.8867 14.7005 22.6667H6.99996C5.71329 22.6667 4.66663 21.62 4.66663 20.3333V10.6771L15.5247 16.5469C15.6707 16.6257 15.834 16.667 16 16.667C16.1659 16.667 16.3292 16.6257 16.4752 16.5469L27.3333 10.6771V15.6471C28.0666 16.0271 28.74 16.5139 29.3333 17.0872V7.66667C29.3333 5.28 27.3866 3.33333 25 3.33333H6.99996ZM6.99996 5.33333H25C26.2866 5.33333 27.3333 6.38 27.3333 7.66667V8.40364L16 14.5299L4.66663 8.40364V7.66667C4.66663 6.38 5.71329 5.33333 6.99996 5.33333ZM23.3333 16C19.2833 16 16 19.2833 16 23.3333C16 27.3833 19.2833 30.6667 23.3333 30.6667C27.3833 30.6667 30.6666 27.3833 30.6666 23.3333C30.6666 19.2833 27.3833 16 23.3333 16ZM23.944 19.3359C24.1006 19.3225 24.2583 19.3656 24.3893 19.4596C24.5639 19.585 24.6666 19.786 24.6666 20V26.6667C24.6666 27.0353 24.368 27.3333 24 27.3333C23.632 27.3333 23.3333 27.0353 23.3333 26.6667V20.9258L22.2109 21.2995C21.8596 21.4175 21.4838 21.2269 21.3671 20.8776C21.2505 20.5283 21.4397 20.1512 21.789 20.0352L23.789 19.3685C23.8399 19.3512 23.8918 19.3404 23.944 19.3359Z"
              fill="#FB8303"
            />
          </svg>

          {/* Global Icon */}
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/74db43e54b5ead003c9723b411c6410c05ffd34c?width=64"
            style={{
              width: "32px",
              height: "32px",
              position: "relative",
            }}
            alt="Global"
          />

          {/* Avatar with Status */}
          <div style={{ position: "relative" }}>
            <svg
              style={{
                width: "48px",
                height: "48px",
                position: "relative",
              }}
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="24" fill="url(#pattern0_3846_26)" />
              <circle cx="42" cy="6" r="5.5" fill="#17B26A" stroke="white" />
              <defs>
                <pattern
                  id="pattern0_3846_26"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use transform="scale(0.005)" />
                </pattern>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementsNavigation;
