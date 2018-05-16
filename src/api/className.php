<?php
abstract class className{
    protected function connetDB() {
        try {
            $connection = new PDO("mysql:host=localhost;dbname=react-database","root","");
            return $connection;
        }
        catch (PDOException $error) {
            echo $error -> getMessage();
        }
    }
}
?>