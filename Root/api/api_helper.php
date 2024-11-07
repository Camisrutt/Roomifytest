<?php
function callNodeAPI($endpoint, $method = 'GET', $data = null) {
    $url = "https://your-vercel-app.vercel.app/api/$endpoint";
    $options = [
        'http' => [
            'method' => $method,
            'header' => 'Content-Type: application/json',
            'content' => $data ? json_encode($data) : ''
        ]
    ];
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    return json_decode($result, true);
}
?>
