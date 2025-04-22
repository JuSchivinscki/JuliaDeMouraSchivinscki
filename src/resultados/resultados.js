window.onload = function () {
    const startupCampea = localStorage.getItem('campeao');
    const startups = JSON.parse(localStorage.getItem('startups'));
    
    if (startupCampea) {
        document.getElementById('campeao-nome').innerText = startupCampea;
    } else {
        document.getElementById('campeao-nome').innerText = 'O torneio não acabou!';
    }
    
        const sloganStartup = startups.find(s => s.startup === startupCampea);
        document.getElementById('campeao-slogan').innerText = sloganStartup.slogan;
}

document.addEventListener('DOMContentLoaded', () => {
    const relatorio = JSON.parse(localStorage.getItem('relatoriosStartups'))
    const tbody = document.querySelector('#tabela-relatorios tbody');

    console.log(relatorio)
    if (relatorio) {
        Object.entries(relatorio).forEach(([startup, eventos]) => {
            const linha = document.createElement('tr');

            linha.innerHTML = `
                <td>${startup}</td>
                <td>${eventos['pitch'] || 0}</td>
                <td>${eventos['bugs'] || 0}</td>
                <td>${eventos['usuario'] || 0}</td>
                <td>${eventos['investidor'] || 0}</td>
                <td>${eventos['fakenews'] || 0}</td>
            `;

            console.log(linha.innerHTML)
            tbody.appendChild(linha);
        })
    }
});
