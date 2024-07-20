import Link from "next/link";
import LineChart from "./components/LineChart";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <LineChart />

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Navigate to Pages:</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard">
              <a className="text-blue-600 hover:underline">Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className="text-blue-600 hover:underline">About Bitcoin</a>
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
    </main>
  );
}
