"use client";

import React from "react";

const StoreHero = () => {
  return (
    <div className="relative h-64 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80')",
        }}
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60"
        style={{
          backgroundImage:
            "url(https://cdn.builder.io/api/v1/image/assets%2F046614d09b714830be9f4517b1d1f158%2Fd734cc359d0f459198bff3212c060dad)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-roboto font-bold">Store</h1>
      </div>
    </div>
  );
};

export default StoreHero;
