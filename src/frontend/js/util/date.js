import { months, fullMonths } from "../constants/constants.js";

     
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
    const formattedMonth = months[month] || null
    dateParts[1] = formattedMonth;
    return dateParts.join(' ');
}


export function getCurrentDateAndTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = fullMonths[currentDate.getMonth()];
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    // Add ordinal suffix to day
    const ordinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
        }
    };

    const dayWithSuffix = `${day}${ordinalSuffix(day)}`;

    // Format hours and minutes with leading zero if needed
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `
    <i class="fa-regular fa-calendar"></i><h3">${formattedHours}:${formattedMinutes}</h3><span>${month} ${dayWithSuffix}, ${year}</span>
    `;
}

export function timeOfDay() {
    const time = new Date().getHours();
    if (time >= 6 && time < 12) return 'morning';
    if (time >= 12 && time < 18) return 'afternoon';
    if (time >= 18 && time < 22) return 'evening';
    return 'night'
}