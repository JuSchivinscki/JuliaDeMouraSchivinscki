
const form = document.getElementById("form");
const input = document.getElementById("num_participantes");
const input_ano_fundacao = document.getElementById("ano-fundacao");
const nome_Startup = document.getElementById("startup");
const input_slogan = document.getElementById("slogan");

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const error_array = [];

    const num_participantes = parseInt(input.value);
    const ano_fundacao = parseInt(input_ano_fundacao.value);
    const startup = nome_Startup.value;
    const slogan = input_slogan.value;

    const listaStartup = JSON.parse(localStorage.getItem("startups")) || [];
    let startupNomeIgual = listaStartup.some(s => s.startup.trim().toLowerCase() === startup.trim().toLowerCase());

    if (startupNomeIgual) {
        error_array.push("- A startup com esse nome já foi cadastrada.")
    }

    if (!(num_participantes >= 4 && num_participantes <= 8 && num_participantes % 2 == 0)) {
        error_array.push("- O número de participantes deve ser entre 4 a 8 e par.");
    }

    if (ano_fundacao > 2025 || ano_fundacao < 0) {
        error_array.push("- O ano de fundação deve ser maior que zero até o ano atual.");
    }

    if (error_array.length > 0) {
        alert(`Não é possível salvar pois:\n${error_array.join("\n")}`);

    
    } else {
        const dadosStartup = {
            startup,
            slogan,
            num_participantes,
            ano_fundacao
        };

        console.log("Lista de Startups antes de adicionar:", listaStartup); 

        listaStartup.push(dadosStartup);
        localStorage.setItem("startups", JSON.stringify(listaStartup)); 

        console.log("Lista de Startups após adicionar:", listaStartup); 

        window.location.href = '../home/home.html';
    }
});

