# Quotazione Casa Immobiliare — Landing Page

Landing page statica (HTML/CSS/JS, nessuna dipendenza da build) per la lead generation di **Quotazione Casa Immobiliare**, agenzia immobiliare a Milano e provincia. L'obiettivo è generare contatti di proprietari interessati a vendere il proprio immobile, tramite una valutazione gratuita e senza impegno.

## Struttura del progetto

```
index.html        pagina principale (hero, USP, come funziona, recensioni, FAQ, CTA finale)
privacy.html       informativa privacy/cookie (placeholder, da far validare da un legale)
css/style.css       design system (colori coerenti col logo: blu navy + oro)
js/script.js        menu mobile, accordion FAQ, gestione invio form, evento GA4 "generate_lead"
images/              logo ottimizzato in varie dimensioni + favicon
robots.txt, sitemap.xml, llms.txt   SEO tecnico e ottimizzazione per motori di risposta AI (GEO)
```

## Framework di copywriting utilizzati

- **AIDA** nella hero: attenzione (eyebrow + headline), interesse (sottotitolo su valutazione gratuita + database acquirenti), desiderio (USP/FAB), azione (CTA "Richiedi la valutazione gratuita").
- **PAS** nella sezione "Perché noi": Problema (rischi di vendere male), Amplificazione (costo di aspettare/sbagliare prezzo), Soluzione (metodo Quotazione Casa Immobiliare).
- **FAB** (Feature–Advantage–Benefit) nelle 4 card USP: ogni card espone la caratteristica, il vantaggio pratico e il beneficio finale per il proprietario.
- Prova sociale: recensioni verosimili, statistiche, FAQ per gestire le obiezioni più comuni.

## Stato attuale (già fatto)

- **Dominio**: `www.quotazionecasaimmobiliare.it`, registrato, DNS configurato, HTTPS attivo e forzato. Usato in modo coerente in `CNAME`, canonical, Open Graph, dati strutturati, `sitemap.xml`, `robots.txt`, `llms.txt`/`llms-full.txt`.
- **Contatti reali**: telefono/WhatsApp `393 540 1286`, email `info@quotazionecasaimmobiliare.it`. Nessun link social (l'agenzia non ne ha).
- **Privacy/Cookie Policy**: generate e ospitate su Iubenda (Privacy Policy ID `57178582`), linkate da footer, form e da `privacy.html`.

## Prima di pubblicare ufficialmente: cosa resta da personalizzare

1. **Indirizzo e P.IVA**: ancora segnaposto (`Corso Buenos Aires, 1, 20124 Milano` / `P.IVA 00000000000`) in `index.html` (JSON-LD e footer) e `privacy.html`. Cercare questi valori e sostituirli con i dati reali dell'agenzia.
2. **Recensioni**: quelle presenti sono **testimonianze di esempio**, scritte per rappresentare le USP dell'agenzia (valorizzazione, database acquirenti, velocità, assistenza completa). Sostituirle con recensioni reali (es. estratte da Google Business Profile) prima del lancio, e valutare se aggiungere in quel momento anche i relativi badge/link a Google.
3. **Nuovi strumenti di tracciamento**: se in futuro si aggiungono Meta Pixel, Google Ads, ecc., vanno dichiarati anche nella configurazione Iubenda, non solo nel codice.

## Form collegati a Formspree

I due form (`#form-valutazione` nella hero e `#form-valutazione-2` nella CTA finale) sono collegati a Formspree (`action="https://formspree.io/f/mdarwzka"`). L'invio avviene via `fetch` in `js/script.js`: il messaggio "Richiesta ricevuta!" compare solo dopo una risposta positiva del server; in caso di errore di rete viene mostrato un messaggio con link diretto a WhatsApp come fallback.

Entrambi i form puntano allo stesso endpoint Formspree; un campo hidden `provenienza` (`Form hero` / `Form CTA finale`) permette di distinguere da quale sezione arriva ogni richiesta. È presente anche un campo honeypot (`_gotcha`) per il filtro anti-spam automatico di Formspree.

**Per cambiare endpoint** (es. se si passa a un altro account Formspree, a Netlify Forms o a un CRM immobiliare): aggiornare l'attributo `action` su entrambi i tag `<form>` in `index.html`.

- **Netlify Forms** (alternativa, solo se si ospita su Netlify): rimuovere `action`/`method` puntati a Formspree e aggiungere l'attributo `data-netlify="true"` ai tag `<form>` (richiede un campo hidden `form-name`); il codice JS in `js/script.js` funziona comunque perché usa `fetch` generico sull'`action` del form.
- **CRM/gestionale immobiliare**: molti gestionali (es. Immotop, Indomio Pro, getrix) offrono webhook/API per form esterni: basta puntare `action` al loro endpoint, verificando il formato dati richiesto.

Ricorda di confermare l'indirizzo email della dashboard Formspree al primo invio di test, altrimenti le richieste non vengono recapitate.

## SEO e GEO (ottimizzazione per motori di ricerca e per l'AI)

- Meta title/description, Open Graph e Twitter Card già impostati.
- Dati strutturati **JSON-LD**: `RealEstateAgent`/`LocalBusiness` (NAP, area servita, orari) e `FAQPage`. Volutamente **non** è stato inserito un markup `AggregateRating`/`Review`, perché le recensioni in pagina sono di esempio: aggiungere lo schema recensioni solo quando saranno sostituite con recensioni reali e verificabili (per rispettare le linee guida sui dati strutturati di Google).
- `robots.txt` e `sitemap.xml` pronti, da aggiornare col dominio definitivo.
- `llms.txt` + `llms-full.txt`: convenzione emergente per aiutare i motori di risposta AI (ChatGPT, Perplexity, Google AI Overviews) a descrivere correttamente l'attività — utile ai fini GEO (Generative Engine Optimization). `llms.txt` è l'indice sintetico con i link, `llms-full.txt` contiene il testo integrale della pagina pronto da leggere senza dover interpretare HTML/CSS.
- Contenuti in FAQ scritti come risposte dirette e autonome, per aumentare la probabilità di essere citati/estratti dai motori di risposta AI oltre che nei rich results di Google.

## Pubblicazione su GitHub Pages

1. Creare un repository su GitHub (es. `quotazione-casa-immobiliare-landing`) e caricare tutti i file di questa cartella nella root del repository.
2. Su GitHub: **Settings → Pages → Source**, selezionare il branch `main` e la cartella `/ (root)`.
3. Dopo qualche minuto la pagina sarà online su `https://<utente>.github.io/<repo>/` (oppure sul dominio personalizzato configurato in **Settings → Pages → Custom domain**).
4. Se si usa un dominio personalizzato, aggiornare gli URL assoluti (canonical, Open Graph, sitemap, robots) con il dominio definitivo.

## Sviluppo/anteprima locale

Nessuna build richiesta: basta aprire `index.html` in un browser, oppure avviare un server statico, ad esempio:

```bash
python -m http.server 8000
```

e visitare `http://localhost:8000`.
