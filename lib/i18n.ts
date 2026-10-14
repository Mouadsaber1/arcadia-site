// Textes du site en trois langues. Les repères [ENTRE CROCHETS] sont à compléter
// avec les informations réelles d'Arcadia : rien n'est inventé.
// L'arabe est à faire relire par un locuteur avant mise en ligne publique.

export type Lang = "fr" | "en" | "ar";
export const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: "fr", label: "FR", name: "Français" },
  { code: "ar", label: "عربي", name: "العربية" },
  { code: "en", label: "EN", name: "English" },
];

type ProjectText = { name: string; district: string; pitch: string };
type FeatureText = {
  name: string;
  kicker: string;
  line: string;
  text: string;
  program: string;
  district: string;
  alt: string[];
  captions: string[];
};

export type Dict = {
  nav: { news: string; group: string; projects: string; method: string; cta: string; lang: string };
  feature: {
    label: string;
    program: string;
    district: string;
    opening: string;
    surface: string;
    hill: FeatureText;
    cal: FeatureText;
  };
  hero: { line: string; lead: string; cta1: string; cta2: string; skyline: string };
  group: { title: string; text: string; residences: string; since: string; architect: string };
  projects: {
    title: string;
    hint: string;
    nav: string;
    city: string;
    apartments: string;
    delivery: string;
    progress: string;
    price: string;
    onRequest: string;
    cta: string;
    items: Record<"californie" | "abdelmoumen" | "ghandi", ProjectText>;
  };
  method: { title: string; steps: { title: string; text: string }[] };
  contact: {
    title: string;
    lead: string;
    office: string;
    phoneLabel: string;
    whatsapp: string;
    name: string;
    phone: string;
    request: string;
    requests: string[];
    residence: string;
    undecided: string;
    typology: string;
    typologies: string[];
    horizon: string;
    horizons: string[];
    message: string;
    optional: string;
    submit: string;
    sending: string;
    note: string;
    errName: string;
    errPhone: string;
    failed: string;
    doneTitle: string;
    doneText: string;
  };
  footer: { line: string };
};

