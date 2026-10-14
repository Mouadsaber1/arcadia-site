import { SITE } from "@/lib/data";

// S'affiche dès que SITE.whatsapp est renseigné dans lib/data.ts
export default function WhatsApp() {
  if (!SITE.whatsapp) return null;
  const msg = encodeURIComponent("Bonjour, je souhaite des informations sur vos résidences.");
  return (
    <a className="wa" href={`https://wa.me/${SITE.whatsapp}?text=${msg}`} target="_blank" rel="noopener noreferrer">
      WhatsApp
    </a>
  );
}
