import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const BASIC = "https://pay.seguruspagamentos.com.br/checkout/S3H8M1";
const FULL = "https://pay.seguruspagamentos.com.br/checkout/GCJZEG";
const UPSELL = "https://pay.seguruspagamentos.com.br/checkout/0HG2T5";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Carinhas de Natal — +200 personagens editáveis no Canva" },
      { name: "description", content: "Transforme todo mundo em personagem de Natal: +200 modelos editáveis no Canva, 4 bônus e garantia de 7 dias." },
      { property: "og:title", content: "Carinhas de Natal — Kit de personagens" },
      { property: "og:description", content: "+200 personagens de Natal editáveis no Canva. Coloque a foto, imprima e divirta a família." },
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
  ["🎨", "Editável no Canva", "Modelos prontos abertos direto no Canva. Funciona na versão gratuita, no celular ou no computador."],
  ["🎅", "+200 personagens", "Papais e Mamães Noéis, duendes, renas, bonecos de neve, anjinhos, quebra-nozes e muito mais."],
  ["😂", "Fofos e engraçados", "Estilos para todo mundo: desde o duendinho das crianças até o boneco de neve do amigo mais sério."],
  ["📸", "Só colocar a foto", "Escolha o personagem, encaixe o rosto e ajuste. Em poucos minutos a figurinha está pronta."],
  ["🖨️", "Imprima em casa", "Baixe em alta qualidade e imprima em impressora comum, papel A4, adesivo ou fotográfico."],
  ["📐", "Do tamanho que quiser", "Figurinhas pequenas para lembrancinhas ou grandes para painel, porta e parede."],
];

const bonuses = [
  ["bonus1", "100 Artes de Impressão para Decoração", "Plaquinhas, toppers, bandeirolas e enfeites natalinos prontos para imprimir e decorar a ceia e a casa.", "27,00"],
  ["bonus2", "10 Brincadeiras para Animar a Noite", "Jogos simples para crianças e adultos que garantem risadas na ceia e na confraternização.", "19,00"],
  ["bonus3", "Bingo de Natal", "Cartelas temáticas prontas para imprimir e jogar com a família toda, do mais novo ao mais velho.", "17,00"],
  ["bonus4", "Guia Anti-Caos de Natal", "Checklists e cronograma para organizar ceia, presentes e decoração sem estresse de última hora.", "15,00"],
];

const core = ["+200 personagens de Natal editáveis", "Acesso pelo Canva", "Arquivos para baixar e imprimir", "Acesso imediato"];
const bonusNames = ["100 Artes de Impressão", "10 Brincadeiras para a Noite", "Bingo de Natal", "Guia Anti-Caos de Natal"];

const faqs = [
  ["Como vou receber o kit?", "O produto é 100% digital. Logo após a confirmação do pagamento, você recebe o acesso no e-mail informado na compra. Nada é enviado pelos Correios."],
  ["Consigo imprimir em casa?", "Sim. Depois de personalizar, é só baixar e imprimir em impressora comum, em papel A4, adesivo ou fotográfico. Também pode levar em uma gráfica ou papelaria."],
  ["Preciso de máquina de corte?", "Não. Uma tesoura resolve. Se você já tem plotter de recorte, também pode usar, mas não é obrigatório."],
  ["Quantas vezes posso imprimir?", "Quantas vezes quiser. Você pode criar figurinhas para a família toda, para a escola ou para o trabalho, e usar de novo nos próximos Natais."],
  ["Preciso de algum programa? Tenho que pagar o Canva?", "Você só precisa do Canva, que funciona na versão gratuita, pelo aplicativo do celular ou pelo navegador do computador. Não é preciso saber editar: os modelos já vêm prontos."],
  ["Como recebo os bônus?", "Os 4 bônus são exclusivos do Kit Completo e chegam junto com os personagens, no mesmo acesso enviado por e-mail."],
  ["Por quanto tempo terei acesso?", "O acesso é vitalício. Você paga uma única vez e pode usar o kit sempre que quiser."],
];

