
import React, { useRef, useState, useEffect, useMemo,useCallback } from "react";
import { getCaretPos } from './logics/utils'
import DomInspector from 'dom-inspector';
import styled from 'styled-components';
import { useGlobalState } from "./Context"
import { focusStore } from "./logics/FocusController"

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
    text-align: left;
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
    let listRef = useRef([]);
    const areaRef = useRef(null);
    const [textData, getTextData] = useState<TextData>({
        sumWord: 0,
        length: 0
    });
    const global = useGlobalState()

    let globalSplitWords = useMemo(()=>!!global.splitWords?global.splitWords:[""],[global.splitWords])
    const [rawText, setRawText] = useState<string>(null);
    const [text, setText] = useState<string[]>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    let sentence = text ? text.map((result, index) => {
        //const getColor = () => Math.floor(Math.random() * 255)
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
            onBlur={(e) => blur(e)}
            onFocus={(e) => focus(e, listRef.current[index].current)}

            contentEditable={isEdit}
            suppressContentEditableWarning={true}
            blurFontColor={global.color?global.color["fontColor"]:"gray"}
            focusFontColor={global.color?global.color["highlight"]:"black"}
            shadow={global.color?global.color["shadow"]:"gray"}
        >
            {result}
        </Pstyle >
    }) : <p>no</p>

    useEffect(() => {
        const currentText = document.getElementById("spltText").innerText
        const split = splitText(currentText)
        setText(split)
    }, [])

    useEffect(() => {
        if(rawText){
            setText(splitText(rawText))

        }
    }, [rawText])

    useEffect(() => {
        if (globalSplitWords) {
            const currentText = document.getElementById("spltText").innerText
            setText(splitText(currentText))
        }
    }, [globalSplitWords])

    useEffect(() => {
        if (text) {
            getTextData({ sumWord: text.join(',').length, length: text.length })
            text.forEach((_, i) => {listRef.current[i] = React.createRef();})
            areaRef.current.focus();
            sentence = text ? text.map((result, index) => {
                listRef.current[index] = React.createRef();
                //const getColor = () => Math.floor(Math.random() * 255)
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
                    onBlur={(e) => blur(e)}
                    onFocus={(e) => focus(e, listRef.current[index].current)}
        
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                    blurFontColor={global.color?global.color["fontColor"]:"gray"}
                    focusFontColor={global.color?global.color["highlight"]:"black"}
                    shadow={global.color?global.color["shadow"]:"gray"}
                >
                    {result}
                </Pstyle >
        }) 
        : <p>no</p>
        }
    }, [text])


    useEffect(() => {
        chrome.runtime.onMessage.addListener(async(request, sender, sendResponse) => {
            sendResponse()
            if (request.message === 'select') {
                if (!request.text) {
                    await selectDom()
                } else {
                    const text = rawText
                    setText(splitText(text))
                    getTextData({ ...textData, sumWord: text.length })
                }
            } else if (request.message === 'paste') {
                if (navigator.clipboard) {
                    const pasteArea = document.createElement("textarea");
                    pasteArea.focus();
                    navigator.clipboard.readText()
                        .then(function (text) {
                            pasteArea.textContent = text;
                            setText(splitText(pasteArea.textContent))
                            setRawText(pasteArea.textContent)
                            getTextData({ ...textData, sumWord: text.length })
                            updateState(true)
                            if(listRef.current[0].current){
                                listRef.current[0].current.focus()
                            }
                        });
                        
                    if(pasteArea.parentNode) pasteArea.parentNode.removeChild(pasteArea)
                             
                } else {
                    alert("cannot use clipboard in this browser")
                }
            }
            return true
        })
    }, []);

    const splitText = useCallback((text: string) => {
        const splitSymbol = "(?<=[" + globalSplitWords.join("") + "])";
        const reg = new RegExp(splitSymbol, "igu")
        const sendText = text ? text : document.getElementById('spltText').innerText;
        const splitList = sendText.split(reg)
        return splitList
    },[globalSplitWords])


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
    },[setIsEdit])

    const blur =useCallback((e) => {
        e.preventDefault()
        callbackEdit(false, null, 0)
    },[callbackEdit])

    const focus = useCallback((e, ref) => {
        e.preventDefault()
        if(ref){
            const bottom: number = ref.getBoundingClientRect().top + window.pageYOffset;
            focusStore(ref)
            if (bottom > 500) {
                ref.scrollIntoView({
                    block: 'center',
                    behavior: "smooth"
                });
            }
        }
    },[focusStore])

    const click = useCallback((e, ref) => {
        if(!isEdit){
            e.preventDefault()
            callbackEdit(true,ref.current,0);
        }
    },[callbackEdit])

    const focusSentence = useCallback((ref, select: number) => {
        if(!ref.current[select]) return
        const currentDom = ref.current[select]
        if (currentDom) {
            currentDom.current.focus()
            const bottom: number = currentDom.current.getBoundingClientRect().top + window.pageYOffset
            if (bottom > 500) {
                currentDom.current.scrollIntoView({
                    block: 'center',
                    behavior: "smooth"
                });
            }
        }
    },[])


    const handleKeyDown = useCallback((e, i, ref) => {
        if (e.key === "ArrowRight") {
            if(isEdit){
                const pos = getCaretPos()
                const count: number = ref.current[i].current.innerText.length
                if(pos===count){
                    focusSentence(ref, i + 1);
                    if (ref.current[i + 1]) {
                        callbackEdit(true, ref.current[i + 1].current, 0);                    
                    }
                }
            }else{
                e.preventDefault();
                if (i === null) {
                    focusSentence(ref, 0);
                } else {
                    focusSentence(ref, i + 1);  
                }
                e.stopPropagation();
            }
        }

        if (e.key === "ArrowLeft") {
            if(isEdit){
                const pos = getCaretPos()
                if (pos === 0){
                    
                    focusSentence(ref, i - 1);
                    if (ref.current[i - 1]) {
                        callbackEdit(true,
                            ref.current[i - 1].current,
                            ref.current[i - 1].current.innerText.length);
                    }
                }
            }else{
                e.preventDefault();
                if (i === null) {
                    focusSentence(ref, 0);
                } else {
                    focusSentence(ref, i - 1);
                }
            }
        }

        if (e.key === "Escape") {
            e.preventDefault();
            updateState(false)
        }

        if (e.key === "Enter") {
            if (!isEdit) {
                e.preventDefault();
                callbackEdit(true, ref.current[i].current, 0)
                e.stopPropagation();
            }
        }
    },[isEdit]);

    const selectDom = async() => {
        let isCanceled = false
        let isSelected = false
        const inspector = new DomInspector();
        inspector.enable()
        document.addEventListener("keyup",  function cancel(e) {
            if(isSelected) {
                document.removeEventListener("keyup", cancel, false);
                return true
            }
            if (e.key==="Escape") {
                document.removeEventListener("keyup", cancel, false);
                inspector.disable();
                inspector.destroy();
                isCanceled = true
                return true
            }
        })
        
        document.addEventListener("click", async function select(e) {
            if(isCanceled) {
                document.removeEventListener("click", select, false);
                return true
            }
            isSelected = true
            const elm = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement
            const domText = elm.innerText
            setRawText(domText)
            //　*** splitword error ***
            inspector.disable()
            inspector.destroy()
            updateState(true)
            if(listRef.current[0].current){
                listRef.current[0].current.focus()
            }
            document.removeEventListener("click", select, false);
        })
        return true   
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