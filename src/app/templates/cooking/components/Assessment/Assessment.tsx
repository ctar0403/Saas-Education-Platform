'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePathname } from 'next/navigation'

type AssessmentProps = {
  heading?: string
  buttonText?: string
  buttonColor?: string
  backgroundColor?: string
}

const Assessment = ({
  heading = 'Free Assessment',
  buttonText = 'Send Message for Free Assessment',
  buttonColor = '#F97316', // default orange-500
  backgroundColor = '#FFF8F1',
}: AssessmentProps) => {
  const pathName = usePathname()

  return (
    <div
      className="w-full min-h-[50vh] flex items-center justify-center px-4"
      style={{ backgroundColor: pathName.includes('/about') ? '#ffffff' : backgroundColor }}
    >
      <div className="max-w-2xl w-full bg-transparent text-center space-y-6 py-10">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
          {heading}
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
          <Input
            className="bg-white w-[15rem] md:w-[13rem] h-10"
            id="name"
            placeholder="User Name"
          />
          <Input
            className="bg-white w-[15rem] md:w-[13rem] h-10"
            id="email"
            type="email"
            placeholder="Email Address"
          />
        </div>

        <Button
          style={{ backgroundColor: buttonColor }}
          className="text-white text-sm px-6 py-6 rounded hover:opacity-90"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

export default Assessment
