/* DOM variables */
const HEADER_MONTH_AND_YEAR = document.querySelector('.header-monthAndYear'),
  TABLE_BODY = document.querySelector('.calendar-body'),
  SELECT_MONTH = document.querySelector('.select-month'),
  SELECT_YEAR = document.querySelector('.select-year');

/* Date variables */
var TODAY = new Date(),
  CURRENT_MONTH = TODAY.getMonth(),
  CURRENT_YEAR = TODAY.getFullYear();

const MONTHS_LIST = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

showCalendar(CURRENT_MONTH, CURRENT_YEAR);

/*
 *   Prepares table view for calendar
 *   @return {int}
 */
function showCalendar(month, year) {
  // clearing all previous cells
  TABLE_BODY.innerHTML = '';

  // settings the header and dropdown
  HEADER_MONTH_AND_YEAR.innerHTML = MONTHS_LIST[month] + ' ' + year;
  SELECT_YEAR.value = year;
  SELECT_MONTH.value = month;

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

        if (isDateToday(currDay, month, year)) {
          // add styling today's date-cell
          TABLE_DATA.classList.add('bg-accent');
        }
        TABLE_ROW.appendChild(TABLE_DATA);
        currDay++;
      }
    }

    TABLE_BODY.appendChild(TABLE_ROW);
  }
}

function next() {
  CURRENT_YEAR = CURRENT_MONTH === 11 ? CURRENT_YEAR + 1 : CURRENT_YEAR;
  CURRENT_MONTH = (CURRENT_MONTH + 1) % 12;

  showCalendar(CURRENT_MONTH, CURRENT_YEAR);
}

function prev() {
  CURRENT_YEAR = CURRENT_MONTH === 0 ? CURRENT_YEAR - 1 : CURRENT_YEAR;
  CURRENT_MONTH = CURRENT_MONTH === 0 ? 11 : CURRENT_MONTH - 1;

  showCalendar(CURRENT_MONTH, CURRENT_YEAR);
}

function jump() {
  CURRENT_YEAR = parseInt(SELECT_YEAR.value);
  CURRENT_MONTH = parseInt(SELECT_MONTH.value);

  showCalendar(CURRENT_MONTH, CURRENT_YEAR);
}

function jumpToToday() {
  showCalendar(TODAY.getMonth(), TODAY.getFullYear());
}

function isDateToday(day, month, year) {
  let todaysDate = new Date();

  return (
    day === todaysDate.getDate() &&
    month === todaysDate.getMonth() &&
    year === todaysDate.getFullYear()
  );
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
