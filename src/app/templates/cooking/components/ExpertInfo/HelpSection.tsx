import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HelpSectionProps {
  imageUrl?: string;
  title?: string;
  description?: string;
  points?: string[];
  buttonText?: string;
  buttonLink?: string;
}

export default function HelpSection({
  imageUrl = "/help_section_image.png",
  title = "I’m Here To Help!",
  description = `Cooking should be joyful, not a chore. It's okay to feel lost or uninspired—I’ve been there.
You deserve culinary confidence. I understand the struggles of bland meals and the desire for healthier eating.`,
  points = [
    "Cooking will likely remain a struggle. You could miss out on the joy of creating delicious, nourishing food.",
    "You’ll gain the skills and inspiration to transform your kitchen. Learn to cook effortlessly, eat healthier, and save time & money.",
  ],
  buttonText = "Book your FREE consultation now",
  buttonLink = "#",
}: HelpSectionProps) {
  // https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80
  return (

    <section className="bg-[#FFF8F1] py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row lg:justify-between flex-wrap md:justify-center items-center">
        {/* Image */}
        <div className="overflow-hidden rounded-xl md:ml-10 md:min-w-[28rem]">
          <Image
            src={imageUrl}
            alt="Chef"
            width={220}
            height={100}
            className="max-h-[26rem] min-w-[20rem] md:min-w-[28rem] object-contain mt-10 md:mt-0"
          />
        </div>

        {/* Text */}
        <div className="space-y-4 max-w-lg lg:px-6 text-center lg:text-left lg:mr-14 md:mt-10 lg:mt-0">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {title}
          </h2>
          <p className="text-gray-600 whitespace-pre-line">{description}</p>
          <ul className="list-disc list-inside  text-gray-600 space-y-2 text-left inline-block md:inline">
            {points.map((point, idx) => (
              <li key={idx} className="pl-10 mr-8 ">{point}</li>
            ))}
          </ul>
          <a href={buttonLink}>
            <Button className="bg-orange-500 hover:bg-orange-600 mt-4 text-white text-sm px-6 py-6 rounded">
              {buttonText}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
