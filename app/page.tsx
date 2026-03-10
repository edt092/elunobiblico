import Image from "next/image";
import CountdownTimer from "./components/CountdownTimer";
import ScrollReveal from "./components/ScrollReveal";
import FAQItem from "./components/FAQItem";
import StickyBottomBar from "./components/StickyBottomBar";
import BuyButton from "./components/BuyButton";

// Fotos de personas reales para prueba social
const AVATAR_PHOTOS = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/76.jpg",
];

const FAQS = [
  {
    question: "¿Necesito imprimir algo para jugar?",
    answer:
      "El paquete incluye el juego en formato digital imprimible (PDF listo para imprimir en casa) MÁS acceso a la app digital. Puedes jugar desde tu tablet o celular sin imprimir nada, o imprimir las cartas para una experiencia física completa.",
  },
  {
    question: "¿Para qué edades es adecuado?",
    answer:
      "El UNO Bíblico está diseñado para niños desde 6 años en adelante, aunque adultos y jóvenes también lo disfrutan. Es perfecto para la dinámica familiar porque todos pueden participar al mismo nivel.",
  },
  {
    question: "¿Cuánto tiempo dura una partida?",
    answer:
      "Cada partida dura entre 20 y 45 minutos, perfecta para después de la cena o durante una reunión familiar. Los niños siempre quieren jugar otra vez.",
  },
  {
    question: "¿Es necesario saber mucho de la Biblia para jugar?",
    answer:
      "¡No! De hecho, ese es el propósito: que aprendan jugando. Las cartas incluyen información bíblica integrada de forma sencilla, así que mientras juegan, van aprendiendo sin darse cuenta.",
  },
  {
    question: "¿Cómo recibo el juego después de comprarlo?",
    answer:
      "Recibes acceso inmediato a tu email. No hay esperas, no hay envío físico. En menos de 5 minutos puedes estar jugando con tu familia.",
  },
  {
    question: "¿Qué pasa si no me gusta?",
    answer:
      "Ofrecemos garantía total de satisfacción por 7 días. Si por cualquier razón no quedas completamente satisfecho, te devolvemos el 100% de tu dinero sin preguntas. Sin riesgo.",
  },
];

const TESTIMONIALS = [
  {
    name: "María González",
    location: "Ciudad de México",
    text: "Mis hijos piden jugar el UNO Bíblico cada noche después de cenar. Antes era imposible arrancarlos del celular. Ahora es mi herramienta favorita para el devocional familiar.",
    stars: 5,
    detail: "Mamá de 3 niños (7, 10 y 14 años)",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Pastor Roberto Díaz",
    location: "Bogotá, Colombia",
    text: "Lo uso en la escuela dominical y es revolucionario. Los niños memorizan versículos sin darse cuenta. Estoy recomendándolo a todas las familias de mi iglesia.",
    stars: 5,
    detail: "Pastor y educador cristiano",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Andrea y Carlos Torres",
    location: "Miami, Florida",
    text: "Vivimos en EE.UU. y nos costaba mucho mantener a nuestros hijos conectados con la fe en español. El UNO Bíblico cambió eso completamente. Es un tesoro.",
    stars: 5,
    detail: "Familia cristiana en el exterior",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Sofía Ramírez",
    location: "Buenos Aires, Argentina",
    text: "Mi hija de 8 años ahora reconoce personajes bíblicos que yo no sabía a su edad. Y lo más increíble: ella le enseña a su abuela. Una inversión que vale cada peso.",
    stars: 5,
    detail: "Mamá y maestra cristiana",
    photo: "https://randomuser.me/api/portraits/women/83.jpg",
  },
  {
    name: "Juan Carlos Mendoza",
    location: "Caracas, Venezuela",
    text: "Pensé que era solo otro juego de cartas, pero cambió la dinámica de nuestra familia. Ahora tenemos conversaciones bíblicas genuinas que brotan del juego. Increíble.",
    stars: 5,
    detail: "Padre de familia y líder de célula",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    name: "Daniela López",
    location: "Santiago, Chile",
    text: "En menos de dos semanas, mis hijos ya saben más de 20 personajes bíblicos. Antes de que llegara este juego, el devocional duraba 5 minutos. Ahora piden más tiempo.",
    stars: 5,
    detail: "Mamá homeschooler",
    photo: "https://randomuser.me/api/portraits/women/26.jpg",
  },
];

