import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  MapPin, 
  Heart, 
  Play, 
  Info, 
  Flame, 
  Sparkles, 
  ChevronRight,
  X,
  ExternalLink,
  Github,
  Mail,
  Globe
} from "lucide-react";
import { CATEGORIES } from "./constants";
import { cn } from "./lib/utils";

// --- Components ---

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-warm rounded-full flex items-center justify-center flame-glow">
            <Flame className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gradient-warm">Lichtblick</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {["Nachrichten", "Kategorien", "Videos", "Spiele", "Über Mich"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm font-medium text-slate-400 hover:text-orange-500 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
        <button className="md:hidden text-slate-400">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 text-center overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full -z-10" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Die Welt ist <span className="text-gradient-warm">voller Wunder</span>.
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Lichtblick ist dein digitaler Rückzugsort. Wir filtern das Rauschen der Welt und zeigen dir nur das, was wirklich zählt: Hoffnung, Fortschritt und Menschlichkeit.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#nachrichten" className="px-8 py-3 bg-gradient-warm rounded-full font-semibold text-white flame-glow hover:scale-105 transition-transform">
            Gute Nachrichten finden
          </a>
          <a href="#kategorien" className="px-8 py-3 bg-slate-800 rounded-full font-semibold text-slate-200 hover:bg-slate-700 transition-colors">
            Kategorien entdecken
          </a>
        </div>
      </motion.div>
    </section>
  );
};

