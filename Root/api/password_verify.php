<?php
require 'api_helper.php';

$username = $_POST['username'];
$password = $_POST['password'];
$user = callNodeAPI("read?username=$username");

if ($user && password_verify($password, $user['password'])) {
    echo "Login successful";
} else {
    echo "Invalid username or password";
}

