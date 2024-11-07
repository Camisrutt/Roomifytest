<?php
session_start();
require 'api_helper.php'; // Ensure this helper is available to call Node.js APIs

// 获取用户输入的用户名和密码
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// 检查输入是否为空
if (empty($username) || empty($password)) {
    header("Location: login-page.html?error=1");
    exit();
}

try {
    // 调用 Node.js 的 read API 来检索用户信息
    $user = callNodeAPI("read?username=" . urlencode($username));

    // 检查是否查询到用户
    if ($user) {
        echo 'User found: ';
        var_dump($user);  // 输出用户数据，确认查询结果

        // 验证用户输入的密码是否与数据库中的哈希密码匹配
        if (password_verify($password, $user['password'])) {
            echo 'Password verified successfully';
            $_SESSION['username'] = $user['username'];
            header("Location: login_success.html"); // 登录成功，跳转到成功页面
            exit();
        } else {
            echo 'Password verification failed'; // 密码验证失败
            header("Location: login-page.html?error=1");
            exit();
        }
    } else {
        echo 'User not found'; // 未找到用户
        header("Location: login-page.html?error=2");
        exit();
    }
} catch (Exception $e) {
    // 处理 API 调用错误
    error_log("API Error: " . $e->getMessage(), 0);
    echo "An error occurred while accessing the database. Please try again later.";
}
