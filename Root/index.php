<?php
// index.php

// Show PHP info
function showPhpInfo() {
    phpinfo();
}

// Helper function for calling Node.js API
require 'api_helper.php';

// Start session for functions that require it
session_start();

// Login process
function loginProcess() {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        header("Location: login-page.html?error=1");
        exit();
    }

    try {
        $user = callNodeAPI("read?username=" . urlencode($username));

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['username'] = $user['username'];
            header("Location: login_success.html");
            exit();
        } else {
            header("Location: login-page.html?error=1");
            exit();
        }
    } catch (Exception $e) {
        error_log("API Error: " . $e->getMessage(), 0);
        echo "An error occurred while accessing the database. Please try again later.";
    }
}

// Update password process
function updatePassword() {
    $username = $_POST['username'];
    $new_password = password_hash($_POST['new_password'], PASSWORD_DEFAULT);
    $user = callNodeAPI("read?username=" . urlencode($username));

    if ($user) {
        $data = ['id' => $user['_id'], 'password' => $new_password];
        $response = callNodeAPI('update', 'PUT', $data);

        echo $response ? "Password updated successfully." : "Failed to update password.";
    } else {
        echo "User not found.";
    }
}

// Verify password (login)
function verifyPassword() {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $user = callNodeAPI("read?username=" . urlencode($username));

    echo ($user && password_verify($password, $user['password'])) ? "Login successful" : "Invalid username or password";
}

// Signup process
function signupProcess() {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $data = ['username' => $username, 'email' => $email, 'password' => $password];
    $response = callNodeAPI('create', 'POST', $data);

    header("Location: " . ($response ? "signup_success.html" : "account_exists.html"));
    exit();
}

// Check password during login
function checkPassword() {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $user = callNodeAPI("read?username=" . urlencode($username));

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['username'] = $user['username'];
        header('Location: login_success.html?username=' . urlencode($username));
        exit();
    } else {
        header('Location: login-page.html?error=1');
        exit();
    }
}

// Main function router
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'phpinfo':
        showPhpInfo();
        break;
    case 'login':
        loginProcess();
        break;
    case 'update_password':
        updatePassword();
        break;
    case 'verify_password':
        verifyPassword();
        break;
    case 'signup':
        signupProcess();
        break;
    case 'check_password':
        checkPassword();
        break;
    default:
        echo "No valid action specified.";
        break;
}
