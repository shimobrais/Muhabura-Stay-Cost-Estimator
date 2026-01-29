<?php 
include '../db.php'; 

if(isset($_POST['add_service'])) {
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $min = $_POST['min'];
    $max = $_POST['max'];
    $cat = $_POST['category'];

    $sql = "INSERT INTO services (name, min_price, max_price, category) VALUES ('$name', '$min', '$max', '$cat')";
    if(mysqli_query($conn, $sql)) {
        header("Location: index.php");
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add Service | Admin</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f4f7f6; }
        .form-card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 400px; }
        input, select, button { width: 100%; padding: 12px; margin-top: 10px; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; }
        button { background: #1f3c88; color: white; border: none; cursor: pointer; font-weight: bold; }
        label { display: block; margin-top: 15px; font-weight: bold; color: #1f3c88; }
    </style>
</head>
<body>

<div class="form-card">
    <h2 style="margin-top:0;">Add New Service</h2>
    <form method="POST">
        <label>Service/Room Name</label>
        <input type="text" name="name" placeholder="e.g., Deluxe Twin Room" required>

        <label>Category</label>
        <select name="category">
            <option value="Room">Room</option>
            <option value="Extra">Extra Service</option>
        </select>

        <label>Min Price (RWF)</label>
        <input type="number" name="min" required>

        <label>Max Price (RWF)</label>
        <input type="number" name="max" required>

        <button type="submit" name="add_service">Save to Cloud Database</button>
        <a href="index.php" style="display:block; text-align:center; margin-top:15px; font-size:0.9rem; color:#888; text-decoration:none;">Cancel</a>
    </form>
</div>

</body>
</html>