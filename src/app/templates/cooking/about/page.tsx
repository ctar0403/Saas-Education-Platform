import React from 'react'
import Assessment from '../components/Assessment/Assessment'
import MissionSection from '../components/AboutMissionSection/MissionSection'
import HeroBanner from '../components/AboutHeroSection/HeroSection'
import ValueSection from '../components/AboutValueSection/ValueSection'

const page = () => {
  return (
    <div>
        <HeroBanner />
        <MissionSection />
        <ValueSection />
        <Assessment />
    </div>
  )
}

export default page