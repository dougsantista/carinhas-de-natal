import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BadgeCheck, Brush, Camera, Check, ChevronLeft, ChevronRight, Clock, Crown, Flame, Gift, Lock,
  Maximize, Printer, ShieldCheck, Smile, Sparkles, Star, Tag, Users, X, Zap,
} from "lucide-react";
import { PRICES, brl, upsellTotal } from "@/lib/pricing";
import { track, captureAttribution, goToCheckout } from "@/lib/meta-pixel";
import { CursorTrail } from "@/components/CursorTrail";
import etiquetasImg from "@/assets/bonus-etiquetas.jpg";
import cartoesImg from "@/assets/bonus-cartoes.jpg";

// TODO: substituir pelos links de checkout com os novos preços
const BASIC = "https://pay.seguruspagamentos.com.br/checkout/S3H8M1";
const PREMIUM = "https://pay.seguruspagamentos.com.br/checkout/GCJZEG";
const UPSELL = "https://pay.seguruspagamentos.com.br/checkout/0HG2T5";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Carinhas de Natal: +200 personagens editáveis no Canva | Black Friday" },
      { name: "description", content: "Coloque o rosto da família em mais de 200 personagens natalinos, edite grátis no Canva e imprima em casa. Kit Premium com 6 bônus e garantia de 7 dias." },
      { property: "og:title", content: "Carinhas de Natal: sua família virando personagem natalino" },
      { property: "og:description", content: "Mais de 200 figuras editáveis no Canva para imprimir em casa. Bônus exclusivos no Kit Premium." },
      { property: "og:url", content: "https://christmas-faces-showcase.lovable.app/" },
      { property: "og:locale", content: "pt_BR" },
    ],
    links: [{ rel: "canonical", href: "https://christmas-faces-showcase.lovable.app/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Kit Carinhas de Natal",
        description: "Mais de 200 personagens de Natal editáveis no Canva, prontos para imprimir.",
        image: "https://christmas-faces-showcase.lovable.app/images/completo.jpg",
        brand: { "@type": "Brand", name: "Carinhas de Natal" },
        offers: [
          { "@type": "Offer", name: "Kit Básico", price: PRICES.basic.toFixed(2), priceCurrency: "BRL", availability: "https://schema.org/InStock", url: "https://christmas-faces-showcase.lovable.app/#planos" },
          { "@type": "Offer", name: "Kit Premium", price: PRICES.premium.toFixed(2), priceCurrency: "BRL", availability: "https://schema.org/InStock", url: "https://christmas-faces-showcase.lovable.app/#planos" },
        ],
      }),
    }],
  }),
  component: Index,
});

const gallery = [
  ["galeria1", "Antes e depois: foto virando personagem de Natal"],
  ["galeria2", "Modelos de personagens para colocar o rosto"],
  ["galeria3", "Parede decorada com figurinhas personalizadas"],
  ["galeria4", "Figurinhas impressas e recortadas"],
  ["galeria5", "Porta decorada com personagens de Natal"],
  ["galeria6", "Família com os personagens de Natal"],
];

const features = [
  [Brush, "Editável no Canva", "Abra os modelos no Canva gratuito, pelo celular ou pelo computador, e edite em segundos."],
  [Users, "+200 personagens", "Papai e Mamãe Noel, duendes, renas, bonecos de neve, anjinhos, quebra-nozes e outras figuras clássicas."],
  [Smile, "Fofos e engraçados", "Do duendinho das crianças ao boneco de neve daquele tio sério: tem estilo para cada um."],
  [Camera, "Só colocar a foto", "Escolha a figura, encaixe o rosto e ajuste. Pronto: sua figurinha sai em minutos."],
  [Printer, "Imprima em casa", "Arquivos em alta resolução para impressora comum, em folha A4, adesivo ou papel fotográfico."],
  [Maximize, "Do tamanho que quiser", "Miniaturas para lembrancinhas ou peças grandes para painel, porta e parede."],
] as const;

const bonuses: [string | null, string, string, string][] = [
  ["bonus1", "100 Artes de Impressão para Decoração", "Plaquinhas, toppers, bandeirolas e enfeites para deixar a mesa da ceia e a casa no clima.", "27,00"],
  ["bonus2", "10 Brincadeiras para Animar a Noite", "Jogos fáceis para todas as idades, perfeitos para a ceia ou o amigo secreto da firma.", "19,00"],
  ["bonus3", "Bingo de Natal", "Cartelas temáticas para imprimir e reunir avós, pais e netos na mesma rodada.", "17,00"],
  ["bonus4", "Guia Anti-Caos de Natal", "Listas e cronograma para planejar cardápio, presentes e enfeites sem correria.", "15,00"],
  [etiquetasImg, "Kit Etiquetas de Presente", "Mais de 50 tags editáveis para marcar cada embrulho com charme.", "19,00"],
  [cartoesImg, "Cartões de Natal Personalizados", "Cartões com espaço para foto e mensagem, para imprimir ou mandar pelo WhatsApp.", "21,00"],
];
const bonusTotal = "118,00";

