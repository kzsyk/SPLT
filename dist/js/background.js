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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background.ts":
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// cross-extension messaging
const waitPageLoad = async (callback) => {
    // 取得するタブの条件
    console.log(callback);
    const queryInfo = {
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT
    };
    // タブの情報を取得する
    chrome.tabs.query(queryInfo, async function (result) {
        // 配列の先頭に現在タブの情報が入っている
        const currentTab = result.shift();
        console.log(currentTab);
        if (currentTab.status === 'complete') {
            // ロードが完了していたら、コールバックを実行
            callback(currentTab);
        }
        else {
            setTimeout(() => {
                // まだロード中だった場合は、ちょっとwaitして再帰的にこの処理を繰り返す
                waitPageLoad(callback);
            }, 100);
        }
        return true;
    });
};
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log("test");
    if (request.message === 'selected') {
        await waitPageLoad((tab) => {
            if (!request.data) {
                alert("テキストはありませんでした");
            }
            chrome.tabs.sendMessage(tab.id, { message: "Show Modal", }, () => { });
        });
    }
    else if (request.message === 'selected') {
        await waitPageLoad((tab) => {
            if (!request.data) {
                alert("テキストはありませんでした");
                return;
            }
            chrome.tabs.sendMessage(tab.id, { message: "Show Modal", }, () => { });
        });
    }
    sendResponse();
    return true;
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (tab) {
        if (info.menuItemId === "select") {
            waitPageLoad((tab) => {
                chrome.tabs.sendMessage(tab.id, { message: "select" }, () => { console.log(tab); });
            });
        }
        else if (info.menuItemId === "paste") {
            waitPageLoad((tab) => {
                chrome.tabs.sendMessage(tab.id, { message: "paste" }, () => { console.log(tab); });
            });
        }
    }
});
chrome.contextMenus.create({
    type: "normal",
    id: "paste",
    title: "SPLT from Clipboard",
    contexts: ["all"]
});
//子メニューを追加（１つ目）
chrome.contextMenus.create({
    type: "normal",
    id: "select",
    title: "SPLT from Select",
    contexts: ["all"]
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLDRCQUE0QjtBQUM1QixNQUFNLFlBQVksR0FBRyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUU7SUFDcEMsWUFBWTtJQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEIsTUFBTSxTQUFTLEdBQUc7UUFDZCxNQUFNLEVBQUUsSUFBSTtRQUNaLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQjtLQUM3QyxDQUFDO0lBQ0YsYUFBYTtJQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLFdBQVcsTUFBTTtRQUMvQyxzQkFBc0I7UUFDdEIsTUFBTSxV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SSxFQUFFLFFBQVE7SUFDZCxFQUFFLEVBQUUsT0FBTztJQUNYLEtBQUssRUFBRSxxQkFBcUI7SUFDNUIsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDO0NBQ3BCLENBQUMsQ0FBQztBQUNILGVBQWU7QUFDZixNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztJQUN2QixJQUFJLEVBQUUsUUFBUTtJQUNkLEVBQUUsRUFBRSxRQUFRO0lBQ1osS0FBSyxFQUFFLGtCQUFrQjtJQUN6QixRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUM7Q0FDcEIsQ0FBQyxDQUFDIiwiZmlsZSI6ImJhY2tncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9iYWNrZ3JvdW5kLnRzXCIpO1xuIiwiLy8gY3Jvc3MtZXh0ZW5zaW9uIG1lc3NhZ2luZ1xuY29uc3Qgd2FpdFBhZ2VMb2FkID0gYXN5bmMgKGNhbGxiYWNrKSA9PiB7XG4gICAgLy8g5Y+W5b6X44GZ44KL44K/44OW44Gu5p2h5Lu2XG4gICAgY29uc29sZS5sb2coY2FsbGJhY2spO1xuICAgIGNvbnN0IHF1ZXJ5SW5mbyA9IHtcbiAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICB3aW5kb3dJZDogY2hyb21lLndpbmRvd3MuV0lORE9XX0lEX0NVUlJFTlRcbiAgICB9O1xuICAgIC8vIOOCv+ODluOBruaDheWgseOCkuWPluW+l+OBmeOCi1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHF1ZXJ5SW5mbywgYXN5bmMgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAvLyDphY3liJfjga7lhYjpoK3jgavnj77lnKjjgr/jg5bjga7mg4XloLHjgYzlhaXjgaPjgabjgYTjgotcbiAgICAgICAgY29uc3QgY3VycmVudFRhYiA9IHJlc3VsdC5zaGlmdCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50VGFiKTtcbiAgICAgICAgaWYgKGN1cnJlbnRUYWIuc3RhdHVzID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICAvLyDjg63jg7zjg4njgYzlrozkuobjgZfjgabjgYTjgZ/jgonjgIHjgrPjg7zjg6vjg5Djg4Pjgq/jgpLlrp/ooYxcbiAgICAgICAgICAgIGNhbGxiYWNrKGN1cnJlbnRUYWIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8g44G+44Gg44Ot44O844OJ5Lit44Gg44Gj44Gf5aC05ZCI44Gv44CB44Gh44KH44Gj44God2FpdOOBl+OBpuWGjeW4sOeahOOBq+OBk+OBruWHpueQhuOCkue5sOOCiui/lOOBmVxuICAgICAgICAgICAgICAgIHdhaXRQYWdlTG9hZChjYWxsYmFjayk7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xufTtcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihhc3luYyAocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RcIik7XG4gICAgaWYgKHJlcXVlc3QubWVzc2FnZSA9PT0gJ3NlbGVjdGVkJykge1xuICAgICAgICBhd2FpdCB3YWl0UGFnZUxvYWQoKHRhYikgPT4ge1xuICAgICAgICAgICAgaWYgKCFyZXF1ZXN0LmRhdGEpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIuODhuOCreOCueODiOOBr+OBguOCiuOBvuOBm+OCk+OBp+OBl+OBn1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYi5pZCwgeyBtZXNzYWdlOiBcIlNob3cgTW9kYWxcIiwgfSwgKCkgPT4geyB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlcXVlc3QubWVzc2FnZSA9PT0gJ3NlbGVjdGVkJykge1xuICAgICAgICBhd2FpdCB3YWl0UGFnZUxvYWQoKHRhYikgPT4ge1xuICAgICAgICAgICAgaWYgKCFyZXF1ZXN0LmRhdGEpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIuODhuOCreOCueODiOOBr+OBguOCiuOBvuOBm+OCk+OBp+OBl+OBn1wiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWIuaWQsIHsgbWVzc2FnZTogXCJTaG93IE1vZGFsXCIsIH0sICgpID0+IHsgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZW5kUmVzcG9uc2UoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn0pO1xuY2hyb21lLmNvbnRleHRNZW51cy5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKGluZm8sIHRhYikge1xuICAgIGlmICh0YWIpIHtcbiAgICAgICAgaWYgKGluZm8ubWVudUl0ZW1JZCA9PT0gXCJzZWxlY3RcIikge1xuICAgICAgICAgICAgd2FpdFBhZ2VMb2FkKCh0YWIpID0+IHtcbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWIuaWQsIHsgbWVzc2FnZTogXCJzZWxlY3RcIiB9LCAoKSA9PiB7IGNvbnNvbGUubG9nKHRhYik7IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5mby5tZW51SXRlbUlkID09PSBcInBhc3RlXCIpIHtcbiAgICAgICAgICAgIHdhaXRQYWdlTG9hZCgodGFiKSA9PiB7XG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiLmlkLCB7IG1lc3NhZ2U6IFwicGFzdGVcIiB9LCAoKSA9PiB7IGNvbnNvbGUubG9nKHRhYik7IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbmNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcbiAgICB0eXBlOiBcIm5vcm1hbFwiLFxuICAgIGlkOiBcInBhc3RlXCIsXG4gICAgdGl0bGU6IFwiU1BMVCBmcm9tIENsaXBib2FyZFwiLFxuICAgIGNvbnRleHRzOiBbXCJhbGxcIl1cbn0pO1xuLy/lrZDjg6Hjg4vjg6Xjg7zjgpLov73liqDvvIjvvJHjgaTnm67vvIlcbmNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcbiAgICB0eXBlOiBcIm5vcm1hbFwiLFxuICAgIGlkOiBcInNlbGVjdFwiLFxuICAgIHRpdGxlOiBcIlNQTFQgZnJvbSBTZWxlY3RcIixcbiAgICBjb250ZXh0czogW1wiYWxsXCJdXG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=