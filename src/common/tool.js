import Item from "antd-mobile/lib/popover/Item";

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

export const getQuery = (query, key) => {
    // let query = 'userId=72173081274&token=dsads'
    let new_arr = []
    if (query && query.indexOf('&') > -1) { // 多个参数拼接
        let arr = query.split('&');
        arr.forEach(item => {
            let ele = item.split('=');
            let obj = {}
            obj[ele[0]] = ele[1];
            new_arr.push(obj)
        })
        let selected = new_arr.filter(item => {
            for (let k in item) {
                return k === key
            }
        })
        return selected[0][key]
    } else {
        return query.split('=')[1]
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

export const getSimpleText = (html) => {
    var re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
    var msg = html.replace(re1,'');//执行替换成空字符
    return msg;
}

export const transformTime = (str) => {
    let arr = new Date(parseInt(str)).toString().split(' ');
    let year = arr[3];
    let day = arr[2];
    let time = arr[4];
    let month = '';
    switch (arr[1]) {
        case "Jan":
            month = '01月'; 
        break;
        case "Feb":
            month = '02月'; 
        break;
        case "Mar":
            month = '03月';
        break;
        case "Apr":
            month = '04月';
        break;
        case "May":
            month = '05月';
        break;
        case "Jun":
            month = '06月';
        break;
        case "Jul":
            month = '07月';
        break;
        case "Aug":
            month = '08月';
        break;
        case "Sep":
            month = '09月';
        break;
        case "Oct":
            month = '10月';
        break;
        case "Nov":
            month = '11月';
        break;
        case "Dec":
            month = '12月';
        break;
        default:
        break
    }
    return year + '年' + month + day + '日 ' + time; 
}
