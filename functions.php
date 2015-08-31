<?php 

function angular_theme_scripts() {

    wp_enqueue_style( 'theme-style', get_stylesheet_directory_uri() . '/assets/css/style.min.css' );

    wp_enqueue_script( 'angularjs', get_stylesheet_directory_uri() . '/assets/vendor/angular/angular.min.js');

    wp_enqueue_script( 'angularjs-route', get_stylesheet_directory_uri() . '/assets/vendor/angular-route/angular-route.min.js');

    wp_enqueue_script( 'angularjs-sanitize', get_stylesheet_directory_uri() . '/assets/vendor/angular-sanitize/angular-sanitize.min.js'  );

    wp_enqueue_script( 'theme-scripts', get_stylesheet_directory_uri() . '/assets/js/app.js');

    wp_localize_script( 'theme-scripts', 'ngThemeViews', 
        array(
            'partials' => get_stylesheet_directory_uri() . '/partials/'
        ) 
    );

}

add_action( 'wp_enqueue_scripts', 'angular_theme_scripts' );

?>