const core = ["Mais de 200 figuras natalinas editáveis", "Edição direto no Canva", "Arquivos prontos para impressão", "Liberação na hora, por e-mail"];
const bonusNames = bonuses.map((b) => b[1]);

const faqs = [
  ["Como vou receber o kit?", "É um material 100% digital: assim que o pagamento é aprovado, o link chega no seu e-mail. Não há envio físico."],
  ["Consigo imprimir em casa?", "Sim. Depois de editar, basta baixar o arquivo e usar sua impressora. Se preferir, leve a uma gráfica ou papelaria."],
  ["Preciso de máquina de corte?", "Não. Uma tesoura dá conta. Quem tem plotter pode usar, mas é opcional."],
  ["Quantas vezes posso imprimir?", "Sem limite. Faça para a família, a escola ou o escritório, e reaproveite nos próximos anos."],
  ["Preciso de algum programa? Tenho que pagar o Canva?", "Não precisa pagar nada além do kit: o Canva gratuito basta, no app ou no navegador. Nenhuma experiência com edição é necessária."],
  ["Como recebo os bônus?", "Eles fazem parte só do Kit Premium e ficam disponíveis no mesmo link que você recebe após a compra."],
  ["Por quanto tempo terei acesso?", "Para sempre. Um único pagamento e o material é seu."],
];

function useCountdown(seconds: number, active = true) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    captureAttribution();
    track("ViewContent", { content_name: "Carinhas de Natal", content_type: "product", value: PRICES.basic, currency: "BRL" });
  }, []);
  useEffect(() => {
    if (!active) return;
    setLeft(seconds);
    const t = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(t);
  }, [active, seconds]);
  const h = Math.floor(left / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
  return { left, parts: [h, m, s].map((n) => String(n).padStart(2, "0")) };
}

