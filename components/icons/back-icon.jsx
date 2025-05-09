"use client"
import * as React from "react"
const BackIcon = ({ className = "", ...props }) => (
  <span className={`inline-block ${className} hover:scale-110 transition-transform`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width="60px"
      height="60px"
      viewBox="0 0 219.151 219.151"
      className="transition-colors text-Orange hover:bg-Orange rounded-full group"
      {...props}
    >
      <path
        d="M109.576 219.151c60.419 0 109.573-49.156 109.573-109.576C219.149 49.156 169.995 0 109.576 0S.002 49.156.002 109.575c0 60.42 49.155 109.576 109.574 109.576zm0-204.151c52.148 0 94.573 42.426 94.574 94.575 0 52.149-42.425 94.575-94.574 94.576-52.148-.001-94.573-42.427-94.573-94.577C15.003 57.427 57.428 15 109.576 15z"
        fill="currentColor"
      />
      <path
        d="M94.861 156.507a7.502 7.502 0 0 0 10.606 0 7.499 7.499 0 0 0-.001-10.608l-28.82-28.819 83.457-.008a7.5 7.5 0 0 0-.001-15l-83.46.008 28.827-28.825a7.5 7.5 0 0 0-10.607-10.608l-41.629 41.628a7.495 7.495 0 0 0-2.197 5.303 7.51 7.51 0 0 0 2.198 5.305l41.627 41.624z"
        fill="currentColor"
        className="transition-colors group-hover:fill-white"
      />
    </svg>
  </span>
)
export default BackIcon