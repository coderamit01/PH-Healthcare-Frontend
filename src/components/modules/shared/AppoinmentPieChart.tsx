"use client";

import { Cell, Legend,Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChartData } from "@/types/dashboard.type";

interface AppoinmentPieChartProps {
  data: PieChartData[];
  title?: string;
  description?: string;
}

const CHART_COLORS = [
  "oklch(0.646 0.222 41.116)", // chart-1 - orange
  "oklch(0.6 0.118 184.704)", // chart-2 - teal
  "oklch(0.398 0.07 227.392)", // chart-3 - blue
  "oklch(0.828 0.189 84.429)", // chart-4 - lime
  "oklch(0.769 0.188 70.08)", // chart-5 - orange variant
];

const AppoinmentPieChart = ({ data, title, description }: AppoinmentPieChartProps) => {

  if (!data || !Array.isArray(data)) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-75">
          <p className="text-sm text-muted-foreground">
            Invalid data provided for the chart.
          </p>
        </CardContent>
      </Card>
    )
  }

  const formatedData = data.map((item) => ({
    name: item.status.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()),
    value: Number(item.count)
  }))

  if (!formatedData.length || formatedData.every(item => item.value === 0)) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="flex items-center justify-center h-75">
          <p className="text-sm text-muted-foreground">
            No appointment data available to display the chart.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={formatedData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey={"value"}
            >
              {formatedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default AppoinmentPieChart