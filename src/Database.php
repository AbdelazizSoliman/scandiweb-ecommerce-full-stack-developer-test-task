<?php

namespace App;

use PDO;

class Database
{
    private $connection;
    private $statement;

    public function __construct()
    {
        $dbConfig = require base_path('src/config/database.php') ?? [];
        $dsn = 'mysql:' . http_build_query($dbConfig, arg_separator: ';');

        try {
            $this->connection = new PDO($dsn, options: [
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        } catch (\Exception $e) {
            // dd('Connection failed: ' . $e->getMessage());
            abort(500, 'Database connection failed');
        }
    }

    public function query($query, $params = [])
    {

        $this->statement = $this->connection->prepare($query);
        $this->statement->execute($params);

        return $this;
    }

    public function get()
    {
        return $this->statement->fetchAll();
    }

    public function find()
    {
        return $this->statement->fetch();
    }

    public function findOrFail()
    {
        $result = $this->find();

        if (!$result) {
            abort();
        }

        return $result;
    }
}
