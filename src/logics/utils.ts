//@ts-check

export const zIndexSearch = () => {
    const elements = document.getElementsByTagName("*") as HTMLCollectionOf<HTMLElement>;
    let highestIndex = 0;
    for (let i = 0; i < elements.length - 1; i++) {
        const zIndex = elements[i].style.zIndex
        if (parseInt(zIndex) > highestIndex) {
            highestIndex = parseInt(zIndex);
        }
    }
    return highestIndex + 100
}

export const backfaceFixed = (fixed) => {
    /**
     * 表示されているスクロールバーとの差分を計測し、背面固定時はその差分body要素に余白を生成する
     */
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.paddingRight = fixed ? `${scrollbarWidth}px` : '';

    /**
     * スクロール位置を取得する要素を出力する(`html`or`body`)
     */
    const scrollingElement = () => {
        const browser = window.navigator.userAgent.toLowerCase();
        if ('scrollingElement' in document as any) return document.scrollingElement ;
        if (browser.indexOf('webkit') > 0) return document.body;
        return document.documentElement;
    };

    /**
     * 変数にスクロール量を格納
     */
    const scrollY = fixed
        ? scrollingElement().scrollTop
        : parseInt(document.body.style.top || '0');

    /**
     * CSSで背面を固定
     */
    const styles = {
        height: '100vh',
        left: '0',
        position: 'fixed',
        top: `${scrollY * -1}px`,
        width: '100vw',
        overscrollBehavior: "none"
    };

    Object.keys(styles).forEach((key) => {
        document.body.style[key] = fixed ? styles[key] : '';
    });

    /**
     * 背面固定解除時に元の位置にスクロールする
     */
    if (!fixed) window.scrollTo(0, scrollY * -1);
};


export const getCaretPos = () => {
    if (window.getSelection) {
        const range = window.getSelection().getRangeAt(0);
        const selectedObj = window.getSelection();
        let rangeCount = 0;
        const childNodes = selectedObj.anchorNode.parentNode.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            if (childNodes[i] == selectedObj.anchorNode) {
                break;
            }
            else if (childNodes[i].nodeType == 3) {
                rangeCount += childNodes[i].textContent.length;
            }
        }
        return range.startOffset + rangeCount;
    }
    else return -1;
}

/*

export const copyStyles = (sourceDoc, targetDoc) => {
    Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
        if (styleSheet.cssRules) {
            // true for inline styles
            const newStyleEl = sourceDoc.createElement("style");

            Array.from(styleSheet.cssRules).forEach(cssRule => {
                console.log("true\n" + cssRule.cssText)
                newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
            });
            console.log("true\n")
            targetDoc.head.appendChild(newStyleEl);
            /* } else if (styleSheet.href) {
                // true for stylesheets loaded from a URL
                const newLinkEl = sourceDoc.createElement("link");
                newLinkEl.rel = "stylesheet";
                newLinkEl.href = styleSheet.href;
                console.log("true\n" + styleSheet.href)
                targetDoc.head.appendChild(newLinkEl);
           
        }
    });
}

 */