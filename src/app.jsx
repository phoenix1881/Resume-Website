// Resume Website – single-file React component
// Drop this into a Vite/React project (e.g., src/App.jsx) and run.
// Edit the DATA object to update your content. Uses Tailwind for styling.

import { useEffect, useMemo, useState } from "react";

const DATA = {
  name: "Tejdeep Chippa",
  headline: "AI Researcher · Machine Learning Engineer",
  location: "New York, NY",
  email: "tejdeep2003@gmail.com",
  phone: "+1 (336) 480-5958",
  website: "",
  linkedin: "https://www.linkedin.com/in/tejdeep-chippa/",
  github: "https://github.com/phoenix1881",
  summary:
    "AI/ML engineer with hands‑on experience in robotics (SLAM, navigation), vision (YOLOv8, MixVPR, DINOv2), and MLOps (FastAPI, Docker, MLflow). Strong track record of building scalable systems, benchmarking models, and delivering reproducible research on HPC.",
  skills: [
    "Python","C","C++","JavaScript","SQL","Java","R",
    "PyTorch","TensorFlow","Keras","OpenCV","Pandas","NumPy",
    "FastAPI","Docker","MLflow","Prometheus","Grafana",
    "Git","Linux","ROS","Gazebo","CARLA","React","HTML","CSS","Bootstrap",
  ],
  experiences: [
    {
      role: "AI Researcher",
      org: "Self Drive – Vertically Integrated Project (NYU)",
      period: "Aug 2025 – Present",
      bullets: [
        "Developing SLAM + navigation stack on Earth Rover (ROS Noetic) achieving ~90% localization accuracy in dynamic indoor environments.",
        "Integrated MixVPR, DINOv2, and SIFT/ORB for viewpoint‑/lighting‑robust waypoint detection (≈3× improvement).",
        "Optimized A* and planners to cut simulated navigation failures by ~40% in Gazebo.",
      ],
    },

    {
      role: "Software Engineering Intern",
      org: "Reliance Jio Platforms",
      period: "May 2023 – Jul 2023",
      bullets: [
        "Built YOLOv8 multi‑label attribute extractor on 25k+ fashion images (sleeve length, neck shape, etc.).",
        "Benchmarked YOLOv8 vs. branched CNNs: +10% accuracy with comparable throughput on DeepFashion/Fashionpedia.",
        "Productionized preprocessing/training workflows for scalable real‑time deployment in AJIO infra.",
      ],
    },
    {
      role: "Undergraduate Researcher",
      org: "TavLab, IIIT Delhi",
      period: "Dec 2022 – May 2023",
      bullets: [
        "Explored cross‑virus generalization: transferred transformer‑based strain predictors from COVID‑19 to MERS/Ebola using genome embeddings.",
        "Designed pipelines with latent‑space analysis, sequence modeling, and cross‑validation across 3+ virus datasets.",
      ],
    },
  ],
  projects: [
    {
      name: "Dr. Dialog: AI for Everyday Health Queries",
      link: "#",
      bullets: [
        "Modular healthcare chatbot powered by TinyLLaMA 1.1B for clinical‑style Q&A across diverse intents.",
        "MLOps stack: FastAPI + Docker + MLflow; REST serving, experiment tracking, and reproducibility.",
        "Live monitoring with Prometheus/Grafana; load‑tested 100+ concurrent users via Locust & CI/CD hooks.",
      ],
    },
    {
      name: "Label‑Efficient Steering Control with I‑JEPA (CARLA)",
      link: "#",
      bullets: [
        "I‑JEPA with ViT backbone on 86k unlabeled frames; block‑masked pretraining with cosine + variance losses.",
        "Sampling strategies (random/spike‑only/balanced) to address label imbalance; balanced improved rare turns.",
        "Achieved 0.0018 MSE using 5–11% labeled data; ran on A100/V100 with scheduled pretraining + reproducible checkpoints.",
      ],
    },
    {
      name: "AGNews Text Classification with LoRA",
      link: "#",
      bullets: [
        "RoBERTa‑base + LoRA (667k trainable params) reached 88.42% accuracy under 1M token budget.",
        "Tuned rank/alpha/dropout on Q/K matrices via HuggingFace PEFT; AdamW + stratified sampling for stability.",
        "Reproducible training on NYU HPC infrastructure using HuggingFace Trainer.",
      ],
    },
  ],
  education: [
    {
      degree: "M.S., Computer Engineering (GPA: 4.0)",
      school: "New York University",
      period: "Expected May 2026",
      bullets: [],
    },
    {
      degree: "B.Tech, Electronics & Communications (GPA: 8.29/10)",
      school: "IIIT Delhi",
      period: "Jan 2020 – May 2024",
      bullets: [],
    },
  ],
  awards: [],
};

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold tracking-tight mb-3 print:mt-4">{title}</h2>
      <div className="space-y-3 text-sm leading-6">{children}</div>
    </section>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-block rounded-full px-3 py-1 text-xs border border-gray-300 dark:border-gray-700">
      {children}
    </span>
  );
}

