"use client";

import { useContext } from "react";
import { LanguageContext, type LanguageContextValue } from "@/components/LanguageProvider";

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
