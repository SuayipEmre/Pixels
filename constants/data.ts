import { SectionKeyEnum } from "@/types/filtersModalSectionKey";

export const categoriesData: string[] = [
  "backgrounds",
  "fashion",
  "nature",
  "science",
  "education",
  "feelings",
  "health",
  "people",
  "religion",
  "places",
  "animals",
  "industry",
  "computer",
  "food",
  "sports",
  "transportation",
  "travel",
  "buildings",
  "business",
  "music"
];



// Define a type for the keys of filtersData

// Define your filtersData object with the correct types
export const filtersData: Record<SectionKeyEnum, string[]> = {
  order: ['popular', 'latest'],
  orientation: ['horizontal', 'vertical'],
  type: ['photo', 'illustration', 'vector'],
  colors: [
    'red', 'orange', 'yellow',
    'green', 'turquoise', 'blue', 'pink',
    'gray', 'black', 'brown',
  ]
};
