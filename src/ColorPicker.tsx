import React, { useState, useEffect } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import useDebounce from "./UseDebounce";

export const ColorPicker: React.VFC<{ dispatchCol: ((state: string) => void), initial: string }> = ({ dispatchCol, initial }) => {
    const [color, setColor] = useState<string>(initial)
    const [mounted, setIsMount] = useState<boolean>(false)
    const handleOnChange = (value: string) => {
        setColor(value)
        setIsMount(true)
    }

    const debouncedValue = useDebounce<string>(color, 200)

    useEffect(() => {
        console.log(mounted)
        const f = () => {
            if (mounted) {
                if (color === debouncedValue) {
                    dispatchCol(debouncedValue)
                } else {
                    dispatchCol(color)
                }
            }
        }
        f();
        const cleanup = () => {
            setIsMount(true)
            console.log("crean up")
        };
        return cleanup;
    }, [debouncedValue])



    return (
        <RgbaStringColorPicker
            color={color}
            onChange={(value) => { handleOnChange(value) }}
        >
        </RgbaStringColorPicker>
    );
}
