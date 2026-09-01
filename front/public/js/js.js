const url = `http://localhost:8080`

function iniciar() {
    fetch(`${url}/tipos`, {
        method: "GET"
    })
        .then(reponse => {
            if(reponse.ok) {
                reponse.json().then(tipos => {
                    tipos.forEach(element => {
                        document.getElementById("tipo1").innerHTML += `<option value="${element.idTipo}" data-dot="#A8A878">${element.nome}</option>`
                        document.getElementById("tipo2").innerHTML += `<option value="${element.idTipo}" data-dot="#A8A878">${element.nome}</option>`

                    });

                    document.getElementById("tipo1").innerHTML

                });
            } else {
                console.log(`Erro na API`)
            }
        })
        .catch(error => {
            console.error(`Erro no fetch - GET url/tipos`)
        })
}

function cadastrar() {
    nome = document.getElementById("nomePokemon").value
    tipo1 = document.getElementById("tipo1").value
    tipo2 = document.getElementById("tipo2").value
    corPredominante = document.getElementById("corPredominante").value
    habitat = document.getElementById("habitat").value
    faseEvolucao = document.querySelector('input[name="faseEvolucao"]:checked').value
    geracao = document.getElementById("geracao").value

    if (nome == "" ||
        tipo1 == "" ||
        tipo2 == "" ||
        corPredominante == "" ||
        habitat == "" ||
        faseEvolucao == "" ||
        geracao == ""
    ) {
        alert("Preencha todos os campos")

    } else {
        fetch(`${url}/pokemons`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: null,
                nome: nome,
                tipo1: Number(tipo1),
                tipo2: tipo2 != null ? Number(tipo2) : null,
                corPredominante: corPredominante,
                habitat: habitat,
                faseEvolucao: faseEvolucao,
                geracao: geracao
            })
        })
            .then(response => {
                console.log(response)
                if (response.status == 201) {
                    alert("Pokémon cadastrado na sua Pokédex")

                } else {
                    console.log("Ouve um erro ao tentar cadastrar o Pokémon")
                }
            })
            .catch(error => {
                console.log("Erro no fetch - POST url/pokemons")
            })
    }
}

function preVisualizacao() {
    // Nome
    document.getElementById("preview-nome").innerHTML = document.getElementById("nomePokemon").value

    // Tipos
    select1 = document.getElementById("tipo1")
    document.getElementById("preview-tipo1").innerHTML = select1.options[select1.selectedIndex].text
}