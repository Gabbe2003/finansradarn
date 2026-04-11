<?php
/**
 * RankMath Pro configuration for FinansRadarn.
 * Runs on plugin activation. Safe to re-run — only sets options that are missing or outdated.
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function finansradarn_configure_rankmath() {
    if ( ! defined( 'RANK_MATH_VERSION' ) ) return;

    // ─── General settings ─────────────────────────────────────────────────────
    update_option( 'rank_math_general_settings', [
        'breadcrumbs'                 => 'on',
        'breadcrumbs_separator'       => '›',
        'breadcrumbs_home'            => 'on',
        'breadcrumbs_home_label'      => 'Hem',
        'breadcrumbs_archive_format'  => 'Arkiv för: %s',
        'breadcrumbs_search_format'   => 'Sökresultat för: %s',
        'breadcrumbs_404_label'       => 'Sidan hittades inte',
        'canonical_url'               => 'on',
        'redirect_404_to_homepage'    => 'on',
        'noindex_empty_taxonomies'    => 'on',
        'noindex_password_protected'  => 'on',
        'new_window_external_links'   => 'on',
        'add_img_alt'                 => 'on',
        'img_alt_format'              => '%title%',
        'attachment_redirect_urls'    => 'on',
        'link_redirect_to_www'        => 'off',
    ] );

    // ─── Titles & meta ────────────────────────────────────────────────────────
    update_option( 'rank_math_titles', [
        // Homepage
        'homepage_title'              => 'FinansRadarn — Ekonominyheter, Analys & Verktyg',
        'homepage_description'        => 'Sveriges ledande källa för ekonominyheter, marknadsdata, bolåneräntor och finansiella analyser. Uppdateras dagligen.',

        // Posts (articles)
        'pt_post_title'               => '%title% — FinansRadarn',
        'pt_post_description'         => '%excerpt%',
        'pt_post_robots'              => [ 'index', 'follow', 'max-snippet:-1', 'max-image-preview:large', 'max-video-preview:-1' ],
        'pt_post_schema_type'         => 'NewsArticle',   // Rich results for news
        'pt_post_default_snippet_name'=> '%title%',
        'pt_post_default_snippet_desc'=> '%excerpt%',

        // Pages
        'pt_page_title'               => '%title% — FinansRadarn',
        'pt_page_description'         => '%excerpt%',
        'pt_page_robots'              => [ 'index', 'follow' ],

        // Categories
        'cat_title'                   => '%term% — Nyheter & Analys | FinansRadarn',
        'cat_description'             => '%term_description%',
        'cat_robots'                  => [ 'index', 'follow' ],

        // Tags — noindex to avoid thin content
        'tag_title'                   => '%term% — FinansRadarn',
        'tag_robots'                  => [ 'noindex', 'follow' ],

        // Author archives
        'author_archive_title'        => '%author_name% — FinansRadarn',
        'author_archive_description'  => 'Artiklar och analyser av %author_name% på FinansRadarn.',
        'author_robots'               => [ 'index', 'follow' ],

        // Date / search / 404
        'date_archive_title'          => 'Arkiv: %date% — FinansRadarn',
        'search_title'                => 'Sökresultat för &ldquo;%search_query%&rdquo; — FinansRadarn',
        '404_title'                   => 'Sidan hittades inte — FinansRadarn',

        'noindex_search'              => 'on',
        'noindex_archive_subpages'    => 'off',
    ] );

    // ─── Social / Open Graph ──────────────────────────────────────────────────
    update_option( 'rank_math_social_settings', [
        'open_graph'                  => 'on',
        'og_locale'                   => 'sv_SE',         // Swedish locale in OG tags
        'twitter_card'                => 'on',
        'twitter_card_type'           => 'summary_large_image',
        'facebook_author_urls'        => 'on',
    ] );

    // ─── Sitemap ──────────────────────────────────────────────────────────────
    update_option( 'rank_math_sitemap_settings', [
        'items_per_page'              => 200,
        'include_images'              => 'on',
        'ping_engines'                => 'on',
        'html_sitemap'                => 'off',
        'html_sitemap_sort'           => 'published',
        // Post types to include
        'pt_post_sitemap'             => 'on',
        'pt_page_sitemap'             => 'on',
        'pt_post_image_sitemap'       => 'on',
        // Exclude attachment pages from sitemap
        'pt_attachment_sitemap'       => 'off',
    ] );

    // ─── Enable key modules ───────────────────────────────────────────────────
    update_option( 'rank_math_modules', [
        'link-counter',
        'sitemap',
        'rich-snippet',
        'seo-analysis',
        'instant-indexing',
        'content-ai',
        'acf',
    ] );
}

/**
 * Expose RankMath SEO head data on post REST responses.
 * Next.js can read `seo_head` to inject the full <head> block server-side.
 */
function finansradarn_expose_rankmath_rest() {
    if ( ! defined( 'RANK_MATH_VERSION' ) ) return;

    register_rest_field( 'post', 'seo', [
        'get_callback' => function ( $post ) {
            return [
                'title'       => get_post_meta( $post['id'], 'rank_math_title',            true ) ?: get_the_title( $post['id'] ) . ' — FinansRadarn',
                'description' => get_post_meta( $post['id'], 'rank_math_description',       true ) ?: get_the_excerpt( $post['id'] ),
                'og_title'    => get_post_meta( $post['id'], 'rank_math_facebook_title',    true ),
                'og_image'    => get_post_meta( $post['id'], 'rank_math_facebook_image',    true ),
                'canonical'   => get_post_meta( $post['id'], 'rank_math_canonical_url',     true ) ?: get_permalink( $post['id'] ),
                'robots'      => get_post_meta( $post['id'], 'rank_math_robots',            true ),
                'schema_type' => get_post_meta( $post['id'], 'rank_math_rich_snippet',      true ) ?: 'NewsArticle',
                'focus_kw'    => get_post_meta( $post['id'], 'rank_math_focus_keyword',     true ),
                'seo_score'   => get_post_meta( $post['id'], 'rank_math_seo_score',         true ),
            ];
        },
        'schema' => [ 'type' => 'object' ],
    ] );
}

add_action( 'rest_api_init', 'finansradarn_expose_rankmath_rest' );
