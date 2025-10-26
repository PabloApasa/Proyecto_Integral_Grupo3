alert("Trabajo Practico N*2 Grupo 3");
function reemplazarSignos(cadena) {
      let arr = cadena.split('');
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '?') {
          let suma = 0;
          let izq = i > 0 && !isNaN(arr[i-1]) ? parseInt(arr[i-1]) : 0;
          let der = i < arr.length-1 && !isNaN(arr[i+1]) ? parseInt(arr[i+1]) : 0;
          suma = izq + der;
          arr[i] = suma.toString();
        }
      }
      return arr.join('');
    }
    function procesarCadena() {
      const input = document.getElementById('cadenaInput').value;
      document.getElementById('original').textContent = "Cadena original: " + input;
      const resultado = reemplazarSignos(input);
      document.getElementById('resultado').textContent = "Resultado: " + resultado;
    }
