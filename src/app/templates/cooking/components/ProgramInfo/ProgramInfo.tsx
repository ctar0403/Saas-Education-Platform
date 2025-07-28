import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProgramInfoProps {
  imageUrl?: string;
  title?: string;
  description?: string;
  point1?: string;
  point2?: string;
  point3?: string;
  point4?: string;
  point5?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function ProgramInfo({
  imageUrl = "/program_info.jpg",
  title = "The Culinary Confidence Kitchen",
  description = "Overcome kitchen overwhelm: Gain the knowledge and confidence to cook with ease.",
  point1 = "Create delicious, healthy meals: Discover the joy of preparing food that nourishes your body and soul.",
  point2 = "Save time and money: Simplify your cooking process and reduce food waste.",
  point3 = "Expand your culinary horizons: Explore new flavors, ingredients, and techniques.",
  point4 = "Become a kitchen hero: Impress your friends and family with your culinary skills.",
  point5 = "",
  buttonText = "Book your FREE consultation now",
  buttonLink = "#",
}: ProgramInfoProps) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row lg:justify-between flex-wrap md:justify-center items-center">
        {/* Text */}
        <div className="space-y-4 max-w-lg px-5 pr-0 mt-6 lg:pl-10 text-center lg:text-left lg:mr-14 lg:mt-0">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600 pt-2 leading-7">{description}</p>
          <ul className="list-disc text-gray-700 text-left pl-6 pt-2 space-y-2">
            {point1 && <li>{point1}</li>}
            {point2 && <li>{point2}</li>}
            {point3 && <li>{point3}</li>}
            {point4 && <li>{point4}</li>}
            {point5 && <li>{point5}</li>}
          </ul>
          <a href={buttonLink}>
            <Button className="bg-orange-500 hover:bg-orange-600 mt-4 text-white text-sm px-6 py-6 rounded">
              {buttonText}
            </Button>
          </a>
        </div>
        {/* Image */}
        <div className="overflow-hidden rounded-xl md:ml-10 md:min-w-[30rem]">
          <Image
            src={imageUrl}
            alt="Chef"
            width={220}
            height={120}
            className="max-h-[30rem] min-w-[20rem] md:min-w-[28rem] object-contain md:mt-8 lg:mt-0"
          />
        </div>
      </div>
    </section>
  );
}
