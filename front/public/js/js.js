const url = `http://localhost:8080`

function iniciar() {
    fetch(`${url}/tipos`)
        .then(reponse => {
            if(reponse.status == 200) {
                reponse.json().then(tipos => {
                    console.log(tipos)
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
        .catch(function (error) {
            console.error(`Erro no fetch - url/tipos`)
        });
}

function preVisualizacao() {
    document.getElementById("preview-nome").innerHTML = document.getElementById("nome").value
}