// The months and days in a hash 
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Get a date
const d = new Date();

// Date Element
console.log("Date: " + d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear()); 

// Day Element
console.log("Day: " + DAYS[d.getDay()]);

// Time Element

// Convert 24hr time to 12 hour time
const HOURS24 = d.getHours();
const IS_AM = (HOURS24 < 13);
const HOURS12 = (IS_AM) ? HOURS24 : HOURS24 - 12;
const AM_PM_STR = (IS_AM) ? "am" : "pm";
// Set to 24 hour
console.log("Time: " + HOURS12 + ":" + d.getMinutes() + AM_PM_STR);
