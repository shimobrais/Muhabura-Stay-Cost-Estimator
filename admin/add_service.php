<?php 
include '../db.php'; 

if(isset($_POST['submit'])) {
    $name = $_POST['name'];
    $min = $_POST['min'];
    $max = $_POST['max'];
    $cat = $_POST['category'];

    $sql = "INSERT INTO services (service_name, min_price, max_price, category) VALUES ('$name', '$min', '$max', '$cat')";
    if(mysqli_query($conn, $sql)) {
        header('location: index.php');
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Add Service</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body style="display:flex; justify-content:center; align-items:center; height:100vh;">
    <div class="panel" style="width: 400px;">
        <h2>Add New Hotel Service</h2>
        <form method="POST">
            <label>Service Name</label>
            <input type="text" name="name" placeholder="e.g. Luxury Suite" required>
            
            <label>Category</label>
            <select name="category">
                <option value="Room">Room</option>
                <option value="Extra">Extra Service</option>
            </select>

            <label>Minimum Price (RWF)</label>
            <input type="number" name="min" required>

            <label>Maximum Price (RWF)</label>
            <input type="number" name="max" required>

            <button type="submit" name="submit" class="btn-booking">Save to Cloud DB</button>
            <a href="index.php" style="display:block; text-align:center; margin-top:10px;">Cancel</a>
        </form>
    </div>
</body>
</html>