import React, { useState, useCallback, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import FocusLock from "react-focus-lock"

import { zIndexSearch, backfaceFixed } from './util'
import { SelectText } from "./SelectText"
import { Modal } from './Modal'
import { ConfigMenu } from "./ConfigMenu"
import { StyleContextProvider } from "./Context"
import { useGlobalState } from "./Context"

import {ExitButton} from "./ExitButton"
//import { NewWindow } from "./NewWindow"

type ModalBackground = {
    isOpen: boolean;
    backgroundColor: string
}

const Background = styled.div<ModalBackground>`
    background-color: ${props => props.backgroundColor};
    position:fixed;
    top:0;
    z-index: ${props => props.isOpen ? zIndexSearch() : 0};
    width:${props => props.isOpen ? "100vw" : "0vw"};
    height:${props => props.isOpen ? "100vh" : "0vh"};
    visibility: ${props => props.isOpen ? "visible" : "hidden"};
    overflow-x: hidden;
    will-change: transform;
`

export const ContentComponent: React.FC = () => {
    const [show, setShow] = useState(false)
    //const [isOpenNewWindow, setIsOpenNewWindow] = useState(false)
    const updateState = useCallback((isShow: boolean) => {
        setShow(isShow)
    }, [])
    /* 
    const windowOpen = (isOpen: boolean) => {
        setIsOpenNewWindow(isOpen)
    }
    */
    const global = useGlobalState()
    useMemo(() => {
        if (show) {
            backfaceFixed(true);
        } else {
            backfaceFixed(false);
        }
    }, [show]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Escape") {
            e.preventDefault();
            setShow(false)
        }
    }, [])

    return <>
            <Background
                isOpen={show}
                backgroundColor={global.color ? global.color["backgroundModal"]:"white"}
                onKeyDown={(e) => handleKeyDown(e)}
            >
                <FocusLock group={"background"} autoFocus={show}>
                <Modal
                    isOpen={show}
                    width={show ? "80%" : "0%"}
                    height={show ? "100vh" : "0%"}
                    color={global.color ? global.color["modal"]:"white"}
                >
                   
                    <SelectText
                        updateState={useMemo(() => updateState, [])}
                    />
                    
                </Modal>
                <ConfigMenu
                    isOpen={show}
                    /*
                     openTab={(isOpen: boolean) => {
                        windowOpen(isOpen)
                    }} 
                    */
                />
                <ExitButton 
                    cancel={()=>setShow(false)}
                />
                </FocusLock >
            </Background >
    </>
}

const Popup: React.FC = () => {
    return (
        <StyleContextProvider>
            <ContentComponent />
        </ StyleContextProvider>
    )

};


ReactDOM.render(<Popup />, document.body.insertBefore(document.createElement('div'), document.body.firstChild));