<?php
include("DB.php");

class DB_Connect extends DB{
    private $connection;

    public

    function __construct()
        {
            $this->connection = new DB();
            $this->connection = $this->connection->getDB();
        }

    function displayData() {
        $BFetch = $this->connection -> prepare("SELECT * FROM images");
        $BFetch -> execute();

        $Data = [];
        $Index = 0;

        while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)) {
            $Data[$Index] = [
                "Id" => $Fetch['Id'],
                "Name" => $Fetch['Name'],
                "Category" => $Fetch['Category']
            ];

            $Index++;
        }

        header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");
        echo json_encode($Data);
    }
}
?>