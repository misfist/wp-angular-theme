<?php 

/**
 * Scripts - enqueue the scripts
 */

function angular_theme_scripts() {

    wp_enqueue_style( 'theme-style', get_stylesheet_directory_uri() . '/assets/css/style.min.css' );

    wp_enqueue_script( 'angularjs', get_stylesheet_directory_uri() . '/assets/vendor/angular/angular.js', '', '', true );

    wp_enqueue_script( 'angularjs-route', get_stylesheet_directory_uri() . '/assets/vendor/angular-route/angular-route.min.js', '', '', true );

    wp_enqueue_script( 'angularjs-sanitize', get_stylesheet_directory_uri() . '/assets/vendor/angular-sanitize/angular-sanitize.min.js', '', '', true );

    wp_enqueue_script( 'theme-scripts', get_stylesheet_directory_uri() . '/assets/js/app.js', '', '', true );

    wp_enqueue_script( 'angularjs-wpservice', get_stylesheet_directory_uri() . '/assets/js/WPService.js', '', '', true );

    wp_enqueue_script( 'custom-scripts', get_stylesheet_directory_uri() . '/assets/js/custom-scripts.js', '', '', true );

    wp_localize_script( 'theme-scripts', 'ngThemeViews', 
        array(
            'partials' => get_stylesheet_directory_uri() . '/partials/',
            'sitename' => get_bloginfo( 'name' )
        ) 
    );

}

add_action( 'wp_enqueue_scripts', 'angular_theme_scripts' );


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

function unhide_kitchensink( $args ) {
    $args['wordpress_adv_hidden'] = false;
    return $args;
}

add_filter( 'tiny_mce_before_init', 'unhide_kitchensink' );


?>