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
                "Id_image" => $Fetch['Id_image'],
                "Name_image" => $Fetch['Name_image'],
                "Category_image" => $Fetch['Category_image'],
                "img_url" => $Fetch['img_url']
            ];

            $Index++;
        }

        header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");
        echo json_encode($Data);
    }
}
?>