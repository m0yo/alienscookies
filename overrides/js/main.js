/* Ponto de entrada: liga os eventos da página */
var form = document.getElementById("orderForm");
var statusEl = document.getElementById("status");
var formParts = ".row, label, .summary, .actions";

function setFormVisible(visible) {
  form.querySelectorAll(formParts).forEach(function (el) { el.hidden = !visible; });
  document.getElementById("done").hidden = visible;
}

/* Botões + e − */
document.addEventListener("click", function (e) {
  var b = e.target.closest("button[data-id]");
  if (!b) return;
  var ok = changeQty(b.dataset.id, Number(b.dataset.d));
  statusEl.textContent = ok ? "" : "Esse é o máximo que temos em estoque no momento. 🛸";
  syncQtyDisplays();
  renderSummary();
});

form.addEventListener("input", renderSummary);

/* Envio: abre o WhatsApp com o pedido pronto */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  statusEl.textContent = "";

  if (total() === 0) {
    statusEl.textContent = "Escolha pelo menos um cookie para reservar.";
    return;
  }
  var nome = document.getElementById("nome");
  if (nome.value.trim() === "") {
    statusEl.textContent = "Digite seu nome.";
    nome.focus();
    return;
  }

  var url = WA_BASE + "?text=" + encodeURIComponent(buildMessage());
  document.getElementById("wa").href = url;
  try { window.open(url, "_blank", "noopener"); } catch (err) { /* o botão da tela de confirmação serve de plano B */ }
  setFormVisible(false);
});

/* Fazer outra reserva */
document.getElementById("again").addEventListener("click", function () {
  resetCart();
  syncQtyDisplays();
  form.reset();
  setFormVisible(true);
  statusEl.textContent = "";
  renderSummary();
});

/* Data mínima de entrega = hoje */
(function () {
  var t = new Date();
  document.getElementById("data").min =
    t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0");
})();

/* Lê os sabores e o estoque da planilha (Apps Script). Se falhar, segue com a lista de data.js. */
function loadFlavors() {
  if (!STOCK_API) return Promise.resolve();

  var ctrl = new AbortController();
  var timer = setTimeout(function () { ctrl.abort(); }, 8000);

  return fetch(STOCK_API, { signal: ctrl.signal })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data.success || !Array.isArray(data.products) || data.products.length === 0) {
        throw new Error(data.error || "Resposta vazia");
      }
      FLAVORS = data.products;
      setProducts();
    })
    .catch(function (err) { console.warn("Estoque indisponível, usando o cardápio padrão.", err); })
    .then(function () { clearTimeout(timer); });
}

document.getElementById("flavors").innerHTML = '<p class="desc">Carregando sabores... 🛸</p>';
loadFlavors().then(function () {
  renderMenu();
  renderSummary();
});
