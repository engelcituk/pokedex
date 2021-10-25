const ctx = document.getElementById('stats').getContext('2d');

export function createChart( stats ) {
    return new Chart(ctx, {
        type: 'radar',
        data:{
            labels: [
                ['Vida', 'HP'],
                ['Ataque', 'Attack'],
                ['Defensa', 'Defense'],
                ['Ataque Especial','Special attack'],
                ['Defensa Especial', 'Special Defense'],
                ['Velocidad', 'speed'],      
            ],
            datasets:[
                {
                    label: 'Estadisticas del pokémon',
                    data: stats,
                    backgroundColor: 'white'
                }
            ]
        },
        options:{
            maintainAspectRatio: false,
            plugins:{
                legend:{
                    display: false
                }
            },
            scales:{
                r:{
                    grid:{
                        color: 'white'
                    },
                    pointLabels:{
                        color: 'transparent'
                    },
                    angleLines:{
                        color: 'white'
                    }
                }
            }
        }
    })
}