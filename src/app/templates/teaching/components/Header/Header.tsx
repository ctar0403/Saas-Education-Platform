"use client";

import React from "react";

const Header = () => {
  return (
    <div
      className="header-container"
      style={{
        display: "flex",
        height: "820px",
        padding: "208px 80px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        alignSelf: "stretch",
        background:
          'url("https://cdn.builder.io/api/v1/image/assets%2Fe7e4e054f28544f2a05c2ce9a547d52a%2F3cfbb8bd580d43aa8970e119417dacc9")',
        position: "relative",
      }}
    >
      <div
        className="content-wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "24px",
          alignSelf: "stretch",
          position: "relative",
        }}
      >
        <div
          className="main-headline"
          style={{
            alignSelf: "stretch",
            color: "#FFF",
            textAlign: "center",
            fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "48px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "62px",
            position: "relative",
          }}
        >
          Are you a small business owner struggling to attract new customers?
        </div>

        <div
          className="sub-description"
          style={{
            alignSelf: "stretch",
            color: "#FFF",
            textAlign: "center",
            fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "33px",
            position: "relative",
          }}
        >
          Our proven strategies will help you build a strong online presence,
          generate quality leads, and convert them into loyal customers.
        </div>

        <button
          className="cta-button"
          style={{
            display: "flex",
            padding: "16px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            borderRadius: "10px",
            background: "#08AD98",
            position: "relative",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#06967f";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#08AD98";
          }}
        >
          <div
            className="button-text"
            style={{
              color: "#FFF",
              fontFamily:
                "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "40px",
              position: "relative",
            }}
          >
            Book your FREE consultation now
          </div>
        </button>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .header-container {
            height: auto !important;
            min-height: 600px !important;
            padding: 120px 40px !important;
          }
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 80px 20px !important;
            min-height: 500px !important;
          }

          .main-headline {
            font-size: 32px !important;
            line-height: 42px !important;
          }

          .sub-description {
            font-size: 18px !important;
            line-height: 28px !important;
          }

          .button-text {
            font-size: 16px !important;
            line-height: 32px !important;
          }
        }

        @media (max-width: 480px) {
          .header-container {
            padding: 60px 16px !important;
          }

          .main-headline {
            font-size: 28px !important;
            line-height: 36px !important;
          }

          .sub-description {
            font-size: 16px !important;
            line-height: 24px !important;
          }

          .content-wrapper {
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
