"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackIcon from "./icons/back-icon";

const spring = {
  type: "spring",
  stiffness: 400,
  damping: 32,
  mass: 1.2,
};

function isValidUSZip(zip) {
  return /^\d{5}$/.test(zip);
}

function isValidUSPhone(phone) {
  // Accepts (212) 555-1234 or 212-555-1234 or 2125551234
  return /^(\(\d{3}\)\s?|\d{3}-?)\d{3}-?\d{4}$/.test(phone);
}

async function fetchZipLocation(zip) {
  try {
    const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
    if (!res.ok) return null;
    const data = await res.json();
    const place = data.places?.[0];
    if (place) {
      return `${place["place name"]}, ${place["state abbreviation"]}`;
    }
    return null;
  } catch {
    return null;
  }
}

export default function QuestionCard({
  question,
  selected,
  onSelect,
  fieldError,
  setFieldError,
  onBack,
}) {
  // For ZipCode field
  const [zipInput, setZipInput] = useState("");
  const [zipLocation, setZipLocation] = useState("");
  const [zipError, setZipError] = useState("");
  // For phone number
  const [phoneInput, setPhoneInput] = useState("");

  // Handle zip code input change and lookup
  const handleZipChange = async (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 5);
    setZipInput(val);
    setZipLocation("");
    setZipError("");
    if (val.length === 5 && isValidUSZip(val)) {
      setZipLocation("Looking up location...");
      const loc = await fetchZipLocation(val);
      if (loc) {
        setZipLocation(loc);
      } else {
        setZipLocation("");
        setZipError("Zip code not found");
      }
    } else if (val.length === 5) {
      setZipLocation("");
      setZipError("Invalid US zip code");
    }
  };

  // Phone number formatting
  const formatPhone = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 10);
    if (digits.length < 4) return digits;
    if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -24, scale: 0.98 }}
          transition={{ ...spring, duration: 0.35 }}
          className="glassmorphic-card"
        >

          <h2 className="font-lora text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-900 mb-6 sm:mb-8">
            {question.title}
          </h2>
          {question.p && (
            <p
              className="text-center text-black mb-4 sm:mb-6"
            >
              {question.p}
            </p>
          )}
          {/* Render options if present */}
          {Array.isArray(question.options) && (
            <div
              className={
                question.id === "needFunding"
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                  : "space-y-3 sm:space-y-4"
              }
            >
              {question.id === "needFunding"
                ? question.options.map((option, idx) => {
                  const isLast =
                    idx === question.options.length - 1 &&
                    question.options.length % 2 === 1;
                  return (
                    <motion.button
                      key={option}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      onClick={() => onSelect(option)}
                      className={`w-full py-3 sm:py-4 px-4 sm:px-6 border rounded-lg text-base sm:text-lg transition-all
                          ${selected === option
                          ? "border-gray-100 bg-gray-100/5 text-Yellow-500 font-semibold"
                          : "border-gray-300 text-White hover:text-white hover:border-Orange-100 hover:bg-orange-400/10"
                        }
                          ${isLast ? "sm:col-span-2" : ""}
                        `}
                    >
                      {option}
                    </motion.button>
                  );
                })
                : question.options.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    onClick={() => onSelect(option)}
                    className={`w-full py-3 sm:py-4 px-4 sm:px-6 border rounded-lg text-base sm:text-lg transition-all
                        ${selected === option
                        ? "border-gray-100 bg-gray-100/5 text-Yellow-500 font-semibold"
                        : "border-gray-300 text-White hover:text-white hover:border-Orange-100 hover:bg-orange-400/10"
                      }`}
                  >
                    {option}
                  </motion.button>
                ))}
            </div>
          )}
          {/* Render input if inputType is present */}
          {question.inputType === "fullName" ? (
            <form
              className="mt-5 flex flex-col items-center"
              onSubmit={(e) => {
                e.preventDefault();
                const first = e.target.elements.firstName.value.trim();
                const last = e.target.elements.lastName.value.trim();
                if (!first || !last) {
                  setFieldError("First and last name are required.");
                  return;
                }
                setFieldError("");
                onSelect({ firstName: first, lastName: last });
              }}
            >
              <div className="flex flex-col gap-3 sm:gap-4 w-full mb-2">
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  autoComplete="given-name"
                  className="GlossyInputField"
                  required
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  autoComplete="family-name"
                  className="GlossyInputField"
                  required
                />
              </div>
              {fieldError && (
                <div className="w-full text-left text-red-500 text-sm mb-2">
                  {fieldError}
                </div>
              )}
              <button
                type="submit"
                className="PrimaryColorChangeBtn"
              >
                Next
              </button>
            </form>
          ) : question.id === "ZipCode" ? (
            <form
              className="mt-5 flex flex-col items-center"
              onSubmit={(e) => {
                e.preventDefault();
                if (!isValidUSZip(zipInput) || !zipLocation) {
                  setFieldError("Please enter a valid US zip code.");
                  return;
                }
                setFieldError("");
                onSelect(zipInput);
              }}
            >
              <input
                name="input"
                type="text"
                inputMode="numeric"
                pattern="\d{5}"
                placeholder={question.placeholder || ""}
                className="w-full GlossyInputField"
                required
                value={zipInput}
                onChange={handleZipChange}
                maxLength={5}
              />
              <div className="w-full min-h-[1.5em] text-sm text-left px-1">
                {zipInput.length === 5 &&
                  (zipLocation ? (
                    <span className="text-stone-200">{zipLocation}</span>
                  ) : zipError ? (
                    <span className="text-red-500">{zipError}</span>
                  ) : null)}
              </div>
              {fieldError && (
                <div className="w-full text-left text-red-500 text-sm mb-2">
                  {fieldError}
                </div>
              )}
              {question.nextButton && (
                <button
                  type="submit"
                  className="PrimaryColorChangeBtn mt-2"
                  disabled={!isValidUSZip(zipInput) || !zipLocation}
                >
                  Next
                </button>
              )}
            </form>
          ) : question.id === "phoneNumber" ? (
            <form
              className="mt-5 flex flex-col items-center"
              onSubmit={(e) => {
                e.preventDefault();
                const val = e.target.elements.input.value;
                if (!isValidUSPhone(val)) {
                  setFieldError(
                    "Please enter a valid US phone number. Format: (212) 555-1234"
                  );
                  return;
                }
                setFieldError("");
                onSelect(val);
              }}
            >
              <input
                name="input"
                type="tel"
                placeholder="(212) 555-1234"
                className="w-full mb-3 GlossyInputField"
                required
                value={phoneInput}
                onChange={(e) => setPhoneInput(formatPhone(e.target.value))}
                maxLength={14}
              />
              {fieldError && (
                <div className="w-full text-left text-red-500 text-sm mb-2">
                  {fieldError}
                </div>
              )}
              {question.nextButton && (
                <button
                  type="submit"
                  className="PrimaryColorChangeBtn"
                >
                  Next
                </button>
              )}
            </form>
          ) : question.id === "annualRevenue" ? (
            <form
              className="mt-5 flex flex-col items-center"
              onSubmit={(e) => {
                e.preventDefault();
                const val = e.target.elements.input.value.replace(/,/g, "");
                if (!val || isNaN(val) || Number(val) <= 0) {
                  setFieldError("Please enter a valid annual revenue.");
                  return;
                }
                setFieldError("");
                onSelect(val);
              }}
            >
              <div className="relative w-full mb-2">
                {/* <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-700 text-lg font-bold pointer-events-none">
                  $
                </span> */}
                <input
                  name="input"
                  type="number"
                  inputMode="numeric"
                  placeholder="$500,000"
                  className="pl-8 GlossyInputField"
                  required
                  min={1}
                  step="any"
                />
              </div>
              {fieldError && (
                <div className="w-full text-left text-red-500 text-sm mb-2">
                  {fieldError}
                </div>
              )}
              {question.nextButton && (
                <button
                  type="submit"
                  className="PrimaryColorChangeBtn"
                >
                  Next
                </button>
              )}
            </form>
          ) : question.inputType ? (
            <form
              className="mt-5 flex flex-col items-center"
              onSubmit={(e) => {
                e.preventDefault();
                const value = e.target.elements.input.value;
                if (!value) {
                  setFieldError("This field is required.");
                  return;
                }
                setFieldError("");
                onSelect(value);
              }}
            >
              <input
                name="input"
                type={question.inputType}
                placeholder={question.placeholder || ""}
                className="w-full mb-3 GlossyInputField"
                required
              />
              {fieldError && (
                <div className="w-full text-left text-red-500 text-sm mb-2">
                  {fieldError}
                </div>
              )}

              {question.nextButton && (
                <button
                  type="submit"
                  className="PrimaryColorChangeBtn"
                >
                  Next
                </button>
              )}
            </form>
          ) : null}
          {/* Bottom Back Button */}
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="pt-10 flex flex-row w-full justify-center"
          >
            <BackIcon />
          </button>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