const INCLUDES = [
  { icon: "🃏", title: "108 Cartas Bíblicas", desc: "Personajes, versículos, lugares y conceptos del Antiguo y Nuevo Testamento" },
  { icon: "📖", title: "Versículos Clave", desc: "Cada carta incluye un versículo bíblico para reflexionar y memorizar" },
  { icon: "👨‍👩‍👧‍👦", title: "Modo Familiar Completo", desc: "Reglas adaptadas para niños desde 6 años hasta adultos" },
  { icon: "🎯", title: "Cartas de Acción Especiales", desc: "Con desafíos bíblicos que hacen el juego más profundo y emocionante" },
  { icon: "📱", title: "Versión Digital Incluida", desc: "PDF de alta resolución listo para imprimir en casa" },
  { icon: "🌟", title: "Guía de Devocionales", desc: "Cómo conectar el juego con momentos espirituales en familia" },
];

const BONUSES = [
  {
    num: "1",
    img: "/bono1.jpg",
    title: "EL UNO BÍBLICO DIGITAL",
    subtitle: "La App para Jugar en Cualquier Lugar",
    value: "$27",
    desc: "Acceso completo a la versión digital interactiva. Juega en tablet, celular o computadora. Ideal para viajes, esperas y momentos inesperados con tu familia.",
  },
  {
    num: "2",
    img: "/bono2.jpg",
    title: "CALENDARIO DE FE FAMILIAR",
    subtitle: "Aplica lo Aprendido en tu Vida Diaria",
    value: "$17",
    desc: "Un sistema semanal con reflexiones bíblicas y actividades para cada día. Transforma lo que aprenden jugando en hábitos espirituales permanentes en familia.",
  },
  {
    num: "3",
    img: "/bono3.jpg",
    title: "COMUNIDAD EXCLUSIVA WHATSAPP",
    subtitle: "Familia de Fe + Recursos Nuevos Cada Semana",
    value: "$0 → Invaluable",
    desc: "Únete a más de 4,000 familias que comparten recursos, desafíos y testimonios. Recibirás nuevas cartas y expansiones antes que nadie.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── STICKY TOP BAR ── */}
      <div className="sticky top-0 z-50 bg-[#0D0305] border-b border-[rgba(212,175,55,0.25)] py-2 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <span className="badge-live inline-flex items-center gap-1.5 text-[#E63000] font-bold text-xs uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#E63000]" />
            Oferta de Lanzamiento
          </span>
          <span className="text-[#FFF8F0] text-sm font-light hidden sm:inline">—</span>
          <span className="text-[#F5E6D0] text-sm">
            Precio especial termina en:{" "}
          </span>
          <CountdownTimer />
        </div>
      </div>

      <main className="pb-32">

        {/* ══════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════ */}
        <section className="hero-bg noise relative min-h-screen flex items-center justify-center px-5 py-20 overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)", filter: "blur(40px)" }} />

          <div className="relative z-10 max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: Copy */}
            <div className="text-center lg:text-left">
              {/* Pre-headline */}
              <p className="font-sacred text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-5">
                Para Familias Cristianas
              </p>

              {/* Emotional hook headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-black leading-tight text-white mb-6">
                El Juego que{" "}
                <em className="gold-shimmer not-italic">Acerca a tu Familia</em>{" "}
                a Dios —{" "}
                <span className="text-[#FF4500]">Mientras se Ríen Juntos</span>
              </h1>

              {/* Sub-headline with emotional trigger */}
              <p className="text-[#E8D5C0] text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                ¿Cuándo fue la última vez que toda tu familia habló de la Biblia y no quiso parar?
                El UNO Bíblico transforma{" "}
                <span className="font-bold text-[#D4AF37]">cualquier noche ordinaria</span>{" "}
                en un momento de fe que tus hijos recordarán toda la vida.
              </p>

              {/* Social proof micro */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
                <div className="flex -space-x-2">
                  {AVATAR_PHOTOS.map((src, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#D4AF37] overflow-hidden flex-shrink-0">
                      <Image src={src} alt="Familia cristiana" width={40} height={40} className="object-cover w-full h-full" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-[#D4AF37] fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#C8B49A] text-sm">
                    <strong className="text-[#F0D060] stat-number">4,127</strong> familias ya lo tienen
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="space-y-4">
                <BuyButton className="pulse-cta inline-flex items-center justify-center gap-3 bg-[#E63000] hover:bg-[#FF4500] text-white font-black text-xl px-10 py-5 rounded-full uppercase tracking-wider transition-all duration-200 w-full sm:w-auto">
                  <span>¡Quiero el Juego AHORA!</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </BuyButton>
                <p className="text-[#A89070] text-sm text-center lg:text-left">
                  🔒 Pago 100% seguro · Acceso inmediato · Garantía 7 días
                </p>
              </div>
            </div>

            {/* RIGHT: Product Visual */}
            <div className="relative flex items-center justify-center">
              {/* Floating cards decoration */}
              <div className="float-1 absolute -top-8 -left-6 w-20 h-28 rounded-xl shadow-2xl overflow-hidden border-2 border-[rgba(212,175,55,0.4)] z-10 opacity-80">
                <div className="w-full h-full bg-gradient-to-br from-[#B22222] to-[#5C0F0F] flex items-center justify-center">
                  <span className="text-4xl font-black text-white font-sacred">7</span>
                </div>
              </div>
              <div className="float-2 absolute -bottom-6 -right-4 w-16 h-24 rounded-xl shadow-2xl overflow-hidden border-2 border-[rgba(212,175,55,0.4)] z-10 opacity-80">
                <div className="w-full h-full bg-gradient-to-br from-[#1B5E1B] to-[#0A2A0A] flex items-center justify-center">
                  <span className="text-3xl font-black text-white font-sacred">✓</span>
                </div>
              </div>
              <div className="float-3 absolute top-1/3 -right-8 w-14 h-20 rounded-xl shadow-2xl overflow-hidden border-2 border-[rgba(212,175,55,0.4)] z-10 opacity-70">
                <div className="w-full h-full bg-gradient-to-br from-[#1A1A5C] to-[#0A0A2A] flex items-center justify-center">
                  <span className="text-2xl">🕊️</span>
                </div>
              </div>

              {/* Main product image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[rgba(212,175,55,0.3)]"
                style={{ boxShadow: "0 0 80px rgba(212,175,55,0.2), 0 30px 80px rgba(0,0,0,0.7)" }}>
                <Image
                  src="/hero.png"
                  alt="El UNO Bíblico — Juego de Cartas"
                  width={520}
                  height={520}
                  className="object-cover"
                  priority
                />
                {/* Badge overlay */}
                <div className="absolute top-4 right-4 bg-[#E63000] text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                  + 3 Bonos Gratis
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SOCIAL PROOF BAR
        ══════════════════════════════════════════ */}
        <section className="bg-[#D4AF37] py-5 px-5">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { num: "4,127+", label: "Familias" },
              { num: "98%", label: "Recomiendan" },
              { num: "15 min", label: "Para comenzar" },
              { num: "⭐ 4.9", label: "Calificación" },
            ].map(({ num, label }, i) => (
              <div key={i}>
                <div className="text-[#0D0305] text-2xl sm:text-3xl font-black">{num}</div>
                <div className="text-[#5C0F0F] text-xs font-bold uppercase tracking-widest mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PAIN SECTION
        ══════════════════════════════════════════ */}
        <section className="pain-bg py-20 px-5">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <p className="font-sacred text-xs tracking-[0.3em] text-[#8B1A1A] uppercase mb-4">
                Reconoces esto...
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-[#1A0A00] leading-tight mb-8">
                ¿Cuántas veces has intentado hacer un devocional familiar{" "}
                <span className="text-[#8B1A1A]">y en 5 minutos todos ya perdieron el interés?</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid sm:grid-cols-3 gap-6 my-12">
                {[
                  {
                    icon: "😞",
                    title: "Los niños se aburren",
                    text: "Prefieren el celular o la televisión antes que hablar de la Biblia. Y tú te sientes frustrado sin saber cómo competir con las pantallas.",
                  },
                  {
                    icon: "😰",
                    title: "El tiempo se va volando",
                    text: "Los días pasan y el tiempo de calidad en familia se vuelve cada vez más escaso. Y lo peor: los años de infancia no vuelven.",
                  },
                  {
                    icon: "😔",
                    title: "La fe se pierde en el camino",
                    text: "Ves cómo tus hijos crecen más desconectados de la Palabra de Dios y no sabes cómo hacer que la fe sea algo vivo y emocionante para ellos.",
                  },
                ].map(({ icon, title, text }, i) => (
                  <div key={i} className="bg-white/70 rounded-2xl p-6 border border-[rgba(139,26,26,0.12)] shadow-sm text-left">
                    <div className="text-4xl mb-3">{icon}</div>
                    <h3 className="font-display font-bold text-[#1A0A00] text-lg mb-2">{title}</h3>
                    <p className="text-[#6B4A3A] text-sm leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="bg-[#1A0810] rounded-2xl p-8 border border-[rgba(212,175,55,0.3)]">
                <p className="text-[#F5E6D0] text-xl sm:text-2xl font-display italic leading-relaxed">
                  &ldquo;Lo que más duele no es el caos de hoy.
                  Es imaginar a tus hijos adultos sin una fe sólida,{" "}
                  <strong className="text-[#D4AF37] not-italic">porque nadie hizo de ella algo emocionante cuando eran niños.</strong>&rdquo;
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            BRIDGE / SOLUTION TEASE
        ══════════════════════════════════════════ */}
        <section className="solution-bg py-20 px-5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <ScrollReveal>
              <p className="font-sacred text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4">
                Pero hay una solución
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
                ¿Y si tu familia{" "}
                <span className="gold-shimmer">pidiera hablar de Dios</span>{" "}
                en lugar de que tú lo tuvieras que pedir?
              </h2>
              <p className="text-[#C8B49A] text-xl leading-relaxed mb-10">
                No es magia. Es simplemente que cuando algo es{" "}
                <strong className="text-[#D4AF37]">divertido y emocionante</strong>,
                los niños lo buscan por cuenta propia. Y eso es exactamente lo que hace El UNO Bíblico.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative inline-block">
                <div className="absolute -inset-3 rounded-3xl opacity-30"
                  style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)", filter: "blur(20px)" }} />
                <div className="relative bg-[#D4AF37] text-[#0D0305] text-2xl font-black px-8 py-4 rounded-2xl inline-block">
                  Presentamos: EL UNO BÍBLICO
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PRODUCT REVEAL + WHAT'S INCLUDED
        ══════════════════════════════════════════ */}
        <section className="py-20 px-5 bg-[#FFF8F0]">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-14">
                <p className="font-sacred text-xs tracking-[0.3em] text-[#8B1A1A] uppercase mb-4">
                  Todo lo que incluye
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-[#1A0A00] leading-tight mb-4">
                  Un Juego Completo que Enseña,{" "}
                  <span className="text-[#8B1A1A]">Une y Transforma</span>
                </h2>
                <div className="gold-divider mt-6" />
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {INCLUDES.map(({ icon, title, desc }, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="bg-white rounded-2xl p-6 border border-[rgba(139,26,26,0.1)] shadow-sm hover:shadow-md hover:border-[rgba(212,175,55,0.4)] transition-all duration-300 h-full">
                    <div className="text-4xl mb-3">{icon}</div>
                    <h3 className="font-display font-bold text-[#1A0A00] text-lg mb-2">{title}</h3>
                    <p className="text-[#6B4A3A] text-sm leading-relaxed">{desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* How it works */}
            <ScrollReveal>
              <div className="bg-[#1A0810] rounded-3xl p-8 sm:p-12 border border-[rgba(212,175,55,0.3)]">
                <h3 className="font-display text-2xl sm:text-3xl font-black text-white text-center mb-10">
                  ¿Cómo funciona? <span className="text-[#D4AF37]">Más simple de lo que crees</span>
                </h3>
                <div className="grid sm:grid-cols-3 gap-8">
                  {[
                    {
                      step: "01",
                      icon: "📦",
                      title: "Descarga al instante",
                      text: "Tras tu compra, recibes acceso inmediato por email. Descarga en segundos y comienza hoy mismo.",
                    },
                    {
                      step: "02",
                      icon: "🃏",
                      title: "Imprime o usa la app",
                      text: "Imprime las cartas en casa o usa la versión digital en tu tablet. Tú eliges cómo jugar.",
                    },
                    {
                      step: "03",
                      icon: "❤️",
                      title: "Juega y conecta",
                      text: "Reúne a tu familia, sigue las reglas simples y observa cómo la fe y la risa llenan el hogar.",
                    },
                  ].map(({ step, icon, title, text }, i) => (
                    <div key={i} className="text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.4)] mb-4">
                        <span className="text-2xl">{icon}</span>
                      </div>
                      <div className="font-sacred text-xs text-[#A88B1A] tracking-widest mb-2">{step}</div>
                      <h4 className="font-display text-white font-bold text-lg mb-2">{title}</h4>
                      <p className="text-[#A89070] text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            BONUSES SECTION
        ══════════════════════════════════════════ */}
        <section className="solution-bg py-20 px-5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-3"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(212,175,55,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(139,26,26,0.1) 0%, transparent 50%)" }} />
          <div className="max-w-5xl mx-auto relative z-10">
            <ScrollReveal>
              <div className="text-center mb-14">
                <div className="inline-block bg-[#E63000] text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest mb-5">
                  Solo por hoy — Oferta de Lanzamiento
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                  Llévate también estos{" "}
                  <span className="gold-shimmer">3 Bonos Gratis</span>{" "}
                  (Valorados en $44)
                </h2>
                <p className="text-[#C8B49A] text-lg">
                  Son tuyos sin costo adicional. Pero solo con esta oferta especial.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-3 gap-6">
              {BONUSES.map(({ num, img, title, subtitle, value, desc }, i) => (
                <ScrollReveal key={i} delay={i * 120}>
                  <div className="bonus-card rounded-2xl overflow-hidden h-full flex flex-col">
                    <div className="relative">
                      <Image
                        src={img}
                        alt={title}
                        width={400}
                        height={240}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#D4AF37] text-[#0D0305] text-xs font-black px-2.5 py-1 rounded-full">
                        BONO {num}
                      </div>
                      <div className="absolute top-3 right-3 bg-[rgba(0,0,0,0.7)] text-[#D4AF37] text-xs font-bold px-2.5 py-1 rounded-full border border-[rgba(212,175,55,0.4)]">
                        Valor: {value}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-sacred text-[#D4AF37] text-sm tracking-wider mb-1">{title}</h3>
                      <p className="font-display text-white font-bold text-lg mb-3 leading-snug">{subtitle}</p>
                      <p className="text-[#A89070] text-sm leading-relaxed flex-1">{desc}</p>
                      <div className="mt-4 pt-4 border-t border-[rgba(212,175,55,0.2)]">
                        <span className="text-[#E63000] font-black text-sm uppercase tracking-wider">
                          ✓ Incluido Gratis
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            TESTIMONIALS
        ══════════════════════════════════════════ */}
        <section className="py-20 px-5 bg-[#F5E6D0]">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-14">
                <p className="font-sacred text-xs tracking-[0.3em] text-[#8B1A1A] uppercase mb-4">
                  Lo que dicen las familias
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-[#1A0A00] leading-tight">
                  No solo un juego —{" "}
                  <span className="text-[#8B1A1A]">un antes y un después</span>{" "}
                  en tu familia
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TESTIMONIALS.map(({ name, location, text, stars, detail, photo }, i) => (
                <ScrollReveal key={i} delay={i * 70}>
                  <div className="testi-card rounded-2xl p-6 h-full flex flex-col">
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(stars)].map((_, j) => (
                        <svg key={j} className="w-4 h-4 text-[#D4AF37] fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-[#3A1A00] text-sm leading-relaxed flex-1 italic mb-5">
                      &ldquo;{text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[rgba(212,175,55,0.4)] flex-shrink-0">
                        <Image src={photo} alt={name} width={44} height={44} className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <p className="font-bold text-[#1A0A00] text-sm">{name}</p>
                        <p className="text-[#8B1A1A] text-xs">{detail}</p>
                        <p className="text-[#A89070] text-xs">{location}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PRICING / OFFER SECTION
        ══════════════════════════════════════════ */}
        <section id="comprar" className="solution-bg py-24 px-5 relative overflow-hidden">
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 60%)" }} />
          <div className="max-w-2xl mx-auto relative z-10">
            <ScrollReveal>
              <div className="text-center mb-10">
                <p className="font-sacred text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4">
                  Decisión de por vida
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                  Empieza Hoy por{" "}
                  <span className="gold-shimmer">Menos de lo que Gastas en Pizza</span>
                </h2>
                <p className="text-[#C8B49A] text-lg">
                  Una sola inversión. Impacto en tu familia para siempre.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="price-box rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
                {/* Hot badge */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-[#E63000] text-white text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg">
                    🔥 Más Vendido
                  </div>
                </div>

                <h3 className="font-display text-2xl font-black text-white mt-4 mb-8">
                  El UNO Bíblico — Paquete Completo
                </h3>

                {/* Value stack */}
                <div className="text-left space-y-3 mb-8 bg-[rgba(255,255,255,0.04)] rounded-2xl p-6">
                  {[
                    { item: "El UNO Bíblico (108 Cartas Digitales)", value: "$14.99" },
                    { item: "Bono 1: App Digital Interactiva", value: "$27" },
                    { item: "Bono 2: Calendario de Fe Familiar", value: "$17" },
                    { item: "Bono 3: Comunidad Exclusiva WhatsApp", value: "Invaluable" },
                  ].map(({ item, value }, i) => (
                    <div key={i} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[#D4AF37] font-bold text-lg leading-none">✓</span>
                        <span className="text-[#E8D5C0] text-sm">{item}</span>
                      </div>
                      <span className="text-[#A89070] text-sm whitespace-nowrap line-through">{value}</span>
                    </div>
                  ))}
                  <div className="border-t border-[rgba(212,175,55,0.3)] pt-3 flex items-center justify-between">
                    <span className="text-[#F5E6D0] font-bold">Valor Total Real</span>
                    <span className="text-[#A89070] font-bold line-through">$71+</span>
                  </div>
                </div>

                {/* Price reveal */}
                <div className="mb-8">
                  <div className="text-[#E63000] font-black text-sm uppercase tracking-widest mb-3">
                    🔥 Oferta especial — Solo por tiempo limitado
                  </div>
                  <div className="flex items-center justify-center gap-5 mb-3">
                    {/* Tachado */}
                    <div className="text-center">
                      <div className="text-[#A89070] text-xs uppercase tracking-wider mb-1">Antes</div>
                      <span className="price-cross text-[#A89070] text-4xl font-black">$27</span>
                    </div>
                    {/* Flecha */}
                    <span className="text-[#E63000] text-3xl font-black">→</span>
                    {/* Nuevo precio */}
                    <div className="text-center">
                      <div className="text-[#D4AF37] text-xs uppercase tracking-wider font-bold mb-1">Ahora</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[#F5E6D0] text-xl font-light">USD</span>
                        <span className="text-[#D4AF37] text-7xl font-black leading-none">$14</span>
                        <span className="text-[#D4AF37] text-4xl font-black leading-none">.99</span>
                      </div>
                    </div>
                  </div>
                  {/* Savings badge */}
                  <div className="inline-block bg-[#E63000] text-white text-sm font-black px-4 py-1.5 rounded-full mb-3">
                    ¡Ahorras $12 hoy!
                  </div>
                  <p className="text-[#A89070] text-sm">
                    Pago único · Sin suscripción · Acceso de por vida
                  </p>
                </div>

                {/* Countdown */}
                <div className="bg-[rgba(230,48,0,0.1)] border border-[rgba(230,48,0,0.3)] rounded-2xl p-4 mb-8">
                  <p className="text-[#FF4500] font-bold text-sm mb-3 uppercase tracking-wider">
                    ⏰ Este precio desaparece en:
                  </p>
                  <CountdownTimer />
                </div>

                {/* CTA */}
                <BuyButton className="pulse-cta block w-full bg-[#E63000] hover:bg-[#FF4500] text-white font-black text-2xl px-8 py-6 rounded-2xl uppercase tracking-wider transition-all duration-200 mb-4 text-center">
                  ¡SÍ! QUIERO MI UNO BÍBLICO →
                </BuyButton>
                <p className="text-[#A89070] text-sm mb-6">
                  🔒 Pago 100% Seguro · Solo USD $14.99 hoy
                </p>

                {/* Payment icons */}
                <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                  {["💳 Visa", "💳 Mastercard", "💳 Amex", "🅿️ PayPal"].map((p, i) => (
                    <span key={i} className="bg-[rgba(255,255,255,0.08)] text-[#C8B49A] text-xs px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.1)]">
                      {p}
                    </span>
                  ))}
                </div>

                {/* Scarcity */}
                <div className="bg-[rgba(230,48,0,0.08)] border border-[rgba(230,48,0,0.25)] rounded-xl p-3">
                  <p className="text-[#FF6B35] text-sm font-bold">
                    ⚠️ Solo quedan <strong>47 copias</strong> al precio de lanzamiento
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            GUARANTEE SECTION
        ══════════════════════════════════════════ */}
        <section className="py-20 px-5 bg-white">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="flex flex-col sm:flex-row items-center gap-10 bg-[#F5E6D0] rounded-3xl p-8 sm:p-12 border border-[rgba(139,26,26,0.12)]">
                {/* Guarantee badge */}
                <div className="flex-shrink-0 relative w-36 h-36">
                  <div className="guarantee-ring absolute inset-0 rounded-full border-4 border-dashed border-[#2D7A2D] opacity-50" />
                  <div className="absolute inset-3 rounded-full bg-[#2D7A2D] flex flex-col items-center justify-center shadow-lg">
                    <span className="text-white text-3xl">🛡️</span>
                    <span className="text-white text-[10px] font-black uppercase tracking-wider leading-tight text-center">Garantía<br />7 Días</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-[#1A0A00] mb-4">
                    Pruébalo Sin Riesgo Por{" "}
                    <span className="text-[#2D7A2D]">7 Días Completos</span>
                  </h3>
                  <p className="text-[#6B4A3A] leading-relaxed mb-4">
                    Si por cualquier razón —la que sea— no quedas completamente satisfecho
                    con El UNO Bíblico, te devolvemos el 100% de tu dinero. Sin preguntas,
                    sin trámites, sin demoras.
                  </p>
                  <p className="text-[#8B1A1A] font-bold">
                    El riesgo es nuestro. La recompensa para tu familia.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FAQ SECTION
        ══════════════════════════════════════════ */}
        <section className="py-20 px-5 bg-[#FFF8F0]">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="font-sacred text-xs tracking-[0.3em] text-[#8B1A1A] uppercase mb-4">
                  Preguntas Frecuentes
                </p>
                <h2 className="font-display text-3xl font-black text-[#1A0A00]">
                  Todo lo que necesitas saber
                </h2>
              </div>
            </ScrollReveal>

            <div>
              {FAQS.map(({ question, answer }, i) => (
                <FAQItem key={i} question={question} answer={answer} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FINAL EMOTIONAL CTA
        ══════════════════════════════════════════ */}
        <section className="hero-bg py-24 px-5 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.3) 0%, transparent 70%)", filter: "blur(40px)" }} />
          <div className="max-w-3xl mx-auto relative z-10">
            <ScrollReveal>
              <span className="text-5xl mb-6 block">✝️</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                Tus hijos merecen una fe{" "}
                <span className="gold-shimmer">que los acompañe toda la vida.</span>{" "}
                Empiézala hoy.
              </h2>
              <p className="text-[#C8B49A] text-xl leading-relaxed mb-10">
                Cada día que pasa sin El UNO Bíblico es una noche familiar que no volverá.
                El momento perfecto para empezar siempre es{" "}
                <strong className="text-[#D4AF37]">ahora.</strong>
              </p>

              <div className="flex flex-col items-center gap-4">
                <BuyButton className="pulse-cta inline-flex items-center justify-center gap-3 bg-[#E63000] hover:bg-[#FF4500] text-white font-black text-xl sm:text-2xl px-12 py-6 rounded-full uppercase tracking-wider transition-all duration-200">
                  Quiero Transformar mi Familia Hoy →
                </BuyButton>
                <p className="text-[#A89070] text-sm">
                  Solo USD $14.99 · Acceso inmediato · Garantía 7 días
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════ */}
        <footer className="bg-[#0D0305] py-10 px-5 border-t border-[rgba(212,175,55,0.15)]">
          <div className="max-w-5xl mx-auto text-center">
            <p className="font-sacred text-[#D4AF37] text-lg font-bold tracking-widest mb-3">
              EL UNO BÍBLICO
            </p>
            <p className="text-[#4A2A1A] text-xs leading-relaxed max-w-xl mx-auto mb-6">
              Este sitio no es parte de Facebook Inc. o Meta Platforms. Además, este sitio
              NO está respaldado por Facebook de ninguna manera. FACEBOOK es una marca
              registrada de META PLATFORMS, Inc.
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-[#4A2A1A]">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Términos y Condiciones</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Contacto</a>
            </div>
          </div>
        </footer>
      </main>

      {/* Sticky bottom CTA bar */}
      <StickyBottomBar />
    </>
  );
}
