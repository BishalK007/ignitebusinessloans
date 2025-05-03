"use client";
import * as React from "react";
const Logo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={200} 
    height={200} 
    viewBox="0 0 600 600"
    {...props}
  >
    <defs>
      <linearGradient
        id="gradient-0"
        x1={108.025}
        x2={108.025}
        y1={27.056}
        y2={288.318}
        gradientTransform="matrix(.99994 .01087 -.0117 1.07508 -2.591 -9.941)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} style={{ stopColor: "#c9451d" }} />
        <stop offset={1} style={{ stopColor: "#bd3613" }} />
      </linearGradient>
      <linearGradient
        id="gradient-1"
        x1={149.942}
        x2={149.942}
        y1={114.908}
        y2={287.979}
        gradientTransform="matrix(.86768 .49713 -.50501 .88146 123.625 -59.889)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} style={{ stopColor: "#d7551e" }} />
        <stop offset={1} style={{ stopColor: "#c58d41" }} />
      </linearGradient>
      {/* Removed <style bx:fonts=...> */}
    </defs>
    <path
      d="M173.493 114.407c9.464 2.529 27.247 47.647 12.137 90.328-2.349 6.636-13.032 46.395-58.752 83.244-11.383-4.818-18.087-22.234-19.374-41.875-1.906-29.084 45.269-76.126 46.049-77.475 20.746-18.08 19.567-52.609 19.94-54.222Z"
      style={{
        pointerEvents: "none",
        fill: "url(#gradient-1)",
      }}
    />
    <path
      d="M52.617 199.205c1.724 30.853 66.742 92.804 73.973 88.94-22.066-15.774-22.634-78.33-16.92-88.395 24.76-59.768 39.481-42.812 51.51-95.351 12.029-52.539-21.56-77.343-21.363-77.343 0 0-3.661 34.972-44.675 75.688-41.014 40.716-44.249 65.608-42.525 96.461Z"
      style={{
        paintOrder: "fill",
        pointerEvents: "none",
        fill: "url(#gradient-0)",
      }}
    />
    <text
      x={65.252}
      y={403.288}
      style={{
        fill: "#ede4d3",
        fontFamily: "Barlow Semi Condensed, sans-serif",
        fontSize: "140.7px",
        fontWeight: 700,
        textTransform: "capitalize",
        whiteSpace: "pre",
      }}
    >
      {"IGNITE"}
    </text>
    <text
      x={68.625}
      y={461.349}
      style={{
        fill: "#ede4d3",
        fontFamily: "Barlow Semi Condensed, sans-serif",
        fontSize: "53.9px",
        fontWeight: 500,
        whiteSpace: "pre",
      }}
    >
      {"BUSINESS LOANS"}
    </text>
  </svg>
);
export default Logo;