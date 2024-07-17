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
            $queryType = Query::defineQueries();
            $mutationType = Mutation::defineMutations();

            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery($queryType)
                    ->setMutation($mutationType)
            );

            $output = self::executeQuery($schema);
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }

    private static function executeQuery($schema)
    {
        $rawInput = file_get_contents('php://input');
        if ($rawInput === false) {
            throw new RuntimeException('Failed to get php://input');
        }

        $input = json_decode($rawInput, true);
        $query = $input['query'];
        $variableValues = $input['variables'] ?? null;

        $rootValue = ['prefix' => 'You said: '];
        $result = GraphQLBase::executeQuery($schema, $query, $rootValue, null, $variableValues);
        return $result->toArray();
    }
}