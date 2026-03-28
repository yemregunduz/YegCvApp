# Terminal CV - Yunus Emre Gunduz

Klasik cvlerden sıkıldım. Bunun yerine hobi olarak **terminal arayuzu** uzerinden kesifedilebilen, interaktif bir CV uygulamasi geliştirdim.


## Onizlenim

```
~/yunusemre $ ping yunusemre

── PERSONAL ──
  name       : Yunus Emre Gunduz
  role       : Senior Full Stack Developer
  location   : Sakarya, Turkiye
  email      : yegunduz@outlook.com
  ...

── SKILLS ──
  backend    : C#, .NET Core, Entity Framework ...  [████████████ 95%]
  frontend   : Angular, React, TypeScript ...        [████████████ 95%]
  database   : MsSQL, PostgreSQL, MongoDB ...        [██████████░░ 85%]

── EXPERIENCE ──
  05.2023 → DEVAM EDIYOR
  Senior Full Stack Developer @ Mikrogrup
  ...

── EDUCATION ──
  Matematik Muhendisliği — Yildiz Teknik Universitesi (2018 - 2025)
```

## Ozellikler

- **Terminal Arayuzu** — Gercek bir terminal gibi komut yazarak CV'yi kesfet
- **Ping Komutu** — `ping yunusemre` ile tum CV bilgilerini tek seferde gor
- **Popup** — `show skills`, `show experience`, `show education` ile detayli bilgileri modal pencerede incele
- **Hizli Erisim** — `open linkedin`, `open github` ile profillere yonlendir
- **Panoya Kopyala** — `copy email`, `copy phone` ile iletisim bilgilerini kopyala
- **CV Indirme** — `download cv` ile PDF olarak indir, `show cv` ile goruntuyle
- **Oneri Chipleri** — Komutlari yazmak yerine tek tikla calistir
- **Tamamen Responsive** — Mobil ve masaustu uyumlu

## Komutlar

| Komut | Aciklama |
|-------|----------|
| `ping yunusemre` | Tum CV bilgilerini terminalde goster |
| `show skills` | Yetenekleri popup'ta goster |
| `show experience` | Is deneyimlerini popup'ta goster |
| `show education` | Egitim bilgilerini popup'ta goster |
| `show summary` | Ozet bilgilerini popup'ta goster |
| `show cv` | CV'yi yeni sekmede goruntuyle |
| `download cv` | CV'yi PDF olarak indir |
| `open linkedin` | LinkedIn profilini ac |
| `open github` | GitHub profilini ac |
| `copy email` | E-posta adresini panoya kopyala |
| `copy phone` | Telefon numarasini panoya kopyala |
| `clear` | Terminali temizle |
| `help` | Tum komutlari listele |

## Teknolojiler

- **React 19** — UI framework
- **Styled Components** — CSS-in-JS, tema destegi
- **Vite** — Build tool
- **React Icons** — Ikon kutuphanesi
- **Lucide React** — Ikon kutuphanesi

## Proje Yapisi

```
src/
├── components/
│   ├── Terminal.jsx            # Ana terminal bileseni (komut isleme, render)
│   ├── Navbar.jsx              # Ust navigasyon
│   ├── Footer.jsx              # Alt bilgi
│   └── popups/
│       ├── SkillsPopup.jsx     # Yetenekler popup icerigi
│       ├── ExperiencePopup.jsx # Is deneyimi popup icerigi
│       ├── EducationPopup.jsx  # Egitim popup icerigi
│       └── SummaryPopup.jsx    # Ozet popup icerigi
├── data/
│   ├── cv.json                 # Tum CV verileri (merkezi veri kaynagi)
│   └── icons.jsx               # Ikon mapping
├── styles/
│   ├── theme.js                # Tema renkleri, fontlar
│   ├── GlobalStyles.js         # Global CSS
├── App.jsx                     # Ana uygulama (Navbar + Terminal + Footer)
└── main.jsx                    # Uygulama giris noktasi
```

## Kurulum

```bash
# Repoyu klonla
git clone https://github.com/yemregunduz/YegCvApp.git
cd YegCvApp

# Bagimliliklar
npm install

# Gelistirme sunucusu
npm run dev

# Production build
npm run build
```

## Ozellestirme

Tum CV verileri `src/data/cv.json` dosyasinda merkezi olarak tutulur. Kendi bilgilerinizi eklemek icin bu dosyayi duzenleyin:

- **personal** — Kisisel bilgiler, iletisim, sosyal medya
- **stacks** — Teknoloji yiginlari ve yeterlilik seviyeleri
- **experiences** — Is deneyimleri
- **education** — Egitim gecmisi
- **terminal** — Karsilama mesaji ve komut tanimlari

## Lisans

MIT

---

<p align="center">
  <sub>Yunus Emre Gunduz tarafindan gelistirilmistir.</sub>
</p>
