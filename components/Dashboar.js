"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import Image from 'next/image';

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [coinData, setCoinData] = useState(null);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const watchlist = useSelector((state) => state.watchlist);
  const trendingCoins = useSelector((state) => state.trendingCoins);
  const dispatch = useDispatch();
  const coin = "bitcoin"; // This can be dynamically set based on user selection

  useEffect(() => {
    const fetchChartData = async () => {
      const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=usd&from=1721208694&to=1721295094`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const json = await response.json();
        const formattedData = json.prices.map((entry) => ({
          x: new Date(entry[0]),
          y: entry[1],
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    const fetchCoinData = async () => {
      const url = `https://api.coingecko.com/api/v3/coins/${coin}`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const json = await response.json();
        setCoinData(json);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchChartData();
    fetchCoinData();
  }, [coin]);

  useEffect(() => {
    if (chartRef && chartRef.current && chartData) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(255, 99, 132, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 99, 132, 0)');

      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: coinData?.name || "Coin",
              data: chartData,
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: gradient,
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          animation: {
            duration: 2000,
            easing: 'easeInOutBounce',
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "hour",
              },
              title: {
                display: true,
                text: "Time",
              },
            },
            y: {
              title: {
                display: true,
                text: "Price (USD)",
              },
            },
          },
        },
      });
    }
  }, [chartData, coinData]);

  const createList = (items) => {
    if (!items) {
      return <p>No data available</p>;
    }

    return items.map((item) => (
      <div key={item.name} className="flex justify-between p-2 bg-gray-100 rounded-lg shadow-sm">
        <div className="flex items-center">
          <Image src={item.image} alt={item.name} className="w-6 h-6 mr-2" width={100} height={100} />
          {item.name}
        </div>
        <span className="text-gray-600">{item.current_price}</span>
        <span className={`text-${item.ath_change_percentage > 0 ? "green" : "red"}-600`}>{item.ath}</span>
        <span className="text-gray-600">{item.marketCap}</span>
      </div>
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 fade-in">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">{coinData?.name || "Coin"}</h1>
              <p className="text-3xl font-semibold text-green-600">
                ${coinData?.market_data?.current_price?.usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "Loading..."} 
                <span className="text-green-500 text-lg">
                  ({coinData?.market_data?.price_change_percentage_24h.toFixed(2) || "0.00"}%)
                </span>
              </p>
            </div>
            <div className="text-right">
              <button className="bg-green-500 text-white p-2 rounded-full">+</button>
            </div>
          </div>
          <canvas ref={chartRef} className="line-chart" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-600">Watchlist</h2>
            <div id="watchlist" className="space-y-2">{createList(watchlist)}</div>
            <div className="text-right">
              <a href="#" className="text-blue-600">View more coins</a>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-600">Recently Viewed</h2>
            <div id="recentlyViewed" className="space-y-2">{createList(watchlist)}</div>
            <div className="text-right">
              <a href="#" className="text-blue-600">View more coins</a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg fade-in">
        <h2 className="text-xl font-bold mb-4 text-green-600">Trending Market</h2>
        <div className="container mx-auto p-4">
          <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2 px-4 text-left text-gray-700">Name</th>
                <th className="py-2 px-4 text-left text-gray-700">Symbol</th>
                <th className="py-2 px-4 text-left text-gray-700">Price (USD)</th>
                <th className="py-2 px-4 text-left text-gray-700">24h Change (%)</th>
              </tr>
            </thead>
            <tbody>
              {trendingCoins ? (
                trendingCoins.map((coin) => (
                  <tr key={coin.id} className="border-b border-gray-200">
                    <td className="py-2 px-4 flex flex-row">
                      <Image
                        src={coin.item.small}
                        alt={coin.item.name}
                        className="w-6 h-6 mr-2"
                        width={100}
                        height={100}
                      />
                      {coin.item.name}
                    </td>
                    <td className="py-2 px-4">{coin.item.symbol}</td>
                    <td className="py-2 px-4">
                      $
                      {coin.item.data.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className={`py-2 px-4 text-${coin.item.data.price_change_percentage_24h.usd > 0 ? 'green' : 'red'}-500`}>
                      {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
