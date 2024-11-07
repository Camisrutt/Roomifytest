<?php
require 'api_helper.php';

$username = $_POST['username'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$data = ['username' => $username, 'email' => $email, 'password' => $password];
$response = callNodeAPI('create', 'POST', $data);

if ($response) {
    header("Location: signup_success.html");
    exit();
} else {
    header("Location: account_exists.html");
    exit();
}

