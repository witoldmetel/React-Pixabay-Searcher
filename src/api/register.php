<?php include './DB.php';

    private $connection;

    public

    function __construct()
        {
            $this->connection = new DB();
            $this->connection = $this->connection->getDB();
        }


    $json = file_get_contents('index.php');
    echo $json;
 
	 // decoding the received JSON and store into $obj variable.
    $obj = json_decode($json,true);

	 // name store into $name.
	$Id = $obj['Id'];

	// same with $email.
	$Name = $obj['Name'];

	// same with $password.
	$Category = $obj['Category'];

	if($obj['Id']!="")
	{

	$result= $mysqli->query("SELECT * FROM images where Id='$Id'");

	
		if($result->num_rows>0){
			echo json_encode('email already exist');  // alert msg in react native		 		
		}
		else
		{
		   $add = $mysqli->query("insert into images (Id,Name,Category) values('$Id','$Name','$Category')");

			if($add){
				echo  json_encode('User Registered Successfully'); // alert msg in react native
			}
			else{
			   echo json_encode('check internet connection'); // our query fail
			}
				
		}
	}
	
	else{
        echo json_encode('try again');
    }

    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");

?>