"use client";
import { builder, Builder, withChildren } from "@builder.io/react";

// ============= UI Components =============
import { CardFooter } from "./components/ui/card";
import Counter from "./components/Counter/Counter";

// ============= COOKING TEMPLATE COMPONENTS =============
import Assessment from "./app/templates/cooking/components/Assessment/Assessment";
import ContactSection from "./app/templates/cooking/components/ContactHeader/ContactHeader";
import CookingFooter from "./app/templates/cooking/components/Footer/Footer";
import HelpSection from "./app/templates/cooking/components/ExpertInfo/HelpSection";
import HeroBanner from "./app/templates/cooking/components/AboutHeroSection/HeroSection";
import HowItWorksSection from "./app/templates/cooking/components/WorkSection/WorkSection";
import MissionSection from "./app/templates/cooking/components/AboutMissionSection/MissionSection";
import CookingNavbar from "./app/templates/cooking/components/Navbar/Navbar";
import CookingPainPoint from "./app/templates/cooking/components/PainPoint/PainPoint";
import CookingProgramInfo from "./app/templates/cooking/components/ProgramInfo/ProgramInfo";
import ValueSection from "./app/templates/cooking/components/AboutValueSection/ValueSection";
import CookingValueStack from "./app/templates/cooking/components/ValueStack/ValueStack";
import CookingWorthIt from "./app/templates/cooking/components/WorthIt/WorthIt";

// ============= TEACHING TEMPLATE COMPONENTS =============

// Landing Page Components
import TeachingExpertInfo from "./app/templates/teaching/components/ExpertInfo/ExpertInfo";
import TeachingFooter from "./app/templates/teaching/components/Footer/Footer";
import TeachingDarkFooter from "./app/templates/teaching/components/Footer/DarkFooter";
import TeachingLightFooter from "./app/templates/teaching/components/Footer/LightFooter";
import TeachingFreeAssessment from "./app/templates/teaching/components/FreeAssessment/FreeAssessment";
import TeachingHeader from "./app/templates/teaching/components/Header/Header";
import TeachingHowItWorks from "./app/templates/teaching/components/HowItWorks/HowItWorks";
import TeachingNavigation from "./app/templates/teaching/components/Navigation/Navigation";
import TeachingAnnouncementsNavigation from "./app/templates/teaching/components/Navigation/AnnouncementsNavigation";
import TeachingPainPoint from "./app/templates/teaching/components/PainPoint/PainPoint";
import TeachingProgramInfo from "./app/templates/teaching/components/ProgramInfo/ProgramInfo";
import TeachingTestimonials from "./app/templates/teaching/components/Testimonials/Testimonials";
import TeachingValueStack from "./app/templates/teaching/components/ValueStack/ValueStack";
import TeachingWorthIt from "./app/templates/teaching/components/WorthIt/WorthIt";

// About Page Components
import AboutHero from "./app/templates/teaching/about/components/AboutHero/AboutHero";
import AboutTestimonials from "./app/templates/teaching/about/components/AboutTestimonials/AboutTestimonials";
import FAQ from "./app/templates/teaching/about/components/FAQ/FAQ";
import MyMission from "./app/templates/teaching/about/components/MyMission/MyMission";
import MyVision from "./app/templates/teaching/about/components/MyVision/MyVision";
import ServicesSection from "./app/templates/teaching/about/components/ServicesSection/ServicesSection";
import ValueProposition from "./app/templates/teaching/about/components/ValueProposition/ValueProposition";
import WhoIAm from "./app/templates/teaching/about/components/WhoIAm/WhoIAm";

// Store Page Components
import ProductCard from "./app/templates/teaching/store/components/ProductCard/ProductCard";
import ProductSection from "./app/templates/teaching/store/components/ProductSection/ProductSection";
import ProductSectionWithPagination from "./app/templates/teaching/store/components/ProductSection/ProductSectionWithPagination";
import StoreHero from "./app/templates/teaching/store/components/StoreHero/StoreHero";

// Contact Page Components
import ContactFooter from "./app/templates/teaching/contact/components/ContactFooter/ContactFooter";
import ContactHero from "./app/templates/teaching/contact/components/ContactHero/ContactHero";

// Library Page Components
import LibraryCard from "./app/templates/teaching/library/components/LibraryCard/LibraryCard";
import LibraryHero from "./app/templates/teaching/library/components/LibraryHero/LibraryHero";
import MyLibrary from "./app/templates/teaching/library/components/MyLibrary/MyLibrary";

// Course Page Components
import CourseContent from "./app/templates/teaching/course/components/CourseContent/CourseContent";
import CourseHero from "./app/templates/teaching/course/components/CourseHero/CourseHero";
import CourseSidebar from "./app/templates/teaching/course/components/CourseSidebar/CourseSidebar";

// Lesson Page Components
import Comments from "./app/templates/teaching/lesson/components/Comments/Comments";
import LessonContent from "./app/templates/teaching/lesson/components/LessonContent/LessonContent";
import LessonHeader from "./app/templates/teaching/lesson/components/LessonHeader/LessonHeader";
import LessonSidebar from "./app/templates/teaching/lesson/components/LessonSidebar/LessonSidebar";

// Coaching Page Components
import CoachingHero from "./app/templates/teaching/coaching/components/CoachingHero/CoachingHero";
import CoachingTypes from "./app/templates/teaching/coaching/components/CoachingTypes/CoachingTypes";

// Group Coaching Components
import GroupBooking from "./app/templates/teaching/coaching/group/components/GroupBooking/GroupBooking";
import GroupFeatures from "./app/templates/teaching/coaching/group/components/GroupFeatures/GroupFeatures";
import GroupHero from "./app/templates/teaching/coaching/group/components/GroupHero/GroupHero";
import GroupSessions from "./app/templates/teaching/coaching/group/components/GroupSessions/GroupSessions";

// One-to-One Coaching Components
import CoachingFeatures from "./app/templates/teaching/coaching/one-to-one/components/CoachingFeatures/CoachingFeatures";
import OneToOneHero from "./app/templates/teaching/coaching/one-to-one/components/OneToOneHero/OneToOneHero";
import SessionBooking from "./app/templates/teaching/coaching/one-to-one/components/SessionBooking/SessionBooking";
import SessionHistory from "./app/templates/teaching/coaching/one-to-one/components/SessionHistory/SessionHistory";

