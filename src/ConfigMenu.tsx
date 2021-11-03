import React, { useCallback, useEffect, useState, useRef } from "react";
import { ConfigModal } from './ConfigModal'
import Dropdown from './Dropdown'
import { zIndexSearch } from './util'
import { focusReturn } from './FocusController'

import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import SettingsIcon from '@material-ui/icons/Settings';
import DescriptionIcon from '@material-ui/icons/Description';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';

type configType = {
    isOpen: boolean;
    children?: JSX.Element;
}

const ConfigButton = styled.div<configType>`
    position: fixed;
    z-index: ${props => props.isOpen ? zIndexSearch() + 100 : null};
    visibility: ${props => props.isOpen ? "visible" : "hidden"};
    overflow: "hidden";
    margin: 0; 
    
`

const useStyles = makeStyles({
    root: {
        margin: "3% 0 0 0", width: "100% ", height: "70% ", position: "fixed", zIndex: zIndexSearch() + 200, color: "black"
    },
    button: {
        position: "fixed", opacity: 0.5, right: "10%", top: "10px", margin: "1%"
    },
    '&:hover': {
        opacity: 1.0,
    },
    button_second: {
        position: "fixed", opacity: 0.5, right: "10%", top: "60px", margin: "1%"
    },
    button_third: {
        position: "fixed", opacity: 0.5, right: "10%", top: "110px", margin: "1%"
    },
    button_fouth: {
        position: "fixed", opacity: 0.5, right: "10%", top: "160px", margin: "1%"
    },
    tips: {
        margin: "1%", zIndex: zIndexSearch() + 1000
    },
});


export const ConfigMenu: React.VFC<{ isOpen: boolean }> = ({ isOpen }) => {
    const [isConfigOpen, setIsConfigOpen] = useState<boolean>(isOpen)
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [helpOpen, setHelpOpen] = useState<boolean>(false)
    const open = isOpen

    const setConfigOpen = useCallback(() => {
        setIsConfigOpen(prev => !prev);
        focusReturn()
    }, [])

    const handleClose = useCallback(() => {
        setDialogOpen(false);
        setHelpOpen(false);
    }, []);

    const copyAndClipboard = useCallback(() => {
        const text = document.getElementById('spltText').innerText;
        navigator.clipboard.writeText(text)
        setDialogOpen(true)
        focusReturn()
    }, [])


    const showHelp = useCallback(() => {
        setHelpOpen(true)
        focusReturn()
    }, [])

    const renewRef = useRef(null)

    const onClickRenew = () => {
        renewRef.current.autoRenew();
        focusReturn()
    };

    useEffect(() => {
        if (!open) {
            setIsConfigOpen(false)
        }
    }, [open])

    return (

        <div>
            <ConfigButton
                isOpen={open}
                tabIndex={open ? -1 : null}
            >
                <IconButton
                    color="primary"
                    component="span"
                    onClick={() => {
                        setConfigOpen();
                    }}
                    className={classes.button}
                >

                    {
                        isConfigOpen
                            ? <Tooltip className={classes.tips} title={"config"}>
                                <CloseIcon aria-label="close" />
                            </Tooltip>
                            : <Tooltip className={classes.tips} title={"config"}>
                                <SettingsIcon aria-label="config" />
                            </Tooltip>
                    }

                </IconButton>
            </ConfigButton >

            <ConfigModal isOpen={isConfigOpen} color="rgba(240,240,240,.9)">
                <Dropdown isOpen={open} ref={renewRef} />
            </ConfigModal>

            <ConfigButton className={classes.button_second} isOpen={open} tabIndex={open ? -1 : null}>
                <IconButton
                    color="primary"
                    component="span"
                    onClick={() => {
                        onClickRenew()
                    }}>
                    <Tooltip
                        className={classes.tips} title={"load saved data"}>
                        <AutorenewIcon aria-label="AutorenewIcon" />
                    </Tooltip>
                </IconButton>
            </ConfigButton >

            <ConfigButton className={classes.button_third} isOpen={open} tabIndex={open ? -1 : null}>
                {!isConfigOpen ?
                    <IconButton
                        color="primary"
                        component="span"
                        onClick={() => {
                            copyAndClipboard()
                        }}>
                        <Tooltip className={classes.tips} title={"Clip Board"}>
                            <DescriptionIcon
                                aria-label="clipboard" />
                        </Tooltip>
                    </IconButton>
                    : null
                }
            </ConfigButton >
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={dialogOpen}>
                <DialogTitle id="simple-dialog-title">
                    [Success] copy full text
                </DialogTitle>
            </Dialog>

            {/* 
            <ConfigButton className={classes.button_fouth} isOpen={open} tabIndex={open ? -1 : null}>
                {!isConfigOpen ?
                    <IconButton
                        color="primary"
                        component="span"
                        onClick={() => {
                            showHelp()
                        }}>
                        <Tooltip className={classes.tips} title={"Help"}>
                            <HelpOutlineIcon 
                                aria-label="Help" />
                        </Tooltip>
                    </IconButton>
                    : null
                }

            </ConfigButton > 
        
           
            {/* 
            <Dialog onClose={handleClose} aria-labelledby="simple-help-title" open={helpOpen}>
                <DialogTitle id="simple-help-title">
                    <Help/>
                </DialogTitle>
            </Dialog>
        */}

        </div >
    )
}