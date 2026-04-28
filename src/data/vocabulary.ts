/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ChartType = 
  | 'LINE_GRAPH' 
  | 'BAR_CHART' 
  | 'PIE_CHART' 
  | 'MAP' 
  | 'PROCESS' 
  | 'TABLE';

export interface VocabularyWord {
  word: string;
  type: string;
  chartCategory: ChartType[];
  level: 'Band 8/9';
  example: string;
  variations?: { perspective: string; sentence: string }[];
  pronunciation: string;
  synonyms: string[];
  avoid: string;
  flippedSentence?: string; // For the Noun-Adjective Flip feature
  collocations?: string[];
  impactTip?: string;
}

export const VOCABULARY_DATA: VocabularyWord[] = [
  // --- LINE GRAPH: INCREASES ---
  {
    word: "surged",
    type: "Fast Rise",
    chartCategory: ['LINE_GRAPH', 'BAR_CHART', 'TABLE'],
    level: "Band 8/9",
    example: "Carbon dioxide emissions in the US surged by 40 percentage points between 1990 and 2010.",
    variations: [
      { perspective: "Contrast", sentence: "While coal usage declined, natural gas consumption skyrocketed beyond expectations." },
      { perspective: "Cause & Effect", sentence: "Driven by the tech boom, demand for skilled labor shot upward throughout the early 2000s." },
      { perspective: "Temporal focus", sentence: "The subsequent decade saw figures that soared to twice their original value." }
    ],
    pronunciation: "surjd",
    synonyms: ["skyrocketed", "shot upward", "soared"],
    avoid: "Don't say 'increased very much'. Use 'surged' for dramatic growth over 20%.",
    flippedSentence: "The period saw a sudden surge in CO2 emissions in the United States."
  },
  {
    word: "climbed steadily",
    type: "Steady Rise",
    chartCategory: ['LINE_GRAPH', 'TABLE'],
    level: "Band 8/9",
    example: "The proportion of the population aged 65 and over in Japan climbed steadily to reach 25% by 2030.",
    variations: [
      { perspective: "Comparative", sentence: "Subscription rates gained momentum, outperforming the previous year's metrics." },
      { perspective: "Long-term trend", sentence: "Over the span of fifty years, literacy rates edged upward to near-universal levels." }
    ],
    pronunciation: "klaimd sted-i-lee",
    synonyms: ["edged upward", "gained momentum", "rose incrementally"],
    avoid: "Avoid 'went up slowly'. 'Climbed steadily' suggests a strong, consistent trend.",
    flippedSentence: "There was a steady climb in the percentage of elderly citizens in Japan."
  },
  {
    word: "soared",
    type: "Fast Rise",
    chartCategory: ['LINE_GRAPH', 'BAR_CHART'],
    level: "Band 8/9",
    example: "The number of overseas visitors to the UK soared from 10 million to 35 million over the decade.",
    variations: [
      { perspective: "Extreme growth", sentence: "Online retail profits skyrocketed by an unprecedented 300% during the holiday quarter." },
      { perspective: "Sector specific", sentence: "Tourism revenues escalated as international travel restrictions were finally lifted." }
    ],
    pronunciation: "sawrd",
    synonyms: ["surged", "skyrocketed", "escalated"],
    avoid: "Avoid 'increased a lot'. 'Soared' is the professional choice for large-scale jumps.",
    flippedSentence: "The decade witnessed a soaring number of international arrivals in the UK."
  },

  // --- LINE GRAPH: DECREASES ---
  {
    word: "plummeted",
    type: "Fast Fall",
    chartCategory: ['LINE_GRAPH', 'BAR_CHART'],
    level: "Band 8/9",
    example: "Expenditure on clothing in the UK plummeted to a nadir of 5% in 2010, following a decade of stability.",
    variations: [
      { perspective: "Critical decline", sentence: "Stock values took a nosedive within minutes of the announcement." },
      { perspective: "Relative change", sentence: "Compared to the previous peak, the number of active users contracted sharply by half." }
    ],
    pronunciation: "plum-i-tid",
    synonyms: ["plunged", "took a nosedive", "contracted sharply"],
    avoid: "Never use 'dropped down'. 'Plummeted' already implies a vertical drop.",
    flippedSentence: "The year 2010 witnessed a dramatic plummet in consumer spending on apparel."
  },
  {
    word: "dwindled",
    type: "Steady Fall",
    chartCategory: ['LINE_GRAPH'],
    level: "Band 8/9",
    example: "Participation in team sports among teenagers dwindled consistently as digital leisure activities became more prevalent.",
    variations: [
      { perspective: "Resource exhaustion", sentence: "Available land for agriculture tapered off as urban sprawl intensified." },
      { perspective: "Declining interest", sentence: "Public support for the initiative eroded gradually over the following months." }
    ],
    pronunciation: "dwin-duhld",
    synonyms: ["tapered off", "eroded gradually", "declined consistently"],
    avoid: "Avoid 'went down every year'. 'Dwindled' is perfect for numbers approaching zero.",
    flippedSentence: "A consistent dwindling of youth sports participation was observed over the period."
  },

  // --- LINE GRAPH: STABILITY & FLUCTUATION ---
  {
    word: "levelled off",
    type: "Plateau",
    chartCategory: ['LINE_GRAPH'],
    level: "Band 8/9",
    example: "Following five years of rapid growth, university enrollment figures levelled off at approximately 15,000 students.",
    variations: [
      { perspective: "Post-growth", sentence: "The rate of inflation finally plateaued after hitting a three-year high." },
      { perspective: "Stable state", sentence: "Migration patterns appeared to have held steady by the mid-1990s." }
    ],
    pronunciation: "leh-vuhld awf",
    synonyms: ["plateaued", "remained stagnant", "held steady"],
    avoid: "Don't say 'stayed the same'. Use 'levelled off' after an increase.",
    flippedSentence: "The enrollment figures reached a plateau after five years of rapid growth."
  },
  {
    word: "oscillated",
    type: "Fluctuation",
    chartCategory: ['LINE_GRAPH'],
    level: "Band 8/9",
    example: "The price of grain demonstrated considerable volatility, oscillating erratically between $200 and $450 per tonne.",
    variations: [
      { perspective: "Cycle focus", sentence: "Unemployment figures fluctuated throughout the fiscal year due to seasonal shifts." },
      { perspective: "Unstable trend", sentence: "The index value wavered within a narrow range before a final breakout." }
    ],
    pronunciation: "os-uh-ley-tid",
    synonyms: ["wavered", "fluctuated", "showed volatility"],
    avoid: "Avoid 'went up and down'. 'Oscillated erratically' shows Band 9 precision.",
    flippedSentence: "Grain prices were marked by erratic oscillations throughout the twenty-year period."
  },

  // --- PEAKS & TROUGHS ---
  {
    word: "reached a zenith",
    type: "Peak",
    chartCategory: ['LINE_GRAPH', 'TABLE'],
    level: "Band 8/9",
    example: "In 2015, car ownership in Seoul reached a zenith of 88%, the highest level ever recorded.",
    variations: [
      { perspective: "Historical high", sentence: "Production efficiency peaked at its highest in late 2018, just before the downturn." },
      { perspective: "Comparative peak", sentence: "While silver usage remained flat, gold demand hit an all-time high of $2000 in the Q3 report." }
    ],
    pronunciation: "reecht ey zen-ith",
    synonyms: ["peaked at", "hit an all-time high of", "culminated at"],
    avoid: "Don't just say 'was the highest'. 'Reached a zenith' highlights the absolute peak.",
    flippedSentence: "The zenith of car ownership in the capital was recorded in 2015."
  },
  {
    word: "bottomed out",
    type: "Trough",
    chartCategory: ['LINE_GRAPH', 'TABLE'],
    level: "Band 8/9",
    example: "Average house prices in the region finally bottomed out at $250,000 before staging a recovery.",
    variations: [
      { perspective: "Recovery focus", sentence: "The industry hit a trough in the winter months before bouncing back strongly." },
      { perspective: "Final decline", sentence: "After years of devaluation, the currency reached its nadir at a fractional rate." }
    ],
    pronunciation: "bo-tumd out",
    synonyms: ["hit a trough", "reached its nadir", "dipped to"],
    avoid: "Instead of 'was the lowest point', use 'bottomed out' for the end of a decline.",
    flippedSentence: "There was a bottoming out of property values at the $250,000 mark."
  },

  // --- BAR CHART: COMPARISONS ---
  {
    word: "eclipsed",
    type: "Comparison",
    chartCategory: ['BAR_CHART', 'PIE_CHART', 'TABLE'],
    level: "Band 8/9",
    example: "By 2020, output from solar farms eclipsed that of coal-fired power stations in the European Union.",
    variations: [
      { perspective: "Dominance", sentence: "Exports of electronics dwarfed all other trade categories combined." },
      { perspective: "Shift in lead", sentence: "By the second quarter, YouTube's ad revenue had outpaced traditional TV spends." }
    ],
    pronunciation: "ih-klipst",
    synonyms: ["outpaced", "surpassed", "dwarfed"],
    avoid: "Don't say 'was more than'. 'Eclipsed' implies one figure makes the other look small.",
    flippedSentence: "An eclipse of traditional energy sources by renewable alternatives was evident by 2020."
  },
  {
    word: "trailed",
    type: "Comparison",
    chartCategory: ['BAR_CHART', 'TABLE'],
    level: "Band 8/9",
    example: "The production of wheat trailed significantly behind maize, with figures of 10 and 45 million tonnes respectively.",
    variations: [
      { perspective: "Ranking", sentence: "Company B lagged behind its competitor by a margin of nearly 15 percent." },
      { perspective: "Minority position", sentence: "Use of bicycles fell short of all other forms of commute in the urban area." }
    ],
    pronunciation: "treyld",
    synonyms: ["lagged behind", "fell short of"],
    avoid: "Don't say 'was lower'. 'Trailed' is the idiomatic way to describe following a leader.",
    flippedSentence: "Maize production was significantly trailed by that of wheat at the end of the period."
  },

  // --- PIE CHART: PROPORTIONS ---
  {
    word: "accounted for",
    type: "Proportion",
    chartCategory: ['PIE_CHART', 'TABLE'],
    level: "Band 8/9",
    example: "Renewable energy accounted for the lion's share of total consumption, representing 45% of the market.",
    variations: [
      { perspective: "Majority focus", sentence: "Personnel costs constituted the largest portion of the budget." },
      { perspective: "Contribution", sentence: "The three main exports comprised over ninety percent of total trade." }
    ],
    pronunciation: "uh-koun-tid fawr",
    synonyms: ["constituted", "comprised", "represented"],
    avoid: "Do not use 'amount' for percentages. Use 'proportion', 'share', or 'accounted for'.",
    flippedSentence: "A total of 45% of the market was accounted for by green energy sources."
  },
  {
    word: "constituted",
    type: "Proportion",
    chartCategory: ['PIE_CHART', 'TABLE'],
    level: "Band 8/9",
    example: "Agriculture and manufacturing combined constituted nearly three-quarters of the nation's GDP.",
    variations: [
      { perspective: "Structural makeup", sentence: "The user base is constituted primarily of young professionals." },
      { perspective: "Composite view", sentence: "A mere five percent of the total volume was constituted by luxury goods." }
    ],
    pronunciation: "kon-sti-too-tid",
    synonyms: ["accounted for", "comprised", "made up"],
    avoid: "Don't use 'is' or 'are' for large sections of a pie chart. Use 'constitutes' for structure.",
    flippedSentence: "Nearly 75% of the GDP was constituted by the primary and secondary sectors."
  },

  // --- MAP: CHANGES ---
  {
    word: "repurposed",
    type: "Map Change",
    chartCategory: ['MAP'],
    level: "Band 8/9",
    example: "The former warehouse district was entirely demolished and subsequently repurposed as a modern luxury estate.",
    pronunciation: "ree-pur-puhst",
    synonyms: ["converted", "transformed", "redeveloped"],
    avoid: "Don't say 'they changed it'. Use 'repurposed as' or 'transformed into'.",
    variations: [
      { perspective: "Urban development", sentence: "The derelict shipyard was transformed into a vibrant cultural hub." },
      { perspective: "Functional shift", sentence: "Once a primary school, the building was converted into a community center." },
      { perspective: "Modernization", sentence: "The aging infrastructure was completely repurposed to meet current safety standards." }
    ],
    flippedSentence: "The repurposing of the warehouse district resulted in a modern residential estate."
  },
  {
    word: "encircling",
    type: "Spatial",
    chartCategory: ['MAP'],
    level: "Band 8/9",
    example: "A multi-lane bypass was constructed encircling the industrial zone to improve traffic flow.",
    variations: [
      { perspective: "Boundary focus", sentence: "A new pedestrian walkway now flanks the northern edge of the park." },
      { perspective: "Enclosure", sentence: "The residential area is now bordered by a green belt to the south." }
    ],
    pronunciation: "en-sur-kling",
    synonyms: ["flanking", "lining", "bordering"],
    avoid: "Avoid overusing 'around'. 'Encircling' or 'flanking' provides Band 9 spatial accuracy.",
  },
  // --- PROCESS: TRANSITIONS ---
  {
    word: "initiates with",
    type: "Process Transition",
    chartCategory: ['PROCESS'],
    level: "Band 8/9",
    example: "The purification process initiates with the mechanical filtration of waste water through large screens.",
    variations: [
      { perspective: "Sequence", sentence: "The production cycle commences with the collection of raw materials." },
      { perspective: "First stage", sentence: "The journey of the product begins with a thorough quality inspection." },
      { perspective: "Chemical start", sentence: "The reaction initiates with the controlled addition of a catalyst." }
    ],
    pronunciation: "ih-ni-shee-eyts with",
    synonyms: ["commences with", "begins with"],
    avoid: "Avoid basic sequencing like 'First step is'. Use 'The process initiates with...'.",
    collocations: ["The cycle initiates", "The sequence initiates", "The operation initiates"],
    impactTip: "Using 'initiates' instead of 'starts' immediately signals Band 8+ academic style."
  },
  {
    word: "culminates in",
    type: "Process Transition",
    chartCategory: ['PROCESS'],
    level: "Band 8/9",
    example: "The entire refining sequence culminates in the dispatch of purified oil to various regional hubs.",
    variations: [
      { perspective: "Conclusion", sentence: "The manufacturing chain concludes with the final packaging of the goods." },
      { perspective: "Final outcome", sentence: "The elaborate assembly line finishes at the automated testing station." },
      { perspective: "Delivery", sentence: "The logistical series culminates in the arrival of the freight at the warehouse." }
    ],
    pronunciation: "kul-muh-neyts in",
    synonyms: ["concludes with", "finishes at"],
    avoid: "Instead of 'The last step starts', use 'The process culminates in...' for a Band 9 finish.",
    collocations: ["The project culminates", "The study culminates", "The effort culminates"],
    impactTip: "This is a powerful verb to describe the final stage of long complex processes."
  },
  // --- NEW ADDITIONS: EXTENDING PIE, MAP, PROCESS ---
  {
    word: "demolished",
    type: "Map Change",
    chartCategory: ['MAP'],
    level: "Band 8/9",
    example: "The high-rise apartment block was demolished to make way for a revitalized public park.",
    variations: [
      { perspective: "Construction", sentence: "To urbanize the area, the old industrial sheds were knocked down." },
      { perspective: "Replacement", sentence: "The outdated bridge was razed and replaced with a modern suspension structure." },
      { perspective: "Land Clearing", sentence: "The derelict cottages were demolished to provide a site for the new hospital." }
    ],
    pronunciation: "dih-mol-isht",
    synonyms: ["razed", "knocked down", "removed"],
    avoid: "Don't just say 'built over' or 'broken'. Use 'demolished' for large buildings.",
    collocations: ["Demolished to make way for", "Completely demolished", "Scheduled to be demolished"],
    impactTip: "Perfect for describing the removal of structures in Map tasks."
  },
  {
    word: "dominated by",
    type: "Proportion",
    chartCategory: ['PIE_CHART', 'TABLE', 'BAR_CHART'],
    level: "Band 8/9",
    example: "The market was dominated by a single player which held a staggering 70% share.",
    variations: [
      { perspective: "Majority", sentence: "The chart shows a landscape dominated by small-scale enterprises." },
      { perspective: "Visual impact", sentence: "The pie chart is clearly dominated by the healthcare segment." },
      { perspective: "Competition", sentence: "The tech sector remained dominated by a handful of global corporations." }
    ],
    pronunciation: "dom-uh-ney-tid by",
    synonyms: ["overshadowed by", "led by"],
    avoid: "Don't say 'it was the biggest'. Use 'dominated by' when one segment is overwhelmingly large.",
    collocations: ["Heavy dominated by", "Increasingly dominated by", "Market dominated by"],
    impactTip: "Use this to describe segments over 50% for maximum descriptive impact."
  },
  {
    word: "undergoes",
    type: "Process Transition",
    chartCategory: ['PROCESS'],
    level: "Band 8/9",
    example: "In the second stage, the raw timber undergoes a series of chemical treatments to increase durability.",
    variations: [
      { perspective: "Transformation", sentence: "The material undergoes a rigorous testing phase before assembly." },
      { perspective: "State change", sentence: "As the temperature rises, the substance undergoes a physical transition." },
      { perspective: "Medical", sentence: "The patient undergoes a series of diagnostic scans before the procedure initiates." }
    ],
    pronunciation: "un-der-gohs",
    synonyms: ["experiences", "is subjected to"],
    avoid: "Don't say 'it has' or 'it gets'. Use 'undergoes' for transformations.",
    collocations: ["Undergoes treatment", "Undergoes a transformation", "Undergoes testing"],
    impactTip: "Crucial for describing what happens *to* an object in a passive-heavy process report."
  },
  {
    word: "expanded",
    type: "Map Change",
    chartCategory: ['MAP', 'BAR_CHART'],
    level: "Band 8/9",
    example: "The existing library was significantly expanded to accommodate a new digital media wing.",
    variations: [
      { perspective: "Growth", sentence: "The commercial zone was enlarged to include a high-tech business incubator." },
      { perspective: "Development", sentence: "The size of the railway station was increased to double its original capacity." },
      { perspective: "Academic", sentence: "The scope of the project was expanded to cover environmental impacts." }
    ],
    pronunciation: "ik-span-did",
    synonyms: ["enlarged", "extended", "widened"],
    avoid: "Avoid 'got bigger'. 'Expanded' is the academic standard.",
    collocations: ["Significantly expanded", "Rapidly expanded", "Geographically expanded"],
    impactTip: "Ideal for describing infrastructure growth and land use changes."
  }
];
