import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-styles/color.js';
import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-input/iron-input.js';
import { PaperInputBehavior } from '@polymer/paper-input/paper-input-behavior.js';
import '@polymer/paper-input/paper-input-char-counter.js';
import '@polymer/paper-input/paper-input-container.js';
import '@polymer/paper-input/paper-input-error.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

/**
 *
 * @customElement
 * @polymer
 * @appliesMixin Polymer.PaperInputBehavior
 * @demo demo Sandbox snippet
 */
class PaperNumberInput extends mixinBehaviors([PaperInputBehavior], PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        text-align: center;
        --paper-input-container-input: {
          -moz-appearance: textfield;
          appearance: textfield;
        };
        --paper-input-container-input-webkit-spinner: {
          -webkit-appearance: none;
          appearance: none;
          margin: 0;
        };
      }

      .spinner {
        margin: 0;
        min-width: auto;
        --paper-button-disabled: {
          background: transparent;
        };
        @apply --paper-number-input-spinner;
      }

      .spinner:hover {
        background: rgba(0, 0, 0, 0.1);
        @apply --paper-number-input-spinner-hover;
      }


      :host([focused]) {
        outline: none;
      }

      :host([hidden]) {
        display: none !important;
      }

      input {
        position: relative; /* to make a stacking context */
        outline: none;
        box-shadow: none;
        padding: 0;
        width: 100%;
        max-width: 100%;
        background: transparent;
        border: none;
        color: var(--paper-input-container-input-color, var(--primary-text-color));
        -webkit-appearance: none;
        text-align: inherit;
        vertical-align: bottom;

        /* Firefox sets a min-width on the input, which can cause layout issues */
        min-width: 0;

        @apply --paper-font-subhead;
        @apply --paper-input-container-input;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        @apply --paper-input-container-input-webkit-spinner;
      }

      input::-webkit-clear-button {
        @apply --paper-input-container-input-webkit-clear;
      }

      input::-webkit-input-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      input:-moz-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      input::-moz-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      input::-ms-clear {
        @apply --paper-input-container-ms-clear;
      }

      input:-ms-input-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      label {
        pointer-events: none;
      }

      #stepDownIcon {
        @apply --paper-number-input-step-down-icon;
      }

      #stepUpIcon {
        @apply --paper-number-input-step-up-icon;
      }

      #stepDownButton {
        @apply --paper-number-input-step-down-button;
      }

      #stepUpButton {
        @apply --paper-number-input-step-up-button;
      }

    </style>

     <paper-input-container id="container" no-label-float="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" auto-validate\$="[[autoValidate]]" disabled\$="[[disabled]]" invalid="[[invalid]]">

      <paper-button id="stepDownButton" tabindex="-1" class="spinner" slot="prefix" on-tap="stepDown" disabled="[[_computeStepDownButtonDisabled(value, min, disabled)]]">
        <iron-icon id="stepDownIcon" icon="[[stepDownIcon]]"></iron-icon>
      </paper-button>

      <slot name="prefix" slot="prefix"></slot>

      <label hidden\$="[[!label]]" aria-hidden="true" for="input" slot="label">[[label]]</label>

      <iron-input bind-value="{{value}}" id="input" slot="input" maxlength\$="[[maxlength]]" allowed-pattern="[[allowedPattern]]" invalid="{{invalid}}" validator="[[validator]]">
        <input id="nativeInput" aria-labelledby\$="[[_ariaLabelledBy]]" aria-describedby\$="[[_ariaDescribedBy]]" disabled\$="[[disabled]]" title\$="[[title]]" type\$="[[type]]" pattern\$="[[pattern]]" required\$="[[required]]" autocomplete\$="[[autocomplete]]" autofocus\$="[[autofocus]]" inputmode\$="[[inputmode]]" minlength\$="[[minlength]]" maxlength\$="[[maxlength]]" min\$="[[min]]" max\$="[[max]]" step\$="[[step]]" name\$="[[name]]" placeholder\$="[[placeholder]]" readonly\$="[[readonly]]" list\$="[[list]]" size\$="[[size]]" autocapitalize\$="[[autocapitalize]]" autocorrect\$="[[autocorrect]]" on-change="_onChange" on-input="_oninput" tabindex\$="[[tabIndex]]" autosave\$="[[autosave]]" results\$="[[results]]" accept\$="[[accept]]" multiple\$="[[multiple]]">
      </iron-input>

      <slot name="suffix" slot="suffix"></slot>

      <paper-button id="stepUpButton" tabindex="-1" class="spinner" slot="suffix" on-tap="stepUp" disabled="[[_computeStepUpButtonDisabled(value, max, disabled)]]">
        <iron-icon id="stepUpIcon" icon="[[stepUpIcon]]"></iron-icon>
      </paper-button>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error aria-live="assertive" slot="add-on">[[errorMessage]]</paper-input-error>
      </template>

      <template is="dom-if" if="[[charCounter]]">
        <paper-input-char-counter slot="add-on"></paper-input-char-counter>
      </template>

    </paper-input-container>
