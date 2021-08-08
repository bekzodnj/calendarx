/* DOM variables */
const HEADER_MONTH_AND_YEAR = document.querySelector('.header-monthAndYear'),
  TABLE_BODY = document.querySelector('.calendar-body'),
  SELECT_MONTH = document.querySelector('.select-month'),
  SELECT_YEAR = document.querySelector('.select-year');

/* Date variables */
var TODAY = new Date(),
  MONTH = TODAY.getMonth(),
  YEAR = TODAY.getFullYear();

showCalendar(MONTH, YEAR);

/*
 *   Prepares table view for calendar
 *   @return {int}
 */
function showCalendar(month, year) {
  // getDay() returns day of the week: 0-6
  let firstDayOfWeek = new Date(year, month).getDay();

  // current day = 1 -> 31/30
  let currDay = 1;

  // rows of the calendar (at max 6 rows)
  for (let calendar_row = 0; calendar_row < 6; calendar_row++) {
    let TABLE_ROW = document.createElement('tr');

    // calendar cell or
    // column data or
    // individual day of the week
    for (let calendar_cell = 0; calendar_cell < 7; calendar_cell++) {
      if (calendar_row === 0 && calendar_cell < firstDayOfWeek) {
        // logic for 1 row of the calendar:
        // creating blank cells
        let TABLE_DATA = document.createElement('td'), // <td>
          TABLE_DATA_TEXT = document.createTextNode(''); // text

        TABLE_DATA.appendChild(TABLE_DATA_TEXT);
        TABLE_ROW.appendChild(TABLE_DATA);
      } else if (currDay > daysInMonth(year, month)) {
        // if day exceeds total number of days in month
        break;
      } else {
        // filling up the cells with actual numbers
        let TABLE_DATA = document.createElement('td'), // <td>
          TABLE_DATA_TEXT = document.createTextNode(currDay); // text
        TABLE_DATA.appendChild(TABLE_DATA_TEXT);
        TABLE_ROW.appendChild(TABLE_DATA);
        currDay++;
      }
    }

    TABLE_BODY.appendChild(TABLE_ROW);
  }
}

/*
 *   Calculates total days in a given month and year
 *   @return {int}
 *   Source: https://dzone.com/articles/determining-number-days-month
 */
function daysInMonth(iYear, iMonth) {
  // getDate() returns day of the month: 1-31
  return 32 - new Date(iYear, iMonth, 32).getDate();
}
