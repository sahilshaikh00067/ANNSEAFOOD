import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Clock,
  ArrowRight,
  Truck,
  Leaf,
  ShieldCheck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Star,
  Eye,
  Plus,
  Minus,
  Mail,
  Check,
  Phone,
  MapPin,
  MessageCircle,
  Sparkles,
  ChevronDown,
  ShoppingBag,
  PhoneCall,
  Utensils,
  Snowflake,
  Trash2,
  Navigation,
  Clock3,
} from "lucide-react";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
/* ------------------------------------------------------------------ */
/*  BUSINESS INFO                                                      */
/* ------------------------------------------------------------------ */

const BIZ = {
  name: "Ann Sea Food",
  phoneDisplay: "90211 55221",
  phoneTel: "+919021155221",
  waNumber: "919021155221",
  email: "bijit.das20397@gmail.com",
  address: "Wanwadi, Parmar Park, Phase 2, 2nd Floor, Pune",
  hoursText: "Open daily · 8:00am – 9:00pm",
};

const waLink = (text) => `https://wa.me/${BIZ.waNumber}?text=${encodeURIComponent(text)}`;

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const img = (seed, w = 800, h = 1000) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const CATEGORIES = [
  { id: "chicken", name: "Chicken", count: "18 cuts available", images: [img("chick1", 700, 860), img("chick2", 700, 860), img("chick3", 700, 860)] },
  { id: "fish", name: "Fish", count: "22 varieties", images: [img("fish1", 700, 860), img("fish2", 700, 860), img("fish3", 700, 860)] },
  { id: "mutton", name: "Mutton", count: "14 cuts available", images: [img("mut1", 700, 860), img("mut2", 700, 860)] },
  { id: "pork", name: "Pork", count: "12 cuts available", images: [img("pork1", 700, 860), img("pork2", 700, 860)] },
  { id: "bamboo", name: "Bamboo Shoot", count: "6 varieties", images: [img("bam1", 700, 860), img("bam2", 700, 860)] },
];

const GALLERY = Array.from({ length: 8 }, (_, i) => img(`counter${i}`, 900, 1100));

const PRODUCTS = [
  { id: "p1", name: "Desi Country Chicken (Whole)", unit: "kg", price: 320, rating: 4.9, reviews: 264, badge: "Bestseller", desc: "Free-range desi chicken, cleaned and cut to order in front of you. Firmer texture and deeper flavour than broiler.", images: [img("dchick1", 700, 860), img("dchick2", 700, 860)] },
  { id: "p2", name: "Boneless Chicken Breast", unit: "500g", price: 180, rating: 4.7, reviews: 188, badge: null, desc: "Skinless, boneless breast fillets trimmed fresh — ready straight into the pan.", images: [img("bchick1", 700, 860), img("bchick2", 700, 860)] },
  { id: "p3", name: "Chicken Curry Cut (Skin-on)", unit: "kg", price: 240, rating: 4.8, reviews: 201, badge: null, desc: "Classic curry-style pieces, skin-on for a richer gravy. Cut to your preferred size on request.", images: [img("cchick1", 700, 860), img("cchick2", 700, 860)] },
  { id: "p4", name: "Fresh Rohu Fish", unit: "kg", price: 260, rating: 4.7, reviews: 142, badge: "Fresh catch", desc: "Sourced daily from the local market, scaled and cleaned before it leaves our counter.", images: [img("rohu1", 700, 860), img("rohu2", 700, 860)] },
  { id: "p5", name: "Pomfret (Silver)", unit: "kg", price: 650, rating: 4.8, reviews: 96, badge: "Fresh catch", desc: "Whole silver pomfret, firm-fleshed and mild — ideal for frying or steaming.", images: [img("pomfret1", 700, 860), img("pomfret2", 700, 860)] },
  { id: "p6", name: "Mutton Curry Cut (Bone-in)", unit: "kg", price: 780, rating: 4.9, reviews: 231, badge: "Bestseller", desc: "Traditional bone-in curry cut for slow-cooked gravies with real depth of flavour.", images: [img("muttoncc1", 700, 860), img("muttoncc2", 700, 860)] },
  { id: "p7", name: "Mutton Boneless", unit: "500g", price: 480, rating: 4.7, reviews: 118, badge: null, desc: "Hand-trimmed boneless mutton, ideal for kebabs, roasts or quick stir-fries.", images: [img("muttonbl1", 700, 860), img("muttonbl2", 700, 860)] },
  { id: "p8", name: "Pork Curry Cut", unit: "kg", price: 380, rating: 4.8, reviews: 154, badge: null, desc: "Classic curry-cut pork with a good fat-to-meat ratio for slow-cooked dishes.", images: [img("porkcc1", 700, 860), img("porkcc2", 700, 860)] },
  { id: "p9", name: "Pork Belly (Skin-on)", unit: "kg", price: 420, rating: 4.8, reviews: 132, badge: null, desc: "Skin-on belly cut, evenly layered — perfect for roasting or slow braising.", images: [img("porkbelly1", 700, 860), img("porkbelly2", 700, 860)] },
  { id: "p10", name: "Smoked Pork", unit: "500g", price: 350, rating: 4.9, reviews: 176, badge: "Naga style", desc: "Slow smoked over wood in the traditional Naga style — deep smoky flavour straight from the block.", images: [img("smokedpork1", 700, 860), img("smokedpork2", 700, 860)] },
  { id: "p11", name: "Fresh Bamboo Shoot", unit: "250g", price: 90, rating: 4.6, reviews: 84, badge: "Seasonal", desc: "Tender seasonal bamboo shoot, cleaned and sliced, ready to cook.", images: [img("bamfresh1", 700, 860), img("bamfresh2", 700, 860)] },
  { id: "p12", name: "Fermented Bamboo Shoot", unit: "200g", price: 120, rating: 4.7, reviews: 109, badge: "Naga style", desc: "Traditionally fermented for weeks for that distinct sharp, tangy flavour used in Naga-style curries.", images: [img("bamferm1", 700, 860), img("bamferm2", 700, 860)] },
];

