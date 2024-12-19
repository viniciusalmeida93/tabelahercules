document.addEventListener('DOMContentLoaded', function() {
    // Conversor rápido kg/lb
    const kgInput = document.getElementById('kg-value');
    const lbInput = document.getElementById('lb-value');

    kgInput.addEventListener('input', function() {
        const kg = parseFloat(this.value);
        if (!isNaN(kg)) {
            lbInput.value = (kg * 2.20462).toFixed(1);
        } else {
            lbInput.value = '';
        }
    });

    lbInput.addEventListener('input', function() {
        const lb = parseFloat(this.value);
        if (!isNaN(lb)) {
            kgInput.value = (lb * 0.453592).toFixed(1);
        } else {
            kgInput.value = '';
        }
    });

    const convertButton = document.getElementById('convert');
    const resultDiv = document.getElementById('conversion-result');

    // Tabela de conversões baseada nos valores fornecidos
    const conversions = {
        // Primeira tabela de conversão (baseada em calorias)
        row_cal: {
            value: 20,
            unit: 'cal',
            conversions: {
                run: { value: 200, unit: 'm' },
                bike: { value: 20, unit: 'cal' },
                airbike: { value: 15, unit: 'cal' },
                ski_cal: { value: 20, unit: 'cal' }
            }
        },
        ski_cal: {
            value: 20,
            unit: 'cal',
            conversions: {
                run: { value: 200, unit: 'm' },
                bike: { value: 20, unit: 'cal' },
                airbike: { value: 15, unit: 'cal' },
                row_cal: { value: 20, unit: 'cal' }
            }
        },
        // Segunda tabela de conversão (baseada em metros/reps)
        row_m: {
            value: 250,
            unit: 'm',
            conversions: {
                run: { value: 200, unit: 'm' },
                du: { value: 40, unit: 'reps' },
                burpees: { value: 15, unit: 'reps' },
                ski_m: { value: 250, unit: 'm' }
            }
        },
        ski_m: {
            value: 250,
            unit: 'm',
            conversions: {
                run: { value: 200, unit: 'm' },
                du: { value: 40, unit: 'reps' },
                burpees: { value: 15, unit: 'reps' },
                row_m: { value: 250, unit: 'm' }
            }
        },
        run: {
            value: 200,
            unit: 'm',
            conversions: {
                row_m: { value: 250, unit: 'm' },
                du: { value: 40, unit: 'reps' },
                burpees: { value: 15, unit: 'reps' },
                row_cal: { value: 20, unit: 'cal' },
                bike: { value: 20, unit: 'cal' },
                airbike: { value: 15, unit: 'cal' },
                ski_cal: { value: 20, unit: 'cal' },
                ski_m: { value: 250, unit: 'm' }
            }
        },
        bike: {
            value: 20,
            unit: 'cal',
            conversions: {
                row_cal: { value: 20, unit: 'cal' },
                run: { value: 200, unit: 'm' },
                airbike: { value: 15, unit: 'cal' },
                ski_cal: { value: 20, unit: 'cal' }
            }
        },
        airbike: {
            value: 15,
            unit: 'cal',
            conversions: {
                row_cal: { value: 20, unit: 'cal' },
                run: { value: 200, unit: 'm' },
                bike: { value: 20, unit: 'cal' },
                ski_cal: { value: 20, unit: 'cal' }
            }
        },
        du: {
            value: 40,
            unit: 'reps',
            conversions: {
                row_m: { value: 250, unit: 'm' },
                run: { value: 200, unit: 'm' },
                burpees: { value: 15, unit: 'reps' },
                ski_m: { value: 250, unit: 'm' }
            }
        },
        burpees: {
            value: 15,
            unit: 'reps',
            conversions: {
                row_m: { value: 250, unit: 'm' },
                run: { value: 200, unit: 'm' },
                du: { value: 40, unit: 'reps' },
                ski_m: { value: 250, unit: 'm' }
            }
        }
    };

    convertButton.addEventListener('click', function() {
        const exercise = document.getElementById('exercise').value;
        const inputValue = parseFloat(document.getElementById('value').value);
        
        if (!inputValue || isNaN(inputValue)) {
            resultDiv.innerHTML = '<p style="color: red;">Por favor, insira um valor válido.</p>';
            return;
        }

        const baseValue = conversions[exercise].value;
        const results = [];

        // Calcula as conversões
        for (let targetExercise in conversions[exercise].conversions) {
            const conversion = conversions[exercise].conversions[targetExercise];
            const ratio = conversion.value / baseValue;
            const convertedValue = inputValue * ratio;
            
            const exerciseNames = {
                row_cal: 'Remo',
                row_m: 'Remo',
                run: 'Corrida',
                bike: 'Bike',
                airbike: 'Air Bike',
                du: 'Double Unders',
                burpees: 'Burpees',
                ski_cal: 'Ski Erg',
                ski_m: 'Ski Erg'
            };

            results.push(`${exerciseNames[targetExercise]}: ${convertedValue.toFixed(1)} ${conversion.unit}`);
        }

        resultDiv.innerHTML = results.map(result => `<p>${result}</p>`).join('');
    });

    // Nova funcionalidade para cálculo de PR
    const calculatePrButton = document.getElementById('calculate-pr');
    const prResultDiv = document.getElementById('pr-result');

    calculatePrButton.addEventListener('click', function() {
        const prValue = parseFloat(document.getElementById('pr-value').value);
        const unit = document.getElementById('pr-unit').value;
        
        if (!prValue || isNaN(prValue)) {
            prResultDiv.innerHTML = '<p style="color: red;">Por favor, insira um valor válido.</p>';
            return;
        }

        // Calcular percentuais de 95% até 5%, de 5 em 5
        const percentages = [];
        for (let i = 95; i >= 5; i -= 5) {
            const value = (prValue * i / 100).toFixed(1);
            percentages.push(`<p><span>${i}%</span><span>${value} ${unit}</span></p>`);
        }

        prResultDiv.innerHTML = percentages.join('');
    });

    // Função para converter entre kg e lb
    document.getElementById('pr-unit').addEventListener('change', function() {
        const prInput = document.getElementById('pr-value');
        const value = parseFloat(prInput.value);
        
        if (!value || isNaN(value)) return;

        if (this.value === 'kg') {
            // Convertendo de lb para kg
            prInput.value = (value * 0.453592).toFixed(1);
        } else {
            // Convertendo de kg para lb
            prInput.value = (value * 2.20462).toFixed(1);
        }

        // Recalcular os percentuais
        calculatePrButton.click();
    });
});
