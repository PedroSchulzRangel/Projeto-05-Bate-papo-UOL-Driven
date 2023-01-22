let objetoNome;
function tratarSucessoNoStatus(resposta){
    console.log("usuário conectado");
    console.log(resposta.status);
}
function tratarErroNoStatus(erro){
    console.log(erro.response.status);
    alert("Erro na verificação do status do usuário");
    entrarNaSala();
}
function verificarStatusDoUsuario(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",objetoNome);
    promise.then(tratarSucessoNoStatus);
    promise.catch(tratarErroNoStatus);
}

function tratarSucessoNoCadastro(resposta){
    console.log(resposta.status);
    alert('Usuário cadastrado com sucesso!');
    setInterval(verificarStatusDoUsuario, 5000);
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