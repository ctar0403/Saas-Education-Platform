// components/HeroSection.tsx
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    // <section className="bg-[#1E1A1A] text-white px-10">
    <section
      className="
    relative
    bg-[#1E1A1A]
    text-white
    px-10
    bg-[url('/mobile_hero_section.png')]
    bg-cover
    bg-center
    md:bg-none
    before:content-['']
    before:absolute
    before:inset-0
    before:bg-black/60
    before:pointer-events-none
    md:before:hidden
    min-h-[110vh]
    md:min-h-[80vh]
    flex
  "
    >
      <div className="relative z-10 flex justify-center items-center flex-wrap max-w-7xl mx-auto px-2 py-16 lg:grid  md:grid-cols-1 lg:grid-cols-2 gap-8 ">
        {/* Text */}
        <div className="w-[85%] text-center md:w-[50%] lg:w-[75%] lg:text-left space-y-6 md:pr-6 ">
          <h1 className="text-xl md:text-4xl md:font-bold tracking-wider md:tracking-wide leading-8 md:leading-tight">
            Overwhelmed by cooking? Craving 
            quick, healthy & <br />
            delicious meals?
          </h1>
          <p className="text-sm text-gray-300">
            Let me help you transform your cooking from chaos to confidence
          </p>
          <Button className="hidden md:inline-flex bg-orange-500 hover:bg-orange-600 text-white text-sm px-6 py-3">
            Book your FREE consultation now
          </Button>
          <Button className="md:hidden bg-orange-500 hover:bg-orange-600 text-white text-sm px-6 py-3">
            Book now
          </Button>
        </div>

        {/* Image */}
        <div className="hidden md:inline w-full">
          <Image
            src="/hero_section.png" // Replace with your image path in `public/`
            alt="Chef"
            width={550}
            height={380}
            className="rounded-md object-cover mx-auto"
          />
        </div>
      </div>
    </section>
  )
}
