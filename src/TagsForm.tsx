import React, { useState } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

export const TagsForm: React.VFC<{ dispatchCol: ((state: string[]) => void), initial: string[] }> = ({ dispatchCol, initial }) => {
    const [tags, setTags] = useState<string[]>(
        initial)

    const handleOnChange = (value: string[]) => {
        setTags(value)
        dispatchCol(value)
    }

    return (
        <ReactTagInput
            tags={tags}
            placeholder="Type and press enter"
            maxTags={30}
            editable={true}
            readOnly={false}
            removeOnBackspace={true}
            onChange={(newTags) => {
                handleOnChange(newTags)
            }}
        />
    )
}