// ============= DYNAMIC CONTENT COMPONENTS =============
import CourseCard from "./components/dynamic/CourseCard/CourseCard";
import DynamicProductCard from "./components/dynamic/ProductCard/ProductCard";
import BlogCard from "./components/dynamic/BlogCard/BlogCard";
import CourseList from "./components/dynamic/CourseList/CourseList";
import ProductList from "./components/dynamic/ProductList/ProductList";
import BlogList from "./components/dynamic/BlogList/BlogList";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// ============= UI COMPONENTS =============

Builder.registerComponent(withChildren(CardFooter), {
  name: "CardFooter",
  group: "UI Components",
  inputs: [
    {
      name: "children",
      type: "string",
      hideFromUI: true,
      meta: {
        ts: "ReactNode",
      },
    },
  ],
});

Builder.registerComponent(Counter, {
  name: "Counter",
  group: "UI Components", 
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});

// ============= COOKING TEMPLATE COMPONENTS =============

Builder.registerComponent(HeroBanner, {
  name: "Hero Banner",
  group: "Cooking Template / Landing",
  inputs: [
    {
      name: "backgroundImageUrl",
      type: "string",
    },
    {
      name: "buttonLink",
      type: "string",
    },
    {
      name: "buttonText",
      type: "string",
    },
    {
      name: "heading",
      type: "string",
    },
    {
      name: "subheading",
      type: "string",
    },
  ],
});

Builder.registerComponent(Assessment, {
  name: "Assessment",
  group: "Cooking Template / Landing",
  inputs: [
    {
      name: "backgroundColor",
      type: "string",
    },
    {
      name: "buttonColor",
      type: "string",
    },
    {
      name: "buttonText",
      type: "string",
    },
    {
      name: "heading",
      type: "string",
    },
  ],
});

Builder.registerComponent(HelpSection, {
  name: "Help Section",
  group: "Cooking Template / Landing",
  inputs: [
    {
      name: "buttonLink",
      type: "string",
    },
    {
      name: "buttonText",
      type: "string",
    },
    {
      name: "description",
      type: "string",
    },
    {
      name: "imageUrl",
      type: "string",
      allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
    },
    {
      name: "points",
      type: "object",
      hideFromUI: true,
      meta: {
        ts: "string[]",
      },
    },
    {
      name: "title",
      type: "string",
    },
  ],
});

Builder.registerComponent(CookingNavbar, {
  name: "Navbar",
  group: "Cooking Template / Navigation",
  inputs: [
    {
      name: "buttonColor",
      type: "string",
    },
    {
      name: "buttonText",
      type: "string",
    },
    {
      name: "logoColor",
      type: "string",
    },
    {
      name: "nav1Href",
      type: "string",
    },
    {
      name: "nav1Title",
      type: "string",
    },
    {
      name: "nav2Href",
      type: "string",
    },
    {
      name: "nav2Title",
      type: "string",
    },
    {
      name: "nav3Href",
      type: "string",
    },
    {
      name: "nav3Title",
      type: "string",
    },
    {
      name: "nav4Href",
      type: "string",
    },
    {
      name: "nav4Title",
      type: "string",
    },
    {
      name: "nav5Href",
      type: "string",
    },
    {
      name: "nav5Title",
      type: "string",
    },
  ],
});

Builder.registerComponent(CookingValueStack, {
  name: "Value Stack",
  group: "Cooking Template / Content",
  inputs: [
    {
      name: "backgroundColor",
      type: "string",
    },
    {
      name: "value1",
      type: "string",
    },
    {
      name: "value2",
      type: "string",
    },
    {
      name: "value3",
      type: "string",
    },
  ],
});

Builder.registerComponent(CookingPainPoint, {
  name: "Pain Point",
  group: "Cooking Template / Content",
  inputs: [
    {
      name: "backgroundColor",
      type: "string",
    },
    {
      name: "buttonColor",
      type: "string",
    },
    {
      name: "buttonText",
      type: "string",
    },
    {
      name: "heading",
      type: "string",
    },
    {
      name: "pain1Description",
      type: "string",
    },
    {
      name: "pain1Icon",
      type: "string",
      enum: ["frown", "lightbulb", "timer"],
    },
    {
      name: "pain1Title",
      type: "string",
    },
    {
      name: "pain2Description",
      type: "string",
    },
    {
      name: "pain2Icon",
      type: "string",
      enum: ["frown", "lightbulb", "timer"],
    },
    {
      name: "pain2Title",
      type: "string",
    },
    {
      name: "pain3Description",
      type: "string",
    },
    {
      name: "pain3Icon",
      type: "string",
      enum: ["frown", "lightbulb", "timer"],
    },
    {
      name: "pain3Title",
      type: "string",
    },
    {
      name: "subheading",
      type: "string",
    },
  ],
});

Builder.registerComponent(MissionSection, {
  name: "Mission Section",
  group: "Cooking Template / About",
  inputs: [
    {
      name: "heading",
      type: "string",
    },
    {
      name: "item1Description",
      type: "string",
    },
    {
      name: "item1IconUrl",
      type: "string",
    },
    {
      name: "item1Title",
      type: "string",
    },
    {
      name: "item2Description",
      type: "string",
    },
    {
      name: "item2IconUrl",
      type: "string",
    },
    {
      name: "item2Title",
      type: "string",
    },
    {
      name: "item3Description",
      type: "string",
    },
    {
      name: "item3IconUrl",
      type: "string",
    },
    {
      name: "item3Title",
      type: "string",
    },
    {
      name: "subheading",
      type: "string",
    },
  ],
});

Builder.registerComponent(ValueSection, {
  name: "Value Section",
  group: "Cooking Template / About",
  inputs: [
    {
      name: "heading",
      type: "string",
    },
    {
      name: "item1IconUrl",
      type: "string",
    },
    {
      name: "item1Title",
      type: "string",
    },
    {
      name: "item2IconUrl",
      type: "string",
    },
    {
      name: "item2Title",
      type: "string",
    },
    {
      name: "item3IconUrl",
      type: "string",
    },
    {
      name: "item3Title",
      type: "string",
    },
    {
      name: "subheading",
      type: "string",
    },
  ],
});

