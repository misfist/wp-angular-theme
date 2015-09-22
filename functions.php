<?php 

/**
 * Scripts - enqueue the scripts
 */

function pea_angular_theme_scripts() {

    wp_enqueue_style( 'theme-style', get_stylesheet_directory_uri() . '/assets/css/style.min.css' );

    wp_enqueue_script( 'jquery' );
    
    wp_enqueue_script( 'custom-scripts', get_stylesheet_directory_uri() . '/assets/js/custom-scripts.js', '', '', true );

    wp_enqueue_script( 'angularjs', get_stylesheet_directory_uri() . '/assets/vendor/angular/angular.js', '', '', true );

    wp_enqueue_script( 'angularjs-route', get_stylesheet_directory_uri() . '/assets/vendor/angular-route/angular-route.min.js', '', '', true );

    wp_enqueue_script( 'angularjs-sanitize', get_stylesheet_directory_uri() . '/assets/vendor/angular-sanitize/angular-sanitize.min.js', '', '', true );

    wp_enqueue_script( 'angularjs-bootstrap', get_stylesheet_directory_uri() . '/assets/vendor/angular-bootstrap/ui-bootstrap.js', '', '', true );

    wp_enqueue_script( 'theme-scripts', get_stylesheet_directory_uri() . '/assets/js/app.js', '', '', true );

    wp_enqueue_script( 'theme-controller-scripts', get_stylesheet_directory_uri() . '/assets/js/app.controllers.js', '', '', true );

    wp_enqueue_script( 'theme-directive-scripts', get_stylesheet_directory_uri() . '/assets/js/app.directives.js', '', '', true );

    wp_enqueue_script( 'angularjs-wpservice', get_stylesheet_directory_uri() . '/assets/js/WPService.js', '', '', true );

    wp_localize_script( 'theme-scripts', 'ngThemeViews', 
        array(
            'partials' => get_stylesheet_directory_uri() . '/partials/',
            'sitename' => get_bloginfo( 'name' )
        ) 
    );

}

add_action( 'wp_enqueue_scripts', 'pea_angular_theme_scripts' );

/**
 * Add fields to Rest API return data
 * https://1fix.io/blog/2015/06/26/adding-fields-wp-rest-api/
 */

function pea_rest_prepare_post( $data, $post, $request ) {
    $_data = $data->data;
    $thumbnail_id = get_post_thumbnail_id( $post->ID );
    $thumbnail = wp_get_attachment_image_src( $thumbnail_id, 'thumbnail' );
    $thumbnail_full = wp_get_attachment_image_src( $thumbnail_id, 'full' );
    $_data['featured_image_thumbnail_url'] = $thumbnail[0];
    $_data['featured_image_thumbnail_full_url'] = $thumbnail_full[0];
    $_data['featured_image_thumbnail_title'] = get_the_title( $thumbnail_id );
    $_data['featured_image_thumbnail_caption'] = get_the_excerpt( $thumbnail_id );
    $data->data = $_data;
    return $data;
}
add_filter( 'rest_prepare_post', 'pea_rest_prepare_post', 10, 3 );

/**
 * Body Class - add slug and admin-bar to body class
 */

function pea_body_class_names(  ) {
    global $post; 

    $post_slug_class = $post->post_name; 
    $classes[] = $post_slug_class . ' page-' . $post_slug_class;

    if ( is_admin_bar_showing() ) {

        array_push($classes, "admin-bar");

    }

    return $classes;
}

add_filter( 'body_class', 'pea_body_class_names' );

/**
 * Media - set default image link location to 'None' 
 */

update_option('image_default_link_type','none');

/**
 * Theme Support
 */

add_theme_support( 'post-formats', array( 'image', 'gallery', 'video', 'link', 'audio' ) );
add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
add_theme_support( 'post-thumbnails', array( 'post', 'page', 'movie' ) );

/**
 * Always Show Kitchen Sink in WYSIWYG Editor
 */

function pea_unhide_kitchensink( $args ) {
    $args['wordpress_adv_hidden'] = false;
    return $args;
}

add_filter( 'tiny_mce_before_init', 'pea_unhide_kitchensink' );


?>