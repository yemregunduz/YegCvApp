# Terminal CV - Yunus Emre Gunduz

Klasik CV'lerden sıkıldım. Bunun yerine hobi olarak **terminal arayuzu** uzerinden kesfedilebilen, interaktif bir CV uygulaması gelistirdim. Gercek bir terminal deneyimi sunan bu uygulama, komut satirindan CV bilgilerine ulasmayi saglıyor.

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
- **Popup Modaller** — `show skills`, `show experience`, `show education`, `show certificates`, `show references` ile detayli bilgileri modal pencerede incele
- **Sertifikalar** — Alinan sertifikalari, kurumu ve egitmeni gorsel kartlarla goruntule
- **Referanslar** — Referans yorumlarini alinti karti tasarimiyla incele
- **Tema Destegi** — `theme toggle` ile acik/koyu tema arasinda gecis yap, tercih localStorage'da saklanir
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
| `show certificates` | Sertifikalari popup'ta goster |
| `show references` | Referanslari popup'ta goster |
| `show cv` | CV'yi yeni sekmede goruntuyle |
| `download cv` | CV'yi PDF olarak indir |
| `open linkedin` | LinkedIn profilini ac |
| `open github` | GitHub profilini ac |
| `copy email` | E-posta adresini panoya kopyala |
| `copy phone` | Telefon numarasini panoya kopyala |
| `theme toggle` | Acik/koyu tema gecisi |
| `theme light` | Acik temaya gec |
| `theme dark` | Koyu temaya gec |
| `clear` | Terminali temizle |
| `help` | Tum komutlari listele |

## Teknolojiler

- **React 19** — UI framework
- **Styled Components** — CSS-in-JS, tema destegi
- **Vite** — Build tool, `@` path alias
- **React Icons** — Ikon kutuphanesi
- **Lucide React** — Ikon kutuphanesi
- **Prettier** — Kod formatlama

## Proje Yapisi

```
src/
├── components/
│   ├── Navbar/
│   │   ├── index.jsx              # Ust navigasyon + tema toggle
│   │   └── styles.js
│   ├── Terminal/
│   │   ├── index.jsx              # Ana terminal bileseni
│   │   ├── PingOutput.jsx         # Ping komutu ciktisi
│   │   └── styles.js
│   ├── Modal/
│   │   ├── index.jsx              # Yeniden kullanilabilir modal
│   │   └── styles.js
│   ├── Footer/
│   │   ├── index.jsx              # Alt bilgi
│   │   └── styles.js
│   └── contents/
│       ├── index.js               # Barrel export
│       ├── SkillsContent/         # Yetenekler iceriği
│       ├── ExperienceContent/     # Is deneyimi iceriği
│       ├── EducationContent/      # Egitim iceriği
│       ├── SummaryContent/        # Ozet iceriği
│       ├── CertificatesContent/   # Sertifikalar iceriği
│       └── ReferencesContent/     # Referanslar iceriği
├── hooks/
│   ├── useCommands.js             # Komut işleme mantığı
│   ├── useTheme.js                # Tema context + provider
│   └── useTypingEffect.js         # Terminal yazma animasyonu
├── data/
│   ├── cv.json                    # Tum CV verileri (merkezi veri kaynagi)
│   └── icons.jsx                  # Icon mapping
├── styles/
│   ├── theme.js                   # Tema tanımları (Açık / Koyu)
│   └── GlobalStyles.js            # Global CSS
├── App.jsx                        # Ana uygulama (ThemeProvider + layout)
└── main.jsx                       # Uygulama giriş noktası
```

## Kurulum

```bash
# Repoyu klonla
git clone https://github.com/yemregunduz/YegCvApp.git
cd YegCvApp

# Bagimliliklari yukle
npm install

# Gelistirme sunucusu
npm run dev

# Production build
npm run build

# Kod formatlama
npm run format
```

## Ozellestirme

Tum CV verileri `src/data/cv.json` dosyasında merkezi olarak tutulur. Kendi bilgilerinizi eklemek icin bu dosyayı düzenleyin:

- **personal** — Kişisel bilgiler, iletişim, sosyal medya
- **stacks** — Teknoloji stackleri ve yeterlilik seviyeleri
- **experiences** — İş deneyimleri
- **education** — Eğitim geçmişi
- **certificates** — Sertifikalar, kurum ve eğitmen bilgisi
- **references** — Referanslar
- **terminal** — Karşılama mesajı ve komut tanımları

Tema tercihi tarayıcıda `localStorage` üzerinden saklanir. Ilk ziyarette karanlık tema kullanilir.

---

<p align="center">
  <sub>Yunus Emre Gündüz tarafindan gelistirilmistir.</sub>
</p>
