import { redirect } from "next/navigation";
import { getKitchenQueue } from "@/services/dashboard.service";

export default function Home() {
  redirect("/dashboard");
}