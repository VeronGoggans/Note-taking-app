const MONTHS = {
    '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
    '05': 'Mei', '06': 'Jun', '07': 'Jul', '08': 'Aug',
    '09': 'Sep', '10': 'Okt', '11': 'Nov', '12': 'Dec', 
}
    
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
    const day = dateParts[0];
    const month = dateParts[1];

    // checking if the day of the month is before the 10th
    const dayParts = day.split('');
    if (dayParts[0] === '0') dateParts[0] = dayParts[1];

    // giving the month number it's month name
    const formattedMonth = MONTHS[month] || null
    dateParts[1] = formattedMonth;
    return dateParts.join(' ');
}