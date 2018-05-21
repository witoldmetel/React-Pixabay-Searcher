<?php

class DB{
    private $connection;

    public function __construct() {
        try {
            $this->connection = new PDO("mysql:host=localhost;dbname=react-database","root","");
        }
        catch (PDOException $error) {
            echo $error -> getMessage();
            exit("Database error");
        }
        return $this->connection;
    }

    public function getDB()
        {
        if ($this->connection instanceof PDO)
            {
            return $this->connection;
            }
        }
}
?>