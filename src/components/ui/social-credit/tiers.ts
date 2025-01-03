export const tiers = [
  { name: "Bronze", min: 0, max: 999, bgColor: "bg-amber-600", hoverColor: "hover:bg-amber-700", textColor: "text-amber-900" },
  { name: "Silver", min: 1000, max: 1999, bgColor: "bg-gray-400", hoverColor: "hover:bg-gray-500", textColor: "text-gray-900" },
  { name: "Gold", min: 2000, max: 2999, bgColor: "bg-yellow-500", hoverColor: "hover:bg-yellow-600", textColor: "text-yellow-900" },
  { name: "Platinum", min: 3000, max: 3999, bgColor: "bg-gray-300", hoverColor: "hover:bg-gray-400", textColor: "text-gray-900" },
  { name: "Diamond", min: 4000, max: 4999, bgColor: "bg-cyan-500", hoverColor: "hover:bg-cyan-600", textColor: "text-cyan-900" },
  { name: "Emerald", min: 5000, max: 5999, bgColor: "bg-emerald-500", hoverColor: "hover:bg-emerald-600", textColor: "text-emerald-900" },
  { name: "Master", min: 6000, max: 6999, bgColor: "bg-red-600", hoverColor: "hover:bg-red-700", textColor: "text-red-900" },
  { name: "Popularist", min: 7000, max: Infinity, bgColor: "bg-yellow-400", hoverColor: "hover:bg-yellow-500", textColor: "text-yellow-950" },
];

export const getCurrentTier = (score: number) => {
  return tiers.find(tier => score >= tier.min && score <= tier.max) || tiers[tiers.length - 1];
};