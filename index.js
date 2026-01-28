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

// 2. LÓGICA DO MODELO TÉRMICO
function logicaTermica() {
  const num = document.getElementById("t_venda").value;
  const vend = document.getElementById("t_vend").value;
  const data = document.getElementById("dataVenda").value;
  const confirmado = document.getElementById("confirmadoPor").value;

  const newDate = data.split("-").reverse().join("/");

  const html = `
    <div class="preview-termico">
        <div class="etiqueta">
            <h3 style="text-align:center">VENDIDO</h3>
         
            <div class="linha"><b>Nº VENDA:</b> <span>${num}</span></div>
            <div class="linha"><b>VENDEDOR:</b> <span>${vend}</span></div>
            <div class="linha"><b>DATA:</b> <span>${newDate}</span></div>
            <div class="linha"><b>CONFIRMADO:</b> <span>${confirmado}</span></div>
           
        </div>
    </div>`;

  /* <div style="text-align:center; margin-top:10px">--- FIM ---</div>*/

  exibirResultado(html);
}

// 3. LÓGICA DO MODELO A4 VENDA
function logicaTransf() {
  const transf = document.getElementById("transf").value;
  const nfe = document.getElementById("nfe").value;
  const solicitado = document.getElementById("solicitado").value;
  const loja = document.getElementById("loja").value;
  const data = document.getElementById("data-transf").value;

  const newDate = data.split("-").reverse().join("/");

  const html = `
  <div class="preview-termico">
        <div class="etiqueta">
        <h3 style="text-align:center">TRANSFERÊNCIA</h3>    
        <div class="linha"><b>TRANSFERENCIA:</b><span>${transf}</span></div>
        <div class="linha"><b>Nº DA NFE:</b><span>${nfe}</span></div>
        <div class="linha"><b>SOLICITADO:</b><span>${solicitado}</span></div>
        <div class="linha"><b>LOJA:</b><span>${loja}</span></div>
        <div class="linha"><b>DATA:</b><span>${newDate}</span></div>
            </div>
            </div>`;

  exibirResultado(html);
}
/*  <div style="margin-top:100px; border-top: 1px solid #000; text-align:center">Assinatura</div> */

// 4. LÓGICA DO MODELO A4 ESTOQUE
function logicaA4Estoque() {
  const produto = document.getElementById("produto").value;
  const os = document.getElementById("os").value;
  const venda = document.getElementById("venda").value;
  const retirado = document.getElementById("retirado").value;
  const data = document.getElementById("data-os").value;
  const pecas = document.getElementById("pecas").value;

  // 1. Capturamos a lista (a UL)
  const listaPecas = document.querySelector(".pecas-content");

  // 2. Pegamos o HTML interno (os <li> que você adicionou)
  // Isso garante que cada item continue sendo uma "linha" na etiqueta
  const conteudoPecas = listaPecas.innerHTML;

  const newDate = data ? data.split("-").reverse().join("/") : "";

  const html = `
  <div class="preview-a4">
    <div class="etiqueta-a4">
        <h1 style="text-align:center">INFORMAÇÕES DA ASSISTÊNCIA</h1>
        <div class="linha"><b>PRODUTO:</b style="font-size: 1.4em; font-size: 1.4em">
         <span class="linha-prod">${produto}</span></div>
        
        <!-- 3. Usamos uma <ul> para manter a formatação de lista uma embaixo da outra -->
        <div class="linha">
            <b>PEÇAS:</b> <br> 
            <ul style="list-style: none; padding: 0; margin: 0;">${conteudoPecas}</ul>
        </div>

        <div class="linha"><b style="font-size: 1.4em">Nº DA OS:</b><span class="linha-os">${os}</span></div>
        <div class="linha"><b style="font-size: 1.4em">VENDA:</b><span class="linha-os">${venda}</span></div>
        <div class="linha"><b style="font-size: 1.4em">RETIRADO:</b><span class="linha-os"> ${retirado}</span></div>
        <div class="linha"><b style="font-size: 1.4em">DATA:</b> <span class="linha-os">${newDate}</span></div>
    </div>
  </div>`;

  exibirResultado(html);

  // Limpa a lista original do formulário após gerar
  // listaPecas.innerHTML = "";
}

/* function salvarPecas() {

  const li = document.createElement("li");
  const button = document.createElement("button");
  const pecas = document.getElementById("pecas").value;
  let pecasContent = document.querySelector(".pecas-content");

  button.innerHTML = "X";
  button.classList.add("btn-clear");

  li.innerText = pecas;

  li.appendChild(button);
  pecasContent.appendChild(li);

  pecas.value = "";

  return;
} */

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

// Função auxiliar para mostrar o botão de imprimir
function exibirResultado(conteudo) {
  document.getElementById("areaImpressao").innerHTML = conteudo;
  document.getElementById("btnImprimirGeral").style.display = "block";

  // Rola a página para baixo para ver o preview
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

document.getElementById("dataVenda").valueAsDate = new Date();
document.getElementById("data-transf").valueAsDate = new Date();
document.getElementById("data-os").valueAsDate = new Date();
