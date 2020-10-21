<?php include('db-config.php') ?>
<?php 
    
    if(isset($_POST["psw"])){
        if($_POST["psw"] === "GenesisCare"){
            // 10 patient records per page
            $sql = "SELECT * FROM patients LIMIT 10";
            $results = $mysqli -> query($sql);
            $patients = $results -> fetch_all(MYSQLI_ASSOC);
            $results -> free_result();

            $info = array();
            foreach( $patients as $patient ){
                $sql = "SELECT message, timestamp FROM patient_uploads WHERE patient_id = {$patient['patient_id']}";
                $results = $mysqli -> query($sql);
                // Fetch all
                $list = $results -> fetch_all(MYSQLI_ASSOC);

                // add patient name & dob
                $combined_details = array("name"=>$patient["patient_name"], "dob" => $patient["patient_dob"], "list" => $list);
                array_push($info, $combined_details);
            }
            echo json_encode($info);
        }
    }

    if(isset($_GET["id"]) && isset($_GET["name"])){

        $path = "./uploads/{$_GET["name"]}-{$_GET["id"]}/*.*";
        $images = glob($path);
        $info = array();

        if(count($images)>0){
            foreach( $images as $image ){
                $new_path = "server/".explode("./", $image)[1];
                $data = array( "url" => $new_path);
                array_push($info, $data);
            }
            echo json_encode($info);
        }else{
            echo json_encode(array( "error" => "no images found"));
        }
    }

?>