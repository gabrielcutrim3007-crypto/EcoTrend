// Inicializa o carrinho a partir do localStorage
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Adicionar produto ao carrinho
function adicionarCarrinho(nome, preco) {
    const produto = { nome, preco };
    carrinho.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderizarCarrinho();
    atualizarCarrinho();
    alert("Produto adicionado ao carrinho!");
}

// Salvar carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Renderizar carrinho na sidebar
function renderizarCarrinho() {
    const ul = document.getElementById("itens-carrinho");
    ul.innerHTML = "";

    let total = 0;
    carrinho.forEach((item, index) => {
        total += item.preco;
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
            <button class="btn btn-sm btn-danger" onclick="removerItem(${index})">X</button>
        `;
        ul.appendChild(li);
    });

    document.getElementById("total").innerText = `Total: R$ ${total.toFixed(2)}`;
}

// Atualiza o contador do carrinho no ícone
function atualizarCarrinho() {
    const icone = document.getElementById("contador-carrinho");
    if (icone) {
        icone.innerText = carrinho.length;
    }
}

// Remover item do carrinho
function removerItem(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    renderizarCarrinho();
    atualizarCarrinho();
}

// Esvaziar carrinho
function esvaziarCarrinho() {
    carrinho = [];
    salvarCarrinho();
    renderizarCarrinho();
    atualizarCarrinho();
}

// Abrir/fechar carrinho
function abrirCarrinho() {
    document.getElementById("carrinho").classList.add("open");
}

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("open");
}

// Inicializa carrinho ao carregar a página
renderizarCarrinho();
atualizarCarrinho();

function aplicarFiltro() {
    const select = document.getElementById("select-categoria");
    const categoriaSelecionada = select.value;

    const cards = document.querySelectorAll('.produtos-grid .card');

    cards.forEach(card => {
        const categoria = card.getAttribute('data-categoria');

        if (categoriaSelecionada === 'todos' || categoria === categoriaSelecionada) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}