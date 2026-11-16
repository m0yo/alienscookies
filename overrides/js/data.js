/* Configuração e dados do cardápio. Para mudar preços, sabores ou o número do WhatsApp, edite só este arquivo. */

/* WhatsApp: só dígitos, com DDI e DDD. Para usar o link de QR da loja, troque aqui. */
var WA_BASE = "https://wa.me/5561984841703";

/* URL do Web App do Apps Script (a que termina em /exec). Com ela, os sabores vêm da planilha.
   Vazia ou fora do ar: o site usa a lista abaixo como plano B. */
var STOCK_API = "";

/* Plano B (sem controle de estoque). Em condições normais, a planilha manda. */
var FLAVORS = [
  { id: "rv", emoji: "💌", name: "Red Velvet",   price: 9,  info: "Aprox. 50g", desc: "Massa de Red Velvet com baunilha e chocolate branco" },
  { id: "bq", emoji: "🍪", name: "Basiquinho",   price: 7,  info: "Aprox. 50g", desc: "Massa de baunilha e amêndoas com gotas de chocolate ao leite" },
  { id: "zb", emoji: "🦓", name: "Zebrinha",     price: 8,  info: "Aprox. 50g", desc: "Massa de cacau 50% com baunilha e chocolate branco" },
  { id: "rj", emoji: "❤️", name: "Red Junbinho", price: 12, info: "Aprox. 70g", desc: "Massa de Red Velvet com baunilha, chocolate branco e recheio de brigadeiro de leite ninho", special: true }
];

var COMBOS = [
  { id: "c2", emoji: "👽", name: "Duplinha abdução",    price: 13, desc: "2 cookies sortidos" },
  { id: "c3", emoji: "🛸", name: "Trio intergaláctico", price: 19, desc: "3 cookies sortidos" },
  { id: "c4", emoji: "🌌", name: "Esquadrão famintos",  price: 30, desc: "4 cookies sortidos" }
];
