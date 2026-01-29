<?php 
// Go up one folder to find the database connection
include '../db.php'; 

// Handle Delete
if(isset($_GET['delete'])) {
    $id = $_GET['delete'];
    mysqli_query($conn, "DELETE FROM services WHERE id=$id");
    header('location: index.php');
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Muhabura Admin</title>
    <link rel="stylesheet" href="../styles.css">
    <style>
        .admin-container { max-width: 1000px; margin: 50px auto; padding: 20px; background: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 15px; text-align: left; border-bottom: 1px solid #eee; }
        th { background: #1f3c88; color: white; }
        .badge { padding: 5px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .badge-room { background: #e3f2fd; color: #1976d2; }
        .badge-extra { background: #f3e5f5; color: #7b1fa2; }
        .btn-add { background: #27ae60; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; float: right; }
    </style>
</head>
<body>
    <div class="admin-container">
        <a href="add_service.php" class="btn-add">+ Add New Service</a>
        <h1>Hotel Management</h1>
        <p>Control prices for Muhabura Hotel Cloud System</p>

        <table>
            <thead>
                <tr>
                    <th>Service Name</th>
                    <th>Category</th>
                    <th>Min Price</th>
                    <th>Max Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $result = mysqli_query($conn, "SELECT * FROM services ORDER BY category DESC");
                while($row = mysqli_fetch_assoc($result)) {
                    $badgeClass = ($row['category'] == 'Room') ? 'badge-room' : 'badge-extra';
                    echo "<tr>
                        <td><strong>{$row['service_name']}</strong></td>
                        <td><span class='badge {$badgeClass}'>{$row['category']}</span></td>
                        <td>".number_format($row['min_price'])." RWF</td>
                        <td>".number_format($row['max_price'])." RWF</td>
                        <td>
                            <a href='index.php?delete={$row['id']}' style='color:red;' onclick='return confirm(\"Delete this service?\")'>Delete</a>
                        </td>
                    </tr>";
                }
                ?>
            </tbody>
        </table>
        <br>
        <a href="../index.php">← View Public Website</a>
    </div>
</body>
</html>