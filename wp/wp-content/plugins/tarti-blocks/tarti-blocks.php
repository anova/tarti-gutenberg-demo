<?php
/*
Plugin Name: Tarti blocks
Description: Tarti Blokları (Demo)
*/


$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

function tarti_blocks_editor_assets() {
    global $asset_file;
    wp_register_script(
        'tarti-blocks-js',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );
    wp_enqueue_script( 'tarti-blocks-js' );
    wp_localize_script( 'tarti-blocks-js', 'articerrahiBlocks', [
        'imagesUrl' => plugin_dir_url( __FILE__ ) . 'images/',
    ] );

    wp_register_style(
        'tarti-blocks-css',
        plugins_url( 'build/index.css', __FILE__ ),
        null,
        //$asset_file['dependencies'],
        $asset_file['version']
    );
    wp_enqueue_style( 'tarti-blocks-css' );
}

add_action( 'enqueue_block_editor_assets', 'tarti_blocks_editor_assets' );

// function tarti_blocks_assets() {
//     global $asset_file;
//     wp_register_style(
//         'tarti-blocks-css',
//         plugins_url( 'build/index.css', __FILE__ ),
//         null,
//         //$asset_file['dependencies'],
//         $asset_file['version']
//     );
//     wp_enqueue_style( 'tarti-blocks-css' );
// }

// add_action( 'enqueue_block_assets', 'tarti_blocks_assets' );



function tarti_blocks_block_categories( $categories, $post ) {
    // if ( $post->post_type !== 'post' ) {
    //     return $categories;
    // }
    return array_merge(
        $categories,
        [
            [
                'slug' => 'tarti', //onceden eklenen bloklar eslesebilsin diye `tarti/` on ekiyle gelecek
                'title' => 'Tarti Blocks',
                'icon' => 'wordpress',
            ],
        ]
    );
}
add_filter( 'block_categories', 'tarti_blocks_block_categories', 10, 2 );
