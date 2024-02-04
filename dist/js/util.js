/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/logics/utils.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/logics/utils.ts":
/*!*****************************!*\
  !*** ./src/logics/utils.ts ***!
  \*****************************/
/*! exports provided: MAX_Z_INDEX, backfaceFixed, getCaretPos */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_Z_INDEX", function() { return MAX_Z_INDEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backfaceFixed", function() { return backfaceFixed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCaretPos", function() { return getCaretPos; });
//@ts-check
const MAX_Z_INDEX = 2147483646;
const backfaceFixed = (fixed) => {
    /**
     * 表示されているスクロールバーとの差分を計測し、背面固定時はその差分body要素に余白を生成する
     */
    const documentData = document.body;
    const scrollbarWidth = window.innerWidth - documentData.clientWidth;
    documentData.style.paddingRight = fixed ? `${scrollbarWidth}px` : '';
    /**
     * スクロール位置を取得する要素を出力する(`html`or`body`)
     */
    const scrollingElement = () => {
        const browser = window.navigator.userAgent.toLowerCase();
        if (browser.indexOf('webkit') > 0) {
            return documentData;
        }
        ;
        if ('scrollingElement' in documentData) {
            return document.scrollingElement;
        }
        ;
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
    if (!fixed)
        window.scrollTo(0, scrollY * -1);
};
const getCaretPos = () => {
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
    else
        return -1;
};
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2ljcy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBVztBQUNKLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQztBQUMvQixNQUFNLGFBQWEsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ25DOztPQUVHO0lBQ0gsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztJQUNuQyxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUM7SUFDcEUsWUFBWSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDckU7O09BRUc7SUFDSCxNQUFNLGdCQUFnQixHQUFHLEdBQUcsRUFBRTtRQUMxQixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6RCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLE9BQU8sWUFBWSxDQUFDO1NBQ3ZCO1FBQ0QsQ0FBQztRQUNELElBQUksa0JBQWtCLElBQUksWUFBWSxFQUFFO1lBQ3BDLE9BQU8sUUFBUSxDQUFDLGdCQUFnQixDQUFDO1NBQ3BDO1FBQ0QsQ0FBQztRQUNELE9BQU8sUUFBUSxDQUFDLGVBQWUsQ0FBQztJQUNwQyxDQUFDLENBQUM7SUFDRjs7T0FFRztJQUNILE1BQU0sT0FBTyxHQUFHLEtBQUs7UUFDakIsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUMsU0FBUztRQUM5QixDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUMvQzs7T0FFRztJQUNILE1BQU0sTUFBTSxHQUFHO1FBQ1gsTUFBTSxFQUFFLE9BQU87UUFDZixJQUFJLEVBQUUsR0FBRztRQUNULFFBQVEsRUFBRSxPQUFPO1FBQ2pCLEdBQUcsRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSTtRQUN4QixLQUFLLEVBQUUsT0FBTztRQUNkLGtCQUFrQixFQUFFLE1BQU07S0FDN0IsQ0FBQztJQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDaEMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN4RCxDQUFDLENBQUMsQ0FBQztJQUNIOztPQUVHO0lBQ0gsSUFBSSxDQUFDLEtBQUs7UUFDTixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUM7QUFDSyxNQUFNLFdBQVcsR0FBRyxHQUFHLEVBQUU7SUFDNUIsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1FBQ3JCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFDLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNuQixNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFDaEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRTtnQkFDekMsTUFBTTthQUNUO2lCQUNJLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xDLFVBQVUsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQzthQUNsRDtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztLQUN6Qzs7UUFFRyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQztBQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRyIsImZpbGUiOiJ1dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbG9naWNzL3V0aWxzLnRzXCIpO1xuIiwiLy9AdHMtY2hlY2tcbmV4cG9ydCBjb25zdCBNQVhfWl9JTkRFWCA9IDIxNDc0ODM2NDY7XG5leHBvcnQgY29uc3QgYmFja2ZhY2VGaXhlZCA9IChmaXhlZCkgPT4ge1xuICAgIC8qKlxuICAgICAqIOihqOekuuOBleOCjOOBpuOBhOOCi+OCueOCr+ODreODvOODq+ODkOODvOOBqOOBruW3ruWIhuOCkuioiOa4rOOBl+OAgeiDjOmdouWbuuWumuaZguOBr+OBneOBruW3ruWIhmJvZHnopoHntKDjgavkvZnnmb3jgpLnlJ/miJDjgZnjgotcbiAgICAgKi9cbiAgICBjb25zdCBkb2N1bWVudERhdGEgPSBkb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IHNjcm9sbGJhcldpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSBkb2N1bWVudERhdGEuY2xpZW50V2lkdGg7XG4gICAgZG9jdW1lbnREYXRhLnN0eWxlLnBhZGRpbmdSaWdodCA9IGZpeGVkID8gYCR7c2Nyb2xsYmFyV2lkdGh9cHhgIDogJyc7XG4gICAgLyoqXG4gICAgICog44K544Kv44Ot44O844Or5L2N572u44KS5Y+W5b6X44GZ44KL6KaB57Sg44KS5Ye65Yqb44GZ44KLKGBodG1sYG9yYGJvZHlgKVxuICAgICAqL1xuICAgIGNvbnN0IHNjcm9sbGluZ0VsZW1lbnQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJyb3dzZXIgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoYnJvd3Nlci5pbmRleE9mKCd3ZWJraXQnKSA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudERhdGE7XG4gICAgICAgIH1cbiAgICAgICAgO1xuICAgICAgICBpZiAoJ3Njcm9sbGluZ0VsZW1lbnQnIGluIGRvY3VtZW50RGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgO1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICog5aSJ5pWw44Gr44K544Kv44Ot44O844Or6YeP44KS5qC857SNXG4gICAgICovXG4gICAgY29uc3Qgc2Nyb2xsWSA9IGZpeGVkXG4gICAgICAgID8gc2Nyb2xsaW5nRWxlbWVudCgpLnNjcm9sbFRvcFxuICAgICAgICA6IHBhcnNlSW50KGRvY3VtZW50LmJvZHkuc3R5bGUudG9wIHx8ICcwJyk7XG4gICAgLyoqXG4gICAgICogQ1NT44Gn6IOM6Z2i44KS5Zu65a6aXG4gICAgICovXG4gICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICBoZWlnaHQ6ICcxMDB2aCcsXG4gICAgICAgIGxlZnQ6ICcwJyxcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgIHRvcDogYCR7c2Nyb2xsWSAqIC0xfXB4YCxcbiAgICAgICAgd2lkdGg6ICcxMDB2dycsXG4gICAgICAgIG92ZXJzY3JvbGxCZWhhdmlvcjogXCJub25lXCJcbiAgICB9O1xuICAgIE9iamVjdC5rZXlzKHN0eWxlcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGVba2V5XSA9IGZpeGVkID8gc3R5bGVzW2tleV0gOiAnJztcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiDog4zpnaLlm7rlrprop6PpmaTmmYLjgavlhYPjga7kvY3nva7jgavjgrnjgq/jg63jg7zjg6vjgZnjgotcbiAgICAgKi9cbiAgICBpZiAoIWZpeGVkKVxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc2Nyb2xsWSAqIC0xKTtcbn07XG5leHBvcnQgY29uc3QgZ2V0Q2FyZXRQb3MgPSAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPYmogPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGxldCByYW5nZUNvdW50ID0gMDtcbiAgICAgICAgY29uc3QgY2hpbGROb2RlcyA9IHNlbGVjdGVkT2JqLmFuY2hvck5vZGUucGFyZW50Tm9kZS5jaGlsZE5vZGVzO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjaGlsZE5vZGVzW2ldID09IHNlbGVjdGVkT2JqLmFuY2hvck5vZGUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkTm9kZXNbaV0ubm9kZVR5cGUgPT0gMykge1xuICAgICAgICAgICAgICAgIHJhbmdlQ291bnQgKz0gY2hpbGROb2Rlc1tpXS50ZXh0Q29udGVudC5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJhbmdlLnN0YXJ0T2Zmc2V0ICsgcmFuZ2VDb3VudDtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gLTE7XG59O1xuLypcblxuZXhwb3J0IGNvbnN0IGNvcHlTdHlsZXMgPSAoc291cmNlRG9jLCB0YXJnZXREb2MpID0+IHtcbiAgICBBcnJheS5mcm9tKHNvdXJjZURvYy5zdHlsZVNoZWV0cykuZm9yRWFjaChzdHlsZVNoZWV0ID0+IHtcbiAgICAgICAgaWYgKHN0eWxlU2hlZXQuY3NzUnVsZXMpIHtcbiAgICAgICAgICAgIC8vIHRydWUgZm9yIGlubGluZSBzdHlsZXNcbiAgICAgICAgICAgIGNvbnN0IG5ld1N0eWxlRWwgPSBzb3VyY2VEb2MuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG4gICAgICAgICAgICBBcnJheS5mcm9tKHN0eWxlU2hlZXQuY3NzUnVsZXMpLmZvckVhY2goY3NzUnVsZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0cnVlXFxuXCIgKyBjc3NSdWxlLmNzc1RleHQpXG4gICAgICAgICAgICAgICAgbmV3U3R5bGVFbC5hcHBlbmRDaGlsZChzb3VyY2VEb2MuY3JlYXRlVGV4dE5vZGUoY3NzUnVsZS5jc3NUZXh0KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJ1ZVxcblwiKVxuICAgICAgICAgICAgdGFyZ2V0RG9jLmhlYWQuYXBwZW5kQ2hpbGQobmV3U3R5bGVFbCk7XG4gICAgICAgICAgICAvKiB9IGVsc2UgaWYgKHN0eWxlU2hlZXQuaHJlZikge1xuICAgICAgICAgICAgICAgIC8vIHRydWUgZm9yIHN0eWxlc2hlZXRzIGxvYWRlZCBmcm9tIGEgVVJMXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3TGlua0VsID0gc291cmNlRG9jLmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuICAgICAgICAgICAgICAgIG5ld0xpbmtFbC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcbiAgICAgICAgICAgICAgICBuZXdMaW5rRWwuaHJlZiA9IHN0eWxlU2hlZXQuaHJlZjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRydWVcXG5cIiArIHN0eWxlU2hlZXQuaHJlZilcbiAgICAgICAgICAgICAgICB0YXJnZXREb2MuaGVhZC5hcHBlbmRDaGlsZChuZXdMaW5rRWwpO1xuICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4gKi8gXG4iXSwic291cmNlUm9vdCI6IiJ9