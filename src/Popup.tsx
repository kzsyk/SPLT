import React, { useState, useCallback, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import styled, { StyleSheetManager } from 'styled-components';
import FocusLock from "react-focus-lock"

import NewWindow from 'react-new-window'


import { zIndexSearch, backfaceFixed } from './util'
import { SelectText } from "./SelectText"
import { Modal } from './Modal'
import { ConfigMenu } from "./ConfigMenu"
import { StyleContextProvider } from "./Context"
import { useGlobalState } from "./Context"
import { IdleController } from "./IdleController"

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
`

export const ContentComponent: React.FC = () => {
    const [show, setShow] = useState(false)
    const [isOpenNewWindow, setIsOpenNewWindow] = useState(false)
    const updateState = useCallback((isShow: boolean) => {
        setShow(isShow)
    }, [])
    const Ref = useRef()

    const windowOpen = (isOpen: boolean) => {
        console.log(isOpenNewWindow)
        setIsOpenNewWindow(isOpen)
        console.log(isOpen)
    }

    const global = useGlobalState()
    useMemo(() => {
        if (show) {
            backfaceFixed(true);
        }
        else {
            backfaceFixed(false);
        }
    }, [show]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Escape") {
            e.preventDefault();
            console.log("Esc")
            setShow(false)
        }
    }, [])

    return <FocusLock group={"background"} autoFocus={show}>
        <Background
            isOpen={show}
            backgroundColor={global.color["backgroundModal"]}
            onKeyDown={(e) => handleKeyDown(e)}
        >
            <Modal
                isOpen={show}
                width={show ? "80%" : "0%"}
                height={show ? "100vh" : "0%"}
                color={global.color["modal"]}
            >
                <SelectText
                    updateState={useMemo(() => updateState, [])}
                />
            </Modal>
            <ConfigMenu
                isOpen={show}
                openTab={(isOpen: boolean) => {
                    windowOpen(isOpen)
                }}
            />
            {
                isOpenNewWindow
                    ?
                    <NewWindow onUnload={() => { console.log("a") }} copyStyles={false}>
                        <StyleSheetManager target={Ref.current}>
                            <div ref={Ref}>
                                <Popup />
                            </div>
                        </StyleSheetManager>
                    </NewWindow >

                    : null
            }
            <IdleController isOpen={show} />
        </Background >
    </FocusLock >
}

const Popup: React.FC = () => {
    return (
        < StyleContextProvider >
            <ContentComponent />
        </ StyleContextProvider>
    )

};

ReactDOM.render(<Popup />, document.body.insertBefore(document.createElement('div'), document.body.firstChild));
