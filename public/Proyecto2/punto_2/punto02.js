function calcularPromedio() {
    const num1 = parseInt(document.getElementById("num1").value);
    const num2 = parseInt(document.getElementById("num2").value);
    const num3 = parseInt(document.getElementById("num3").value);

    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
        alert("Por favor, ingrese números válidos");
        return;
    }

    const promedio = (num1 + num2 + num3) / 3;
    const resultadoElement = document.getElementById("resultado");
    resultadoElement.textContent = `El promedio de los números ingresados es: ${promedio.toFixed(2)}`;
}