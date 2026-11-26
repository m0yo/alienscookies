/* Estado do pedido: quantidades, total e texto da mensagem do WhatsApp */
var ALL_PRODUCTS = [];
var qty = {};

/* Chame de novo sempre que FLAVORS mudar (ex.: depois de ler a planilha) */
function setProducts() {
  ALL_PRODUCTS = FLAVORS.concat(COMBOS);
  qty = {};
  ALL_PRODUCTS.forEach(function (p) { qty[p.id] = 0; });
}
setProducts();

function brl(n) {
  return "R$ " + n.toFixed(2).replace(".", ",");
}

function total() {
  return ALL_PRODUCTS.reduce(function (sum, p) { return sum + p.price * qty[p.id]; }, 0);
}

/* Limite por produto: 30, ou o estoque da planilha se for menor */
function maxQty(p) {
  return typeof p.stock === "number" ? Math.min(30, p.stock) : 30;
}

/* Devolve false se bateu no limite do estoque */
function changeQty(id, delta) {
  var p = ALL_PRODUCTS.filter(function (x) { return x.id === id; })[0];
  if (!p) return true;
  var wanted = qty[id] + delta;
  qty[id] = Math.max(0, Math.min(maxQty(p), wanted));
  return !(delta > 0 && wanted > qty[id]);
}

function resetCart() {
  ALL_PRODUCTS.forEach(function (p) { qty[p.id] = 0; });
}

function buildMessage() {
  var nome = document.getElementById("nome").value.trim();
  var contato = document.getElementById("contato").value.trim();
  var data = document.getElementById("data").value;
  var local = document.getElementById("local").value.trim();
  var obs = document.getElementById("obs").value.trim();

  var lines = ["👽 Reserva Alien's Cookies", ""];
  ALL_PRODUCTS.forEach(function (p) {
    if (qty[p.id]) lines.push(qty[p.id] + "x " + p.name + " (" + brl(p.price * qty[p.id]) + ")");
  });
  lines.push("", "Total: " + brl(total()));
  if (nome) lines.push("Nome: " + nome);
  if (contato) lines.push("WhatsApp: " + contato);
  if (data) {
    var d = data.split("-");
    lines.push("Entrega: " + d[2] + "/" + d[1] + "/" + d[0]);
  }
  if (local) lines.push("Local: " + local);
  if (obs) lines.push("Obs.: " + obs);
  return lines.join("\n");
}
