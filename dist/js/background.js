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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/logics/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/logics/background.ts":
/*!**********************************!*\
  !*** ./src/logics/background.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// cross-extension messaging
const waitPageLoad = async (callback) => {
    // 取得するタブの条件
    const queryInfo = {
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT
    };
    // タブの情報を取得する
    chrome.tabs.query(queryInfo, async function (result) {
        // 配列の先頭に現在タブの情報が入っている
        const currentTab = result.shift();
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
                chrome.tabs.sendMessage(tab.id, { message: "select" }, () => { });
            });
        }
        else if (info.menuItemId === "paste") {
            waitPageLoad((tab) => {
                chrome.tabs.sendMessage(tab.id, { message: "paste" }, () => { });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2ljcy9iYWNrZ3JvdW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSw0QkFBNEI7QUFDNUIsTUFBTSxZQUFZLEdBQUcsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFO0lBQ3BDLFlBQVk7SUFDWixNQUFNLFNBQVMsR0FBRztRQUNkLE1BQU0sRUFBRSxJQUFJO1FBQ1osUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCO0tBQzdDLENBQUM7SUFDRixhQUFhO0lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssV0FBVyxNQUFNO1FBQy9DLHNCQUFzQjtRQUN0QixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7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LEVBQUUsa0JBQWtCO0lBQ3pCLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQztDQUNwQixDQUFDLENBQUMiLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2xvZ2ljcy9iYWNrZ3JvdW5kLnRzXCIpO1xuIiwiLy8gY3Jvc3MtZXh0ZW5zaW9uIG1lc3NhZ2luZ1xuY29uc3Qgd2FpdFBhZ2VMb2FkID0gYXN5bmMgKGNhbGxiYWNrKSA9PiB7XG4gICAgLy8g5Y+W5b6X44GZ44KL44K/44OW44Gu5p2h5Lu2XG4gICAgY29uc3QgcXVlcnlJbmZvID0ge1xuICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgIHdpbmRvd0lkOiBjaHJvbWUud2luZG93cy5XSU5ET1dfSURfQ1VSUkVOVFxuICAgIH07XG4gICAgLy8g44K/44OW44Gu5oOF5aCx44KS5Y+W5b6X44GZ44KLXG4gICAgY2hyb21lLnRhYnMucXVlcnkocXVlcnlJbmZvLCBhc3luYyBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIC8vIOmFjeWIl+OBruWFiOmgreOBq+ePvuWcqOOCv+ODluOBruaDheWgseOBjOWFpeOBo+OBpuOBhOOCi1xuICAgICAgICBjb25zdCBjdXJyZW50VGFiID0gcmVzdWx0LnNoaWZ0KCk7XG4gICAgICAgIGlmIChjdXJyZW50VGFiLnN0YXR1cyA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgICAgLy8g44Ot44O844OJ44GM5a6M5LqG44GX44Gm44GE44Gf44KJ44CB44Kz44O844Or44OQ44OD44Kv44KS5a6f6KGMXG4gICAgICAgICAgICBjYWxsYmFjayhjdXJyZW50VGFiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIOOBvuOBoOODreODvOODieS4reOBoOOBo+OBn+WgtOWQiOOBr+OAgeOBoeOCh+OBo+OBqHdhaXTjgZfjgablho3luLDnmoTjgavjgZPjga7lh6bnkIbjgpLnubDjgorov5TjgZlcbiAgICAgICAgICAgICAgICB3YWl0UGFnZUxvYWQoY2FsbGJhY2spO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbn07XG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoYXN5bmMgKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlcXVlc3QubWVzc2FnZSA9PT0gJ3NlbGVjdGVkJykge1xuICAgICAgICBhd2FpdCB3YWl0UGFnZUxvYWQoKHRhYikgPT4ge1xuICAgICAgICAgICAgaWYgKCFyZXF1ZXN0LmRhdGEpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIuODhuOCreOCueODiOOBr+OBguOCiuOBvuOBm+OCk+OBp+OBl+OBn1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYi5pZCwgeyBtZXNzYWdlOiBcIlNob3cgTW9kYWxcIiwgfSwgKCkgPT4geyB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlcXVlc3QubWVzc2FnZSA9PT0gJ3NlbGVjdGVkJykge1xuICAgICAgICBhd2FpdCB3YWl0UGFnZUxvYWQoKHRhYikgPT4ge1xuICAgICAgICAgICAgaWYgKCFyZXF1ZXN0LmRhdGEpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIuODhuOCreOCueODiOOBr+OBguOCiuOBvuOBm+OCk+OBp+OBl+OBn1wiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWIuaWQsIHsgbWVzc2FnZTogXCJTaG93IE1vZGFsXCIsIH0sICgpID0+IHsgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZW5kUmVzcG9uc2UoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn0pO1xuY2hyb21lLmNvbnRleHRNZW51cy5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKGluZm8sIHRhYikge1xuICAgIGlmICh0YWIpIHtcbiAgICAgICAgaWYgKGluZm8ubWVudUl0ZW1JZCA9PT0gXCJzZWxlY3RcIikge1xuICAgICAgICAgICAgd2FpdFBhZ2VMb2FkKCh0YWIpID0+IHtcbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWIuaWQsIHsgbWVzc2FnZTogXCJzZWxlY3RcIiB9LCAoKSA9PiB7IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5mby5tZW51SXRlbUlkID09PSBcInBhc3RlXCIpIHtcbiAgICAgICAgICAgIHdhaXRQYWdlTG9hZCgodGFiKSA9PiB7XG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiLmlkLCB7IG1lc3NhZ2U6IFwicGFzdGVcIiB9LCAoKSA9PiB7IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbmNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcbiAgICB0eXBlOiBcIm5vcm1hbFwiLFxuICAgIGlkOiBcInBhc3RlXCIsXG4gICAgdGl0bGU6IFwiU1BMVCBmcm9tIENsaXBib2FyZFwiLFxuICAgIGNvbnRleHRzOiBbXCJhbGxcIl1cbn0pO1xuLy/lrZDjg6Hjg4vjg6Xjg7zjgpLov73liqDvvIjvvJHjgaTnm67vvIlcbmNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcbiAgICB0eXBlOiBcIm5vcm1hbFwiLFxuICAgIGlkOiBcInNlbGVjdFwiLFxuICAgIHRpdGxlOiBcIlNQTFQgZnJvbSBTZWxlY3RcIixcbiAgICBjb250ZXh0czogW1wiYWxsXCJdXG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=