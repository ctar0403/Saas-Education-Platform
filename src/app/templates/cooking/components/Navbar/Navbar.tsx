"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

type NavbarProps = {
  logoColor?: string;
  nav1Title?: string;
  nav1Href?: string;
  nav2Title?: string;
  nav2Href?: string;
  nav3Title?: string;
  nav3Href?: string;
  nav4Title?: string;
  nav4Href?: string;
  nav5Title?: string;
  nav5Href?: string;
  buttonColor?: string;
  buttonText?: string;
};

const Navbar = ({
  logoColor = "#FB923C",
  nav1Title = "Home",
  nav1Href = "/templates/cooking",
  nav2Title = "About",
  nav2Href = "/templates/cooking/about",
  nav3Title = "Store",
  nav3Href = "/templates/cooking/store",
  nav4Title = "Blogs",
  nav4Href = "/templates/cooking/blogs",
  nav5Title = "Contact Us",
  nav5Href = "/templates/cooking/contact",
  buttonColor = "#FB923C",
  buttonText = "Login",
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-2xl font-bold" style={{ color: logoColor }}>
          Cook<span className="text-black">Pro.</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-12">
          <a href={nav1Href} className="text-sm text-gray-700 hover:text-orange-500 font-medium">
            {nav1Title}
          </a>
          <a href={nav2Href} className="text-sm text-gray-700 hover:text-orange-500 font-medium">
            {nav2Title}
          </a>
          <a href={nav3Href} className="text-sm text-gray-700 hover:text-orange-500 font-medium">
            {nav3Title}
          </a>
          <a href={nav4Href} className="text-sm text-gray-700 hover:text-orange-500 font-medium">
            {nav4Title}
          </a>
          <a href={nav5Href} className="text-sm text-gray-700 hover:text-orange-500 font-medium">
            {nav5Title}
          </a>
        </nav>

        {/* Globe + Login Button */}
        <div className="flex-end gap-3 space-x-3 hidden md:flex items-center">
          <span>🌐</span>
          <Button style={{ background: buttonColor }} className="hover:bg-orange-600 text-white rounded-md px-4 py-2">
            {buttonText}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-13">
                <a href={nav1Href} className="text-center text-base font-medium text-gray-700 hover:text-orange-500" onClick={() => setIsOpen(false)}>
                  {nav1Title}
                </a>
                <a href={nav2Href} className="text-center text-base font-medium text-gray-700 hover:text-orange-500" onClick={() => setIsOpen(false)}>
                  {nav2Title}
                </a>
                <a href={nav3Href} className="text-center text-base font-medium text-gray-700 hover:text-orange-500" onClick={() => setIsOpen(false)}>
                  {nav3Title}
                </a>
                <a href={nav4Href} className="text-center text-base font-medium text-gray-700 hover:text-orange-500" onClick={() => setIsOpen(false)}>
                  {nav4Title}
                </a>
                <a href={nav5Href} className="text-center text-base font-medium text-gray-700 hover:text-orange-500" onClick={() => setIsOpen(false)}>
                  {nav5Title}
                </a>
                <div className="mt-4 items-center mx-3">
                  <span className="cursor-pointer">🌐</span>
                  <Button style={{ background: buttonColor }} className="mt-1 text-white w-full">
                    {buttonText}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
