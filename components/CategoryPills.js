export const pillClass = (isSelected) =>
  `group px-4 py-1.5 text-xs font-bold transition-colors border rounded-xl ${
    isSelected
      ? "!bg-white !text-red-600 border-red-600 shadow-[-4px_4px_0px_0px_rgba(220,38,38,1)]"
      : "!bg-white !text-red-600 border-red-600 hover:!bg-red-600 hover:!text-white"
  }`;
