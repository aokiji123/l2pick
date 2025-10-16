"use client"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export const description = "An area chart with gradient fill and time filters"

// Sample data for 2025 with daily entries
const chartData = [
  { date: "01.01.2025", votes: 10 },
  { date: "02.01.2025", votes: 25 },
  { date: "03.01.2025", votes: 40 },
  { date: "04.01.2025", votes: 60 },
  { date: "05.01.2025", votes: 100 },
  { date: "06.01.2025", votes: 200 },
  { date: "07.01.2025", votes: 500 },
  { date: "08.01.2025", votes: 1253 },
  { date: "09.01.2025", votes: 800 },
  { date: "10.01.2025", votes: 600 },
  { date: "11.01.2025", votes: 400 },
  { date: "12.01.2025", votes: 300 },
  { date: "13.01.2025", votes: 250 },
  { date: "14.01.2025", votes: 180 },
  { date: "15.01.2025", votes: 220 },
  { date: "16.01.2025", votes: 280 },
  { date: "17.01.2025", votes: 350 },
  { date: "18.01.2025", votes: 450 },
  { date: "19.01.2025", votes: 600 },
  { date: "20.01.2025", votes: 800 },
  { date: "21.01.2025", votes: 650 },
  { date: "22.01.2025", votes: 500 },
  { date: "23.01.2025", votes: 400 },
  { date: "24.01.2025", votes: 350 },
  { date: "25.01.2025", votes: 300 },
  { date: "26.01.2025", votes: 250 },
  { date: "27.01.2025", votes: 200 },
  { date: "28.01.2025", votes: 180 },
  { date: "29.01.2025", votes: 150 },
  { date: "30.01.2025", votes: 120 },
  { date: "31.01.2025", votes: 100 },
  { date: "01.02.2025", votes: 80 },
  { date: "02.02.2025", votes: 60 },
  { date: "03.02.2025", votes: 500 },
  { date: "04.02.2025", votes: 400 },
  { date: "05.02.2025", votes: 300 },
  { date: "06.02.2025", votes: 250 },
  { date: "07.02.2025", votes: 200 },
  { date: "08.02.2025", votes: 150 },
  { date: "09.02.2025", votes: 100 },
  { date: "10.02.2025", votes: 800 },
  { date: "11.02.2025", votes: 500 },
  { date: "12.02.2025", votes: 300 },
  { date: "13.02.2025", votes: 200 },
  { date: "14.02.2025", votes: 100 },
  { date: "15.02.2025", votes: 250 },
  { date: "16.02.2025", votes: 50 },
  { date: "17.02.2025", votes: 120 },
  { date: "18.02.2025", votes: 25 },
  { date: "19.02.2025", votes: 45 },
  { date: "20.02.2025", votes: 80 },
  { date: "21.02.2025", votes: 120 },
  { date: "22.02.2025", votes: 580 },
  { date: "23.02.2025", votes: 250 },
  { date: "24.02.2025", votes: 820 },
  { date: "25.02.2025", votes: 400 },
  { date: "26.02.2025", votes: 500 },
  { date: "27.02.2025", votes: 750 },
  { date: "28.02.2025", votes: 800 },
]

const chartConfig = {
  votes: {
    label: "Голоса",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type TimeFilter = "7days" | "30days" | "alltime"

export function ChartAreaGradient() {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("7days")

  const getChartData = () => {
    const today = new Date("2025-02-28") // End date for our data (last date in chartData)
    let startDate: Date
    
    switch (activeFilter) {
      case "7days":
        startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case "30days":
        startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case "alltime":
        return chartData
      default:
        startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    }
    
    return chartData.filter(item => {
      const itemDate = new Date(item.date.split('.').reverse().join('-'))
      return itemDate >= startDate && itemDate <= today
    })
  }

  const getFilterLabel = (filter: TimeFilter) => {
    switch (filter) {
      case "7days":
        return "7 дней"
      case "30days":
        return "30 дней"
      case "alltime":
        return "Всё время"
      default:
        return "7 дней"
    }
  }

  return (
    <div className="py-6 px-3 lg:px-7">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-6">
        <h3 className="font-extrabold text-brand-primary-3 dark:text-white">Статистика голосов</h3>
        <div className="flex gap-2">
          {(["7days", "30days", "alltime"] as TimeFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-xs leading-3 font-bold rounded-lg h-6 px-3 cursor-pointer ${activeFilter === filter ? "bg-brand-gray-2 dark:bg-brand-primary-4 text-brand-btn" : "bg-transparent dark:text-white"}`}
            >
              {getFilterLabel(filter)}
            </button>
          ))}
        </div>
      </div>
      
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={getChartData()}
            margin={{
              left: 0,
              right: 20,
              top: 20,
              bottom: 17,
            }}
          >
            <CartesianGrid  
              stroke="var(--chart-grid-color)"
              className="stroke-[#edeff2] dark:stroke-gray-700"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ 
                fontSize: 12, 
                fontWeight: 600 
              }}
              className="text-brand-primary-3 dark:text-[#444958]"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={25}
              tickCount={7}
              tick={{ 
                fontSize: 12, 
                fontWeight: 600 
              }}
              domain={[0, 'dataMax + 100']}
              className="text-brand-primary-3 dark:text-[#444958]"
            />
            <ChartTooltip 
              cursor={false} 
              content={<ChartTooltipContent className="bg-white dark:bg-gray-800 border-none font-medium text-gray-900 dark:text-gray-100" />}
            />
            <defs>
              <linearGradient id="fillVotes" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="10%"
                  stopColor="#f99d81"
                  stopOpacity={0.8}
                />
                <stop
                  offset="85%"
                  stopColor="#ff6b35"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="votes"
              type="monotone"
              fill="url(#fillVotes)"
              fillOpacity={0.6}
              stroke="#ff6b35"
              strokeWidth={2}
              dot={{ fill: "#ff6b35", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#fff", stroke: "#ff6b35", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}