<?php 
include '../db.php'; 

// Delete a service
if(isset($_GET['del_service'])) {
    $id = $_GET['del_service'];
    mysqli_query($conn, "DELETE FROM services WHERE id=$id");
    header("Location: index.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard | Muhabura Hotel</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; padding: 40px; background: #f4f7f6; color: #333; }
        .container { max-width: 1000px; margin: auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
        h1, h2 { color: #1f3c88; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 40px; }
        th, td { padding: 15px; text-align: left; border-bottom: 1px solid #eee; }
        th { background: #1f3c88; color: white; }
        .btn { padding: 8px 15px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 0.9rem; }
        .btn-add { background: #27ae60; color: white; float: right; }
        .btn-del { color: #e74c3c; }
    </style>
</head>
<body>

<div class="container">
    <h1>Management Dashboard</h1>
    
    <h2>Recent Client Leads</h2>
    <table>
        <tr>
            <th>Phone Number</th>
            <th>Date Captured</th>
            <th>Action</th>
        </tr>
        <?php
        $leads = mysqli_query($conn, "SELECT * FROM leads ORDER BY created_at DESC");
        while($l = mysqli_fetch_assoc($leads)) {
            echo "<tr>
                    <td>{$l['phone']}</td>
                    <td>{$l['created_at']}</td>
                    <td><a href='https://wa.me/{$l['phone']}' target='_blank' style='color:#27ae60;'>Contact via WhatsApp</a></td>
                  </tr>";
        }
        ?>
    </table>

    <hr>

    <a href="add_service.php" class="btn btn-add">+ Add New Service/Room</a>
    <h2>Manage Services & Prices</h2>
    <table>
        <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price Range (RWF)</th>
            <th>Actions</th>
        </tr>
        <?php
        $res = mysqli_query($conn, "SELECT * FROM services ORDER BY category ASC");
        while($r = mysqli_fetch_assoc($res)) {
            echo "<tr>
                    <td><strong>{$r['name']}</strong></td>
                    <td>{$r['category']}</td>
                    <td>" . number_format($r['min_price']) . " - " . number_format($r['max_price']) . "</td>
                    <td>
                        <a href='index.php?del_service={$r['id']}' class='btn-del' onclick='return confirm(\"Delete this service?\")'>Delete</a>
                    </td>
                  </tr>";
        }
        ?>
    </table>
    
    <p style="text-align: center;"><a href="../index.php">← Back to Public Website</a></p>
</div>

</body>
</html>