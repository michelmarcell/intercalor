// scripts.js
document.getElementById('calculoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let aguaCaudal = parseFloat(document.getElementById('aguaCaudal').value);
    let aguaTempInicial = parseFloat(document.getElementById('aguaTempInicial').value);
    let aguaTempFinal = parseFloat(document.getElementById('aguaTempFinal').value);
    let gasTempEntrada = parseFloat(document.getElementById('gasTempEntrada').value);
    let gasTempSalida = parseFloat(document.getElementById('gasTempSalida').value);
    let gasCaudalMaximo = parseFloat(document.getElementById('gasCaudalMaximo').value);

    let resultados = calcularResultados(aguaCaudal, aguaTempInicial, aguaTempFinal, gasTempEntrada, gasTempSalida, gasCaudalMaximo);

    document.getElementById('diametroTubo').innerText = `El diámetro de los tubos requeridos es: ${resultados.diametroTubo.toFixed(2)} metros.`;
    document.getElementById('numTubos').innerText = `El número de tubos requeridos son: ${resultados.numTubos}.`;
});

function calcularResultados(aguaCaudal, aguaTempInicial, aguaTempFinal, gasTempEntrada, gasTempSalida, gasCaudalMaximo) {
    const lambdaTubo = 420; // W/m^2C
    const longitudMaxima = 3; // m

    let diferenciaTemperaturaAgua = aguaTempFinal - aguaTempInicial;
    let diferenciaTemperaturaGases = gasTempEntrada - gasTempSalida;

    let capacidadCalorAgua = aguaCaudal * diferenciaTemperaturaAgua;
    let capacidadCalorGases = gasCaudalMaximo * diferenciaTemperaturaGases;

    let areaSuperficial = capacidadCalorAgua / (lambdaTubo * diferenciaTemperaturaGases);
    let diametroTubo = Math.sqrt(areaSuperficial / (3.14 * longitudMaxima));

    let areaSeccionTransversalTubo = 3.14 * Math.pow((diametroTubo / 2), 2);
    let numTubos = areaSuperficial / areaSeccionTransversalTubo;

    return {
        diametroTubo: diametroTubo,
        numTubos: Math.ceil(numTubos)
    };
}
