import { useEffect, useState } from "react";
import "./App.css";

const categorie = [
  "Pane e forno",
  "Frutta e verdura",
  "Carne e pesce",
  "Latticini e uova",
  "Dispensa",
  "Bevande",
  "Surgelati",
  "Casa e pulizia",
  "Bagno e igiene",
  "Altro",
];

function determinaCategoria(nomeProdotto) {
  const nome = nomeProdotto.toLowerCase().trim();

  const contiene = (parole) =>
    parole.some((parola) => nome.includes(parola));

  if (
    contiene([
      "pane", "panino", "panini", "rosetta", "baguette",
      "focaccia", "pizza", "cracker", "crackers",
      "grissini", "fette biscottate"
    ])
  ) {
    return "Pane e forno";
  }

  if (
    contiene([
      "mela", "mele", "banana", "banane", "arancia", "arance",
      "pera", "pere", "fragola", "fragole", "limone", "limoni",
      "mandarino", "mandarini", "uva", "kiwi", "pesca", "pesche",
      "anguria", "melone",
      "pomodoro", "pomodori", "patata", "patate",
      "carota", "carote", "insalata", "lattuga",
      "zucchina", "zucchine", "melanzana", "melanzane",
      "cipolla", "cipolle", "aglio", "peperone", "peperoni",
      "broccoli", "spinaci", "verdura", "frutta"
    ])
  ) {
    return "Frutta e verdura";
  }

  if (
    contiene([
      "pollo", "carne", "manzo", "vitello", "maiale",
      "tacchino", "hamburger", "bistecca",
      "prosciutto", "salame", "mortadella", "salsiccia",
      "pesce", "salmone", "tonno", "merluzzo",
      "orata", "gamberi"
    ])
  ) {
    return "Carne e pesce";
  }

  if (
    contiene([
      "latte", "yogurt", "formaggio", "mozzarella",
      "burro", "panna", "ricotta", "parmigiano",
      "provola", "uovo", "uova"
    ])
  ) {
    return "Latticini e uova";
  }

  if (
    contiene([
      "acqua", "coca cola", "coca", "pepsi",
      "aranciata", "succo", "birra", "vino",
      "tè", "the", "caffè", "camomilla"
    ])
  ) {
    return "Bevande";
  }

  if (
    contiene([
      "surgelato", "surgelati", "gelato", "gelati",
      "ghiaccioli", "patatine surgelate",
      "pizza surgelata", "minestrone surgelato"
    ])
  ) {
    return "Surgelati";
  }

  if (
    contiene([
      "detersivo", "candeggina", "ammorbidente",
      "sgrassatore", "lavatrice", "lavastoviglie",
      "spugna", "spugne", "scottex",
      "carta cucina", "sacchetti", "sacchi spazzatura"
    ])
  ) {
    return "Casa e pulizia";
  }

  if (
    contiene([
      "carta igienica", "sapone", "shampoo",
      "bagnoschiuma", "dentifricio", "spazzolino",
      "deodorante", "rasoio", "rasoi",
      "assorbenti", "cotone", "dischetti",
      "salviette", "collutorio"
    ])
  ) {
    return "Bagno e igiene";
  }

  if (
    contiene([
      "pasta", "riso", "farina", "zucchero", "sale",
      "olio", "aceto", "passata", "pelati",
      "legumi", "fagioli", "ceci", "lenticchie",
      "biscotti", "cereali", "marmellata",
      "nutella", "miele", "maionese", "ketchup",
      "spezie"
    ])
  ) {
    return "Dispensa";
  }

  return "Altro";
}

