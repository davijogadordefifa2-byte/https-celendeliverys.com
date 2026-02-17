let carrinho = [];

// Calcula preço e lucro/prejuízo
function calcular() {
  let kg = Number(document.getElementById("precoKg").value);
  let peso = Number(document.getElementById("peso").value);
  let embalagem = Number(document.getElementById("embalagem").value);
  let ingredientes = Number(document.getElementById("ingredientes").value);
  let desconto = Number(document.getElementById("desconto").value);
  let margem = Number(document.getElementById("margem").value);

  let valorComida = (kg/1000)*peso + embalagem + ingredientes - desconto;
  let lucro = valorComida - (embalagem + ingredientes);
  let precoComMargem = valorComida + (valorComida*(margem/100));

  document.getElementById("precoFinal").innerText = 
    "Preço Final: R$ " + valorComida.toFixed(2);

  let lucroTexto = document.getElementById("lucroTexto");
  if(lucro >= 0) {
    lucroTexto.innerText = "Lucro: R$ " + lucro.toFixed(2);
    lucroTexto.className = "lucro";
  } else {
    lucroTexto.innerText = "Prejuízo: R$ " + lucro.toFixed(2);
    lucroTexto.className = "prejuizo";
  }
}

// Adiciona item ao carrinho
function adicionarCarrinho() {
  calcular();
  let nome = document.getElementById("nomeComida").value;
  let preco = Number(document.getElementById("precoFinal").innerText.replace("Preço Final: R$ ",""));
  if(!nome || preco<=0) return;
  carrinho.push({nome, preco});
  mostrarCarrinho();
}

// Mostra carrinho na tabela
function mostrarCarrinho() {
  let tbody = document.getElementById("carrinhoTabela");
  tbody.innerHTML = "";
  let total=0;
  carrinho.forEach((item,i)=>{
    total += item.preco;
    tbody.innerHTML += `<tr>
      <td>${item.nome}</td>
      <td>R$ ${item.preco.toFixed(2)}</td>
      <td><button onclick="removerItem(${i})">X</button></td>
    </tr>`;
  });
  document.getElementById("totalCarrinho").innerText = "Total: R$" + total.toFixed(2);
}

// Remove item do carrinho
function removerItem(i){
  carrinho.splice(i,1);
  mostrarCarrinho();
}

// Eventos: recalcula ao mudar qualquer input
document.querySelectorAll("input").forEach(el=>{
  el.addEventListener("input", calcular);
});
