import React, { useState, useEffect, useCallback } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import useDebounce from "../logics/UseDebounce";

export const ColorPicker: React.VFC<{ dispatchColor: ((state: string) => void), initial: string }> = ({ dispatchColor, initial }) => {
    const [color, setColor] = useState<string>(initial)
    const [mounted, setIsMount] = useState<boolean>(false)
    const handleOnChange = useCallback((value: string) => {
        setColor(value)
        setIsMount(true)
    },[setColor,setIsMount])

    const debouncedValue = useDebounce<string>(color, 200)

    useEffect(() => {
        const f = () => {
            if (mounted) {
                if (color === debouncedValue) {
                    dispatchColor(debouncedValue)
                } else {
                    dispatchColor(color)
                }
            }
        }
        f();
        const cleanup = () => {
            setIsMount(true)
        };
        return cleanup;
    }, [debouncedValue])

    
    useEffect(() => {
        if (!mounted) {
            if(initial){
                setColor(initial)
            }
            const cleanup = () => {
                setIsMount(true)
            };
            return cleanup;
        }
    }, [initial])

    return (
        <RgbaStringColorPicker
            color={color}
            onChange={(value) => { handleOnChange(value) }}
        >
        </RgbaStringColorPicker>
    );
}
