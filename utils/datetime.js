const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const today = (now) => {
  return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`
}

export { months, days, today }