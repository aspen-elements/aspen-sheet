import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { AspenSecurableMixin } from '@aspen-elements/aspen-securable-mixin'
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

/**
 * `aspen-sheet`
 * common base class
 *
 * @customElement
 * @polymer
 */
class AspenSheet extends AspenSecurableMixin(PolymerElement) {
  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return 'aspen-sheet';
  }
  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      /** The model for the company. */
      model: {
        type: Object,
        value: null
      },

      canShare: {
        type: Boolean,
        value: false
      }
    };
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized.
   */
  ready() {
    super.ready();

    afterNextRender(this, function() {});
  }

  _handleCardSelected(prefix) {
    window.location = `/${prefix}/` + this.model.$key;
  }

  _requestDelete(e) {
    this.dispatchEvent(
      new CustomEvent('request-card-deleted', {
        bubbles: true,
        composed: true,
        detail: {
          model: this.model
        }
      })
    );
  }

  _handleBookmark(e) {
    this.close();
    this.dispatchEvent(
      new CustomEvent('card-bookmarked', {
        bubbles: true,
        composed: true,
        detail: {
          model: this.model
        }
      })
    );
  }

  _handleLaunch() {
    this.close();
    window.open(this.model.url);
  }

  open() {
    let sheet = this.$.sheet;
    sheet.open();
  }

  close(e) {
    let sheet = this.$.sheet;
    sheet.close();
  }
}

window.customElements.define(AspenSheet.is, AspenSheet);
