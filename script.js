let objetoNome;
function tratarSucessoNoStatus(resposta){
    console.log("Usuário conectado. Status code: "+resposta.status);
}
function tratarErroNoStatus(erro){
    console.log(erro);
    alert("Erro na verificação do status do usuário");
    entrarNaSala();
}
function verificarStatusDoUsuario(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",objetoNome);
    promise.then(tratarSucessoNoStatus);
    promise.catch(tratarErroNoStatus);
}
function tratarSucessoNasMensagens(resposta){
    console.log("mensagens carregadas com sucesso. Status code: "+resposta.status);
    //Buscar e selecionar o elemento html que conterá as mensagens carregadas
    const elemento = document.querySelector("main");
    //Percorrer o array de objetos (resposta.data), exibindo as mensagens na tela
    for(let i = 0; i < resposta.data.length; i++){
        let objetoMensagem = resposta.data[i]; 
        if(objetoMensagem.type === 'status'){
            elemento.innerHTML += `<div class="status mensagem">
            <p><span>(${objetoMensagem.time})</span><strong> ${objetoMensagem.from}</strong> ${objetoMensagem.text}</p>
        </div>`
        }
        else if(objetoMensagem.type === 'message'){
            elemento.innerHTML += `<div class="normal mensagem">
            <p><span>(${objetoMensagem.time})</span><strong> ${objetoMensagem.from}</strong> para <strong>${objetoMensagem.to}:</strong> ${objetoMensagem.text}</p>
        </div>`
        }
        else if(objetoMensagem.to === objetoNome.name){
            elemento.innerHTML += `<div class="reservada mensagem">
            <p><span>(${objetoMensagem.time})</span><strong> ${objetoMensagem.from}</strong> reservadamente para <strong>${objetoMensagem.to}:</strong> ${objetoMensagem.text}</p>
        </div>`
        }   
    }
    elemento.scrollIntoView(false);    
}
function tratarErroNasMensagens(erro){
    console.log("Status code: "+erro.response.status);
    alert("Falha ao carregar as mensagens");
    carregarMensagensDoServidor();
}
function carregarMensagensDoServidor(){
    //carregar mensagens do servidor
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(tratarSucessoNasMensagens);
    promise.catch(tratarErroNasMensagens);
}
function tratarSucessoNoCadastro(resposta){
    console.log(resposta.status);
    alert('Usuário cadastrado com sucesso!');
    setInterval(verificarStatusDoUsuario, 5000);
    setInterval(carregarMensagensDoServidor, 3000);
}
function tratarErroNoCadastro(erro){
    console.log(erro.response.status);
    alert("Esse nome já está em uso. Por favor, digite outro nome");
    entrarNaSala(); 
}
function cadastrarUsuario(){
    //Enviar o nome do usuário para o servidor
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objetoNome);
    promise.then(tratarSucessoNoCadastro);
    promise.catch(tratarErroNoCadastro);
}
function entrarNaSala(){
//Ao entrar no site, perguntar o nome do usuário via prompt    
    const nomeDoUsuario = prompt("Qual é o seu nome?");
    objetoNome = {
        name: nomeDoUsuario,
    };
    cadastrarUsuario();
}
entrarNaSala();