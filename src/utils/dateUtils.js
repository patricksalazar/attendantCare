export function getDaysofWeek(date) {
  let dateArray = new Array();
  let day = date.getDay();

  if( day !== 0 )
    date.setHours(-24 * (day));
  dateArray.push(date);

  for (var i=1; i<7; i++) {
    let nextDay = new Date(date.getTime());
    nextDay.setHours(date.getHours()+(24*i));
    dateArray.push(nextDay);
  }
  return dateArray;
}
