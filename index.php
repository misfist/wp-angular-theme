<!doctype html>
<html ng-app="app">
    <head>
        <!-- Base is required by Angular when using html5Mode unless requireBase is set to false https://docs.angularjs.org/error/$location/nobase -->
        <base href="<?php $url_info = parse_url( site_url() ); echo trailingslashit( $url_info['path'] ); ?>">
        <title>Angular Theme</title>
        <meta charset="UTF-8">

        <?php wp_head(); ?>
    </head>
    <body>

        <div class="container">

            <header>
                <h1>
                    <a href="<?php echo site_url(); ?>">Angular Theme</a>
                </h1>
            </header>

            <main ng-view>
                
            </main>

            <footer>
                <span class="rotate">&copy;</span> <?php echo date( 'Y' ); ?>
            </footer>
            
        </div>
        
        
    </body>
</html>