const now = new Date();

const year = now.getFullYear();
const month = now.getMonth() + 1;
const day = now.getDate();

const getDate = () => {
  return `Current Date: ${year}-${month}-${day}`;
};

const getTime = () => {
  return `Current Time: ${formatTimeToAMPM(now)}`;
};

// Function to format the time to AM/PM
function formatTimeToAMPM(date: Date) {
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;

  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const time = hours + ":" + minutes + " " + ampm;

  return time;
}

export { getDate, getTime };
