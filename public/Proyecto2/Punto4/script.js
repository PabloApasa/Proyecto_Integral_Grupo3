     const boton = document.getElementById("mostrarBtn");
     const libretaInput = document.getElementById("libreta");


libretaInput.addEventListener("input", function() {
  this.value = this.value.replace(/[^0-9]/g, '');
});


boton.addEventListener("click", function() {
  
     const nombre = document.getElementById("nombre").value;
     const apellido = document.getElementById("apellido").value;
     const libreta = libretaInput.value;

  
  alert("Los datos ingresados son:\n" +
        "Nombre: " + nombre + "\n" +
        "Apellido: " + apellido + "\n" +
        "Libreta Universitaria: " + libreta);
});