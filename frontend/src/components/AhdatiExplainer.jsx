import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n.jsx';

/* ── Scroll Reveal ── */
function useReveal(th = 0.15) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); o.unobserve(el); } }, { threshold: th });
    o.observe(el);
    return () => o.disconnect();
  }, [th]);
  return [ref, show];
}

function Rv({ children, className = '', delay = '' }) {
  const [ref, show] = useReveal();
  return <div ref={ref} className={`rv ${show ? 'show' : ''} ${delay} ${className}`}>{children}</div>;
}

/* ── Progress ── */
function Prog({ label, pct, color = 'prog-gold' }) {
  const [ref, show] = useReveal(0.5);
  return (
    <div className="prog-bar-wrap" ref={ref}>
      <div className="prog-label"><span>{label}</span><span className="pct">{pct}%</span></div>
      <div className="prog-track"><div className={`prog-fill ${color}`} style={{ width: show ? `${pct}%` : '0%' }} /></div>
    </div>
  );
}

/* ── Typed Text ── */
function Typed({ text, delay = 0 }) {
  const [out, setOut] = useState('');
  const [go, setGo] = useState(false);
  const [ref, vis] = useReveal(0.5);
  useEffect(() => { if (vis && !go) { const t = setTimeout(() => setGo(true), delay); return () => clearTimeout(t); } }, [vis, delay, go]);
  useEffect(() => { if (!go) return; let i = 0; const iv = setInterval(() => { i++; setOut(text.slice(0, i)); if (i >= text.length) clearInterval(iv); }, 22); return () => clearInterval(iv); }, [go, text]);
  return <span ref={ref}>{out}{out.length < text.length && <span style={{ opacity: 0.4 }}>▌</span>}</span>;
}

/* ── Language Switch Button ── */
function LangSwitch() {
  const { t, toggle, lang } = useLang();
  return (
    <button
      onClick={toggle}
      className="lang-switch-btn"
      aria-label="Switch language"
      title={t.switchLabel}
    >
      <span className="lang-switch-icon">{t.switchIcon}</span>
      <span className="lang-switch-label">{t.switchLabel}</span>
    </button>
  );
}