Builder.registerComponent(ContactSection, {
  name: "Contact Section",
  group: "Cooking Template / Contact",
  inputs: [
    {
      name: "bgColor",
      type: "string",
    },
    {
      name: "buttonColor",
      type: "string",
    },
    {
      name: "buttonText",
      type: "string",
    },
    {
      name: "description",
      type: "string",
    },
    {
      name: "emailLabel",
      type: "string",
    },
    {
      name: "emailPlaceholder",
      type: "string",
    },
    {
      name: "emailValue",
      type: "string",
    },
    {
      name: "heading",
      type: "string",
    },
    {
      name: "messagePlaceholder",
      type: "string",
    },
    {
      name: "namePlaceholder",
      type: "string",
    },
    {
      name: "phoneLabel",
      type: "string",
    },
    {
      name: "phoneValue",
      type: "string",
    },
  ],
});

Builder.registerComponent(CookingFooter, {
  name: "Footer",
  group: "Cooking Template / Layout",
  inputs: [
    {
      name: "bgColor",
      type: "string",
    },
    {
      name: "copyright",
      type: "string",
    },
    {
      name: "facebookUrl",
      type: "string",
    },
    {
      name: "instagramUrl",
      type: "string",
    },
    {
      name: "poweredByBrand",
      type: "string",
    },
    {
      name: "poweredByColor",
      type: "string",
    },
    {
      name: "poweredByText",
      type: "string",
    },
    {
      name: "privacyUrl",
      type: "string",
    },
    {
      name: "termsUrl",
      type: "string",
    },
    {
      name: "xUrl",
      type: "string",
    },
  ],
});

Builder.registerComponent(CookingProgramInfo, {
  name: "Program Info",
  group: "Cooking Template / Content",
  inputs: [
    {
      name: "buttonLink",
      type: "string",
    },
    {
      name: "buttonText",
      type: "string",
    },
    {
      name: "description",
      type: "string",
    },
    {
      name: "imageUrl",
      type: "string",
    },
    {
      name: "point1",
      type: "string",
    },
    {
      name: "point2",
      type: "string",
    },
    {
      name: "point3",
      type: "string",
    },
    {
      name: "point4",
      type: "string",
    },
    {
      name: "point5",
      type: "string",
    },
    {
      name: "title",
      type: "string",
    },
  ],
});

Builder.registerComponent(withChildren(HowItWorksSection), {
  name: "How It Works Section",
  group: "Cooking Template / Content",
  inputs: [
    {
      name: "buttonText",
      type: "string",
    },
    {
      name: "card1Description",
      type: "string",
    },
    {
      name: "card1Icon",
      type: "string",
      hideFromUI: true,
      meta: {
        ts: "ReactNode",
      },
    },
    {
      name: "card1Title",
      type: "string",
    },
    {
      name: "card2Description",
      type: "string",
    },
    {
      name: "card2Icon",
      type: "string",
      hideFromUI: true,
      meta: {
        ts: "ReactNode",
      },
    },
    {
      name: "card2Title",
      type: "string",
    },
    {
      name: "card3Description",
      type: "string",
    },
    {
      name: "card3Icon",
      type: "string",
      hideFromUI: true,
      meta: {
        ts: "ReactNode",
      },
    },
    {
      name: "card3Title",
      type: "string",
    },
    {
      name: "description",
      type: "string",
    },
    {
      name: "heading",
      type: "string",
    },
  ],
});

Builder.registerComponent(withChildren(CookingWorthIt), {
  name: "Worth It",
  group: "Cooking Template / Content",
  inputs: [
    {
      name: "buttonColor",
      type: "string",
    },
    {
      name: "buttonText",
      type: "string",
    },
    {
      name: "description",
      type: "string",
    },
    {
      name: "heading",
      type: "string",
    },
    {
      name: "highlight",
      type: "string",
    },
    {
      name: "stat1Bg",
      type: "string",
    },
    {
      name: "stat1Text",
      type: "string",
    },
    {
      name: "stat1Value",
      type: "string",
    },
    {
      name: "stat2Bg",
      type: "string",
    },
    {
      name: "stat2SvgDesktop",
      type: "string",
      hideFromUI: true,
      meta: {
        ts: "ReactNode",
      },
    },
    {
      name: "stat2SvgMobile",
      type: "string",
      hideFromUI: true,
      meta: {
        ts: "ReactNode",
      },
    },
    {
      name: "stat3Bg",
      type: "string",
    },
    {
      name: "stat3Text",
      type: "string",
    },
    {
      name: "stat3Value",
      type: "string",
    },
  ],
});

// ============= TEACHING TEMPLATE COMPONENTS =============

// Landing Page Components
Builder.registerComponent(TeachingHeader, {
  name: "Header",
  group: "Teaching Template / Landing",
  inputs: [
    {
      name: "backgroundImageUrl",
      type: "string",
      defaultValue: "https://cdn.builder.io/api/v1/image/assets%2Fe7e4e054f28544f2a05c2ce9a547d52a%2F3cfbb8bd580d43aa8970e119417dacc9",
    },
    {
      name: "heading",
      type: "string",
      defaultValue: "Are you a small business owner struggling to attract new customers?",
    },
    {
      name: "subheading",
      type: "string",
      defaultValue: "Our proven strategies will help you build a strong online presence, generate quality leads, and convert them into loyal customers.",
    },
    {
      name: "buttonText",
      type: "string",
      defaultValue: "Book your FREE consultation now",
    },
    {
      name: "buttonColor",
      type: "string",
      defaultValue: "#08AD98",
    },
  ],
});

Builder.registerComponent(TeachingNavigation, {
  name: "Navigation",
  group: "Teaching Template / Navigation",
  inputs: [
    {
      name: "logoText",
      type: "string",
      defaultValue: "FINX",
    },
    {
      name: "logoColor",
      type: "string",
      defaultValue: "#032C3D",
    },
    {
      name: "homeLink",
      type: "string",
      defaultValue: "/templates/teaching",
    },
    {
      name: "aboutLink",
      type: "string",
      defaultValue: "/templates/teaching/about",
    },
    {
      name: "storeLink",
      type: "string",
      defaultValue: "/templates/teaching/store",
    },
    {
      name: "blogsLink",
      type: "string",
      defaultValue: "/templates/teaching/blogs",
    },
    {
      name: "contactLink",
      type: "string",
      defaultValue: "/templates/teaching/contact",
    },
    {
      name: "buttonText",
      type: "string",
      defaultValue: "Login",
    },
    {
      name: "buttonColor",
      type: "string",
      defaultValue: "#08AD98",
    },
  ],
});

