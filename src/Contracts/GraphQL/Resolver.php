<?php

namespace App\Contracts\GraphQL;

interface Resolver
{
    public static function index(): array;
    public static function show(string $id): array;
}
