
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

  const months = [
    { id: "01", name: "January" },
    { id: "02", name: "February" },
    { id: "03", name: "March" },
    { id: "04", name: "April" },
    { id: "05", name: "May" },
    { id: "06", name: "June" },
    { id: "07", name: "July" },
    { id: "08", name: "August" },
    { id: "09", name: "September" },
    { id: "10", name: "October" },
    { id: "11", name: "November" },
    { id: "12", name: "December" },
  ];

export function formatDate(dx?: string | null): string {
  if (!dx || typeof dx !== "string") return "";

  const splitted = dx.split("-");

  if (splitted.length < 2) return "";

  const month = getMonthById(splitted[0]);

  if (!month || !month.name) return "";

  return `${month.name}, ${splitted[1]}`;
}


    function getMonthById(id: string): { id: string; name: string } {
    const month = months.find((month) => month.id === id);
    return month ? month : months[0];
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


export const dateformat = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
     hour12: true,
  });
};