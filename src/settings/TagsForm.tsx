import React, { useState,useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
// import styled from 'styled-components';

/* 
const ReactTagInputStyles=styled(ReactTagInput)`
    .react-tag-input{
        box-sizing:border-box;
        position:relative;
        width:100%;
        height:auto;
        min-height:2.375em;
        padding:.1875em .375em;
        overflow-y:auto;
        display:flex;
        flex-wrap:wrap;
        align-items:center;
        font-size:1rem;
        background:#fff;
        color:#333;
        border:1px solid #e1e1e1;
        border-radius:3px;
    },
    .react-tag-input *{box-sizing:border-box},
    .react-tag-input>*{margin:.1875em},
    .react-tag-input__input{
        width:auto;
        flex-grow:1;
        height:1.875em;
        padding:0 0 0 .1875em;
        margin:0 .1875em;
        font-size:1em;
        line-height:1;
        background:transparent;
        color:#333;
        border:none;
        border-radius:3px;
        outline:0;
        box-shadow:none;
        -webkit-appearance:none;
    },
    .react-tag-input__input::placeholder,.react-tag-input__input:-moz-placeholder,.react-tag-input__input:-ms-input-placeholder,.react-tag-input__input::-moz-placeholder,.react-tag-input__input::-webkit-input-placeholder{
        color:#333;
    },
    .react-tag-input__input:focus{
        border:none;
    },
    .react-tag-input__tag{
        position:relative;
        display:flex;
        align-items:center;
        font-size:.85em;
        line-height:1;
        background:#e1e1e1;
        border-radius:3px
    },
    .react-tag-input__tag__content{
        outline:0;
        border:none;
        white-space:nowrap;
        padding:0 .46875em;
    },
    .react-tag-input__tag__remove{
        position:relative;
        height:2em;
        width:2em;
        font-size:.85em;
        cursor:pointer;
        background:#d4d4d4;
        border-top-right-radius:3px;
        border-bottom-right-radius:3px
    },
    .react-tag-input__tag__remove:before,.react-tag-input__tag__remove:after
    {
        position:absolute;
        top:50%;
        left:50%;
        content:" ";
        height:.9em;
        width:.15em;
        background-color:#333;
    },
    .react-tag-input__tag__remove:before{
        transform:translateX(-50%) translateY(-50%) rotate(45deg);
    },
    .react-tag-input__tag__remove:after{
        transform:translateX(-50%) translateY(-50%) rotate(-45deg);
    },
    .react-tag-input__tag__remove-readonly{
        width:0;
    },
    .react-tag-input__tag__remove-readonly:before,.react-tag-input__tag__remove-readonly:after{
        content:"";
        width:0;
    }
`
 */
export const TagsForm: React.VFC<{ dispatchSplit: ((state: string[]) => void), splitSymbol: string[] }> = ({ dispatchSplit, splitSymbol }) => {
    const [tags, setTags] = useState<string[]>(splitSymbol)
    
    useEffect(()=>{
        setTags(splitSymbol)
        dispatchSplit(splitSymbol)
    },[splitSymbol])

    useEffect(()=>{
        dispatchSplit(tags)
    },[tags])

    return (
        <ReactTagInput
            tags={tags}
            placeholder="Type and press enter"
            editable={true}
            readOnly={false}
            removeOnBackspace={true}
            onChange={(newTags) => {
                setTags(newTags)
            }}
        />
    )
}