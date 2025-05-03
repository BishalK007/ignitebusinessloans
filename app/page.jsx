"use client";
import React, { useState, useEffect } from "react";
import QuestionCard from "@/components/form";
import { questions } from "@/data/questions";
import dynamic from "next/dynamic";
// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import planeLottie from "@/public/assets/loading_plane_lottie.json";
import Logo from "@/components/icons/logo";

const NAV_STEPS = [
  { label: "Basic Info", range: [0, 4] },
  { label: "Your Business", range: [5, 8] },
  { label: "Your Info", range: [9, 12] },
  { label: "Offers and Final Details", range: [13, 13] }, // Only after submit/loading
];

function getStep(current, showLoader) {
  if (showLoader) return 3; // highlight "Offers and final details"
  for (let i = 0; i < NAV_STEPS.length; i++) {
    const [start, end] = NAV_STEPS[i].range;
    if (current >= start && current <= end) return i;
  }
  return 0;
}

function IgniteLogo() {
  return (
      <span className="inline-flex items-center justify-center w-36 h-36 rounded-full text-white font-extrabold text-3xl select-none pl-2">
        <Logo />
      </span>
  );
}

// Stylized animated loader with Lottie and processing texts
function Loader({ onDone }) {
  const processingTexts = [
    "Analyzing your business profile...",
    "Matching you with the best funding options...",
    "Finalizing your application...",
    "Submitting your application...",
  ];
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Change text every 2s, after 8s call onDone
    if (step < processingTexts.length - 1) {
      const interval = setInterval(() => {
        setStep((prev) => prev + 1);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      // After last step, wait 1s then call onDone
      const timeout = setTimeout(() => {
        if (onDone) onDone();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [step, processingTexts.length, onDone]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[340px] w-full">
      <div className="w-64 h-64 mb-6">
        <Lottie animationData={planeLottie} loop={true} />
      </div>
      <div className="flex flex-col items-center gap-2">
        {processingTexts.map((txt, idx) => (
          <span
            key={idx}
            className={`text-base md:text-lg font-medium transition-opacity duration-500 ${
              idx === step
                ? "opacity-100 text-blue-900"
                : "opacity-60 text-gray-900"
            }`}
          >
            {txt}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const step = getStep(current, showLoader);

  const handleSelect = (option, errorMsg) => {
    if (errorMsg) {
      setFieldError(errorMsg);
      return;
    }
    setFieldError("");
    setAnswers({ ...answers, [questions[current].id]: option });
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowLoader(true);
    }
  };

  return (
    <main className="flex flex-col bg-ignite-animated relative min-h-screen">
      {/* BG */}
      <div className="floating-ball orange size1"></div>
      <div className="floating-ball brown size2"></div>
      <div className="floating-ball orange size3"></div>
      <div className="floating-ball brown size4"></div>
      <div className="floating-ball orange size5"></div>
      <div className="floating-ball brown size6"></div>
      <div className="floating-ball orange size7"></div>
      <div className="floating-ball brown size8"></div>
      <div className="floating-ball orange size9"></div>
      <div className="floating-ball brown size10"></div>

      {/* Main div */}
      <div className="flex-1 flex flex-col z-10">
        {/* Navbar */}
        <nav className="w-full py-3 px-2 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2 ">
          <div className="flex items-center gap-1 mb-2 sm:mb-0 ">
            <IgniteLogo/>
          </div>
          <div className="w-full sm:w-auto flex-1 flex justify-end max-w-[500px]">
            <ol className="flex flex-wrap justify-end w-full gap-x-6 gap-y-2 ">
              {NAV_STEPS.map((stepObj, idx) => (
                <li
                  key={stepObj.label}
                  className={`flex-1 min-w-[120px] text-base md:text-lg font-semibold transition-colors text-center
                  ${step === idx ? "text-Orange-200" : "text-gray-400"}
                `}
                >
                  {stepObj.label}
                </li>
              ))}
            </ol>
          </div>
        </nav>
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-2">
          {showLoader ? (
            <Loader
              onDone={() => {
                setShowLoader(false);
                setShowThankYou(true);
              }}
            />
          ) : showThankYou ? (
            <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-lg flex flex-col items-center justify-center text-center">
              <span className="text-5xl mb-4">🎉</span>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                Your responses have been recorded
              </h2>
              <p className="text-gray-700">We will get back to you soon.</p>
            </div>
          ) : (
            <QuestionCard
              question={questions[current]}
              selected={answers[questions[current].id]}
              onSelect={handleSelect}
              fieldError={fieldError}
              setFieldError={setFieldError}
              onBack={() => setCurrent((c) => Math.max(0, c - 1))}
            />
          )}
        </div>
        {/* Responsive Footer */}
        <footer className="w-full bg-Black-950 bg-opacity-70 mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
            <div className="flex flex-col items-center mb-4">
              <IgniteLogo />
              <span className="text-2xl font-bold bg-gradient-to-r from-DeepOrange to-Orange-200 bg-clip-text text-transparent">
                IgniteBusinessLoans
              </span>
            </div>
            <div className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} IgniteBusinessLoans. All rights
              reserved.
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
