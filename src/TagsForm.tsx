import React, { useState,useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

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
            maxTags={100}
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