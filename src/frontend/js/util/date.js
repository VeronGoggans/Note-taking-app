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
    <span>${month} ${dayWithSuffix}, ${year}</span><h3>${formattedHours}:${formattedMinutes}</h3>
    `;
}

export function timeOfDay() {
    const time = new Date().getHours();
    if (time >= 6 && time < 12) return 'morning';
    if (time >= 12 && time < 18) return 'afternoon';
    if (time >= 18 && time < 22) return 'evening';
    return 'night'
}


/**
 * This function will give back the time thats between 
 * the date string given and the current date & time.
 * @param {String} date 
 */
export function getPassedTime(dateString) {
    if (dateString === 'Not studied yet.') {
        return 'Not studied yet.';
    }
    const parts = dateString.split(/[/ :]/);
    const date = new Date(parts[2], parts[1] - 1, parts[0], parts[3], parts[4]);

    const now = new Date();
    const passedTime = now - new Date(date);
    
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day; 
    const year = 365 * day;

    if (passedTime < minute) {
        return 'now'
    }
    if (passedTime < hour) {
        return `Last studied ${Math.floor(passedTime / minute)}m ago`;
    } else if (passedTime < day) {
        return `Last studied ${Math.floor(passedTime / hour)}h ago`;
    } else if (passedTime < week) {
        return `Last studied ${Math.floor(passedTime / day)}d ago`;
    } else if (passedTime < month) {
        return `Last studied ${Math.floor(passedTime / week)}w ago`;
    } else if (passedTime < year) {
        return `Last studied ${Math.floor(passedTime / month)}mo ago`;
    } else {
        return `Last studied ${Math.floor(passedTime / year)}y ago`;
    }
}


export function getMinutesDifference(startDate, endDate) {
    // Calculate the difference in milliseconds
    const diffInMs = endDate - startDate;

    // Convert milliseconds to minutes
    const diffInMinutes = diffInMs / (1000 * 60);

    // Return the difference as an integer
    return Math.round(diffInMinutes);
}


export function greetBasedOnTime() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
        return "Good Morning";
    } 
    if (hour >= 12 && hour < 18) {
        return "Good Afternoon";
    } 
    if (hour >= 18 && hour < 24) {
        return 'Good Evening'
    } 
    else {
        return "Good Night";
    }
}