export const pillClass = (isSelected) =>
  `px-4 py-1.5 text-xs font-bold transition-colors border rounded-xl ${
    isSelected
      ? "!bg-black !text-yellow-400 border-yellow-400 shadow-[-4px_4px_0px_0px_rgba(250,204,21,1)]"
      : "!bg-black !text-yellow-400 border-yellow-400 hover:!bg-yellow-400 hover:!text-black"
  }`;