Builder.registerComponent(TeachingAnnouncementsNavigation, {
  name: "Announcements Navigation",
  group: "Teaching Template / Navigation",
  inputs: [
    {
      name: "logoText",
      type: "string",
      defaultValue: "FINX",
    },
    {
      name: "logoColor",
      type: "string",
      defaultValue: "#032C3D",
    },
    {
      name: "buttonText",
      type: "string",
      defaultValue: "Login",
    },
    {
      name: "buttonColor",
      type: "string",
      defaultValue: "#08AD98",
    },
  ],
});

Builder.registerComponent(TeachingExpertInfo, {
  name: "Expert Info",
  group: "Teaching Template / Landing",
  inputs: [
    {
      name: "imageUrl",
      type: "string",
      allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
      defaultValue: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=640&q=80",
    },
    {
      name: "heading",
      type: "string",
      defaultValue: "I'm Here To help!",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "As a financial business coach, I understand the unique challenges you face. It's not just about crunching numbers; it's about making informed decisions that drive your business forward. I'm here to be your trusted partner, offering:",
    },
    {
      name: "benefit1",
      type: "string",
      defaultValue: "Together, we'll demystify your finances, creating a clear picture of your current situation and future possibilities.",
    },
    {
      name: "benefit2",
      type: "string",
      defaultValue: "Armed with knowledge and a solid plan, you'll gain the confidence to make bold decisions and pursue ambitious goals.",
    },
    {
      name: "benefit3",
      type: "string",
      defaultValue: "No more feeling at the mercy of your finances. You'll take charge, steering your business towards sustainable growth and long-term success.",
    },
    {
      name: "buttonText",
      type: "string",
      defaultValue: "Book your FREE consultation now",
    },
    {
      name: "backgroundColor",
      type: "string",
      defaultValue: "#E6EBEE",
    },
  ],
});

Builder.registerComponent(TeachingPainPoint, {
  name: "Pain Point",
  group: "Teaching Template / Landing",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Overwhelmed & Uncertain?",
    },
    {
      name: "subheading",
      type: "string",
      defaultValue: "Feeling lost in the financial maze of your business? You're not alone. Many entrepreneurs struggle with the same challenges. Let's tackle them together.",
    },
    {
      name: "pain1Title",
      type: "string",
      defaultValue: "Cash Flow Chaos",
    },
    {
      name: "pain1Description",
      type: "string",
      defaultValue: "Are unpredictable income streams and unexpected expenses keeping you up at night?",
    },
    {
      name: "pain2Title",
      type: "string",
      defaultValue: "Profitability Puzzle",
    },
    {
      name: "pain2Description",
      type: "string",
      defaultValue: "Is your business making enough money? Are you unsure how to increase your profit margins?",
    },
    {
      name: "pain3Title",
      type: "string",
      defaultValue: "Growth Gridlock",
    },
    {
      name: "pain3Description",
      type: "string",
      defaultValue: "Feeling stuck and unsure how to scale your business? Break through barriers and unlock your full potential.",
    },
    {
      name: "buttonText",
      type: "string",
      defaultValue: "Book your FREE consultation now",
    },
    {
      name: "backgroundColor",
      type: "string",
      defaultValue: "#FFFFFF",
    },
  ],
});

Builder.registerComponent(TeachingProgramInfo, {
  name: "Program Info",
  group: "Teaching Template / Landing",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Financial Edition Program",
    },
    {
      name: "subtitle",
      type: "string",
      defaultValue: "It's time to transform your relationship with money and fuel your business growth.",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "You're passionate about your business, but financial worries keep you up at night. Cash flow problems, confusing taxes, and the fear of making the wrong decisions are holding you back.\n\nI'm here to guide you through the financial fog. Together, we'll create a clear financial roadmap, optimize your cash flow, and build a solid foundation for sustainable business success.",
    },
    {
      name: "buttonText",
      type: "string",
      defaultValue: "View Details",
    },
    {
      name: "feature1Title",
      type: "string",
      defaultValue: "Gain Clarity",
    },
    {
      name: "feature1Description",
      type: "string",
      defaultValue: "We'll create a personalized roadmap to optimize cash flow, conquer debt, and fuel your growth.",
    },
    {
      name: "feature2Title",
      type: "string",
      defaultValue: "Growth Strategy",
    },
    {
      name: "feature2Description",
      type: "string",
      defaultValue: "We'll help you identify profit leaks, price strategically, and build a sustainable business",
    },
    {
      name: "feature3Title",
      type: "string",
      defaultValue: "Freedom For Enterprise",
    },
    {
      name: "feature3Description",
      type: "string",
      defaultValue: "We'll equip you with the financial tools and strategies to secure funding, manage growth,",
    },
    {
      name: "feature4Title",
      type: "string",
      defaultValue: "Financial Planning",
    },
    {
      name: "feature4Description",
      type: "string",
      defaultValue: "We'll guide you toward smart investments, tax efficiency, and long-term wealth building.",
    },
  ],
});

Builder.registerComponent(TeachingHowItWorks, {
  name: "How It Works",
  group: "Teaching Template / Landing",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "How does it work ?",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "Overwhelmed by your business finances? Ready to turn chaos into confidence?",
    },
    {
      name: "step1Title",
      type: "string",
      defaultValue: "Uncover Your Financial Vision",
    },
    {
      name: "step1Description",
      type: "string",
      defaultValue: "Together, we'll dive deep into your business goals and financial aspirations.",
    },
    {
      name: "step2Title",
      type: "string",
      defaultValue: "Craft Your Personalized Financial Roadmap",
    },
    {
      name: "step2Description",
      type: "string",
      defaultValue: "We'll provide you with the tools and strategies tailored to your unique business needs",
    },
    {
      name: "step3Title",
      type: "string",
      defaultValue: "Achieve Financial Freedom",
    },
    {
      name: "step3Description",
      type: "string",
      defaultValue: "We'll work together to implement your plan and overcome any challenges along the way.",
    },
    {
      name: "buttonText",
      type: "string",
      defaultValue: "Book your FREE consultation now",
    },
  ],
});

