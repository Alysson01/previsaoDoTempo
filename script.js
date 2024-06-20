
const estadoSelect = document.getElementById('estadoSelect')
const cidadeSelect = document.getElementById('cidadeSelect')


// Função para preencher as opções de cidades com base no estado selecionado
async function carregarCidadesPorEstado(uf) {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    const cidades = await response.json();

    cidadeSelect.innerHTML = '<option value="" class="option">Selecione uma cidade</option>';
    cidades.forEach(cidade => {
        const optionElement = document.createElement('option')
        optionElement.value = cidade.nome
        optionElement.textContent = cidade.nome
        cidadeSelect.appendChild(optionElement)
    });
}

// Chama a função de carregar as cidades assim que o estado é selecionado
estadoSelect.addEventListener('change', function () {
    const ufSelecionado = estadoSelect.value;
    if (ufSelecionado) {
        carregarCidadesPorEstado(ufSelecionado)
    } else {
        cidadeSelect.innerHTML = '<option value="" class="option">Selecione um estado primeiro</option>';
    }

    function highlight_map_states(){
        if($(".states_section").length>0){
           $(".states_section .list_states .item .link").hover(function(){
             var a="#state_"+$(this).text().toLowerCase();
             $(a).attr("class","state hover")
           },function(){
             var a="#state_"+$(this).text().toLowerCase();
             $(a).attr("class","state")
           })
        }
      };
});

function mostrarDados(dados){
    console.log(dados) 
    document.querySelector(".city").innerHTML = "Tempo em " + dados.name // Insere nome da Cidade
    document.querySelector(".temp").innerHTML =  Math.floor(dados.main.temp) + "°C" // Insere temperatura da Cidade
    document.querySelector(".humidity").innerHTML = "Umidade: " + dados.main.humidity + "%" // Insere Umidade da Cidade
    document.querySelector(".mensage").innerHTML = dados.weather[0].description // Insere descrição sobre o tempo da Cidade
    document.querySelector(".sunrise").innerHTML = "Nascer do Sol: " + converterTimestamp(dados.sys.sunrise) // Insere horario do nascer do sol na cidade
    document.querySelector(".sunset").innerHTML = "Por do Sol: " + converterTimestamp(dados.sys.sunset) // Insere horario do nascer do sol na cidade
    
    
    var smallBoxElement = document.querySelector(".smallbox") // Seleciona o elemento com a classe "smallbox"
    
    // Verifica se já existe uma imagem dentro do elemento
    var existingImage = smallBoxElement.querySelector("img")
        
    if (existingImage) {
        smallBoxElement.removeChild(existingImage) // Remove a imagem existente, se houver
    }

    var newImage = document.createElement("img");
    newImage.src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png"; // Use a URL da imagem dinâmica
    newImage.alt = "Condições climáticas"

    // Insere a imagem antes do primeiro elemento filho (o parágrafo com a classe "message")
    smallBoxElement.insertBefore(newImage, smallBoxElement.firstChild)
}

 // Converte timeStamp para data no JavaScript
function converterTimestamp(timestamp){
    const data = new Date(timestamp*1000) // Converte timeStamp em segundos para milisegundos e depois para uma data
    const horas = data.getHours() // Seleciona a hora da data
    const minutos = data.getMinutes() // Seleciona o minuto da data
    const segundos = data.getSeconds() // Seleciona a segundo da data

    // Formata as informações de horario adicionando um zero a frente quando só se tem 1 digito
    const horasFormatadas = horas < 10 ? `0${horas}` : horas 
    const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos
    const segundosFormatados = segundos < 10 ? `0${segundos}` : segundos 

    // Une e formata o horario 
    const horario = horasFormatadas+":"+minutosFormatados+":"+segundosFormatados
    return horario
}

const chave = require('./chave').default; // Chave da minha API
console.log(chave)


/*async function buscarId(cidade) {
    let dados = await fetch("http://apiadvisor.climatempo.com.br/api/v1/locale/city?name=" + cidade +"&state=RJ&token=a9255f48ab3ba44a489b9418b0ee24d3").then(resposta => resposta.json())

    console.log(dados[0].id)
}*/

async function buscar(cidade) {
    let dados = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + 
    cidade + 
    "&appid=" + 
    "e406f26cf5a7cfcb04b34d595476dff6" + 
    "&lang=pt_br" +
    "&units=metric"
    )
    .then(resposta => resposta.json())
    console.log(("https://api.openweathermap.org/data/2.5/weather?q=" + 
        cidade + 
        ",br&appid=" + 
        "e406f26cf5a7cfcb04b34d595476dff6" + 
        "&lang=pt_br" +
        "&units=metric"
        ))
    console.log(dados)

    mostrarDados(dados)
}

function cliqueNoBotao(){
    const cidade = document.getElementById("cidadeSelect").value
    console.log(cidade)
    buscar(cidade)
}

function allocateState(mensagem) {
    const estadosArray = [
        "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará",
        "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
        "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará",
        "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
        "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
        "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
    ];

    var selectElement = document.getElementById("estadoSelect");
    selectElement.selectedIndex = estadosArray.indexOf(mensagem)+1;

    const ufSelecionado = estadoSelect.value;
    carregarCidadesPorEstado(ufSelecionado)   
}