<?php

namespace App\Models;

use App\Database;
use ReflectionClass;

abstract class Model
{
    protected Database $db;
    protected static string $table;

    public function __construct()
    {
        $this->db = new Database();

        if (!isset(static::$table)) {
            static::$table = strtolower((new ReflectionClass($this))->getShortName()) . 's';
        }
    }

    public static function all(): array
    {
        return (new static)->db->query('SELECT * FROM ' . static::$table)->get();
    }

    public static function find(string $value, ?string $column = 'id'): ?array
    {
        return (new static)->db->query(
            'SELECT * FROM ' . static::$table . ' WHERE ' . $column . ' = :value LIMIT 1',
            [
                'value' => $value,
            ]
        )->fetchOrFail();
    }
}