<?php include('db-config.php') ?>
<?php 
    
    if($mysqli){

        //echo "user_id: ".$_POST["user_id"];
        //echo "desc: ".$_POST["desc"];
        //echo "timestamp: ".$_POST["timestamp"];
        
        if(isset($_POST["Pname"]) && isset($_POST["desc"]) && isset($_POST["timestamp"])){
           $results = $mysqli -> query("SELECT * FROM `patients` WHERE patient_name = '{$_POST["Pname"]}' ");
           $row = $results -> fetch_assoc();
           $patient_id = null;
           $patient_name = null;
           if($row!==null){
            $patient_id = $row["patient_id"];
            $patient_name = $row["patient_name"];
            //echo "\n".$patient_id." ".$row["patient_name"]."\n";
           }

           
           if($patient_id === null){
               $sql ="INSERT INTO patients (patient_name, patient_dob) VALUES ('{$_POST["Pname"]}', '{$_POST["DOB"]}')";
               if($mysqli -> query($sql) === TRUE){
                    $sql ="SELECT MAX(patient_id) as patient_id, patient_name  FROM `patients` WHERE patient_name = '{$_POST["Pname"]}' ";
                    $results = $mysqli -> query($sql);
                    $row = $results -> fetch_assoc();
                     //print_r($row);
                    $patient_id = $row["patient_id"];
                    $patient_name = $row["patient_name"];
               }

           }


               $sql = "INSERT INTO patient_uploads (patient_id, message, timestamp) VALUES ('{$patient_id}', '{$_POST["desc"]}', '{$_POST["timestamp"]}')";
               
               if($mysqli -> query($sql) === TRUE){
                    // copy images to the file system
                    // if uploads directory doesn't exist. Make one.
                    if(!file_exists("./uploads")){
                        mkdir("./uploads/", 0700);
                    }
                    // make directory name format: {patient_name}-{timestamp}
                    $uploads_dir = "./uploads/".$patient_name."-".$_POST["timestamp"];
                    mkdir($uploads_dir, 0700);
                    // echo "\n". $uploads_dir;
                    foreach ($_FILES["file1"]["error"] as $key => $error) {
                        if ($error == UPLOAD_ERR_OK) {
                            $tmp_name = $_FILES["file1"]["tmp_name"][$key];
                            $name = basename($_FILES["file1"]["name"][$key]);
                            move_uploaded_file($tmp_name, "$uploads_dir/$name");
                        }
                    } 
                    echo "Your record has been uploaded!";
               }else{
                   echo "Error: ". $mysqli -> error;
               }
               
           }
          
    }else{
        die("Lost connection with database.");
    }
?>