`;
  }

  static get is() {
    return 'paper-number-input';
  }

  static get properties() {
    return {
      type: {
        type: String,
        value: 'number',
        readonly: true
      },
      /**
      * Default fallback when value is not a number.
      */
      fallbackValue: {
        type: Number,
        value: null
      },
      /**
      * The icon key for the step down button. You will need to import an
      * icon set for the icon to appear.
      */
      stepDownIcon: {
        type: String,
        value: 'remove'
      },
      /**
      * The icon key for the step up button. You will need to import an
      * icon set for the icon to appear.
      */
      stepUpIcon: {
        type: String,
        value: 'add'
      },
      /**
       * Whether to force the number into the min-max range
       */
      forceRange: {
        type: Boolean,
        value: false,
      }
    };
  }

  static get observers() {
    return [
      '_valueChanged(value)'
    ];
  }

  _valueChanged(value) {
    this._rangeValue(value);
  }

  /**
  * Returns a reference to the focusable element. Overridden from PaperInputBehavior
  * to correctly focus the native input.
  */
  get _focusableElement() {
    return this.inputElement._inputElement;
  }

  setFallbackValue() {
    if (this.fallbackValue === null) {
      return;
    }

    this.value = this.fallbackValue;
  }

  /**
   *
   */
  stepUp() {
    // stepUp on native inputs causes invalidStateError in MS Edge
    const step = this.$.nativeInput.step || 1;
    this.$.nativeInput.value = Number(this.$.nativeInput.value) + step;

    this.value = this.$.nativeInput.value;
  }

  /**
   *
   */
  stepDown() {
    const step = this.$.nativeInput.step || 1;
    this.$.nativeInput.value = Number(this.$.nativeInput.value) - step;

    this.value = this.$.nativeInput.value;
  }

  _computeStepDownButtonDisabled(value, min, disabled) {
    return disabled || parseFloat(Number(value)) <= parseFloat(min);
  }

  _computeStepUpButtonDisabled(value, max, disabled) {
    return disabled || parseFloat(Number(value)) >= parseFloat(max);
  }

  _onChange(e) {
    super._onChange(e);
    this._resetFallbackValueIfNeeded();
  }

  _resetFallbackValueIfNeeded() {
    if (!this.$.nativeInput.checkValidity()) {
      this.setFallbackValue();
    }
  }

  _oninput(e) {
    this._rangeValue(this.$.nativeInput.value);
  }

  _rangeValue(value) {
    if (!this.forceRange) {
      return;
    }

    value = parseFloat(value);

    if (isNaN(value)) return;

    if (value < this.min) {
      this.value = this.min;
    }
    if (value > this.max) {
      this.value = this.max;
    }
  }
}

customElements.define(PaperNumberInput.is, PaperNumberInput);