function App() {
  const [prodotti, setProdotti] = useState(() => {
  const prodottiSalvati = localStorage.getItem("lista-spesa");
  return prodottiSalvati? JSON.parse(prodottiSalvati):[];
});
  const [nome, setNome] = useState("");
  const [quantita, setQuantita] = useState(1);
  const [categoria, setCategoria] = useState("Dispensa");
  useEffect(() => {
  localStorage.setItem(
    "lista-spesa",
    JSON.stringify(prodotti)
  );
}, [prodotti]);

  function aggiungiProdotto(e) {
    e.preventDefault();

    if (nome.trim() === "") return;

    const nuovo = {
      id: Date.now(),
      nome: nome.trim(),
      quantita: Number(quantita),
      categoria,
      acquistato: false,
    };

    setProdotti([...prodotti, nuovo]);

    setNome("");
    setQuantita(1);
  }

  function eliminaProdotto(id) {
    setProdotti(
      prodotti.filter((prodotto) => prodotto.id !== id)
    );
  }

  function completaProdotto(id) {
    setProdotti(
      prodotti.map((prodotto) =>
        prodotto.id === id
          ? {
              ...prodotto,
              acquistato: !prodotto.acquistato,
            }
          : prodotto
      )
    );
  }

  function cambiaQuantita(id, valore) {
    setProdotti(
      prodotti.map((prodotto) =>
        prodotto.id === id
          ? {
              ...prodotto,
              quantita: Math.max(1, prodotto.quantita + valore),
            }
          : prodotto
      )
    );
  }

  const acquistati = prodotti.filter(
    (prodotto) => prodotto.acquistato
  ).length;

  const percentuale =
    prodotti.length === 0
      ? 0
      : Math.round((acquistati / prodotti.length) * 100);

  return (
    <div className="app">
      <div className="container">

        <header className="header">
          <div>
            <p className="sottotitolo">LA TUA LISTA</p>
            <h1><img src="/favicon.svg" alt="" /> Spesa Facile</h1><p className="intro">La spesa di ogni giorno, con semplicità.</p>
          </div>

          <div className="statistiche">
            <strong>{prodotti.length}</strong>
            <span>prodotti</span>
          </div>
        </header>

        <form className="form" onSubmit={aggiungiProdotto}>
          <h2>Aggiungi alla lista</h2>
          <label className="campo-nome">Prodotto

          <input
            type="text"
            placeholder="Ad esempio: pane, latte, mele"
            required
            value={nome}
            onChange={(e) => {const valore = e.target.value;
            setNome(valore);
              if (valore.trim() !== "") {setCategoria(determinaCategoria(valore));
              } else {setCategoria("Dispensa");}
            }
          }
          />

          </label>
          <label className="campo-quantita">Quantità
          <input
            className="quantita-input"
            type="number"
            min="1"
            step="1"
            required
            value={quantita}
            onChange={(e) => setQuantita(e.target.value)}
          />

          </label>
          <label className="campo-categoria">Categoria
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorie.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          </label>
          <p className="form-aiuto">La categoria si sceglie da sola. Puoi cambiarla.</p>
          <button type="submit">
            + Aggiungi
          </button>

        </form>

        {prodotti.length > 0 && (
          <div className="progressione">

            <div className="progressione-testo">
              <span>
                {acquistati} di {prodotti.length} acquistati
              </span>

              <span>{percentuale}%</span>
            </div>

            <div className="barra" role="progressbar" aria-label="Prodotti acquistati" aria-valuenow={percentuale} aria-valuemin={0} aria-valuemax={100}>
              <div
                className="barra-riempimento"
                style={{ width: `${percentuale}%` }}
              />
            </div>

          </div>
        )}

        <main className="lista">

          {prodotti.length === 0 ? (
            <div className="vuoto">
              <div className="icona-vuoto"><img src="/favicon.svg" alt="" /></div>

              <h2>La lista è vuota</h2>

              <p>
                Aggiungi il primo prodotto per iniziare
              </p>
            </div>
          ) : (
            categorie.map((cat) => {

              const prodottiCategoria = prodotti.filter(
                (prodotto) => prodotto.categoria === cat
              );

              if (prodottiCategoria.length === 0) {
                return null;
              }

              return (
                <section
                  className="categoria"
                  key={cat}
                >

                  <h2 className="titolo-categoria">
                    <span aria-hidden="true">{["🥖", "🍎", "🐟", "🥛", "🫙", "💧", "❄️", "🧽", "🧼", "🛍️"][categorie.indexOf(cat)]}</span> {cat}<span className="conteggio">{prodottiCategoria.length}</span>
                  </h2>

                  {prodottiCategoria.map((prodotto) => (
                    <div
                      className={`prodotto ${
                        prodotto.acquistato
                          ? "completato"
                          : ""
                      }`}
                      key={prodotto.id}
                    >

                      <button
                        className="checkbox"
                        aria-label={`Segna ${prodotto.nome} come ${prodotto.acquistato ? "da acquistare" : "acquistato"}`}
                        aria-pressed={prodotto.acquistato}
                        onClick={() =>
                          completaProdotto(prodotto.id)
                        }
                      >
                        {prodotto.acquistato ? "✓" : ""}
                      </button>

                      <div className="info-prodotto">
                        <span className="nome-prodotto">
                          {prodotto.nome}
                        </span>

                        <span className="categoria-prodotto">
                          {prodotto.acquistato ? "Acquistato" : "Da acquistare"}
                        </span>
                      </div>

                      <div className="controllo-quantita">

                        <button
                          aria-label={`Diminuisci quantità di ${prodotto.nome}`}
                          disabled={prodotto.quantita <= 1}
                          onClick={() =>
                            cambiaQuantita(
                              prodotto.id,
                              -1
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {prodotto.quantita}
                        </span>

                        <button
                          aria-label={`Aumenta quantità di ${prodotto.nome}`}
                          onClick={() =>
                            cambiaQuantita(
                              prodotto.id,
                              1
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                      <button
                        className="elimina"
                        aria-label={`Elimina ${prodotto.nome}`}
                        onClick={() =>
                          eliminaProdotto(prodotto.id)
                        }
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7" /></svg>
                      </button>

                    </div>
                  ))}

                </section>
              );
            })
          )}

        </main>

        {prodotti.length > 0 && (
          <footer>
            🛒 Buona spesa!
          </footer>
        )}

      </div>
    </div>
  );
}

export default App;