var btn_addPaciente = document.querySelector('#btn_addPaciente')

btn_addPaciente.addEventListener("click", function(event){
    event.preventDefault()   
    var formulario = document.querySelector("form")
    var paciente = criarPaciente(formulario)

    limparErros()
    var erros = validarPaciente(paciente)

    if(erros.length === 0){
        paciente.imc = calcularIMC(paciente)
        addPaciente(paciente)
        limparFormulario(formulario)

    }else{
        mostrarErros(erros)
    }
})


// Funçoes principais

function criarPaciente(formulario){
    var paciente = {}

    paciente.nome = formulario.nome.value
    paciente.peso = formulario.peso.value
    paciente.altura = formulario.altura.value
    paciente.gordura = formulario.gordura.value

    return paciente
}


function addPaciente(paciente){
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

    var tabela = document.querySelector("table")
    tabela = tabela.querySelector('tbody')
    tabela.appendChild(linha)
}


// Funções auxiliares de exibiçao

function limparFormulario(formulario){
    formulario.nome.value = ''
    formulario.peso.value = ''
    formulario.altura.value = ''
    formulario.gordura.value = ''
}

function limparErros(){
    var erros = document.querySelector('.erros')
    erros.innerHTML = ''
    if(erros.classList.contains('invisible'))
        erros.classList.add('invisible')
}


function mostrarErros(erros){
    var lista = document.querySelector('.erros')

    erros.forEach(erro => {
        erro = erro.replace(/(^.+:)/ig, "<span class='bold'>$1</span>")
        var linha = document.createElement('li')
        linha.innerHTML = erro
        lista.appendChild(linha)
    })

    lista.classList.remove("invisible")
}


// Funções auxiliares de negocios
function validarPaciente(paciente){
    var erros = []

    var regex_nome = /\b([A-Z][a-z]+[^0-9]\s*)+\b/g
    var regex_peso = /\b[0-4]?[0-9]?[0-9](\.[0-9]{1,2})?$/g
    var regex_altura = /\b[0-9](\.[0-9]{1,2})?$/g
    var regex_gordura = /\b[0-1]?[0-9][0-9](\.[0-9]{1,2})?\b/g

    var erro_nome = "Nome incorreto: O nome deve começar com letra maiúscula e não conter números."
    var erro_peso = "Peso incorreto: O peso deve ser entre 0 e 500kg e deve conter no máximo 2 casas decimais."
    var erro_altura = "Altura incorreta: A altura deve ser entre 0 e 3 metros e deve conter no máximo 2 casas decimais."
    var erro_gordura = "% de Gordura incorreta: o valor % deve ser entre 0 e 100  e deve conter no máximo 2 casas decimais."

    if(!regex_nome.test(paciente.nome)){
        erros.push(erro_nome)
    }
    if(!regex_peso.test(paciente.peso)){
        erros.push(erro_peso)
    }
    if(!regex_altura.test(paciente.altura)){
        erros.push(erro_altura)
    }
    if(!regex_gordura.test(paciente.gordura)){
        erros.push(erro_gordura)
    }

    return erros
}

function calcularIMC(paciente){
    var imc = paciente.peso / (paciente.altura * paciente.altura)
    imc = imc.toFixed(2)

    return imc
}

