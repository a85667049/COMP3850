<?php include('db-config.php') ?>
<?php 
    
    if($mysqli){

        //echo "user_id: ".$_POST["user_id"];
        //echo "desc: ".$_POST["desc"];
        //echo "timestamp: ".$_POST["timestamp"];
        
        if(isset($_POST["user_id"]) && isset($_POST["desc"]) && isset($_POST["timestamp"])){
           $results = $mysqli -> query("SELECT * FROM `patients` WHERE user_id = {$_POST["user_id"]} ");
           $row = $results -> fetch_assoc();
           $patient_id = $row["patient_id"];
           $patient_name = $row["patient_name"];
           //echo "\n".$patient_id." ".$row["patient_name"]."\n";
           
           if($patient_id){
               
               $sql = "INSERT INTO patient_uploads (patient_id, message, timestamp) VALUES ('{$patient_id}', '{$_POST["desc"]}', '{$_POST["timestamp"]}')";
               
               if($mysqli -> query($sql) === TRUE){
                    // copy images to the file system
                    // make directory name format: {patient_name}-{timestamp}
                    $uploads_dir = "./uploads/".$patient_name."-".$_POST["timestamp"];
                    mkdir($uploads_dir, 0700);
                    // echo "\n". $uploads_dir;
                    foreach ($_FILES["file0"]["error"] as $key => $error) {
                        if ($error == UPLOAD_ERR_OK) {
                            $tmp_name = $_FILES["file0"]["tmp_name"][$key];
                            $name = basename($_FILES["file0"]["name"][$key]);
                            move_uploaded_file($tmp_name, "$uploads_dir/$name");
                        }
                    } 
                    echo "Your record has been uploaded!";
               }else{
                   echo "Error: ". $mysqli -> error;
               }
               
           }
        }

    }else{
        die("Lost connection with database.");
    }
?>