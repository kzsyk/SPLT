import React, { useRef, useEffect,useMemo, useState, useCallback } from "react";
import styled from 'styled-components';
import { MAX_Z_INDEX } from './logics/utils'
import { ScrollBar } from './ScrollBar';

type modalType = {
    children?: JSX.Element;
    isOpen: boolean;
    width: string;
    height: string;
    color: string;
}

const ModalStyle = styled.div<modalType>`
    position: fixed;
    background-color: ${props => props.color};
    visibility: ${props => props.isOpen ? "visible" : "hidden"};
    width: ${props => props.width || "100px"};
    height:${props => props.height || "100px"};
    margin:0% 10% 1% 10%;
    display: flex;
    flex-direction: column;

    overflow-y: hidden;
    overflow-x: hidden;
    will-change: transform;
    
    z-index: ${props => props.isOpen ? MAX_Z_INDEX : 0};
    opacity: ${props => props.isOpen ? 1 : 0};
`

export const Modal: React.FC<modalType> = (props: modalType) => {
    const { isOpen, width, height }: modalType = {
        ...props
    }
    const color = useMemo(()=>props.color,[props]);
    //const shadow = global.shadow];
    const ref = useRef(null);
    const [autoFocus, setAutoFocus] = useState(isOpen)

    const isOpenModal = useCallback((isOpen: boolean) => {
        setAutoFocus(isOpen)
    },[setAutoFocus])

    useEffect(() => {
        isOpenModal(props.isOpen)
        if (props.isOpen) {
            ref.current.focus()
        } else {
            ref.current.blur()
        }
    }, [props.isOpen])

    return (
        <ModalStyle
            ref={ref}
            isOpen={autoFocus}
            width={width}
            height={height}
            color={color}
        >
            <ScrollBar>
                {props.children}
            </ScrollBar>
        </ModalStyle>
    )
}