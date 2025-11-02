"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { VotesHistoryResponse } from "@/lib/types/vote";
import { useTranslation } from "@/contexts/LanguageContext";

export const description = "An area chart with gradient fill and time filters";

type TimeFilter = "7days" | "30days" | "alltime";

interface ChartAreaGradientProps {
  data?: VotesHistoryResponse;
  isLoading?: boolean;
}

export function ChartAreaGradient({ data, isLoading }: ChartAreaGradientProps) {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("7days");

  const chartConfig = {
    votes: {
      label: t("chart_votes"),
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const getChartData = () => {
    const chartDataWithFormattedDates = data?.data.chart_data.map((item) => ({
      date: new Date(item.date).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      votes: item.votes,
    }));

    const today = new Date();
    let startDate: Date;

    switch (activeFilter) {
      case "7days":
        startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30days":
        startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "alltime":
        return chartDataWithFormattedDates;
      default:
        startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    return chartDataWithFormattedDates?.filter((item) => {
      const itemDate = new Date(item.date.split(".").reverse().join("-"));
      return itemDate >= startDate && itemDate <= today;
    });
  };

  const getFilterLabel = (filter: TimeFilter) => {
    switch (filter) {
      case "7days":
        return t("chart_7_days");
      case "30days":
        return t("chart_30_days");
      case "alltime":
        return t("chart_all_time");
      default:
        return t("chart_7_days");
    }
  };

  if (isLoading) {
    return (
      <div className="py-6 px-3 lg:px-7">
        <div className="flex justify-center items-center h-64">
          <div className="text-brand-primary-3 dark:text-white">
            {t("chart_loading")}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 px-3 lg:px-7">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-6">
        <h3 className="font-extrabold text-brand-primary-3 dark:text-white">
          {t("chart_statistics_title")}
        </h3>
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
                fontWeight: 600,
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
                fontWeight: 600,
              }}
              domain={[0, "dataMax + 100"]}
              className="text-brand-primary-3 dark:text-[#444958]"
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent className="bg-white dark:bg-gray-800 border-none font-medium text-gray-900 dark:text-gray-100" />
              }
            />
            <defs>
              <linearGradient id="fillVotes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#f99d81" stopOpacity={0.8} />
                <stop offset="85%" stopColor="#ff6b35" stopOpacity={0} />
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
              activeDot={{
                r: 6,
                fill: "#fff",
                stroke: "#ff6b35",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
