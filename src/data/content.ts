export const defaultLanguage = "en" as const;

export const content = {
  en: {
    meta: {
      title: "Kumina | Security Portfolio",
    },
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      notes: "Notes",
      contact: "Contact",
    },
    hero: {
      label: "Security-Focused Web Designer & Developer",
      name: "Hi, I’m Kumina.",
      headline:
        "I build secure, modern, and responsive web experiences with a focus on privacy and user protection.",
      location: "Based in Tampere, Finland",
      status: "Available for freelance, remote, and collaborative projects.",
      ctaPrimary: "View my work",
      ctaSecondary: "Contact me",
      headshotAlt: "Portrait of Kumina",
    },
    about: {
      label: "About",
      title: "Designing confident, privacy-first experiences.",
      body:
        "I focus on shipping digital products that feel safe, fast, and trustworthy. My process blends security best practices with modern UI engineering so people can use the product without second-guessing it.",
      cards: [
        {
          title: "Security-minded UX",
          body: "From threat modeling to privacy-first patterns, I design interfaces that reinforce trust.",
        },
        {
          title: "Frontend craftsmanship",
          body: "I build responsive, accessible interfaces with crisp interactions and strong performance.",
        },
        {
          title: "Product-ready delivery",
          body: "Clear documentation, pragmatic architecture, and a smooth handoff for teams.",
        },
      ],
    },
    skills: {
      label: "Skills",
      title: "What I bring to the table",
      items: [
        {
          name: "HTML & CSS",
          level: "92%",
        },
        {
          name: "JavaScript / TypeScript",
          level: "88%",
        },
        {
          name: "React & Astro",
          level: "84%",
        },
        {
          name: "Web Security",
          level: "90%",
        },
      ],
    },
    projects: {
      label: "Projects",
      title: "Selected cyber-ready work",
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
            "Built a scheduling tool for welding students to reserve cubicles, pick dates, and keep the workshop flow secure.",
          tech: "React, TypeScript, Node.js, PostgreSQL",
          screenshotLabel: "Welding Appointment System screenshot placeholder",
          highlights: [
            "Students pick a cubicle, date, and time in a single flow.",
            "Reduced double-booking with clear availability rules.",
            "Admin visibility with role-aware views and activity logging.",
          ],
        },
        {
          id: "portfolio",
          title: "Personal Portfolio",
          summary:
            "A neon-lit portfolio inspired by sci-fi interfaces, designed to surface projects quickly.",
          tech: "Astro, JavaScript, CSS",
          screenshotLabel: "Personal Portfolio screenshot placeholder",
          highlights: [
            "Layered glass panels with subtle neon glow.",
            "Quick-scan sections with clear hierarchy.",
            "Bilingual content to reach local and international audiences.",
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
      title: "Short updates from the lab",
      items: [
        {
          title: "2024-08 — Scheduling security",
          body: "Hardened booking logic to prevent collisions and enforce availability rules.",
        },
        {
          title: "2024-06 — Privacy research",
          body: "Reviewed privacy-first flows and data minimization patterns.",
        },
        {
          title: "2024-04 — UI experiments",
          body: "Tested neon-inspired layouts for fast-scanning portfolios.",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Let’s work together",
      body:
        "Have a project in mind? Let’s build a secure, user-friendly digital experience together.",
      cta: "Hire me",
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
      title: "Kumina | Security Portfolio",
    },
    nav: {
      about: "Tietoja",
      skills: "Taidot",
      projects: "Projektit",
      experience: "Kokemus",
      notes: "Muistiinpanot",
      contact: "Yhteys",
    },
    hero: {
      label: "Tietoturvaan keskittynyt web-suunnittelija ja kehittäjä",
      name: "Hei, olen Kumina.",
      headline:
        "Rakennan moderneja, responsiivisia ja tietoturvallisia verkkokokemuksia, joissa yksityisyys on etusijalla.",
      location: "Tampere, Suomi",
      status: "Saatavilla freelance- ja yhteistyöprojekteihin.",
      ctaPrimary: "Katso työni",
      ctaSecondary: "Ota yhteyttä",
      headshotAlt: "Kumina muotokuva",
    },
    about: {
      label: "Tietoja",
      title: "Selkeitä, luotettavia ja yksityisyyslähtöisiä kokemuksia.",
      body:
        "Tavoitteeni on toimittaa tuotteita, jotka tuntuvat turvallisilta, nopeilta ja luotettavilta. Yhdistän tietoturvakäytännöt ja modernin UI-kehityksen, jotta käyttäjät voivat luottaa kokemukseen.",
      cards: [
        {
          title: "Tietoturva UX:ssa",
          body: "Suunnittelen luottamusta vahvistavia käyttöliittymiä tietoturva mielessä.",
        },
        {
          title: "Frontend-laatu",
          body: "Rakennan saavutettavia, responsiivisia ja sulavasti toimivia käyttöliittymiä.",
        },
        {
          title: "Tuotantovalmis lopputulos",
          body: "Selkeä dokumentaatio, käytännöllinen arkkitehtuuri ja sujuva handoff.",
        },
      ],
    },
    skills: {
      label: "Taidot",
      title: "Mitä tuon mukanani",
      items: [
        {
          name: "HTML & CSS",
          level: "92%",
        },
        {
          name: "JavaScript / TypeScript",
          level: "88%",
        },
        {
          name: "React & Astro",
          level: "84%",
        },
        {
          name: "Web-tietoturva",
          level: "90%",
        },
      ],
    },
    projects: {
      label: "Projektit",
      title: "Valikoidut cyber-työt",
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
            "Rakensin ajanvarausjärjestelmän hitsausopiskelijoille: koppi, päivä ja aika yhdessä näkymässä, tietoturva huomioiden.",
          tech: "React, TypeScript, Node.js, PostgreSQL",
          screenshotLabel: "Hitsausajanvarausjärjestelmän kuvapaikka",
          highlights: [
            "Opiskelija valitsee kopin, päivän ja ajan yhdellä kertaa.",
            "Tuplavaraukset vähenevät selkeillä saatavuussäännöillä.",
            "Ylläpitäjälle näkyvyys ja lokitus käyttöön.",
          ],
        },
        {
          id: "portfolio",
          title: "Henkilökohtainen portfolio",
          summary:
            "Neon-henkinen portfolio, joka esittelee työni nopeasti ja selkeästi.",
          tech: "Astro, JavaScript, CSS",
          screenshotLabel: "Portfolio-sivun kuvapaikka",
          highlights: [
            "Kerrostetut lasipaneelit ja neon-hehku.",
            "Nopeasti hahmotettava osiointi.",
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
      title: "Lyhyet päivitykset labrasta",
      items: [
        {
          title: "2024-08 — Varauslogiikka",
          body: "Vahvistin varausten logiikan ja estin päällekkäisyydet.",
        },
        {
          title: "2024-06 — Yksityisyystutkimus",
          body: "Kävin läpi yksityisyyslähtöisiä käyttömalleja ja datan minimointia.",
        },
        {
          title: "2024-04 — UI-kokeilut",
          body: "Testasin neon-henkisiä asetteluja nopeaan hahmottamiseen.",
        },
      ],
    },
    contact: {
      label: "Yhteys",
      title: "Tehdään töitä yhdessä",
      body:
        "Onko projekti mielessä? Rakennetaan yhdessä turvallinen ja käyttäjäystävällinen kokemus.",
      cta: "Palkkaa minut",
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
