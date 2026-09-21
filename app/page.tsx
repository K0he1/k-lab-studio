import Image from "next/image";
import ContactForm from "./contact-form";

const projects = [
  {
    name: "日本の営業日カウンター",
    description: "祝日と有給休暇を考慮して、任意の月の営業日数を計算するWebアプリです。",
    url: "https://business-day.k-lab-studio.com",
    status: "LIVE",
  },
  {
    name: "iDeCo 積立投資シミュレーター",
    description: "掛金の所得控除、運用益、受取時の税額をまとめて概算するiDeCoシミュレーターです。",
    url: "https://ideco.k-lab-studio.com",
    status: "LIVE",
  },
  {
    name: "積立投資シミュレーター",
    description: "初期投資額、毎月の積立額、想定利回りから、資産推移と税引前の概算資産額を試算するWebアプリです。",
    url: "https://investment.k-lab-studio.com",
    status: "LIVE",
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <header className="site-header">
        <a className="brand" href="#top">Kohei Yamaguchi</a>
        <nav aria-label="メインナビゲーション">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a href="https://github.com/K0he1" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/kohei-yamaguchi-06429827a/" target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-layout">
          <div className="hero-content">
            <p className="eyebrow">SOFTWARE / CLOUD / LEARNING</p>
            <h1>K Lab Studio</h1>
            <p className="hero-copy">
              K Lab Studioは私のプロフィールや制作物を紹介しつつ、お問い合わせを受け付けるポートフォリオサイトです。
            </p>
            <div className="hero-links">
              <a className="button button-primary" href="#projects">Portfolio</a>
              <a className="button button-secondary" href="https://github.com/K0he1" target="_blank" rel="noreferrer">GitHub</a>
              <a className="button button-secondary" href="https://www.linkedin.com/in/kohei-yamaguchi-06429827a/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
          <figure className="hero-cat">
            <Image src="/cat.png" alt="こちらを見る猫" width={1254} height={1254} priority />
          </figure>
        </div>
      </section>

      <section className="section" id="about">
        <p className="eyebrow">ABOUT</p>
        <h2>Profile</h2>
        <p className="section-copy">
          AIを活用したアプリケーションを作っています。要件定義から設計、実装、テスト、クラウドへのデプロイなどをやっています。また、それらが実際にユーザーの課題解決や業務効率化に繋がることを意識しています。

          これまでData Scientistとして統計・データ分析に携わり、現在はSoftware DeveloperとしてPython、TypeScript、Azureなどを使った開発に取り組んでいます。個人では定量的判断に基づくFX・株価指数先物のトレードを行っており、データとアルゴリズムを使った意思決定にも関心があります。
        </p>
        <dl className="profile-facts">
          <div>
            <dt>現在</dt>
            <dd>PwC Japan / Software Developer</dd>
          </div>
          <div>
            <dt>学歴</dt>
            <dd>京都大学大学院・明治大学</dd>
          </div>
          <div>
            <dt>関心領域</dt>
            <dd>Webアプリケーション、GenAI、クラウド、データ活用</dd>
          </div>
          <div>
            <dt>個人活動</dt>
            <dd>FX・先物のクオンツトレード</dd>
          </div>
        </dl>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PROJECTS</p>
            <h2>Portfolio</h2>
          </div>
          <span className="project-count">{projects.length} projects</span>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.name}>
              <div className="project-card-top">
                <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="project-status">{project.status}</span>
              </div>
              <h3>
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noreferrer">{project.name}</a>
                ) : project.name}
              </h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="contact">
        <p className="eyebrow">CONTACT</p>
        <h2>Contact</h2>
        <p className="section-copy">
          仕事の依頼や制作物についてのお問い合わせはこちらから。
        </p>
        <ContactForm />
        <p className="contact-privacy-note">
          個人情報の取り扱いについては、<a href="/privacy">プライバシーポリシー</a>をご確認ください。
        </p>
      </section>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Kohei Yamaguchi</span>
        <span className="footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="https://github.com/K0he1" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/kohei-yamaguchi-06429827a/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </span>
      </footer>
    </main>
  );
}
