export function getDateSecond(): string {
    return Math.floor(Date.now() / 1000).toString();
}

export function getCurrentFormatDate(): string {
    const today = new Date();

    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    /* Format Date */
    let dd = '';
    let mm = '';
    if (date < 10) dd = `0${date.toString()}`;
    else dd = date.toString();
    if (month < 10) mm = `0${month.toString()}`;
    else mm = month.toString();

    /* Format Time */
    let hrs = '';
    let min = '';
    let sec = '';
    if (hours < 10) hrs = `0${hours.toString()}`;
    else hrs = hours.toString();
    if (minutes < 10) min = `0${minutes.toString()}`;
    else min = minutes.toString();
    if (seconds < 10) sec = `0${seconds.toString()}`;
    else sec = seconds.toString();

    const time = `${hrs}:${min}:${sec}`;

    return `${year}/${mm}/${dd} ${time}`;
}
