/* Estado do pedido: quantidades, total e texto da mensagem do WhatsApp */
var ALL_PRODUCTS = FLAVORS.concat(COMBOS);
var qty = {};
ALL_PRODUCTS.forEach(function (p) { qty[p.id] = 0; });

function brl(n) {
  return "R$ " + n.toFixed(2).replace(".", ",");
}

function total() {
  return ALL_PRODUCTS.reduce(function (sum, p) { return sum + p.price * qty[p.id]; }, 0);
}

function changeQty(id, delta) {
  qty[id] = Math.max(0, Math.min(30, qty[id] + delta));
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
