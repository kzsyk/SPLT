
export const splitText = (text: string, splitWords: string[]) => {
    const splitSymbol = "(?<=[" + splitWords.join("") + "])";
    const reg = new RegExp(splitSymbol, "igu")
    const sendText = text ? text : document.getElementById('spltText').innerText;
    const splitList = sendText.split(reg)
    console.log(splitWords)
    return splitList
}


