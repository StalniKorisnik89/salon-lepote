# Salon Lepote - Web Sajt za Salon za Nokte

Moderan, responzivan web sajt za salon za nokte sa Google Calendar integracijom za online zakazivanje termina.

## 🌸 Funkcionalnosti

- **Početna strana** - Hero sekcija, opis salona, preview usluga
- **Usluge** - Detaljna lista svih usluga sa opisima
- **Galerija** - Elegantna galerija sa lightbox modalom
- **Zakazivanje termina** - Forma za rezervaciju sa Google Calendar integracijom
- **Kontakt** - Kontakt informacije i kontakt forma

## 🎨 Dizajn

- Moderan i elegantan dizajn sa ženstvenim estetikom
- Pastelne boje (nude, roze, krem, svetlo ljubičasta)
- Cvetni dekorativni elementi
- Smooth scroll animacije
- Suptilne hover animacije
- Potpuno responzivan za mobilne uređaje

## 🛠️ Tehnologije

- **HTML5** - Semantička struktura
- **CSS3** - Moderni stilovi sa CSS varijablama i animacijama
- **JavaScript (Vanilla)** - Interaktivnost bez framework-a
- **Google Calendar API** - Integracija za zakazivanje termina
- **Google Identity Services** - OAuth 2.0 autentifikacija

## 📁 Struktura Projekta

```
salon-lepote/
│
├── index.html          # Početna strana
├── usluge.html         # Strana sa uslugama
├── galerija.html       # Galerija radova
├── zakazivanje.html    # Forma za zakazivanje
├── kontakt.html        # Kontakt strana
│
├── css/
│   └── style.css       # Glavni CSS fajl
│
├── js/
│   ├── main.js         # Glavna JavaScript logika
│   ├── gallery.js      # Galerija i lightbox funkcionalnost
│   └── calendar.js     # Google Calendar integracija
│
├── config/
│   └── config.js       # Konfiguracija API ključeva
│
├── images/             # Slike (placeholder slike za galeriju)
│
└── README.md           # Dokumentacija
```

## 🚀 Kako Pokrenuti

1. **Klonirajte ili preuzmite projekat**

2. **Otvorte `config/config.js` i dodajte vaše Google API kredencijale** (vidi sekciju ispod)

3. **Otvorte `index.html` u web browseru** ili koristite lokalni server:
   ```bash
   # Koristeći Python
   python -m http.server 8000
   
   # Koristeći Node.js (http-server)
   npx http-server
   ```

4. **Pristupite sajtu na:** `http://localhost:8000`

## 📅 Google Calendar Integracija - Uputstvo

Za funkcionalnost zakazivanja termina, potrebno je podesiti Google Calendar API.

### Korak 1: Kreiranje Google Cloud Projekta

