import type { FeedFilter } from "../types/feed";

interface Props {
  activeTab: FeedFilter;
  onChange: (value: FeedFilter) => void;
}

const tabs: {
  label: string;
  value: FeedFilter;
}[] = [
  {
    label: "🔥 الكل",
    value: "all",
  },
  {
    label: "الكلية",
    value: "faculty",
  },
  {
    label: "التخصص",
    value: "specialty",
  },
];

export default function FeedTabs({
  activeTab,
  onChange,
}: Props) {
  return (
    <div className="flex gap-2 border-b pb-3">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => {
            alert(`Clicked: ${tab.value}`);
            onChange(tab.value);
          }}
          className={`
            rounded-lg
            px-4
            py-2
            text-sm
            font-medium
            transition-all
            duration-200

            ${
              activeTab === tab.value
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}