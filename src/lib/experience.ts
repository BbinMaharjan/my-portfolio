// Career start date used to compute years of experience dynamically.
export const CAREER_START_DATE = new Date(2021, 7, 1); // August 2021

export function getYearsOfExperience(from: Date = CAREER_START_DATE, to: Date = new Date()): number {
  let years = to.getFullYear() - from.getFullYear();
  const monthDiff = to.getMonth() - from.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && to.getDate() < from.getDate())) {
    years -= 1;
  }
  return Math.max(0, years);
}