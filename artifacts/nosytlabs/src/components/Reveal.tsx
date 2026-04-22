import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  className?: string;
  once?: boolean;
};

export default function Reveal({
  children,
  delay = 0,
  y = 30,
  x = 0,
  duration = 0.9,
  className,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  const variants: Variants = {
    hidden: { opacity: 0, y, x, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        delay,
        ease: [0.2, 0.7, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
