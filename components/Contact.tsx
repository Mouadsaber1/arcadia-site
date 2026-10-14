"use client";

import { useEffect, useState } from "react";
import { PROJECTS, SITE } from "@/lib/data";
import { EVT_PICK_PROJECT, type PickProjectDetail } from "@/lib/scroll";
import { useLang } from "./Lang";

type Errors = Partial<Record<"name" | "phone", string>>;
const PHONE = /^\+?[\d\s.-]{8,20}$/;

export default function Contact() {
  const { t, lang } = useLang();
  const c = t.contact;
  const [project, setProject] = useState("");
  const [request, setRequest] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<PickProjectDetail>).detail;
      setProject(d.projectId);
      if (d.request !== undefined) setRequest(d.request);
    };
    window.addEventListener(EVT_PICK_PROJECT, on);
    return () => window.removeEventListener(EVT_PICK_PROJECT, on);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const errs: Errors = {};
    if (!data.name?.trim()) errs.name = "errName";
    if (!PHONE.test(data.phone ?? "")) errs.phone = "errPhone";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
    } catch {
      setState("error");
    }
  }

  const opt = <span className="opt"> ({c.optional})</span>;

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap visit">
        <div className="visit__intro">
          <p className="label">{t.nav.cta}</p>
          <h2 id="contact-title" className="title">{c.title}</h2>
          <p className="lead">{c.lead}</p>
          <dl className="contact-list">
            <div><dt>{c.office}</dt><dd>{SITE.address}</dd></div>
            <div><dt>{c.phoneLabel}</dt><dd><bdi>{SITE.phone}</bdi></dd></div>
            <div>
              <dt>{c.whatsapp}</dt>
              <dd>
                {SITE.whatsapp ? (
                  <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer"><bdi>+{SITE.whatsapp}</bdi></a>
                ) : (
                  "[NUMÉRO WHATSAPP]"
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div className="visit__form">
          {state === "done" ? (
            <div className="success" role="status">
              <h3>{c.doneTitle}</h3>
              <p>{c.doneText}</p>
            </div>
          ) : (
            <form className="form" onSubmit={onSubmit} noValidate>
              <div className="field">
                <label htmlFor="name">{c.name}</label>
                <input id="name" name="name" autoComplete="name" maxLength={80} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
                {errors.name && <span className="err" id="name-err">{c.errName}</span>}
              </div>
              <div className="field">
                <label htmlFor="phone">{c.phone}</label>
                <input id="phone" name="phone" type="tel" dir="ltr" inputMode="tel" autoComplete="tel" maxLength={20} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} />
                {errors.phone && <span className="err" id="phone-err">{c.errPhone}</span>}
              </div>
              <div className="field">
                <label htmlFor="request">{c.request}</label>
                <select id="request" name="request" value={request} onChange={(e) => setRequest(Number(e.target.value))}>
                  {c.requests.map((r, i) => <option key={i} value={i}>{r}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="project">{c.residence}</label>
                <select id="project" name="project" value={project} onChange={(e) => setProject(e.target.value)}>
                  <option value="">{c.undecided}</option>
                  {PROJECTS.map((p) => (
                    <option key={p.id} value={p.id}>{t.projects.items[p.id].name}</option>
                  ))}
                  <option value="hill">{t.feature.hill.name}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="typology">{c.typology}</label>
                <select id="typology" name="typology" defaultValue="0">
                  {c.typologies.map((x, i) => <option key={i} value={i}>{x}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="horizon">{c.horizon}</label>
                <select id="horizon" name="horizon" defaultValue="1">
                  {c.horizons.map((x, i) => <option key={i} value={i}>{x}</option>)}
                </select>
              </div>
              <div className="field field--full">
                <label htmlFor="message">{c.message}{opt}</label>
                <textarea id="message" name="message" maxLength={1000} />
              </div>
              <div className="hp" aria-hidden="true">
                <label htmlFor="company">Société</label>
                <input id="company" name="company" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="form__foot">
                <button type="submit" className="btn btn--light" disabled={state === "sending"}>
                  {state === "sending" ? c.sending : c.submit}
                </button>
                <span className="note" role={state === "error" ? "alert" : undefined}>
                  {state === "error" ? c.failed : c.note}
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
