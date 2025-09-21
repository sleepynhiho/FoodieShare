"use client";

import { useEffect, useState } from "react";

interface LoadingSpinnerProps {
  loading: boolean;
}

export const LoadingSpinner = ({ loading }: LoadingSpinnerProps) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      return;
    }

    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(intervalId);
          return prev;
        }
        return prev + 20;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [loading]);

  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 bg-white/30 backdrop-blur-sm flex flex-col items-center justify-center !m-0 !p-0"
      style={{ zIndex: 50 }}
    >
      <img
        src="/loading-spinner.gif"
        alt="Loading..."
        className="w-1/5 object-contain"
      />
      <div className="w-[28%] rounded-full border-2 border-orange-300 bg-transparent p-1 mt-8">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-bg-secondary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <span className="text-sm font-medium mt-1">{progress} %</span>
    </div>
  );
};