const TESTIMONIALS = [
  { name: "Imliba Ao", city: "Parmar Park", initials: "IA", rating: 5, quote: "Finally a shop near Wanwadi that keeps fermented bamboo shoot in stock. The smoked pork is exactly like back home." },
  { name: "Rahul Gurung", city: "Wanwadi", initials: "RG", rating: 5, quote: "Called at 6pm, mutton curry cut was at my door within the hour, cleaned exactly how I asked." },
  { name: "Sanju Rai", city: "Parmar Park Phase 2", initials: "SR", rating: 5, quote: "The pomfret is always properly fresh, never that frozen smell. WhatsApp ordering makes it so easy." },
  { name: "Deepika Chettri", city: "Wanwadi", initials: "DC", rating: 4, quote: "Good weight, honest pricing, and the country chicken tastes noticeably different from broiler." },
  { name: "Yaruingam Newmai", city: "Parmar Park", initials: "YN", rating: 5, quote: "Bought the fresh bamboo shoot and pork belly together — both were exactly what I needed for the weekend cooking." },
];

const FAQS = [
  { q: "Which areas do you deliver to?", a: "We deliver across Wanwadi and Parmar Park Phase 1 & 2 in Pune. For nearby areas, call or WhatsApp us to confirm before ordering." },
  { q: "Do you cut the meat to order?", a: "Yes — every order is cut fresh at the counter. Tell us your preferred cut and piece size when you call or message us." },
  { q: "Is the fish fresh or frozen?", a: "Fresh, sourced daily from the local market. Nothing is frozen unless it's a specifically dried or smoked item." },
  { q: "What's the difference between fresh and fermented bamboo shoot?", a: "Fresh bamboo shoot is mild and used like a vegetable; fermented bamboo shoot is aged for weeks for the sharp, tangy flavour used in traditional Naga-style curries. We keep both depending on season." },
  { q: "How do I place an order?", a: "Call us, message on WhatsApp, or add items here and send your order straight from the cart. Same-day delivery for orders before the daily cutoff." },
];

const PROCESS_STEPS = [
  { icon: Phone, title: "Order", sub: "Call, WhatsApp, or add to cart here" },
  { icon: Utensils, title: "Cut fresh", sub: "Prepared to order at the counter" },
  { icon: Snowflake, title: "Ice-packed", sub: "Sealed cold for the ride over" },
  { icon: Truck, title: "Delivered", sub: "Straight to your door, same day" },
];

/* ------------------------------------------------------------------ */
/*  HOOKS & SMALL UTILITIES                                            */
/* ------------------------------------------------------------------ */

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useIsOpenNow() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const check = () => {
      const h = new Date().getHours();
      setOpen(h >= 8 && h < 21);
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);
  return open;
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); io.unobserve(el); } }),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

function CountUp({ end, suffix = "" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const duration = 1400;
          const step = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.floor(eased * end));
            if (p < 1) requestAnimationFrame(step); else setN(end);
          };
          requestAnimationFrame(step);
          io.unobserve(el);
        }
      }),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

function TiltCard({ children, className = "", maxTilt = 8, onClick }) {
  const ref = useRef(null);
  const [tf, setTf] = useState("perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)");
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const move = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * maxTilt, ry = (x - 0.5) * maxTilt;
    setTf(`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`);
    setPos({ x: x * 100, y: y * 100 });
  };
  const leave = () => setTf("perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)");
  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      onClick={onClick}
      style={{ transform: tf, transition: "transform .35s cubic-bezier(.22,1,.36,1)", transformStyle: "preserve-3d" }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,.28), transparent 55%)` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  OVERLAYS: LIGHTBOX / QUICK VIEW / CONTACT MODAL / CART DRAWER       */
/* ------------------------------------------------------------------ */

function Lightbox({ images, index, title, onClose, onNav }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onNav]);
  if (index == null) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-[fadeIn_.25s_ease]" onClick={onClose}>
      <button aria-label="Close" onClick={onClose} className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
        <X className="w-5 h-5" />
      </button>
      {title && <div className="absolute top-6 left-6 text-white/70 text-xs font-bold tracking-[0.15em] uppercase">{title}</div>}
      {images.length > 1 && (
        <button aria-label="Previous image" onClick={(e) => { e.stopPropagation(); onNav(-1); }} className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      <img key={index} src={images[index]} alt="" onClick={(e) => e.stopPropagation()} className="max-h-[78vh] max-w-[88vw] object-contain rounded-xl shadow-2xl animate-[scaleIn_.3s_ease]" />
      {images.length > 1 && (
        <button aria-label="Next image" onClick={(e) => { e.stopPropagation(); onNav(1); }} className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-[var(--accent)]" : "w-1.5 bg-white/40"}`} />
          ))}
        </div>
      )}
    </div>
  );
}

