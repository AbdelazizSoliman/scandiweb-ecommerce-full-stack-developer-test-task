<?php

/**
 * Dump the given value and terminate the script.
 *
 * @param mixed $value The value to be dumped.
 */
function dd($value)
{
    echo '<pre>';
    var_dump($value);
    echo '</pre>';
    exit;
}

/**
 * Get the base path of the application.
 *
 * @param string $path The relative path from the base path.
 * @return string The full path.
 */
function base_path($path = '')
{
    return rtrim(BASE_PATH, '/') . '/' . ltrim($path, '/');
}

/**
 * Abort the script with a given HTTP status code and message.
 *
 * @param int $code The HTTP status code.
 * @param string $message The error message.
 */
function abort($code = 404, $message = 'Resource not found.')
{
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode(['error' => $message]);
    exit;
}
