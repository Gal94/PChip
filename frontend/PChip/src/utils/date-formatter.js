export const dateFormatter = (dateToFormat) => {
  const dbDate = new Date(dateToFormat);

  const isAm = dbDate.getHours() > 12 ? false : true;

  //convert mongoose date into a proper date MM/DD/YYYY - HH:MM
  return `${
    dbDate.getMonth() + 1
  }/${dbDate.getDate()}/${dbDate.getFullYear()} ${
    isAm ? dbDate.getHours() : dbDate.getHours() - 12
  }:${dbDate.getMinutes()} ${isAm ? 'am' : 'pm'} `;
};
