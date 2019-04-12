export const setTitle = title => () => document.title = title;
export const filterLink = (link) => {
    if (link) {
        if (link.indexOf('http') > -1) {
            return link
        } else {
            return 'https://'+link
        }
    } else {
        return
    }
}
export const filterDate = (da) => {
    let date = new Date(Number(da));
    let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let rq = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return date.getFullYear() + '.' + month + '.' + rq + ' ' + hour + ':' + min
}
