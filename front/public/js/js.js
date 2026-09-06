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
                    pokemons.forEach(element => {
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
                                        <span class="type-badge" data-type="">${tipo1}</span>
                                    </div>
                                    <dl class="poke-card__meta poke-card__meta--compact">
                                        <div class="poke-card__meta-item"><dt>Habitat</dt><dd>${element.habitat}</dd></div>
                                        <div class="poke-card__meta-item"><dt>Geração</dt><dd>${element.geracao}</dd></div>
                                        <div class="poke-card__meta-item"><dt>Evolução</dt><dd>${element.faseEvolucao}</dd></div>
                                    </dl>
                                    <div class="poke-card__color-strip poke-card__color-strip--sm" style="--strip-color:#FFCB05;"></div>
                                </div>
                                <footer class="poke-card__footer poke-card__footer--actions">
                                    <button type="button" class="btn-mini btn-mini--edit"><i class="fa-solid fa-pen"></i> Editar</button>
                                    <button type="button" class="btn-mini btn-mini--delete" onclick="deletar(${element.idPokemon})"><i class="fa-solid fa-trash"></i> Excluir</button>
                                </footer>
                            </article>
                        `
                        if (tipo2 != undefined) {
                            document.getElementById(`${element.idPokemon}_card_tipos`).innerHTML += `<span class="type-badge" data-type="">${tipo2}</span>`
                        }
                    })
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

    // Tipos
    select1 = document.getElementById("tipo1")
    document.getElementById("preview-tipo1").innerHTML = select1.options[select1.selectedIndex].text
}