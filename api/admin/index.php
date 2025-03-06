<?php

function the_box_admin_get_pages_list(WP_REST_Request $request) : WP_REST_Response {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_crud_table';
    $pages = $wpdb->get_results("SELECT * FROM $table_name");

    return new WP_REST_Response($pages, 200);
}

function the_box_admin_create_page(WP_REST_Request $request) : WP_REST_Response {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_crud_table';

    $title = $request->get_param('title');
    $content = $request->get_param('content');

    $wpdb->insert($table_name, array(
        'title' => $title,
        'content' => $content,
    ));

    return new WP_REST_Response(['message' => 'Page created'], 200);
}

function the_box_admin_get_page(WP_REST_Request $request) : WP_REST_Response {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_crud_table';
    $id = $request->get_param('id');

    $page = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $id));

    return new WP_REST_Response($page, 200);
}

function the_box_admin_update_page(WP_REST_Request $request) : WP_REST_Response {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_crud_table';
    $id = $request->get_param('id');

    $title = $request->get_param('title');
    $content = $request->get_param('content');

    $wpdb->update($table_name, array(
        'title' => $title,
        'content' => $content,
    ), array('id' => $id));

    return new WP_REST_Response(['message' => 'Page updated'], 200);
}

function the_box_admin_delete_page(WP_REST_Request $request) : WP_REST_Response {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_crud_table';
    $id = $request->get_param('id');

    $wpdb->delete($table_name, array('id' => $id));

    return new WP_REST_Response(['message' => 'Page deleted'], 200);
}

function the_box_admin_update_page_key(WP_REST_Request $request) : WP_REST_Response {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_crud_table';
    $id = $request->get_param('id');
    $key = $request->get_param('key');
    $value = $request->get_param('value');

    $wpdb->update($table_name, array($key => $value), array('id' => $id));

    return new WP_REST_Response(['message' => 'Page key updated'], 200);
}