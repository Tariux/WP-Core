<?php

function send_raw($data, $status = 200) {
    return new \WP_REST_Response($data, $status);
}

function send_error($message, $status = 400) {
    return new \WP_Error('error', $message, ['status' => $status]);
}

function send_json($data, $status = 200) {
    $response = new \WP_REST_Response($data, $status);
    $response->set_headers(['Content-Type' => 'application/json']);
    return $response;
}