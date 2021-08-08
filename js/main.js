/*
 *   Prepares table view for calendar
 *   @return
 */
function showCalendar(month, year) {
  // getDay() returns day of the week: 0-6
  let firstDayinWeek = new Date(year, month).getDay();
}

/*
 *   Calculates total days in a given month and year
 *   @return {int}
 */
function daysInMonth(iYear, iMonth) {
  // getDate() returns day of the month: 1-31
  return 32 - new Date(iYear, iMonth, 32).getDate();
}
