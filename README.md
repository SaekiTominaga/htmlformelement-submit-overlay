# Cover the entire screen with an overlay when form submitting

[![npm version](https://badge.fury.io/js/%40saekitominaga%2Fhtmlformelement-submit-overlay.svg)](https://badge.fury.io/js/%40saekitominaga%2Fhtmlformelement-submit-overlay)

## Demo

- [Demo page](https://saekitominaga.github.io/htmlformelement-submit-overlay/demo.html)

## Examples

```HTML
<script type="module">
import FormSubmitOverlay from './dist/FormSubmitOverlay.js';

for (const formElement of document.querySelectorAll('.js-submit-overlay')) {
  new FormSubmitOverlay(formElement);
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
<dt>thisElement [required]</dt>
<dd>Target element</dd>
</dl>

## HTMLElement Attributes

<dl>
<dt>data-dialog-message [required]</dt>
<dd>Text to display in the dialog. You can write HTML markup directly.</dd>
<dt>data-dialog-class [optional]</dt>
<dd>Class name to be set in the dialog element.</dd>
</dl>
