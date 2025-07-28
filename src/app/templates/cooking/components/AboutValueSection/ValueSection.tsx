import React from "react";

interface ValueSectionProps {
  heading?: string;
  subheading?: string;

  item1Title?: string;
  item1IconUrl?: string;

  item2Title?: string;
  item2IconUrl?: string;

  item3Title?: string;
  item3IconUrl?: string;
}

const ValueSection = ({
  heading = "Our Values",
  subheading = "Flavor, Fun, and Community - the heart of our kitchen.",

  item1Title = "Passion",
  item1IconUrl = "",

  item2Title = "Excellence",
  item2IconUrl = "",

  item3Title = "Community",
  item3IconUrl = "",
}: ValueSectionProps) => {
  return (
    <section className="py-16 bg-[#FFF8F1] px-4">
      <div className="max-w-7xl mx-auto text-center space-y-4">
        <h2 className="text-3xl md:text-2xl font-bold text-gray-800">
          {heading}
        </h2>
        <p className="px-2 md:px-0 text-gray-800 md:text-xl font-normal md:font-semibold max-w-2xl mx-auto">
          {subheading}
        </p>
      </div>

      <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Value Item 1 */}
        <div className="p-6 text-center transition">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border-2 border-dashed rounded-full">
            {item1IconUrl ? (
              <img src={item1IconUrl} alt={item1Title} className="w-8 h-8" />
            ) : (
              <span className="text-gray-400">+</span>
            )}
          </div>
          <h3 className="font-semibold text-lg text-gray-800">
            {item1Title}
          </h3>
        </div>

        {/* Value Item 2 */}
        <div className="p-6 text-center transition">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border-2 border-dashed rounded-full">
            {item2IconUrl ? (
              <img src={item2IconUrl} alt={item2Title} className="w-8 h-8" />
            ) : (
              <span className="text-gray-400">+</span>
            )}
          </div>
          <h3 className="font-semibold text-lg text-gray-800">
            {item2Title}
          </h3>
        </div>

        {/* Value Item 3 */}
        <div className="p-6 text-center transition">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border-2 border-dashed rounded-full">
            {item3IconUrl ? (
              <img src={item3IconUrl} alt={item3Title} className="w-8 h-8" />
            ) : (
              <span className="text-gray-400">+</span>
            )}
          </div>
          <h3 className="font-semibold text-lg text-gray-800">
            {item3Title}
          </h3>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
