type Link = { label: string; href: string | null };
type Project = { name: string; status: string; description: string; next: string; repository: string | null };

const links: Link[] = [
  { label: 'GitHub', href: null },
  { label: 'LinkedIn', href: null },
  { label: 'Email', href: null },
];

export const profile = {
  name: 'Alexander Khundoev',
  headline: 'Electronic Trading Engineer',
  location: 'London, UK',
  focus: ['Low-Latency Systems', 'Java', 'Rust', 'AI/ML'],
  introduction: 'Senior software engineer building high-performance distributed systems and electronic trading infrastructure. Exploring quantitative trading, Rust and AI/ML engineering.',
  experience: [
    'Front-office engineering for fixed income and rates electronic trading, spanning market connectivity, pricing and RFQ workflows, and real-time processing.',
    'Java concurrency, performance tuning and production reliability. Current platform modernisation work includes Rust, Aeron and distributed transaction tracing.',
  ],
  stack: [
    { label: 'Core', tools: 'Java · Concurrency · Distributed systems · Electronic trading · Market data · FIX' },
    { label: 'Current', tools: 'Rust · Aeron · Performance engineering · Observability' },
    { label: 'Exploring', tools: 'Python · AI/ML infrastructure · LLM inference' },
  ],
  links,
};

export const traderlab: Project = {
  name: 'TraderLab',
  status: 'In progress',
  description: 'An experimental trading systems lab for market-data connectivity, order-book processing and strategy infrastructure.',
  next: 'Planned work includes strategy experiments and reproducible performance measurements.',
  repository: null,
};
