"use client"
import React, { useState, useEffect } from "react"
import QuestionCard from "@/components/form"
import { questions } from "@/data/questions"

const NAV_STEPS = [
  { label: "Basic Info", range: [0, 4] },
  { label: "Your Business", range: [5, 8] },
  { label: "Your Info", range: [9, questions.length - 1] },
]

function getStep(current) {
  for (let i = 0; i < NAV_STEPS.length; i++) {
    const [start, end] = NAV_STEPS[i].range
    if (current >= start && current <= end) return i
  }
  return 0
}

function IgniteLogo() {
  return (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-blue-900 to-blue-400 text-white font-extrabold text-3xl select-none">
      I
    </span>
  )
}

// Stylized animated loader
function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="relative mb-6">
        <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
        <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-blue-900">I</span>
      </div>
      <div className="text-lg font-semibold text-blue-900 animate-pulse">Submitting your responses...</div>
    </div>
  )
}

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showLoader, setShowLoader] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const step = getStep(current)

  const handleSelect = (option) => {
    setAnswers({ ...answers, [questions[current].id]: option })
    if (current < questions.length - 1) {
      setCurrent(current + 1)
    } else {
      setShowLoader(true)
    }
  }

  useEffect(() => {
    if (showLoader) {
      const timer = setTimeout(() => {
        setShowLoader(false)
        setShowThankYou(true)
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [showLoader])

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* Navbar */}
      <nav className="w-full bg-gray-50 border-b border-gray-200 py-3 px-2 flex items-center justify-between md:justify-center">
        <div className="flex items-center gap-2 md:gap-4">
          <IgniteLogo />
          <span className="ml-2 text-xl font-bold text-blue-900 hidden sm:inline">Ignitebusinessloans</span>
        </div>
        <div className="flex-1 flex justify-center">
          <ol className="flex gap-4 md:gap-8">
            {NAV_STEPS.map((stepObj, idx) => (
              <li
                key={stepObj.label}
                className={`text-base md:text-lg font-semibold transition-colors
                  ${step === idx ? "text-blue-900" : "text-gray-400"}
                `}
              >
                {stepObj.label}
              </li>
            ))}
          </ol>
        </div>
        <div className="w-10 h-10" /> {/* Spacer for symmetry */}
      </nav>
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-2">
        {showLoader ? (
          <Loader />
        ) : showThankYou ? (
          <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-lg flex flex-col items-center justify-center text-center">
            <span className="text-5xl mb-4">🎉</span>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Your responses have been recorded</h2>
            <p className="text-gray-700">We will get back to you soon.</p>
          </div>
        ) : (
          <QuestionCard
            question={questions[current]}
            selected={answers[questions[current].id]}
            onSelect={handleSelect}
          />
        )}
      </div>
      <footer className="w-full bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-4">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-blue-900 to-blue-400 text-white font-extrabold text-4xl select-none mb-2">
            I
          </span>
          <span className="text-2xl font-bold text-blue-900">ignitebusinessloans</span>
        </div>
        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-4 text-gray-500 mb-4 text-base">
          <a href="#" className="hover:text-blue-900 transition">About Us</a>
          <a href="#" className="hover:text-blue-900 transition">Guides</a>
          <a href="#" className="hover:text-blue-900 transition">FAQs</a>
          <a href="#" className="hover:text-blue-900 transition">Privacy Policy</a>
          <a href="#" className="hover:text-blue-900 transition">Terms</a>
          <a href="#" className="hover:text-blue-900 transition">Contact</a>
        </nav>
        {/* Socials */}
          <div className="flex gap-4 mb-4">
            <a href="#" aria-label="X / Twitter" className="text-blue-900 hover:text-blue-400 transition">
              <svg width="24" height="24" fill="currentColor"><path d="M22.162 5.656c-.793.352-1.646.59-2.54.697a4.48 4.48 0 0 0 1.963-2.47 8.94 8.94 0 0 1-2.828 1.082A4.47 4.47 0 0 0 11.07 9.03c0 .35.04.69.116 1.016-3.715-.186-7.01-1.965-9.21-4.67a4.48 4.48 0 0 0-.605 2.25c0 1.552.79 2.922 2.002 3.726a4.44 4.44 0 0 1-2.025-.56v.057a4.48 4.48 0 0 0 3.587 4.393c-.193.053-.397.08-.607.08-.148 0-.292-.014-.432-.04a4.48 4.48 0 0 0 4.18 3.11A8.97 8.97 0 0 1 2 19.54a12.67 12.67 0 0 0 6.86 2.01c8.23 0 12.74-6.82 12.74-12.74 0-.194-.004-.388-.013-.58a9.1 9.1 0 0 0 2.24-2.32z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="text-blue-900 hover:text-blue-400 transition">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 448 512"><path d="M224 202.66A53.34 53.34 0 1 0 277.34 256 53.38 53.38 0 0 0 224 202.66Zm124.71-41a54 54 0 0 0-30.36-30.36C293.19 120 256 118.13 224 118.13s-69.19 1.87-94.35 13.17a54 54 0 0 0-30.36 30.36C120 162.81 118.13 200 118.13 232s1.87 69.19 13.17 94.35a54 54 0 0 0 30.36 30.36C162.81 376 200 377.87 232 377.87s69.19-1.87 94.35-13.17a54 54 0 0 0 30.36-30.36C376 349.19 377.87 312 377.87 280s-1.87-69.19-13.17-94.35ZM224 338a82 82 0 1 1 82-82 82 82 0 0 1-82 82Zm85.4-148.6a19.2 19.2 0 1 1-19.2-19.2 19.2 19.2 0 0 1 19.2 19.2ZM398.8 80A80 80 0 0 0 368 51.2C342.81 40 305.62 38.13 273.62 38.13s-69.19 1.87-94.35 13.17A80 80 0 0 0 80 80C68.13 105.19 66.26 142.38 66.26 174.38s1.87 69.19 13.17 94.35A80 80 0 0 0 80 368c25.19 11.87 62.38 13.74 94.38 13.74s69.19-1.87 94.35-13.17A80 80 0 0 0 368 432c11.87-25.19 13.74-62.38 13.74-94.38s-1.87-69.19-13.17-94.35ZM224 338a82 82 0 1 1 82-82 82 82 0 0 1-82 82Zm85.4-148.6a19.2 19.2 0 1 1-19.2-19.2 19.2 19.2 0 0 1 19.2 19.2Z"/></svg>
            </a>
            <a href="#" aria-label="Facebook" className="text-blue-900 hover:text-blue-400 transition">
              <svg width="24" height="24" fill="currentColor"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.692v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.592 1.325-1.326V1.326C24 .592 23.405 0 22.675 0"/></svg>
            </a>
            <a href="#" aria-label="YouTube" className="text-red-600 hover:text-red-400 transition">
              <svg width="24" height="24" fill="currentColor"><path d="M23.498 6.186a2.993 2.993 0 0 0-2.107-2.117C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.391.569A2.993 2.993 0 0 0 .502 6.186C0 8.08 0 12 0 12s0 3.92.502 5.814a2.993 2.993 0 0 0 2.107 2.117C4.5 20.5 12 20.5 12 20.5s7.5 0 9.391-.569a2.993 2.993 0 0 0 2.107-2.117C24 15.92 24 12 24 12s0-3.92-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
          {/* Copyright */}
        <div className="text-gray-400 text-sm text-center">
          © {new Date().getFullYear()} IgniteBusinessLoans. All rights reserved.
        </div>
      </div>
    </footer>
    </main>
    
  )
}