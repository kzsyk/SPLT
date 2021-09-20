import React, { useContext, useReducer } from "react"
import { reducerFunc, storage } from "./reducer"
export type StyleState = typeof storage

interface StyleAction {
    payload: {
        fontSize: number,
        height: number,
        font: string,
        color: {
            fontColor: string,
            modal: string,
            highlight: string,
            shadow: string,
            backgroundModal: string,
        },
        fontWeight: number,
        splitWords: string[]
    },
    type: 'SET_STYLE'
}

const dispatchContext = React.createContext((() => true) as React.Dispatch<StyleAction>)

const StyleContext = React.createContext(storage)

export const StyleContextProvider: React.FC = (props) => {
    const [state, dispatch] = useReducer(reducerFunc, storage);
    return (
        <dispatchContext.Provider value={dispatch}>
            <StyleContext.Provider value={state}>
                {props.children}
            </StyleContext.Provider>
        </dispatchContext.Provider>
    )
}

export const useDispatch = () => {
    return useContext(dispatchContext)
}

export const useGlobalState = () => {
    const state = useContext(StyleContext)["style"]
    return state;
}