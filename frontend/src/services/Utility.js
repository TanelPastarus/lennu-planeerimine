export const convertHours = (minutes) => {
    const hours = Math.floor(minutes / 60);

    if (hours > 1) return hours + " hours";
    if (hours > 0) return 1 + " hour";
    return "";
}

export const hoursAndMinutes = (date) => {
    const convertedDate = new Date(date);
    let hours = convertedDate.getHours();
    let minutes = convertedDate.getMinutes();

    if (hours === 0) hours += "0";
    if (minutes === 0) minutes += "0";

    return hours + ":" + minutes;
}

export const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};