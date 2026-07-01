# Valore Immobiliare — Landing Page

Landing page statica (HTML/CSS/JS, nessuna dipendenza da build) per la lead generation di **Valore Immobiliare**, agenzia immobiliare a Milano e provincia. L'obiettivo è generare contatti di proprietari interessati a vendere il proprio immobile, tramite una valutazione gratuita e senza impegno.

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
- **PAS** nella sezione "Perché noi": Problema (rischi di vendere male), Amplificazione (costo di aspettare/sbagliare prezzo), Soluzione (metodo Valore Immobiliare).
- **FAB** (Feature–Advantage–Benefit) nelle 4 card USP: ogni card espone la caratteristica, il vantaggio pratico e il beneficio finale per il proprietario.
- Prova sociale: recensioni verosimili, statistiche, FAQ per gestire le obiezioni più comuni.

## Prima di pubblicare: cosa personalizzare

1. **Dati reali dell'agenzia**: telefono, email, indirizzo, P.IVA, link social e numero WhatsApp sono segnaposto — cercare `0200000` e `valoreimmobiliare-milano.it` in `index.html`, `privacy.html`, `robots.txt`, `sitemap.xml`, `llms.txt` e sostituirli.
2. **Dominio**: aggiornare `og:url`, `canonical`, il file `sitemap.xml` e `robots.txt` con il dominio reale una volta registrato.
3. **Recensioni**: quelle presenti sono **testimonianze di esempio**, scritte per rappresentare le USP dell'agenzia (valorizzazione, database acquirenti, velocità, assistenza completa). Sostituirle con recensioni reali (es. estratte da Google Business Profile) prima del lancio, e valutare se aggiungere in quel momento anche i relativi badge/link a Google.
4. **Privacy Policy**: il testo in `privacy.html` è un modello generico — farlo revisionare da un consulente privacy/legale con i dati reali del titolare del trattamento e degli strumenti di tracciamento effettivamente installati (GA4, Meta Pixel, Google Ads, ecc.).

## Collegare il form a un servizio reale (obbligatorio per ricevere i contatti)

La pagina è statica: i due form (`#form-valutazione` nella hero e `#form-valutazione-2` nella CTA finale) al momento simulano l'invio via JavaScript (`js/script.js`) mostrando un messaggio di conferma, ma **non inviano ancora nulla a nessun sistema**. Per ricevere davvero le richieste, scegliere una delle opzioni seguenti:

- **Formspree** (consigliato, gratuito per bassi volumi): creare un account su formspree.io, ottenere l'endpoint e impostare `action="https://formspree.io/f/xxxxxxx"` e `method="POST"` su entrambi i tag `<form>` in `index.html`.
- **Netlify Forms**: se si effettua il deploy su Netlify, aggiungere l'attributo `data-netlify="true"` ai tag `<form>` (richiede un campo hidden `form-name`).
- **CRM/gestionale immobiliare**: molti gestionali (es. Immotop, Indomio Pro, getrix) offrono webhook/API per form esterni.

Una volta collegato un endpoint reale, opzionalmente rimuovere/adattare la logica di "successo simulato" in `js/script.js` così che il messaggio venga mostrato solo dopo una risposta positiva del server (fetch + `.then`).

## SEO e GEO (ottimizzazione per motori di ricerca e per l'AI)

- Meta title/description, Open Graph e Twitter Card già impostati.
- Dati strutturati **JSON-LD**: `RealEstateAgent`/`LocalBusiness` (NAP, area servita, orari) e `FAQPage`. Volutamente **non** è stato inserito un markup `AggregateRating`/`Review`, perché le recensioni in pagina sono di esempio: aggiungere lo schema recensioni solo quando saranno sostituite con recensioni reali e verificabili (per rispettare le linee guida sui dati strutturati di Google).
- `robots.txt` e `sitemap.xml` pronti, da aggiornare col dominio definitivo.
- `llms.txt`: file secondo la convenzione emergente per aiutare i motori di risposta AI (ChatGPT, Perplexity, Google AI Overviews) a descrivere correttamente l'attività — utile ai fini GEO (Generative Engine Optimization).
- Contenuti in FAQ scritti come risposte dirette e autonome, per aumentare la probabilità di essere citati/estratti dai motori di risposta AI oltre che nei rich results di Google.

## Pubblicazione su GitHub Pages

1. Creare un repository su GitHub (es. `valore-immobiliare-landing`) e caricare tutti i file di questa cartella nella root del repository.
2. Su GitHub: **Settings → Pages → Source**, selezionare il branch `main` e la cartella `/ (root)`.
3. Dopo qualche minuto la pagina sarà online su `https://<utente>.github.io/<repo>/` (oppure sul dominio personalizzato configurato in **Settings → Pages → Custom domain**).
4. Se si usa un dominio personalizzato, aggiornare gli URL assoluti (canonical, Open Graph, sitemap, robots) con il dominio definitivo.

## Sviluppo/anteprima locale

Nessuna build richiesta: basta aprire `index.html` in un browser, oppure avviare un server statico, ad esempio:

```bash
python -m http.server 8000
```

e visitare `http://localhost:8000`.
