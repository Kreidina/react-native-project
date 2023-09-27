const currentDate = new Date();

const formatNumber = (number) => (number < 10 ? `0${number}` : number);

const months = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
];

const day = formatNumber(currentDate.getDate());
const monthNum = currentDate.getMonth();
const month = months[monthNum];

const year = currentDate.getFullYear();
const hour = formatNumber(currentDate.getHours());
const minute = formatNumber(currentDate.getMinutes());

export const formattedDate = `${day} ${month}, ${year}`;
export const formattedTime = `${hour}:${minute}`;
