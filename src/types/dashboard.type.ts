export interface navItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export interface navSection {
  title?: string;
  items: navItem[]
}

export interface PieChartData {
  status: string;
  count: number
}
export interface BarChartData {
  month: Date | string;
  count: number
}