import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BadgeCheck, Brush, Camera, Check, ChevronLeft, ChevronRight, Clock, Crown, Flame, Gift, Lock,
  Maximize, Printer, ShieldCheck, Smile, Sparkles, Star, Tag, Users, X, Zap,
} from "lucide-react";
import { PRICES, brl, upsellTotal } from "@/lib/pricing";

// TODO: substituir pelos links de checkout com os novos preços
const BASIC = "https://pay.seguruspagamentos.com.br/checkout/S3H8M1";
const PREMIUM = "https://pay.seguruspagamentos.com.br/checkout/GCJZEG";
const UPSELL = "https://pay.seguruspagamentos.com.br/checkout/0HG2T5";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Black Friday de Natal — Carinhas de Natal" },
      { name: "description", content: "Black Friday: +200 personagens de Natal editáveis no Canva, bônus exclusivos e garantia de 7 dias." },
      { property: "og:title", content: "Black Friday de Natal — Carinhas de Natal" },
      { property: "og:description", content: "Transforme todo mundo em personagem de Natal. Oferta Black Friday por tempo limitado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
  [Brush, "Editável no Canva", "Modelos prontos abertos direto no Canva. Funciona na versão gratuita, no celular ou no computador."],
  [Users, "+200 personagens", "Papais e Mamães Noéis, duendes, renas, bonecos de neve, anjinhos, quebra-nozes e muito mais."],
  [Smile, "Fofos e engraçados", "Estilos para todo mundo: desde o duendinho das crianças até o boneco de neve do amigo mais sério."],
  [Camera, "Só colocar a foto", "Escolha o personagem, encaixe o rosto e ajuste. Em poucos minutos a figurinha está pronta."],
  [Printer, "Imprima em casa", "Baixe em alta qualidade e imprima em impressora comum, papel A4, adesivo ou fotográfico."],
  [Maximize, "Do tamanho que quiser", "Figurinhas pequenas para lembrancinhas ou grandes para painel, porta e parede."],
] as const;

const bonuses: [string | null, string, string, string][] = [
  ["bonus1", "100 Artes de Impressão para Decoração", "Plaquinhas, toppers, bandeirolas e enfeites natalinos prontos para imprimir e decorar a ceia e a casa.", "27,00"],
  ["bonus2", "10 Brincadeiras para Animar a Noite", "Jogos simples para crianças e adultos que garantem risadas na ceia e na confraternização.", "19,00"],
  ["bonus3", "Bingo de Natal", "Cartelas temáticas prontas para imprimir e jogar com a família toda, do mais novo ao mais velho.", "17,00"],
  ["bonus4", "Guia Anti-Caos de Natal", "Checklists e cronograma para organizar ceia, presentes e decoração sem estresse de última hora.", "15,00"],
  [null, "Kit Etiquetas de Presente", "+50 tags e etiquetas natalinas personalizáveis para identificar os presentes com estilo.", "19,00"],
  [null, "Cartões de Natal Personalizados", "Modelos de cartões e mensagens prontos para editar no Canva e enviar no WhatsApp ou imprimir.", "21,00"],
];
const bonusTotal = "118,00";

const core = ["+200 personagens de Natal editáveis", "Acesso pelo Canva", "Arquivos para baixar e imprimir", "Acesso imediato"];
const bonusNames = bonuses.map((b) => b[1]);

const faqs = [
  ["Como vou receber o kit?", "O produto é 100% digital. Logo após a confirmação do pagamento, você recebe o acesso no e-mail informado na compra. Nada é enviado pelos Correios."],
  ["Consigo imprimir em casa?", "Sim. Depois de personalizar, é só baixar e imprimir em impressora comum, em papel A4, adesivo ou fotográfico. Também pode levar em uma gráfica ou papelaria."],
  ["Preciso de máquina de corte?", "Não. Uma tesoura resolve. Se você já tem plotter de recorte, também pode usar, mas não é obrigatório."],
  ["Quantas vezes posso imprimir?", "Quantas vezes quiser. Você pode criar figurinhas para a família toda, para a escola ou para o trabalho, e usar de novo nos próximos Natais."],
  ["Preciso de algum programa? Tenho que pagar o Canva?", "Você só precisa do Canva, que funciona na versão gratuita, pelo aplicativo do celular ou pelo navegador do computador. Não é preciso saber editar: os modelos já vêm prontos."],
  ["Como recebo os bônus?", "Os bônus são exclusivos do Kit Premium e chegam junto com os personagens, no mesmo acesso enviado por e-mail."],
  ["Por quanto tempo terei acesso?", "O acesso é vitalício. Você paga uma única vez e pode usar o kit sempre que quiser."],
];

