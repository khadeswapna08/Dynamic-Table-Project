<?php
$servername = "localhost";
$username = "USERNAME";
$password = "PASSWORD";
$dbname = "user_db";
$table = "users";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT name, nickname, mobile_number, email, role, address, gender, profile_picture FROM $table";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($data);
?>
