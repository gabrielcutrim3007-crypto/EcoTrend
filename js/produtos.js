const container = document.getElementById('produtos-container');
const selectCategoria = document.getElementById('select-categoria');
const btnFiltrar = document.getElementById('btn-filtrar');

// Função para carregar produtos via fetch (JSON)
function carregarProdutos() {
    return new Promise((resolve, reject) => {
        fetch('../produtos.json')
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar produtos');
            return response.json();
        })
        .then(produtos => resolve(produtos))
        .catch(err => reject(err));
    });
}

// Função para renderizar produtos no DOM
function renderizarProdutos(produtos) {
    container.innerHTML = ''; // Limpa container
    produtos.forEach(prod => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-categoria', prod.categoria);

        card.innerHTML = `
            <img src="${prod.imagem}" class="card-img-top" alt="${prod.nome}">
            <div class="card-body">
                <h5 class="card-title">${prod.nome}</h5>
                <p class="verde">R$ ${prod.preco.toFixed(2)}</p>
                <button class="btn btn-success" onclick="adicionarCarrinho('${prod.nome}', ${prod.preco})">Adicionar ao carrinho</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Função de filtro
function aplicarFiltro() {
    const categoriaSelecionada = selectCategoria.value;
    const cards = document.querySelectorAll('#produtos-container .card');

    cards.forEach(card => {
        const categoria = card.getAttribute('data-categoria');
        card.style.display = (categoriaSelecionada === 'todos' || categoria === categoriaSelecionada) ? 'block' : 'none';
    });
}

// Carregamento inicial
carregarProdutos()
.then(produtos => {
    renderizarProdutos(produtos);
})
.catch(err => {
    container.innerHTML = `<p class="text-danger">Erro ao carregar produtos: ${err.message}</p>`;
});

// Eventos
btnFiltrar.addEventListener('click', aplicarFiltro);
selectCategoria.addEventListener('change', aplicarFiltro);