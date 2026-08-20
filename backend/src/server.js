import app from "./app.js";

const PORTA = 3000;

app.listen(PORTA, () => {
  console.log(`Jornly API rodando em http://localhost:${PORTA}`);
});
