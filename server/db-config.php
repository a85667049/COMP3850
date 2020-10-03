<?php

    // Establish db connection
    global $mysqli;
    $mysqli = new mysqli("127.0.0.1", "root", "", "genesis_care");
    if (!$mysqli) {
        die('Could not connect: ' . mysql_error());
    }
    // echo 'Connected successfully';

?>