Builder.registerComponent(TeachingValueStack, {
  name: "Value Stack",
  group: "Teaching Template / Landing",
  inputs: [
    {
      name: "value1",
      type: "string",
      defaultValue: "Value",
    },
    {
      name: "value2",
      type: "string",
      defaultValue: "Value",
    },
    {
      name: "value3",
      type: "string",
      defaultValue: "Value",
    },
    {
      name: "backgroundColor",
      type: "string",
      defaultValue: "#043A51",
    },
  ],
});

Builder.registerComponent(TeachingTestimonials, {
  name: "Testimonials",
  group: "Teaching Template / Landing",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Testimonials",
    },
    {
      name: "testimonial1Quote",
      type: "string",
      defaultValue: "Before working with FinX, my business finances felt like a tangled mess. I was constantly stressed and unsure if I was making the right decisions. Now, I have a clear financial roadmap and the confidence to invest in my business's future. I finally feel in control!",
    },
    {
      name: "testimonial1Name",
      type: "string",
      defaultValue: "Maher L",
    },
    {
      name: "testimonial1Date",
      type: "string",
      defaultValue: "29 August 2021",
    },
    {
      name: "testimonial1Avatar",
      type: "string",
      allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
      defaultValue: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&q=80",
    },
    {
      name: "testimonial2Quote",
      type: "string",
      defaultValue: "I always knew my passion could be profitable, but I struggled to turn it into a sustainable income. FinX helped me identify hidden costs, optimize my pricing, and create a business model that truly works. My profits have soared, and I'm finally able to pay myself what I'm worth.",
    },
    {
      name: "testimonial2Name",
      type: "string",
      defaultValue: "Samar L",
    },
    {
      name: "testimonial2Date",
      type: "string",
      defaultValue: "29 August 2021",
    },
    {
      name: "testimonial2Avatar",
      type: "string",
      allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
      defaultValue: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=56&q=80",
    },
    {
      name: "backgroundColor",
      type: "string",
      defaultValue: "#E6EBEE",
    },
  ],
});

Builder.registerComponent(TeachingWorthIt, {
  name: "Worth It",
  group: "Teaching Template / Landing",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Is Mastering Your Business Finances Really Worth It?",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "Are you wondering if investing in your financial knowledge is worth the cost? We understand. That's why we let our clients' success stories speak for themselves.",
    },
    {
      name: "feature1",
      type: "string",
      defaultValue: "Ongoing Support",
    },
    {
      name: "feature2",
      type: "string",
      defaultValue: "Personalized Financial Roadmaps",
    },
    {
      name: "feature3",
      type: "string",
      defaultValue: "Actionable Strategies",
    },
    {
      name: "feature4",
      type: "string",
      defaultValue: "Tailored Solutions",
    },
    {
      name: "buttonText",
      type: "string",
      defaultValue: "Send Message for Free Assessment",
    },
  ],
});

Builder.registerComponent(TeachingFreeAssessment, {
  name: "Free Assessment",
  group: "Teaching Template / Landing",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Free Assessment",
    },
    {
      name: "usernamePlaceholder",
      type: "string",
      defaultValue: "User name",
    },
    {
      name: "emailPlaceholder",
      type: "string",
      defaultValue: "Email Address",
    },
    {
      name: "messagePlaceholder",
      type: "string",
      defaultValue: "Message",
    },
    {
      name: "buttonText",
      type: "string",
      defaultValue: "Send Message for Free Assessment",
    },
    {
      name: "backgroundColor",
      type: "string",
      defaultValue: "#EAF1F6",
    },
  ],
});

// Footer Components
Builder.registerComponent(TeachingFooter, {
  name: "Footer",
  group: "Teaching Template / Layout",
  inputs: [
    {
      name: "copyright",
      type: "string",
      defaultValue: "@2024 Kadnya",
    },
    {
      name: "poweredByText",
      type: "string",
      defaultValue: "Powered By",
    },
    {
      name: "poweredByBrand",
      type: "string",
      defaultValue: "Kadnya",
    },
    {
      name: "termsText",
      type: "string",
      defaultValue: "Terms & Conditions",
    },
    {
      name: "privacyText",
      type: "string",
      defaultValue: "Privacy Policy",
    },
    {
      name: "instagramUrl",
      type: "string",
      defaultValue: "#",
    },
    {
      name: "facebookUrl",
      type: "string",
      defaultValue: "#",
    },
    {
      name: "twitterUrl",
      type: "string",
      defaultValue: "#",
    },
    {
      name: "linkedinUrl",
      type: "string",
      defaultValue: "#",
    },
    {
      name: "backgroundColor",
      type: "string",
      defaultValue: "#043A51",
    },
  ],
});

Builder.registerComponent(TeachingDarkFooter, {
  name: "Dark Footer",
  group: "Teaching Template / Layout",
  inputs: [
    {
      name: "copyright",
      type: "string",
      defaultValue: "@2024 Kadnya",
    },
    {
      name: "poweredByText",
      type: "string",
      defaultValue: "Powered By",
    },
    {
      name: "poweredByBrand",
      type: "string",
      defaultValue: "Kadnya",
    },
  ],
});

Builder.registerComponent(TeachingLightFooter, {
  name: "Light Footer",
  group: "Teaching Template / Layout",
  inputs: [
    {
      name: "copyright",
      type: "string",
      defaultValue: "@2024 Kadnya",
    },
    {
      name: "poweredByText",
      type: "string",
      defaultValue: "Powered By",
    },
    {
      name: "poweredByBrand",
      type: "string",
      defaultValue: "Kadnya",
    },
  ],
});

