"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function QuestionCard({ question, selected, onSelect }) {
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="bg-white rounded-xl shadow-lg p-10 w-full max-w-lg"
                >
                    <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
                        {question.title}
                    </h2>
                    {question.p && (
                        <p className="text-center text-gray-500 mb-6">{question.p}</p>
                    )}
                    {/* Render options if present */}
                    {Array.isArray(question.options) && (
                        <div className="space-y-4">
                            {question.options.map((option) => (
                                <motion.button
                                    key={option}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => onSelect(option)}
                                    className={`w-full py-4 px-6 border rounded-lg text-lg transition-all
                                        ${
                                            selected === option
                                                ? "border-blue-900 bg-blue-50 text-blue-900 font-semibold"
                                                : "border-gray-300 text-gray-700 hover:border-blue-300"
                                        }
                                    `}
                                >
                                    {option}
                                </motion.button>
                            ))}
                        </div>
                    )}
                    {/* Render input if inputType is present */}
                    {question.inputType && (
                        <form
                            className="mt-6 flex flex-col items-center"
                            onSubmit={e => {
                                e.preventDefault()
                                const value = e.target.elements.input.value
                                if (value) onSelect(value)
                            }}
                        >
                            <input
                                name="input"
                                type={question.inputType}
                                placeholder={question.placeholder || ""}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg mb-4 focus:outline-none focus:border-blue-900 text-blue-900 placeholder-gray-400"
                                required
                                pattern={question.validation === "usZipCode" ? "\\d{5}" : undefined}
                                min={question.validation === "positiveNumber" ? 1 : undefined}
                            />
                            {question.nextButton && (
                                <button
                                    type="submit"
                                    className="w-full py-3 px-6 bg-blue-900 text-white rounded-lg font-semibold text-lg hover:bg-blue-800 transition-all"
                                >
                                    Next
                                </button>
                            )}
                        </form>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}