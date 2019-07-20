/**
 * This mixin is used to determine if the user has admin privileges.
 * @polymerMixin
 * @mixinFunction
 */
export const AspenSecurityMixin = superclass =>
  class extends superclass {
    static get properties() {
      return {
        /** The user profile object from the firebase database. */
        user: {
          type: Object,
          notify: true,
          value: null
        },

        /** A flag that determines if the user is an administrator. */
        isAdmin: {
          type: Boolean,
          notify: true,
          computed: '_computeIsAdmin(user)'
        }
      };
    }

    /**
     * This method determines if the user is an administrator.
     * @param user The user profile object from the firebase database.
     */
    _computeIsAdmin(user) {
      return user && user.isAdmin ? user.isAdmin : false;
    }
  };
