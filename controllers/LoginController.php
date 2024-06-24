<?php

namespace Controllers;
use MVC\Router;

class LoginController {

    public static function login(Router $router) {
        $router->render('auth/login', [
            
        ]);
    }

    public static function logout() {
        echo "desde logout";
    }

    public static function forgot(Router $router) {
        $router->render('auth/olvide-password', [
            
        ]);
    }

    public static function recuperar() {
        echo "desde recuperar";
    }

    public static function crearCuenta(Router $router) {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            # code...
        }

        $router->render('auth/crear-cuenta', [
            
        ]);
    }

}