const form = document.getElementById('form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    let height = document.getElementById('height').value;

    // Substituindo a vírgula por ponto, caso necessário, e convertendo para número decimal
    height = parseFloat(height.replace(',', '.'));

    // Verifica se o valor da altura é um número válido
    if (isNaN(height)) {
        alert("Por favor, insira uma altura válida.");
        return;
    }

    const bmi = (weight / (height * height)).toFixed(2);
    const value = document.getElementById('value');
    let description = '';
    value.classList.add('attention');

    document.getElementById('infos').classList.remove('hidden');

    if (bmi < 18.5) {
        description = 'Cuidado! Você está abaixo do peso!';
    } else if (bmi >= 18.5 && bmi <= 25) {
        description = 'Você está no peso ideal!';
        value.classList.remove('attention');
        value.classList.add('normal');
    } else if (bmi >= 25 && bmi <= 30) {
        description = 'Cuidado! você está com sobrepeso!';
    } else if (bmi > 30 && bmi <= 35) {
        description = 'Cuidado! você está com obesidade moderada!';
    } else if (bmi > 35 && bmi <= 40) {
        description = 'Cuidado! você está com obesidade severa!';
    } else {
        description = 'Cuidado! você está com obesidade mórbida!';
    }

    value.textContent = bmi.replace('.', ',');
    document.getElementById('description').textContent = description;
});
