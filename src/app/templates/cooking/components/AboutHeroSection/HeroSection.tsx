import { Button } from "@/components/ui/button";

interface HeroBannerProps {
  backgroundImageUrl?: string;
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function HeroBanner({
  backgroundImageUrl = "/about_hero_section.png", // Place your background in /public and rename accordingly
  heading = "A Passion for Cooking, An Inspiration for Cooks",
  subheading = "Learn from the best in the culinary world.",
  buttonText = "Book your FREE consultation now",
  buttonLink = "#",
}: HeroBannerProps) {
  return (
    <section
      className="relative bg-black text-white flex items-center justify-center text-center min-h-[100vh] px-4"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight lg:px-20">
          {heading}
        </h1>
        <p className="text-gray-300">{subheading}</p>
        <a href={buttonLink}>
          <Button className="bg-orange-500 hover:bg-orange-600 mt-2 text-white px-6 py-6 rounded">
            {buttonText}
          </Button>
        </a>
      </div>
    </section>
  );
}
