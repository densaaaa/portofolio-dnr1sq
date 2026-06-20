"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";

const NAV_LINKS = [
  "beranda",
  "tentang",
  "proyek",
  "kemampuan",
  "kontak",
] as const;

const STATS = [
  ["2+", { id: "Proyek", en: "Projects" }],
  ["3yr", { id: "Belajar", en: "Learning" }],
  ["10+", { id: "Susunan Teknologi", en: "Tech Stack" }],
] as const;
const ABOUT_CARDS = [
  {
    icon: "school",
    title: { id: "Pendidikan dan Karir", en: "Education & Career" },
    timeline: [
      {
        period: "2026",
        role: { id: "D4 Teknik Informatika", en: "D4 Informatics Engineering" },
        place: {
          id: "Politeknik Negeri Malang",
          en: "State Polytechnic of Malang",
        },
      },
      {
        period: "2025",
        role: { id: "Magang", en: "Internship" },
        place: { id: "Viscode ID Kediri", en: "Viscode ID Kediri" },
      },
      {
        period: "2023–2026",
        role: { id: "Rekayasa Perangkat Lunak", en: "Software Engineering" },
        place: { id: "SMKN 2 Trenggalek", en: "SMKN 2 Trenggalek" },
      },
    ],
  },
  {
    icon: "code",
    title: { id: "Minat", en: "Interests" },
    desc: {
      id: "Membangun website dengan berbagai framework dan mendesain UI/UX yang intuitif.",
      en: "Building websites with various frameworks and designing intuitive UI/UX.",
    },
  },
] as const;

const AWARDS = [
  {
    image: "images/sertif1.jpeg",
    icon: "emoji_events",
    title: { id: "Sertifikat KKNI LV 4", en: "KKNI Level 4 Certificate" },
    issuer: { id: "SERTIFIKASI", en: "CERTIFICATION" },
    year: "2025",
    desc: {
      id: "Sertifikasi kompetensi KKNI Level 4 bertaraf nasional oleh UPT PTKK Jawa Timur sebagai bukti penguasaan keterampilan sesuai standar kerja nasional.",
      en: "A nationally recognized KKNI Level 4 competency certification issued by UPT PTKK East Java, proving skill mastery to national work standards.",
    },
  },
  {
    image: "images/sertif2.jpeg",
    icon: "military_tech",
    title: {
      id: "Sertifikasi Peserta Diklat",
      en: "Training Participant Certificate",
    },
    issuer: { id: "PELATIHAN", en: "TRAINING" },
    year: "2025",
    desc: {
      id: "Sertifikasi peserta ujian kompetensi berbasis KKNI bertaraf nasional di UPT PTKK Jawa Timur.",
      en: "Certification for participating in a nationally recognized KKNI-based competency exam at UPT PTKK East Java.",
    },
  },
  {
    image: "images/sertif3.jpeg",
    icon: "workspace_premium",
    title: {
      id: "Sertifikasi Peserta Diklat",
      en: "Training Participant Certificate",
    },
    issuer: { id: "PELATIHAN", en: "TRAINING" },
    year: "2024",
    desc: {
      id: "Sertifikasi peserta kegiatan pengembangan dan peningkatan kompentensi keahlian di UPT PTKK Jawa Timur.",
      en: "Certification for participating in a skills development and competency improvement program at UPT PTKK East Java.",
    },
  },
] as const;

const PROJECTS = [
  {
    id: "01",
    featured: true,
    tags: ["php", "Web3"] as const,
    title: { id: "Web Absensi Sekolah", en: "School Attendance Web App" },
    desc: {
      id: "Sistem absensi sekolah berbasis web yang memungkinkan pencatatan kehadiran siswa secara real-time, pengelolaan data absensi, serta pengiriman notifikasi otomatis kepada siswa melalui WhatsApp.",
      en: "A web-based school attendance system that enables real-time student attendance recording, attendance data management, and automatic notifications to students via WhatsApp.",
    },
    image: "images/project1.png",
    year: "2026",
    category: { id: "Web App", en: "Web App" },
  },
  {
    id: "02",
    featured: false,
    tags: ["codeigniter4", "php", "Web3"] as const,
    title: {
      id: "Prototype Web Ojek Online",
      en: "Online Ride-Hailing Web Prototype",
    },
    desc: {
      id: "Sebuah prototype website ojek online yang saya kembangkan sebagai tugas ditempat magang.",
      en: "An online ride-hailing website prototype I developed as a task during my internship.",
    },
    image: "images/project2.png",
    year: "2025",
    category: { id: "Web3", en: "Web3" },
  },
  {
    id: "03",
    featured: false,
    tags: ["Next.js", "TypeScript", "web3"] as const,
    title: {
      id: "Nantikan Proyek Selanjutnya.",
      en: "Stay Tuned for the Next Project.",
    },
    desc: { id: "Nantikan.", en: "Coming soon." },
    image: "",
    year: "2026",
    category: { id: "In Progress", en: "In Progress" },
  },
] as const;

const SKILLS_BARS = [
  {
    title: "Frontend Development",
    pct: 48,
    rating: 3,
    desc: "Next.js, Tailwind, Js, CSS.",
  },
  {
    title: "Backend Architecture",
    pct: 65,
    rating: 4,
    desc: "Laravel, CodeIgniter, Postman, PHP.",
  },
  { title: "UI / UX Design", pct: 75, rating: 4, desc: "Figma." },
] as const;

