import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-extrabold mb-4 text-gray-800">
          Welcome to Your Learning Journey ✨
        </h1>
        <p className="text-gray-700 text-lg">
          Choose a template below to kickstart your skills and unlock your potential.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid gap-3 lg:gap-1 sm:grid-cols-2 justify-center">
        <Link href="/templates/cooking" className="flex justify-center">
          <Card className="w-full max-w-xs shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 rounded-2xl cursor-pointer flex flex-col overflow-hidden h-96 bg-white">
            <div className="relative -top-6 w-full h-3/5">
              <Image
                src="/mobile_hero_section.png"
                alt="Cooking"
                fill
                className="object-cover object-[40%_20%]"
              />
            </div>
            <CardContent className="flex flex-col justify-center gap-2 p-4 h-2/5">
              <h3 className="text-xl font-bold text-center text-gray-800 -mt-5">
                🍳 Cooking Template
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Master the art of cooking with our beginner-friendly template. Create delightful dishes step by step.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/templates/teaching" className="flex justify-center">
          <Card className="w-full max-w-xs shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 rounded-2xl cursor-pointer flex flex-col overflow-hidden h-96 bg-white">
            <div className="relative -top-6 w-full h-3/5">
              <Image
                src="/about_hero_section.png"
                alt="Teaching"
                fill
                className="object-cover object-top"
              />
            </div>
            <CardContent className="flex flex-col justify-center gap-2 p-4 h-2/5">
              <h3 className="text-xl font-bold text-center text-gray-800 -mt-5">
                🎓 Teaching Template
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Empower learners and share knowledge effectively with our professional teaching template.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  );
}
