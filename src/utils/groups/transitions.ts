export function getNextGroupIndex(currentIndex: number, totalGroups: number): number {
  if (totalGroups === 0) return 0;
  return (currentIndex + 1) % totalGroups;
}

export function handleGroupTransition(
  callback: () => void,
  duration: number = 300
): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      callback();
      resolve();
    }, duration);
  });
}