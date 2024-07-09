<?php

namespace App\Contracts\GraphQL;

use GraphQL\Type\Definition\ObjectType;

interface TypeContract
{
    public static function define(): ObjectType;
}