"use client";
import React, { useState } from "react";
import {
  InformationCircleIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  PhotoIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface PropertyStepperProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const PropertyStepper: React.FC<PropertyStepperProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const steps = [
    { label: "مشخصات اولیه", icon: InformationCircleIcon },
    { label: "آدرس", icon: MapPinIcon },
    { label: "امکانات", icon: BuildingOffice2Icon },
    { label: "تصاویر ملک", icon: PhotoIcon },
    { label: "تایید نهایی", icon: CheckCircleIcon },
  ];

  return (
    <div className="w-full hidden lg:flex  justify-center items-center bg-gray-200 dark:bg-gray-800 py-4 rounded-[30px] mt-5 transition-colors">
      <div className="flex items-center justify-between w-[90%]">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;

          return (
            <div key={index} className="flex items-center">
              <button
                onClick={() => setActiveStep(index)}
                className={`relative flex items-center text-sm font-medium transition-all
              ${
                isActive
                  ? "text-gray-900 dark:text-white font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }
            `}
              >
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full border-[2px] transition-all
                ${
                  isCompleted
                    ? "border-green-500 bg-green-500"
                    : isActive
                    ? "border-gray-900 dark:border-white"
                    : "border-gray-500 dark:border-gray-500"
                }
              `}
                >
                  {isCompleted ? (
                    <CheckCircleIcon className="w-4 h-4 text-white" />
                  ) : (
                    <step.icon
                      className={`w-4 h-4 ${
                        isActive
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    />
                  )}
                </div>

                <span
                  className={`ml-2 ${
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {step.label}
                </span>
              </button>

              {index !== steps.length - 1 && (
                <div
                  className={`mx-4 w-16 border-t-[2px] border-dashed transition-all
                ${
                  index < activeStep
                    ? "border-green-500"
                    : "border-gray-500 dark:border-gray-600"
                }
              `}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PropertyStepper;
