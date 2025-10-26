document.getElementById("sumaForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let num1 = document.getElementById("num1").value.trim();
  let num2 = document.getElementById("num2").value.trim();
  let resultadoInput = document.getElementById("resultado").value.trim();

  let valorXField = document.getElementById("valorX");
  let sumaField = document.getElementById("sumaCorrecta");

  // limpiar antes de calcular
  valorXField.value = "";
  sumaField.value = "";

  if (num1.length !== 3 || num2.length !== 3) {
    alert("Los números 1 y 2 deben tener exactamente 3 cifras (ej: 123, 3X7).");
    return;
  }

  let valorX = null;
  let sumaCorrecta = null;

  num1 = num1.toUpperCase();
  num2 = num2.toUpperCase();
  let resultado = resultadoInput.toUpperCase();

  if (/X/i.test(num1)) {
    for (let i = 0; i <= 9; i++) {
      let posibleNum1 = parseInt(num1.replace(/X/gi, i));
      let posibleNum2 = parseInt(num2);
      if (!isNaN(posibleNum1) && !isNaN(posibleNum2)) {
        let suma = posibleNum1 + posibleNum2;
        if (suma === parseInt(resultadoInput.replace(/X/gi, i))) {
          valorX = i;
          sumaCorrecta = suma;
          break;
        }
      }
    }
  } else if (/X/i.test(num2)) {
    for (let i = 0; i <= 9; i++) {
      let posibleNum2 = parseInt(num2.replace(/X/gi, i));
      let posibleNum1 = parseInt(num1);
      if (!isNaN(posibleNum1) && !isNaN(posibleNum2)) {
        let suma = posibleNum1 + posibleNum2;
        if (suma === parseInt(resultadoInput.replace(/X/gi, i))) {
          valorX = i;
          sumaCorrecta = suma;
          break;
        }
      }
    }
  } else if (/X/i.test(resultado)) {
    for (let i = 0; i <= 9; i++) {
      let posibleResultado = parseInt(resultado.replace(/X/gi, i));
      let posibleNum1 = parseInt(num1);
      let posibleNum2 = parseInt(num2);
      if (!isNaN(posibleNum1) && !isNaN(posibleNum2)) {
        if (posibleNum1 + posibleNum2 === posibleResultado) {
          valorX = i;
          sumaCorrecta = posibleResultado;
          break;
        }
      }
    }
  } else {
    let posibleNum1 = parseInt(num1);
    let posibleNum2 = parseInt(num2);
    let suma = posibleNum1 + posibleNum2;
    if (suma === parseInt(resultadoInput)) {
      sumaCorrecta = suma;
    }
  }

  // Mostrar resultados en el formulario
  if (valorX !== null) {
    valorXField.value = valorX;
    sumaField.value = sumaCorrecta;
  } else if (sumaCorrecta !== null) {
    valorXField.value = "No aplica";
    sumaField.value = sumaCorrecta;
  } else {
    valorXField.value = "No encontrado";
    sumaField.value = "Error";
  }
});