export const splitText = (text: string, splitWords: string[]) => {
    console.log(splitWords)
    const words: string[] = splitWords ? splitWords as string[] : [""]
    const splitSymbol = "(?<=[" + words.join("") + "])";
    const reg = new RegExp(splitSymbol, "igu")
    const sendText = text ? text : document.getElementById('spltText').innerText;
    const splitList = sendText.split(reg)
    return splitList
}

