export interface Connective {
  category: 'Contrast' | 'Result' | 'Sequence' | 'Comparison' | 'Addition';
  phrase: string;
  example: string;
  usageRule: string;
}

export const CONNECTIVES_DATA: Connective[] = [
  {
    category: 'Contrast',
    phrase: "By way of contrast,",
    example: "The sales in 2010 were peak. By way of contrast, 2011 saw a sharp contraction.",
    usageRule: "Use at the start of a sentence to compare two opposing trends."
  },
  {
    category: 'Comparison',
    phrase: "Similarly,",
    example: "Italy saw a 10% rise in tourism. Similarly, Spain experienced a comparable increase.",
    usageRule: "Connects two similar trends across different categories."
  },
  {
    category: 'Result',
    phrase: "Consequently,",
    example: "R&D funding was cut. Consequently, innovation rates stagnated.",
    usageRule: "Shows the cause-and-effect relationship between two data points."
  },
  {
    category: 'Sequence',
    phrase: "Following this,",
    example: "The price spiked in June. Following this, it remained stable for the rest of the year.",
    usageRule: "Essential for step-by-step process descriptions or linear charts."
  },
  {
    category: 'Contrast',
    phrase: "In stark contrast,",
    example: "The youngest demographic preferred tea. In stark contrast, older adults favored coffee.",
    usageRule: "The highest-level contrast marker for Band 9 comparison."
  },
  {
    category: 'Contrast',
    phrase: "Conversely,",
    example: "High-income households spent more on leisure. Conversely, low-income groups prioritized essential commodities.",
    usageRule: "A sophisticated alternative to 'On the other hand'."
  },
  {
    category: 'Addition',
    phrase: "Moreover,",
    example: "The birth rate increased in 2010. Moreover, life expectancy also saw a marginal rise.",
    usageRule: "Use to add a supporting data point to the same trend."
  },
  {
    category: 'Sequence',
    phrase: "Subsequently,",
    example: "Figures peaked in March. Subsequently, they fell back to their original levels by June.",
    usageRule: "Perfect for describing a series of events or changes over time."
  },
  {
    category: 'Result',
    phrase: "Thereby...",
    example: "The government increased subsidies, thereby encouraging more investment in green tech.",
    usageRule: "A mid-sentence result marker that requires a present participle (verb-ing)."
  },
  {
    category: 'Comparison',
    phrase: "Just as... so too...",
    example: "Just as the demand for coal fell, so too did its market price.",
    usageRule: "A complex structure used to mirror two declining or rising trends."
  },
  {
    category: 'Contrast',
    phrase: "Notwithstanding this trend,",
    example: "Prices rose in most sectors. Notwithstanding this trend, the technology sector remained stable.",
    usageRule: "A high-level alternative to 'Despite this' to acknowledge an outlier."
  },
  {
    category: 'Addition',
    phrase: "In tandem with this,",
    example: "Automation increased efficiency. In tandem with this, labor costs saw a 15% reduction.",
    usageRule: "Used to describe two related events happening simultaneously or in coordination."
  },
  {
    category: 'Result',
    phrase: "With the inevitable result that...",
    example: "Oil reserves were depleted, with the inevitable result that fuel prices skyrocketed.",
    usageRule: "Connects a cause to a predictable and significant outcome."
  },
  {
    category: 'Sequence',
    phrase: "At this juncture in the process,",
    example: "The components are sterilized. At this juncture in the process, they are transferred to the clean room.",
    usageRule: "Specifically for process tasks to mark a precise moment or stage."
  },
  {
    category: 'Comparison',
    phrase: "By the same token,",
    example: "Tourism creates jobs. By the same token, it can strain local infrastructure if unmanaged.",
    usageRule: "Used to introduce an equally valid point or similar logic from a different angle."
  },
  {
    category: 'Contrast',
    phrase: "Albeit...",
    example: "The industry saw growth, albeit at a slower pace than the previous decade.",
    usageRule: "A sophisticated way to add a concession or qualification within a sentence."
  },
  {
    category: 'Addition',
    phrase: "Coupled with this is...",
    example: "The rise in internet speed was notable. Coupled with this is the increasing affordability of devices.",
    usageRule: "Links two positive or complementary factors together effectively."
  },
  {
    category: 'Result',
    phrase: "The corollary of this is that...",
    example: "The budget was slashed. The corollary of this is that several key projects were abandoned.",
    usageRule: "A highly academic way to show a logical consequence."
  },
  {
    category: 'Contrast',
    phrase: "This notwithstanding,",
    example: "Revenue declined. This notwithstanding, the company expanded its workforce.",
    usageRule: "A formal way to say 'In spite of this'."
  },
  {
    category: 'Comparison',
    phrase: "In a similar vein,",
    example: "Exports of grain increased. In a similar vein, dairy exports also experienced growth.",
    usageRule: "Ideal for showing a shared trend across different sectors."
  },
  {
    category: 'Sequence',
    phrase: "The final iteration of the cycle involves...",
    example: "The final iteration of the cycle involves the cooling and packaging of the resulting liquid.",
    usageRule: "Use to describe the concluding stage of a circular process."
  },
  {
    category: 'Addition',
    phrase: "Along with this,",
    example: "The city built new parks. Along with this, bike lanes were installed across the downtown area.",
    usageRule: "Simple but effective way to list multiple infrastructure changes."
  },
  {
    category: 'Result',
    phrase: "Yielding...",
    example: "The reaction was heated for two hours, yielding a stable chemical compound.",
    usageRule: "Use at the end of a process description sentence to show the output."
  }
];
