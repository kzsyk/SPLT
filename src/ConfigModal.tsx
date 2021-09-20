
import React, { useState, useEffect, useRef } from "react";
import { Modal } from "./Modal";
import styled from 'styled-components';
import { zIndexSearch } from './util'

const CustomModal = styled(Modal)`
    overlay: {
        position:"fixed";
        backgroundColor: "rgba(0, 0, 0, 0.3)";
        zIndex: ${zIndexSearch()}
    },
    content: {
        position:"fixed";
        top: 50%;
        left: 50%;
        marginRight: -50%;
        padding: 0;
        width:30%;
        height:auto;
        box-shadow: 0px 5px 5px -5px;
        backgroundColor: rgba(0, 0, 0, 0.7);
    };
`

type confModal = {
    children: JSX.Element;
    isOpen: boolean;
    color: string
}

export const ConfigModal = (props: confModal) => {

    const [isOpen, setIsOpen] = useState(props.isOpen)
    const [focusedElement, setIsfocusedElement] = useState<HTMLElement>(null)
    //モーダルの色の調整
    const color = props.color
    const func = (bool: boolean) => {
        setIsOpen(bool);
    }
    const ref = useRef(null);

    useEffect(() => {
        func(props.isOpen)
        if (props.isOpen) {
            setIsfocusedElement(document.activeElement as HTMLElement)
            ref.current.focus()
        }
    }, [props.isOpen])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (isOpen && e.key === "Escape") {
            e.preventDefault();
            console.log("Esc")
            func(false)
            e.stopPropagation();
        }
    }

    return (
        <div onKeyDown={(e) => handleKeyDown(e)} ref={ref} tabIndex={props.isOpen ? -1 : null}>
            <CustomModal
                isOpen={isOpen}
                width={isOpen ? "80%" : "0%"}
                height={isOpen ? "70vh" : "0%"}
                color={color}
            >
                {props.children}

            </CustomModal >
        </div >
    );
}