"use client";

import { useState, useEffect, useRef } from "react";

export function useTypewriter(
  dishes: string[],
  active: boolean,
  onFirstComplete?: () => void
) {
  const [text, setText] = useState("");
  const state = useRef({
    idx: 0,
    charIdx: 0,
    deleting: false,
    pause: 0,
    firstDone: false,
  });

  useEffect(() => {
    if (!active) return;
    const s = state.current;
    s.idx = 0;
    s.charIdx = 0;
    s.deleting = false;
    s.pause = 0;
    s.firstDone = false;
    setText("");

    const id = setInterval(() => {
      const word = dishes[s.idx];
      if (s.pause > 0) {
        s.pause--;
        return;
      }
      if (!s.deleting) {
        s.charIdx++;
        setText(word.substring(0, s.charIdx));
        if (s.charIdx === word.length) {
          s.deleting = true;
          s.pause = 15;
          if (!s.firstDone) {
            s.firstDone = true;
            onFirstComplete?.();
          }
        }
      } else {
        s.charIdx--;
        setText(word.substring(0, s.charIdx));
        if (s.charIdx === 0) {
          s.deleting = false;
          s.idx = (s.idx + 1) % dishes.length;
        }
      }
    }, s.deleting ? 60 : 120 + Math.random() * 80);

    return () => clearInterval(id);
  }, [dishes, active, onFirstComplete]);

  return text;
}
