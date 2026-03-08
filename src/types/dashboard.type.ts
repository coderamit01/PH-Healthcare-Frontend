export interface navItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export interface navSection {
  title?: string;
  items: navItem[]
}