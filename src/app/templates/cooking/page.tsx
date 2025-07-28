import React from 'react'
import HeroSection from './components/HeroSection/HeroSection'
import ValueStack from './components/ValueStack/ValueStack'
import PainPoint from './components/PainPoint/PainPoint'
import HelpSection from './components/ExpertInfo/HelpSection'
import ProgramInfo from './components/ProgramInfo/ProgramInfo'
import WorthIt from './components/WorthIt/WorthIt'
import Assessment from './components/Assessment/Assessment'
import HowItWorksSection from './components/WorkSection/WorkSection'
import TestimonialSlider from './components/TestimonialSwipper/TestimonialSwiper'
const page = () => {
  return (
    <>
        <HeroSection />
        <ValueStack />
        <PainPoint />
        <HelpSection />
        <ProgramInfo />
        <TestimonialSlider />
        <HowItWorksSection />
        <Assessment />
        <WorthIt />
    </>
  )
}

export default page