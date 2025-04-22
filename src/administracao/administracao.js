startups = JSON.parse(localStorage.getItem('startups'));
let startupsBatalhas = [];

function sortearBatalhas(startups) {
    startupsBatalhas = [];
    const indexes = [];

    for (let i = 0; i < startups.length; i++) {
        indexes.push(i)
    }

    const listaConfrontos = [];

    while (indexes.length > 0) {
        const escolhendoStartup = Math.floor(Math.random() * indexes.length);
        const indiceStartup = indexes[escolhendoStartup];

        listaConfrontos.push(startups[indiceStartup]);
        indexes.splice(escolhendoStartup, 1);
    }

    startups = listaConfrontos;

    for (let i = 0; i < startups.length; i += 2) {
        const primeiraStartupSelecionada = startups[i].startup ? startups[i].startup : null;
        const segundaStartupSelecionada = (i + 1 < startups.length) ? startups[i + 1].startup : 'Sem Adversário';

        startupsBatalhas.push({ primeiraStartupSelecionada, segundaStartupSelecionada });
    }

    exibirConfrontosStartups(startupsBatalhas);
}

function exibirConfrontosStartups(startupsBatalhas) {
    const cardBatalhas = document.getElementById('card-batalhas');
    cardBatalhas.innerHTML = '';

    startupsBatalhas.forEach(batalha => {
        const card = document.createElement('div');
        card.classList.add('card-batalha');
        if (!batalha.ptsPrimeiraStartup) {
            batalha.ptsPrimeiraStartup = 70;
        }
        if (!batalha.ptsSegundaStartup) {
            batalha.ptsSegundaStartup = 70;
        }

        card.innerHTML = `
        <div class="batalha-card">
            <div class="startup">
                <h3 id="${batalha.primeiraStartupSelecionada}"> ${batalha.ptsPrimeiraStartup} - ${batalha.primeiraStartupSelecionada}</h3>
                <div class="administrar-batalha">
                    <label><input type="checkbox" onchange="changeCheckbox('${batalha.primeiraStartupSelecionada}', 6, 'pitch')"> Pitch convincente (+6)</label><br>
                    <label><input type="checkbox" onchange="changeCheckbox('${batalha.primeiraStartupSelecionada}', -4, 'bugs')"> Produto com bugs (-4)</label><br>
                    <label><input type="checkbox" onchange="changeCheckbox('${batalha.primeiraStartupSelecionada}', 3, 'usuario')"> Boa tração de usuários (+3)</label><br>
                    <label><input type="checkbox" onchange="changeCheckbox('${batalha.primeiraStartupSelecionada}', -6, 'investidor')"> Investidor irritado (-6)</label><br>
                    <label><input type="checkbox" onchange="changeCheckbox('${batalha.primeiraStartupSelecionada}', -8, 'fakenews')"> Fake news no pitch (-8)</label><br>
                </div>
            </div>
    
            <span class="vs">VS</span>
    
            <div class="startup">
                <h3 id="${batalha.segundaStartupSelecionada}">${batalha.ptsSegundaStartup} - ${batalha.segundaStartupSelecionada}</h3>
                <div class="administrar-batalha">
                    <label><input type="checkbox" onchange="changeCheckbox('${batalha.segundaStartupSelecionada}', 6, 'pitch')"> Pitch convincente (+6)</label><br>
                    <label><input type="checkbox" onchange="changeCheckbox('${batalha.segundaStartupSelecionada}', -4, 'bugs')"> Produto com bugs (-4)</label><br>
                    <label><input type="checkbox" onchange="changeCheckbox('${batalha.segundaStartupSelecionada}', 3, 'usuario')"> Boa tração de usuários (+3)</label><br>
                    <label><input type="checkbox" onchange="changeCheckbox('${batalha.segundaStartupSelecionada}', -6, 'investidor')"> Investidor irritado (-6)</label><br>
                    <label><input type="checkbox" onchange="changeCheckbox('${batalha.segundaStartupSelecionada}', -8, 'fakenews')"> Fake news no pitch (-8)</label><br>
                </div>
            </div>
        </div>
    `;


        cardBatalhas.appendChild(card);
    });

    const card = document.createElement('div');
    card.innerHTML = `
        <button class="btn-sorteio mt-24px" onclick="avancarConfrontos()">
                    Avançar confrontos
                </button>
        `
    cardBatalhas.appendChild(card)
}

function changeCheckbox(startup, points, evento) {
    let startupBatalha = startupsBatalhas.find(el => el.primeiraStartupSelecionada === startup);

    if (startupBatalha) {
        if (!startupBatalha.ptsPrimeiraStartup) {
            startupBatalha.ptsPrimeiraStartup = 70
        }

        startupBatalha.ptsPrimeiraStartup += points;

        const headerStartup = document.getElementById(startup);
        headerStartup.innerHTML = `${startupBatalha.ptsPrimeiraStartup}pts - ${startup}`;
    }
    else {
        startupBatalha = startupsBatalhas.find(el => el.segundaStartupSelecionada === startup);
        if (!startupBatalha.ptsSegundaStartup) {
            startupBatalha.ptsSegundaStartup = 70
        }

        startupBatalha.ptsSegundaStartup += points;

        const headerStartupSegunda = document.getElementById(startup);
        headerStartupSegunda.innerHTML = `${startupBatalha.ptsSegundaStartup}pts - ${startup}`
    }
    
    let relatoriosStartups = JSON.parse(localStorage.getItem('relatoriosStartups')) || {};
    if (!relatoriosStartups[startup]) {
        relatoriosStartups[startup] = {
            pitch: 0,
            bugs: 0,
            usuario: 0,
            investidor: 0,
            fakenews: 0
        };
    }

    relatoriosStartups[startup][evento]++;

    console.log(relatoriosStartups);
    localStorage.setItem('relatoriosStartups', JSON.stringify(relatoriosStartups))

}

function avancarConfrontos() {
    let startupProximaFase = []

    startupsBatalhas.forEach(batalha => {


        if (batalha.ptsPrimeiraStartup > batalha.ptsSegundaStartup) {
            startupVencedora = batalha.primeiraStartupSelecionada;
        }
        else if (batalha.ptsPrimeiraStartup < batalha.ptsSegundaStartup) {
            startupVencedora = batalha.segundaStartupSelecionada;
        }
        else {
            if (batalha.ptsPrimeiraStartup === batalha.ptsSegundaStartup) {
                const empate = Math.floor(Math.random() * 2);
                if (empate === 0) {
                    startupVencedora = batalha.primeiraStartupSelecionada;
                }
                else {
                    startupVencedora = batalha.segundaStartupSelecionada;
                }
            }
        }


        startupProximaFase.push({ startup: startupVencedora })
    })

    if (startupProximaFase.length === 1) {
        const startupCampea = startupProximaFase[0].startup;
        localStorage.setItem('campeao', startupCampea);
        window.location.href = '../resultados/resultados.html';
        return;
    }

    sortearBatalhas(startupProximaFase)
}
