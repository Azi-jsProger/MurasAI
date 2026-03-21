"use client";

import { Bot, FileText, CalendarDays } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import FadeText from "@/components/FadeText";

export default function Dashboard() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/auth/me", {
          credentials: "include",
        });

        const text = await res.text();

        if (text === "Not logged in") {
          router.push("/login");
        }
      } catch (error) {
        console.error("API error:", error);
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 mt-10 sm:mt-0">
      {/* Header */}
      <div>
        {isLoaded ? (
          <>
            <AnimatedText
              text={t.welcome + " 🚀"}
              className="text-2xl sm:text-3xl font-bold"
            />

          <FadeText text={t.helperText} />
          </>
        ) : (
          <>
            <Skeleton width="w-3/4" height="h-8" className="mb-2" />
            <Skeleton width="w-1/2" height="h-4" />
          </>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {isLoaded ? (
          <>
            <StatCard
              title={t.avgScore}
              value={<AnimatedNumber end={82} suffix="%" />}
              color="from-indigo-500 to-purple-600"
              delay={0.1}
            />
            <StatCard
              title={t.aiRating}
              value={t.advanced}
              color="from-emerald-500 to-teal-600"
              delay={0.12}
            />
            <StatCard
              title={t.testsCompleted}
              value={<AnimatedNumber end={24} />}
              color="from-orange-500 to-pink-500"
              delay={0.121}
            />
            <StatCard
              title={t.learningHours}
              value={<AnimatedNumber end={12} suffix={` ${t.hour}`} />}
              color="from-blue-500 to-cyan-500"
              delay={0.1221}
            />
          </>
        ) : (
          Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                width="w-full"
                height="h-20"
                className="rounded-2xl"
              />
            ))
        )}
      </div>

      {/* Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {isLoaded ? (
          <>
            <Link href="/chat">
              <ModuleCard
                icon={Bot}
                color="text-indigo-500"
                title={t.aiAssistant}
                description={t.aiAssistantDesc}
              />
            </Link>

            <Link href="/tests">
              <ModuleCard
                icon={FileText}
                color="text-emerald-500"
                title={t.testGenerator}
                description={t.testGeneratorDesc}
              />
            </Link>

            <Link href="/plan">
              <ModuleCard
                icon={CalendarDays}
                color="text-orange-500"
                title={t.studyPlanner}
                description={t.studyPlannerDesc}
              />
            </Link>
          </>
        ) : (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                width="w-full"
                height="h-40"
                className="rounded-2xl"
              />
            ))
        )}
      </div>
    </div>
  );
}

/* 🔢 Animated Number */
function AnimatedNumber({
  end,
  suffix = "",
}: {
  end: number;
  suffix?: string;
}) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <span ref={ref}>
      {inView && (
        <motion.span
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.4, delay: 2 }}
        >
          <CountUp
            start={0}
            end={end}
            duration={2}
            suffix={suffix}
            separator=" "
          />
        </motion.span>
      )}
    </span>
  );
}

/* 💥 Stat Card */
function StatCard({ title, value, color, delay = 0 }: any) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.95,
        filter: "blur(6px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{ duration: 0.125, delay }}
      whileHover={{
        scale: 1.05,
        y: -3,
      }}
      className={`bg-gradient-to-r ${color} text-white p-4 sm:p-6 rounded-2xl shadow-lg cursor-pointer`}
    >
      <p className="text-xs sm:text-sm opacity-80">{title}</p>
      <p className="text-[18px] sm:text-2xl font-semibold">{value}</p>
    </motion.div>
  );
}

/* 🧩 Module Card */
function ModuleCard({ icon: Icon, color, title, description }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.125 }}
      className="bg-white h-[25vh] sm:h-[30vh] dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl cursor-pointer group"
    >
      <Icon
        className={`w-8 h-8 sm:w-10 sm:h-10 ${color} mb-3 sm:mb-4 group-hover:scale-110 transition`}
      />
      <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
        {description}
      </p>
    </motion.div>
  );
}
