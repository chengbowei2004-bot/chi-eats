"use client";

import { useState, useEffect, useCallback } from "react";

export type City = "providence" | "boston";

const STORAGE_KEY = "chieats_city";

const CITY_LABELS: Record<City, { zh: string; en: string }> = {
  providence: { zh: "Providence", en: "Providence" },
  boston: { zh: "Boston", en: "Boston" },
};

export function useCity() {
  const [city, setCityState] = useState<City>("providence");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as City | null;
    if (stored === "providence" || stored === "boston") {
      setCityState(stored);
    }
  }, []);

  const setCity = useCallback((c: City) => {
    setCityState(c);
    localStorage.setItem(STORAGE_KEY, c);
  }, []);

  const cityLabel = CITY_LABELS[city];

  return { city, setCity, cityLabel, allCities: CITY_LABELS };
}