/* ── Navbar ── */
function Nav() {
  const [s, setS] = useState(false);
  const { t } = useLang();
  useEffect(() => { const h = () => setS(window.scrollY > 40); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  return (
    <nav className={`ahdati-nav ${s ? 'scrolled' : ''}`}>
      <div className="container d-flex align-items-center justify-content-between">
        <a href="#" className="brand">{t.navBrand1}<em>{t.navBrand2}</em></a>
        <div className="d-flex align-items-center gap-2">
          <div className="nav-links d-none d-md-flex gap-1">
            <a href="#how">{t.navHow}</a>
            <a href="#details">{t.navDetails}</a>
            <a href="#tracking">{t.navTracking}</a>
          </div>
          <LangSwitch />
        </div>
      </div>
    </nav>
  );
}

/* ── Browser Frame ── */
function BrowserFrame({ title, children }) {
  return (
    <div className="browser-frame">
      <div className="browser-topbar">
        <span className="brdot brdot-r" /><span className="brdot brdot-y" /><span className="brdot brdot-g" />
        <span>{title}</span>
      </div>
      <div className="browser-content">{children}</div>
    </div>
  );
}


/* ═══════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════ */
export default function AhdatiExplainer() {
  const { t, lang } = useLang();
  const isEn = lang === 'en';

  /* Dynamically swap Bootstrap RTL/LTR + html attributes */
  useEffect(() => {
    document.documentElement.setAttribute('dir', t.dir);
    document.documentElement.setAttribute('lang', t.lang);
    document.body.style.fontFamily = t.fontFamily;

    // Swap bootstrap CSS
    let bsLink = document.getElementById('bootstrap-dir-css');
    if (!bsLink) {
      bsLink = document.createElement('link');
      bsLink.id = 'bootstrap-dir-css';
      bsLink.rel = 'stylesheet';
      document.head.appendChild(bsLink);
    }
    bsLink.href = t.bootstrapCss;

    // Remove the static one from index.html on first swap
    const oldLinks = document.querySelectorAll('link[href*="bootstrap"][href*=".min.css"]');
    oldLinks.forEach(l => { if (l.id !== 'bootstrap-dir-css') l.remove(); });

    // Add Inter font for English
    if (isEn) {
      let interLink = document.getElementById('inter-font-css');
      if (!interLink) {
        interLink = document.createElement('link');
        interLink.id = 'inter-font-css';
        interLink.rel = 'stylesheet';
        interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
        document.head.appendChild(interLink);
      }
    }

    document.title = isEn ? 'Ahdati — Remote Training & Outsourcing Platform' : 'عهدتي — منصة التدريب والتعهيد عن بُعد';
  }, [t, isEn]);

  const textAlign = isEn ? 'left' : 'right';

  return (
    <>
      <Nav />

      {/* ━━━ HERO ━━━ */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" style={{ textAlign }}>
              <Rv><div className="hero-tag"><i className="bi bi-stars"></i> {t.heroTag}</div></Rv>
              <Rv delay="rv-d1">
                <h1 className="hero-title">{t.heroTitle1}<span className="accent">{t.heroAccent}</span>{t.heroTitle2}<br />{t.heroTitle3}</h1>
              </Rv>
              <Rv delay="rv-d2">
                <p className="hero-desc" style={{ marginLeft: isEn ? '0' : 'auto', marginRight: isEn ? 'auto' : '0' }}>{t.heroDesc}</p>
              </Rv>
              <Rv delay="rv-d3">
                <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start">
                  <a href="#how" className="btn-gold"><i className="bi bi-play-circle-fill"></i> {t.heroBtn1}</a>
                  <a href="#details" className="btn-brown-outline"><i className="bi bi-grid-3x3-gap-fill"></i> {t.heroBtn2}</a>
                </div>
              </Rv>
            </div>
            <div className="col-lg-6">
              <Rv delay="rv-d2">
                <div className="position-relative">
                  <div className="hero-float-card">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div style={{ width: 50, height: 50, borderRadius: 14, background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.3rem' }}>
                        <i className="bi bi-mortarboard-fill"></i>
                      </div>
                      <div>
                        <div className="fw-bold" style={{ color: 'var(--brown)', fontSize: '0.95rem' }}>{t.heroCardTitle}</div>
                        <small style={{ color: 'var(--text-muted)' }}>{t.heroCardSub}</small>
                      </div>
                    </div>
                    <div className="d-flex gap-2 flex-wrap mb-3">
                      <span className="badge rounded-pill" style={{ background: 'var(--gold-100)', color: 'var(--gold-dark)', fontSize: '0.72rem', fontWeight: 600 }}>{t.heroCardB1}</span>
                      <span className="badge rounded-pill" style={{ background: 'var(--gold-100)', color: 'var(--gold-dark)', fontSize: '0.72rem', fontWeight: 600 }}>{t.heroCardB2}</span>
                      <span className="badge rounded-pill" style={{ background: 'var(--cream-dark)', color: 'var(--brown)', fontSize: '0.72rem', fontWeight: 600 }}>{t.heroCardB3}</span>
                    </div>
                    <div className="mb-1"><small className="fw-semibold" style={{ color: 'var(--text-body)' }}>{t.heroCardProgress}</small></div>
                    <div className="prog-track"><div className="prog-fill prog-gold" style={{ width: '92%', transition: 'width 2.5s ease 0.8s' }} /></div>
                    <div className={isEn ? 'text-start mt-1' : 'text-start mt-1'}><small className="fw-bold" style={{ color: 'var(--gold)' }}>92%</small></div>
                  </div>
                  <div className="hero-mini-badge" style={{ top: -18, left: isEn ? 'auto' : -20, right: isEn ? -20 : 'auto' }}>
                    <i className="bi bi-check-circle-fill" style={{ color: '#6BCB77' }}></i> {t.heroBadge1}
                  </div>
                  <div className="hero-mini-badge" style={{ bottom: -12, right: isEn ? 'auto' : -16, left: isEn ? -16 : 'auto', animationDelay: '-2s' }}>
                    <i className="bi bi-star-fill" style={{ color: 'var(--gold)' }}></i> {t.heroBadge2}
                  </div>
                </div>
              </Rv>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 8 STEPS ━━━ */}
      <section className="section-block bg-white" id="how">
        <div className="container">
          <div className="text-center mb-5">
            <Rv><div className="section-badge">{t.stepsBadge}</div></Rv>
            <Rv delay="rv-d1"><h2 className="section-heading">{t.stepsHeading}</h2></Rv>
            <Rv delay="rv-d2"><p className="section-sub mx-auto">{t.stepsSub}</p></Rv>
          </div>
          <div className="row g-4">
            {t.steps.map((s, i) => (
              <div className="col-xl-3 col-md-6" key={i}>
                <Rv delay={`rv-d${Math.min(i % 4 + 1, 4)}`}>
                  <div className="step-card" style={{ textAlign }}>
                    <div className="step-number">{String(i + 1).padStart(2, '0')}</div>
                    <h5><i className={`bi ${t.stepsIcons[i]} ${isEn ? 'me-1' : 'me-1'}`} style={{ color: 'var(--gold)' }}></i> {s.t}</h5>
                    <p>{s.d}</p>
                  </div>
                </Rv>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ COURSE DETAIL ━━━ */}
      <section className="section-block bg-cream" id="details">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5" style={{ textAlign }}>
              <Rv><div className="section-badge"><i className="bi bi-1-circle-fill"></i> {t.courseBadge}</div></Rv>
              <Rv delay="rv-d1"><h2 className="section-heading">{t.courseHeading}</h2></Rv>
              <Rv delay="rv-d2"><p className="section-sub">{t.courseSub}</p></Rv>
            </div>
            <div className="col-lg-7">
              <Rv delay="rv-d2">
                <BrowserFrame title={t.courseFrame}>
                  <div className="d-flex gap-3 align-items-start flex-wrap">
                    <div style={{ width: 140, height: 100, borderRadius: 14, background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', flexShrink: 0, boxShadow: 'var(--gold-glow)' }}>🎓</div>
                    <div style={{ flex: 1, minWidth: 200, textAlign }}>
                      <h6 className="fw-bold mb-1" style={{ color: 'var(--brown)' }}>{t.courseTitle}</h6>
                      <p className="mb-2" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.courseDesc}</p>
                      <div className="d-flex gap-2 flex-wrap">
                        <span className="badge rounded-pill" style={{ background: 'var(--gold-100)', color: 'var(--gold-dark)', fontWeight: 600 }}>{t.courseB1}</span>
                        <span className="badge rounded-pill" style={{ background: 'var(--gold-100)', color: 'var(--gold-dark)', fontWeight: 600 }}>{t.courseB2}</span>
                      </div>
                    </div>
                  </div>
                </BrowserFrame>
              </Rv>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ EXAM RESULTS — DARK ━━━ */}
      <section className="section-block bg-dark">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className={`col-lg-6 ${isEn ? 'order-lg-2' : 'order-lg-2'}`} style={{ textAlign }}>
              <Rv><div className="section-badge"><i className="bi bi-bar-chart-fill"></i> {t.examBadge}</div></Rv>
              <Rv delay="rv-d1"><h2 className="section-heading">{t.examHeading}</h2></Rv>
              <Rv delay="rv-d2"><p className="section-sub">{t.examSub}</p></Rv>
            </div>
            <div className="col-lg-6 order-lg-1">
              <Rv delay="rv-d2">
                <BrowserFrame title={t.examFrame}>
                  <Prog label={t.examNames[0]} pct={92} color="prog-gold" />
                  <Prog label={t.examNames[1]} pct={85} color="prog-gold" />
                  <Prog label={t.examNames[2]} pct={78} color="prog-bronze" />
                  <Prog label={t.examNames[3]} pct={65} color="prog-silver" />
                  <div className="winner-card mt-3">
                    <div className="trophy">🏆</div>
                    <div className="score">92%</div>
                    <div className="name">{t.examWinner}</div>
                    <div className="badge-rec">{t.examWinnerBadge}</div>
                  </div>
                </BrowserFrame>
              </Rv>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ CHAT & MEETING ━━━ */}
      <section className="section-block bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <Rv><div className="section-badge"><i className="bi bi-chat-dots-fill"></i> {t.chatBadge}</div></Rv>
            <Rv delay="rv-d1"><h2 className="section-heading">{t.chatHeading}</h2></Rv>
            <Rv delay="rv-d2"><p className="section-sub mx-auto">{t.chatSub}</p></Rv>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <Rv>
                <BrowserFrame title={t.chatFrame}>
                  <div className="chat-bubble chat-c"><Typed text={t.chatMsg1} delay={300} /></div>
                  <div className="chat-bubble chat-r"><Typed text={t.chatMsg2} delay={1500} /></div>
                  <div className="chat-bubble chat-l"><Typed text={t.chatMsg3} delay={3000} /></div>
                  <div className="chat-bubble chat-c"><Typed text={t.chatMsg4} delay={4500} /></div>
                </BrowserFrame>
              </Rv>
            </div>
            <div className="col-lg-6">
              <Rv delay="rv-d2">
                <div className="step-card h-100 d-flex flex-column justify-content-center text-center">
                  <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>📅</div>
                  <h5 style={{ color: 'var(--gold-dark)' }}>{t.meetingTitle}</h5>
                  <div className="p-3 rounded-3 mt-3" style={{ background: 'var(--cream)', textAlign }}>
                    <p className="mb-2" style={{ fontSize: '0.88rem' }}>📌 <strong>{t.meetingInterview}</strong> {t.meetingInterviewVal}</p>
                    <p className="mb-2" style={{ fontSize: '0.88rem' }}>📅 <strong>{t.meetingDate}</strong> {t.meetingDateVal}</p>
                    <p className="mb-2" style={{ fontSize: '0.88rem' }}>⏰ <strong>{t.meetingTime}</strong> {t.meetingTimeVal}</p>
                    <p className="mb-0" style={{ fontSize: '0.88rem' }}>🔗 <strong>{t.meetingLink}</strong> <span style={{ color: 'var(--gold-dark)' }}>meet.ahdati.sa/...</span></p>
                  </div>
                </div>
              </Rv>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ CONTRACT ━━━ */}
      <section className="section-block bg-cream">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5" style={{ textAlign }}>
              <Rv><div className="section-badge"><i className="bi bi-file-earmark-text-fill"></i> {t.contractBadge}</div></Rv>
              <Rv delay="rv-d1"><h2 className="section-heading">{t.contractHeading}</h2></Rv>
              <Rv delay="rv-d2"><p className="section-sub">{t.contractSub}</p></Rv>
            </div>
            <div className="col-lg-7">
              <Rv delay="rv-d2">
                <div className="contract-box">
                  <div className="c-header"><h5>{t.contractTitle}</h5><small style={{ color: 'var(--text-muted)' }}>{t.contractNum}</small></div>
                  {t.contractRows.map((r, i) => (
                    <div className="c-row" key={i}>
                      <span className="lbl">{r.lbl}</span>
                      <span className="val" style={r.gold ? { color: 'var(--gold-dark)' } : {}}>{r.val}</span>
                    </div>
                  ))}
                  <div className="c-stamp">{t.contractStamp}</div>
                </div>
              </Rv>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ JOBS + ATTENDANCE — DARK ━━━ */}
      <section className="section-block bg-dark" id="tracking">
        <div className="container">
          <div className="text-center mb-5">
            <Rv><div className="section-badge"><i className="bi bi-clipboard-data-fill"></i> {t.trackBadge}</div></Rv>
            <Rv delay="rv-d1"><h2 className="section-heading">{t.trackHeading}</h2></Rv>
            <Rv delay="rv-d2"><p className="section-sub mx-auto">{t.trackSub}</p></Rv>
          </div>

          <Rv>
            <div className="row g-3 mb-5">
              {t.jobs.map((j, i) => (
                <div className="col-lg-3 col-6" key={i}>
                  <Rv delay={`rv-d${Math.min(i + 1, 4)}`}>
                    <div className="job-mini" style={{ textAlign }}>
                      <div className="ico">{j.ico}</div>
                      <h6>{j.t}</h6>
                      <p>{j.d}</p>
                      <span className={`badge rounded-pill ${j.b}`} style={{ fontSize: '0.72rem' }}>{j.s}</span>
                    </div>
                  </Rv>
                </div>
              ))}
            </div>
          </Rv>

          <Rv>
            <BrowserFrame title={t.attFrame}>
              <div className="table-responsive">
                <table className="table tbl-att mb-0">
                  <thead><tr>{t.attCols.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
                  <tbody>
                    {t.attRows.map((r, i) => (
                      <tr key={i}>
                        <td>{r.name}</td><td>{r.in_}</td><td>{r.out}</td><td>{r.brk}</td><td>{r.hrs}</td>
                        <td><span className={`badge rounded-pill ${r.b}`}>{r.st}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </BrowserFrame>
          </Rv>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="ahdati-footer">
        <div className="container">
          <div className="f-brand">{t.footerBrand}</div>
          <p className="f-desc">{t.footerDesc}</p>
          <p className="f-flag">{t.footerFlag}</p>
          <hr />
          <p className="f-copy">{t.footerCopy}</p>
        </div>
      </footer>
    </>
  );
}
