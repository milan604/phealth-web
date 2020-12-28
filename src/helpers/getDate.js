export function getDate(date) {
  const datetime = new Date(date);
  return datetime.toLocaleDateString();
}

export default getDate;