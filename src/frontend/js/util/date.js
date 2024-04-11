/**
     * This method formats a date string given from the backend.
     * 01/01/2024 turns into 1 Jan 2024
     * 25/12/2023 turns into 25 Dec 2023
     * 
     * @param {String} date A date string. Could be both the creation date or last edit date.
     * @returns A formatted date string.
     */
export function dateFormat(date) {
    let dateParts = date.split('/');
    const DAY = dateParts[0];
    const MONTH = dateParts[1];
    

    // checking if the day of the month is before the 10th
    const DAY_PARTS = DAY.split('');
    if (DAY_PARTS[0] === '0') dateParts[0] = DAY_PARTS[1];

    // giving the month number it's month name
    let monthFormatted = '';
    if (MONTH === '01') monthFormatted = 'Jan'
    if (MONTH === '02') monthFormatted = 'Feb'
    if (MONTH === '03') monthFormatted = 'Mar'
    if (MONTH === '04') monthFormatted = 'Apr'
    if (MONTH === '05') monthFormatted = 'Mei'
    if (MONTH === '06') monthFormatted = 'Jun'
    if (MONTH === '07') monthFormatted = 'Jul'
    if (MONTH === '08') monthFormatted = 'Aug'
    if (MONTH === '09') monthFormatted = 'Sep'
    if (MONTH === '10') monthFormatted = 'Okt'
    if (MONTH === '11') monthFormatted = 'Nov'
    if (MONTH === '12') monthFormatted = 'Dec'
    dateParts[1] = monthFormatted;
    const NEW_DATE_STRING = dateParts.join(' ');
    return NEW_DATE_STRING
}