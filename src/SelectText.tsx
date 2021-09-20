
import React, { useRef, useState, useEffect, useCallback } from "react";
import { splitText } from './splitText'
import { getCaretPos } from './util'
import DomInspector from 'dom-inspector';
import styled from 'styled-components';
import { useGlobalState } from "./Context"
import { focusStore } from "./FocusController"

type TextComponent = {
    height: number;
    fontSize: number;
    fontWeight: number;
    font: string;
}

type PtextColor = {
    blurFontColor: string;
    focusFontColor: string;
    shadow: string;
}

type TextData = {
    sumWord: number;
    length: number;
}

const Pstyle = styled.div<PtextColor>`
    position: relative;
    display: inline;
    white-space: pre-wrap;
    overflow-wrap: word-wrap;
    color:${props => props.blurFontColor};
    &:selection { 
        background-color:${props => props.color};
        border: 1px 1px 1px 1px rgba(0,0,0,0.5);
        box-sizing: content-box;
    };
    &:focus {
        outline: none;
        color:${props => props.focusFontColor};
        box-shadow: 0px 5px 5px -5px ${props => props.shadow};
    };
`

const TextRenderArea = styled.div<TextComponent>`
    position: relative;
    white-space: pre-wrap;
    overflow-wrap: word-wrap;
    margin:5%;
    background-color:${props => props.color};
    line-height: ${props => props.height};
    font-size: ${props => props.fontSize + "px"};
    font-family: ${props => props.font};
    font-weight: ${props => props.fontWeight};
    outline: none;
`


