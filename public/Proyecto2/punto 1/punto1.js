// 1.- Declarar una función con nombre calcularMayor() y pasarle como parámetros (numero1, numero2).
// Dentro de la función mostrar un alert que diga cuál de los números ingresados es mayor. En caso de ser
// iguales, tendrá que indicarlo a través de un alert también. Invocar la función y enviar los argumentos
// con diferentes números para probar.

function calcularMayor(numero1, numero2){
    if(numero1 > numero2){
        alert("El numero " + numero1 + " es mayor que" + numero2);
    }
    else if(numero2 > numero1){
        alert("El numero " + numero2 + " es mayor que" + numero1);
    }
    else{
        alert("Los numeros son iguales");
    }
}

// Probar funcion

calcularMayor(5, 10);
calcularMayor(20, 10);
calcularMayor(15, 15);