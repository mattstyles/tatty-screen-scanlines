import ScreenBaseModule from '../tatty-screen-base-module/index';

export default class ScreenScanlines extends ScreenBaseModule {

    /**
     * @constructs
     * @param name {String} the module id
     * @param el {HTMLElement} the element to attach to
     */
    constructor( name='scanlinesModule', el ) {
        this.name = name;
        this.parent = el;
    }

    /**
     * Early initialise module
     *
     * @param self {ScreenBaseModule} Screen will call init in its own scope but pass the module scope to it
     */
    init( self ) {
        Object.assign( this.defaults, {
            scanOffset: 3,
            scanOpacity: .3
        });

        this.on( 'ready', function() {
            if ( this.scan ) {
                console.error( 'Scan property already assigned' );
            }

            // Add scanlines object
            this.scan = this.createScanlines();

            // Append styles
            var style = document.head.querySelector( '#tatty' );
            style.innerHTML = style.innerHTML.concat(`
                .scan {
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    background-repeat: repeat;
                    opacity: ${ this.opts.scanOpacity };
                }
            `);
        }, this );
    }


    /**
     * Exposed API
     *
     * @param self {ScreenBaseModule} a reference to self
     */
    expose( self ) {
        return {
            /**
             * Create the scanlines element
             */
            createScanlines: function() {
                var canvas = document.createElement( 'canvas' );
                var scan = document.createElement( 'div' );
                scan.classList.add( 'scan' );

                var appendTo = self.parent || this.parent
                appendTo.appendChild( scan );

                var style = window.getComputedStyle( scan, null );

                canvas.width = 1;
                canvas.height = this.opts.scanOffset;
                var ctx = canvas.getContext( '2d' );

                ctx.fillStyle = style.color || '#fff';
                ctx.fillRect( 0, this.opts.scanOffset - 1, 1, 1 );

                scan.style.backgroundImage = 'url( ' + canvas.toDataURL() + ' )';

                return scan;
            }
        }
    }
}
