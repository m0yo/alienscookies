/* Montagem dos cartões do cardápio e atualização do resumo do pedido */
function createCard(p) {
  var el = document.createElement("article");
  el.className = "card" + (p.soldout ? " soldout" : "");

  var controle = p.soldout
    ? '<span class="out" role="status">Esgotado</span>'
    : '<div class="qty" role="group" aria-label="Quantidade de ' + p.name + '">' +
        '<button type="button" data-id="' + p.id + '" data-d="-1" aria-label="Diminuir ' + p.name + '">−</button>' +
        '<output id="q-' + p.id + '">0</output>' +
        '<button type="button" data-id="' + p.id + '" data-d="1" aria-label="Aumentar ' + p.name + '">+</button>' +
      '</div>';

  el.innerHTML =
    '<div><h3>' + p.emoji + ' ' + p.name + (p.special ? '<span class="tag">especial</span>' : '') + '</h3>' +
    '<p class="price">' + brl(p.price) + (p.info ? ' <small>| ' + p.info + '</small>' : '') + '</p>' +
    '<p class="desc">' + p.desc + '</p></div>' +
    controle;
  return el;
}

function renderMenu() {
  var flavors = document.getElementById("flavors");
  var combos = document.getElementById("combos");
  FLAVORS.forEach(function (p) { flavors.appendChild(createCard(p)); });
  COMBOS.forEach(function (p) { combos.appendChild(createCard(p)); });
}

function renderSummary() {
  var ul = document.getElementById("items");
  var rows = ALL_PRODUCTS.filter(function (p) { return qty[p.id] > 0; });
  ul.innerHTML = rows.length
    ? rows.map(function (p) {
        return "<li><span>" + qty[p.id] + "x " + p.name + "</span><span>" + brl(p.price * qty[p.id]) + "</span></li>";
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
