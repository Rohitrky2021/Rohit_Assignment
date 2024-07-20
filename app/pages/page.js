"use client";

import { useRouter } from "next/navigation";
import LineChart from "../../components/LineChart";

export default function Home() {
  const router = useRouter();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <LineChart />

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Navigate to Pages:</h2>
        <button
          type="button"
          className="text-blue-600 hover:underline mr-4"
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </button>
        <button
          type="button"
          className="text-blue-600 hover:underline"
          onClick={() => router.push("/about")}
        >
          About Bitcoin
        </button>
      </div>
    </main>
  );
}
