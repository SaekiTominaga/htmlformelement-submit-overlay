/**
 * Cover the entire screen with an overlay when form submitting.
 */
export default class {
    #private;
    /**
     * @param {HTMLFormElement} thisElement - Target element
     */
    constructor(thisElement: HTMLFormElement);
    /**
     * オーバーレイダイアログを生成する
     *
     * @param {string | undefined} className - ダイアログに設定するクラス名
     * @param {string} message - ダイアログに表示するメッセージ
     */
    private _create;
    /**
     * フォームが送信されたときの処理
     */
    private _submitEvent;
    /**
     * window - unload の処理
     */
    private _windowUnloadEvent;
}
//# sourceMappingURL=FormSubmitOverlay.d.ts.map