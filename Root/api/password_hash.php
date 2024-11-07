<?php
require 'api_helper.php';

$username = $_POST['username'];
$new_password = password_hash($_POST['new_password'], PASSWORD_DEFAULT);
$user = callNodeAPI("read?username=$username");

if ($user) {
    $data = ['id' => $user['_id'], 'password' => $new_password];
    $response = callNodeAPI('update', 'PUT', $data);

    if ($response) {
        echo "Password updated successfully.";
    } else {
        echo "Failed to update password.";
    }
} else {
    echo "User not found.";
}
?>
