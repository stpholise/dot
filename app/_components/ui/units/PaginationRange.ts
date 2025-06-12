export const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  maxVisible: number = 6
): (number | "...")[] => {
  const range: (number | "...")[] = [];

  if (totalPages <= maxVisible) {
    for (let i = 0; i < totalPages; i++) range.push(i);
    return range;
  }

  const siblings = 1; 
  const left = Math.max(currentPage - siblings, 1);
  const right = Math.min(currentPage + siblings, totalPages - 2);

  const shouldShowLeftDots = left > 1;
  const shouldShowRightDots = right < totalPages - 2;

  range.push(0); 

  if (shouldShowLeftDots && !shouldShowRightDots) {
    range.push("...");
    for (let i = totalPages - (maxVisible - 3); i < totalPages - 1; i++) {
      range.push(i);
    }
  } else if (!shouldShowLeftDots && shouldShowRightDots) {
    for (let i = 1; i < maxVisible - 2; i++) {
      range.push(i);
    }
    range.push("...");
  } else if (shouldShowLeftDots && shouldShowRightDots) {
    range.push("...");
    for (let i = left; i <= right; i++) {
      range.push(i);
    }
    range.push("...");
  }

  range.push(totalPages - 1); 

  return range;
};
