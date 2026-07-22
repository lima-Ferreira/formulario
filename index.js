// 1. FUNÇÃO PARA TROCAR OS FORMULÁRIOS
function trocarLayout(modelo, botao) {
  // Esconde todos os formulários
  document
    .querySelectorAll(".form-card")
    .forEach((card) => card.classList.remove("visible"));

  document.querySelector(".form-card-os").classList.remove("visible");

  // Mostra o selecionado
  document.getElementById("form-" + modelo).classList.add("visible");

  // Limpa a área de impressão ao trocar de aba
  document.getElementById("areaImpressao").innerHTML = "";
  document.getElementById("btnImprimirGeral").style.display = "none";

  // Atualiza botões do menu
  document
    .querySelectorAll("nav button")
    .forEach((btn) => btn.classList.remove("active"));
  botao.classList.add("active");
}

// 2. LÓGICA DO MODELO TÉRMICO (VENDIDO)
function logicaTermica() {
  const num = document.getElementById("t_venda").value;
  const vend = document.getElementById("t_vend").value;
  const data = document.getElementById("dataVenda").value;
  const confirmado = document.getElementById("confirmadoPor").value;

  const newDate = data.split("-").reverse().join("/");

  const htmlCorpo = `
    <div class="etiqueta-conteudo">
        <h3 style="text-align:center; font-size: 2em; margin-bottom: 20px;">VENDIDO</h3>
        <div class="linha" style="font-size: 1.3em; margin-bottom: 10px;"><b>Nº VENDA:</b> <span>${num}</span></div>
        <div class="linha" style="font-size: 1.3em; margin-bottom: 10px;"><b>VENDEDOR:</b> <span>${vend}</span></div>
        <div class="linha" style="font-size: 1.3em; margin-bottom: 10px;"><b>DATA:</b> <span>${newDate}</span></div>
        <div class="linha" style="font-size: 1.3em; margin-bottom: 10px;"><b>CONFIRMADO:</b> <span>${confirmado}</span></div>
    </div>`;

  exibirResultado(htmlCorpo);
}

// 3. LÓGICA DO MODELO A4 VENDA (TRANSFERÊNCIA)
function logicaTransf() {
  const transf = document.getElementById("transf").value;
  const nfe = document.getElementById("nfe").value;
  const solicitado = document.getElementById("solicitado").value;
  const loja = document.getElementById("loja").value;
  const data = document.getElementById("data-transf").value;

  const newDate = data.split("-").reverse().join("/");

  const htmlCorpo = `
    <div class="etiqueta-conteudo">
        <h3 style="text-align:center; font-size: 2em; margin-bottom: 20px;">TRANSFERÊNCIA</h3>    
        <div class="linha" style="font-size: 1.3em; margin-bottom: 10px;"><b>TRANSFERÊNCIA:</b> <span>${transf}</span></div>
        <div class="linha" style="font-size: 1.3em; margin-bottom: 10px;"><b>Nº DA NFE:</b> <span>${nfe}</span></div>
        <div class="linha" style="font-size: 1.3em; margin-bottom: 10px;"><b>SOLICITADO:</b> <span>${solicitado}</span></div>
        <div class="linha" style="font-size: 1.3em; margin-bottom: 10px;"><b>LOJA:</b> <span>${loja}</span></div>
        <div class="linha" style="font-size: 1.3em; margin-bottom: 10px;"><b>DATA:</b> <span>${newDate}</span></div>
    </div>`;

  exibirResultado(htmlCorpo);
}

// 4. LÓGICA DO MODELO A4 ESTOQUE (CONTROLE DE OS)
function logicaA4Estoque() {
  const produto = document.getElementById("produto").value;
  const os = document.getElementById("os").value;
  const venda = document.getElementById("venda").value;
  const retirado = document.getElementById("retirado").value;
  const data = document.getElementById("data-os").value;

  const listaPecas = document.querySelector(".pecas-content");
  const conteudoPecas = listaPecas.innerHTML;

  const newDate = data ? data.split("-").reverse().join("/") : "";

  const htmlCorpo = `
    <div class="etiqueta-conteudo">
        <h1 style="text-align:center; font-size: 2.2em; margin-bottom: 25px;">INFORMAÇÕES DA ASSISTÊNCIA</h1>
        <div class="linha" style="margin-bottom: 12px;"><b style="font-size: 1.4em;">PRODUTO:</b> <span class="linha-prod" style="font-size: 1.3em;">${produto}</span></div>
        <div class="linha" style="margin-bottom: 12px;">
            <b style="font-size: 1.4em;">PEÇAS:</b> <br> 
            <ul style="list-style: none; padding: 0; margin: 5px 0 0 0; font-size: 1.3em;">${conteudoPecas}</ul>
        </div>
        <div class="linha" style="margin-bottom: 12px;"><b style="font-size: 1.4em">Nº DA OS:</b> <span class="linha-os" style="font-size: 1.3em;">${os}</span></div>
        <div class="linha" style="margin-bottom: 12px;"><b style="font-size: 1.4em">VENDA:</b> <span class="linha-os" style="font-size: 1.3em;">${venda}</span></div>
        <div class="linha" style="margin-bottom: 12px;"><b style="font-size: 1.4em">RETIRADO:</b> <span class="linha-os" style="font-size: 1.3em;"> ${retirado}</span></div>
        <div class="linha" style="margin-bottom: 12px;"><b style="font-size: 1.4em">DATA:</b> <span class="linha-os" style="font-size: 1.3em;">${newDate}</span></div>
    </div>`;

  exibirResultado(htmlCorpo);
}

// 5. MANIPULAÇÃO DE PEÇAS DA ASSISTÊNCIA
const salvarPecas = () => {
  const inputPecas = document.getElementById("pecas");
  const lista = document.querySelector(".pecas-content");
  const valor = inputPecas.value.trim();

  if (valor !== "") {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = "X";
    button.classList.add("btn-clear");
    li.textContent = valor;

    li.appendChild(button);
    lista.appendChild(li);
    inputPecas.value = "";
    inputPecas.focus();
  } else {
    alert("Digite o nome da peça antes de adicionar!");
  }
};

document.getElementById("pecas").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    salvarPecas();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-clear")) {
    if (confirm("Deseja mesmo excluir?")) {
      e.target.parentElement.remove();
    }
  }
});

// 6. FUNÇÃO AUXILIAR MODIFICADA PARA DUAS VIAS EM A4
// 6. FUNÇÃO AUXILIAR MODIFICADA PARA TRÊS VIAS EM A4
function exibirResultado(conteudoInterno) {
  // Monta a estrutura A4 gerando 3 vias separadas por linhas pontilhadas
  const estruturaA4 = `
    <div class="pagina-a4-impressao">
        <div class="via-etiqueta">
            ${conteudoInterno}
        </div>
        <div class="linha-divisoria-corte"></div>
        <div class="via-etiqueta">
            ${conteudoInterno}
        </div>
        <div class="linha-divisoria-corte"></div>
        <div class="via-etiqueta">
            ${conteudoInterno}
        </div>
    </div>
  `;

  document.getElementById("areaImpressao").innerHTML = estruturaA4;
  document.getElementById("btnImprimirGeral").style.display = "block";

  // Rola a página para baixo para ver o preview
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

// Inicializa as datas dos inputs com o dia de hoje
document.getElementById("dataVenda").valueAsDate = new Date();
document.getElementById("data-transf").valueAsDate = new Date();
document.getElementById("data-os").valueAsDate = new Date();
