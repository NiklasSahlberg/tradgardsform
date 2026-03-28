import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const navLinks = [
  { href: "/", label: "Hem" },
  { href: "/tjanster", label: "Tjänster" },
  { href: "/projekt", label: "Projekt" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakta-oss", label: "Kontakta oss" },
];

const serviceLinks = [
  { href: "/tjanster/tradgardsplanering", label: "Trädgårdsplanering" },
  { href: "/tjanster/belysningsplan", label: "Belysningsplan" },
  { href: "/tjanster/distansradgivning", label: "Distansrådgivning" },
  { href: "/tradgardsdesign-stockholm", label: "Trädgårdsdesign Stockholm" },
  { href: "/tradgardsdesign-jarfalla", label: "Trädgårdsdesign Järfälla" },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-white/70 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="flex flex-col gap-5">
          <Link href="/" className="inline-flex w-fit">
            <Image
              src="/bilder/galleri/logo_web-removebg-preview.png"
              alt="Trädgårdsform logotyp"
              width={220}
              height={79}
              quality={100}
              className="h-14 w-auto object-contain md:h-16 brightness-110 contrast-110 saturate-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
            />
          </Link>
          <p className="text-sm leading-relaxed">
            Diplomerad trädgårdsdesigner och trädgårdsarkitekt i Stockholm.
            Fasta priser och kostnadsfria hembesök.
          </p>
          <p className="text-xs text-white/40">
            Medlem i Svenska Trädgårdsdesigners
          </p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4 tracking-wide">Navigering</h4>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4 tracking-wide">Tjänster & orter</h4>
          <ul className="flex flex-col gap-2">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4 tracking-wide">Kontakt</h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="tel:0705686509"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <Phone size={14} className="flex-shrink-0" />
                0705-68 65 09
              </a>
            </li>
            <li>
              <a
                href="mailto:info@tradgardsform.se"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <Mail size={14} className="flex-shrink-0" />
                info@tradgardsform.se
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <MapPin size={14} className="flex-shrink-0 mt-0.5" />
              Järfälla, Stockholm
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Trädgårdsform. Alla rättigheter förbehållna.</p>
          <p>Org.nr: 559191-1705</p>
        </div>
      </div>
    </footer>
  );
}
