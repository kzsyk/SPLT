import React, { useRef, useState, useEffect } from "react";
import range from "lodash/range";
const items = range(1000).map(i => React.createElement("div", null,
    "item #",
    i));
// typography is a just some styles over `span`
// styles via `@material-ui/styles`
function App() {
    // create a list ref, this ref is used to get at the method `scrollToItem`
    // https://react-window.now.sh/#/examples/list/scroll-to-item
    const listRef = useRef(null);
    // create some state that represents the current selected item
    const [blockNum, setNum] = useState(null);
    const [row, setRow] = useState(null);
    // an event handler that handles when a key has been pressed while the container is focused
    const handleKeyDown = e => {
        if (e.key === "ArrowDown") {
            e.preventDefault(); // prevent default to prevent unwanted scrolling
            if (row === null) {
                setRow(0);
            }
            else {
                // uses `Math.min` to ensure the blockNum does not go out of bounds
                setNum(Math.min(items.length - 1, row + 1));
            }
        }
        if (e.key === "ArrowUp") {
            e.preventDefault(); // prevent default to prevent unwanted scrolling
            if (row === null) {
                setRow(0);
            }
            else {
                // uses `Math.max` to ensure the blockNum does not go out of bounds
                setNum(Math.max(0, row - 1));
            }
        }
        if (e.key === "ArrowLeft") {
            e.preventDefault(); // prevent default to prevent unwanted scrolling
            if (blockNum === null) {
                setNum(0);
            }
            else {
                // uses `Math.max` to ensure the blockNum does not go out of bounds
                setNum(Math.max(0, blockNum - 1));
            }
        }
        if (e.key === "ArrowUp") {
            e.preventDefault(); // prevent default to prevent unwanted scrolling
            if (blockNum === null) {
                setNum(0);
            }
            else {
                // uses `Math.max` to ensure the blockNum does not go out of bounds
                setNum(Math.max(0, blockNum - 1));
            }
        }
    };
    // event handler that clears the blockNum on blur
    const handleBlur = () => {
        setNum(null);
    };
    // NOTE: this block is important stuff!
    // an effect that watches the `blockNum` state and calls `list.scrolToItem`
    useEffect(() => {
        // ensure list reference is there
        const list = listRef.current;
        if (!list)
            return;
        // ensure blockNum is not null
        if (blockNum === null)
            return;
        list.scrollToItem(blockNum);
    }, [blockNum]);
}
//# sourceMappingURL=selector.js.map