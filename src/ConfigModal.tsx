
import React, { useState, useEffect, useRef } from "react";
import { Modal } from "./Modal";
import styled from 'styled-components';
import { zIndexSearch } from './util'

const CustomModal = styled(Modal)`
    overlay: {
        position:fixed;
        backgroundColor: rgba(0, 0, 0, 0.3);
        zIndex: ${zIndexSearch()};
        box-shadow: 0px 10px 10px -5px black;
        border-radius:.2em;
    },
    content: {
        position:fixed;
        top: 50%;
        left: 50%;
        marginRight: -50%;
        padding: 0;
        width:30%;
        height:auto;
    };
`

type confModal = {
    children: JSX.Element;
    isOpen: boolean;
    isClose: () => void;
    color: string;
}

export const ConfigModal = (props: confModal) => {

    const [isOpen, setIsOpen] = useState(props.isOpen)
    //モーダルの色の調整
    const color = props.color
    const setModalState = (bool: boolean) => {
        setIsOpen(bool);
    }
    const ref = useRef(null);

    useEffect(() => {
        setModalState(props.isOpen)
        if (props.isOpen) {
            ref.current.focus()
        }
    }, [props.isOpen])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (isOpen && e.key === "Escape") {
            e.preventDefault();
            setModalState(false)
            props.isClose()
            e.stopPropagation();
        }
    }

    return (
        <div onKeyDown={(e) => handleKeyDown(e)} ref={ref} tabIndex={props.isOpen ? -1 : null}>
            <CustomModal
                isOpen={isOpen}
                width={isOpen ? "80%" : "0%"}
                height={isOpen ? "80vh" : "0%"}
                color={color}
            >
                {props.children}

            </CustomModal >
        </div >
    );
}