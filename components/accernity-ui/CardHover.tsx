import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    credits: number;
    price: number;
    highlighted?: boolean;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10 w-full",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={`${item.title}-${item.link}`}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'rgb(229 231 235)',
                  borderRadius: '1.5rem',
                  display: 'block'
                }}
              >
                <div className="absolute inset-0 w-full h-full dark:bg-slate-800/[0.8]" />
              </motion.div>
            )}
          </AnimatePresence>
          <Card className="group">
            <CardTitle className="flex flex-col gap-2">
              <span className="text-xl group-hover:text-primary">
                {item.title}
              </span>
              <span className="font-thin">{item.credits} credits</span>
            </CardTitle>
            <CardDescription>
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-semibold group-hover:text-primary text-white">
                  ${item.price}
                </span>
                <span className="">{item.description}</span>
                <div className="text-white bg-primary px-10 py-2 rounded-md text-center">
                  Buy Now
                </div>
              </div>
            </CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <span
      className={cn(
        "block text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </span>
  );
};
