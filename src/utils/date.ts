// Function to format the time to AM/PM
function formatTimeToAMPM(date: Date): string {
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + minutes + " " + ampm;
}

const getDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  return `Current Date: ${year}-${month}-${day}`;
};

const getTime = (): string => {
  const now = new Date();

  return `Current Time: ${formatTimeToAMPM(now)}`;
};

export { getDate, getTime };
