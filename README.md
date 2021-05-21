# Cover the entire screen with an overlay when form submitting

[![npm version](https://badge.fury.io/js/%40saekitominaga%2Fhtmlformelement-submit-overlay.svg)](https://badge.fury.io/js/%40saekitominaga%2Fhtmlformelement-submit-overlay)

## Demo

- [Demo page](https://saekitominaga.github.io/htmlformelement-submit-overlay/demo.html)

## Examples

```HTML
<script type="module">
import FormSubmitOverlay from './dist/FormSubmitOverlay.js';

for (const formElement of document.querySelectorAll('.js-submit-overlay')) {
  const formSubmitOverlay = new FormSubmitOverlay(formElement);
  formSubmitOverlay.init();
}
</script>

<form class="js-submit-overlay"
  data-dialog-message="&lt;p&gt;Please wait.&lt;/p&gt;"
  data-dialog-class="dialog"
>
</form>
```

## Constructor

```TypeScript
new FormSubmitOverlay(
  thisElement: HTMLFormElement
)
```

### Parameters

<dl>
<dt><code>thisElement</code> [required]</dt>
<dd>Target element</dd>
</dl>

## HTMLElement Attributes

<dl>
<dt><code>data-dialog-message</code> [required]</dt>
<dd>Text to display in the dialog. You can write HTML markup directly.</dd>
<dt><code>data-dialog-class</code> [optional]</dt>
<dd>Class name to be set in the dialog element.</dd>
</dl>
