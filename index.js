import ScreenBaseModule from '../tatty-screen-base-module/index';

export default class ScreenScanlines extends ScreenBaseModule {

    /**
     * @constructs
     */
    constructor( name='scanlinesModule') {
        this.name = name;
    }

    /**
     * Early initialise module
     */
    init() {
        Object.assign( this.defaults, {
            scanOffset: 3
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
                .tatty .scan {
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    background-repeat: repeat;
                    opacity: .3;
                }
            `);
        }, this );
    }



    /**
     * Exposed API
     */
    expose() {
        return {
            /**
             * Create the scanlines element
             */
            createScanlines: function() {
                var canvas = document.createElement( 'canvas' );
                var scan = document.createElement( 'div' );
                scan.classList.add( 'scan' );
                this.parent.appendChild( scan );

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
