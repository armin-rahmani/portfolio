export type Perspective = 'enterprise' | 'institutional';

export interface NavDropdownItem {
  title: string;
  description?: string;
  items: { label: string; href: string; badge?: string }[];
}

export interface MetricItem {
  label: string;
  value: string;
  change?: string;
  description?: string;
}

export interface CapabilityItem {
  id: string;
  title: string;
  tag: string;
  headline: string;
  description: string;
  metrics: { label: string; value: string; unit?: string }[];
  chartData: number[];
  category: string;
}

export interface BentoProject {
  id: string;
  title: string;
  category: string;
  description: string;
  stats: string;
  tagline: string;
  isWide?: boolean;
}

export interface SectorItem {
  id: string;
  name: string;
  shortCode: string;
  title: string;
  description: string;
  keyMetric: string;
  metricLabel: string;
  nodes: { label: string; status: 'active' | 'syncing' | 'verified'; latency: string }[];
}

export interface PricingPlan {
  id: string;
  name: string;
  validity: string;
  priceMonthly: string;
  priceAnnual: string;
  description: string;
  features: string[];
  isHighlighted?: boolean;
  ctaText: string;
}
