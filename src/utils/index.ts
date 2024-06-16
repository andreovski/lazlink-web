export function pickInitialNames(fullName: string) {
  const parts = fullName.split(" ");
  const firstLetter = parts[0].charAt(0).toUpperCase();
  const secondLetter = parts[parts.length - 1]?.charAt(0).toUpperCase();

  return secondLetter ? firstLetter + secondLetter : fullName.slice(0, 2);
}
