import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import styled from 'styled-components';
import { zIndexSearch } from './util'

const Popup = styled(PopupState)`
    z-index: ${zIndexSearch() + 2000};
    background-color: #FFF;
    margin: 0px;
    font-size: 14px;
    outline:none;
    width: 200px;
    color: #373a3c;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 250ms ease !important;
    position: relative;
`

export const ContextMenus = (props) => {
    const copyAndClipboard = () => {
        const text = document.getElementById('spltText').innerText;
        console.log(text)
        navigator.clipboard.writeText(text)
    }
    return (
        <Popup variant="popover" popupId="demo-popup-menu">
            {popupState => {
                const menuProps = bindMenu(popupState);
                return (
                    <>
                        <div {...bindTrigger(popupState)} >
                            {props.children}
                        </div>
                        <Menu
                            {...menuProps}
                            onContextMenu={event => {
                                event.preventDefault();
                            }}
                            onMouseDown={e => {
                                menuProps.onClose();
                            }}
                        >
                            <MenuItem onClick={() => {
                                copyAndClipboard()
                                popupState.close
                            }}>
                                Copy All Texts
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                                Help
                            </MenuItem>
                        </Menu>
                    </>
                );
            }}
        </Popup >
    );
}
