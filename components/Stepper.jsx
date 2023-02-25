import React, { useState } from "react";
import ProgressIcon from "@/public/icons/ProgressIcon.svg";
import CompleteIcon from "@/public/icons/CompleteIcon.svg";

const Stepper = ({ steps, activeStep, setActiveStep }) => {
  const getProperStepIcon = (index) => {
    if (index < activeStep) {
      return (
        <div
          onClick={() => setActiveStep(index)}
          className="flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#303D47]"
        >
          <CompleteIcon />
        </div>
      );
    } else if (index === activeStep) {
      return (
        <div className="flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#534CDA]">
          <ProgressIcon />
        </div>
      );
    } else {
      return (
        <div className="w-[16px] h-[16px] rounded-full border-[3px] border-[#BFC4C8]" />
      );
    }
  };

  return (
    <div className="w-[100%] flex flex-col items-center">
      <div className={`flex items-center h-fit  absolute w-[150%] md:relative md:w-10/12 ${activeStep>2 ? "left-[30%] md:right-[22px] md:left-0" : "right-[22px] md:right-0"}`}>
        {steps.map((step, index) => (
          <>
            <div className="relative flex items-center justify-center cursor-pointer">
              {getProperStepIcon(index)}
              <span
                className={`absolute whitespace-nowrap mt-[5rem] ${
                  index < activeStep
                    ? "text-[#303D47]"
                    : index === activeStep
                    ? "text-[#534CDA]"
                    : "text-[#BFC4C8]"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <hr
                className={`h-[3px] flex-1 ${
                  index < activeStep
                    ? "bg-[#303D47]"
                    : index === activeStep
                    ? "bg-gradient-to-l from-[#534CDA] via-[#BFC4C8] to-[#BFC4C8]"
                    : "bg-[#BFC4C8]"
                }`}
              />
            )}
          </>
        ))}
      </div>
      <div className="w-[100%] mt-[6.5rem] md:mt-[6rem]">{steps[activeStep]?.content}</div>
    </div>
  );
};

export default Stepper;
