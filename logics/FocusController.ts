
const list: HTMLElement[] = [];

export const focusStore = (ref) => {
    list.push(ref)
}

export const focusReturn = () => {
    return list.slice(-1)[0] ? list.slice(-1)[0].focus() : -1
}