export const getFormattedDate = (date: Date) => {
  if (date) {
    let result = new Date(date);

    const [month, day, year] = [
      result.getMonth(),
      result.getDate(),
      result.getFullYear(),
    ];

    return `${day}.${month}.${year}`;
  }
  return '';
};

export const getFormattedDateTime = (date: Date) => {
  if (date) {
    let result = new Date(date);

    const [month, day, year, hours, minutes] = [
      result.getMonth(),
      result.getDate(),
      result.getFullYear(),
      result.getHours(),
      result.getMinutes(),
    ];

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
  return '';
};
