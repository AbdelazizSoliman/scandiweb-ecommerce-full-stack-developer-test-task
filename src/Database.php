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

    public function fetch()
    {
        return $this->statement->fetch();
    }

    public function findOrFail()
    {
        $result = $this->fetch();

        if (!$result) {
            abort();
        }

        return $result;
    }

    public function fetchColumn()
    {
        return $this->statement->fetchColumn();
    }

    public function getLastInsertId()
    {
        return $this->connection->lastInsertId();
    }

    public function beginTransaction()
    {
        return $this->connection->beginTransaction();
    }

    public function commit()
    {
        return $this->connection->commit();
    }

    public function rollback()
    {
        return $this->connection->rollBack();
    }
}
