// "use client"
// import * as React from "react"
// const Logo = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 600 600" {...props}>
//     <path
//       d="M281.446 231.443c9.45-20.094-2.242-35.894-30.882-62.964-24.092-22.846-29.964-46.206-17.616-70.078-17.594 11.337-26.745 28.33-27.452 50.976-.339 10.842 2.448 21.69 8.36 32.544a188.16 188.16 0 0 0 17.409 27.029c3.774 4.886 6.806 10.117 9.098 15.697 3.278 7.984 2.73 14.021-1.645 18.112-7.314 6.839-15.09 9.541-23.325 8.103-29.945-5.229-49.879-22.001-59.802-50.316-14.454-41.244 3.469-64.754 3.972-63.319 3.564 25.342 12.343 41.964 27.849 49.389a112.075 112.075 0 0 0-5.146-12.789c-10.118-21.184-6.756-46.088 10.087-74.715 25.768-29.452 39.205-48.366 32.331-69.937 26.896 13.026 40.11 39.233 39.64 78.62 4.974-12.437 16.213-21.524 33.715-27.264 0 0-5.604 26.054 15.632 66.989 17.364 33.47 12.317 58.753.946 74.341-15.111 20.714-34.471 31.691-69.455 33.614-11.464.632 37.119-14.682.32-58.965-8.899-10.709 21.493-.603 35.964 34.933Z"
//       style={{
//         stroke: "#000",
//         fill: "#1a1f7b",
//         transformOrigin: "237.396px 142.411px",
//       }}
//     />
//     <path
//       d="m195.904 273.262 3.424 2.906c14.199-2.909 24.848 17.647 23.713 52.79-1.539 47.653-1.012 96.34-3.745 144.006-1.025 17.873 16.222 4.889 55.238 3.299 15.021-.612-30.367-37.341-6.331-181.969 1.482-8.916.352-15.19 15.214-22.445 26.182-12.781-2.989-12.31-87.513 1.413Z"
//       style={{
//         stroke: "#000",
//         fill: "#1a1f7b",
//       }}
//     />
//   </svg>
// )
// export default Logo


"use client";
import * as React from "react";
const Logo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={60} 
    height={60} 
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