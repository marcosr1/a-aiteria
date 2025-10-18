"use client";

import { useEffect } from "react";

export default function BlockDevTools() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.key === "U") ||
        (e.ctrlKey && e.shiftKey && e.key === "J")
      ) {
        e.preventDefault();
        alert("Acesso restrito 🚫");
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return null;
}