// About Page Components
Builder.registerComponent(AboutHero, {
  name: "About Hero",
  group: "Teaching Template / About",
  inputs: [
    {
      name: "backgroundImageUrl",
      type: "string",
      allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
    },
    {
      name: "heading",
      type: "string",
      defaultValue: "About Us",
    },
    {
      name: "subheading",
      type: "string",
      defaultValue: "Learn more about our mission and values",
    },
    {
      name: "buttonText",
      type: "string",
      defaultValue: "Get Started",
    },
  ],
});

Builder.registerComponent(WhoIAm, {
  name: "Who I Am",
  group: "Teaching Template / About",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Who I Am",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "I am a passionate educator and entrepreneur...",
    },
    {
      name: "imageUrl",
      type: "string",
      allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
    },
  ],
});

Builder.registerComponent(MyMission, {
  name: "My Mission",
  group: "Teaching Template / About",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "My Mission",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "To empower individuals and businesses...",
    },
  ],
});

Builder.registerComponent(MyVision, {
  name: "My Vision", 
  group: "Teaching Template / About",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "My Vision",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "A world where everyone has access to quality education...",
    },
  ],
});

Builder.registerComponent(ValueProposition, {
  name: "Value Proposition",
  group: "Teaching Template / About",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Our Value Proposition",
    },
    {
      name: "values",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description", 
          type: "string",
        },
        {
          name: "icon",
          type: "string",
        },
      ],
    },
  ],
});

Builder.registerComponent(ServicesSection, {
  name: "Services Section",
  group: "Teaching Template / About",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Our Services",
    },
    {
      name: "services",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "string", 
        },
        {
          name: "price",
          type: "string",
        },
      ],
    },
  ],
});

Builder.registerComponent(FAQ, {
  name: "FAQ",
  group: "Teaching Template / About",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Frequently Asked Questions",
    },
    {
      name: "faqs",
      type: "list",
      subFields: [
        {
          name: "question",
          type: "string",
        },
        {
          name: "answer",
          type: "string",
        },
      ],
    },
  ],
});

Builder.registerComponent(AboutTestimonials, {
  name: "About Testimonials",
  group: "Teaching Template / About",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "What Our Clients Say",
    },
    {
      name: "testimonials",
      type: "list",
      subFields: [
        {
          name: "quote",
          type: "string",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "role",
          type: "string",
        },
        {
          name: "avatar",
          type: "string",
          allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
        },
      ],
    },
  ],
});

// Store Page Components
Builder.registerComponent(StoreHero, {
  name: "Store Hero",
  group: "Teaching Template / Store",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Our Store",
    },
    {
      name: "subheading",
      type: "string",
      defaultValue: "Discover our products and services",
    },
    {
      name: "backgroundImageUrl",
      type: "string",
      allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
    },
  ],
});

Builder.registerComponent(ProductSection, {
  name: "Product Section",
  group: "Teaching Template / Store",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Featured Products",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "Check out our best-selling products",
    },
  ],
});

Builder.registerComponent(ProductSectionWithPagination, {
  name: "Product Section with Pagination",
  group: "Teaching Template / Store",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Featured Products",
    },
    {
      name: "apiEndpoint",
      type: "string",
      helperText: "API endpoint to fetch products from (optional)",
    },
    {
      name: "pageSize",
      type: "number",
      defaultValue: 5,
      min: 1,
      max: 20,
    },
    {
      name: "showPagination",
      type: "boolean",
      defaultValue: true,
    },
  ],
});

Builder.registerComponent(ProductCard, {
  name: "Product Card",
  group: "Teaching Template / Store",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Product Title",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "Product description...",
    },
    {
      name: "price",
      type: "string",
      defaultValue: "$99",
    },
    {
      name: "imageUrl",
      type: "string",
      allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
    },
    {
      name: "buttonText",
      type: "string",
      defaultValue: "Add to Cart",
    },
  ],
});

// Contact Page Components
Builder.registerComponent(ContactHero, {
  name: "Contact Hero",
  group: "Teaching Template / Contact",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Contact Us",
    },
    {
      name: "subheading",
      type: "string",
      defaultValue: "Get in touch with our team",
    },
    {
      name: "backgroundImageUrl",
      type: "string",
      allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
    },
  ],
});

Builder.registerComponent(ContactFooter, {
  name: "Contact Footer",
  group: "Teaching Template / Contact",
  inputs: [
    {
      name: "address",
      type: "string",
      defaultValue: "123 Business St, City, State 12345",
    },
    {
      name: "phone",
      type: "string",
      defaultValue: "(555) 123-4567",
    },
    {
      name: "email",
      type: "string",
      defaultValue: "contact@example.com",
    },
  ],
});

// Library Page Components
Builder.registerComponent(LibraryHero, {
  name: "Library Hero",
  group: "Teaching Template / Library",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Resource Library",
    },
    {
      name: "subheading",
      type: "string",
      defaultValue: "Access our collection of resources",
    },
  ],
});

Builder.registerComponent(MyLibrary, {
  name: "My Library",
  group: "Teaching Template / Library",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "My Library",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "Your personal collection of resources",
    },
  ],
});

Builder.registerComponent(LibraryCard, {
  name: "Library Card",
  group: "Teaching Template / Library",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Resource Title",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "Resource description...",
    },
    {
      name: "type",
      type: "string",
      defaultValue: "PDF",
    },
    {
      name: "downloadUrl",
      type: "string",
    },
  ],
});

// Course Page Components
Builder.registerComponent(CourseHero, {
  name: "Course Hero",
  group: "Teaching Template / Course",
  inputs: [
    {
      name: "courseTitle",
      type: "string",
      defaultValue: "Course Title",
    },
    {
      name: "courseDescription",
      type: "string",
      defaultValue: "Learn amazing skills in this comprehensive course",
    },
    {
      name: "instructor",
      type: "string",
      defaultValue: "Instructor Name",
    },
    {
      name: "duration",
      type: "string",
      defaultValue: "8 weeks",
    },
    {
      name: "price",
      type: "string",
      defaultValue: "$299",
    },
  ],
});

Builder.registerComponent(CourseContent, {
  name: "Course Content",
  group: "Teaching Template / Course",
  inputs: [
    {
      name: "modules",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "duration",
          type: "string",
        },
      ],
    },
  ],
});

Builder.registerComponent(CourseSidebar, {
  name: "Course Sidebar",
  group: "Teaching Template / Course",
  inputs: [
    {
      name: "progress",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 100,
    },
    {
      name: "nextLesson",
      type: "string",
      defaultValue: "Next: Introduction to Basics",
    },
  ],
});

