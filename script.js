let respostaDoServidor;
function tratarSucessoNoStatus(resposta){
    console.log("usuário conectado");
    console.log(resposta.status);
}
function tratarErroNoStatus(erro){
    console.log(erro.response.status);
    alert("Erro na verificação do status do usuário");
    entrarNaSala();
}
function verificarStatusDoUsuario(nome){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",nome);
    promise.then(tratarSucessoNoStatus);
    promise.catch(tratarErroNoStatus);
}

function tratarSucessoNoCadastro(resposta){
    console.log(resposta.status);
    alert('Usuário cadastrado com sucesso!');
    return resposta.status;    
}
function tratarErroNoCadastro(erro){
    console.log(erro.response.status);
    alert("Esse nome já está em uso. Por favor, digite outro nome");
    entrarNaSala(); 
}
function cadastrarUsuario(nome){
    //Enviar o nome do usuário para o servidor
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nome);
    respostaDoServidor = promise.then(tratarSucessoNoCadastro);
    promise.catch(tratarErroNoCadastro);
}
function entrarNaSala(){
//Ao entrar no site, perguntar o nome do usuário via prompt    
    const nomeDoUsuario = prompt("Qual é o seu nome?");
    const objetoNome = {
        name: nomeDoUsuario,
    };
    cadastrarUsuario(objetoNome);
//if(respostaDoServidor === 200 || respostaDoServidor === 201){
    setInterval(verificarStatusDoUsuario, 5000, objetoNome);
}
//}
entrarNaSala();