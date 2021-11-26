import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton } from "@material-ui/core";
import { zIndexSearch } from './util';

const useStyles = makeStyles({
    root: {
        width: "1%", height: "2%", position: "fixed", zIndex: zIndexSearch() + 200, color: "black"
    },
    ExitButton: {
        position: "fixed", opacity: 0.1, left: "1%", top: "10px", margin: "1%"
        ,"&:hover, &:focus":{
            opacity: 1.0
        }
    }
})

export const ExitButton:React.VFC<{ cancel:() =>void }> = ({ cancel })=>{
    const classes = useStyles();
    return (
            <IconButton
                color="primary"
                component="span"
                tabIndex={open ? -1 : null}
                onClick={() => {
                    cancel();
                }}
                className={classes.ExitButton}
            >
                 <CancelIcon aria-label="close" />
            </IconButton>
    )
}