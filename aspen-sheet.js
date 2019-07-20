import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { AspenSecurableMixin } from './aspen-security/aspen-securable-mixin';
/**
 * `aspen-sheet`
 * common base class
 *
 * @customElement
 * @polymer
 */
class AspenSheet extends AspenSecurableMixin(Polymer.Element) {
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
      },

      /** The ID of the company */
      companyId: {
        type: String,
        value: ''
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

    Polymer.RenderStatus.afterNextRender(this, function() {});
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

  _handleLaunch() {
    this.close();
    window.open(this.model.url);
  }

  /**
   * This method opens an Indeed.com job search in a new window, showing all jobs in a particular
   * company.
   */

  _handleIndeed() {
    window.open(`https://www.indeed.com/jobs?q=${this.model.name}`);
  }

  /**
   * This method is responsible for displaying the project pipeline for the company
   */
  _handlePipeline() {
    window.location = '/company-pipeline/' + this.model.$key;
  }

  /**
   * This method displays the Twitter page for the resource.
   */

  _handleTwitter() {
    window.open(`https://www.twitter.com/${this.model.twitter}`);
  }

  /**
   * This method displays the map view showing the location of the company.
   */
  _handleMap() {
    window.open('https://www.google.com/maps/place/' + this.model.address);
  }

  /**
   * This method opens a new window and searches for clinical trials lead by the company.
   */
  _handleClinicalTrial() {
    let name = this.model.name.replace(' ', '%20');
    let url = `https://clinicaltrials.gov/ct2/results?lead=${name}&spons=${name}`;
    window.open(url);
  }

  /**
   * This method displays the company news.
   */
  _handleNews() {
    window.location = '/resource-news/' + this.model.$key;
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
