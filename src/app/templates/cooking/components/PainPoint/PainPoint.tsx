// 'use client'

// import React from 'react'
// import { Button } from '@/components/ui/button'
// import { Lightbulb, Timer, Frown } from 'lucide-react'

// type PainPointItem = {
//   icon: 'timer' | 'lightbulb' | 'frown' // predefined icon names
//   title: string
//   description: string
// }

// type PainPointProps = {
//   heading?: string
//   subheading?: string
//   buttonText?: string
//   buttonColor?: string
//   backgroundColor?: string
//   painPoints?: PainPointItem[]
// }

// const iconMap: Record<'timer' | 'lightbulb' | 'frown', React.ReactNode> = {
//   timer: <Timer className="w-6 h-6 mx-auto" />,
//   lightbulb: <Lightbulb className="w-6 h-6 mx-auto" />,
//   frown: <Frown className="w-6 h-6 mx-auto" />,
// }

// const PainPoint = ({
//   heading = "Overwhelmed in the Kitchen? You're Not Alone.",
//   subheading = 'Can you relate to these struggles?',
//   buttonText = 'Book your FREE consultation now',
//   buttonColor = '#F97316',
//   backgroundColor = '#ffffff',
//   painPoints = [
//     {
//       icon: 'timer',
//       title: 'busy to cook',
//       description:
//         'Are takeout and frozen dinners your go-to? Do you wish you had more time and energy for cooking?',
//     },
//     {
//       icon: 'lightbulb',
//       title: "Don't know where to start?",
//       description:
//         'Do you feel lost in the kitchen? Are recipes confusing, or do you lack confidence in your skills?',
//     },
//     {
//       icon: 'frown',
//       title: 'bored with my meals',
//       description:
//         'Are you stuck in a cooking rut? Do you crave variety and excitement in your meals?',
//     },
//   ],
// }: PainPointProps) => {
//   return (
//     <section className="text-center px-4 py-16" style={{ backgroundColor }}>
//       <h2 className="text-2xl md:text-3xl font-bold mb-2">{heading}</h2>
//       <p className="text-gray-600 text-base mb-12">{subheading}</p>

//       <div className="flex flex-wrap justify-evenly gap-10 max-w-6xl mx-auto mb-12 px-4">
//         {painPoints.map((item, i) => (
//           <div
//             key={i}
//             className="flex flex-col items-center text-center space-y-4 px-4 w-full sm:w-[48%] md:w-[30%]"
//           >
//             <div className="bg-[#F5E3C2] p-3 rounded-md">
//               {iconMap[item.icon]}
//             </div>
//             <h3 className="text-lg font-semibold">{item.title}</h3>
//             <p className="text-sm text-gray-600">{item.description}</p>
//           </div>
//         ))}
//       </div>

//       <Button
//         style={{ backgroundColor: buttonColor }}
//         className="text-white px-6 py-3 text-sm rounded-md hover:opacity-90"
//       >
//         {buttonText}
//       </Button>
//     </section>
//   )
// }

// export default PainPoint


'use client'

import React from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, Timer, Frown } from "lucide-react";

type PainPointProps = {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonColor?: string;
  backgroundColor?: string;

  pain1Icon?: "timer" | "lightbulb" | "frown";
  pain1Title?: string;
  pain1Description?: string;

  pain2Icon?: "timer" | "lightbulb" | "frown";
  pain2Title?: string;
  pain2Description?: string;

  pain3Icon?: "timer" | "lightbulb" | "frown";
  pain3Title?: string;
  pain3Description?: string;
};

const iconMap = {
  timer: <Timer className="w-6 h-6 mx-auto" />,
  lightbulb: <Lightbulb className="w-6 h-6 mx-auto" />,
  frown: <Frown className="w-6 h-6 mx-auto" />,
};

const PainPoint = ({
  heading = "Overwhelmed in the Kitchen? You're Not Alone.",
  subheading = "Can you relate to these struggles?",
  buttonText = "Book your FREE consultation now",
  buttonColor = "#F97316",
  backgroundColor = "#ffffff",

  pain1Icon = "timer",
  pain1Title = "busy to cook",
  pain1Description = "Are takeout and frozen dinners your go-to? Do you wish you had more time and energy for cooking?",

  pain2Icon = "lightbulb",
  pain2Title = "Don't know where to start?",
  pain2Description = "Do you feel lost in the kitchen? Are recipes confusing, or do you lack confidence in your skills?",

  pain3Icon = "frown",
  pain3Title = "bored with my meals",
  pain3Description = "Are you stuck in a cooking rut? Do you crave variety and excitement in your meals?",
}: PainPointProps) => {
  return (
    <section className="text-center px-4 py-16" style={{ backgroundColor }}>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">{heading}</h2>
      <p className="text-gray-600 text-base mb-12">{subheading}</p>

      <div className="flex flex-wrap justify-evenly gap-10 max-w-6xl mx-auto mb-12 px-4">
        {/* Pain Point 1 */}
        <div className="flex flex-col items-center text-center space-y-4 px-4 w-full sm:w-[48%] md:w-[30%]">
          <div className="bg-[#F5E3C2] p-3 rounded-md">
            {iconMap[pain1Icon as "timer" | "lightbulb" | "frown"]}
          </div>
          <h3 className="text-lg font-semibold">{pain1Title}</h3>
          <p className="text-sm text-gray-600">{pain1Description}</p>
        </div>
        {/* Pain Point 2 */}
        <div className="flex flex-col items-center text-center space-y-4 px-4 w-full sm:w-[48%] md:w-[30%]">
          <div className="bg-[#F5E3C2] p-3 rounded-md">
            {iconMap[pain2Icon as "timer" | "lightbulb" | "frown"]}
          </div>
          <h3 className="text-lg font-semibold">{pain2Title}</h3>
          <p className="text-sm text-gray-600">{pain2Description}</p>
        </div>
        {/* Pain Point 3 */}
        <div className="flex flex-col items-center text-center space-y-4 px-4 w-full sm:w-[48%] md:w-[30%]">
          <div className="bg-[#F5E3C2] p-3 rounded-md">
            {iconMap[pain3Icon as "timer" | "lightbulb" | "frown"]}
          </div>
          <h3 className="text-lg font-semibold">{pain3Title}</h3>
          <p className="text-sm text-gray-600">{pain3Description}</p>
        </div>
      </div>

      <Button
        style={{ backgroundColor: buttonColor }}
        className="text-white px-6 py-3 text-sm rounded-md hover:opacity-90"
      >
        {buttonText}
      </Button>
    </section>
  );
};

export default PainPoint;
