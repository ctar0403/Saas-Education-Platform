import React from "react";

type ValueStackProps = {
  value1?: string;
  value2?: string;
  value3?: string;
  backgroundColor?: string;
};

export default function ValueStack({
  value1 = "Confidence",
  value2 = "Health & Flavor",
  value3 = "Time & Money",
  backgroundColor = "#F5E3C2",
}: ValueStackProps) {
  return (
    <section className="w-full" style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-5 md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-10 text-center">
        {value1 && (
          <span className="text-base md:text-lg font-semibold text-black">
            {value1}
          </span>
        )}
        {value2 && (
          <span className="text-base md:text-lg font-semibold text-black">
            {value2}
          </span>
        )}
        {value3 && (
          <span className="text-base md:text-lg font-semibold text-black">
            {value3}
          </span>
        )}
      </div>
    </section>
  );
}
