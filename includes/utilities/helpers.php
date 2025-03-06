<?php

function is_localhost() {
    // Get the server name or IP address
    $server_name = $_SERVER['SERVER_NAME'] ?? $_SERVER['HTTP_HOST'] ?? 'localhost';
    
    // Common localhost indicators
    $localhost_indicators = [
        'localhost',
        '127.0.0.1',
        '::1', // IPv6 localhost
    ];
    
    // Check if the server name matches any localhost indicators
    if ( in_array( strtolower( $server_name ), $localhost_indicators ) ) {
        return true;
    }
    
    // Check if the server name is an IP in the 192.168.x.x range
    if ( preg_match( '/^192\.168\.\d{1,3}\.\d{1,3}$/', $server_name ) ) {
        return true;
    }
    
    return false;
}