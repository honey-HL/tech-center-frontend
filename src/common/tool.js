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

