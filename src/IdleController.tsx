
import React, { useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import styled, { keyframes } from 'styled-components';

import { zIndexSearch } from './util'

type IdleController = {
    isOpen: boolean;
}

const fadeIn = keyframes`
  from {
    opacity:0
  }
  to {
    opacity:1
  }
`;

const fadeOut = keyframes`
  from {
    opacity:1
  }
  to {
    opacity:0
  }
`;

const FadeIn = styled.div`
  bottom:
  animation: ${fadeIn} 4.0s ease-in-out;
`;

const FadeOut = styled.div`
  animation: ${fadeOut} 1.5s ease-in-out;
`;

type UpperModal = {
    idle: boolean;
    isOpen: boolean;
}


const UpperModal = styled.div<UpperModal>`
    position:fixed;
    display: flex;
    top:0;
    width:80%;
    height:20vh;
    margin:0 10% 0 10%;
    background-color:rgba(240,240,240,.7);
    z-index: ${props => props.idle && props.isOpen ? zIndexSearch() + 100 : 0};
    border-radius:.2em;
    box-shadow: 0px 1px 1px -1px black;
    visibility: ${props => props.idle && props.isOpen ? "visible" : "hidden"};
    justify-content: center;
    overflow-x: hidden;
    overflow-y: hidden;
`;

const Blocks = styled.div`
    color:black;
    width:15%; 
    display:blocks;
    font:12px;
    margin:1% 3% 1% 3%;
`;


export const IdleController: React.VFC<IdleController> = (props) => {
    const isOpen = props.isOpen
    const timeout = 5000 //5秒
    const [remaining, setRemaining] = useState(timeout)
    const [elapsed, setElapsed] = useState(0)
    const [isIdle, setIsIdle] = useState(false)

    const handleOnActive = () => setIsIdle(false)
    const handleOnIdle = () => setIsIdle(true)

    const handleOnAction = event => {
        //console.log('user did something', event)
    }

    const {
        getRemainingTime,
        getLastActiveTime,
        getElapsedTime
    } = useIdleTimer({
        timeout: 3000,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
        onAction: handleOnAction,
        debounce: 500
    })

    const Text = () => {
        return (
            <UpperModal idle={isIdle} isOpen={isOpen}>
                <Blocks>
                    <ul>
                        <strong>Text select</strong>
                        <br />
                        <br />
                        <li>click text</li>
                        <li>[Tab] key</li>
                    </ul>
                </Blocks>
                <Blocks>
                    <ul>
                        <strong>To next sentence</strong>
                        <br />
                        <br />
                        <li>[Tab] key</li>
                        <li>[Right arrow key] (→)</li>
                    </ul>
                </Blocks>
                <Blocks>
                    <ul>
                        <strong>Back previous sentence</strong>
                        <br />
                        <br />
                        <li>[Shift] key + [Tab] key </li>
                        <li>[Left arrow key] (←)</li>
                    </ul>
                </Blocks>
                <Blocks>
                    <ul>
                        <strong>Edit Sentence</strong>
                        <br />
                        <br />
                        <li>Click text</li>
                        <br />
                        ※ When text is focused
                        <li>[Enter]</li>
                    </ul>
                </Blocks>
            </UpperModal >
        )
    }

    return (
        <>
            {isIdle
                ?
                <FadeIn>
                    <Text />
                </FadeIn >
                :
                <FadeOut>
                    <Text />
                </FadeOut>
            }
        </>
    )
}