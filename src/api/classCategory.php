<?php
include("className.php");

class classCategory extends className{
    private $connection;

    public

    function __construct()
        {
        $this->connection = new className();
        $this->connection = $this->connection->getDB();
        }

    function displayData() {
        $BFetch = $this->connection -> prepare("SELECT * FROM images");
        $BFetch -> execute();

        $J = [];
        $I = 0;

        while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)) {
            $J[$I] = [
                "Id" => $Fetch['Id'],
                "Name" => $Fetch['Name'],
                "Category" => $Fetch['Category']
            ];

            $I++;
        }

        header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");
        echo json_encode($J);
    }
}
?>