// Lesson Page Components
Builder.registerComponent(LessonHeader, {
  name: "Lesson Header",
  group: "Teaching Template / Lesson",
  inputs: [
    {
      name: "lessonTitle",
      type: "string",
      defaultValue: "Lesson Title",
    },
    {
      name: "courseTitle",
      type: "string",
      defaultValue: "Course Title",
    },
    {
      name: "lessonNumber",
      type: "number",
      defaultValue: 1,
    },
  ],
});

Builder.registerComponent(LessonContent, {
  name: "Lesson Content",
  group: "Teaching Template / Lesson",
  inputs: [
    {
      name: "videoUrl",
      type: "string",
    },
    {
      name: "transcript",
      type: "string",
      defaultValue: "Lesson transcript...",
    },
    {
      name: "materials",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "url",
          type: "string",
        },
      ],
    },
  ],
});

Builder.registerComponent(LessonSidebar, {
  name: "Lesson Sidebar",
  group: "Teaching Template / Lesson",
  inputs: [
    {
      name: "lessonList",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "duration",
          type: "string",
        },
        {
          name: "completed",
          type: "boolean",
        },
      ],
    },
  ],
});

Builder.registerComponent(Comments, {
  name: "Comments",
  group: "Teaching Template / Lesson",
  inputs: [
    {
      name: "comments",
      type: "list",
      subFields: [
        {
          name: "author",
          type: "string",
        },
        {
          name: "content",
          type: "string",
        },
        {
          name: "timestamp",
          type: "string",
        },
        {
          name: "avatar",
          type: "string",
          allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
        },
      ],
    },
  ],
});

// Coaching Page Components
Builder.registerComponent(CoachingHero, {
  name: "Coaching Hero",
  group: "Teaching Template / Coaching",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Personal Coaching",
    },
    {
      name: "subheading",
      type: "string",
      defaultValue: "One-on-one guidance to achieve your goals",
    },
    {
      name: "backgroundImageUrl",
      type: "string",
      allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
    },
  ],
});

Builder.registerComponent(CoachingTypes, {
  name: "Coaching Types",
  group: "Teaching Template / Coaching",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Choose Your Coaching Style",
    },
    {
      name: "types",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "price",
          type: "string",
        },
        {
          name: "features",
          type: "list",
          subFields: [
            {
              name: "feature",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
});

// Group Coaching Components
Builder.registerComponent(GroupHero, {
  name: "Group Hero",
  group: "Teaching Template / Group Coaching",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Group Coaching",
    },
    {
      name: "subheading",
      type: "string",
      defaultValue: "Learn and grow with like-minded individuals",
    },
  ],
});

Builder.registerComponent(GroupFeatures, {
  name: "Group Features",
  group: "Teaching Template / Group Coaching",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Group Benefits",
    },
    {
      name: "features",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
      ],
    },
  ],
});

Builder.registerComponent(GroupSessions, {
  name: "Group Sessions",
  group: "Teaching Template / Group Coaching",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Upcoming Sessions",
    },
    {
      name: "sessions",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "date",
          type: "string",
        },
        {
          name: "time",
          type: "string",
        },
        {
          name: "topic",
          type: "string",
        },
      ],
    },
  ],
});

Builder.registerComponent(GroupBooking, {
  name: "Group Booking",
  group: "Teaching Template / Group Coaching",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Book Your Session",
    },
    {
      name: "price",
      type: "string",
      defaultValue: "$99/session",
    },
    {
      name: "buttonText",
      type: "string",
      defaultValue: "Book Now",
    },
  ],
});

// One-to-One Coaching Components
Builder.registerComponent(OneToOneHero, {
  name: "One-to-One Hero",
  group: "Teaching Template / One-to-One Coaching",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "One-to-One Coaching",
    },
    {
      name: "subheading",
      type: "string",
      defaultValue: "Personalized guidance tailored to your needs",
    },
  ],
});

Builder.registerComponent(CoachingFeatures, {
  name: "Coaching Features",
  group: "Teaching Template / One-to-One Coaching",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "What You Get",
    },
    {
      name: "features",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
      ],
    },
  ],
});

Builder.registerComponent(SessionBooking, {
  name: "Session Booking",
  group: "Teaching Template / One-to-One Coaching",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Book Your Session",
    },
    {
      name: "price",
      type: "string",
      defaultValue: "$199/hour",
    },
    {
      name: "availableSlots",
      type: "list",
      subFields: [
        {
          name: "date",
          type: "string",
        },
        {
          name: "time",
          type: "string",
        },
      ],
    },
  ],
});

Builder.registerComponent(SessionHistory, {
  name: "Session History",
  group: "Teaching Template / One-to-One Coaching",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Your Sessions",
    },
    {
      name: "sessions",
      type: "list",
      subFields: [
        {
          name: "date",
          type: "string",
        },
        {
          name: "duration",
          type: "string",
        },
        {
          name: "notes",
          type: "string",
        },
        {
          name: "status",
          type: "string",
          enum: ["completed", "upcoming", "cancelled"],
        },
      ],
    },
  ],
});

// ============= DYNAMIC CONTENT COMPONENTS =============

Builder.registerComponent(CourseCard, {
  name: "Course Card",
  group: "Dynamic Content / Individual",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Course Title",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "Course description goes here...",
    },
    {
      name: "instructor",
      type: "string",
      defaultValue: "Instructor Name",
    },
    {
      name: "duration",
      type: "string",
      defaultValue: "8 weeks",
    },
    {
      name: "price",
      type: "string",
      defaultValue: "$299",
    },
    {
      name: "imageUrl",
      type: "string",
      allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
      defaultValue: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
    },
    {
      name: "rating",
      type: "number",
      defaultValue: 4.5,
      min: 0,
      max: 5,
      step: 0.1,
    },
    {
      name: "studentsCount",
      type: "number",
      defaultValue: 1234,
    },
    {
      name: "level",
      type: "string",
      enum: ["Beginner", "Intermediate", "Advanced"],
      defaultValue: "Beginner",
    },
    {
      name: "category",
      type: "string",
      defaultValue: "Business",
    },
    {
      name: "slug",
      type: "string",
      defaultValue: "",
    },
    {
      name: "tags",
      type: "list",
      subFields: [
        {
          name: "tag",
          type: "string",
        },
      ],
    },
  ],
});

