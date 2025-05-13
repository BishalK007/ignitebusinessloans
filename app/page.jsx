"use client";
import React, { useState, useEffect, useRef } from "react";
import QuestionCard from "@/components/form";
import { questions } from "@/data/questions";
// import dynamic from "next/dynamic";
// Dynamically import Lottie with SSR disabled
// const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
// import planeLottie from "@/public/assets/loading_plane_lottie.json";
import Logo from "@/components/icons/logo";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const NAV_STEPS = [
  { label: "BASIC INFO", range: [0, 4] },
  { label: "YOUR BUSINESS", range: [5, 8] },
  { label: "YOUR INFO", range: [9, 12] },
  { label: "OFFERS AND FINAL DETAILS", range: [13, 13] }, // Only after submit/loading
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
    <span className="inline-flex items-center justify-center w-36 h-36 rounded-full text-white font-extrabold  text-3xl select-none pl-2">
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
  // console.log("Check remount");
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
        {/* <Lottie animationData={planeLottie} loop={true} /> */}
        <DotLottieReact
          src="https://lottie.host/bf7fd8f7-e04e-4aa0-a66c-e82776790d7f/xSwVsdZEWj.json"
          loop
          autoplay
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        {processingTexts.map((txt, idx) => (
          <span
            key={idx}
            className={`text-base md:text-lg font-medium transition-opacity duration-500 ${
              idx === step
                ? "opacity-100 text-stone-200"
                : "opacity-60 text-stone-200"
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
  const [submitError, setSubmitError] = useState("");
  const submittedRef = useRef(false);
  const step = getStep(current, showLoader);

  // Map answers to required API keys
  function mapAnswersToApi(answers) {
    const creditScore = (() => {
      switch (answers.creditScore) {
      case questions[5].options[0]:
        return 750;
      case questions[5].options[1]:
        return 690;
      case questions[5].options[2]:
        return 630;
      case questions[5].options[3]:
        return 580;
      default:
        return 0;
      }
    })();

    const loanAmount = (() => {
      if (!answers.needFunding) return 0;
      const str = answers.needFunding.replace(/[\$,]/g, "").trim();
      if (/^\d+$/.test(str)) return parseInt(str, 10);
      const match = str.match(/(\d[\d,]*)/g);
      if (match && match.length > 0) {
        // Use the higher value if it's a range, else the first number
        return parseInt(match[match.length - 1].replace(/,/g, ""), 10);
      }
      return 0;
    })();
    return {
      in_business: answers.startTime,
      business_type: answers.businessType,
      loan_amount: loanAmount,
      fund_reason: answers.fundUsage,
      annual_revenue: answers.annualRevenue,
      credit_score: creditScore,
      industry: answers.industryName,
      zipcode: answers.ZipCode,
      business_name: answers.BusinessName,
      first_name: answers.fullName?.firstName || "",
      last_name: answers.fullName?.lastName || "",
      phone: answers.phoneNumber,
      email: answers.email,
    };
  }
  const submitAnswers = async () => {
    // Prevent multiple submissions using the ref
    if (submittedRef.current) {
      console.log("Submission already in progress, skipping duplicate call");
      return true;
    }
    
    submittedRef.current = true;

    try {
      // console.log("Submitting answers:", answers);
      const apiData = mapAnswersToApi(answers);
      // console.log("Mapped API data:", apiData);
      const res = await fetch("/api/send_response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });
      if (!res.ok) throw new Error("Failed to send response");
      return true;
    } catch (err) {
      setSubmitError("Something went wrong sending the response");
      return false;
    }
  };

  const handleLoaderDone = async () => {
    const MIN_LOADER_TIME = 3000;
    const start = Date.now();
    await submitAnswers();
    const elapsed = Date.now() - start;
    if (elapsed < MIN_LOADER_TIME) {
      setTimeout(() => {
        setShowLoader(false);
        setShowThankYou(true);
      }, MIN_LOADER_TIME - elapsed);
    } else {
      setShowLoader(false);
      setShowThankYou(true);
    }
  };

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
    <main className="flex flex-col  relative min-h-screen text-foreground">
      <div
        className="bg-ignite-animated"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100dvh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
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
      </div>

      {/* Main div */}
      <div className="flex-1 flex flex-col z-10">
        {/* Navbar */}
        <nav className="w-full py-3 px-2 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2 font-barlow">
          <div className="flex items-center gap-1 mb-2 sm:mb-0 ">
            <IgniteLogo />
          </div>
          {/* For larger screens, show the full navbar */}
          <div className="hidden sm:flex w-full sm:w-auto flex-1 justify-end max-w-[500px]">
            <ol className="flex flex-wrap justify-end w-full gap-x-6 gap-y-2">
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
          {/* For mobile screens, show only the current step with fiery count */}
          {!showThankYou && (
            <div className="flex sm:hidden w-full justify-center items-center gap-2">
              <span className="text-base md:text-lg font-semibold text-center text-Orange-200">
                {NAV_STEPS[step]?.label}
              </span>
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-fire-glow">
                {step + 1}/{NAV_STEPS.length}
              </span>
            </div>
          )}
        </nav>
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-2">
          {showLoader ? (
            <div className="bg-gray-400/20 text-stone-200 rounded-xl shadow-lg p-10 w-full max-w-lg flex flex-col items-center justify-center text-center">
              <Loader onDone={handleLoaderDone} />
            </div>
          ) : showThankYou ? (
            <div className="glassmorphic-card rounded-xl shadow-lg p-10 w-full max-w-lg flex flex-col items-center justify-center text-center">
              <DotLottieReact
                src="https://lottie.host/e8c90258-9d4b-431c-8c92-3a5265537042/NvFzQRXoPm.lottie"
                loop
                autoplay
                className="w-32 h-32 mb-4"
              />
              <h2
                className={`text-2xl font-bold mb-2 ${
                  submitError ? "text-red-400" : "text-stone-300"
                }`}
              >
                {submitError
                  ? "Something went wrong sending the response"
                  : "Your responses have been recorded"}
              </h2>
              <p className="text-stone-300">
                {submitError
                  ? "Please try again later."
                  : "We will get back to you soon."}
              </p>
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
        <footer className="w-ful mt-auto bg-[var(--background-rgba-60)]">
          <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
            <div className="flex flex-col items-center mb-4">
              <IgniteLogo />
            </div>
            <div className=" text-sm text-center">
              © {new Date().getFullYear()} IgniteBusinessLoans. All rights
              reserved.
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
