# Salon Lepote - Web Sajt za Salon za Nokte

Moderan, responzivan web sajt za salon za nokte sa Google Calendar Appointment Schedule integracijom za online zakazivanje termina.

## 🌸 Funkcionalnosti

- **Početna strana** - Hero sekcija, opis salona, preview usluga
- **Usluge** - Detaljna lista svih usluga sa opisima
- **Galerija** - Elegantna galerija sa lightbox modalom
- **Zakazivanje termina** - Link ka Google Calendar Appointment Schedule za jednostavno zakazivanje
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
- **Google Calendar Appointment Schedules** - Integracija za zakazivanje termina

## 📁 Struktura Projekta

```
salon-lepote/
│
├── index.html          # Početna strana
├── usluge.html         # Strana sa uslugama
├── galerija.html       # Galerija radova
├── zakazivanje.html    # Link ka Google Calendar Appointment Schedule
├── kontakt.html        # Kontakt strana
│
├── css/
│   └── style.css       # Glavni CSS fajl
│
├── js/
│   ├── main.js         # Glavna JavaScript logika
│   └── gallery.js      # Galerija i lightbox funkcionalnost
│
├── images/             # Slike (placeholder slike za galeriju)
│
└── README.md           # Dokumentacija
```

## 🚀 Kako Pokrenuti

1. **Klonirajte ili preuzmite projekat**

2. **Otvorte `index.html` u web browseru** ili koristite lokalni server:
   ```bash
   # Koristeći Python
   python -m http.server 8000
   
   # Koristeći Node.js (http-server)
   npx http-server
   ```

3. **Pristupite sajtu na:** `http://localhost:8000`

## 📅 Google Calendar Appointment Schedule Setup

Za funkcionalnost zakazivanja termina, potrebno je da kreirate Google Calendar Appointment Schedule:

### Korak 1: Kreiranje Appointment Schedule-a

1. Idite na [Google Calendar](https://calendar.google.com/)
2. Kliknite na "Create" > "Appointment schedule"
3. Podesite:
   - Naziv schedule-a (npr. "Salon Lepote - Zakazivanje")
   - Opis usluge
   - Dostupne termine (radno vreme)
   - Trajanje termina (npr. 60 minuta za manikir)
   - Buffer vreme između termina

4. Kliknite "Save" i kopirajte link ka schedule-u

### Korak 2: Dodavanje Linka u Sajt

1. Otvorite `zakazivanje.html`
2. Pronađite link sa placeholder vrednošću:
   ```html
   <a href="https://calendar.google.com/calendar/appointments/schedules/XXXXXXXX" ...>
   ```
3. Zamenite `XXXXXXXX` sa stvarnim ID-jem vašeg Appointment Schedule-a

### Primer Linka

Link će izgledati otprilike ovako:
```
https://calendar.google.com/calendar/appointments/schedules/AcZhssWt3k...
```

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

4. **Sajt će biti dostupan na:** `https://yourusername.github.io/salon-lepote/`

## 🎯 Funkcionalnosti Zakazivanja

- **Jednostavno zakazivanje** - Korisnici klikom na dugme otvaraju Google Calendar Appointment Schedule
- **Pregled dostupnih termina** - Real-time prikaz dostupnih termina
- **Automatska potvrda** - Google Calendar automatski šalje potvrdu rezervacije
- **Bez potrebe za prijavom** - Korisnici se ne moraju prijavljivati na sajt

## 📝 Licenca

Ovaj projekat je kreiran za Salon Lepote. Slobodno koristite i modifikujte prema potrebama.

## 🤝 Podrška

Za pitanja ili probleme, kontaktirajte razvojni tim.

---

**Napomena**: Ovaj sajt koristi statičke fajlove i Google Calendar Appointment Schedules za zakazivanje. Nije potreban backend server ili API ključevi - sve funkcioniše putem jednostavnog linka ka Google Calendar-u.