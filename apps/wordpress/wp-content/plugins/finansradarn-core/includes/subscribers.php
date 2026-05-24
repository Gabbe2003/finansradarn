<?php
/**
 * Newsletter subscribers — CPT + public REST endpoint.
 * Stored as `fr_subscriber` posts so they're visible in wp-admin and trivially
 * exportable to CSV when we wire up a real email platform.
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// ─── Custom Post Type ────────────────────────────────────────────────────────
add_action( 'init', function () {
    register_post_type( 'fr_subscriber', [
        'labels' => [
            'name'          => 'Prenumeranter',
            'singular_name' => 'Prenumerant',
            'menu_name'     => 'Prenumeranter',
            'all_items'     => 'Alla prenumeranter',
            'add_new'       => 'Lägg till ny',
            'add_new_item'  => 'Lägg till prenumerant',
            'edit_item'     => 'Redigera prenumerant',
            'search_items'  => 'Sök prenumeranter',
            'not_found'     => 'Inga prenumeranter hittades',
        ],
        'public'              => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => false,
        'menu_icon'           => 'dashicons-email-alt',
        'menu_position'       => 25,
        'supports'            => [ 'title', 'custom-fields' ],
        'capability_type'     => 'post',
        'has_archive'         => false,
        'rewrite'             => false,
        'exclude_from_search' => true,
    ] );
} );

// ─── Admin list columns ──────────────────────────────────────────────────────
add_filter( 'manage_fr_subscriber_posts_columns', function ( $cols ) {
    return [
        'cb'         => $cols['cb'] ?? '',
        'title'      => 'E-post',
        'source'     => 'Källa',
        'subscribed' => 'Anmäld',
        'date'       => $cols['date'] ?? 'Datum',
    ];
} );

add_action( 'manage_fr_subscriber_posts_custom_column', function ( $col, $post_id ) {
    if ( $col === 'source' ) {
        echo esc_html( get_post_meta( $post_id, 'source', true ) ?: '—' );
    } elseif ( $col === 'subscribed' ) {
        $ts = (int) get_post_meta( $post_id, 'subscribed_at', true );
        echo $ts ? esc_html( date_i18n( 'Y-m-d H:i', $ts ) ) : '—';
    }
}, 10, 2 );

// ─── REST endpoint ───────────────────────────────────────────────────────────
add_action( 'rest_api_init', function () {
    register_rest_route( 'finansradarn/v1', '/subscribe', [
        'methods'             => 'POST',
        'permission_callback' => '__return_true', // public form
        'callback'            => 'finansradarn_subscribe_handler',
        'args'                => [
            'email' => [
                'required' => true,
                'type'     => 'string',
            ],
            'source' => [
                'required' => false,
                'type'     => 'string',
            ],
        ],
    ] );
} );

function finansradarn_subscribe_handler( WP_REST_Request $req ) {
    $email  = sanitize_email( trim( (string) $req->get_param( 'email' ) ) );
    $source = sanitize_text_field( substr( (string) $req->get_param( 'source' ), 0, 64 ) );

    if ( ! is_email( $email ) ) {
        return new WP_REST_Response( [
            'status'  => 'invalid_email',
            'message' => 'Ogiltig e-postadress.',
        ], 400 );
    }

    // Dedupe by email-as-title (case-insensitive)
    $existing = get_posts( [
        'post_type'      => 'fr_subscriber',
        'post_status'    => 'any',
        'title'          => $email,
        'posts_per_page' => 1,
        'fields'         => 'ids',
        'no_found_rows'  => true,
    ] );

    if ( ! empty( $existing ) ) {
        return new WP_REST_Response( [
            'status'  => 'already_subscribed',
            'message' => 'Du är redan prenumerant.',
        ], 200 );
    }

    $post_id = wp_insert_post( [
        'post_type'   => 'fr_subscriber',
        'post_status' => 'publish',
        'post_title'  => $email,
    ], true );

    if ( is_wp_error( $post_id ) ) {
        return new WP_REST_Response( [
            'status'  => 'error',
            'message' => 'Kunde inte spara prenumerationen.',
        ], 500 );
    }

    $ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( $_SERVER['REMOTE_ADDR'] ) : '';
    $ua = isset( $_SERVER['HTTP_USER_AGENT'] ) ? substr( sanitize_text_field( $_SERVER['HTTP_USER_AGENT'] ), 0, 255 ) : '';

    update_post_meta( $post_id, 'source',         $source ?: 'unknown' );
    update_post_meta( $post_id, 'ip',             $ip );
    update_post_meta( $post_id, 'user_agent',     $ua );
    update_post_meta( $post_id, 'subscribed_at',  time() );

    return new WP_REST_Response( [
        'status'  => 'subscribed',
        'message' => 'Tack! Du är nu prenumerant.',
    ], 201 );
}
