export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(73,99,96,0.22),_transparent_34%),linear-gradient(135deg,_#0f172a_0%,_#1e293b_45%,_#111827_100%)] px-6 py-16 text-white sm:px-8 lg:px-12">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center rounded-[32px] border border-white/10 bg-white/8 px-6 py-10 shadow-[0_25px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-10 lg:px-16 lg:py-16">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
            <span className="mr-2 h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
            Status: Under Maintenance
          </span>
        </div>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
              Portfolio Update
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-7xl">
              Tampilan baru sedang disiapkan.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Website portfolio ini sedang dalam proses redesain agar tampil lebih modern, clean, dan lebih representatif. Mohon bersabar, kami akan segera mengunggah versi terbaru.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Progress
                </p>
                <p className="mt-2 text-3xl font-bold text-white">25%</p>
              </div>
              <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
                In Development
              </div>
            </div>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500" />
            </div>

            <div className="mt-8 space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">Apa yang sedang diperbarui?</p>
                <p className="mt-2 leading-7">Desain visual, struktur konten, dan pengalaman navigasi agar portofolio lebih menarik saat dilihat.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">Kapan siap?</p>
                <p className="mt-2 leading-7">Segera setelah proses finishing dan testing selesai.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
