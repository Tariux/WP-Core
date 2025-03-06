<?php
add_action('rest_api_init', function () {
    register_rest_route('the-box-admin/v1', '/pages', array(
        'methods' => 'GET',
        'callback' => 'the_box_admin_get_pages_list',
    ));

    register_rest_route('the-box-admin/v1', '/pages', array(
        'methods' => 'POST',
        'callback' => 'the_box_admin_create_page',
    ));

    register_rest_route('the-box-admin/v1', '/pages/(?P<id>\d+)', array(
        'methods' => 'GET', 
        'callback' => 'the_box_admin_get_page',
    ));

    register_rest_route('the-box-admin/v1', '/pages/(?P<id>\d+)', array(
        'methods' => 'PUT',
        'callback' => 'the_box_admin_update_page',
    ));

    register_rest_route('the-box-admin/v1', '/pages/(?P<id>\d+)', array(
        'methods' => 'DELETE',
        'callback' => 'the_box_admin_delete_page',
    ));

    register_rest_route('the-box-admin/v1', '/pages/(?P<id>\d+)/key', array(
        'methods' => 'PATCH',
        'callback' => 'the_box_admin_update_page_key',
    ));
});
