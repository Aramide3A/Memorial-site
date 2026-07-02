export function getCountdownParts(targetDate: string) {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const distance = Math.max(target - now, 0);

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export function formatCountdownValue(value: number) {
  return String(value).padStart(2, "0");
}