function Pill({ icon: Icon, children, tone = "gold" }: { icon: React.ElementType; children: React.ReactNode; tone?: "gold" | "red" | "dark" }) {
  const cls = tone === "gold" ? "bg-primary text-primary-foreground" : tone === "red" ? "bg-secondary text-secondary-foreground" : "border border-border bg-card text-foreground";
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide ${cls}`}><Icon className="h-3.5 w-3.5" />{children}</span>;
}

function Heading({ kicker, children, sub }: { kicker?: React.ReactNode; children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center">
      {kicker && <div className="mb-3 flex justify-center">{kicker}</div>}
      <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">{children}</h2>
      {sub && <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Timer({ parts }: { parts: string[] }) {
  return (
    <div className="flex items-center gap-1.5">
      {parts.map((p, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="rounded-md bg-background px-2 py-1 font-display text-xl tabular-nums text-primary">{p}</span>
          {i < parts.length - 1 && <span className="font-bold text-primary">:</span>}
        </span>
      ))}
    </div>
  );
}

function Index() {
  const banner = useCountdown(4 * 3600 + 59 * 60);
  const [slide, setSlide] = useState(0);
  const [modal, setModal] = useState(false);
  const upsell = useCountdown(5 * 60, modal);
  const go = (d: number) => setSlide((s) => (s + d + gallery.length) % gallery.length);
  const marquee = ["BLACK FRIDAY", "ATÉ 70% OFF", "BÔNUS EXCLUSIVOS", "ACESSO IMEDIATO", "GARANTIA 7 DIAS"];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <CursorTrail />
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-border bg-secondary px-4 py-2 text-secondary-foreground">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm font-bold">
          <span className="flex items-center gap-1.5"><Flame className="h-4 w-4" /> BLACK FRIDAY DE NATAL · termina em</span>
          <Timer parts={banner.parts} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-hero px-4 pt-14 pb-10 text-center">
        <div className="flex flex-wrap justify-center gap-2">
          <Pill icon={Zap}>Black Friday</Pill>
          <Pill icon={Tag} tone="red">Até 70% OFF</Pill>
          <Pill icon={Star} tone="dark">+12 mil famílias</Pill>
        </div>
        <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl uppercase leading-[0.9] md:text-8xl">
          Transforme sua família em <span className="text-primary">personagens</span> de Natal
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">Mais de 200 modelos prontos. Coloque uma foto, imprima e garanta gargalhadas na noite do dia 24.</p>
        <a href="#planos" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gold px-8 py-4 font-display text-xl uppercase text-primary-foreground shadow-glow transition hover:scale-105">
          <Gift className="h-5 w-5" /> Garantir meu kit
        </a>
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Zap className="h-4 w-4 text-primary" /> Acesso imediato</span>
          <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-primary" /> Garantia 7 dias</span>
          <span className="flex items-center gap-1"><Lock className="h-4 w-4 text-primary" /> Compra segura</span>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y-4 border-background bg-primary py-3 text-primary-foreground">
        <div className="flex w-max animate-marquee gap-8 font-display text-2xl uppercase">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((t, i) => (
            <span key={i} className="flex items-center gap-8">{t}<Sparkles className="h-5 w-5" /></span>
          ))}
        </div>
      </div>

      {/* Galeria */}
      <section className="mx-auto max-w-3xl px-4 pt-16 pb-6">
        <Heading kicker={<Pill icon={Gift} tone="dark">O que você vai receber</Pill>} sub="Deslize as imagens e confira o antes e depois de cada figurinha.">
          Espie o que tem <span className="text-primary">dentro do kit</span>
        </Heading>
        <div className="relative mt-8">
          <div className="overflow-hidden rounded-2xl border-2 border-primary shadow-glow">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${slide * 100}%)` }}
              onTouchStart={(e) => ((e.currentTarget as any)._x = e.touches[0]!.clientX)}
              onTouchEnd={(e) => { const dx = e.changedTouches[0]!.clientX - (e.currentTarget as any)._x; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); }}>
              {gallery.map(([src, alt]) => <img key={src} src={`/images/${src}.jpg`} alt={alt} width={896} height={1200} decoding="async" loading={src === "galeria1" ? "eager" : "lazy"} className="w-full shrink-0 object-cover" />)}
            </div>
          </div>
          <button aria-label="Anterior" onClick={() => go(-1)} className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground"><ChevronLeft /></button>
          <button aria-label="Próximo" onClick={() => go(1)} className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground"><ChevronRight /></button>
          <div className="mt-4 flex justify-center gap-2">
            {gallery.map((_, i) => <button key={i} aria-label={`Imagem ${i + 1}`} onClick={() => setSlide(i)} className={`h-2 rounded-full transition-all ${i === slide ? "w-6 bg-primary" : "w-2 bg-border"}`} />)}
          </div>
        </div>
      </section>

      {/* Features */}
      <h2 className="sr-only">Por que escolher as Carinhas de Natal</h2>
      <section className="mx-auto grid max-w-5xl gap-4 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(([Icon, t, d]) => (
          <div key={t} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition hover:border-primary">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Icon className="h-6 w-6" /></div>
            <h3 className="mt-4 font-display text-2xl uppercase">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      {/* Bônus */}
      <section className="tape py-2" />
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <Heading kicker={<Pill icon={Crown}>Exclusivo do Kit Premium</Pill>} sub="Na versão Premium, estes extras vêm de presente para animar ainda mais as festas.">
            <span className="text-primary">6 bônus</span> exclusivos inclusos
          </Heading>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bonuses.map(([img, t, d, price], i) => (
              <div key={t} className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                <span className="absolute right-3 top-3 z-10 rotate-6 rounded-md bg-secondary px-2 py-1 text-xs font-extrabold text-secondary-foreground">GRÁTIS</span>
                {img ? <img src={img.includes("/") ? img : `/images/${img}.jpg`} loading="lazy" decoding="async" width={1376} height={768} alt={`Bônus ${i + 1}: ${t}`} className="aspect-[16/9] w-full object-cover" /> : (
                  <div className="flex aspect-square items-center justify-center bg-hero"><Gift className="h-20 w-20 text-primary" /></div>
                )}
                <div className="p-5">
                  <Pill icon={Gift}>Bônus 0{i + 1}{i >= 4 && " · Novo"}</Pill>
                  <h3 className="mt-3 font-display text-2xl uppercase leading-tight">{t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                  <p className="mt-3 text-sm"><s className="text-muted-foreground">R$ {price}</s> <strong className="ml-1 text-success">Grátis</strong></p>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-sm rounded-2xl border-2 border-dashed border-primary bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">Somando os 6 bônus, você pagaria</p>
            <p className="mt-1 text-2xl"><s>R$ {bonusTotal}</s></p>
            <p className="mt-1 font-display text-4xl uppercase text-primary">Hoje: grátis!</p>
          </div>
        </div>
      </section>
      <section className="tape py-2" />

      {/* Planos */}
      <section id="planos" className="mx-auto max-w-5xl scroll-mt-14 px-4 py-16">
        <Heading kicker={<Pill icon={Flame} tone="red">Preços de Black Friday</Pill>} sub="Pague uma vez, receba na hora e teste sem risco por uma semana.">
          Escolha seu <span className="text-primary">Kit de Natal</span>
        </Heading>
        <div className="mt-12 grid items-start gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <Pill icon={Tag} tone="dark">Essencial</Pill>
            <h3 className="mt-3 font-display text-4xl uppercase">Kit Básico</h3>
            <p className="text-sm text-muted-foreground">As figuras natalinas, sem os extras.</p>
            <p className="mt-5 text-sm text-muted-foreground">de <s>R$ 29,90</s> por</p>
            <p className="font-display text-6xl">{brl(PRICES.basic)}</p>
            <p className="text-xs text-muted-foreground">Pagamento único</p>
            <ul className="mt-5 space-y-2 text-sm">
              {core.map((c) => <li key={c} className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-success" />{c}</li>)}
              {bonusNames.map((c) => <li key={c} className="flex gap-2 text-muted-foreground line-through"><X className="h-5 w-5 shrink-0 text-destructive" />{c}</li>)}
            </ul>
            <button onClick={() => { setModal(true); track("AddToCart", { value: PRICES.basic, currency: "BRL", content_name: "Kit Básico" }); }} className="mt-7 block w-full rounded-xl border-2 border-primary py-4 font-display text-xl uppercase text-primary transition hover:bg-primary hover:text-primary-foreground">Quero o Kit Básico</button>
            <p className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground"><Lock className="h-3 w-3" /> Pagamento protegido</p>
          </div>

          <div className="relative rounded-2xl border-2 border-primary bg-card p-7 shadow-glow">
            <span className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-5 py-1.5 text-sm font-extrabold uppercase text-primary-foreground"><Star className="h-4 w-4 fill-current" /> Mais escolhido</span>
            <span className="absolute -right-3 top-8 rotate-12 rounded-lg bg-secondary px-3 py-2 text-center font-display text-lg leading-none text-secondary-foreground">-61%<br /><span className="text-xs">OFF</span></span>
            <div className="mt-2 flex flex-wrap gap-2"><Pill icon={Crown}>Premium</Pill><Pill icon={Gift} tone="red">6 bônus</Pill></div>
            <h3 className="mt-3 font-display text-4xl uppercase">Kit Premium</h3>
            <p className="text-sm text-muted-foreground">A coleção completa somada a 6 presentes extras.</p>
            <img src="/images/completo.jpg" alt="Tudo o que vem no Kit Premium" loading="lazy" decoding="async" className="mt-4 w-full rounded-xl" />
            <p className="mt-5 text-sm text-muted-foreground">de <s>R$ 97,90</s> por</p>
            <p className="font-display text-6xl text-primary">{brl(PRICES.premium)}</p>
            <p className="text-xs text-muted-foreground">Pagamento único</p>
            <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success"><BadgeCheck className="h-4 w-4" /> Você economiza R$ 60,00</p>
            <ul className="mt-5 space-y-2 text-sm">
              {core.map((c) => <li key={c} className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-success" />{c}</li>)}
              {bonusNames.map((c, i) => <li key={c} className="flex gap-2"><Gift className="h-5 w-5 shrink-0 text-primary" /><span><strong>Bônus {i + 1}</strong> · {c}</span></li>)}
            </ul>
            <a href={PREMIUM} onClick={(e) => { e.preventDefault(); goToCheckout(PREMIUM, PRICES.premium, "Kit Premium"); }} className="mt-7 block w-full animate-pulse-soft rounded-xl bg-gold py-4 text-center font-display text-xl uppercase text-primary-foreground shadow-glow">Quero o Kit Premium</a>
            <p className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground"><Lock className="h-3 w-3" /> Ambiente seguro · Entrega no seu e-mail</p>
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section className="mx-auto max-w-2xl px-4 pb-16">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <ShieldCheck className="mx-auto h-20 w-20 text-primary" />
          <h2 className="mt-4 font-display text-4xl uppercase">Garantia incondicional de 7 dias</h2>
          <p className="mt-3 text-muted-foreground">Não curtiu? Solicite o reembolso em até uma semana e devolvemos cada centavo, sem burocracia.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-2xl px-4 pb-16">
        <Heading kicker={<Pill icon={Sparkles} tone="dark">Tire suas dúvidas</Pill>}>Ainda ficou <span className="text-primary">alguma pergunta?</span></Heading>
        <div className="mt-8 space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="group rounded-xl border border-border bg-card p-5 open:border-primary">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {q}<span className="text-2xl text-primary transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-hero px-4 py-20 text-center">
        <Pill icon={Clock} tone="red">Última chamada</Pill>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-5xl uppercase leading-[0.95] md:text-7xl">Faça deste o Natal <span className="text-primary">mais divertido</span> da família</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Uma coleção enorme de figuras, seis extras e edição simples. A surpresa da ceia já está a poucos cliques.</p>
        <a href="#planos" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gold px-8 py-4 font-display text-xl uppercase text-primary-foreground shadow-glow"><Gift className="h-5 w-5" /> Garantir o meu agora</a>
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Check className="h-4 w-4 text-success" /> Liberação instantânea</span>
          <span className="flex items-center gap-1"><Check className="h-4 w-4 text-success" /> Edição no Canva</span>
          <span className="flex items-center gap-1"><Check className="h-4 w-4 text-success" /> Reembolso em 7 dias</span>
        </div>
      </section>

      <footer className="border-t border-border px-4 py-8 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Carinhas de Natal. Todos os direitos reservados.</p>
        <p className="mx-auto mt-3 max-w-2xl">Este site não faz parte do site do Facebook ou da Meta Platforms, Inc. Além disso, este site NÃO é endossado pelo Facebook de forma alguma. FACEBOOK e INSTAGRAM são marcas registradas da Meta Platforms, Inc.</p>
      </footer>

      <div className="h-20 md:hidden" />
      <a href="#planos" aria-label="Ver planos e preços" className="fixed inset-x-4 bottom-4 z-30 rounded-xl bg-gold py-4 text-center font-display text-lg uppercase text-primary-foreground shadow-glow md:hidden">Ver ofertas</a>

      {/* Upsell pop-up */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/85 p-4 md:items-center" onClick={() => setModal(false)}>
          <div className="relative my-6 w-full max-w-md rounded-2xl border-2 border-primary bg-card p-6 shadow-glow" onClick={(e) => e.stopPropagation()}>
            <button aria-label="Fechar" onClick={() => setModal(false)} className="absolute right-3 top-3 text-muted-foreground"><X /></button>
            <div className="flex justify-center"><Pill icon={Flame} tone="red">Espere! Oferta única</Pill></div>
            <h3 className="mt-4 text-center font-display text-4xl uppercase leading-none">Por só <span className="text-primary">+{brl(PRICES.upsellAddon)}</span> leve o Premium</h3>
            <div className="mt-3 flex items-center justify-center gap-2 text-sm"><Clock className="h-4 w-4 text-primary" /> Expira em <Timer parts={upsell.parts.slice(1)} /></div>
            <img src="/images/completo.jpg" alt="Kit Premium com todos os bônus" decoding="async" className="mt-4 w-full rounded-xl" />
            <p className="mt-4 text-center text-sm text-muted-foreground">Complete seu pedido com <strong className="text-foreground">os 6 extras do Premium</strong> por um valor simbólico.</p>
            <p className="mt-3 text-center">
              <s className="text-muted-foreground">{brl(PRICES.premium)}</s>
              <strong className="ml-2 font-display text-5xl text-primary">{brl(upsellTotal())}</strong>
            </p>
            <p className="text-center text-xs text-muted-foreground">{brl(PRICES.basic)} do Básico + {brl(PRICES.upsellAddon)} do upgrade</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              <li className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-success" /> Coleção com mais de 200 figuras</li>
              {bonusNames.map((c, i) => <li key={c} className="flex gap-2"><Gift className="h-5 w-5 shrink-0 text-primary" /> Bônus {i + 1} · {c}</li>)}
            </ul>
            {upsell.left === 0 ? (
              <p className="mt-5 rounded-xl bg-muted p-4 text-center text-sm">O tempo acabou e esta oferta não está mais disponível.</p>
            ) : (
              <a href={UPSELL} onClick={(e) => { e.preventDefault(); goToCheckout(UPSELL, upsellTotal(), "Kit Básico + Bônus"); }} className="mt-5 block animate-pulse-soft rounded-xl bg-gold py-4 text-center font-display text-xl uppercase text-primary-foreground">Sim! Quero por {brl(upsellTotal())}</a>
            )}
            <a href={BASIC} onClick={(e) => { e.preventDefault(); goToCheckout(BASIC, PRICES.basic, "Kit Básico"); }} className="mt-3 block text-center text-sm text-muted-foreground underline">Não, obrigado. Quero só o Kit Básico por {brl(PRICES.basic)}</a>
          </div>
        </div>
      )}
    </div>
  );
}
