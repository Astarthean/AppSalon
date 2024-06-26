<h1 class="nombre-pagina">Recuperar contraseña</h1>
<p class="descripcion-pagina">Coloca tu nueva contraseñaa continuación</p>

<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<?php if ($error) {return;} ?>

<form class="formulario" method="POST">

    <div class="campo">
        <label for="password">contraseña: </label>
        <input type="password" id="password" name="password" placeholder="Tu nueva contraseña">
    </div>

    <input type="submit" class="boton" value="Guardar contraseña">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia sesión!</a>
    <a href="/forgot">¿Aún no tienes una cuenta? Crea una!</a>
</div>