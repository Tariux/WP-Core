<?php
add_action('rest_api_init', function () {
    register_rest_route('my-public/v1', '/test', [
        [
            'methods' => 'GET',
            'callback' => 'get_pages_list',
            // 'permission_callback' => 'check_public_permission'
        ],
    ]);
});
