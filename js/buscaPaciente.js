var btn_buscar = document.querySelector('#btn_Buscar')

btn_buscar.addEventListener('click', buscarPacientes)


function buscarPacientes(){
    var uri = "https://api-pacientes.herokuapp.com/pacientes"

    fetch(uri)
    .then(resposta => resposta.json())
    .then(resposta => {
        resposta.forEach(paciente => {
            addPaciente(paciente)
        });
    })
}

buscarPacientes()