export const SelectText: React.VFC<{ updateState: ((isState: boolean) => void) }> = ({ updateState }) => {
    const listRef = useRef([]);
    const areaRef = useRef(null);
    const [textData, getTextData] = useState<TextData>({
        sumWord: 0,
        length: 0
    });
    const global = useGlobalState()
    let globalSplitWords = global.splitWords
    const [splitWords, getSplitWords] = useState<string[]>(globalSplitWords);
    const [rawText, setRawText] = useState<string>(null);
    const [text, setText] = useState<string[]>(null);
    const [isEdit, setIsEdit] = useState(false);

    const setTextOnce = useCallback((text: string[]) => {
        text ? setText(text) : null

    }, [])

    const setSplitWords = useCallback((value) => {
        value ? getSplitWords(value) : null
    }, [])

    useEffect(() => {
        if (globalSplitWords) {
            setSplitWords(globalSplitWords)
            const currentText = document.getElementById("spltText").innerText
            const split = splitText(currentText, globalSplitWords)
            setTextOnce(split)
        }
    }, [globalSplitWords])

    useEffect(() => {
        if (text) {
            console.log("text change")
            text.forEach((_, i) => {
                listRef.current[i] = React.createRef();
            })
            getTextData({ sumWord: text.join(',').length, length: text.length })
            areaRef.current.focus();
            sentence = text ?
                text.map((result, index) => {
                    const getColor = () => Math.floor(Math.random() * 255)
                    /* 
                    const style = {
                        color: `rgb(${getColor()},${getColor()},${getColor()})`,
                    }
                    */
                    return <Pstyle
                        key={String(index)}
                        ref={listRef.current[index]}
                        tabIndex={isEdit ? 1 : 0}
                        //style={style}
                        data-index={index}
                        onKeyDown={(e) => handleKeyDown(e, index, listRef)}
                        onClick={(e) => click(e, listRef.current[index])}
                        onMouseDown={(e) => click(e, listRef.current[index])}
                        onBlur={(e) => blur(e, index, listRef.current[index].current)}
                        onFocus={(e) => focus(e, index, listRef.current[index].current)}

                        contentEditable={isEdit}
                        suppressContentEditableWarning={true}
                        blurFontColor={global.color["fontColor"]}
                        focusFontColor={global.color["highlight"]}
                        shadow={global.color["shadow"]}
                    >
                        {result}
                    </Pstyle >
                }) : <p>no</p>
        }
    }, [text])


    useEffect(() => {
        chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
            sendResponse()
            console.log(request)
            if (request.message === 'select') {
                if (!request.text) {
                    await editText()
                } else {
                    const text = rawText
                    console.log(text)
                    const split = splitText(text, splitWords)
                    setTextOnce(split)
                    getTextData({ ...textData, sumWord: text.length })
                }
            } else if (request.message === 'paste') {
                if (navigator.clipboard) {
                    const pasteArea = document.createElement("textarea");
                    pasteArea.focus();
                    navigator.clipboard.readText()
                        .then(function (text) {
                            pasteArea.textContent = text;
                            const textContent = pasteArea.textContent
                            console.log(text)
                            const split = splitText(textContent, splitWords)
                            setTextOnce(split)
                            getTextData({ ...textData, sumWord: text.length })
                            updateState(true)
                        });
                    pasteArea.parentNode.removeChild(pasteArea);
                } else {
                    alert("cannot use clipboard in this browser")
                }
            }
            return true
        })
        console.log(listRef)
    }, []);



    let sentence =
        text ?
            text.map((result, index) => {
                const getColor = () => Math.floor(Math.random() * 255)
                /* 
                const style = {
                    color: `rgb(${getColor()},${getColor()},${getColor()})`,
                }
                */
                return <Pstyle
                    key={String(index)}
                    ref={listRef.current[index]}
                    tabIndex={isEdit ? 1 : 0}
                    //style={style}
                    data-index={index}
                    onKeyDown={(e) => handleKeyDown(e, index, listRef)}
                    onClick={(e) => click(e, listRef.current[index])}
                    onMouseDown={(e) => click(e, listRef.current[index])}
                    onBlur={(e) => blur(e, index, listRef.current)}
                    onFocus={(e) => focus(e, index, listRef.current[index].current)}

                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                    blurFontColor={global.color["fontColor"]}
                    focusFontColor={global.color["highlight"]}
                    shadow={global.color["shadow"]}
                >
                    {result}
                </Pstyle >
            }) : <p>no</p>

    const callbackEdit = useCallback((isEditNow: boolean, ref, startPos: number) => {
        setIsEdit(isEditNow);
        if (ref && isEditNow) {
            if (window.getSelection() && window.getSelection().rangeCount > 0) {
                const sel = window.getSelection()
                const range = document.createRange()
                range.setStart(ref.firstChild, (startPos === 0) ? 0 : startPos)
                range.collapse(true)
                sel.removeAllRanges()
                sel.addRange(range)
            } else {
                return
            }
        }
    }, [isEdit])

    const blur = useCallback((e, i: number, ref) => {
        e.preventDefault()
        callbackEdit(false, ref, 1);

    }, [isEdit])

    const focus = useCallback((e, i: number, ref) => {
        e.preventDefault()
        const bottom: number = ref.getBoundingClientRect().top + window.pageYOffset;
        focusStore(ref)
        if (bottom > 500) {
            ref.scrollIntoView({
                block: 'center',
                behavior: "smooth"
            });
        }
    }, [isEdit])

    const click = useCallback((e, ref) => {
        if (e.type === 'click') {
            e.preventDefault()
            setIsEdit(true)
            ref.current.focus()
        }
    }, [isEdit])

    const memo = (ref, select: number) => {
        if (ref.current[select]) {
            ref.current[select].current.focus()
            //selectionShift(select)
            console.log("select:" + select)
            const bottom: number = ref.current[select].current.getBoundingClientRect().top + window.pageYOffset
            if (bottom > 500) {
                ref.current[select].current.scrollIntoView({
                    block: 'center',
                    behavior: "smooth"
                });
            }
        }
    }

    const handleKeyDown = useCallback((e, i, ref) => {
        const pos = getCaretPos()
        const count: number = ref.current[i].current.innerText.length
        const isRightShift = (pos === count) ? true : false
        const isLeftShift = (pos === 0) ? true : false

        if (isRightShift) {
            if (e.key === "ArrowRight") {
                memo(ref, i + 1);
                if (ref.current[i + 1]) {
                    callbackEdit(true, ref.current[i + 1].current, 0);
                }
            }
        }

        if (isLeftShift) {
            if (e.key === "ArrowLeft") {
                memo(ref, i - 1);
                if (ref.current[i - 1]) {
                    callbackEdit(true,
                        ref.current[i - 1].current,
                        ref.current[i - 1].current.innerText.length);
                }
            }
        }

        if (isEdit === false) {
            if (e.key === "ArrowRight") {
                e.preventDefault();

                if (i === null) {
                    memo(ref, 0);
                } else {
                    memo(ref, i + 1);
                    //selectionShift(Math.min(textData.length - 1, selection + 1));
                    console.log("move right")
                }
                console.log(ref.current[i].current.innerText.length)
                e.stopPropagation();
            }
            if (e.key === "ArrowLeft") {
                e.preventDefault();

                if (i === null) {
                    memo(ref, 0);
                } else {
                    memo(ref, i - 1);
                }
                console.log(ref.current[i].current.innerText.length)
            }
        }

        if (e.key === "Escape") {
            e.preventDefault();
            console.log("Esc")
            updateState(false)
        }

        if (e.key === "Enter") {
            if (!isEdit) {
                e.preventDefault();
                callbackEdit(true, ref.current[i].current, 0)
                console.log(isEdit)
                e.stopPropagation();
            }
        }
    }, [isEdit]);

    const editText = async () => {
        const inspector = new DomInspector();
        inspector.enable()
        document.addEventListener("click", async function domselect(e) {
            const elm = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement
            const domText = elm.innerText
            setRawText(domText)
            const textArray =
                splitText(domText, splitWords)
            if (textArray.length === 0) {
                alert("This is not textContent dom. Or width size is not enough");
                inspector.disable();
                inspector.destroy();
            } else {
                setTextOnce(textArray)
                inspector.disable()
                inspector.destroy()
                updateState(true)
            }
            document.removeEventListener("click", domselect, false);
        });
        return true;
    }

    return <TextRenderArea
        ref={areaRef}
        tabIndex={-1}
        fontSize={global.fontSize as number}
        height={global.height as number}
        font={global.font as string}
        fontWeight={global.fontWeight as number}
    >
        <div id="spltText">
            {sentence}
        </div>
    </TextRenderArea >

};