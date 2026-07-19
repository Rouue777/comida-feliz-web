"use client";

import { useEffect } from "react";
import { getDashboardSummary } from "@/services/dashboard.service";

export default function Home() {
  useEffect(() => {
    async function load() {
      try {
        const data = await getDashboardSummary();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    load();
  }, []);

  return <h1>Comida Feliz</h1>;
}