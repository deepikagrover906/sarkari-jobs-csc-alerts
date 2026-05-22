import { Type } from "../backend.d";

interface CategoryFilterProps {
  selected: Type | null;
  onSelect: (cat: Type | null) => void;
}

const CATEGORIES: { value: Type | null; label: string; emoji: string }[] = [
  { value: null, label: "All Jobs", emoji: "🏛️" },
  { value: Type.centralGovt, label: "Central Govt", emoji: "🇮🇳" },
  { value: Type.stateGovt, label: "State Govt", emoji: "🏢" },
  { value: Type.csc, label: "CSC", emoji: "💻" },
  { value: Type.railway, label: "Railway", emoji: "🚂" },
  { value: Type.banking, label: "Banking", emoji: "🏦" },
  { value: Type.defence, label: "Defence", emoji: "⚔️" },
];

export default function CategoryFilter({
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => {
        const isActive = selected === cat.value;
        return (
          <button
            type="button"
            key={cat.value ?? "all"}
            data-ocid="jobs.filter.tab"
            onClick={() => onSelect(cat.value)}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all
              ${
                isActive
                  ? "bg-[oklch(0.22_0.08_255)] text-white shadow-md scale-105"
                  : "bg-white border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              }
            `}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
