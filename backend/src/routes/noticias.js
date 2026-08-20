import express from "express";

const router = express.Router();

const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2/everything";

const MAPA_CATEGORIAS = {
  Tecnologia: "technology",
  Política: "politics",
  Economia: "business",
  Esportes: "sports",
  Ciência: "science",
  Cultura: "entertainment",
};

router.get("/", async (req, res) => {
  try {
    const categoriasParam = req.query.categorias || "";
    const categorias = categoriasParam.split(",").filter(Boolean);

    if (categorias.length === 0) {
      return res.status(400).json({ erro: "Nenhuma categoria informada." });
    }

    const chamadas = categorias.map((cat) => {
      const termo = MAPA_CATEGORIAS[cat] || cat;
      return fetch(
        `${BASE_URL}?q=${encodeURIComponent(termo)}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`,
      ).then(async (resp) => {
        if (!resp.ok) {
          const corpo = await resp.json().catch(() => ({}));
          throw new Error(corpo.message || "Falha ao carregar notícias.");
        }
        return resp.json();
      });
    });

    const resultados = await Promise.all(chamadas);
    const noticias = resultados.flatMap((r) => r.articles);
    res.json(noticias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: err.message || "Erro ao buscar notícias." });
  }
});

export default router;