1. Idite na [Google Cloud Console](https://console.cloud.google.com/)
2. Kliknite na "New Project" ili izaberite postojeći projekat
3. Unesite ime projekta (npr. "Salon Lepote Calendar")
4. Kliknite "Create"

### Korak 2: Omogućavanje Google Calendar API

1. U Google Cloud Console, idite na **"APIs & Services" > "Library"**
2. Pretražite "Google Calendar API"
3. Kliknite na "Google Calendar API" i zatim kliknite **"Enable"**

### Korak 3: Kreiranje OAuth 2.0 Credentials

1. Idite na **"APIs & Services" > "Credentials"**
2. Kliknite **"Create Credentials"** > **"OAuth client ID"**
3. Ako se pojavi poruka, kliknite **"Configure Consent Screen"**:
   - Izaberite **"External"** (za test mode)
   - Popunite obavezna polja:
     - App name: Salon Lepote
     - User support email: vaš email
     - Developer contact information: vaš email
   - Kliknite "Save and Continue" za sledeće korake (opciono)
   - Na kraju kliknite "Back to Dashboard"

4. Sada kreirajte OAuth 2.0 Client ID:
   - Application type: **"Web application"**
   - Name: Salon Lepote Web Client
   - Authorized JavaScript origins:
     - Za lokalni razvoj: `http://localhost:8000`, `http://127.0.0.1:8000`
     - Za GitHub Pages: `https://yourusername.github.io`
   - Authorized redirect URIs: (ostavite prazno ili dodajte `http://localhost:8000`)

5. Kliknite **"Create"**
6. Kopirajte **Client ID** (ne Client Secret - ne treba nam)

### Korak 4: Kreiranje API Key

1. U **"Credentials"** sekciji, kliknite **"Create Credentials"** > **"API key"**
2. Kopirajte generisani **API Key**

### Korak 5: Konfiguracija config.js

Otvorite `config/config.js` i zamenite placeholder vrednosti:

```javascript
const CONFIG = {
    GOOGLE_CLIENT_ID: 'VAŠ_CLIENT_ID_OVDE',
    GOOGLE_API_KEY: 'VAŠ_API_KEY_OVDE',
    SCOPES: 'https://www.googleapis.com/auth/calendar',
    CALENDAR_ID: 'primary', // ili vaš calendar ID
    TIMEZONE: 'Europe/Belgrade'
};
```

### Korak 6: Testiranje

1. Otvorite `zakazivanje.html` u browseru
2. Prijavite se na Google Calendar kada se pojavi dugme
3. Popunite formu za zakazivanje
4. Termin će biti dodat u vaš Google Calendar

### ⚠️ Važne Napomene

- **Test Mode**: OAuth 2.0 aplikacija je u "Testing" modu, što znači da samo vaš Google nalog može da pristupa aplikaciji
- **Produkcija**: Za produkciju, potrebno je odobriti aplikaciju kroz Google OAuth Consent Screen
- **API Key Restriction**: Preporučeno je da ograničite API Key samo na Google Calendar API u Google Cloud Console
- **Client ID Restriction**: Možete ograničiti Client ID na određene domenine u Google Cloud Console

## 📱 GitHub Pages Deployment

Za hostovanje na GitHub Pages:

1. **Kreirajte GitHub repository**

2. **Dodajte sve fajlove i commit-ujte**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/salon-lepote.git
   git push -u origin main
   ```

3. **Uključite GitHub Pages**:
   - Idite na Settings > Pages
   - Izaberite source branch (main)
   - Izaberite folder (/root)
   - Kliknite Save

4. **Ažurirajte Google OAuth Credentials**:
   - U Google Cloud Console, dodajte `https://yourusername.github.io` u Authorized JavaScript origins

5. **Ažurirajte config.js** (opciono - možete koristiti environment variables ili drugi pristup za produkciju)

## 🔒 Bezbednost

- **API ključevi**: Za produkciju, razmotrite korišćenje environment variables ili backend servera
- **CORS**: Google Calendar API zahteva da domen bude dodat u Authorized JavaScript origins
- **OAuth Token**: Tokeni se čuvaju u browser storage - korisnik može da se odjavi kada želi

## 🎯 Funkcionalnosti Forme za Zakazivanje

- Validacija svih polja (ime, telefon, datum, vreme)
- Provera konflikata - sistem proverava da li već postoji termin u tom vremenskom periodu
- Automatsko kreiranje događaja u Google Calendar-u
- Događaj sadrži:
  - Naslov: "Termin – Ime Prezime"
  - Opis: Broj telefona, usluga, napomene
  - Datum i vreme iz forme
  - Vremenska zona: Europe/Belgrade

## 📝 Licenca

Ovaj projekat je kreiran za Salon Lepote. Slobodno koristite i modifikujte prema potrebama.

## 🤝 Podrška

Za pitanja ili probleme, kontaktirajte razvojni tim.

---

**Napomena**: Ovo je frontend-only aplikacija. Za produkciju sa većim brojem korisnika, razmotrite dodavanje backend servera za bolju bezbednost i upravljanje API ključevima.
