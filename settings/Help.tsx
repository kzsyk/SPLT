
import React from 'react'
import styled from 'styled-components';


const HelpContainer = styled.div`
    display:flex;
`

const Blocks = styled.div`
    position:relative;
    color:black;
    width:50vw; 
    font-size: 1em;
    margin:1% 1% 1% 1%;
`;

export const Help: React.VFC = () => {
    return (
        <HelpContainer>
            
            <Blocks>      
                <strong>Text select</strong>
                <li>click text</li>
                <li>[Tab] key</li>
                <br />        
            </Blocks>

            <Blocks>
                <strong>Go next sentence</strong>
                <li>[Tab]</li>
                <li>[→] (Right arrow) </li>
                <br />
            </Blocks>
            <Blocks>
                <strong>Go Back sentence</strong>
                <li>[Shift] + [Tab]</li>
                <li>[←] (Left arrow)</li>
                <br />
            </Blocks>
            <Blocks>
                <strong>Edit Sentence</strong>
                <li>Click sentence</li>
                1. When text is focused
                <li>[Enter]</li>
                <br />
            </Blocks>
            <Blocks>
                <strong>Close</strong>
                <br />
                1. Select text 
                <li>[Esc] key</li>
                <br />
            </Blocks>   
        </HelpContainer >  
    )
}

