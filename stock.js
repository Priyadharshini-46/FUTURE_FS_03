const stock = {
  "Checked Shirt": {
    black: { S: 5, M: 5, L: 3 },
    white: { S: 2, M: 4, L: 1 }
  },
  "Plain T-Shirt": {
    black: { S: 10, M: 6, L: 0 }
  }
};

if (!localStorage.getItem("stock")) {
  localStorage.setItem("stock", JSON.stringify(stock));
}
