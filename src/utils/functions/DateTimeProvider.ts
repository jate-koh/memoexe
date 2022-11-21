
export function getDateSecond(): string {
    return Math.floor( Date.now() / 1000).toString();
}

export function getCurrentFormatDate(): string {
    var today = new Date();

    var date = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();

    
    /* Format Date */
    var dd = '';
    var mm = '';
    if(date < 10)   dd = '0' + date.toString();
    else            dd = date.toString();
    if(month < 10)  mm = '0'+ month.toString();
    else            mm = month.toString();


    /* Format Time */
    var hrs = '';
    var min = '';
    var sec = '';
    if(hours < 10)    hrs = '0' + hours.toString();
    else              hrs = hours.toString();
    if(minutes < 10)  min = '0' + minutes.toString();
    else              min = minutes.toString();
    if(seconds < 10)  sec = '0' + seconds.toString();
    else              sec = seconds.toString();

    var time = hrs + ':' + min + ':' + sec;
    
    return `${year}/${mm}/${dd} ${time}`;
    
}