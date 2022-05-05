import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export const NewWindow = ({ children, closeWindowPortal }) => {
    const externalWindow = useRef(
        window.open("", "", "width=600,height=00,left=200,top=200")
    );
    const containerEl = document.createElement("div");

    useEffect(() => {
        const currentWindow = externalWindow.current;
        return () => currentWindow.close();
    }, []);

    externalWindow.current.document.title = "SPLT";
    externalWindow.current.document.body.appendChild(containerEl);

    externalWindow.current.addEventListener("beforeunload", () => {
        closeWindowPortal(false);
    });

    return ReactDOM.createPortal(children, containerEl);
};
