<?php

namespace App\Contracts\GraphQL;

use GraphQL\Type\Definition\ObjectType;

interface Type
{
    public static function define(): ObjectType;
}