export const DICT: Record<Lang, Dict> = {
  fr: {
    nav: { news: "Nouveaux projets", group: "Le groupe", projects: "Résidences", method: "Notre méthode", cta: "Visite privée", lang: "Langue" },
    feature: {
      label: "Nouveaux projets",
      program: "Programme",
      district: "Quartier",
      opening: "Ouverture",
      surface: "Surface",
      hill: {
        name: "Arcadia Hill",
        kicker: "Nouveau projet · Centre commercial",
        line: "Des boutiques, des terrasses, une promenade plantée.",
        text: "Un centre commercial pensé comme une promenade : des enseignes en rez-de-chaussée, des terrasses courbes et plantées dans les étages, des palmiers le long des allées.",
        program: "Centre commercial",
        district: "[QUARTIER]",
        alt: ["Arcadia Hill au coucher du soleil, façade vitrée et terrasses courbes", "La promenade commerçante d'Arcadia Hill, bordée de palmiers", "Les lettres Arcadia Hill à l'entrée du centre"],
        captions: ["La promenade commerçante", "L'entrée"],
      },
      cal: {
        name: "Résidence Californie",
        kicker: "Nouveau projet · Résidence",
        line: "Balcons courbes, lames claires, jardins suspendus.",
        text: "Plusieurs immeubles autour d'îlots plantés, des commerces de proximité en rez-de-chaussée, et des appartements ouverts sur de larges balcons courbes, protégés par des lames verticales.",
        program: "Résidence et commerces",
        district: "Californie",
        alt: ["La résidence Californie à l'angle de deux rues, en fin de journée", "Vue aérienne de la résidence Californie et de ses jardins", "La façade sur rue, balcons courbes et plantes suspendues", "Les immeubles de la résidence Californie, commerces en rez-de-chaussée"],
        captions: ["Vue d'ensemble", "La façade sur rue", "L'angle"],
      },
    },
    hero: {
      line: "Trois adresses. Une seule exigence.",
      lead: "Promoteur immobilier à Casablanca. Trois résidences, à Californie, Abdelmoumen et Ghandi.",
      cta1: "Découvrir les résidences",
      cta2: "Visite sur rendez-vous",
      skyline: "La ligne d'horizon de Casablanca dessinée au trait, avec les trois résidences Arcadia.",
    },
    group: {
      title: "Casablanca, une adresse à la fois",
      text: "Arcadia est un promoteur casablancais. Nous construisons peu, et nous construisons bien : chaque résidence part d'un emplacement choisi avec soin et d'une architecture qui lui est propre.",
      residences: "Résidences",
      since: "Depuis",
      architect: "Architecte",
    },
    projects: {
      title: "Trois résidences, trois architectures",
      hint: "Faites défiler : chaque immeuble se dessine pendant que vous lisez sa présentation.",
      nav: "Résidences",
      city: "Casablanca",
      apartments: "Appartements",
      delivery: "Livraison",
      progress: "Chantier",
      price: "Prix",
      onRequest: "Sur demande",
      cta: "Recevoir la brochure",
      items: {
        californie: {
          name: "Résidence Californie",
          district: "Californie",
          pitch: "Des balcons plantés et des appartements traversants, dans un quartier résidentiel arboré.",
        },
        abdelmoumen: {
          name: "Résidence Abdelmoumen",
          district: "Abdelmoumen",
          pitch: "Une tour élancée, rythmée par ses lames verticales, au cœur de la ville.",
        },
        ghandi: {
          name: "Résidence Ghandi",
          district: "Ghandi",
          pitch: "Des terrasses en gradins et des baies en arc, sur le boulevard Ghandi.",
        },
      },
    },
    method: {
      title: "De l'emplacement à la remise des clés",
      steps: [
        { title: "Le terrain", text: "Nous choisissons des emplacements rares, dans des quartiers établis où l'on aime vivre." },
        { title: "L'architecture", text: "Chaque résidence est dessinée pour son quartier : sa lumière, ses vues, sa rue." },
        { title: "Le chantier", text: "Des matériaux choisis pour durer, et un suivi de chantier que nous partageons avec vous." },
        { title: "Les clés", text: "Un seul interlocuteur, de la réservation à la remise des clés, et après." },
      ],
    },
    contact: {
      title: "Visite sur rendez-vous",
      lead: "Laissez votre numéro. Un conseiller vous rappelle pour convenir d'un rendez-vous au bureau de vente.",
      office: "Bureau de vente",
      phoneLabel: "Téléphone",
      whatsapp: "WhatsApp",
      name: "Nom",
      phone: "Téléphone ou WhatsApp",
      request: "Votre demande",
      requests: ["Une visite privée", "La brochure", "Être rappelé"],
      residence: "Résidence",
      undecided: "Pas encore décidé",
      typology: "Type d'appartement",
      typologies: ["Je ne sais pas encore", "Studio", "2 chambres", "3 chambres", "Penthouse", "Local commercial"],
      horizon: "Horizon d'achat",
      horizons: ["Moins de 3 mois", "3 à 12 mois", "Plus d'un an"],
      message: "Message",
      optional: "facultatif",
      submit: "Envoyer la demande",
      sending: "Envoi en cours…",
      note: "Votre numéro sert uniquement à vous recontacter.",
      errName: "Indiquez votre nom.",
      errPhone: "Indiquez un numéro valide, par exemple 06 12 34 56 78.",
      failed: "L'envoi n'a pas abouti. Vérifiez votre connexion puis réessayez.",
      doneTitle: "Demande envoyée",
      doneText: "Merci. Un conseiller vous rappelle pour convenir d'un rendez-vous.",
    },
    footer: { line: "Promotion immobilière à Casablanca" },
  },

  en: {
    nav: { news: "New projects", group: "The group", projects: "Residences", method: "Our approach", cta: "Private visit", lang: "Language" },
    feature: {
      label: "New projects",
      program: "Programme",
      district: "District",
      opening: "Opening",
      surface: "Area",
      hill: {
        name: "Arcadia Hill",
        kicker: "New project · Shopping centre",
        line: "Shops, terraces, a planted promenade.",
        text: "A shopping centre designed as a promenade: shopfronts at street level, curved planted terraces above, palm trees along the walkways.",
        program: "Shopping centre",
        district: "[DISTRICT]",
        alt: ["Arcadia Hill at sunset, glazed frontage and curved terraces", "The Arcadia Hill shopping promenade, lined with palm trees", "The Arcadia Hill letters at the entrance"],
        captions: ["The shopping promenade", "The entrance"],
      },
      cal: {
        name: "Californie Residence",
        kicker: "New project · Residence",
        line: "Curved balconies, pale fins, hanging gardens.",
        text: "Several buildings around planted courtyards, local shops at street level, and apartments opening onto wide curved balconies screened by vertical fins.",
        program: "Residence and shops",
        district: "Californie",
        alt: ["The Californie residence on a street corner, late afternoon", "Aerial view of the Californie residence and its gardens", "The street frontage, curved balconies and hanging plants", "The Californie buildings, shops at street level"],
        captions: ["Overview", "The street frontage", "The corner"],
      },
    },
    hero: {
      line: "Three addresses. One standard.",
      lead: "Real estate developer in Casablanca. Three residences, in Californie, Abdelmoumen and Ghandi.",
      cta1: "Discover the residences",
      cta2: "Visits by appointment",
      skyline: "Casablanca's skyline drawn in line, with the three Arcadia residences.",
    },
    group: {
      title: "Casablanca, one address at a time",
      text: "Arcadia is a Casablanca-based developer. We build little, and we build well: every residence starts from a carefully chosen site and an architecture of its own.",
      residences: "Residences",
      since: "Since",
      architect: "Architect",
    },
    projects: {
      title: "Three residences, three architectures",
      hint: "Scroll: each building draws itself while you read about it.",
      nav: "Residences",
      city: "Casablanca",
      apartments: "Apartments",
      delivery: "Completion",
      progress: "Construction",
      price: "Price",
      onRequest: "On request",
      cta: "Receive the brochure",
      items: {
        californie: {
          name: "Californie Residence",
          district: "Californie",
          pitch: "Planted balconies and dual-aspect apartments, in a leafy residential neighbourhood.",
        },
        abdelmoumen: {
          name: "Abdelmoumen Residence",
          district: "Abdelmoumen",
          pitch: "A slender tower, set to the rhythm of its vertical fins, in the heart of the city.",
        },
        ghandi: {
          name: "Ghandi Residence",
          district: "Ghandi",
          pitch: "Stepped terraces and arched bays, on Boulevard Ghandi.",
        },
      },
    },
    method: {
      title: "From the site to the keys",
      steps: [
        { title: "The site", text: "We choose rare locations, in established neighbourhoods where people love to live." },
        { title: "The architecture", text: "Each residence is designed for its neighbourhood: its light, its views, its street." },
        { title: "The build", text: "Materials chosen to last, and construction updates we share with you." },
        { title: "The keys", text: "One point of contact, from reservation to handover, and beyond." },
      ],
    },
    contact: {
      title: "Visits by appointment",
      lead: "Leave your number. An advisor will call you back to arrange a meeting at the sales office.",
      office: "Sales office",
      phoneLabel: "Phone",
      whatsapp: "WhatsApp",
      name: "Name",
      phone: "Phone or WhatsApp",
      request: "Your request",
      requests: ["A private visit", "The brochure", "A call back"],
      residence: "Residence",
      undecided: "Not decided yet",
      typology: "Apartment type",
      typologies: ["Not sure yet", "Studio", "2 bedrooms", "3 bedrooms", "Penthouse", "Retail unit"],
      horizon: "Purchase timeline",
      horizons: ["Within 3 months", "3 to 12 months", "More than a year"],
      message: "Message",
      optional: "optional",
      submit: "Send request",
      sending: "Sending…",
      note: "Your number is only used to contact you about this request.",
      errName: "Enter your name.",
      errPhone: "Enter a valid number, for example +212 6 12 34 56 78.",
      failed: "The request could not be sent. Check your connection and try again.",
      doneTitle: "Request sent",
      doneText: "Thank you. An advisor will call you back to arrange a meeting.",
    },
    footer: { line: "Real estate development in Casablanca" },
  },

  ar: {
    nav: { news: "مشاريع جديدة", group: "المجموعة", projects: "الإقامات", method: "منهجيتنا", cta: "زيارة خاصة", lang: "اللغة" },
    feature: {
      label: "مشاريع جديدة",
      program: "البرنامج",
      district: "الحي",
      opening: "الافتتاح",
      surface: "المساحة",
      hill: {
        name: "أركاديا هيل",
        kicker: "مشروع جديد · مركز تجاري",
        line: "متاجر، شرفات، وممشى مزروع.",
        text: "مركز تجاري صُمّم كممشى: واجهات تجارية في الطابق الأرضي، شرفات منحنية مزروعة في الطوابق العليا، ونخيل على طول الممرات.",
        program: "مركز تجاري",
        district: "[الحي]",
        alt: ["أركاديا هيل عند الغروب، واجهة زجاجية وشرفات منحنية", "الممشى التجاري لأركاديا هيل تحفّه أشجار النخيل", "حروف أركاديا هيل عند مدخل المركز"],
        captions: ["الممشى التجاري", "المدخل"],
      },
      cal: {
        name: "إقامة كاليفورنيا",
        kicker: "مشروع جديد · إقامة",
        line: "شرفات منحنية، شفرات فاتحة، حدائق معلّقة.",
        text: "عدّة عمارات حول مساحات مزروعة، متاجر قرب السكن في الطابق الأرضي، وشقق تنفتح على شرفات منحنية واسعة تحميها شفرات عمودية.",
        program: "إقامة ومتاجر",
        district: "كاليفورنيا",
        alt: ["إقامة كاليفورنيا عند زاوية شارعين، في آخر النهار", "منظر جوي لإقامة كاليفورنيا وحدائقها", "الواجهة على الشارع، شرفات منحنية ونباتات معلّقة", "عمارات إقامة كاليفورنيا، متاجر في الطابق الأرضي"],
        captions: ["منظر عام", "الواجهة على الشارع", "الزاوية"],
      },
    },
    hero: {
      line: "ثلاثة عناوين. معيار واحد.",
      lead: "مطوّر عقاري في الدار البيضاء. ثلاث إقامات في كاليفورنيا وعبد المومن وغاندي.",
      cta1: "اكتشف الإقامات",
      cta2: "الزيارة بموعد مسبق",
      skyline: "أفق الدار البيضاء مرسوم بالخط، مع إقامات أركاديا الثلاث.",
    },
    group: {
      title: "الدار البيضاء، عنوانًا تلو الآخر",
      text: "أركاديا مطوّر عقاري من الدار البيضاء. نبني قليلًا، ونبني جيدًا: كل إقامة تنطلق من موقع مختار بعناية ومن هندسة معمارية خاصة بها.",
      residences: "الإقامات",
      since: "منذ",
      architect: "المهندس المعماري",
    },
    projects: {
      title: "ثلاث إقامات، ثلاث هندسات معمارية",
      hint: "مرّر الصفحة: يُرسم كل مبنى بينما تقرأ تقديمه.",
      nav: "الإقامات",
      city: "الدار البيضاء",
      apartments: "الشقق",
      delivery: "التسليم",
      progress: "الأشغال",
      price: "الثمن",
      onRequest: "عند الطلب",
      cta: "احصل على الكتيّب",
      items: {
        californie: {
          name: "إقامة كاليفورنيا",
          district: "كاليفورنيا",
          pitch: "شرفات مزروعة وشقق مزدوجة الواجهة، في حيّ سكني تحفّه الأشجار.",
        },
        abdelmoumen: {
          name: "إقامة عبد المومن",
          district: "عبد المومن",
          pitch: "برج رشيق تحدّد إيقاعه شفراته العمودية، في قلب المدينة.",
        },
        ghandi: {
          name: "إقامة غاندي",
          district: "غاندي",
          pitch: "شرفات متدرّجة ونوافذ مقوّسة، على شارع غاندي.",
        },
      },
    },
    method: {
      title: "من اختيار الموقع إلى تسليم المفاتيح",
      steps: [
        { title: "الموقع", text: "نختار مواقع نادرة، في أحياء راسخة يحلو فيها العيش." },
        { title: "الهندسة المعمارية", text: "كل إقامة مصمَّمة لحيّها: لضوئه وإطلالاته وشارعه." },
        { title: "الأشغال", text: "مواد مختارة لتدوم، ومتابعة للأشغال نشاركها معكم." },
        { title: "المفاتيح", text: "محاور واحد، من الحجز إلى تسليم المفاتيح، وما بعده." },
      ],
    },
    contact: {
      title: "الزيارة بموعد مسبق",
      lead: "اترك رقمك، وسيتصل بك مستشار لتحديد موعد في مكتب البيع.",
      office: "مكتب البيع",
      phoneLabel: "الهاتف",
      whatsapp: "واتساب",
      name: "الاسم",
      phone: "الهاتف أو واتساب",
      request: "طلبك",
      requests: ["زيارة خاصة", "الكتيّب", "معاودة الاتصال"],
      residence: "الإقامة",
      undecided: "لم أقرّر بعد",
      typology: "نوع الشقة",
      typologies: ["لا أعرف بعد", "استوديو", "غرفتان", "ثلاث غرف", "بنتهاوس", "محل تجاري"],
      horizon: "موعد الشراء",
      horizons: ["أقل من 3 أشهر", "من 3 إلى 12 شهرًا", "أكثر من سنة"],
      message: "رسالة",
      optional: "اختياري",
      submit: "إرسال الطلب",
      sending: "جارٍ الإرسال…",
      note: "يُستعمل رقمك فقط للتواصل معك بخصوص هذا الطلب.",
      errName: "أدخل اسمك.",
      errPhone: "أدخل رقمًا صحيحًا، مثلًا 06 12 34 56 78.",
      failed: "تعذّر الإرسال. تحقّق من اتصالك ثم أعد المحاولة.",
      doneTitle: "تم إرسال الطلب",
      doneText: "شكرًا لك. سيتصل بك مستشار لتحديد موعد.",
    },
    footer: { line: "التطوير العقاري في الدار البيضاء" },
  },
};
