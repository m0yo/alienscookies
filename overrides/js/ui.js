/* Montagem dos cartões do cardápio e atualização do resumo do pedido */
/* Os textos vêm da planilha: escapa antes de colocar no HTML */
function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function createCard(p) {
  var el = document.createElement("article");
  el.className = "card" + (p.soldout ? " soldout" : "");

  var controle = p.soldout
    ? '<span class="out" role="status">Esgotado</span>'
    : '<div class="qty" role="group" aria-label="Quantidade de ' + esc(p.name) + '">' +
        '<button type="button" data-id="' + esc(p.id) + '" data-d="-1" aria-label="Diminuir ' + esc(p.name) + '">−</button>' +
        '<output id="q-' + esc(p.id) + '">0</output>' +
        '<button type="button" data-id="' + esc(p.id) + '" data-d="1" aria-label="Aumentar ' + esc(p.name) + '">+</button>' +
      '</div>';

  el.innerHTML =
    '<div><h3>' + esc(p.emoji || "") + ' ' + esc(p.name) + (p.special ? '<span class="tag">especial</span>' : '') + '</h3>' +
    '<p class="price">' + brl(p.price) + (p.info ? ' <small>| ' + esc(p.info) + '</small>' : '') +
    (!p.soldout && typeof p.stock === "number" && p.stock <= 3 ? ' <small>| Restam ' + p.stock + '</small>' : '') + '</p>' +
    '<p class="desc">' + esc(p.desc || "") + '</p></div>' +
    controle;
  return el;
}

function renderMenu() {
  var flavors = document.getElementById("flavors");
  var combos = document.getElementById("combos");
  flavors.innerHTML = "";
  combos.innerHTML = "";
  FLAVORS.forEach(function (p) { flavors.appendChild(createCard(p)); });
  COMBOS.forEach(function (p) { combos.appendChild(createCard(p)); });
}

function renderSummary() {
  var ul = document.getElementById("items");
  var rows = ALL_PRODUCTS.filter(function (p) { return qty[p.id] > 0; });
  ul.innerHTML = rows.length
    ? rows.map(function (p) {
        return "<li><span>" + qty[p.id] + "x " + esc(p.name) + "</span><span>" + brl(p.price * qty[p.id]) + "</span></li>";
      }).join("")
    : '<li class="empty">Escolha seus cookies acima 👆</li>';
  document.getElementById("total").textContent = brl(total());
}

function syncQtyDisplays() {
  ALL_PRODUCTS.forEach(function (p) {
    var out = document.getElementById("q-" + p.id);
    if (out) out.textContent = qty[p.id];
  });
}
