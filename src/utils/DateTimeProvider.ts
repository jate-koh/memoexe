
export function getDateSecond(): string {
    return Math.floor( Date.now() / 1000).toString();
}

export function getFormatDate(): string {
    var today = new Date();

    var date = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    var time = today.getHours().toString() + ':' + today.getMinutes().toString() + ':' + today.getSeconds().toString();

    var dd = '';
    var mm = '';

    if(date < 10) {
        dd = '0' + date.toString();
    }
    else {
        dd = date.toString();
    }

    if(month < 10) {
        mm = '0'+ month.toString();
    }
    else {
        mm = month.toString();
    }

    return `${year}/${mm}/${dd} ${time}`;

}