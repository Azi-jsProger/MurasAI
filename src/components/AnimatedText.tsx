"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function AnimatedText({
  text,
  className = "",
  delay = 400,
}: AnimatedTextProps) {
  return (
    <motion.div
      key={text} // 🔥 важно для смены языка
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <TypeAnimation
        key={text} // 🔥 фикс бага языка
        sequence={["", delay, text]}
        speed={50}
        cursor={true}
        repeat={0}
        className={className}
      />
    </motion.div>
  );
}