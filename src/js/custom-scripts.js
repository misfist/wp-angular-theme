/*jslint white: true */

jQuery( document ).ready( function( $ ) {

    console.log( 'custom-script.js loaded' );

    var $lightbox = $( '#lightbox' );
    var $selector = $( 'a[data-target="#lightbox"]' );

    console.log( '$selector', $selector );

    $selector.click( function( event ) {

        event.preventDefault();

        alert( 'clicked' );

    } );

    // $( "a[data-target='#lightbox']" ).click( function( event ) {

    //     console.log( 'image clicked' );

    //     event.preventDefault();

    //     var $img = $( this ).find( 'img' ), 
    //         src = $img.attr( 'src' ),
    //         alt = $img.attr( 'alt' ),
    //         css = {
    //             'maxWidth': $( window ).width() - 100,
    //             'maxHeight': $( window ).height() - 100
    //         };
    
    //     $lightbox.find( '.close' ).addClass( 'hidden' );
    //     $lightbox.find( 'img' ).attr( 'src', src );
    //     $lightbox.find( 'img' ).attr( 'alt', alt );
    //     $lightbox.find( 'img' ).css( css );
    // });
    
    // $lightbox.on('shown.bs.modal', function ( e ) {
    //     var $img = $lightbox.find( 'img' );
            
    //     $lightbox.find( '.modal-dialog' ).css({
    //         'width': $img.width()
    //     });
    //     $lightbox.find( '.close' ).removeClass( 'hidden' );
    // });

});
