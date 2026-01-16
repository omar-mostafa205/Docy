"use client"
import React, { useState, useEffect } from 'react';

interface SequenceStep {
  id: number;
  from: number;
  to: number;
  label: string;
  dashed?: boolean;
}

interface SequenceDiagramProps {
  participants?: string[];
  steps?: SequenceStep[];
  animationSpeed?: number;
  autoPlay?: boolean;
  loop?: boolean;
}

const defaultParticipants = ['Client', 'Frontend', 'AWS'];

const defaultSteps: SequenceStep[] = [
  { id: 1, from: 0, to: 1, label: 'Upload File' },
  { id: 2, from: 1, to: 2, label: 'Upload File (with Progress)' },
  { id: 3, from: 2, to: 1, label: 'File URL', dashed: true },
  { id: 4, from: 1, to: 0, label: 'Success', dashed: true },
];

export default function AnimatedSequenceDiagram({
  participants = defaultParticipants,
  steps = defaultSteps,
  animationSpeed = 1200,
  autoPlay = true,
  loop = true,
}: SequenceDiagramProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [arrowProgress, setArrowProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    // Arrow animation
    const arrowTimer = setInterval(() => {
      setArrowProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 5;
      });
    }, 20);

    // Step progression
    const stepTimer = setTimeout(() => {
      setArrowProgress(0);
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          if (loop) {
            setTimeout(() => {
              setCurrentStep(-1);
            }, 1000);
          } else {
            setIsPlaying(false);
          }
          return prev;
        }
        return prev + 1;
      });
    }, animationSpeed);

    return () => {
      clearInterval(arrowTimer);
      clearTimeout(stepTimer);
    };
  }, [isPlaying, currentStep, animationSpeed, loop, steps.length]);

  const getColumnPosition = (index: number) => {
    const totalWidth = 100;
    const margin = 10;
    const usableWidth = totalWidth - margin * 2;
    const spacing = usableWidth / (participants.length - 1);
    return margin + index * spacing;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 bg-white rounded-2xl overflow-x-auto sm:overflow-x-visible">
      {/* Top Participant Boxes */}
      <div className="relative flex justify-between mb-0 min-w-[500px] sm:min-w-0">
        {participants.map((participant, index) => (
          <div
            key={`top-${index}`}
            className="px-3 py-2 sm:px-6 sm:py-3 bg-[#fff4f0] border-2 border-[#fa5028]/20 rounded-lg text-center max-w-[100px] sm:max-w-[140px] mx-1 sm:mx-2 flex-shrink-0"
          >
            <span className="font-medium text-gray-800 text-sm sm:text-base">{participant}</span>
          </div>
        ))}
      </div>

      {/* Lifelines and Messages Container */}
      <div className="relative min-w-[500px] sm:min-w-0" style={{ height: `${steps.length * 45 + 35}px` }}>
        {/* Lifelines */}
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          {participants.map((_, index) => (
            <line
              key={`lifeline-${index}`}
              x1={`${getColumnPosition(index)}%`}
              y1="0"
              x2={`${getColumnPosition(index)}%`}
              y2="100%"
              stroke="#d1d5db"
              strokeWidth="2"
            />
          ))}

          {/* Activation Boxes */}
          {steps.map((step, stepIndex) => {
            const isActive = stepIndex <= currentStep;
            const toX = getColumnPosition(step.to);
            
            // Show activation box on the receiving end
            if (isActive) {
              return (
                <rect
                  key={`activation-${stepIndex}`}
                  x={`${toX - 1}%`}
                  y={stepIndex * 45 + 12}
                  width="2%"
                  height="22"
                  fill="#fa5028"
                  opacity="0.2"
                  rx="2"
                />
              );
            }
            return null;
          })}

          {/* Arrows */}
          {steps.map((step, stepIndex) => {
            const isActive = stepIndex <= currentStep;
            const isCurrent = stepIndex === currentStep;
            const fromX = getColumnPosition(step.from);
            const toX = getColumnPosition(step.to);
            const y = stepIndex * 45 + 24;
            const direction = toX > fromX ? 1 : -1;
            const arrowOffset = direction * 2;

            // Calculate animated width
            const fullWidth = Math.abs(toX - fromX);
            const animatedWidth = isCurrent ? (fullWidth * arrowProgress) / 100 : fullWidth;
            const startX = fromX;
            const endX = fromX + direction * animatedWidth;

            if (!isActive && !isCurrent) return null;

            return (
              <g key={`arrow-${stepIndex}`}>
                {/* Arrow Line */}
                <line
                  x1={`${startX}%`}
                  y1={y}
                  x2={`${isCurrent ? endX : toX - arrowOffset}%`}
                  y2={y}
                  stroke="#fa5028"
                  strokeWidth="2"
                  strokeDasharray={step.dashed ? "8,4" : "none"}
                  className="transition-all duration-100"
                />

                {/* Arrow Head */}
                {(!isCurrent || arrowProgress >= 95) && (
                  <polygon
                    points={
                      direction > 0
                        ? `${toX - 1.5}%,${y - 6} ${toX}%,${y} ${toX - 1.5}%,${y + 6}`
                        : `${toX + 1.5}%,${y - 6} ${toX}%,${y} ${toX + 1.5}%,${y + 6}`
                    }
                    fill="#fa5028"
                    className={`transition-opacity duration-200 ${
                      isCurrent && arrowProgress < 95 ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                )}

                {/* Label */}
                <text
                  x={`${(fromX + toX) / 2}%`}
                  y={y - 12}
                  textAnchor="middle"
                  className={`text-xs sm:text-sm fill-gray-700 transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {step.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Participant Boxes */}
      <div className="relative flex justify-between mt-0 min-w-[500px] sm:min-w-0">
        {participants.map((participant, index) => (
          <div
            key={`bottom-${index}`}
            className="px-3 py-2 sm:px-6 sm:py-3 bg-[#fff4f0] border-2 border-[#fa5028]/20 rounded-lg text-center max-w-[100px] sm:max-w-[140px] mx-1 sm:mx-2 flex-shrink-0"
          >
            <span className="font-medium text-gray-800 text-sm sm:text-base">{participant}</span>
          </div>
        ))}
      </div>
    </div>
  );
}