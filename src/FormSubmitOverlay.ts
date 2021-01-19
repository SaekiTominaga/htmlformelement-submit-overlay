import dialogPolyfill from 'dialog-polyfill';

/**
 * Cover the entire screen with an overlay when form submitting.
 */
export default class {
	#thisElement: HTMLFormElement; // 対象要素

	#dialogElement!: HTMLDialogElement; // ロード中メッセージを表示する要素

	/**
	 * @param {HTMLFormElement} thisElement - Target element
	 */
	constructor(thisElement: HTMLFormElement) {
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

		this.#thisElement = thisElement;

		const dialogClassName = this.#thisElement.dataset.dialogClass;

		const dialogMessage = this.#thisElement.dataset.dialogMessage;
		if (dialogMessage === undefined) {
			throw new Error('Attribute: `data-dialog-message` is not set.');
		}

		this._create(dialogClassName, dialogMessage);

		const submitEventListener = this._submitEvent.bind(this);
		const windowUnloadEventListener = this._windowUnloadEvent.bind(this);

		this.#thisElement.addEventListener('submit', submitEventListener, { passive: true });
		window.addEventListener('unload', windowUnloadEventListener, { passive: true });
	}

	/**
	 * オーバーレイダイアログを生成する
	 *
	 * @param {string | undefined} className - ダイアログに設定するクラス名
	 * @param {string} message - ダイアログに表示するメッセージ
	 */
	private _create(className: string | undefined, message: string): void {
		const dialogElement = document.createElement('dialog');
		if (className !== undefined) {
			dialogElement.className = className;
		}
		dialogElement.setAttribute('role', 'alertdialog');
		dialogElement.setAttribute('aria-modal', 'true');
		dialogElement.insertAdjacentHTML('afterbegin', message);
		document.body.appendChild(dialogElement); // dialog-polyfill では <body> 要素の子に挿入することが推奨されている https://www.npmjs.com/package/dialog-polyfill#limitations
		this.#dialogElement = dialogElement;

		dialogPolyfill.registerDialog(dialogElement);
	}

	/**
	 * フォームが送信されたときの処理
	 */
	private _submitEvent(): void {
		this.#dialogElement.showModal();
	}

	/**
	 * window - unload の処理
	 */
	private _windowUnloadEvent(): void {
		this.#dialogElement.close();
	}
}
