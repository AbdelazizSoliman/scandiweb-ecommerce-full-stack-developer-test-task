<?php

namespace App\GraphQL;

use Throwable;
use RuntimeException;
use GraphQL\Type\Schema;
use App\GraphQL\Query;
use App\GraphQL\Mutation;
use GraphQL\Type\SchemaConfig;
use GraphQL\GraphQL as GraphQLBase;

class Controller
{
    static public function handle()
    {
        try {
            // Define query and mutation types
            $queryType = Query::defineQueries();
            $mutationType = Mutation::defineMutations();

            // Create GraphQL schema
            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery($queryType)
                    ->setMutation($mutationType)
            );

            // Execute GraphQL query
            $output = self::executeQuery($schema);
        } catch (Throwable $e) {
            // Handle exceptions
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        // Set response headers and return JSON output
        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }

    private static function executeQuery($schema)
    {
        // Retrieve GraphQL query from request
        $rawInput = file_get_contents('php://input');
        if ($rawInput === false) {
            throw new RuntimeException('Failed to get php://input');
        }

        // Parse input and execute GraphQL query
        $input = json_decode($rawInput, true);
        $query = $input['query'];
        $variableValues = $input['variables'] ?? null;

        $rootValue = ['prefix' => 'You said: '];
        // Execute the query against the schema
        $result = GraphQLBase::executeQuery($schema, $query, $rootValue, null, $variableValues);
        return $result->toArray(); // Convert result to array format
    }
}
