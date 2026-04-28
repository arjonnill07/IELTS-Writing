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
  }
];
