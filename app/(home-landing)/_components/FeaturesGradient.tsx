import { howItWorks } from "@/lib/data";
import React from "react";
import { useId } from "react";

const predefinedPatterns = [
  [
    [7, 1], [8, 2], [9, 3], [8, 4], [7, 5]
  ],
  [
    [8, 1], [9, 2], [7, 3], [9, 4], [8, 5]
  ],
  [
    [9, 1], [7, 2], [8, 3], [7, 4], [9, 5]
  ],
  [
    [7, 1], [9, 2], [8, 3], [9, 4], [7, 5]
  ]
];

export function FeaturesGradient() {
  return (
    <div className="py-10 lg:py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 max-w-7xl mx-auto">
        {howItWorks.map((feature, index) => (
          <div
            key={feature.title}
            className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden"
          >
            <Grid size={20} pattern={predefinedPatterns[index]} />
            <p className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
              {feature.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Grid = ({
  pattern,
  size,
}: {
  pattern: number[][];
  size?: number;
}) => {
  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-primary/30 from-primary/30 to-prifrom-primary/30 dark:to-prifrom-primary/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={pattern}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-primary/10 dark:stroke-primary/10 stroke-primary/10 fill-primary"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any, index: number) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}-${index}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
