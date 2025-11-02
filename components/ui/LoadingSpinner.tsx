"use client";

import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: "w-6 h-6 border-2",
  md: "w-12 h-12 border-3",
  lg: "w-16 h-16 border-4",
  xl: "w-24 h-24 border-4",
};

export default function LoadingSpinner({
  size = "md",
  className = "",
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const spinner = (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div
        className="relative"
        style={{
          width: sizeClasses[size].split(" ")[0].replace("w-", ""),
          height: sizeClasses[size].split(" ")[1].replace("h-", ""),
        }}
      >
        {/* Outer rotating ring */}
        <div
          className={`${sizeClasses[size]} absolute inset-0 border-transparent border-t-brand-btn rounded-full animate-spin`}
        ></div>
        {/* Inner pulsing circle */}
        <div className="absolute inset-2 bg-brand-btn rounded-full animate-pulse opacity-20"></div>
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`${size === "sm" ? "w-1.5 h-1.5" : size === "md" ? "w-2 h-2" : size === "lg" ? "w-3 h-3" : "w-4 h-4"} bg-brand-btn rounded-full`}
          ></div>
        </div>
      </div>
      {text && (
        <p className="text-brand-primary-3 dark:text-white font-semibold text-lg animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-light dark:bg-brand-dark">
        <div className="flex items-center justify-center w-full h-full">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
}
