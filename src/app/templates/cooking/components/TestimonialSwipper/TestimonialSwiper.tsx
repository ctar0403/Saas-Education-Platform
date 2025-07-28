"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Maher L.",
    role: "Marketing Manager",
    image: "https://i.pravatar.cc/100?img=11",
    rating: "4.2",
    feedback:
      "I used to dread cooking, but now I look forward to it! CookPro gave me the confidence and skills to create delicious meals my family loves.",
  },
  {
    name: "David K",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/100?img=12",
    rating: "4.2",
    feedback:
      "As a busy professional, I don’t have much time to cook. CookPro's quick and easy recipes are a lifesaver — quick and easy.",
  },
  {
      name: "Emily H",
      role: "Stay at home",
      image: "https://i.pravatar.cc/100?img=13",
      rating: "4.2",
      feedback:
      "CookPro helped me transform my kitchen chaos into culinary confidence. My family is eating healthier than ever before.",
    },
    {
      name: "David K",
      role: "Software Engineer",
      image: "https://i.pravatar.cc/100?img=12",
      rating: "4.2",
      feedback:
        "As a busy professional, I don’t have much time to cook. CookPro's quick and easy recipes are a lifesaver — quick and easy.",
    },
]

export default function TestimonialSlider() {
  return (
    <section className="py-16 bg-[#fdf6ef] px-4 text-center relative">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1e1a1a] mb-10">
        Testimonials
      </h2>

      
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-5xl w-full mx-auto"
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white rounded-xl shadow-md p-6 px-10 h-full flex flex-col justify-between text-left border">
              <div className="flex items-center mb-4">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-3"
                />
                <div>
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
                <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-1 rounded font-semibold">
                  ⭐ {t.rating}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t.feedback}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