const RED = "#1324b9";
const RED_LIGHT = "rgba(19, 36, 185,0.10)";

type Theme = "light" | "dark";
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});
const useTheme = () => useContext(ThemeContext);

type Lang = "id" | "en";
const LanguageContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: "id",
  toggle: () => {},
});
const useLanguage = () => useContext(LanguageContext);

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("id");
  const toggle = () => setLang((l) => (l === "id" ? "en" : "id"));
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

const TRANSLATIONS = {
  id: {
    navLinks: ["beranda", "tentang", "proyek", "kemampuan", "kontak"] as const,
    webDeveloper: "Web Developer",
    scroll: "Scroll",
    profil: "Profil",
    tentangSaya: "Tentang",
    saya: "Saya.",
    aboutP1: "Perkenalkan saya ",
    aboutP1b:
      " adalah mahasiswa Teknik Informatika di POLITEKNIK NEGRI MALANG yang bersemangat membangun sistem yang tidak hanya berfungsi — tapi scalable.",
    aboutP2:
      "Ketika tidak sedang coding, saya suka mendalami desain sistem dan berkontribusi ke proyek open-source.",
    prestasi: "Prestasi",
    prestasiDesc:
      "Pencapaian dan sertifikasi yang menandai perjalanan belajar saya.",
    sertifikat1: "Serti",
    sertifikat2: "fikat.",
    galeri: "Galeri",
    galeriDesc: "Project yang saya kembangkan selama belajar",
    proyekSaya1: "Proyek ",
    proyekSaya2: "Saya.",
    lihatLengkap: "Lihat Lebih Lengkap",
    kemampuan: "Kemampuan",
    teknologi1: "Teknologi & ",
    teknologi2: "Penguasaan.",
    skillsDesc:
      "Gambaran visual mengenai keahlian teknis dan spesialisasi kerajinan yang dibangun selama 3 tahun pembelajaran.",
    susunanTeknologi: "Susunan Teknologi",
    bahasaAlat1: "Bahasa & ",
    bahasaAlat2: "Alat.",
    kontak: "Kontak",
    contactTitle1: "Mari ",
    contactTitle2: "Terhubung",
    contactTitle3: "dan Bertukar ide.",
    contactDesc:
      "Belum terbuka untuk project komersial, silahkan lanjut untuk berkenalan",
    kirimPesan: "Kirim Pesan",
    poly: "Politeknik Negeri Malang",
  },
  en: {
    navLinks: ["home", "about", "projects", "skills", "contact"] as const,
    webDeveloper: "Web Developer",
    scroll: "Scroll",
    profil: "Profile",
    tentangSaya: "About",
    saya: "Me.",
    aboutP1: "Hi, I'm ",
    aboutP1b:
      ", an IT student at STATE POLYTECHNIC OF MALANG passionate about building systems that aren't just functional — but scalable.",
    aboutP2:
      "When I'm not coding, I enjoy diving into system design and contributing to open-source projects.",
    prestasi: "Achievements",
    prestasiDesc:
      "Accomplishments and certifications that mark my learning journey.",
    sertifikat1: "Certi",
    sertifikat2: "ficates.",
    galeri: "Gallery",
    galeriDesc: "Projects I've built while learning",
    proyekSaya1: "My ",
    proyekSaya2: "Projects.",
    lihatLengkap: "View More",
    kemampuan: "Skills",
    teknologi1: "Technology & ",
    teknologi2: "Expertise.",
    skillsDesc:
      "A visual overview of the technical skills and craft specialization built over 3 years of learning.",
    susunanTeknologi: "Tech Stack",
    bahasaAlat1: "Languages & ",
    bahasaAlat2: "Tools.",
    kontak: "Contact",
    contactTitle1: "Let's ",
    contactTitle2: "Connect",
    contactTitle3: "and exchange ideas.",
    contactDesc:
      "Not yet open for commercial projects, but feel free to reach out and say hi",
    kirimPesan: "Send Message",
    poly: "State Polytechnic of Malang",
  },
} as const;

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeStyles() {
  return (
    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Inter:wght@300;400;500;600&display=swap");
      @import url("https://fonts.googleapis.com/icon?family=Material+Icons+Outlined");

      :root,
      [data-theme="light"] {
        --bg: #e8e8e4;
        --bg-alt: #deded9;
        --surface: #d4d4ce;
        --text: #111111;
        --text-muted: #666660;
        --border: rgba(17, 17, 17, 0.12);
        --border-soft: rgba(17, 17, 17, 0.08);
        --nav-bg: rgba(232, 232, 228, 0.92);
        --mobile-menu-bg: rgba(232, 232, 228, 0.98);
        --img-grayscale: 30%;
        --img-grayscale-hover: 0%;
      }
      [data-theme="dark"] {
        --bg: #111111;
        --bg-alt: #161616;
        --surface: #1e1e1e;
        --text: #ebebeb;
        --text-muted: #888882;
        --border: rgba(235, 235, 235, 0.1);
        --border-soft: rgba(235, 235, 235, 0.07);
        --nav-bg: rgba(17, 17, 17, 0.93);
        --mobile-menu-bg: rgba(17, 17, 17, 0.98);
        --img-grayscale: 20%;
        --img-grayscale-hover: 0%;
      }
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      html,
      body {
        scroll-behavior: smooth;
        max-width: 100%;
        overflow-x: hidden;
      }
      body {
        background: var(--bg);
        color: var(--text);
        font-family: "Inter", system-ui, sans-serif;
        transition:
          background-color 0.35s ease,
          color 0.35s ease;
        width: 100%;
        position: relative;
      }
      img {
        max-width: 100%;
        height: auto;
      }
      .font-display {
        font-family: "Helvetica Neue", "Arial Black", "Impact", sans-serif;
        font-weight: 900;
        letter-spacing: -0.04em;
      }
      .font-script {
        font-family: "Dancing Script", cursive;
        font-weight: 700;
      }
      .reveal {
        opacity: 0;
        transform: translateY(28px);
        transition:
          opacity 0.7s ease,
          transform 0.7s ease;
      }
      .reveal.active {
        opacity: 1;
        transform: translateY(0);
      }
      .progress-bar-fill {
        transition: width 1.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .tag-pill {
        font-family: "Inter", sans-serif;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 4px 12px;
        border-radius: 999px;
        background: ${RED_LIGHT};
        color: ${RED};
      }
      .card {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 0;
        padding: 28px;
        transition:
          border-color 0.25s,
          transform 0.25s;
      }
      .card:hover {
        border-color: ${RED};
        transform: translateY(-3px);
      }
      .arrow-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-family: "Inter", sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text);
        text-decoration: none;
        border-bottom: 1px solid var(--border);
        padding-bottom: 2px;
        transition:
          color 0.2s,
          border-color 0.2s;
      }
      .arrow-link:hover {
        color: ${RED};
        border-color: ${RED};
      }
      .year-badge {
        position: absolute;
        top: 12px;
        right: 12px;
        font-family: "Inter", sans-serif;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 4px 12px;
        background: var(--nav-bg);
        color: var(--text-muted);
      }
      .hero-word {
        font-family: "Helvetica Neue", "Arial Black", "Impact", sans-serif;
        font-weight: 900;
        letter-spacing: -0.03em;
        line-height: 0.85;
        text-transform: lowercase;
        color: var(--text);
        display: block;
        width: 100%;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
      }
      .divider {
        width: 100%;
        height: 1px;
        background: var(--border);
      }
    `}</style>
  );
}

function ThemeToggleButton() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Aktifkan tema terang" : "Aktifkan tema gelap"}
      style={{
        position: "fixed",
        top: "50%",
        right: "20px",
        transform: "translateY(-50%)",
        zIndex: 100001,
        width: "44px",
        height: "44px",
        borderRadius: "0",
        background: isDark ? "#1E1E1E" : "#111111",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        color: RED,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "transform .2s",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.transform =
          "translateY(-50%) scale(1.08)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.transform =
          "translateY(-50%)")
      }
    >
      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}

function LanguageToggleButton() {
  const { lang, toggle } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch language"
      style={{
        background: "none",
        border: "1px solid var(--border)",
        borderRadius: "0",
        padding: "6px 10px",
        fontFamily: "'Inter',sans-serif",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.05em",
        color: "var(--text)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        transition: "border-color .2s,color .2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = RED;
        (e.currentTarget as HTMLButtonElement).style.color = RED;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          "var(--border)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--text)";
      }}
    >
      <span style={{ opacity: lang === "id" ? 1 : 0.4 }}>ID</span>
      <span style={{ opacity: 0.3 }}>/</span>
      <span style={{ opacity: lang === "en" ? 1 : 0.4 }}>EN</span>
    </button>
  );
}

type LogoProps = { className?: string };
const NextjsLogo = ({ className }: LogoProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.005-4.703.007-4.705.073-.092a.645.645 0 0 1 .174-.143c.096-.047.133-.051.5-.051.434 0 .506.017.619.143.031.034 1.178 1.765 2.548 3.846l4.785 7.27 1.917 2.916.097-.063a12.317 12.317 0 0 0 2.43-2.13 11.86 11.86 0 0 0 2.813-6.13c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C22.78 5.04 19.572 1.254 15.224.345a13.156 13.156 0 0 0-1.91-.234c-.118-.006-.59-.011-1.742-.111zm4.069 7.217c.347 0 .408.005.486.039a.471.471 0 0 1 .232.232c.034.077.038.276.038 1.792v1.703l-.785-1.211-.785-1.211V8.04c0-.755.008-.855.026-.916a.51.51 0 0 1 .25-.265c.073-.034.146-.044.378-.05.038-.001.108-.001.16 0z"
    />
  </svg>
);
const LaravelLogo = ({ className }: LogoProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="#FF2D20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.378.378 0 01-.377 0l-8.927-5.194A.378.378 0 010 18.43V3.958c0-.135.073-.26.189-.326L4.512 1.141a.378.378 0 01.377 0l8.927 5.194a.378.378 0 01.189.326v9.398l3.778-2.181V8.728a.378.378 0 01.189-.326l4.323-2.49a.378.378 0 01.377 0l1.052-.482z" />
  </svg>
);
const CodeIgniterLogo = ({ className }: LogoProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="#EE4323"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16.336 0c.598 1.467.864 2.872.864 4.587 0 1.768-.41 3.236-1.193 4.69.673-.196 1.302-.514 1.873-.99 2.215 1.825 3.624 4.59 3.624 7.726 0 5.526-4.479 10.005-10.005 10.005C5.973 25.018.487 19.523.487 13C.487 6.756 5.563.467 11.65.467c-.317.99-.49 1.953-.49 3.046 0 1.696.504 3.166 1.467 4.5-1.467-.55-2.689-1.55-3.508-2.872 0 4.243 3.044 8.062 7.115 8.062 4.243 0 7.69-3.446 7.69-7.69C23.924 1.97 20.394 0 16.336 0zm-4.95 14.55c1.554 0 2.815 1.26 2.815 2.815 0 1.553-1.26 2.815-2.815 2.815-1.553 0-2.815-1.262-2.815-2.815 0-1.554 1.262-2.815 2.815-2.815z" />
  </svg>
);
const JavaScriptLogo = ({ className }: LogoProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="#F7DF1E"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
  </svg>
);
const PhpLogo = ({ className }: LogoProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="#777BB4"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 0 1-.351.953c-.16.273-.354.51-.575.687zm5.064.715l.543-2.799c.063-.318.039-.536-.067-.65-.105-.114-.328-.171-.663-.171H12.27l-.704 3.62h-1.365l1.23-6.327h1.365l-.327 1.682h1.158c.728 0 1.226.127 1.498.382.273.255.357.668.253 1.236l-.572 2.95c-.054.28-.027.396.064.484.09.087.27.13.532.13l-.075.391h-1.39c-.443 0-.732-.117-.866-.351-.135-.234-.155-.587-.05-1.058zm6.973-3.166a2.836 2.836 0 0 1-.351.953c-.16.273-.354.51-.575.687a2.5 2.5 0 0 1-.917.551c-.336.108-.765.164-1.285.164h-1.181l-.327 1.681h-1.378l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752zm-2.86-.481h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29z" />
  </svg>
);
const Html5Logo = ({ className }: LogoProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="#E34F26"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 18.434l5.373-1.53L18.59 4.413z" />
  </svg>
);
const Css3Logo = ({ className }: LogoProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.41 4.41h13.18l-1.214 13.69L12 19.61l-5.376-1.51-.36-4.04h2.61l.183 2.06 2.94.79 2.95-.79.31-3.44h-6.43l-.24-2.57h6.83l.24-2.55H5.62z"
      fill="#1572B6"
    />
    <path
      d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0z"
      fill="#1572B6"
      fillOpacity="0.3"
    />
  </svg>
);
const PostmanLogo = ({ className }: LogoProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="#FF6C37"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12 12-5.372 12-12S18.627 0 12 0zm5.123 7.187l-.957.683-.969-.683.969-.717.957.717zm-1.4 9.302l-.557-3.93-2.067 3.07-1.156-.776 2.62-3.892-3.566 1.262-.422-1.288 3.945-1.396L11.5 8.18l.776-1.156 3.07 2.067-.557-3.93 1.351-.234.557 3.93 2.067-3.07 1.156.776-2.62 3.892 3.566-1.262.422 1.288-3.945 1.396 3.07 2.067-.776 1.156-3.07-2.067.557 3.93-1.351.234z" />
  </svg>
);
const GitLogo = ({ className }: LogoProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="#F05032"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23.546 10.93L13.067.452c-.604-.604-1.582-.604-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
  </svg>
);
const TailwindLogo = ({ className }: LogoProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="#06B6D4"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.177-1.194-2.538-2.576-5.512-2.576z" />
  </svg>
);
const FigmaLogo = ({ className }: LogoProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.148 24a3.852 3.852 0 0 1-3.853-3.852 3.852 3.852 0 0 1 3.853-3.852h3.852v3.852A3.852 3.852 0 0 1 8.148 24z"
      fill="#0ACF83"
    />
    <path
      d="M4.295 12.296a3.852 3.852 0 0 1 3.853-3.852h3.852v7.704H8.148a3.852 3.852 0 0 1-3.853-3.852z"
      fill="#A259FF"
    />
    <path
      d="M4.295 4.59a3.852 3.852 0 0 1 3.853-3.851h3.852v7.703H8.148A3.852 3.852 0 0 1 4.295 4.59z"
      fill="#F24E1E"
    />
    <path
      d="M12 .739h3.852A3.852 3.852 0 0 1 19.705 4.59a3.852 3.852 0 0 1-3.853 3.852H12V.739z"
      fill="#FF7262"
    />
    <path
      d="M19.705 12.296a3.852 3.852 0 1 1-7.705 0 3.852 3.852 0 1 1 7.705 0z"
      fill="#1ABCFE"
    />
  </svg>
);

const TECH_STACK = [
  { label: "Laravel", Logo: LaravelLogo },
  { label: "CodeIgniter 4", Logo: CodeIgniterLogo },
  { label: "Next.js", Logo: NextjsLogo },
  { label: "PHP", Logo: PhpLogo },
  { label: "JavaScript", Logo: JavaScriptLogo },
  { label: "HTML5", Logo: Html5Logo },
  { label: "CSS3", Logo: Css3Logo },
  { label: "Postman", Logo: PostmanLogo },
  { label: "Git", Logo: GitLogo },
  { label: "Tailwind CSS", Logo: TailwindLogo },
  { label: "Figma", Logo: FigmaLogo },
] as const;

function PageContent() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [progressTriggered, setProgressTriggered] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const trigger = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 60)
          el.classList.add("active");
      });
    };
    trigger();
    window.addEventListener("scroll", trigger, { passive: true });
    return () => window.removeEventListener("scroll", trigger);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setProgressTriggered(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
    );
  };

  const handleContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100000,
          background: "var(--nav-bg)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border-soft)",
          height: "64px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 32px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'Helvetica Neue','Arial Black',sans-serif",
              fontSize: "15px",
              fontWeight: 900,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--text)",
            }}
          >
            DNR1SQ
          </span>
          <div
            className="hidden md:flex"
            style={{ gap: "32px", alignItems: "center" }}
          >
            {t.navLinks.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => scrollTo(NAV_LINKS[i])}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  letterSpacing: "0.05em",
                  transition: "color .2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = RED)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                {s}
              </button>
            ))}
            <LanguageToggleButton />
          </div>
          <button
            type="button"
            className="md:hidden flex"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              flexDirection: "column",
              gap: "5px",
              padding: "8px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "var(--text)",
                  transition: "all .3s",
                  transform:
                    menuOpen && i === 0
                      ? "rotate(45deg) translate(5px,5px)"
                      : menuOpen && i === 2
                        ? "rotate(-45deg) translate(5px,-5px)"
                        : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
        {menuOpen && (
          <div
            className="md:hidden"
            style={{
              background: "var(--mobile-menu-bg)",
              borderBottom: "1px solid var(--border-soft)",
              padding: "0 32px 16px",
            }}
          >
            {NAV_LINKS.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => scrollTo(s)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "14px 0",
                  borderBottom: "1px solid var(--border)",
                  background: "none",
                  border: "none",
                  borderBottomStyle: "solid",
                  borderBottomWidth: "1px",
                  borderBottomColor: "var(--border)",
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "14px",
                  color: "var(--text)",
                  textTransform: "capitalize",
                  cursor: "pointer",
                }}
              >
                {t.navLinks[i]}
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "16px" }}
                >
                  arrow_forward
                </span>
              </button>
            ))}
            <div style={{ paddingTop: "12px" }}>
              <LanguageToggleButton />
            </div>
          </div>
        )}
      </nav>
      <ThemeToggleButton />

      <main style={{ position: "relative", zIndex: 0 }}>
        {/* HERO */}
        <section
          id="beranda"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: "64px",
            scrollMarginTop: "64px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "76px",
              left: "32px",
              right: "32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text)",
              }}
            >
              {t.webDeveloper}
            </span>
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              20 Jun, 2026{" "}
              <span style={{ color: RED, fontSize: "18px", lineHeight: 1 }}>
                →
              </span>
            </span>
          </div>
          <div
            style={{
              width: "100%",
              padding: "0 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className="hero-word"
                style={{
                  fontSize: "clamp(72px,17vw,220px)",
                  display: "block",
                  textAlign: "center",
                  width: "100%",
                  userSelect: "none",
                }}
              >
                PORTOFOLIO
              </span>
              <div
                style={{
                  position: "absolute",
                  top: "30%",
                  left: "50%",
                  transform: "translate(-30%,-50%)",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              >
                <span
                  className="font-script"
                  style={{
                    fontSize: "clamp(28px,5vw,64px)",
                    color: RED,
                    display: "block",
                    whiteSpace: "nowrap",
                    lineHeight: 1.2,
                    textShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  Denis Risqi
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "32px",
              right: "32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              borderTop: "1px solid var(--border)",
              paddingTop: "16px",
            }}
          >
            {[
              "@dnr1sq",
              "dnr1sq.dev",
              "Trenggalek, Jawa Timur",
              "denisrisqi8@gmail.com",
            ].map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "11px",
                  fontWeight: 400,
                  color: "var(--text-muted)",
                  letterSpacing: "0.03em",
                }}
              >
                {item}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollTo("tentang")}
            style={{
              position: "absolute",
              bottom: "90px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              color: "var(--text-muted)",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {t.scroll}
            </span>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "18px", color: RED }}
            >
              arrow_downward
            </span>
          </button>
        </section>

        {/* ABOUT */}
        <section
          id="tentang"
          style={{
            padding: "100px 0",
            scrollMarginTop: "64px",
            background: "var(--bg-alt)",
          }}
        >
          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}
          >
            <div style={{ marginBottom: "48px" }} className="reveal">
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {t.profil}
              </span>
              <div className="divider" style={{ marginTop: "12px" }} />
            </div>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-16"
              style={{ alignItems: "start" }}
            >
              <div className="reveal">
                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(36px,5vw,60px)",
                    color: "var(--text)",
                    marginBottom: "24px",
                    lineHeight: 0.95,
                  }}
                >
                  {t.tentangSaya}
                  <br />
                  <span style={{ color: RED }}>{t.saya}</span>
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "16px",
                    lineHeight: 1.75,
                    color: "var(--text-muted)",
                    marginBottom: "16px",
                  }}
                >
                  {t.aboutP1}
                  <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                    DENIS RISQI ALLALUDIN
                  </strong>
                  {t.aboutP1b}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "var(--text-muted)",
                  }}
                >
                  {t.aboutP2}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "24px",
                    marginTop: "40px",
                    paddingTop: "32px",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  {STATS.map(([num, label]) => (
                    <div key={label.id}>
                      <div
                        className="font-display"
                        style={{
                          fontSize: "42px",
                          color: "var(--text)",
                          lineHeight: 1,
                        }}
                      >
                        {num}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Inter',sans-serif",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--text-muted)",
                          marginTop: "6px",
                        }}
                      >
                        {label[lang]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
                className="reveal"
              >
                {ABOUT_CARDS.map((card) => (
                  <div key={card.title.id} className="card">
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "20px",
                        color: RED,
                        display: "block",
                        marginBottom: "12px",
                      }}
                    >
                      {card.icon}
                    </span>
                    <div
                      className="font-display"
                      style={{
                        fontSize: "18px",
                        color: "var(--text)",
                        marginBottom: "4px",
                      }}
                    >
                      {card.title[lang]}
                    </div>
                    {"timeline" in card ? (
                      <ul style={{ marginTop: "16px", listStyle: "none" }}>
                        {card.timeline.map((item, i) => (
                          <li
                            key={i}
                            style={{
                              position: "relative",
                              paddingLeft: "18px",
                              marginBottom:
                                i < card.timeline.length - 1 ? "18px" : "0",
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                left: 0,
                                top: "7px",
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: RED,
                              }}
                            />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "12px",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "'Inter'",
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  color: "var(--text)",
                                }}
                              >
                                {item.role[lang]}
                              </span>
                              <span
                                style={{
                                  fontFamily: "'Inter'",
                                  fontSize: "10px",
                                  fontWeight: 700,
                                  color: RED,
                                  letterSpacing: "0.06em",
                                  textTransform: "uppercase",
                                  flexShrink: 0,
                                }}
                              >
                                {item.period}
                              </span>
                            </div>
                            <div
                              style={{
                                fontFamily: "'Inter'",
                                fontSize: "12px",
                                color: "var(--text-muted)",
                                marginTop: "2px",
                              }}
                            >
                              {item.place[lang]}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div
                        style={{
                          fontFamily: "'Inter'",
                          fontSize: "13px",
                          color: "var(--text-muted)",
                          lineHeight: 1.6,
                        }}
                      >
                        {card.desc[lang]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AWARDS */}
        <section
          id="awards"
          style={{ padding: "100px 0", scrollMarginTop: "64px" }}
        >
          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}
          >
            <div style={{ marginBottom: "48px" }} className="reveal">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}
                >
                  {t.prestasi}
                </span>
                <p
                  style={{
                    fontFamily: "'Inter'",
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    fontStyle: "italic",
                  }}
                >
                  {t.prestasiDesc}
                </p>
              </div>
              <div className="divider" style={{ marginBottom: "24px" }} />
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(36px,5vw,60px)",
                  color: "var(--text)",
                  lineHeight: 0.95,
                }}
              >
                {t.sertifikat1}
                <span style={{ color: RED }}>{t.sertifikat2}</span>
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                gap: "32px",
              }}
            >
              {AWARDS.map(({ image, icon, title, issuer, year, desc }, idx) => (
                <div key={`${title.id}-${idx}`} className="reveal">
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      marginBottom: "20px",
                      aspectRatio: "4/3",
                      background: "var(--surface)",
                      border: "1px solid var(--border-soft)",
                    }}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={title[lang]}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          filter: "grayscale(var(--img-grayscale))",
                          transition: "filter .5s,transform .5s",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedCertificate(image)}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLImageElement).style.filter =
                            "grayscale(0%)";
                          (
                            e.currentTarget as HTMLImageElement
                          ).style.transform = "scale(1.03)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLImageElement).style.filter =
                            "grayscale(var(--img-grayscale))";
                          (
                            e.currentTarget as HTMLImageElement
                          ).style.transform = "scale(1)";
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{
                            fontSize: "48px",
                            color: "var(--text-muted)",
                            opacity: 0.4,
                          }}
                        >
                          {icon}
                        </span>
                      </div>
                    )}
                    <span className="year-badge">{year}</span>
                  </div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "20px",
                      color: "var(--text)",
                      marginBottom: "4px",
                    }}
                  >
                    {title[lang]}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter'",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: RED,
                      marginBottom: "10px",
                    }}
                  >
                    {issuer[lang]}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter'",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "var(--text-muted)",
                    }}
                  >
                    {desc[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS — layout: project 1 full width, project 2 & 3 sejajar 50/50 */}
        <section
          id="proyek"
          style={{
            padding: "100px 0",
            background: "var(--bg-alt)",
            scrollMarginTop: "64px",
            overflowX: "hidden",
          }}
        >
          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}
          >
            {/* Header */}
            <div style={{ marginBottom: "56px" }} className="reveal">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}
                >
                  {t.galeri}
                </span>
                <p
                  style={{
                    fontFamily: "'Inter'",
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    fontStyle: "italic",
                  }}
                >
                  {t.galeriDesc}
                </p>
              </div>
              <div className="divider" style={{ marginBottom: "24px" }} />
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(36px,5vw,60px)",
                  color: "var(--text)",
                  lineHeight: 0.95,
                }}
              >
                {t.proyekSaya1}
                <span style={{ color: RED }}>{t.proyekSaya2}</span>
              </h2>
            </div>

            {/* PROJECT 01 — full width */}
            <div className="reveal" style={{ marginBottom: "48px" }}>
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  width: "100%",
                  paddingTop: "42.857%",
                  background: "var(--surface)",
                  border: "1px solid var(--border-soft)",
                  marginBottom: "24px",
                }}
              >
                {PROJECTS[0].image && (
                  <img
                    src={PROJECTS[0].image}
                    alt={PROJECTS[0].title[lang]}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "grayscale(var(--img-grayscale))",
                      transition: "filter .5s,transform .7s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.filter =
                        "grayscale(0%)";
                      (e.currentTarget as HTMLImageElement).style.transform =
                        "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.filter =
                        "grayscale(var(--img-grayscale))";
                      (e.currentTarget as HTMLImageElement).style.transform =
                        "scale(1)";
                    }}
                  />
                )}
                <span className="year-badge">{PROJECTS[0].year}</span>
                <span
                  className="font-display"
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "20px",
                    fontSize: "13px",
                    fontWeight: 900,
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  — 01
                </span>
              </div>
              {/* Info */}
              <div
                style={{
                  display: "grid",
                  gap: "32px",
                }}
                className="grid grid-cols-1 md:grid-cols-2"
              >
                <div>
                  <span
                    style={{
                      fontFamily: "'Inter'",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    {PROJECTS[0].category[lang]}
                  </span>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(22px,3vw,38px)",
                      color: "var(--text)",
                      lineHeight: 0.95,
                      overflowWrap: "break-word",
                    }}
                  >
                    {PROJECTS[0].title[lang]}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginTop: "12px",
                    }}
                  >
                    {PROJECTS[0].tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Inter'",
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "var(--text-muted)",
                      marginBottom: "16px",
                      overflowWrap: "break-word",
                    }}
                  >
                    {PROJECTS[0].desc[lang]}
                  </p>
                  <a href="/coming-soon" className="arrow-link" target="_blank">
                    {t.lihatLengkap}{" "}
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "14px" }}
                    >
                      north_east
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Divider between rows */}
            <div className="divider" style={{ marginBottom: "48px" }} />

            {/* PROJECT 02 & 03 — sejajar kiri kanan */}
            <div
              style={{
                display: "grid",
                gap: "32px",
              }}
              className="grid grid-cols-1 md:grid-cols-2"
            >
              {[PROJECTS[1], PROJECTS[2]].map((p) => (
                <div key={p.id} className="reveal">
                  {/* Image */}
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      width: "100%",
                      paddingTop: "65%",
                      background: "var(--surface)",
                      border: "1px solid var(--border-soft)",
                      marginBottom: "20px",
                    }}
                  >
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title[lang]}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          filter: "grayscale(var(--img-grayscale))",
                          transition: "filter .5s,transform .5s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLImageElement).style.filter =
                            "grayscale(0%)";
                          (
                            e.currentTarget as HTMLImageElement
                          ).style.transform = "scale(1.04)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLImageElement).style.filter =
                            "grayscale(var(--img-grayscale))";
                          (
                            e.currentTarget as HTMLImageElement
                          ).style.transform = "scale(1)";
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{
                            fontSize: "52px",
                            color: "var(--text-muted)",
                            opacity: 0.35,
                          }}
                        >
                          {p.category.id
                            ? "currency_bitcoin"
                            : "security"}
                        </span>
                      </div>
                    )}
                    <span className="year-badge">{p.year}</span>
                    <span
                      className="font-display"
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "16px",
                        fontSize: "12px",
                        fontWeight: 900,
                        letterSpacing: "0.1em",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      — {p.id}
                    </span>
                  </div>
                  {/* Info */}
                  <span
                    style={{
                      fontFamily: "'Inter'",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    {p.category[lang]}
                  </span>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(18px,2.2vw,28px)",
                      color: "var(--text)",
                      marginBottom: "10px",
                      lineHeight: 0.95,
                      overflowWrap: "break-word",
                    }}
                  >
                    {p.title[lang]}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter'",
                      fontSize: "13px",
                      lineHeight: 1.65,
                      color: "var(--text-muted)",
                      marginBottom: "12px",
                      overflowWrap: "break-word",
                    }}
                  >
                    {p.desc[lang]}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: "14px",
                    }}
                  >
                    {p.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href="/coming-soon" className="arrow-link">
                    {t.lihatLengkap}{" "}
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "13px" }}
                    >
                      north_east
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="kemampuan"
          ref={skillsRef}
          style={{ padding: "100px 0", scrollMarginTop: "64px" }}
        >
          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}
          >
            <div style={{ marginBottom: "48px" }} className="reveal">
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {t.kemampuan}
              </span>
              <div
                className="divider"
                style={{ marginTop: "12px", marginBottom: "24px" }}
              />
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(36px,5vw,60px)",
                  color: "var(--text)",
                  lineHeight: 0.95,
                }}
              >
                {t.teknologi1}
                <span style={{ color: RED }}>{t.teknologi2}</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="reveal">
                <p
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "15px",
                    lineHeight: 1.75,
                    color: "var(--text-muted)",
                    maxWidth: "360px",
                  }}
                >
                  {t.skillsDesc}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "32px",
                }}
                className="reveal"
              >
                {SKILLS_BARS.map(({ title, pct, rating, desc }) => (
                  <div key={title}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        marginBottom: "10px",
                        gap: "12px",
                      }}
                    >
                      <h3
                        className="font-display"
                        style={{ fontSize: "22px", color: "var(--text)" }}
                      >
                        {title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          flexShrink: 0,
                        }}
                      >
                        <div style={{ display: "flex", gap: "4px" }}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              style={{
                                width: "7px",
                                height: "7px",
                                borderRadius: "50%",
                                background: i < rating ? RED : "var(--surface)",
                                display: "inline-block",
                              }}
                            />
                          ))}
                        </div>
                        <span
                          style={{
                            fontFamily: "'Inter'",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: RED,
                          }}
                        >
                          {pct}%
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        height: "4px",
                        background: "var(--surface)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: progressTriggered ? `${pct}%` : "0%",
                          height: "100%",
                          background: RED,
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontFamily: "'Inter'",
                        fontSize: "12px",
                        color: "var(--text-muted)",
                        marginTop: "8px",
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: "80px" }} className="reveal">
              <span
                style={{
                  fontFamily: "'Inter'",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                {t.susunanTeknologi}
              </span>
              <div className="divider" style={{ marginBottom: "40px" }} />
              <h3
                className="font-display"
                style={{
                  fontSize: "clamp(24px,3vw,36px)",
                  color: "var(--text)",
                  marginBottom: "40px",
                }}
              >
                {t.bahasaAlat1}
                <span style={{ color: RED }}>{t.bahasaAlat2}</span>
              </h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "28px",
                }}
              >
                {TECH_STACK.map(({ label, Logo }) => {
                  const isHov = hoveredTech === label;
                  return (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "default",
                        opacity: isHov ? 1 : 0.5,
                        transition: "opacity .3s",
                      }}
                      onMouseEnter={() => setHoveredTech(label)}
                      onMouseLeave={() => setHoveredTech(null)}
                    >
                      <div
                        style={{
                          width: "56px",
                          height: "56px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: isHov ? RED_LIGHT : "var(--surface)",
                          transform: isHov
                            ? "translateY(-4px) scale(1.05)"
                            : "none",
                          transition: "all .3s",
                          border: `1px solid ${isHov ? RED : "var(--border)"}`,
                        }}
                      >
                        <Logo className="w-7 h-7" />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Inter'",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: isHov ? RED : "var(--text-muted)",
                          transition: "color .3s",
                          textAlign: "center",
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="kontak"
          style={{
            padding: "100px 0",
            background: "var(--bg-alt)",
            scrollMarginTop: "64px",
          }}
        >
          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}
          >
            <div style={{ marginBottom: "48px" }} className="reveal">
              <span
                style={{
                  fontFamily: "'Inter'",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {t.kontak}
              </span>
              <div className="divider" style={{ marginTop: "12px" }} />
            </div>
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                textAlign: "center",
              }}
              className="reveal"
            >
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(40px,6vw,80px)",
                  color: "var(--text)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                  marginBottom: "24px",
                }}
              >
                {t.contactTitle1}
                <span style={{ color: RED }}>{t.contactTitle2}</span>
                <br />
                {t.contactTitle3}
              </h2>
              <p
                style={{
                  fontFamily: "'Inter'",
                  fontSize: "15px",
                  lineHeight: 1.75,
                  color: "var(--text-muted)",
                  marginBottom: "48px",
                }}
              >
                {t.contactDesc}
              </p>
              <form
                action="mailto:denisrisqi8@gmail.com"
                method="post"
                encType="text/plain"
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    type="submit"
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "16px 52px",
                      background: "var(--text)",
                      color: "var(--bg)",
                      border: "none",
                      cursor: "pointer",
                      transition: "background .25s,transform .2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = RED;
                      e.currentTarget.style.transform = "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--text)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    {t.kirimPesan}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {selectedCertificate && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(0,0,0,0.88)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            paddingTop: "80px",
          }}
          onClick={() => setSelectedCertificate(null)}
        >
          <img
            src={selectedCertificate}
            alt="Certificate"
            style={{ maxWidth: "80vw", maxHeight: "80vh" }}
          />
        </div>
      )}

      <footer
        style={{
          padding: "40px 0",
          background: "var(--bg)",
          borderTop: "1px solid var(--border-soft)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <span
            style={{
              fontFamily: "'Helvetica Neue','Arial Black',sans-serif",
              fontSize: "14px",
              fontWeight: 900,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--text)",
            }}
          >
            DNR1SQ
          </span>
          <div style={{ display: "flex", gap: "32px" }}>
            {[
              {
                name: "GitHub",
                url: "https://github.com/densaaaa",
              },
              {
                name: "LinkedIn",
                url: "/coming-soon",
              },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color .2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = RED)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                {link.name}
              </a>
            ))}
          </div>
          <span
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: "var(--text-muted)",
            }}
          >
            © 2026 DNR1SQ. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ThemeStyles />
        <PageContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
