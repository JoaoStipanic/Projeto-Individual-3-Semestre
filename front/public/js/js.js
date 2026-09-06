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
                });
            } else {
                console.log(`Erro no fetch - GET url/tipos`)
            }
        })
        .catch(error => {
            console.error(`Erro na API`)
            alert("Houve um erro no servidor, a página será recarregada. Caso o erro persista, tente novamente mais tarde!")
            window.location.reload()
        })


    fetch(`${url}/pokemons`, {
        method: "GET"
    })
        .then(response => {
            if (response.status == 200) {
                response.json().then(pokemons => {
                    contadorPokemom = 0

                    pokemons.forEach(element => {
                        contadorPokemom++

                        tipo1 = element.tipos.split("/")[0]
                        tipo2 = element.tipos.split("/")[1]

                        document.getElementById("painel_cards").innerHTML += `
                            <article id="${element.idPokemon}" class="poke-card">
                                <header class="poke-card__header">
                                    <div class="poke-card__pokeball poke-card__pokeball--sm" aria-hidden="true"></div>
                                    <span class="poke-card__number">#${element.idPokemon}</span>
                                </header>
                                <div class="poke-card__body">
                                    <h3 class="poke-card__name">${element.nome}</h3>
                                    <div id="${element.idPokemon}_card_tipos" class="poke-card__badges">
                                        <span id="${element.idPokemon}_tipo1" class="type-badge" data-type="">${tipo1}</span>
                                    </div>
                                    <dl class="poke-card__meta poke-card__meta--compact">
                                        <div class="poke-card__meta-item"><dt>Habitat</dt><dd>${element.habitat}</dd></div>
                                        <div class="poke-card__meta-item"><dt>Evolução</dt><dd>${element.faseEvolucao}</dd></div>
                                        <div class="poke-card__meta-item"><dt>Geração</dt><dd>${element.geracao}</dd></div>
                                    </dl>
                                    <div id="${element.idPokemon}_corPredo" class="poke-card__color-strip poke-card__color-strip--sm" style="--strip-color:#FFCB05;"></div>
                                </div>
                                <footer class="poke-card__footer poke-card__footer--actions">
                                    <button type="button" class="btn-mini btn-mini--delete" onclick="deletar(${element.idPokemon})"><i class="fa-solid fa-trash"></i> Excluir</button>
                                </footer>
                            </article>
                        `
                        if (tipo2 != undefined) {
                            document.getElementById(`${element.idPokemon}_card_tipos`).innerHTML += `<span id="${element.idPokemon}_tipo2" class="type-badge" data-type="">${tipo2}</span>`
                            document.getElementById(`${element.idPokemon}_tipo2`).style.background = corTipo(tipo2)
                        }

                        document.getElementById(`${element.idPokemon}_tipo1`).style.background = corTipo(tipo1)

                        document.getElementById(`${element.idPokemon}_corPredo`).style.background = corPredominante(element.corPredominante)
                    })

                    document.getElementById("contador-pokemon").innerHTML = `${contadorPokemom} Pokémon`
                })

            } else if (response.status == 204) {
                console.log("Sem pokemons na pokedex")

            } else {
                console.log("Erro no fetch - GET url/pokemons")
            }
        })
        .catch(error => {
            console.error("Erro na API")
            alert("Houve um erro no servidor, a página será recarregada. Caso o erro persista, tente novamente mais tarde!")
            window.location.reload()
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
                tipo2: tipo2 != null ? Number(tipo2) : "",
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
                    console.log("Erro no fetch - POST url/pokemons")
                }
            })
            .catch(error => {
                console.log("Erro na API")
                alert("Houve um erro no servidor, a página será recarregada. Caso o erro persista, tente novamente mais tarde!")
                window.location.reload()
            })
    }
}

function deletar(idPokemon) {
    fetch(`${url}/pokemons/${idPokemon}`, {
        method: "DELETE"
    })
        .then(reponse => {
            if(reponse.status == 204) {
                console.log("delete funcionou")
                window.location.reload()
            } else {
                console.log(`Erro no fetch - DELETE url/pokemons`)
            }
        })
        .catch(error => {
            console.error(`Erro na API`)
            alert("Houve um erro no servidor, a página será recarregada. Caso o erro persista, tente novamente mais tarde!")
            window.location.reload()
        })
}

function preVisualizacao() {
    // Nome
    document.getElementById("preview-nome").innerHTML = document.getElementById("nomePokemon").value

    // Tipo 1
    tipo1 = document.getElementById("tipo1")
    tipo1_option = tipo1.options[tipo1.selectedIndex].text

    document.getElementById("preview-tipo1").innerHTML = tipo1_option
    document.getElementById("preview-tipo1").style.background = corTipo(tipo1_option)

    // Tipo 2
    tipo2 = document.getElementById("tipo2")
    tipo2_option = tipo2.options[tipo2.selectedIndex].text

    elemento = document.getElementById("preview-tipo2")
    elemento.classList.remove("type-badge--muted")
    elemento.innerHTML = tipo2_option
    elemento.style.background = corTipo(tipo2_option)

    // Habitat
    habitat = document.getElementById("habitat")
    document.getElementById("preview-habitat").innerHTML = habitat.options[habitat.selectedIndex].text

    // Evolução
    document.getElementById("preview-evolucao").innerHTML = document.querySelector('input[name="faseEvolucao"]:checked').value;

    // Geração
    geracao = document.getElementById("geracao")
    document.getElementById("preview-geracao").innerHTML = geracao.options[geracao.selectedIndex].text

    // Cor predominante
    cor_select = document.getElementById("corPredominante")
    cor_option = cor_select.options[cor_select.selectedIndex].value
    console.log(cor_option)
    document.getElementById("preview-cor").style.background = corPredominante(cor_option)
}

function corTipo(tipo) {
    const cores = {
        "Normal": "#A8A77A",
        "Fogo": "#EE8130",
        "Água": "#6390F0",
        "Planta": "#7AC74C",
        "Elétrico": "#F7D02C",
        "Gelo": "#96D9D6",
        "Luta": "#C22E28",
        "Veneno": "#A33EA1",
        "Terrestre": "#E2BF65",
        "Voador": "#A98FF3",
        "Psíquico": "#F95587",
        "Inseto": "#A6B91A",
        "Pedra": "#B6A136",
        "Fantasma": "#735797",
        "Dragão": "#6F35FC",
        "Sombrio": "#705746",
        "Metal": "#B7B7A4",
        "Fada": "#D685AD"
    }

    return cores[tipo]
}

function corPredominante(cor) {
    const cores = {
        "VERMELHO": "#E94B5F",
        "AZUL": "#5B8FD9",
        "VERDE": "#65C98A",
        "AMARELO": "#F2C14E",
        "ROXO": "#9B7AC4",
        "ROSA": "#EC5A91",
        "PRETO": "#4A4245",
        "BRANCO": "#D9D5E3",
        "MARROM": "#8B5E62",
        "CINZA": "#A9A7B3",
        "LARANJA": "#FF704D"
    }

    return cores[cor]
}