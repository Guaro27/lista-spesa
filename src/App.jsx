import { useEffect, useState } from "react";
import "./App.css";
import AppUpdate from "./AppUpdate.jsx";

const categorie = [
  "Pane e forno",
  "Frutta e verdura",
  "Carne e pesce",
  "Latticini e uova",
  "Dispensa",
  "Bevande",
  "Surgelati",
  "barattoli",
  "Casa e pulizia",
  "Bagno e igiene",
  "Informatica e tecnologia",
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
      "grissini", "fette biscottate", "brioche", "cornetto", "ciabatta", "bagel",
      "wasa", "tartine", "pita", "tortilla", "pan carré", "pan bauletto",
      "panettone", "pandoro", "colomba", "biscotti", "frollini", "merendine",
      "torte", "crostate", "muffin", "ciambelle", "biscottini", "biscottone",
      "biscottino", "biscottone al cioccolato", "biscottino al cioccolato",
      "biscottone alla frutta", "biscottino alla frutta",
      "biscottone al burro", "biscottino al burro",
      "biscottone integrale", "biscottino integrale",
      "biscottone senza zucchero", "biscottino senza zucchero",
      "biscottone senza glutine", "biscottino senza glutine",
      "biscottone vegano", "biscottino vegano", "biscottone biologico", "biscottino biologico",
      "biscottone artigianale", "biscottino artigianale",
      "biscottone industriale", "biscottino industriale",
      "biscottone confezionato", "biscottino confezionato",
      "biscottone sfuso", "biscottino sfuso",
      "biscottone da forno", "biscottino da forno",
      "biscottone da pasticceria", "biscottino da pasticceria",
      "biscottone da panetteria", "biscottino da panetteria", "wasa integrale", "wasa senza glutine", 
      "wasa senza zucchero", "wasa biologico", "wasa vegano"
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
      "orata", "gamberi", "cozze", "vongole", "calamari", "seppie",
      "polpo", "aragosta", "granchio", "sogliola", "spigola",
      "acciughe", "alici", "sardine", "trota", "sgombro",
      "crostacei", "frutti di mare", "filetto di pesce", "filetti di pesce", 
      "trancio di pesce", "tranci di pesce", "carpaccio di pesce", "carpacci di pesce", 
      "bocconcini di carne", "bocconcini di pesce"
    ])
  ) {
    return "Carne e pesce";
  }

  if (
    contiene([
      "latte", "yogurt", "formaggio", "mozzarella",
      "burro", "panna", "ricotta", "parmigiano",
      "provola", "uovo", "uova", "frittata", "frittate", "crema", "gelato",
      "cagliata", "caciotta", "pecorino", "gorgonzola", "asiago",
      "grana", "emmental", "fontina", "taleggio", "stracchino",
      "crescenza", "mascarpone", "ricottina", "ricottone",
      "latte condensato", "latte scremato", "latte intero",
      "latte parzialmente scremato", "latte di capra", "latte di mucca",
      "latte di pecora", "latte di bufala"
    ])
  ) {
    return "Latticini e uova";
  }

  if (
    contiene([
      "acqua", "coca cola", "coca", "pepsi",
      "aranciata", "succo", "birra", "vino",
      "tè", "the", "caffè", "camomilla",
      "bevanda", "bibita", "frizzante", "gassata",
      "analcolica", "alcolica", "cocktail", "aperitivo",
      "spumante", "prosecco", "whisky", "rum",
      "vodka", "gin", "tequila", "liquore",
      "sciroppo", "frullato", "smoothie", 
      "latte di mandorla", "latte di soia", "latte di avena",
      "latte di riso", "latte di cocco", "latte di nocciola",
      "latte di canapa", "latte di anacardi", "latte di pistacchio",
      "latte di castagne", "latte di quinoa", "latte di farro",
      "latte di kamut", "latte di orzo", "latte di segale",
      "latte di miglio", "latte di avena e mandorla",
      "latte di soia e riso", "latte di cocco e ananas",
      "latte di nocciola e cacao",
    ])
  ) {
    return "Bevande";
  }

  if (
    contiene([
      "surgelato", "surgelati", "gelato", "gelati",
      "ghiaccioli", "patatine surgelate",
      "pizza surgelata", "minestrone surgelato",
      "verdure surgelate", "frutti di mare surgelati",
      "pollo surgelato", "carne surgelata", "pesce surgelato",
      "cibi pronti surgelati", "piatti pronti surgelati",
      "dolci surgelati", "torte surgelate", "biscotti surgelati",
      "gelato alla vaniglia", "gelato al cioccolato", "gelato alla fragola",
      "gelato al pistacchio", "gelato al limone", "gelato al caffè",
      "gelato alla nocciola", "gelato alla stracciatella", "gelato alla menta",
      "gelato alla frutta", "gelato alla crema", "gelato al caramello",
      "gelato al cocco", "gelato al mango", "gelato al lampone",
      "gelato al melone", "gelato all'anguria", "gelato all'ananas",
      "gelato alla banana", "gelato alla pesca", "gelato all'albicocca",
      "gelato alla ciliegia", "gelato alla pera", "gelato all'uva"
    ])
  ) {
    return "Surgelati";
  }

  if (
    contiene([
      "barattolo", "barattoli", "vasetto", "vasetti",
      "conserva", "conserve", "salsa", "salse",
      "sottaceto", "sottolio", "marmellata",
      "nutella", "miele", "fagioli", "piselli", "mais",
      "tonno", "sardine", "acciughe", "alici", "salmone affumicato",
      "sugo", "sughi", "passata di pomodoro", "pelati",
      "pesto", "ketchup", "maionese", "senape",
      "salsa barbecue", "salsa piccante", "salsa di soia",
      "salsa al curry", "salsa al pesto", "salsa al formaggio",
      "salsa al cioccolato", "salsa alla vaniglia", "salsa al caramello",
      "salsa al limone", "salsa all'arancia", "salsa al mango",
      "salsa al peperoncino", "salsa al basilico", "salsa al rosmarino",
      "salsa alla menta", "salsa all'aglio", "salsa alla cipolla"
    ])
  ) {
    return "barattoli";
  }

  if (
    contiene([
      "detersivo", "candeggina", "ammorbidente",
      "sgrassatore", "lavatrice", "lavastoviglie",
      "spugna", "spugne", "scottex",
      "carta cucina", "sacchetti", "sacchi spazzatura",
      "guanti", "guanto", "panni", "panno",
      "pulizia", "casa", "bagno", "cucina", "stanza",
      "aspirapolvere", "scopa", "mocio", "secchio",
      "panno cattura polvere", "panno cattura peli",
      "panno cattura sporco", "panno cattura macchie",
      "panno cattura grasso", "panno cattura unto",
      "panno cattura acqua", "panno cattura liquidi",
      "panno cattura polvere e peli", "panno cattura sporco e macchie", 
      "panno cattura grasso e unto", "panno cattura acqua e liquidi", 
      "panno cattura polvere, peli, sporco, macchie, grasso, unto, acqua e liquidi"
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
      "salviette", "collutorio", "crema", "lozione", "profumo",
      "igiene personale", "cura del corpo", "cura dei capelli",
      "cura della pelle", "cura del viso", "cura delle mani", "cura dei piedi",
      "cura delle unghie", "cura dei denti", "cura della bocca", "cura degli occhi", 
      "cura delle labbra", "cura del naso", "cura delle orecchie", "cura dei capelli", 
      "cura del cuoio capelluto", "cura della barba", "cura dei baffi", "cura dei peli", 
      "cura dei peli del corpo", "cura dei peli del viso", "cura dei peli delle gambe", 
      "cura dei peli delle braccia", "cura dei peli del petto", "cura dei peli della schiena", 
      "cura dei peli dell'inguine", "cura dei peli delle ascelle"
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
      "spezie", "pepe", "curry", "paprika", "origano",
      "basilico", "rosmarino", "timo", "salvia",
      "aglio in polvere", "cipolla in polvere",
      "brodo", "dado", "salsa di soia", "salsa barbecue",
      "salsa piccante", "salsa di pomodoro", "salsa al curry", "salsa al pesto", "salsa al formaggio",
      "salsa al cioccolato", "salsa alla vaniglia", "salsa al caramello", "salsa al limone", "salsa all'arancia",
      "salsa al mango", "salsa al peperoncino", "salsa al basilico", "salsa al rosmarino", "salsa alla menta",
      "salsa all'aglio", "salsa alla cipolla"
    ])
  ) {
    return "Dispensa";
  }

  if (
    contiene([
      "computer", "laptop", "notebook", "tablet", 
      "smartphone", "telefono", "cuffie", "auricolari",
      "mouse", "tastiera", "monitor", "stampante",
      "router", "chiavetta", "hard disk", "ssd",
      "scheda video", "scheda madre", "processore",
      "ram", "alimentatore", "case", "ventola", "cavo", "caricabatterie", 
      "power bank", "usb", "hdmi", "ethernet", "wi-fi", "bluetooth", 
      "software", "app", "programma", "sistema operativo", "antivirus", "firewall", "cloud", "backup", "virtualizzazione",
      "informatica", "tecnologia", "elettronica", "digitale",
      "smartwatch", "orologio intelligente", "fotocamera", "macchina fotografica", 
      "videocamera", "drone", "stampante 3d", "realtà virtuale", "realtà aumentata",
      "robotica", "intelligenza artificiale", "automazione", "internet delle cose", "blockchain", "criptovaluta", "bitcoin", "ethereum", "nft",
      "programmazione", "coding", "sviluppo software", "web development", "app development", "game development",
      "html", "css", "javascript", "python", "java", "c++", "c#", "php", "ruby", "swift", "kotlin",
      "database", "sql", "nosql", "mongodb", "mysql", "postgresql",
      "server", "hosting", "cloud computing", "virtual machine",
      "cybersecurity"
    ])
  ) {
    return "Informatica e tecnologia";
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
        <AppUpdate />

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