
export const Naira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
});


export const   formatDateWithSuffix = (date: Date) => {
  const day = date.getDate();
  const year = date.getFullYear();

  const month = date.toLocaleString("en-US", { month: "short" });

  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" :
    "th";

  return `${month} ${day}${suffix} ${year}`;
}


export const getInitials = (name: string) => {
  if (!name) return "";

  return name
    .trim()
    .split(" ")
    .slice(0, 2)              // first + last name
    .map(n => n[0].toUpperCase())
    .join("");
}