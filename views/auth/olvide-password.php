<h1 class="nombre-pagina">Olvide mi contraseña</h1>
<p class="descripcion-pagina">Reestablece tu contraseña</p>

<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<form class="formulario" action="/forgot" method="POST">

    <div class="campo">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Tu email">
    </div>

    <input type="submit" class="boton" value="Enviar">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia sesión!</a>
    <a href="/forgot">¿Aún no tienes una cuenta? Crea una!</a>
</div>