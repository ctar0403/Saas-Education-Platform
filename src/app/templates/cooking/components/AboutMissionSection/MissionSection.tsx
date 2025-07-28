import React from "react";

interface MissionSectionProps {
  heading?: string;
  subheading?: string;

  item1Title?: string;
  item1Description?: string;
  item1IconUrl?: string;

  item2Title?: string;
  item2Description?: string;
  item2IconUrl?: string;

  item3Title?: string;
  item3Description?: string;
  item3IconUrl?: string;
}

const MissionSection = ({
  heading = "Our Mission",
  subheading = "Guiding you every step of the way, from novice to culinary connoisseur.",

  item1Title = "Empowering Culinary Confidence",
  item1Description = "We equip aspiring cooks with the skills and knowledge to create delicious dishes and embrace their inner chef.",
  item1IconUrl = "",

  item2Title = "Igniting a Passion for Food",
  item2Description = "We inspire a lifelong love of cooking through engaging experiences and the celebration of culinary creativity.",
  item2IconUrl = "",

  item3Title = "Cultivating a Community of Food Enthusiasts",
  item3Description = "We foster a welcoming space where individuals can connect, learn, and share their passion for all things food.",
  item3IconUrl = "",
}: MissionSectionProps) => {
  return (
    <section className="py-16 bg-white px-4">
      <div className="max-w-7xl mx-auto text-center space-y-4">
        <h2 className="text-3xl md:text-2xl font-bold text-gray-800">{heading}</h2>
        <p className="text-gray-800  md:text-xl font-normal md:font-semibold max-w-2xl mx-auto">{subheading}</p>
      </div>

      <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mission Item 1 */}
        <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border-2 border-dashed rounded-full">
            {item1IconUrl ? (
              <img src={item1IconUrl} alt={item1Title} className="w-8 h-8" />
            ) : (
              <span className="text-gray-400">+</span>
            )}
          </div>
          <h3 className="font-semibold text-lg text-gray-800">{item1Title}</h3>
          <p className="text-gray-600 text-sm mt-2">{item1Description}</p>
        </div>

        {/* Mission Item 2 */}
        <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border-2 border-dashed rounded-full">
            {item2IconUrl ? (
              <img src={item2IconUrl} alt={item2Title} className="w-8 h-8" />
            ) : (
              <span className="text-gray-400">+</span>
            )}
          </div>
          <h3 className="font-semibold text-lg text-gray-800">{item2Title}</h3>
          <p className="text-gray-600 text-sm mt-2">{item2Description}</p>
        </div>

        {/* Mission Item 3 */}
        <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border-2 border-dashed rounded-full">
            {item3IconUrl ? (
              <img src={item3IconUrl} alt={item3Title} className="w-8 h-8" />
            ) : (
              <span className="text-gray-400">+</span>
            )}
          </div>
          <h3 className="font-semibold text-lg text-gray-800">{item3Title}</h3>
          <p className="text-gray-600 text-sm mt-2">{item3Description}</p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
