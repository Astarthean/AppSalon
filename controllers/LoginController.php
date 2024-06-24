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

    public static function forgot() {
        echo "desde olvide mi contraseña";
    }

    public static function recuperar() {
        echo "desde recuperar";
    }

    public static function crearCuenta() {
        echo "desde recuperar";
    }

}