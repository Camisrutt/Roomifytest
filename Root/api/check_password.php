<?php
require 'api_helper.php';
session_start();

$username = $_POST['username'];
$password = $_POST['password'];

$user = callNodeAPI("read?username=$username");

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['username'] = $user['username'];
    header('Location: login_success.html?username=' . urlencode($username));
    exit();
} else {
    header('Location: login-page.html?error=1');
    exit();
}
?>
