export function validateData(dateStr: string) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (dateStr.match(regex) === null) {
    return false;
  }

  const [day, month, year] = dateStr.split('/');

  // 👇️ format Date string as `yyyy-mm-dd`
  const formattedStr = `${year}-${month}-${day}`;

  const date = new Date(formattedStr);

  const timestamp = date.getTime();

  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    return false;
  }

  return date.toISOString().startsWith(formattedStr);
}
