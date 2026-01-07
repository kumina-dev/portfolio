export const defaultLanguage = "en" as const;

export const content = {
  en: {
    meta: {
      title: "Kumina | Portfolio",
    },
    nav: {
      about: "About",
      projects: "Projects",
      experience: "Experience",
      notes: "Notes",
      contact: "Contact",
    },
    hero: {
      label: "Ville",
      name: "Kumina",
      headline: "Software developer focused on consumer-friendly, privacy-first products.",
      location: "Based in Tampere, Finland",
      status: "Beginner → Intermediate (3+ years of learning by building)",
    },
    about: {
      label: "About",
      title: "Building clear, secure experiences for everyday users.",
      body:
        "I enjoy creating consumer software with a strong focus on privacy and usability. I care about clean interfaces, performance, and thoughtful details that help people feel confident using the product.",
    },
    projects: {
      label: "Projects",
      title: "Selected work",
      modalLabel: "Project details",
      openButton: "View details",
      closeButton: "Close",
      overviewLabel: "Project overview",
      highlightsLabel: "Highlights",
      techLabel: "Tech stack",
      items: [
        {
          id: "welding",
          title: "Welding Appointment System",
          summary:
            "Built a scheduling tool for welding students to reserve cubicles, pick dates, and manage workshop flow.",
          tech: "React, TypeScript, Node.js, PostgreSQL",
          screenshotLabel: "Welding Appointment System screenshot placeholder",
          highlights: [
            "Students pick a cubicle, date, and time in a single flow.",
            "Reduced double-booking with clear availability rules.",
            "Simple admin view for supervisors to monitor capacity.",
          ],
        },
        {
          id: "portfolio",
          title: "Personal Portfolio",
          summary:
            "A modern, cyberpunk-inspired portfolio designed to present my work and make contacting me easy.",
          tech: "Astro, JavaScript, CSS",
          screenshotLabel: "Personal Portfolio screenshot placeholder",
          highlights: [
            "Minimal layout with strong typography for fast scanning.",
            "Projects open in a modal for focused reading.",
            "Bilingual content to connect with local and international audiences.",
          ],
        },
      ],
    },
    experience: {
      label: "Experience",
      title: "Learning by doing across tech and service roles",
      items: [
        {
          title: "Software Development · Self-directed",
          period: "2021 — Present · 3+ years of building and learning",
          details: [
            "Created personal projects to grow frontend and backend skills.",
            "Collaborated with peers on small builds and troubleshooting.",
          ],
        },
        {
          title: "Customer Service",
          period: "Experience supporting customers in fast-paced environments",
          details: [
            "Resolved requests clearly and respectfully.",
            "Stayed calm and organized during busy shifts.",
          ],
        },
        {
          title: "Retail / Stores",
          period: "Sales, merchandising, and daily operations",
          details: [
            "Helped customers find the right products quickly.",
            "Kept stock organized and the store running smoothly.",
          ],
        },
      ],
    },
    notes: {
      label: "Notes",
      title: "Short updates",
      items: [
        {
          title: "2024-08 — Welding scheduler",
          body: "Built a booking flow for welding students with clear time slots.",
        },
        {
          title: "2024-06 — Privacy research",
          body: "Reviewed consumer security patterns and data minimization ideas.",
        },
        {
          title: "2024-04 — UI experiments",
          body: "Tested new layouts for fast-scanning portfolios.",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Let’s build something together",
      body:
        "If you have a project in mind or want to collaborate, feel free to reach out.",
      cta: "Let’s build something — email me.",
      email: "hello@kumina.dev",
      socialLabel: "Social links",
    },
    languageSwitcher: {
      label: "Language",
      english: "EN",
      finnish: "FI",
    },
  },
  fi: {
    meta: {
      title: "Kumina | Portfolio",
    },
    nav: {
      about: "Tietoja",
      projects: "Projektit",
      experience: "Kokemus",
      notes: "Muistiinpanot",
      contact: "Yhteys",
    },
    hero: {
      label: "Ville",
      name: "Kumina",
      headline:
        "Ohjelmistokehittäjä, joka keskittyy kuluttajaystävällisiin ja tietoturvallisiin tuotteisiin.",
      location: "Tampere, Suomi",
      status: "Aloittelija → Keskitaso (3+ vuotta oppimista tekemällä)",
    },
    about: {
      label: "Tietoja",
      title: "Rakennan selkeitä ja turvallisia kokemuksia arjen käyttäjille.",
      body:
        "Pidän kuluttajasovellusten rakentamisesta, joissa yksityisyys ja käytettävyys ovat etusijalla. Arvostan siistejä käyttöliittymiä, suorituskykyä ja pieniä yksityiskohtia, jotka lisäävät luottamusta.",
    },
    projects: {
      label: "Projektit",
      title: "Valikoidut työt",
      modalLabel: "Projektin tiedot",
      openButton: "Näytä tiedot",
      closeButton: "Sulje",
      overviewLabel: "Projektin yhteenveto",
      highlightsLabel: "Kohokohdat",
      techLabel: "Teknologiat",
      items: [
        {
          id: "welding",
          title: "Hitsausajanvarausjärjestelmä",
          summary:
            "Rakensin ajanvarausjärjestelmän hitsausopiskelijoille: koppi, päivä ja aika yhdessä näkymässä.",
          tech: "React, TypeScript, Node.js, PostgreSQL",
          screenshotLabel: "Hitsausajanvarausjärjestelmän kuvapaikka",
          highlights: [
            "Opiskelija valitsee kopin, päivän ja ajan yhdellä kertaa.",
            "Tuplavaraukset vähenevät selkeillä saatavuussäännöillä.",
            "Yksinkertainen ylläpitonäkymä kapasiteetin seurantaan.",
          ],
        },
        {
          id: "portfolio",
          title: "Henkilökohtainen portfolio",
          summary:
            "Moderni, cyberpunk-henkinen portfolio, joka esittelee työni ja tekee yhteydenotosta helppoa.",
          tech: "Astro, JavaScript, CSS",
          screenshotLabel: "Portfolio-sivun kuvapaikka",
          highlights: [
            "Minimaalinen asettelu ja selkeä typografia.",
            "Projektit avautuvat modaalissa keskittynyttä lukemista varten.",
            "Kaksikielinen sisältö paikalliselle ja kansainväliselle yleisölle.",
          ],
        },
      ],
    },
    experience: {
      label: "Kokemus",
      title: "Oppimista tekemällä sekä tekniikassa että palvelutyössä",
      items: [
        {
          title: "Ohjelmistokehitys · Omatoiminen",
          period: "2021 — Nykyhetki · 3+ vuotta rakentamista ja oppimista",
          details: [
            "Rakensin omia projekteja frontend- ja backend-osaamisen kehittämiseen.",
            "Tein yhteistyötä kavereiden kanssa pienissä buildauksissa ja ongelmanratkaisussa.",
          ],
        },
        {
          title: "Asiakaspalvelu",
          period: "Kokemusta asiakastyöstä nopeissa ympäristöissä",
          details: [
            "Ratkaisin asiakastarpeet selkeästi ja ystävällisesti.",
            "Pysyin rauhallisena ja järjestelmällisenä ruuhkissa.",
          ],
        },
        {
          title: "Myymälä / Kauppa",
          period: "Myynti, esillepano ja päivittäiset tehtävät",
          details: [
            "Autoin asiakkaita löytämään oikeat tuotteet nopeasti.",
            "Pidin varaston järjestyksessä ja arjen sujuvana.",
          ],
        },
      ],
    },
    notes: {
      label: "Muistiinpanot",
      title: "Lyhyet päivitykset",
      items: [
        {
          title: "2024-08 — Hitsausvaraukset",
          body: "Tein varaustyökalun hitsausopiskelijoille selkeillä ajoilla.",
        },
        {
          title: "2024-06 — Yksityisyystutkimus",
          body: "Kävin läpi kuluttajan tietoturvakäytäntöjä ja datan minimointia.",
        },
        {
          title: "2024-04 — UI-kokeilut",
          body: "Testasin uusia asetteluita portfolioiden nopeaan hahmottamiseen.",
        },
      ],
    },
    contact: {
      label: "Yhteys",
      title: "Rakennetaan jotain yhdessä",
      body:
        "Jos sinulla on projekti mielessä tai haluat tehdä yhteistyötä, ota yhteyttä.",
      cta: "Rakennetaan jotain — lähetä sähköposti.",
      email: "hello@kumina.dev",
      socialLabel: "Sosiaalilinkit",
    },
    languageSwitcher: {
      label: "Kieli",
      english: "EN",
      finnish: "FI",
    },
  },
} as const;
