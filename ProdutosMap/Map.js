const produtos = [
  { nome: "Maçã", categoria: "Frutas" },
  { nome: "Banana", categoria: "Frutas" },
  { nome: "Pera", categoria: "Frutas" },
  { nome: "Uva", categoria: "Frutas" },
  { nome: "Pêssego", categoria: "Frutas" },
  { nome: "Cenoura", categoria: "Legumes" },
  { nome: "Beterraba", categoria: "Legumes" },
  { nome: "Abobrinha", categoria: "Legumes" },
  { nome: "Tomate", categoria: "Legumes" },
  { nome: "Batata", categoria: "Legumes" },
];

const produtosMap = new Map();

produtos.forEach((produto) => {
  if (!produtosMap.has(produto.categoria)) {
    produtosMap.set(produto.categoria, []);
  }

  produtosMap.get(produto.categoria).push(produto);
});

console.log(produtosMap);
