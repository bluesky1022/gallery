export const timedelta = (datetime: Date): string => {
    const currentDatetime = new Date();
    const delta = currentDatetime.getTime() - datetime.getTime();

    const oneMinute = 60 * 1000;
    const oneHour = 60 * oneMinute;
    const oneDay = 24 * oneHour;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;

    if (delta < oneMinute) return "just now";
    if (delta < oneHour) return `${Math.floor(delta / oneMinute)} minutes ago`;
    if (delta < oneDay) return `${Math.floor(delta / oneHour)} hours ago`;
    if (delta < oneWeek) return `${Math.floor(delta / oneDay)} days ago`;
    if (delta < oneMonth) return `${Math.floor(delta / oneWeek)} weeks ago`;

    return `${Math.floor(delta / oneDay)} days ago`;
}