import { useState } from "react";
import "./App.css";

const categorie = [
  "Dispensa",
  "Frutta e verdura",
  "Carne e pesce",
  "Latticini",
  "Bevande",
  "Casa",
  "Altro",
];
function determinaCategoria(nomeProdotto) {
  const nome = nomeProdotto.toLowerCase().trim();

  if (
    ["latte", "yogurt", "formaggio", "mozzarella", "burro", "panna", "ricotta", "parmigiano"]
      .some((parola) => nome.includes(parola))
  ) {
    return "Latticini";
  }

  if (
    ["mela", "mele", "banana", "banane", "arancia", "arance", "pera", "pere",
     "fragola", "fragole", "pomodoro", "pomodori", "patata", "patate",
     "carota", "carote", "insalata", "zucchina", "zucchine", "melanzana", "melanzane"]
      .some((parola) => nome.includes(parola))
  ) {
    return "Frutta e verdura";
  }

  if (
    ["pollo", "carne", "manzo", "vitello", "maiale", "prosciutto",
     "salame", "salsiccia", "pesce", "salmone", "tonno"]
      .some((parola) => nome.includes(parola))
  ) {
    return "Carne e pesce";
  }

  if (
    ["acqua", "coca", "pepsi", "aranciata", "succo", "birra",
     "vino", "bevanda", "tè", "the"]
      .some((parola) => nome.includes(parola))
  ) {
    return "Bevande";
  }

  if (
    ["detersivo", "sapone", "shampoo", "bagnoschiuma",
     "carta igienica", "scottex", "spugna", "candeggina"]
      .some((parola) => nome.includes(parola))
  ) {
    return "Casa";
  }

  return "Dispensa";
}

function App() {
  const [prodotti, setProdotti] = useState([]);
  const [nome, setNome] = useState("");
  const [quantita, setQuantita] = useState(1);
  const [categoria, setCategoria] = useState("Dispensa");

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
            <h1>🛒 Spesa Facile</h1>
          </div>

          <div className="statistiche">
            <strong>{prodotti.length}</strong>
            <span>prodotti</span>
          </div>
        </header>

        <form className="form" onSubmit={aggiungiProdotto}>

          <input
            type="text"
            placeholder="Cosa devi comprare?"
            value={nome}
            onChange={(e) => {const valore = e.target.value;
            setNome(valore);
              if (valore.trim() !== "") {setCategoria(determinaCategoria(valore));
              } else {setCategoria("Dispensa");}
            }
          }
          />

          <input
            className="quantita-input"
            type="number"
            min="1"
            value={quantita}
            onChange={(e) => setQuantita(e.target.value)}
          />

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

            <div className="barra">
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
              <div className="icona-vuoto">🛍️</div>

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
                    {cat}
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
                          {prodotto.categoria}
                        </span>
                      </div>

                      <div className="controllo-quantita">

                        <button
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
                        onClick={() =>
                          eliminaProdotto(prodotto.id)
                        }
                      >
                        🗑️
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