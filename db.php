<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "muhabura";

// Create connection
$conn = mysqli_connect($host, $user, $pass, $db);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
else {
    // echo "Connection successful";
    // You can uncomment the line below for debugging purposes
    // echo "Connected successfully";
}
?>