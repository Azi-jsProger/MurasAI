"use client";
import { createContext, useState, useContext, ReactNode, useEffect } from "react";

type Language = "en" | "ru" | "kg";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "ru",
  setLanguage: () => {},
  isLoaded: false,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("ru");
  const [isLoaded, setIsLoaded] = useState(false);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as Language | null;
      if (savedLang && ["en", "ru", "kg"].includes(savedLang)) {
        setLanguageState(savedLang);
      }
    }
    setIsLoaded(true);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);