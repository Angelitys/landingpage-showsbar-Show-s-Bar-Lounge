const urlBase = "https://angelo-4feab-default-rtdb.firebaseio.com/depoimentos"; // banco de dados firebase, link

function adicionar() {
    const nome = $("#nome").val();
    const mensagem = $("#mensagem").val();

    const dados = JSON.stringify({ nome, mensagem });

    $.post(`${urlBase}.json`, dados, () => {
        alert("Depoimento enviado com sucesso!");
        $("#nome").val("");
        $("#mensagem").val("");
        listar();
    });
}
// lista os depoimentos para armazenar no banco de dados do firebase
function listar() {
    $.get(`${urlBase}.json`, data => {
        $("#lista").html("");
        for (const id in data) {
            const depoimento = data[id];
            $("#lista").append(`
                <li class="list-group-item">
                    <strong>${depoimento.nome}</strong>: ${depoimento.mensagem}
                </li>
            `);
        }
    });

}
// gera um botão exluir no site
function listar() {
    $.get(`${urlBase}.json`, data => {
        $("#lista").html("");
        for (const id in data) {
            const depoimento = data[id];
            $("#lista").append(`
                <li class="list-group-item d-flex justify-content-between align-items-center bg-light text-black">
                
                    <div>
                        <strong>${depoimento.nome}:</strong> ${depoimento.mensagem}
                    </div>
                    <button class="btn btn-sm btn-danger" onclick="deletarUm('${id}')">Excluir</button>
                </li>
            `);
        }
    });
}
// Deleta UM depoimento pelo ID ao clicar no botão exluir
function deletarUm(id) {
    $.ajax({
        url: `${urlBase}/${id}.json`,
        type: "DELETE",
        success: () => listar()
    });
}

// aqui quando todo html estivel 100% rodando, vai executar a função de listar.
$(document).ready(() => {
    listar();
});
