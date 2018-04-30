var btn_addPaciente = document.querySelector('#btn_addPaciente')

btn_addPaciente.addEventListener("click", function(event){
    event.preventDefault()   
   
    var formulario = document.querySelector("form")
    var paciente = criarPaciente(formulario)

    var erros = ValidarPaciente(paciente)

    if(erros.length === 0){
        paciente.imc = calcularIMC(paciente)
        var linha = criarLinha(paciente)
        addPaciente(linha)
        limparFormulario(formulario)

    }else{
        console.log(erros)
    }
})

function addPaciente(linha){
    var tabela = document.querySelector("table")
    tabela = tabela.querySelector('tbody')
    tabela.appendChild(linha)
}

function criarLinha(paciente){
    var linha = document.createElement('tr')

    var td_nome = document.createElement('td')
    td_nome.textContent = paciente.nome
    var td_peso = document.createElement('td')
    td_peso.textContent = paciente.peso
    var td_altura = document.createElement('td')
    td_altura.textContent = paciente.altura
    var td_gordura = document.createElement('td')
    td_gordura.textContent = paciente.gordura
    var td_imc = document.createElement('td')
    td_imc.textContent = paciente.imc

    linha.appendChild(td_nome)
    linha.appendChild(td_peso)
    linha.appendChild(td_altura)
    linha.appendChild(td_gordura)
    linha.appendChild(td_imc)

    return linha
}

function criarPaciente(formulario){
    var paciente = {}

    paciente.nome = formulario.nome.value
    paciente.peso = formulario.peso.value
    paciente.altura = formulario.altura.value
    paciente.gordura = formulario.gordura.value

    return paciente
}


function limparFormulario(formulario){
    formulario.nome.value = ''
    formulario.peso.value = ''
    formulario.altura.value = ''
    formulario.gordura.value = ''
}


function ValidarPaciente(paciente){
    var erros = []

    var regex_nome = /\b([A-Z][a-z]+[^0-9]\s*)+\b/g
    var regex_peso = /\b[0-4]?[0-9]?[0-9](\.[0-9]{1,2})?$/g
    var regex_altura = /\b[0-9](\.[0-9]{1,2})?$/g
    var regex_gordura = /\b[0-1]?[0-9][0-9]\b/g

    if(!regex_nome.test(paciente.nome)){
        erros.push('nome')
    }
    if(!regex_peso.test(paciente.peso)){
        erros.push('peso')
    }
    if(!regex_altura.test(paciente.altura)){
        erros.push('altura')
    }
    if(!regex_gordura.test(paciente.gordura)){
        erros.push('gordura')
    }

    return erros
}


function CalcularIMC(paciente){
    var imc = paciente.peso / (paciente.altura * paciente.altura)
    imc = paciente.imc.toFixed(2)

    return imc
}