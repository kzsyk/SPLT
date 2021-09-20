
const list: HTMLElement[] = [];

export const focusStore = (ref) => {
    list.push(ref)
}

export const focusReturn = () => {
    console.log(list.slice(-1)[0])
    return list ? list.slice(-1)[0].focus() : null
}