function useCountdown(seconds: number, active = true) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(t);
  }, [active]);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return { left, label: `${mm}:${ss}` };
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-primary">{children}</p>;
}
function H2({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return <h2 className={`text-center font-display text-3xl font-extrabold leading-tight md:text-4xl ${light ? "text-primary-foreground" : "text-foreground"}`}>{children}</h2>;
}

function Index() {
  const [date, setDate] = useState("");
  const banner = useCountdown(15 * 60);
  const [slide, setSlide] = useState(0);
  const [modal, setModal] = useState(false);
  const upsell = useCountdown(5 * 60, modal);

  useEffect(() => {
    setDate(new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long" }));
  }, []);

  const go = (d: number) => setSlide((s) => (s + d + gallery.length) % gallery.length);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <div className="sticky top-0 z-40 bg-primary px-4 py-2.5 text-center text-sm text-primary-foreground">
        🎄 Oferta de Natal com <strong>desconto</strong> só hoje{date && `, ${date}`} · termina em <strong className="tabular-nums">{banner.label}</strong>
      </div>

      {/* Galeria */}
      <section className="mx-auto max-w-3xl px-4 pt-12 pb-6">
        <Eyebrow>O que você vai receber</Eyebrow>
        <H2>Veja alguns personagens do kit</H2>
        <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">Arraste para o lado e veja como as figurinhas ficam depois de colocar a foto.</p>
        <div className="relative mt-8">
          <div className="overflow-hidden rounded-2xl shadow-card">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${slide * 100}%)` }}
              onTouchStart={(e) => ((e.currentTarget as any)._x = e.touches[0]!.clientX)}
              onTouchEnd={(e) => { const dx = e.changedTouches[0]!.clientX - (e.currentTarget as any)._x; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); }}>
              {gallery.map(([src, alt]) => (
                <img key={src} src={`/images/${src}.jpg`} alt={alt} className="w-full shrink-0 object-cover" />
              ))}
            </div>
          </div>
          <button aria-label="Anterior" onClick={() => go(-1)} className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-card text-2xl text-foreground shadow-card">‹</button>
          <button aria-label="Próximo" onClick={() => go(1)} className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-card text-2xl text-foreground shadow-card">›</button>
          <div className="mt-4 flex justify-center gap-2">
            {gallery.map((_, i) => (
              <button key={i} aria-label={`Imagem ${i + 1}`} onClick={() => setSlide(i)} className={`h-2 rounded-full transition-all ${i === slide ? "w-6 bg-primary" : "w-2 bg-border"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-4xl gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(([icon, t, d]) => (
          <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="text-3xl">{icon}</div>
            <h3 className="mt-3 text-lg font-bold">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      {/* Bônus */}
      <section className="bg-secondary px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-accent">Exclusivo do Kit Completo</p>
          <H2 light>4 bônus exclusivos inclusos</H2>
          <p className="mx-auto mt-3 max-w-lg text-center text-secondary-foreground/80">Escolhendo o Kit Completo, você leva tudo isso de presente para deixar o seu Natal ainda mais divertido.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {bonuses.map(([img, t, d, price], i) => (
              <div key={img} className="overflow-hidden rounded-2xl bg-card shadow-card">
                <img src={`/images/${img}.jpg`} alt={`Bônus ${i + 1}: ${t}`} className="w-full" />
                <div className="p-5">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">Bônus 0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-bold">{t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                  <p className="mt-3 text-sm"><s className="text-muted-foreground">R$ {price}</s> <strong className="ml-1 text-success">Grátis</strong></p>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-sm rounded-2xl border-2 border-dashed border-accent p-6 text-center text-secondary-foreground">
            <p className="text-sm">Somando os 4 bônus, você pagaria</p>
            <p className="mt-1 text-2xl"><s>R$ 78,00</s></p>
            <p className="mt-1 font-display text-3xl font-extrabold text-accent">Hoje: grátis!</p>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="mx-auto max-w-4xl scroll-mt-14 px-4 py-16">
        <Eyebrow>Escolha seu plano</Eyebrow>
        <H2>Escolha seu Kit de Natal</H2>
        <p className="mt-3 text-center text-muted-foreground">Pagamento único, acesso imediato e garantia de 7 dias.</p>
        <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="text-xl font-bold">Kit Básico</h3>
            <p className="text-sm text-muted-foreground">Só os personagens, sem bônus.</p>
            <p className="mt-5 text-sm text-muted-foreground">de <s>R$ 19,90</s></p>
            <p className="font-display text-5xl font-extrabold">R$2,99</p>
            <p className="text-xs text-muted-foreground">Pagamento único</p>
            <ul className="mt-5 space-y-2 text-sm">
              {core.map((c) => <li key={c}>✅ {c}</li>)}
              {bonusNames.map((c) => <li key={c} className="text-muted-foreground line-through">❌ {c}</li>)}
            </ul>
            <button onClick={() => setModal(true)} className="mt-6 block w-full rounded-xl border-2 border-primary py-3.5 text-center font-bold text-primary transition hover:bg-primary/10">Quero o Kit Básico</button>
            <p className="mt-3 text-center text-xs text-muted-foreground">🔒 Compra segura</p>
          </div>

          <div className="relative rounded-2xl border-2 border-primary bg-card p-6 shadow-card">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">⭐ Mais escolhido</span>
            <h3 className="text-xl font-bold">Kit Completo</h3>
            <p className="text-sm text-muted-foreground">Todos os personagens + 4 bônus exclusivos.</p>
            <img src="/images/completo.jpg" alt="Tudo o que vem no Kit Completo" className="mt-4 w-full rounded-xl" />
            <p className="mt-5 text-sm text-muted-foreground">de <s>R$ 97,90</s></p>
            <p className="font-display text-5xl font-extrabold text-primary">R$10,00</p>
            <p className="text-xs text-muted-foreground">Pagamento único</p>
            <p className="mt-2 inline-block rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success">Você economiza R$ 87,90</p>
            <ul className="mt-5 space-y-2 text-sm">
              {core.map((c) => <li key={c}>✅ {c}</li>)}
              {bonusNames.map((c, i) => <li key={c}>🎁 <strong>Bônus {i + 1}</strong> · {c}</li>)}
            </ul>
            <a href={FULL} className="mt-6 block w-full animate-pulse-soft rounded-xl bg-primary py-4 text-center font-bold text-primary-foreground shadow-card">Quero o Kit Completo</a>
            <p className="mt-3 text-center text-xs text-muted-foreground">🔒 Compra segura · Acesso imediato no e-mail</p>
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section className="mx-auto max-w-2xl px-4 pb-16">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent font-display text-2xl font-extrabold text-accent-foreground">7 dias</div>
          <h2 className="mt-4 font-display text-2xl font-extrabold">Garantia incondicional de 7 dias</h2>
          <p className="mt-3 text-muted-foreground">Se por qualquer motivo você não gostar do kit, é só pedir o reembolso dentro de 7 dias após a compra. Você recebe 100% do valor de volta, sem perguntas.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-2xl px-4 pb-16">
        <Eyebrow>Dúvidas frequentes</Eyebrow>
        <H2>Perguntas frequentes</H2>
        <div className="mt-8 space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="group rounded-xl border border-border bg-card p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {q}<span className="text-xl text-primary transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-hero px-4 py-16 text-center text-primary-foreground">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">Última chamada</p>
        <H2 light>Transforme todo mundo em personagem de Natal</H2>
        <p className="mx-auto mt-4 max-w-xl opacity-90">+200 personagens editáveis no Canva e 4 bônus exclusivos. Escolha, coloque a foto e imprima: a surpresa que vai fazer a família inteira rir nesta ceia.</p>
        <a href="#planos" className="mt-8 inline-block animate-pulse-soft rounded-xl bg-accent px-8 py-4 font-bold text-accent-foreground shadow-card">Quero meu kit agora</a>
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm opacity-90">
          <span>✓ Acesso imediato</span><span>✓ Personalização no Canva</span><span>✓ Garantia de 7 dias</span>
        </div>
      </section>

      <div className="h-20 md:hidden" />
      <a href="#planos" className="fixed inset-x-4 bottom-4 z-30 rounded-xl bg-primary py-4 text-center font-bold text-primary-foreground shadow-card md:hidden">Quero meu acesso</a>

      {/* Upsell modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-foreground/60 p-4" onClick={() => setModal(false)}>
          <div className="relative w-full max-w-md rounded-2xl bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <button aria-label="Fechar" onClick={() => setModal(false)} className="absolute right-3 top-2 text-2xl text-muted-foreground">×</button>
            <p className="text-center font-bold text-primary">⚠️ Espere! Oferta única antes de continuar</p>
            <p className="mt-1 text-center text-sm">Esta oferta expira em <strong className="tabular-nums">{upsell.label}</strong></p>
            <img src="/images/completo.jpg" alt="Kit Completo: personagens + 4 bônus" className="mt-4 w-full rounded-xl" />
            <h3 className="mt-4 text-center text-xl font-bold">Leve o Kit Completo com os 4 bônus</h3>
            <p className="mt-1 text-center text-sm text-muted-foreground">Além dos +200 personagens, você recebe <strong>todos os bônus</strong> para deixar a ceia ainda mais divertida.</p>
            <p className="mt-3 text-center"><s className="text-muted-foreground">R$ 10,00</s> <strong className="ml-1 font-display text-3xl text-primary">R$ 5,90</strong></p>
            <ul className="mt-3 space-y-1 text-sm">
              <li>✅ +200 personagens de Natal editáveis</li>
              {bonusNames.map((c, i) => <li key={c}>🎁 Bônus {i + 1} · {c}</li>)}
            </ul>
            {upsell.left === 0 ? (
              <p className="mt-5 rounded-xl bg-muted p-4 text-center text-sm">O tempo acabou e esta oferta não está mais disponível.</p>
            ) : (
              <a href={UPSELL} className="mt-5 block rounded-xl bg-primary py-4 text-center font-bold text-primary-foreground">Sim! Quero o Kit Completo</a>
            )}
            <a href={BASIC} className="mt-3 block text-center text-sm text-muted-foreground underline">Não, obrigado. Quero só o Kit Básico por R$ 2,99</a>
          </div>
        </div>
      )}
    </div>
  );
}
