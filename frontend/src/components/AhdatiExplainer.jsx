import React, { useEffect, useRef, useState } from 'react';

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

/* ── Navbar ── */
function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => { const h = () => setS(window.scrollY > 40); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  return (
    <nav className={`ahdati-nav ${s ? 'scrolled' : ''}`}>
      <div className="container d-flex align-items-center justify-content-between">
        <a href="#" className="brand">عهد<em>تي</em></a>
        <div className="nav-links d-none d-md-flex gap-1">
          <a href="#how">كيف تعمل؟</a>
          <a href="#details">التفاصيل</a>
          <a href="#tracking">التتبع</a>
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
  return (
    <>
      <Nav />

      {/* ━━━ HERO ━━━ */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <Rv><div className="hero-tag"><i className="bi bi-stars"></i> منصة سعودية مبتكرة</div></Rv>
              <Rv delay="rv-d1">
                <h1 className="hero-title">مستقبل <span className="accent">التدريب</span> والتعهيد<br />عن بُعد في المملكة</h1>
              </Rv>
              <Rv delay="rv-d2">
                <p className="hero-desc">نربط الشركات بأفضل الكوادر البشرية المؤهلة والمختبرة مسبقاً عبر نظام تدريب واختبار ذكي يضمن الكفاءة قبل التوظيف.</p>
              </Rv>
              <Rv delay="rv-d3">
                <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start">
                  <a href="#how" className="btn-gold"><i className="bi bi-play-circle-fill"></i> شاهد كيف تعمل</a>
                  <a href="#details" className="btn-brown-outline"><i className="bi bi-grid-3x3-gap-fill"></i> المميزات</a>
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
                        <div className="fw-bold" style={{ color: 'var(--brown)', fontSize: '0.95rem' }}>كورس خدمة العملاء</div>
                        <small style={{ color: 'var(--text-muted)' }}>شركة النخبة للخدمات</small>
                      </div>
                    </div>
                    <div className="d-flex gap-2 flex-wrap mb-3">
                      <span className="badge rounded-pill" style={{ background: 'var(--gold-100)', color: 'var(--gold-dark)', fontSize: '0.72rem', fontWeight: 600 }}>📄 12 درس</span>
                      <span className="badge rounded-pill" style={{ background: 'var(--gold-100)', color: 'var(--gold-dark)', fontSize: '0.72rem', fontWeight: 600 }}>📝 اختبار نهائي</span>
                      <span className="badge rounded-pill" style={{ background: 'var(--cream-dark)', color: 'var(--brown)', fontSize: '0.72rem', fontWeight: 600 }}>🖼️ صور توضيحية</span>
                    </div>
                    <div className="mb-1"><small className="fw-semibold" style={{ color: 'var(--text-body)' }}>نسبة النجاح</small></div>
                    <div className="prog-track"><div className="prog-fill prog-gold" style={{ width: '92%', transition: 'width 2.5s ease 0.8s' }} /></div>
                    <div className="text-start mt-1"><small className="fw-bold" style={{ color: 'var(--gold)' }}>92%</small></div>
                  </div>
                  <div className="hero-mini-badge" style={{ top: -18, left: -20 }}>
                    <i className="bi bi-check-circle-fill" style={{ color: '#6BCB77' }}></i> تم قبول المرشح
                  </div>
                  <div className="hero-mini-badge" style={{ bottom: -12, right: -16, animationDelay: '-2s' }}>
                    <i className="bi bi-star-fill" style={{ color: 'var(--gold)' }}></i> ترشيح ذهبي ⭐
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
            <Rv><div className="section-badge">كيف تعمل المنصة؟</div></Rv>
            <Rv delay="rv-d1"><h2 className="section-heading">رحلة من التدريب إلى التوظيف</h2></Rv>
            <Rv delay="rv-d2"><p className="section-sub mx-auto">ثمان خطوات واضحة تضمن جودة المرشح قبل وصوله للشركة</p></Rv>
          </div>
          <div className="row g-4">
            {[
              { n: '01', i: 'bi-building', t: 'الشركة تنشر كورس', d: 'تسجل الشركة وتنشئ كورس تدريبي مع اختبارات تقييمية وصور توضيحية' },
              { n: '02', i: 'bi-person-plus-fill', t: 'المرشح يتقدّم', d: 'ينشئ حسابه ويرفق سيرته الذاتية وخبراته ويطلب التدريب' },
              { n: '03', i: 'bi-journal-check', t: 'التدريب والاختبار', d: 'يشاهد الكورس ويخوض الاختبار والنظام يحسب النسبة تلقائياً' },
              { n: '04', i: 'bi-award-fill', t: 'الأدمن يُرشّح الأفضل', d: 'عهدتي تختار أعلى النسب وترسل ملفاتهم للشركة صاحبة الكورس' },
              { n: '05', i: 'bi-chat-dots-fill', t: 'الشات والمقابلة', d: 'يُفتح شات مباشر ويُرسل النظام ملف الموعد ورسالة مؤتمتة' },
              { n: '06', i: 'bi-file-earmark-text-fill', t: 'العقد الرسمي', d: 'تحدد الشركة الراتب ومدة العقد ويُنشأ عقد رسمي مؤتمت' },
              { n: '07', i: 'bi-briefcase-fill', t: 'المهام والإنجازات', d: 'تتبع المهام والأعمال المنجزة في لوحة تحكم متكاملة' },
              { n: '08', i: 'bi-clock-history', t: 'الحضور والانصراف', d: 'نظام تتبع ساعات العمل والحضور والبريك لكل موظف عن بعد' },
            ].map((s, i) => (
              <div className="col-xl-3 col-md-6" key={i}>
                <Rv delay={`rv-d${Math.min(i % 4 + 1, 4)}`}>
                  <div className="step-card">
                    <div className="step-number">{s.n}</div>
                    <h5><i className={`bi ${s.i} me-1`} style={{ color: 'var(--gold)' }}></i> {s.t}</h5>
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
            <div className="col-lg-5">
              <Rv><div className="section-badge"><i className="bi bi-1-circle-fill"></i> الخطوة الأولى</div></Rv>
              <Rv delay="rv-d1"><h2 className="section-heading">الشركة تنشر كورس تدريبي متخصص</h2></Rv>
              <Rv delay="rv-d2"><p className="section-sub">تنشئ محتوى تدريبي مع اختبارات تقييمية لضمان فهم المرشح لطبيعة العمل قبل التقديم.</p></Rv>
            </div>
            <div className="col-lg-7">
              <Rv delay="rv-d2">
                <BrowserFrame title="لوحة تحكم الشركة — نشر كورس">
                  <div className="d-flex gap-3 align-items-start flex-wrap">
                    <div style={{ width: 140, height: 100, borderRadius: 14, background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', flexShrink: 0, boxShadow: 'var(--gold-glow)' }}>🎓</div>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <h6 className="fw-bold mb-1" style={{ color: 'var(--brown)' }}>كورس: خدمة العملاء الاحترافية</h6>
                      <p className="mb-2" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>تعلّم أساسيات التعامل مع العملاء وإدارة الشكاوى</p>
                      <div className="d-flex gap-2 flex-wrap">
                        <span className="badge rounded-pill" style={{ background: 'var(--gold-100)', color: 'var(--gold-dark)', fontWeight: 600 }}>📄 12 درس</span>
                        <span className="badge rounded-pill" style={{ background: 'var(--gold-100)', color: 'var(--gold-dark)', fontWeight: 600 }}>📝 اختبار نهائي</span>
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
            <div className="col-lg-6 order-lg-2">
              <Rv><div className="section-badge"><i className="bi bi-bar-chart-fill"></i> نتائج الاختبار</div></Rv>
              <Rv delay="rv-d1"><h2 className="section-heading">نختار لك الأفضل بناءً على الأداء</h2></Rv>
              <Rv delay="rv-d2"><p className="section-sub">بعد إتمام الكورس يخوض المرشح اختباراً تقييمياً. نرشّح أصحاب أعلى النسب فقط للشركة.</p></Rv>
            </div>
            <div className="col-lg-6 order-lg-1">
              <Rv delay="rv-d2">
                <BrowserFrame title="📊 نتائج الاختبارات">
                  <Prog label="أحمد العتيبي" pct={92} color="prog-gold" />
                  <Prog label="سارة الدوسري" pct={85} color="prog-gold" />
                  <Prog label="خالد القحطاني" pct={78} color="prog-bronze" />
                  <Prog label="نورة الشمري" pct={65} color="prog-silver" />
                  <div className="winner-card mt-3">
                    <div className="trophy">🏆</div>
                    <div className="score">92%</div>
                    <div className="name">أحمد العتيبي — مؤهل للترشيح</div>
                    <div className="badge-rec">⭐ جاهز للترشيح للشركة</div>
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
            <Rv><div className="section-badge"><i className="bi bi-chat-dots-fill"></i> التواصل</div></Rv>
            <Rv delay="rv-d1"><h2 className="section-heading">شات مباشر ومواعيد مؤتمتة</h2></Rv>
            <Rv delay="rv-d2"><p className="section-sub mx-auto">يُفتح شات تفاعلي ويُرسل النظام ملف الموعد تلقائياً عند الموافقة</p></Rv>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <Rv>
                <BrowserFrame title="💬 الشات المباشر">
                  <div className="chat-bubble chat-c"><Typed text="🔔 تم فتح قناة التواصل بين الشركة والمرشح" delay={300} /></div>
                  <div className="chat-bubble chat-r"><Typed text="مرحباً أحمد، نتائجك ممتازة! نود تحديد موعد مقابلة." delay={1500} /></div>
                  <div className="chat-bubble chat-l"><Typed text="أهلاً بكم، يشرفني! متى الموعد المناسب؟" delay={3000} /></div>
                  <div className="chat-bubble chat-c"><Typed text="📅 تم إرسال ملف الموعد — الأحد 25 مايو، 10:00 ص" delay={4500} /></div>
                </BrowserFrame>
              </Rv>
            </div>
            <div className="col-lg-6">
              <Rv delay="rv-d2">
                <div className="step-card h-100 d-flex flex-column justify-content-center text-center">
                  <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>📅</div>
                  <h5 style={{ color: 'var(--gold-dark)' }}>ملف الموعد المؤتمت</h5>
                  <div className="p-3 rounded-3 text-start mt-3" style={{ background: 'var(--cream)' }}>
                    <p className="mb-2" style={{ fontSize: '0.88rem' }}>📌 <strong>المقابلة:</strong> خدمة عملاء — شركة النخبة</p>
                    <p className="mb-2" style={{ fontSize: '0.88rem' }}>📅 <strong>التاريخ:</strong> الأحد 25 مايو 2026</p>
                    <p className="mb-2" style={{ fontSize: '0.88rem' }}>⏰ <strong>الوقت:</strong> 10:00 صباحاً</p>
                    <p className="mb-0" style={{ fontSize: '0.88rem' }}>🔗 <strong>الرابط:</strong> <span style={{ color: 'var(--gold-dark)' }}>meet.ahdati.sa/...</span></p>
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
            <div className="col-lg-5">
              <Rv><div className="section-badge"><i className="bi bi-file-earmark-text-fill"></i> العقد</div></Rv>
              <Rv delay="rv-d1"><h2 className="section-heading">عقد رسمي مؤتمت بالكامل</h2></Rv>
              <Rv delay="rv-d2"><p className="section-sub">بعد نجاح المقابلة تحدد الشركة الراتب ومدة العقد ويُنشأ عقد رسمي إلكتروني فوراً.</p></Rv>
            </div>
            <div className="col-lg-7">
              <Rv delay="rv-d2">
                <div className="contract-box">
                  <div className="c-header"><h5>عقد عمل رسمي — منصة عهدتي</h5><small style={{ color: 'var(--text-muted)' }}>رقم العقد: AHD-2026-00147</small></div>
                  <div className="c-row"><span className="lbl">اسم الموظف</span><span className="val">أحمد محمد العتيبي</span></div>
                  <div className="c-row"><span className="lbl">الشركة</span><span className="val">شركة النخبة للخدمات</span></div>
                  <div className="c-row"><span className="lbl">المسمى الوظيفي</span><span className="val">أخصائي خدمة عملاء</span></div>
                  <div className="c-row"><span className="lbl">الراتب الشهري</span><span className="val" style={{ color: 'var(--gold-dark)' }}>5,500 ر.س</span></div>
                  <div className="c-row"><span className="lbl">مدة العقد</span><span className="val">12 شهر</span></div>
                  <div className="c-row"><span className="lbl">نوع العمل</span><span className="val">عن بُعد — دوام كامل</span></div>
                  <div className="c-stamp">✅ تم التوقيع إلكترونياً — منصة عهدتي</div>
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
            <Rv><div className="section-badge"><i className="bi bi-clipboard-data-fill"></i> التتبع</div></Rv>
            <Rv delay="rv-d1"><h2 className="section-heading">الوظائف والحضور والاستراحات</h2></Rv>
            <Rv delay="rv-d2"><p className="section-sub mx-auto">لوحة تحكم متكاملة لتتبع المهام والحضور والانصراف</p></Rv>
          </div>

          <Rv>
            <div className="row g-3 mb-5">
              {[
                { ico: '📞', t: 'الرد على العملاء', d: '42 محادثة مكتملة', b: 'badge-ok', s: 'مكتمل' },
                { ico: '📧', t: 'معالجة البريد', d: '18 رسالة معالجة', b: 'badge-ok', s: 'مكتمل' },
                { ico: '📊', t: 'تقرير الأداء', d: 'تقرير KPIs', b: 'badge-wip', s: 'قيد التنفيذ' },
                { ico: '🎯', t: 'تدريب الفريق', d: 'جلسة تدريبية', b: 'badge-off', s: 'مجدول' },
              ].map((j, i) => (
                <div className="col-lg-3 col-6" key={i}>
                  <Rv delay={`rv-d${Math.min(i + 1, 4)}`}>
                    <div className="job-mini">
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
            <BrowserFrame title="📋 سجل الحضور والانصراف">
              <div className="table-responsive">
                <table className="table tbl-att mb-0">
                  <thead><tr><th>الموظف</th><th>الحضور</th><th>الانصراف</th><th>البريك</th><th>الساعات</th><th>الحالة</th></tr></thead>
                  <tbody>
                    <tr><td>أحمد العتيبي</td><td>08:00 ص</td><td>04:00 م</td><td>30 دقيقة</td><td>7.5 ساعة</td><td><span className="badge rounded-pill badge-ok">متصل</span></td></tr>
                    <tr><td>سارة الدوسري</td><td>09:00 ص</td><td>05:00 م</td><td>45 دقيقة</td><td>7.25 ساعة</td><td><span className="badge rounded-pill badge-wip">استراحة</span></td></tr>
                    <tr><td>خالد القحطاني</td><td>08:30 ص</td><td>—</td><td>15 دقيقة</td><td>5.5 ساعة</td><td><span className="badge rounded-pill badge-ok">متصل</span></td></tr>
                    <tr><td>نورة الشمري</td><td>07:30 ص</td><td>03:30 م</td><td>30 دقيقة</td><td>7.5 ساعة</td><td><span className="badge rounded-pill badge-off">منصرف</span></td></tr>
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
          <div className="f-brand">عهدتي</div>
          <p className="f-desc">منصة سعودية متكاملة للتدريب والتأهيل والتعهيد الخارجي عن بُعد</p>
          <p className="f-flag">نبني جسر الثقة بين الشركات والكوادر البشرية 🇸🇦</p>
          <hr />
          <p className="f-copy">© 2026 عهدتي — جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </>
  );
}
