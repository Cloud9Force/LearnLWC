import { LightningElement, api } from 'lwc';

export default class GetterSetterChild extends LightningElement {

    /**
     * ============================================================
     * PRIVATE BACKING FIELD
     * ============================================================
     *
     * We NEVER expose this directly.
     * It stores the raw value after processing.
     */
    _count = 0;
    //Why not just use @api count;?❌ This is fragile:
    //"10" stays "10"count + 1 becomes "101"✅ Getter/setter prevents this.
    /**
     * ============================================================
     * PUBLIC PROPERTY WITH GETTER & SETTER
     * ============================================================
     *Always use a getter & setter when:
     *the value comes from HTML attributes
     *the type matters (number, boolean) 
     *validation is needed
     *transformation is required
    */

    /**
     * @api can be applied to a getter/setter pair
     * Setter runs whenever parent sets the value
     * Getter runs whenever template reads the value
     */
    @api
    set count(value) {
        /*
            IMPORTANT:
            - HTML attributes arrive as strings
            - JavaScript bindings preserve type
            - We normalize everything here
        */

        const parsed = Number(value);

        // Defensive programming for beginners
        this._count = isNaN(parsed) ? 0 : parsed;
    }

    get count() {
        return this._count;
    }

    /**
     * Derived value using a normal getter
     */
    get doubledCount() {
        return this._count * 2;
    }

     /* ============================================================
       PRIVATE BACKING FIELDS
       ============================================================ */
       _isActive = false;
       _label = '';
   
   
       /* ============================================================
          BOOLEAN GETTER / SETTER
          ============================================================ */
       /**
        * TEACHING POINT:
        * - HTML attributes arrive as strings
        * - App Builder ALWAYS sends strings
        * - Setter normalizes to a boolean
        */
       @api
       set isActive(value) {
           /*
               Possible incoming values:
               - true / false (JS binding)
               - "true" / "false" (HTML or App Builder)
               - empty string (attribute present)
           */
           this._isActive = value === true || value === 'true' || value === '';
       }
   
       get isActive() {
           return this._isActive;
       }
   
   
       /* ============================================================
          STRING NORMALIZATION GETTER / SETTER
          ============================================================ */
       /**
        * TEACHING POINT:
        * - Strings may contain whitespace
        * - App Builder user input is uncontrolled
        * - Normalize once in setter
        */
       @api
       set label(value) {
           if (typeof value !== 'string') {
               this._label = '';
               return;
           }
   
           // Normalize: trim + title case
           const trimmed = value.trim();
           this._label =
               trimmed.charAt(0).toUpperCase() +
               trimmed.slice(1).toLowerCase();
       }
   
       get label() {
           return this._label;
       }
   
   
       /* ============================================================
          DERIVED VALUE (COMPUTED GETTER)
          ============================================================ */
       get statusText() {
           return this.isActive ? 'Active' : 'Inactive';
       }

       /* ============================================================
       PRIVATE BACKING FIELD
       ============================================================ */
    _config = {
        title: 'Default Title',
        count: 0,
        isActive: false
    };

    /* ============================================================
       OBJECT NORMALIZATION WITH GETTER / SETTER
       ============================================================ */
    /**
     * TEACHING POINT:
     * - Objects passed via @api are NOT reactive when mutated
     * - App Builder may send incomplete or string-based objects
     * - We normalize ONCE in the setter
     * @api config;❌ Bad:
     * this.config.title = 'x'; // ❌ no reactivity
     * connectedCallback() {
        *this.config = JSON.parse(this.config); // ❌ too late
    
     * Why object setters are mandatory
     * - No validation
     * * - No defaults
     * * - String values leak into logic
     * * - App Builder breaks you silently
     */
    @api
    set config(value) {
        /*
            Defensive checks:
            - null / undefined
            - non-object values
        */
        if (!value || typeof value !== 'object') {
            this._config = {
                title: 'Default Title',
                count: 0,
                isActive: false
            };
            return;
        }

        /*
            Normalize each property explicitly.
            Never trust incoming object shape.
            * - Why you must replace the whole object, not just part of it
            * LWC tracks references, not deep mutations
            * Partial mutation won't trigger re-render
            * Immutable assignment guarantees reactivity
        */
        this._config = {
            title: typeof value.title === 'string'
                ? value.title.trim()
                : 'Default Title',

            count: Number.isFinite(Number(value.count))
                ? Number(value.count)
                : 0,

            isActive:
                value.isActive === true ||
                value.isActive === 'true'
        };
    }

    get config() {
        return this._config;
    }

    /* ============================================================
       DERIVED / SAFE GETTERS
       ============================================================ */
    get title() {
        return this._config.title;
    }

    get count() {
        return this._config.count;
    }

    get isActive() {
        return this._config.isActive;
    }

    get statusText() {
        return this.isActive ? 'Active' : 'Inactive';
    }
}