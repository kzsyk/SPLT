
interface StyleAction {
    payload: {
        fontSize: number,
        height: number,
        font: string,
        color: {
            fontColor: string,
            modal: string,
            highlight: string,
            shadow: string,
            backgroundModal: string
        },
        fontWeight: number,
        splitWords: string[]
    },
    type: 'SET_STYLE'
}

interface storageData {
    style?: {
        fontSize: number,
        height: number,
        font: string,
        color: {
            fontColor: string,
            modal: string,
            highlight: string,
            shadow: string,
            backgroundModal: string
        },
        fontWeight: number,
        splitWords: string[]
    }
}

const readLocalStorage = (key: string) => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([key], (result) => {
            if (result) {
                resolve(result[key]);
            } else {
                reject(new Error('promise!!!'));
            }
        });
    });
}


export type StyleState = typeof initStorage

export let storage: storageData;

export const initStorage: storageData = {
    style: {
        fontSize: 14,
        height: 1.5,
        font: "メイリオ",
        fontWeight: 150,
        color: {
            fontColor: "rgba(200,200,200,.4)",
            modal: "rgba(240,240,250,1)",
            highlight: "rgba(0,0,0,1)",
            shadow: "rgba(0,0,0,.5)",
            backgroundModal: "rgba(240,240,250,1)"
        },
        splitWords: ["、", "。", "」", "?", "⏎", "!", ",", ")", "・"]
    }
}

export const getData = async () => {
    return await readLocalStorage('splt_styles').then((result: storageData) => {
        if (!result) {
            chrome.storage.sync.set({ splt_styles: initStorage }, () => { })
        } else {
            storage = result
            return result
        }
    });
}

getData()

export const reducerFunc = (state: StyleState, action: StyleAction) => {
    switch (action.type) {
        case 'SET_STYLE':
            return {
                ...state,
                style: action.payload
            }
        default:
            return {
                ...state
            }
    }

};