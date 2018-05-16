<?php
include("DB.php");

class DB_Add extends DB{
    private $connection;

    public

    function __construct()
        {
            $this->connection = new DB();
            $this->connection = $this->connection->getDB();
        }

    function addDataToDB() {
        $query = "INSERT INTO images(Id, Name, Category) VALUES (:id, :name, :category)";
        $this->connection->exec($query);


    }

}
    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    echo json_encode($this->connection);

    $DB_Add = new DB_Add();
    $DB_Add -> addDataToDB();
?>