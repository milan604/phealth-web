export function getTime(date) {
  const datetime = new Date(date);
  return datetime.toLocaleTimeString();
}

export default getTime;