function useCountdown(seconds: number, active = true) {
  const [left, setLeft] = useState(seconds);
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
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">+200 modelos editáveis no Canva. Coloque a foto, imprima e veja todo mundo rindo na ceia.</p>
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
        <Heading kicker={<Pill icon={Gift} tone="dark">O que você vai receber</Pill>} sub="Arraste para o lado e veja como as figurinhas ficam depois de colocar a foto.">
          Veja alguns <span className="text-primary">personagens</span> do kit
        </Heading>
        <div className="relative mt-8">
          <div className="overflow-hidden rounded-2xl border-2 border-primary shadow-glow">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${slide * 100}%)` }}
              onTouchStart={(e) => ((e.currentTarget as any)._x = e.touches[0]!.clientX)}
              onTouchEnd={(e) => { const dx = e.changedTouches[0]!.clientX - (e.currentTarget as any)._x; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); }}>
              {gallery.map(([src, alt]) => <img key={src} src={`/images/${src}.jpg`} alt={alt} className="w-full shrink-0 object-cover" />)}
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
          <Heading kicker={<Pill icon={Crown}>Exclusivo do Kit Premium</Pill>} sub="Escolhendo o Kit Premium, você leva tudo isso de presente para deixar o seu Natal ainda mais divertido.">
            <span className="text-primary">6 bônus</span> exclusivos inclusos
          </Heading>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bonuses.map(([img, t, d, price], i) => (
              <div key={t} className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                <span className="absolute right-3 top-3 z-10 rotate-6 rounded-md bg-secondary px-2 py-1 text-xs font-extrabold text-secondary-foreground">GRÁTIS</span>
                {img ? <img src={`/images/${img}.jpg`} alt={`Bônus ${i + 1}: ${t}`} className="w-full" /> : (
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
        <Heading kicker={<Pill icon={Flame} tone="red">Preços de Black Friday</Pill>} sub="Pagamento único, acesso imediato e garantia de 7 dias.">
          Escolha seu <span className="text-primary">Kit de Natal</span>
        </Heading>
        <div className="mt-12 grid items-start gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <Pill icon={Tag} tone="dark">Essencial</Pill>
            <h3 className="mt-3 font-display text-4xl uppercase">Kit Básico</h3>
            <p className="text-sm text-muted-foreground">Só os personagens, sem bônus.</p>
            <p className="mt-5 text-sm text-muted-foreground">de <s>R$ 29,90</s> por</p>
            <p className="font-display text-6xl">{brl(PRICES.basic)}</p>
            <p className="text-xs text-muted-foreground">Pagamento único</p>
            <ul className="mt-5 space-y-2 text-sm">
              {core.map((c) => <li key={c} className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-success" />{c}</li>)}
              {bonusNames.map((c) => <li key={c} className="flex gap-2 text-muted-foreground line-through"><X className="h-5 w-5 shrink-0 text-destructive" />{c}</li>)}
            </ul>
            <button onClick={() => setModal(true)} className="mt-7 block w-full rounded-xl border-2 border-primary py-4 font-display text-xl uppercase text-primary transition hover:bg-primary hover:text-primary-foreground">Quero o Kit Básico</button>
            <p className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground"><Lock className="h-3 w-3" /> Compra segura</p>
          </div>

          <div className="relative rounded-2xl border-2 border-primary bg-card p-7 shadow-glow">
            <span className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-5 py-1.5 text-sm font-extrabold uppercase text-primary-foreground"><Star className="h-4 w-4 fill-current" /> Mais escolhido</span>
            <span className="absolute -right-3 top-8 rotate-12 rounded-lg bg-secondary px-3 py-2 text-center font-display text-lg leading-none text-secondary-foreground">-61%<br /><span className="text-xs">OFF</span></span>
            <div className="mt-2 flex flex-wrap gap-2"><Pill icon={Crown}>Premium</Pill><Pill icon={Gift} tone="red">6 bônus</Pill></div>
            <h3 className="mt-3 font-display text-4xl uppercase">Kit Premium</h3>
            <p className="text-sm text-muted-foreground">Todos os personagens + 6 bônus exclusivos.</p>
            <img src="/images/completo.jpg" alt="Tudo o que vem no Kit Premium" className="mt-4 w-full rounded-xl" />
            <p className="mt-5 text-sm text-muted-foreground">de <s>R$ 97,90</s> por</p>
            <p className="font-display text-6xl text-primary">{brl(PRICES.premium)}</p>
            <p className="text-xs text-muted-foreground">Pagamento único</p>
            <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success"><BadgeCheck className="h-4 w-4" /> Você economiza R$ 60,00</p>
            <ul className="mt-5 space-y-2 text-sm">
              {core.map((c) => <li key={c} className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-success" />{c}</li>)}
              {bonusNames.map((c, i) => <li key={c} className="flex gap-2"><Gift className="h-5 w-5 shrink-0 text-primary" /><span><strong>Bônus {i + 1}</strong> · {c}</span></li>)}
            </ul>
            <a href={PREMIUM} className="mt-7 block w-full animate-pulse-soft rounded-xl bg-gold py-4 text-center font-display text-xl uppercase text-primary-foreground shadow-glow">Quero o Kit Premium</a>
            <p className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground"><Lock className="h-3 w-3" /> Compra segura · Acesso imediato no e-mail</p>
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section className="mx-auto max-w-2xl px-4 pb-16">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <ShieldCheck className="mx-auto h-20 w-20 text-primary" />
          <h2 className="mt-4 font-display text-4xl uppercase">Garantia incondicional de 7 dias</h2>
          <p className="mt-3 text-muted-foreground">Se por qualquer motivo você não gostar do kit, é só pedir o reembolso dentro de 7 dias após a compra. Você recebe 100% do valor de volta, sem perguntas.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-2xl px-4 pb-16">
        <Heading kicker={<Pill icon={Sparkles} tone="dark">Dúvidas frequentes</Pill>}>Perguntas <span className="text-primary">frequentes</span></Heading>
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
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-5xl uppercase leading-[0.95] md:text-7xl">Transforme todo mundo em <span className="text-primary">personagem de Natal</span></h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">+200 personagens editáveis no Canva e 6 bônus exclusivos. Escolha, coloque a foto e imprima: a surpresa que vai fazer a família inteira rir nesta ceia.</p>
        <a href="#planos" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gold px-8 py-4 font-display text-xl uppercase text-primary-foreground shadow-glow"><Gift className="h-5 w-5" /> Quero meu kit agora</a>
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Check className="h-4 w-4 text-success" /> Acesso imediato</span>
          <span className="flex items-center gap-1"><Check className="h-4 w-4 text-success" /> Personalização no Canva</span>
          <span className="flex items-center gap-1"><Check className="h-4 w-4 text-success" /> Garantia de 7 dias</span>
        </div>
      </section>

      <div className="h-20 md:hidden" />
      <a href="#planos" className="fixed inset-x-4 bottom-4 z-30 rounded-xl bg-gold py-4 text-center font-display text-lg uppercase text-primary-foreground shadow-glow md:hidden">Quero meu acesso</a>

      {/* Upsell pop-up */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/85 p-4 md:items-center" onClick={() => setModal(false)}>
          <div className="relative my-6 w-full max-w-md rounded-2xl border-2 border-primary bg-card p-6 shadow-glow" onClick={(e) => e.stopPropagation()}>
            <button aria-label="Fechar" onClick={() => setModal(false)} className="absolute right-3 top-3 text-muted-foreground"><X /></button>
            <div className="flex justify-center"><Pill icon={Flame} tone="red">Espere! Oferta única</Pill></div>
            <h3 className="mt-4 text-center font-display text-4xl uppercase leading-none">Por só <span className="text-primary">+{brl(PRICES.upsellAddon)}</span> leve o Premium</h3>
            <div className="mt-3 flex items-center justify-center gap-2 text-sm"><Clock className="h-4 w-4 text-primary" /> Expira em <Timer parts={upsell.parts.slice(1)} /></div>
            <img src="/images/completo.jpg" alt="Kit Premium com todos os bônus" className="mt-4 w-full rounded-xl" />
            <p className="mt-4 text-center text-sm text-muted-foreground">Além dos +200 personagens, você desbloqueia <strong className="text-foreground">todos os 6 bônus</strong> do Kit Premium.</p>
            <p className="mt-3 text-center">
              <s className="text-muted-foreground">{brl(PRICES.premium)}</s>
              <strong className="ml-2 font-display text-5xl text-primary">{brl(upsellTotal())}</strong>
            </p>
            <p className="text-center text-xs text-muted-foreground">{brl(PRICES.basic)} do Básico + {brl(PRICES.upsellAddon)} do upgrade</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              <li className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-success" /> +200 personagens de Natal editáveis</li>
              {bonusNames.map((c, i) => <li key={c} className="flex gap-2"><Gift className="h-5 w-5 shrink-0 text-primary" /> Bônus {i + 1} · {c}</li>)}
            </ul>
            {upsell.left === 0 ? (
              <p className="mt-5 rounded-xl bg-muted p-4 text-center text-sm">O tempo acabou e esta oferta não está mais disponível.</p>
            ) : (
              <a href={UPSELL} className="mt-5 block animate-pulse-soft rounded-xl bg-gold py-4 text-center font-display text-xl uppercase text-primary-foreground">Sim! Quero por {brl(upsellTotal())}</a>
            )}
            <a href={BASIC} className="mt-3 block text-center text-sm text-muted-foreground underline">Não, obrigado. Quero só o Kit Básico por {brl(PRICES.basic)}</a>
          </div>
        </div>
      )}
    </div>
  );
}
