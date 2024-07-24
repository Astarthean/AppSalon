<?php 

require_once __DIR__ . '/../includes/app.php';

use MVC\Router;
use Controllers\CitaController;
use Controllers\LoginController;

$router = new Router();

//Iniciar o cerrar sesión
$router->get('/', [LoginController::class, 'login']);
$router->post('/', [LoginController::class, 'login']);
$router->get('/logout', [LoginController::class, 'logout']);

//Recuperar password
$router->get('/forgot', [LoginController::class, 'forgot']);
$router->post('/forgot', [LoginController::class, 'forgot']);
$router->get('/recuperar', [LoginController::class, 'recuperar']);
$router->post('/recuperar', [LoginController::class, 'recuperar']);

//Crear cuenta
$router->get('/crear-cuenta', [LoginController::class, 'crearCuenta']);
$router->post('/crear-cuenta', [LoginController::class, 'crearCuenta']);

//Confirmar cuenta
$router->get('/confirmar-cuenta', [LoginController::class, 'confirmar']);

$router->get('/mensaje', [LoginController::class, 'mensaje']);

//AREA PRIVADA
$router->get('/cita', [CitaController::class, 'index']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();