Builder.registerComponent(DynamicProductCard, {
  name: "Dynamic Product Card",
  group: "Dynamic Content / Individual",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Product Title",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "Product description goes here...",
    },
    {
      name: "price",
      type: "string",
      defaultValue: "$99",
    },
    {
      name: "originalPrice",
      type: "string",
      defaultValue: "",
    },
    {
      name: "imageUrl",
      type: "string",
      allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
      defaultValue: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80",
    },
    {
      name: "rating",
      type: "number",
      defaultValue: 4.5,
      min: 0,
      max: 5,
      step: 0.1,
    },
    {
      name: "reviewsCount",
      type: "number",
      defaultValue: 89,
    },
    {
      name: "category",
      type: "string",
      defaultValue: "Digital Product",
    },
    {
      name: "slug",
      type: "string",
      defaultValue: "",
    },
    {
      name: "tags",
      type: "list",
      subFields: [
        {
          name: "tag",
          type: "string",
        },
      ],
    },
    {
      name: "isOnSale",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "inStock",
      type: "boolean",
      defaultValue: true,
    },
  ],
});

Builder.registerComponent(BlogCard, {
  name: "Blog Card",
  group: "Dynamic Content / Individual",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Blog Post Title",
    },
    {
      name: "excerpt",
      type: "string",
      defaultValue: "This is a brief excerpt of the blog post...",
    },
    {
      name: "author",
      type: "string",
      defaultValue: "Author Name",
    },
    {
      name: "authorImage",
      type: "string",
      allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
      defaultValue: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&q=80",
    },
    {
      name: "publishDate",
      type: "string",
      defaultValue: "Dec 15, 2024",
    },
    {
      name: "readTime",
      type: "string",
      defaultValue: "5 min read",
    },
    {
      name: "imageUrl",
      type: "string",
      allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
      defaultValue: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=80",
    },
    {
      name: "category",
      type: "string",
      defaultValue: "Education",
    },
    {
      name: "slug",
      type: "string",
      defaultValue: "",
    },
    {
      name: "tags",
      type: "list",
      subFields: [
        {
          name: "tag",
          type: "string",
        },
      ],
    },
    {
      name: "isFeatured",
      type: "boolean",
      defaultValue: false,
    },
  ],
});

Builder.registerComponent(CourseList, {
  name: "Course List",
  group: "Dynamic Content / Lists",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Featured Courses",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "Discover our most popular courses and start learning today",
    },
    {
      name: "courses",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "instructor",
          type: "string",
        },
        {
          name: "duration",
          type: "string",
        },
        {
          name: "price",
          type: "string",
        },
        {
          name: "imageUrl",
          type: "string",
          allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
        },
        {
          name: "rating",
          type: "number",
          min: 0,
          max: 5,
          step: 0.1,
        },
        {
          name: "studentsCount",
          type: "number",
        },
        {
          name: "level",
          type: "string",
          enum: ["Beginner", "Intermediate", "Advanced"],
        },
        {
          name: "category",
          type: "string",
        },
        {
          name: "slug",
          type: "string",
        },
      ],
    },
    {
      name: "viewMode",
      type: "string",
      enum: ["grid", "list"],
      defaultValue: "grid",
    },
    {
      name: "showFilters",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "showSearch",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "showViewToggle",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "maxItemsToShow",
      type: "number",
      defaultValue: 0,
      helperText: "0 = show all items",
    },
    {
      name: "backgroundColor",
      type: "string",
      defaultValue: "#ffffff",
    },
  ],
});

Builder.registerComponent(ProductList, {
  name: "Product List",
  group: "Dynamic Content / Lists",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Featured Products",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "Discover our best-selling digital products and resources",
    },
    {
      name: "products",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "price",
          type: "string",
        },
        {
          name: "originalPrice",
          type: "string",
        },
        {
          name: "imageUrl",
          type: "string",
          allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
        },
        {
          name: "rating",
          type: "number",
          min: 0,
          max: 5,
          step: 0.1,
        },
        {
          name: "reviewsCount",
          type: "number",
        },
        {
          name: "category",
          type: "string",
        },
        {
          name: "slug",
          type: "string",
        },
        {
          name: "isOnSale",
          type: "boolean",
        },
        {
          name: "inStock",
          type: "boolean",
        },
      ],
    },
    {
      name: "viewMode",
      type: "string",
      enum: ["grid", "list"],
      defaultValue: "grid",
    },
    {
      name: "showFilters",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "showSearch",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "showViewToggle",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "showPriceFilter",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "maxItemsToShow",
      type: "number",
      defaultValue: 0,
      helperText: "0 = show all items",
    },
    {
      name: "backgroundColor",
      type: "string",
      defaultValue: "#ffffff",
    },
  ],
});

Builder.registerComponent(BlogList, {
  name: "Blog List",
  group: "Dynamic Content / Lists",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Latest Blog Posts",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "Stay updated with our latest insights, tips, and industry knowledge",
    },
    {
      name: "posts",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "excerpt",
          type: "string",
        },
        {
          name: "author",
          type: "string",
        },
        {
          name: "authorImage",
          type: "string",
          allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
        },
        {
          name: "publishDate",
          type: "string",
        },
        {
          name: "readTime",
          type: "string",
        },
        {
          name: "imageUrl",
          type: "string",
          allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
        },
        {
          name: "category",
          type: "string",
        },
        {
          name: "slug",
          type: "string",
        },
        {
          name: "isFeatured",
          type: "boolean",
        },
      ],
    },
    {
      name: "viewMode",
      type: "string",
      enum: ["grid", "list"],
      defaultValue: "grid",
    },
    {
      name: "showFilters",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "showSearch",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "showViewToggle",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "showDateFilter",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "featuredFirst",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "maxItemsToShow",
      type: "number",
      defaultValue: 0,
      helperText: "0 = show all items",
    },
    {
      name: "backgroundColor",
      type: "string",
      defaultValue: "#ffffff",
    },
  ],
});