export default function ResumeSite() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: DATA.name,
      jobTitle: DATA.headline,
      url: DATA.website,
      email: `mailto:${DATA.email}`,
      telephone: DATA.phone,
      sameAs: [DATA.linkedin, DATA.github],
      address: {
        "@type": "PostalAddress",
        addressLocality: DATA.location,
      },
    }),
    []
  );

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    } catch {}
  };

  const handleDownloadVCF = () => {
    const vcf = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${DATA.name};;;`,
      `FN:${DATA.name}`,
      `TITLE:${DATA.headline}`,
      `TEL;TYPE=CELL:${DATA.phone}`,
      `EMAIL;TYPE=INTERNET:${DATA.email}`,
      `URL:${DATA.website}`,
      "END:VCARD",
    ].join("\n");
    const blob = new Blob([vcf], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${DATA.name.replaceAll(" ", "_")}.vcf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-neutral-100 print:bg-white">
      {/* JSON‑LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Print styles (slightly denser) */}
      <style>{`
        @media print {
          @page { margin: 0.5in; }
          a[href]::after { content: ""; }
          button { display: none !important; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="max-w-3xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{DATA.name}</h1>
            <p className="text-sm mt-1 opacity-90">{DATA.headline}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-xs opacity-90">
              <a className="hover:underline" href={`mailto:${DATA.email}`}>{DATA.email}</a>
              <span>•</span>
              <a className="hover:underline" href={`tel:${DATA.phone}`}>{DATA.phone}</a>
              <span>•</span>
              <a className="hover:underline" href={DATA.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <span>•</span>
              <a className="hover:underline" href={DATA.github} target="_blank" rel="noreferrer">GitHub</a>
              <span>•</span>
              <span>{DATA.location}</span>
            </div>
          </div>

          <div className="no-print flex flex-col gap-2 items-end">
            <div className="flex gap-2">
              <button onClick={() => window.print()} className="rounded-2xl px-3 py-1.5 text-xs border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-neutral-900">Print / Save PDF</button>
              <button onClick={handleCopyUrl} className="rounded-2xl px-3 py-1.5 text-xs border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-neutral-900">Copy Link</button>
            </div>
            <div className="flex gap-2">
              <button onClick={handleDownloadVCF} className="rounded-2xl px-3 py-1.5 text-xs border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-neutral-900">Download vCard</button>
              <button onClick={() => setDark((d) => !d)} className="rounded-2xl px-3 py-1.5 text-xs border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-neutral-900">{dark ? "Light" : "Dark"} mode</button>
            </div>
          </div>
        </header>

        {/* Summary */}
        <Section title="Summary">
          <p>{DATA.summary}</p>
        </Section>

        {/* Skills */}
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section title="Experience">
          {DATA.experiences.map((e, i) => (
            <div key={i} className="border border-gray-200 dark:border-neutral-800 rounded-2xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="font-medium">{e.role} · {e.org}</div>
                <div className="text-xs opacity-80">{e.period}</div>
              </div>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                {e.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* Projects */}
        <Section title="Projects">
          <div className="grid md:grid-cols-2 gap-4">
            {DATA.projects.map((p, i) => (
              <a
                key={i}
                href={p.link}
                target={p.link?.startsWith("http") ? "_blank" : undefined}
                rel={p.link?.startsWith("http") ? "noreferrer" : undefined}
                className="block border border-gray-200 dark:border-neutral-800 rounded-2xl p-4 hover:bg-gray-50 dark:hover:bg-neutral-900"
              >
                <div className="font-medium">{p.name}</div>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  {p.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section title="Education">
          {DATA.education.map((ed, i) => (
            <div key={i} className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <div className="font-medium">{ed.degree}</div>
                <div className="text-sm opacity-90">{ed.school}</div>
                {ed.bullets?.length ? (
                  <ul className="list-disc ml-5 mt-1 space-y-1">
                    {ed.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="text-xs opacity-80">{ed.period}</div>
            </div>
          ))}
        </Section>

        {/* Awards */}
        {DATA.awards?.length ? (
          <Section title="Awards">
            <ul className="list-disc ml-5 space-y-1">
              {DATA.awards.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </Section>
        ) : null}

        {/* Footer */}
        <footer className="mt-10 text-xs opacity-70">
          <div>© {new Date().getFullYear()} {DATA.name}. Last updated {new Date().toLocaleDateString()}.</div>
          <div className="mt-1">This page is lightweight, linkable, and printable. No downloads required.</div>
        </footer>
      </div>
    </div>
  );
}
