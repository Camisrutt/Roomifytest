<?php
function callNodeAPI($endpoint, $method = 'GET', $data = null) {
    $url = "https://roomifytest-oxyoc976t-cameron-rutherfords-projects.vercel.app/api/$endpoint";
    $options = [
        'http' => [
            'method' => $method,
            'header' => 'Content-Type: application/json',
            'content' => $data ? json_encode($data) : ''
        ]
    ];

    $context = stream_context_create($options);
    $result = @file_get_contents($url, false, $context); // Suppress direct error to capture it manually

    if ($result === FALSE) {
        $error = error_get_last();
        error_log("API Request Failed: " . $error['message']);
        return null;  // Return null or handle as needed
    }
    
    return json_decode($result, true);
}

