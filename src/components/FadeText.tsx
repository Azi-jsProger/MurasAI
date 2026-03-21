import { motion } from "framer-motion";

export default function FadeText({
  text,
  delay = 0.5,
}: {
  text: string;
  delay?: number;
}) {
  return (
    <motion.p
      key={text}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="text-gray-500 mt-2 text-sm sm:text-base"
    >
      {text}
    </motion.p>
  );
}