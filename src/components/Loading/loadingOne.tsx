"use client";

import React from "react";

export default function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="dot animation-delay-0"></span>
      <span className="dot animation-delay-200"></span>
      <span className="dot animation-delay-400"></span>

      <style jsx>{`
        .dot {
          width: 10px;
          height: 10px;
          background-color: #555;
          border-radius: 50%;
          display: inline-block;
          animation: pulse 1.2s infinite ease-in-out;
        }

        @keyframes pulse {
          0%,
          80%,
          100% {
            transform: scale(0.6);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        .animation-delay-0 {
          animation-delay: 0ms;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
}
