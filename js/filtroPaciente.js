var filtro = document.querySelector("input[name='filtro']")

filtro.addEventListener('input', function(event){

    var lista = document.querySelectorAll("tbody>tr")

    lista.forEach(li => {
        if(li.classList.contains('invisible'))
            li.classList.remove('invisible')
    })

    if(filtro.value !== ''){
        var exp = filtro.value.toUpperCase()
        var regex = new RegExp(exp)

        lista.forEach(li => {
            console.log(regex)
            console.log(li.children[0].textContent.toUpperCase())
            if(!regex.test(li.children[0].textContent.toUpperCase())){
                li.classList.add("invisible")
            }
        })
    }
})