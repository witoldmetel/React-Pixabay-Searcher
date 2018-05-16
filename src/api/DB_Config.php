<?php
class DB_Config{
    private $connection;

    public function __construct() {
        try {
            $this->connection = new PDO("mysql:host=localhost;dbname=react-database","root","");
        }
        catch (PDOException $error) {
            echo $error -> getMessage();
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