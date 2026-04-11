<?php
/**
 * Plugin Name: FinansRadarn Core
 * Description: Custom REST API extensions, RankMath SEO configuration, and headless integrations.
 * Version:     1.1.0
 * Author:      FinansRadarn
 */

if ( ! defined( 'ABSPATH' ) ) exit;

require_once __DIR__ . '/includes/rankmath-setup.php';

// ─── Run RankMath config on activation ───────────────────────────────────────
register_activation_hook( __FILE__, 'finansradarn_configure_rankmath' );

// Also run on every load in case settings were reset
add_action( 'init', function () {
    if ( ! get_option( 'finansradarn_rankmath_configured' ) ) {
        finansradarn_configure_rankmath();
        update_option( 'finansradarn_rankmath_configured', '1.1.0' );
    }
} );

// ─── REST fields: read_time, featured, views ─────────────────────────────────
add_action( 'rest_api_init', function () {

    register_rest_field( 'post', 'read_time', [
        'get_callback' => fn( $post ) => (int) get_post_meta( $post['id'], 'read_time', true ),
        'schema'       => [ 'type' => 'integer', 'description' => 'Estimated read time in minutes' ],
    ] );

    register_rest_field( 'post', 'featured_article', [
        'get_callback' => fn( $post ) => (bool) get_post_meta( $post['id'], 'featured_article', true ),
        'schema'       => [ 'type' => 'boolean', 'description' => 'Whether this is a featured article' ],
    ] );

    register_rest_field( 'post', 'views', [
        'get_callback' => fn( $post ) => [
            'today'   => (int) get_post_meta( $post['id'], 'views_today',    true ),
            'twoDays' => (int) get_post_meta( $post['id'], 'views_two_days', true ),
            'week'    => (int) get_post_meta( $post['id'], 'views_week',     true ),
        ],
        'schema' => [ 'type' => 'object' ],
    ] );

} );
