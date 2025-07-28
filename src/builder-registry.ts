"use client";
import { builder, Builder, withChildren } from "@builder.io/react";
import Assessment from "./app/templates/cooking/components/Assessment/Assessment";
import { CardFooter } from "./components/ui/card";
import ContactSection from "./app/templates/cooking/components/ContactHeader/ContactHeader";
import ExpertInfo from "./app/templates/teaching/components/ExpertInfo/ExpertInfo";
import Footer from "./app/templates/cooking/components/Footer/Footer";
import HelpSection from "./app/templates/cooking/components/ExpertInfo/HelpSection";
import HeroBanner from "./app/templates/cooking/components/AboutHeroSection/HeroSection";
import HowItWorksSection from "./app/templates/cooking/components/WorkSection/WorkSection";
import MissionSection from "./app/templates/cooking/components/AboutMissionSection/MissionSection";
import Navbar from "./app/templates/cooking/components/Navbar/Navbar";
import PainPoint from "./app/templates/cooking/components/PainPoint/PainPoint";
import ProgramInfo from "./app/templates/cooking/components/ProgramInfo/ProgramInfo";
import ValueSection from "./app/templates/cooking/components/AboutValueSection/ValueSection";
import ValueStack from "./app/templates/cooking/components/ValueStack/ValueStack";
import WorthIt from "./app/templates/cooking/components/WorthIt/WorthIt";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(HeroBanner, {
  name: "HeroBanner",
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

Builder.registerComponent(ExpertInfo, {
  name: "ExpertInfo",
});

Builder.registerComponent(withChildren(CardFooter), {
  name: "CardFooter",
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

Builder.registerComponent(Assessment, {
  name: "Assessment",
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
  name: "HelpSection",
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

Builder.registerComponent(Navbar, {
  name: "Navbar",
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

Builder.registerComponent(ValueStack, {
  name: "ValueStack",
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

Builder.registerComponent(PainPoint, {
  name: "PainPoint",
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
  name: "valuese",
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
  name: "ValueSection",
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
  name: "ContactSection",
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

Builder.registerComponent(Footer, {
  name: "Footer",
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

Builder.registerComponent(ProgramInfo, {
  name: "ProgramInfo",
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
  name: "HowItWorksSection",
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

Builder.registerComponent(withChildren(WorthIt), {
  name: "WorthIt",
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