const PositiveNewsSearch = () => {
  const [zipCode, setZipCode] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.length >= 5) {
      const query = `positive nachrichten ${zipCode} umkreis 50km`;
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
      setShowModal(false);
    }
  };

  return (
    <section id="nachrichten" className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-sm font-medium mb-6">
          <MapPin className="w-4 h-4" />
          <span>Lokal & Positiv</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Was passiert Gutes in deiner Nähe?</h2>
        <p className="text-slate-400 mb-8">
          Gib deine Postleitzahl ein und wir finden aktuelle, positive Nachrichten aus deiner Stadt und einem Umkreis von 50 km für dich.
        </p>
        
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="text" 
            placeholder="Deine PLZ (z.B. 10115)" 
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
            className="flex-1 px-6 py-3 bg-slate-800 border border-slate-700 rounded-full focus:outline-none focus:border-orange-500 transition-colors"
          />
          <button 
            type="button"
            onClick={() => setShowModal(true)}
            className="px-8 py-3 bg-orange-500 rounded-full font-semibold text-white hover:bg-orange-600 transition-colors"
          >
            Suchen
          </button>
        </form>

        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-sm w-full text-center relative"
              >
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Bereit für gute Laune?</h3>
                <p className="text-slate-400 mb-8">
                  Möchtest du jetzt positive Nachrichten aus dem Bereich {zipCode} sehen? Wir leiten dich zu einer gefilterten Google-Suche weiter.
                </p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleSearch}
                    className="w-full py-3 bg-gradient-warm rounded-xl font-bold text-white"
                  >
                    Ja, zeig mir das Gute!
                  </button>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="w-full py-3 bg-slate-800 rounded-xl font-bold text-slate-300"
                  >
                    Vielleicht später
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const CategoryGrid = () => {
  return (
    <section id="kategorien" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Entdecke die Vielfalt</h2>
        <p className="text-slate-400">Wähle eine Kategorie, die dein Weltbild heute ein Stück heller macht.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -5 }}
            className="group p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:border-orange-500/50 transition-all cursor-pointer"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white", cat.color)}>
              <cat.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">{cat.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{cat.description}</p>
            <div className="mt-6 flex items-center text-orange-500 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Mehr erfahren <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const VideoSection = () => {
  const videos = [
    { id: "1", title: "Menschlichkeit: Ein Akt der Güte", category: "Humanity", thumb: "https://picsum.photos/seed/kindness/800/450" },
    { id: "2", title: "Die lustigsten Katzen des Internets", category: "Funny Animals", thumb: "https://picsum.photos/seed/cat-in-cup/800/450" },
    { id: "3", title: "Hunde, die uns zum Lachen bringen", category: "Funny Animals", thumb: "https://picsum.photos/seed/dogs/800/450" },
    { id: "4", title: "Inspirierende Lebensgeschichten", category: "Humanity", thumb: "https://picsum.photos/seed/life/800/450" },
  ];

  return (
    <section id="videos" className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Video-Ecke</h2>
            <p className="text-slate-400">Lehn dich zurück und genieße die schönen Seiten des Lebens.</p>
          </div>
          <button className="hidden md:flex items-center text-orange-500 font-medium">
            Alle Videos <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="group relative overflow-hidden rounded-3xl bg-slate-800 aspect-video cursor-pointer">
              <img 
                src={video.thumb} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-slate-950/80 to-transparent">
                <span className="inline-block px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold mb-3 w-fit">
                  {video.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">{video.title}</h3>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Play className="w-4 h-4 fill-current" />
                  <span>Jetzt ansehen</span>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-8 h-8 text-white fill-current ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GamesSection = () => {
  const [hearts, setHearts] = useState(0);
  const [affirmation, setAffirmation] = useState("Klicke für eine Portion Glück!");
  
  const affirmations = [
    "Du bist wertvoll.",
    "Heute wird ein großartiger Tag.",
    "Dein Lächeln verändert die Welt.",
    "Du hast die Kraft, Gutes zu tun.",
    "Jeder kleine Schritt zählt.",
    "Du wirst geliebt.",
    "Vertraue auf deinen Weg.",
    "Du bist stärker als du denkst.",
    "Lass dein Licht leuchten.",
    "Gute Dinge kommen auf dich zu."
  ];

  const spinAffirmation = () => {
    const random = affirmations[Math.floor(Math.random() * affirmations.length)];
    setAffirmation(random);
  };

  return (
    <section id="spiele" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Interaktive Pausen</h2>
        <p className="text-slate-400">Kurze Spiele für zwischendurch, um den Fokus auf das Positive zu lenken.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Game 1: Kindness Clicker */}
        <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Kindness Clicker</h3>
          <p className="text-slate-400 mb-8">Verbreite Liebe mit jedem Klick. Wie viele Herzen kannst du sammeln?</p>
          <div className="text-5xl font-bold text-gradient-warm mb-10">{hearts}</div>
          <button 
            onClick={() => setHearts(h => h + 1)}
            className="w-32 h-32 bg-gradient-warm rounded-full flex items-center justify-center flame-glow active:scale-95 transition-transform"
          >
            <Heart className="w-16 h-16 text-white fill-white" />
          </button>
        </div>

        {/* Game 2: Affirmation Spinner */}
        <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Glücks-Rad</h3>
          <p className="text-slate-400 mb-8">Ein kleiner Gedanke für deinen Tag. Was sagt das Universum heute?</p>
          <div className="min-h-[100px] flex items-center justify-center mb-10">
            <AnimatePresence mode="wait">
              <motion.p 
                key={affirmation}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-2xl font-medium text-slate-200 italic"
              >
                "{affirmation}"
              </motion.p>
            </AnimatePresence>
          </div>
          <button 
            onClick={spinAffirmation}
            className="px-10 py-4 bg-slate-800 rounded-full font-bold text-slate-200 hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-orange-500" />
            Neu würfeln
          </button>
        </div>
      </div>
    </section>
  );
};

const AboutMe = () => {
  return (
    <section id="über-mich" className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-4 border-orange-500/20">
            <img 
              src="https://picsum.photos/seed/lara/800/1000" 
              alt="Lara Lichtblick" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-warm rounded-3xl flex items-center justify-center flame-glow animate-float">
            <Flame className="w-16 h-16 text-white fill-white" />
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-6">Hallo, ich bin <span className="text-gradient-warm">Lara</span>.</h2>
          <div className="space-y-4 text-slate-400 leading-relaxed">
            <p>
              Früher war ich Journalistin in einer Welt, die sich nur um Schlagzeilen drehte. Je lauter und negativer, desto besser – so hieß es. Doch nach Jahren des Reisens und tausenden Begegnungen mit wundervollen Menschen wurde mir klar: Das ist nicht die ganze Wahrheit.
            </p>
            <p>
              Ich habe Lichtblick ins Leben gerufen, um ein Gegengewicht zu schaffen. Mein Ziel ist es nicht, die Probleme der Welt zu ignorieren, sondern den Fokus auf die Lösungen zu lenken. Ich möchte zeigen, dass es sich lohnt, optimistisch zu sein.
            </p>
            <p>
              Diese Webseite ist mein Herzensprojekt. Ein Ort, an dem du durchatmen kannst. Ein Ort, der dich daran erinnert, dass das Gute existiert – direkt vor deiner Haustür oder am anderen Ende der Welt.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-slate-900" />
              ))}
            </div>
            <span className="text-sm text-slate-500 font-medium">+ 2.400 Optimisten folgen bereits</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-warm rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gradient-warm">Lichtblick</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8">
              Dein täglicher Lichtblick in einer komplexen Welt. Wir glauben an das Gute und machen es sichtbar.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#nachrichten" className="hover:text-orange-500">Nachrichten</a></li>
              <li><a href="#kategorien" className="hover:text-orange-500">Kategorien</a></li>
              <li><a href="#videos" className="hover:text-orange-500">Videos</a></li>
              <li><a href="#spiele" className="hover:text-orange-500">Spiele</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Rechtliches</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#impressum" className="hover:text-orange-500">Impressum</a></li>
              <li><a href="#" className="hover:text-orange-500">Datenschutz</a></li>
              <li><a href="#" className="hover:text-orange-500">Cookie-Richtlinien</a></li>
            </ul>
          </div>
        </div>
        
        <div id="impressum" className="pt-12 border-t border-slate-800 text-slate-500 text-xs leading-relaxed">
          <h4 className="text-slate-300 font-bold mb-4 text-sm">Impressum</h4>
          <p className="mb-2">Angaben gemäß § 5 TMG:</p>
          <p className="mb-4">
            Lara Lichtblick<br />
            Sonnenallee 123<br />
            10115 Berlin
          </p>
          <p className="mb-2">Kontakt:</p>
          <p className="mb-4">
            Telefon: +49 (0) 30 12345678<br />
            E-Mail: hallo@lichtblick-web.de
          </p>
          <p className="mb-4">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:<br />
            Lara Lichtblick (Anschrift wie oben)
          </p>
          <p>
            Haftungsausschluss: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>
          <div className="mt-12 text-center">
            &copy; {new Date().getFullYear()} Lichtblick - Private Webseite von Lara Lichtblick. Alle Rechte vorbehalten.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-orange-500 selection:text-white">
      <Header />
      <main>
        <Hero />
        <PositiveNewsSearch />
        <CategoryGrid />
        <VideoSection />
        <GamesSection />
        <AboutMe />
      </main>
      <Footer />
    </div>
  );
}
