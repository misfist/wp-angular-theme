<!doctype html>
<html>
    <head>
        <!-- Base is required by Angular when using html5Mode unless requireBase is set to false https://docs.angularjs.org/error/$location/nobase -->
        <base href="<?php $url_info = parse_url( site_url() ); echo trailingslashit( $url_info['path'] ); ?>">
        <title><?php bloginfo( 'name' ); ?></title>
        <meta charset="UTF-8">

        <?php wp_head(); ?>
    </head>
    <body <?php body_class( $class ); ?>>

        <div id="page" ng-app="app">

            <navigation></navigation>

            <div class="container">

                <header class="blog-header">

                    <h1 class="blog-title">Angular Theme</h1>
                    <p class="lead blog-description">Wordpress theme built with Angularjs and Rest API.</p>
                </header>

                <main>
                    
                    <div class="col-lg-8">
                        <div ng-view></div>
                    </div>

                    <aside class="col-lg-4">
                        <sidebar></sidebar>
                    </aside>
                    
                </main>
                
            </div>

            <footer id="footer" class="footer">
                <div class="container">
                    <span class="rotate">&copy;</span> <?php echo date( 'Y' ); ?>
                </div>
            </footer>

            <?php wp_footer(); ?>
            
        </div>

    </body>
</html>