function QuickView({ product, qty, onClose, onInc, onDec }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => { setIdx(0); }, [product]);
  if (!product) return null;
  const nav = (d) => setIdx((v) => (v + d + product.images.length) % product.images.length);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-[fadeIn_.2s_ease]" onClick={onClose}>
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden grid sm:grid-cols-2 animate-[scaleIn_.25s_ease]" onClick={(e) => e.stopPropagation()}>
        <div className="relative bg-[#f4f1ea]">
          <img key={idx} src={product.images[idx]} alt={product.name} className="w-full h-64 sm:h-full object-cover animate-[fadeIn_.35s_ease]" />
          {product.images.length > 1 && (
            <>
              <button onClick={() => nav(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow hover:bg-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => nav(1)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow hover:bg-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {product.images.map((_, i) => (
                  <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-5 bg-[var(--accent)]" : "w-1.5 bg-white/70"}`} />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="p-6 sm:p-8 flex flex-col">
          <button onClick={onClose} className="self-end w-9 h-9 -mt-2 -mr-2 rounded-full hover:bg-[#f4f1ea] flex items-center justify-center transition-colors">
            <X className="w-5 h-5" />
          </button>
          {product.badge && <span className="self-start bg-[var(--accent)]/10 text-[var(--accent)] text-[11px] font-bold px-2.5 py-1 rounded-full mb-3">{product.badge}</span>}
          <h3 className="text-xl font-bold text-[#141212]" style={{ fontFamily: "var(--font-display)" }}>{product.name}</h3>
          <div className="flex items-center gap-1 text-xs text-[#8a8278] mt-1">
            <Star className="w-3.5 h-3.5 fill-[var(--accent)] text-[var(--accent)]" />{product.rating} · {product.reviews} reviews
          </div>
          <p className="text-sm text-[#6b645c] mt-4 leading-relaxed">{product.desc}</p>
          <div className="mt-auto pt-6 flex items-center justify-between">
            <span className="text-2xl font-bold text-[#141212]">₹{product.price}<span className="text-xs font-medium text-[#8a8278]"> /{product.unit}</span></span>
            {qty === 0 ? (
              <button onClick={() => onInc(product.id)} className="h-11 px-6 rounded-full bg-[#141212] text-white text-sm font-bold hover:bg-[var(--accent)] active:scale-95 transition-all duration-200">
                Add to cart
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-[#141212] rounded-full px-2 h-11">
                <button onClick={() => onDec(product.id)} aria-label="Decrease quantity" className="w-8 h-8 rounded-full text-white flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-white text-sm font-bold w-5 text-center">{qty}</span>
                <button onClick={() => onInc(product.id)} aria-label="Increase quantity" className="w-8 h-8 rounded-full text-white flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");
  useEffect(() => { if (open) { setStatus("idle"); setForm({ name: "", email: "", phone: "", message: "" }); } }, [open]);
  if (!open) return null;
  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || !form.message.trim()) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-[fadeIn_.2s_ease]" onClick={onClose}>
      <div className="w-full max-w-md bg-[#FCFBF8] rounded-2xl shadow-2xl overflow-hidden animate-[scaleIn_.25s_ease] max-h-[92vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="bg-[#141212] text-white p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Get in touch</h3>
          <p className="text-white/60 text-sm mt-1">Call, WhatsApp, or send a message — whichever is easiest.</p>
        </div>

        <div className="p-6 pb-2 grid grid-cols-3 gap-2">
          <a href={`tel:${BIZ.phoneTel}`} className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-[#F4F1EA] hover:bg-[#eee5d4] transition-colors">
            <PhoneCall className="w-4 h-4 text-[var(--accent)]" /> <span className="text-[11px] font-bold text-[#141212]">Call</span>
          </a>
          <a href={waLink(`Hi ${BIZ.name}, I'd like to place an order.`)} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-[#F4F1EA] hover:bg-[#eee5d4] transition-colors">
            <MessageCircle className="w-4 h-4 text-[var(--accent)]" /> <span className="text-[11px] font-bold text-[#141212]">WhatsApp</span>
          </a>
          <a href={`mailto:${BIZ.email}`} className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-[#F4F1EA] hover:bg-[#eee5d4] transition-colors">
            <Mail className="w-4 h-4 text-[var(--accent)]" /> <span className="text-[11px] font-bold text-[#141212]">Email</span>
          </a>
        </div>

        {status === "success" ? (
          <div className="p-8 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[var(--accent)]/15 flex items-center justify-center animate-[scaleIn_.3s_ease]">
              <Check className="w-7 h-7 text-[var(--accent)]" />
            </div>
            <p className="font-bold text-[#141212]">Message sent</p>
            <p className="text-sm text-[#6b645c]">Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""} — we'll reach out soon.</p>
            <button onClick={onClose} className="mt-2 px-5 h-10 rounded-full bg-[#141212] text-white text-sm font-semibold hover:opacity-90 transition-opacity">Done</button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 pt-3 flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-[#6b645c]">Full name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full h-11 rounded-lg border border-[#e4ded3] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-shadow" placeholder="Your name" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#6b645c]">Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full h-11 rounded-lg border border-[#e4ded3] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-shadow" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#6b645c]">Phone (optional)</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 w-full h-11 rounded-lg border border-[#e4ded3] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-shadow" placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#6b645c]">Message</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} className="mt-1 w-full rounded-lg border border-[#e4ded3] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-shadow" placeholder="What would you like to order?" />
            </div>
            {status === "error" && <p className="text-xs font-semibold text-[var(--accent)]">Fill in your name, a valid email, and a message.</p>}
            <button type="submit" disabled={status === "loading"} className="h-11 rounded-full bg-[var(--accent)] text-white text-sm font-bold hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2">
              {status === "loading" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose, cart, products, onInc, onDec, onRemove, onClear }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const items = useMemo(
    () => products.filter((p) => cart[p.id] > 0).map((p) => ({ ...p, qty: cart[p.id] })),
    [cart, products]
  );
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const waText = items.length
    ? `Hi ${BIZ.name}, I'd like to order:\n${items.map((it) => `• ${it.qty} x ${it.name} (${it.unit}) — ₹${it.price * it.qty}`).join("\n")}\n\nTotal: ₹${total}`
    : `Hi ${BIZ.name}, I'd like to place an order.`;

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/60 animate-[fadeIn_.2s_ease]" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#FCFBF8] shadow-2xl flex flex-col animate-[slideInRight_.3s_cubic-bezier(.22,1,.36,1)]">
        <div className="flex items-center justify-between p-5 border-b border-[#eee8dc]">
          <h3 className="font-bold text-[#141212] text-lg" style={{ fontFamily: "var(--font-display)" }}>Your order</h3>
          <button onClick={onClose} aria-label="Close cart" className="w-9 h-9 rounded-full hover:bg-[#F4F1EA] flex items-center justify-center transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center h-full gap-3 py-16">
              <ShoppingBag className="w-10 h-10 text-[#ddd5c5]" />
              <p className="text-sm text-[#8a8278]">Your cart is empty. Add a few cuts to get started.</p>
            </div>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex gap-3 items-center animate-[fadeIn_.25s_ease]">
                <img src={it.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#141212] truncate">{it.name}</p>
                  <p className="text-xs text-[#8a8278]">₹{it.price} /{it.unit}</p>
                  <div className="flex items-center gap-2 mt-1.5 bg-[#141212] rounded-full px-1.5 h-8 w-fit">
                    <button onClick={() => onDec(it.id)} className="w-6 h-6 rounded-full text-white flex items-center justify-center hover:bg-white/10 transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-white text-xs font-bold w-4 text-center">{it.qty}</span>
                    <button onClick={() => onInc(it.id)} className="w-6 h-6 rounded-full text-white flex items-center justify-center hover:bg-white/10 transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm font-bold text-[#141212]">₹{it.price * it.qty}</span>
                  <button onClick={() => onRemove(it.id)} aria-label={`Remove ${it.name}`} className="text-[#8a8278] hover:text-[var(--accent)] transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-[#eee8dc] flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6b645c]">Subtotal</span>
              <span className="font-bold text-[#141212] text-lg">₹{total}</span>
            </div>
            <a href={waLink(waText)} target="_blank" rel="noreferrer" className="h-12 rounded-full bg-[#25D366] text-white text-sm font-bold flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all duration-200">
              <MessageCircle className="w-4 h-4" /> Order via WhatsApp
            </a>
            <button onClick={onClear} className="text-xs font-semibold text-[#8a8278] hover:text-[var(--accent)] transition-colors">Clear cart</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] bg-[#141212] text-white text-sm font-semibold px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-[toastIn_.35s_cubic-bezier(.22,1,.36,1)]">
      <Check className="w-4 h-4 text-[var(--accent)]" /> {message}
    </div>
  );
}

function WhatsAppFAB() {
  return (
    <a
      href={waLink(`Hi ${BIZ.name}, I'd like to place an order.`)}
      target="_blank"
      rel="noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-[#25D366] shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
      <MessageCircle className="w-6 h-6 text-white relative" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  HEADER                                                             */
/* ------------------------------------------------------------------ */

const LINKS = [
  { label: "Categories", href: "#categories" },
  { label: "Gallery", href: "#gallery" },
  { label: "Menu", href: "#featured" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit Us", href: "#visit" },
];

function Header({ cartCount, onContact, onCart }) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const isOpenNow = useIsOpenNow();
  const drawerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll('a[href], button:not([disabled])');
    focusable?.[0]?.focus();
    const handleKey = (e) => {
      if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
      if (e.key === "Tab" && focusable?.length) {
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 bg-[#141212]/95 backdrop-blur text-white transition-shadow duration-300 ${scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.35)]" : ""}`}>
      <div className="hidden sm:flex items-center justify-center gap-2 bg-[var(--accent)] text-white text-[11px] font-bold py-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${isOpenNow ? "bg-white" : "bg-white/50"} animate-pulse`} />
        {isOpenNow ? "Open now" : "Closed now"} · {BIZ.hoursText} · Call {BIZ.phoneDisplay}
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="text-md font-bold tracking-tight shrink-0" style={{ fontFamily: "var(--font-display)" }}>
          {BIZ.name.split(" ")[0]}<span className="text-[var(--accent)]"> {BIZ.name.split(" ").slice(1).join(" ")}</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-6">
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} className="relative text-sm text-white/85 hover:text-white transition-colors duration-200 group">
              {link.label}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a href={`tel:${BIZ.phoneTel}`} className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[var(--accent)] text-white text-xs font-bold hover:brightness-110 active:scale-95 transition-all duration-200">
            <PhoneCall className="w-3.5 h-3.5" /> Call now
          </a>
          <button onClick={onContact} type="button" aria-label="Contact" className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200">
            <Mail className="w-5 h-5" aria-hidden="true" />
          </button>
          <button onClick={onCart} type="button" aria-label={`Cart, ${cartCount} items`} className="relative inline-flex w-10 h-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200">
            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold flex items-center justify-center animate-[popIn_.25s_ease]">
                {cartCount}
              </span>
            )}
          </button>
          <span className="sr-only" aria-live="polite">Cart updated, {cartCount} items</span>

          <button ref={triggerRef} type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)} className="lg:hidden inline-flex w-10 h-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200">
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 animate-[fadeIn_.2s_ease]" onClick={() => setOpen(false)} aria-hidden="true" />
          <div ref={drawerRef} role="dialog" aria-modal="true" aria-label="Site menu" className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-[#141212] text-white p-6 flex flex-col gap-6 shadow-lg animate-[slideInRight_.3s_cubic-bezier(.22,1,.36,1)]">
            <div className="flex items-center justify-between">
              <span className="text-md font-bold">Menu</span>
              <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="w-10 h-10 inline-flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="py-3 text-md border-b border-white/10 hover:text-[var(--accent)] hover:pl-1 transition-all duration-200">
                  {link.label}
                </a>
              ))}
            </nav>
            <a href={`tel:${BIZ.phoneTel}`} className="mt-auto h-11 rounded-full bg-[var(--accent)] text-white text-sm font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2">
              <PhoneCall className="w-4 h-4" /> Call {BIZ.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  MARQUEE                                                             */
/* ------------------------------------------------------------------ */

function Marquee() {
  const items = ["Fresh Chicken", "Fresh Fish", "Mutton", "Pork", "Bamboo Shoot", "Cut To Order", "Same-Day Delivery"];
  const content = [...items, ...items];
  return (
    <div className="bg-[var(--accent)] overflow-hidden py-2.5">
      <div className="flex gap-8 w-max marquee-track">
        {[...content, ...content].map((t, i) => (
          <span key={i} className="text-white text-xs font-bold tracking-[0.15em] uppercase flex items-center gap-8 shrink-0">
            {t} <span className="opacity-60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

function getNextCutoff() {
  const now = new Date();
  const cutoff = new Date();
  cutoff.setHours(19, 0, 0, 0);
  if (now > cutoff) cutoff.setDate(cutoff.getDate() + 1);
  return cutoff;
}
function formatRemaining(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  return {
    h: String(Math.floor(totalSec / 3600)).padStart(2, "0"),
    m: String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0"),
    s: String(totalSec % 60).padStart(2, "0"),
  };
}

function Hero({ onShop, onContact }) {
  const [cutoff] = useState(getNextCutoff);
  const [remaining, setRemaining] = useState(cutoff - new Date());
  useEffect(() => {
    const id = setInterval(() => setRemaining(cutoff - new Date()), 1000);
    return () => clearInterval(id);
  }, [cutoff]);
  const { h, m, s } = formatRemaining(remaining);

  return (
    <section id="top" className="relative bg-[#141212] text-white overflow-hidden">
      <div className="absolute inset-0 knife-cut bg-gradient-to-br from-black via-[#161211] to-[#2a0d09]" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[var(--accent)]/20 blur-3xl animate-[floatY_9s_ease-in-out_infinite]" />
      <div className="absolute top-1/3 -right-16 w-72 h-72 rounded-full bg-[var(--accent-gold)]/10 blur-3xl animate-[floatY_11s_ease-in-out_infinite_reverse]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-28 sm:pt-24 sm:pb-36 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-bold text-white/80 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" /> Cut fresh, delivered same day
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-[40px] leading-[46px] sm:text-[56px] sm:leading-[62px] font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              Fresh meat &amp; fish,
              <br />
              cut <span className="text-[var(--accent)]">exactly your way.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 text-md text-white/70 max-w-md font-normal">
              Chicken, fish, mutton, pork and bamboo shoot — sourced daily and prepared to order at our counter in Wanwadi, delivered straight to Parmar Park and around.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button onClick={onShop} className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[var(--accent)] text-white text-sm font-bold hover:brightness-110 active:scale-95 transition-all duration-200 shadow-[0_10px_30px_-8px_rgba(232,67,44,0.6)]">
                Browse the menu <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <a href={`tel:${BIZ.phoneTel}`} className="h-12 px-6 rounded-full border border-white/25 text-white text-sm font-bold hover:bg-white/10 transition-colors duration-200 inline-flex items-center gap-2">
                <PhoneCall className="w-4 h-4" /> {BIZ.phoneDisplay}
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-10 flex items-center gap-6 flex-wrap">
              {["4.8★ rated", "Cut to order", "Wanwadi & Parmar Park"].map((t) => (
                <span key={t} className="text-xs font-semibold text-white/50">{t}</span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="justify-self-center lg:justify-self-end w-full max-w-sm">
          <TiltCard maxTilt={6} className="rounded-2xl">
            <div className="rounded-2xl bg-[#FCFBF8] text-[#141212] p-6 shadow-2xl">
              <div className="flex items-center gap-2 text-[#6b645c] text-sm font-semibold">
                <Clock className="w-4 h-4" aria-hidden="true" /> Order within for today's delivery
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center" role="timer" aria-live="off" aria-label={`${h} hours ${m} minutes ${s} seconds until today's delivery cutoff`}>
                {[{ value: h, label: "Hours" }, { value: m, label: "Min" }, { value: s, label: "Sec" }].map((unit) => (
                  <div key={unit.label} className="rounded-lg bg-[#F4F1EA] py-3">
                    <div className="text-lg font-bold leading-none tabular-nums">{unit.value}</div>
                    <div className="text-xs text-[#8a8278] mt-1">{unit.label}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-[#8a8278]">Cutoff 7pm daily. Order after and it's delivered first thing tomorrow.</p>
              <button onClick={onContact} className="mt-4 w-full h-10 rounded-full bg-[#141212] text-white text-xs font-bold hover:bg-[var(--accent)] transition-colors duration-200">
                Get in touch
              </button>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TRUST BAR + STATS                                                  */
/* ------------------------------------------------------------------ */

const TRUST_ITEMS = [
  { icon: Utensils, label: "Cut to order", sub: "Prepared fresh at the counter" },
  { icon: Snowflake, label: "Ice-packed", sub: "Cold from counter to door" },
  { icon: Truck, label: "Same-day delivery", sub: "Order before 7pm" },
  { icon: ShieldCheck, label: "Honest weight", sub: "What you order is what you get" },
];

function TrustBar() {
  return (
    <section className="bg-white border-b border-[#eee8dc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {TRUST_ITEMS.map(({ icon: Icon, label, sub }, i) => (
          <Reveal key={label} delay={i * 80} className="flex items-center gap-3 group cursor-default">
            <div className="w-10 h-10 rounded-full bg-[#F4F1EA] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <Icon className="w-5 h-5 text-[var(--accent)]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#141212] leading-tight">{label}</p>
              <p className="text-xs text-[#8a8278]">{sub}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function StatsBand() {
  const stats = [
    { end: 5, suffix: "+", label: "Years serving Wanwadi" },
    { end: 60, suffix: "+", label: "Products in stock" },
    { end: 8, suffix: "k+", label: "Orders delivered" },
    { end: 4.8, suffix: "★", label: "Average rating" },
  ];
  return (
    <section className="bg-[#141212] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 100}>
            <p className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
              {Number.isInteger(s.end) ? <CountUp end={s.end} suffix={s.suffix} /> : `${s.end}${s.suffix}`}
            </p>
            <p className="text-xs text-white/50 mt-1 font-semibold tracking-wide uppercase">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CATEGORY GRID                                                      */
/* ------------------------------------------------------------------ */

function CategoryGrid({ onOpenLightbox }) {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
      <Reveal className="flex items-end justify-between mb-6">
        <div>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--accent)] mb-2">Shop by category</p>
          <h2 className="text-2xl font-bold text-[#141212]" style={{ fontFamily: "var(--font-display)" }}>Everything, cut fresh</h2>
        </div>
        <a href="#featured" className="hidden sm:inline text-sm font-semibold text-[#141212] underline underline-offset-4 decoration-[var(--accent)] decoration-2 hover:text-[var(--accent)] transition-colors duration-200">
          View menu
        </a>
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        {CATEGORIES.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 70}>
            <TiltCard maxTilt={7} className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 cursor-pointer" onClick={() => onOpenLightbox(cat.images, 0, cat.name)}>
              <img src={cat.images[0]} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-sm sm:text-md leading-snug">{cat.name}</p>
                <p className="text-white/70 text-xs mt-0.5">{cat.count}</p>
              </div>
              <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                <Eye className="w-4 h-4 text-white" />
              </span>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROCESS STEPS                                                       */
/* ------------------------------------------------------------------ */

function ProcessSteps() {
  return (
    <section className="bg-white py-16 sm:py-20 border-y border-[#eee8dc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--accent)] mb-2">How it works</p>
          <h2 className="text-2xl font-bold text-[#141212]" style={{ fontFamily: "var(--font-display)" }}>From counter to your kitchen</h2>
        </Reveal>
        <div className="relative grid sm:grid-cols-4 gap-10 sm:gap-6">
          <div className="hidden sm:block absolute top-7 left-[12%] right-[12%] h-[2px] bg-[#eee8dc]" />
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 120} className="relative flex sm:flex-col items-center sm:items-center gap-4 sm:gap-3 text-left sm:text-center">
              <div className="relative w-14 h-14 rounded-full bg-[#141212] flex items-center justify-center shrink-0 z-10 shadow-lg transition-transform duration-300 hover:scale-110">
                <step.icon className="w-6 h-6 text-[var(--accent)]" />
              </div>
              <div>
                <p className="font-bold text-[#141212] text-md">{step.title}</p>
                <p className="text-xs text-[#8a8278] mt-1">{step.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  GALLERY SLIDER                                                     */
/* ------------------------------------------------------------------ */

function GallerySlider({ onOpenLightbox }) {
  const trackRef = useRef(null);
  const scrollByAmt = (dir) => {
    const el = trackRef.current; if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <section id="gallery" className="bg-[#F4F1EA] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--accent)] mb-2">Behind the counter</p>
            <h2 className="text-2xl font-bold text-[#141212]" style={{ fontFamily: "var(--font-display)" }}>See what fresh looks like</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scrollByAmt(-1)} aria-label="Scroll gallery left" className="w-10 h-10 rounded-full border border-[#ddd5c5] hover:bg-[#141212] hover:text-white flex items-center justify-center transition-colors duration-200">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scrollByAmt(1)} aria-label="Scroll gallery right" className="w-10 h-10 rounded-full border border-[#ddd5c5] hover:bg-[#141212] hover:text-white flex items-center justify-center transition-colors duration-200">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>

        <div ref={trackRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-none">
          {GALLERY.map((src, i) => (
            <button key={i} onClick={() => onOpenLightbox(GALLERY, i, "Behind the counter")} className="group relative shrink-0 w-[72%] sm:w-[38%] lg:w-[23%] snap-start rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src={src} alt="" loading="lazy" className="w-full h-72 object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-white text-xs font-bold tracking-wide bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  View larger
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURED PRODUCTS                                                  */
/* ------------------------------------------------------------------ */

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="aspect-[4/5] bg-[#eee8dc] animate-[shimmer_1.4s_infinite]" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-2/3 bg-[#eee8dc] rounded animate-[shimmer_1.4s_infinite]" />
        <div className="h-3 w-1/3 bg-[#eee8dc] rounded animate-[shimmer_1.4s_infinite]" />
        <div className="h-8 w-full bg-[#eee8dc] rounded-full mt-3 animate-[shimmer_1.4s_infinite]" />
      </div>
    </div>
  );
}

function ProductCard({ product, qty, onInc, onDec, onQuickView, index }) {
  return (
    <Reveal delay={index * 50}>
      <TiltCard maxTilt={6} className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
          <img src={product.images[0]} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
          {product.badge && <span className="absolute top-3 left-3 bg-[var(--accent)] text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">{product.badge}</span>}
          <button onClick={(e) => { e.stopPropagation(); onQuickView(product); }} aria-label="Quick view" className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 hover:bg-white shadow">
            <Eye className="w-4 h-4 text-[#141212]" />
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-1 text-[11px] text-[#8a8278] mb-1">
            <Star className="w-3 h-3 fill-[var(--accent)] text-[var(--accent)]" /> {product.rating} · {product.reviews} reviews
          </div>
          <p className="font-bold text-[#141212] text-sm leading-snug">{product.name}</p>
          <p className="text-xs text-[#8a8278] mt-0.5">per {product.unit}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-bold text-[#141212]">₹{product.price}</span>
            {qty === 0 ? (
              <button onClick={() => onInc(product.id)} className="h-9 px-4 rounded-full bg-[#141212] text-white text-xs font-bold hover:bg-[var(--accent)] active:scale-95 transition-all duration-200">
                Add
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-[#141212] rounded-full px-1 h-9">
                <button onClick={() => onDec(product.id)} aria-label="Decrease quantity" className="w-7 h-7 rounded-full text-white flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-white text-xs font-bold w-4 text-center">{qty}</span>
                <button onClick={() => onInc(product.id)} aria-label="Increase quantity" className="w-7 h-7 rounded-full text-white flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

function FeaturedProducts({ cart, onInc, onDec, onQuickView }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(id);
  }, []);

  return (
    <section id="featured" className="bg-[#F4F1EA] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--accent)] mb-2">Today's menu</p>
            <h2 className="text-2xl font-bold text-[#141212]" style={{ fontFamily: "var(--font-display)" }}>Restocked fresh every morning</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : PRODUCTS.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} qty={cart[product.id] || 0} onInc={onInc} onDec={onDec} onQuickView={onQuickView} />
              ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                       */
/* ------------------------------------------------------------------ */

function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section id="reviews" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--accent)] mb-2">Reviews</p>
          <h2 className="text-2xl font-bold text-[#141212] mb-10" style={{ fontFamily: "var(--font-display)" }}>What neighbors are saying</h2>
        </Reveal>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative">
          <div className="relative h-64 sm:h-52">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className={`absolute inset-0 transition-all duration-500 ease-out ${idx === i ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6 pointer-events-none"}`}>
                <div className="bg-[#FCFBF8] rounded-2xl shadow-lg p-8 h-full flex flex-col justify-center">
                  <div className="flex justify-center gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className={`w-4 h-4 ${s < t.rating ? "fill-[var(--accent)] text-[var(--accent)]" : "text-[#e4ded3]"}`} />
                    ))}
                  </div>
                  <p className="text-[#3a352f] text-md leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] text-xs font-bold flex items-center justify-center">{t.initials}</div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-[#141212]">{t.name}</p>
                      <p className="text-xs text-[#8a8278]">{t.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 mt-4">
            {TESTIMONIALS.map((_, idx) => (
              <button key={idx} aria-label={`Show review ${idx + 1}`} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${idx === i ? "w-6 bg-[var(--accent)]" : "w-1.5 bg-[#e4ded3]"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                 */
/* ------------------------------------------------------------------ */

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-[#F4F1EA] py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--accent)] mb-2 text-center">FAQ</p>
          <h2 className="text-2xl font-bold text-[#141212] mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>Good to know</h2>
        </Reveal>
        <Reveal delay={100} className="bg-white rounded-2xl shadow-sm px-6">
          {FAQS.map((f, idx) => (
            <FAQItem key={idx} q={f.q} a={f.a} open={open === idx} onClick={() => setOpen(open === idx ? -1 : idx)} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function FAQItem({ q, a, open, onClick }) {
  return (
    <div className="border-b border-[#eee8dc] last:border-0">
      <button onClick={onClick} className="w-full flex items-center justify-between py-5 text-left gap-4 group">
        <span className="font-semibold text-[#141212] text-md group-hover:text-[var(--accent)] transition-colors duration-200">{q}</span>
        <ChevronDown className={`w-5 h-5 shrink-0 text-[#8a8278] transition-transform duration-300 ${open ? "rotate-180 text-[var(--accent)]" : ""}`} />
      </button>
      <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <p className="pb-5 text-sm text-[#6b645c] leading-relaxed pr-8">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  VISIT US                                                            */
/* ------------------------------------------------------------------ */

function VisitUs({ onContact }) {
  return (
    <section id="visit" className="bg-[#141212] text-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--accent)] mb-2">Visit us</p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>Come see the counter yourself</h2>
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><MapPin className="w-4 h-4 text-[var(--accent)]" /></div>
              <div>
                <p className="text-sm font-bold">Address</p>
                <p className="text-sm text-white/60 mt-0.5">{BIZ.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><PhoneCall className="w-4 h-4 text-[var(--accent)]" /></div>
              <div>
                <p className="text-sm font-bold">Phone</p>
                <a href={`tel:${BIZ.phoneTel}`} className="text-sm text-white/60 mt-0.5 hover:text-white transition-colors">{BIZ.phoneDisplay}</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Mail className="w-4 h-4 text-[var(--accent)]" /></div>
              <div>
                <p className="text-sm font-bold">Email</p>
                <a href={`mailto:${BIZ.email}`} className="text-sm text-white/60 mt-0.5 hover:text-white transition-colors break-all">{BIZ.email}</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Clock3 className="w-4 h-4 text-[var(--accent)]" /></div>
              <div>
                <p className="text-sm font-bold">Hours</p>
                <p className="text-sm text-white/60 mt-0.5">{BIZ.hoursText}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={waLink(`Hi ${BIZ.name}, I'd like to place an order.`)} target="_blank" rel="noreferrer" className="h-11 px-6 rounded-full bg-[#25D366] text-white text-sm font-bold flex items-center gap-2 hover:brightness-105 active:scale-95 transition-all duration-200">
              <MessageCircle className="w-4 h-4" /> WhatsApp us
            </a>
            <button onClick={onContact} className="h-11 px-6 rounded-full border border-white/25 text-white text-sm font-bold hover:bg-white/10 transition-colors duration-200">
              Send a message
            </button>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <TiltCard maxTilt={5} className="rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative">
              <img src={img("mapview", 900, 700)} alt="Neighbourhood near the shop" className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-3">
                <Navigation className="w-5 h-5 text-[var(--accent)] shrink-0" />
                <p className="text-xs text-white/90 leading-snug">{BIZ.address}</p>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA BANNER + NEWSLETTER                                            */
/* ------------------------------------------------------------------ */

function CTABanner({ onContact }) {
  return (
    <section className="relative bg-[#141212] text-white overflow-hidden">
      <div className="absolute inset-0 knife-cut-rev bg-gradient-to-tr from-black via-[#161211] to-[#2a0d09]" />
      <Reveal className="relative mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          Planning a big order or a special cut?
        </h2>
        <p className="text-white/60 mt-3 max-w-md mx-auto">Bulk orders, custom cuts, or a question about what's fresh today — we're one call away.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={`tel:${BIZ.phoneTel}`} className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-[var(--accent)] text-white text-sm font-bold hover:brightness-110 active:scale-95 transition-all duration-200 shadow-[0_10px_30px_-8px_rgba(232,67,44,0.6)]">
            <PhoneCall className="w-4 h-4" /> Call {BIZ.phoneDisplay}
          </a>
          <button onClick={onContact} className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/25 text-white text-sm font-bold hover:bg-white/10 transition-colors duration-200">
            <MessageCircle className="w-4 h-4" /> Get in touch
          </button>
        </div>
      </Reveal>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Enter a valid email address to get stock alerts.");
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 flex flex-col items-center text-center">
        <Reveal className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center mb-5 shadow-lg">
          <Mail className="w-6 h-6 text-white" aria-hidden="true" />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="text-xl font-bold max-w-lg text-[#141212]" style={{ fontFamily: "var(--font-display)" }}>
            Get fresh stock alerts in your inbox
          </h2>
          <p className="text-[#6b645c] text-md mt-3 max-w-md font-normal">
            Know when fresh pomfret, mutton or fermented bamboo shoot lands — no spam, unsubscribe anytime.
          </p>
        </Reveal>

        <Reveal delay={160} className="w-full flex justify-center">
          {status === "success" ? (
            <div className="mt-6 flex items-center gap-2 text-emerald-700 bg-emerald-50 rounded-full px-4 py-2">
              <Check className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-semibold">You're subscribed — check your inbox to confirm</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-6 w-full max-w-md">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 text-left">
                  <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-invalid={status === "error"}
                    aria-describedby={status === "error" ? "newsletter-error" : undefined}
                    className={`w-full h-11 rounded-full px-4 text-md text-[#141212] bg-[#F4F1EA] placeholder:text-[#8a8278] placeholder:font-normal focus-visible:outline-2 focus-visible:outline-[var(--accent)] transition-shadow ${status === "error" ? "ring-2 ring-[var(--accent)]" : ""}`}
                  />
                </div>
                <button type="submit" disabled={status === "loading"} className="h-11 px-6 rounded-full bg-[#141212] text-white text-sm font-bold hover:bg-[var(--accent)] active:scale-95 transition-all duration-200 disabled:opacity-70">
                  {status === "loading" ? "Sending…" : "Subscribe"}
                </button>
              </div>
              {status === "error" && (
                <p id="newsletter-error" className="mt-2 text-sm text-[var(--accent)] font-semibold text-left">{errorMsg}</p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                              */
/* ------------------------------------------------------------------ */

const FOOTER_COLUMNS = [
  { title: "Shop", links: ["Chicken", "Fish", "Mutton", "Pork", "Bamboo Shoot"] },
  { title: "Help", links: ["Track your order", "Delivery areas", "Returns", "Contact us"] },
];

function Footer({ onContact }) {
  return (
    <footer className="bg-[#141212] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-2">
          <p className="text-md font-bold" style={{ fontFamily: "var(--font-display)" }}>
            {BIZ.name.split(" ")[0]}<span className="text-[var(--accent)]"> {BIZ.name.split(" ").slice(1).join(" ")}</span>
          </p>
          <p className="text-sm text-white/60 mt-3 max-w-xs font-normal">
            Fresh chicken, fish, mutton, pork and bamboo shoot, cut to order and delivered same day around Wanwadi & Parmar Park.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[FaInstagram, FaTwitter, FaFacebook].map((Icon, i) => (
              <a key={i} href="#top" aria-label="Follow us on social media" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:-translate-y-0.5 transition-all duration-200">
                <Icon className="w-4 h-4" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2 mt-6 text-sm text-white/60">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" /> {BIZ.address}</span>
            <a href={`tel:${BIZ.phoneTel}`} className="flex items-center gap-2 hover:text-white transition-colors"><PhoneCall className="w-4 h-4 shrink-0" /> {BIZ.phoneDisplay}</a>
            <a href={`mailto:${BIZ.email}`} className="flex items-center gap-2 hover:text-white transition-colors break-all"><Mail className="w-4 h-4 shrink-0" /> {BIZ.email}</a>
          </div>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-sm font-bold text-white/90 mb-3">{col.title}</p>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link}>
                  {link === "Contact us" ? (
                    <button onClick={onContact} className="text-sm text-white/60 hover:text-white transition-colors duration-200 text-left">{link}</button>
                  ) : (
                    <a href="#categories" className="text-sm text-white/60 hover:text-white transition-colors duration-200">{link}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">© {new Date().getFullYear()} {BIZ.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#top" className="text-xs text-white/50 hover:text-white transition-colors">Privacy policy</a>
            <a href="#top" className="text-xs text-white/50 hover:text-white transition-colors">Terms of service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  const [cart, setCart] = useState({});
  const [contactOpen, setContactOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [lightbox, setLightbox] = useState({ images: [], index: null, title: "" });
  const [toast, setToast] = useState("");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  const cartCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);

  const incItem = useCallback((id) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    const product = PRODUCTS.find((p) => p.id === id);
    setToast(`Added ${product?.name || "item"} to cart`);
  }, []);
  const decItem = useCallback((id) => {
    setCart((c) => {
      const next = { ...c };
      if (!next[id]) return next;
      next[id] = next[id] - 1;
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }, []);
  const removeItem = useCallback((id) => {
    setCart((c) => { const next = { ...c }; delete next[id]; return next; });
  }, []);
  const clearCart = useCallback(() => setCart({}), []);

  const openLightbox = useCallback((images, index, title) => setLightbox({ images, index, title }), []);
  const closeLightbox = useCallback(() => setLightbox((l) => ({ ...l, index: null })), []);
  const navLightbox = useCallback((delta) => {
    setLightbox((l) => ({ ...l, index: (l.index + delta + l.images.length) % l.images.length }));
  }, []);

  const scrollToFeatured = () => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-[#F4F1EA]" style={{ fontFamily: "var(--font-body)" }}>
      <style>{`
        :root {
          --accent: #E8432C;
          --accent-gold: #C9A227;
          --font-display: 'Space Grotesk', system-ui, sans-serif;
          --font-body: 'Inter', system-ui, sans-serif;
        }
        * { scroll-behavior: smooth; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; -ms-overflow-style: none; }
        .knife-cut { clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%); }
        .knife-cut-rev { clip-path: polygon(0 12%, 100% 0, 100% 100%, 0 100%); }
        .marquee-track { animation: marquee 24s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(.94); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideInRight { from { transform: translateX(24px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes floatY { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-24px) translateX(12px); } }
        @keyframes toastIn { from { transform: translate(-50%, 16px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
        @keyframes shimmer { 0% { opacity: .6; } 50% { opacity: 1; } 100% { opacity: .6; } }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
        }
      `}</style>

      <Header cartCount={cartCount} onContact={() => setContactOpen(true)} onCart={() => setCartOpen(true)} />
      <Marquee />
      <Hero onShop={scrollToFeatured} onContact={() => setContactOpen(true)} />
      <TrustBar />
      <StatsBand />
      <CategoryGrid onOpenLightbox={openLightbox} />
      <ProcessSteps />
      <GallerySlider onOpenLightbox={openLightbox} />
      <FeaturedProducts cart={cart} onInc={incItem} onDec={decItem} onQuickView={setQuickViewProduct} />
      <Testimonials />
      <FAQ />
      <VisitUs onContact={() => setContactOpen(true)} />
      <CTABanner onContact={() => setContactOpen(true)} />
      <Newsletter />
      <Footer onContact={() => setContactOpen(true)} />

      <Lightbox images={lightbox.images} index={lightbox.index} title={lightbox.title} onClose={closeLightbox} onNav={navLightbox} />
      <QuickView product={quickViewProduct} qty={quickViewProduct ? (cart[quickViewProduct.id] || 0) : 0} onClose={() => setQuickViewProduct(null)} onInc={incItem} onDec={decItem} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} products={PRODUCTS} onInc={incItem} onDec={decItem} onRemove={removeItem} onClear={clearCart} />
      <Toast message={toast} />
      <WhatsAppFAB />
    </div>
  );
}