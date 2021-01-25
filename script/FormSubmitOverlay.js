var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _thisElement, _dialogElement, _submitEventListener, _windowUnloadEventListener;
import dialogPolyfill from '../node_modules/dialog-polyfill/dist/dialog-polyfill.esm.js';
/**
 * Cover the entire screen with an overlay when form submitting.
 */
export default class {
    /**
     * @param {HTMLFormElement} thisElement - Target element
     */
    constructor(thisElement) {
        _thisElement.set(this, void 0); // 対象要素
        _dialogElement.set(this, void 0); // ロード中メッセージを表示する要素
        _submitEventListener.set(this, void 0);
        _windowUnloadEventListener.set(this, void 0);
        if (window.HTMLDialogElement === undefined) {
            const styleElement = document.createElement('style');
            styleElement.textContent = `
				dialog {
					display: block;
					position: absolute;
					left: 0;
					right: 0;
					width: -webkit-fit-content;
					width: fit-content;
					height: -webkit-fit-content;
					height: fit-content;
					margin: auto;
					border: solid;
					padding: 1em;
					background: white;
					color: black;
				}

				dialog:not([open]) {
					display: none;
				}
			`; // Reset Style https://html.spec.whatwg.org/multipage/rendering.html#flow-content-3
            document.head.insertAdjacentElement('beforeend', styleElement);
        }
        __classPrivateFieldSet(this, _thisElement, thisElement);
        __classPrivateFieldSet(this, _submitEventListener, this._submitEvent.bind(this));
        __classPrivateFieldSet(this, _windowUnloadEventListener, this._windowUnloadEvent.bind(this));
    }
    /**
     * Initial processing
     */
    init() {
        const dialogClassName = __classPrivateFieldGet(this, _thisElement).dataset.dialogClass;
        const dialogMessage = __classPrivateFieldGet(this, _thisElement).dataset.dialogMessage;
        if (dialogMessage === undefined) {
            throw new Error('Attribute: `data-dialog-message` is not set.');
        }
        this._create(dialogClassName, dialogMessage);
        __classPrivateFieldGet(this, _thisElement).addEventListener('submit', __classPrivateFieldGet(this, _submitEventListener), { passive: true });
        window.addEventListener('unload', __classPrivateFieldGet(this, _windowUnloadEventListener), { passive: true });
    }
    /**
     * オーバーレイダイアログを生成する
     *
     * @param {string | undefined} className - ダイアログに設定するクラス名
     * @param {string} message - ダイアログに表示するメッセージ
     */
    _create(className, message) {
        const dialogElement = document.createElement('dialog');
        if (className !== undefined) {
            dialogElement.className = className;
        }
        dialogElement.setAttribute('role', 'alertdialog');
        dialogElement.setAttribute('aria-modal', 'true');
        dialogElement.insertAdjacentHTML('afterbegin', message);
        document.body.appendChild(dialogElement); // dialog-polyfill では <body> 要素の子に挿入することが推奨されている https://www.npmjs.com/package/dialog-polyfill#limitations
        __classPrivateFieldSet(// dialog-polyfill では <body> 要素の子に挿入することが推奨されている https://www.npmjs.com/package/dialog-polyfill#limitations
        this, _dialogElement, dialogElement);
        dialogPolyfill.registerDialog(dialogElement);
    }
    /**
     * フォームが送信されたときの処理
     */
    _submitEvent() {
        __classPrivateFieldGet(this, _dialogElement).showModal();
    }
    /**
     * window - unload の処理
     */
    _windowUnloadEvent() {
        __classPrivateFieldGet(this, _dialogElement).close();
    }
}
_thisElement = new WeakMap(), _dialogElement = new WeakMap(), _submitEventListener = new WeakMap(), _windowUnloadEventListener = new WeakMap();
//# sourceMappingURL=FormSubmitOverlay.js.map