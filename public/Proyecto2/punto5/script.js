document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('salaryForm');
    const nombreInput = document.getElementById('nombre');
    const horasInput = document.getElementById('horas');
    const pagoHoraInput = document.getElementById('pagoHora');

    const nombreError = document.getElementById('nombreError');
    const horasError = document.getElementById('horasError');
    const pagoError = document.getElementById('pagoError');

    const resultado = document.getElementById('resultado');
    const resultNombre = document.getElementById('resultNombre');
    const resultHorasNormales = document.getElementById('resultHorasNormales');
    const resultPagoNormal = document.getElementById('resultPagoNormal');
    const bonusContainer = document.getElementById('bonusContainer');
    const resultBono = document.getElementById('resultBono');
    const resultTotal = document.getElementById('resultTotal');

    // Función para validar y mostrar errores
    function validar() {
        let valido = true;

        if (!nombreInput.value.trim()) {
            nombreError.classList.add('show');
            valido = false;
        } else {
            nombreError.classList.remove('show');
        }

        const horas = parseFloat(horasInput.value);
        if (isNaN(horas) || horas <= 0) {
            horasError.classList.add('show');
            valido = false;
        } else {
            horasError.classList.remove('show');
        }

        const pagoHora = parseFloat(pagoHoraInput.value);
        if (isNaN(pagoHora) || pagoHora <= 0) {
            pagoError.classList.add('show');
            valido = false;
        } else {
            pagoError.classList.remove('show');
        }

        return valido;
    }

    // Limpiar errores al escribir
    [nombreInput, horasInput, pagoHoraInput].forEach(input => {
        input.addEventListener('input', () => {
            const errorId = input.id + 'Error';
            const errorElem = document.getElementById(errorId);
            if (errorElem) errorElem.classList.remove('show');
        });
    });

    form.addEventListener('submit', e => {
        e.preventDefault();

        if (!validar()) {
            resultado.hidden = true;
            return;
        }

        const nombre = nombreInput.value.trim();
        const horas = parseFloat(horasInput.value);
        const pagoHora = parseFloat(pagoHoraInput.value);

        const salarioBase = horas * pagoHora;
        let bono = 0;
        let tieneBono = horas > 160;

        if (tieneBono) {
            bono = salarioBase * 0.2;
        }

        const salarioTotal = salarioBase + bono;

        // Mostrar resultados
        resultNombre.textContent = nombre;
        resultHorasNormales.textContent = `${horas.toFixed(2)} horas`;
        resultPagoNormal.textContent = `$${salarioBase.toFixed(2)}`;

        if (tieneBono) {
            resultBono.textContent = `$${bono.toFixed(2)}`;
            bonusContainer.hidden = false;
        } else {
            resultBono.textContent = '$0.00';
            bonusContainer.hidden = true;
        }

        resultTotal.textContent = `$${salarioTotal.toFixed(2)}`;

        resultado.hidden = false;
        resultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});