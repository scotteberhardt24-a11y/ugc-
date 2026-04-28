import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Mail, Phone, MapPin, Sparkles, Video, Camera, Wand2, Users, ClipboardList, DollarSign, Search, CheckCircle2, Star, Bot, FileText, Clock, ExternalLink, BookOpen, Scissors, PlayCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BRAND_BLUE = "#0B1F3A";
const BRAND_LIGHT_BLUE = "#DDF3FF";
const BRAND_GOLD = "#D4AF37";
const BRAND_WHITE = "#FFFFFF";

const tawny = {
  name: "Tawny Stockli",
  age: 38,
  city: "Seattle, WA",
  email: "TAWNYSTOCKLI20@GMAIL.com",
  phone: "206-482-5369",
  title: "Licensed Cosmetologist + Beauty UGC Creator",
  tagline: "Professional beauty content that builds trust, teaches customers, and helps brands sell.",
};

const topBrands = [
  "Cocokind", "Burt's Bees", "Innisfree", "Starface", "Native", "SHEGLAM", "ColourPop", "Eva NYC", "Pacifica", "The Ordinary",
  "Good Molecules", "Versed", "Hero Cosmetics", "Bliss", "e.l.f. Cosmetics", "Wet n Wild", "NYX Professional Makeup", "Physicians Formula", "Tree Hut", "Dove",
  "Olay", "Neutrogena", "Cetaphil", "CeraVe", "Simple Skincare", "Yes To", "Thayers", "Briogeo", "Not Your Mother's", "OGX",
  "Glossier", "Rhode Skin", "Tarte Cosmetics", "Fenty Beauty", "Rare Beauty", "Huda Beauty", "Milk Makeup", "Kylie Cosmetics", "Urban Decay", "Too Faced",
  "Benefit Cosmetics", "Drunk Elephant", "Laneige", "Glow Recipe", "Summer Fridays", "Tatcha", "First Aid Beauty", "Youth To The People", "Kopari", "Sol de Janeiro",
  "OUAI", "Amika", "IGK Hair", "Moroccanoil", "Olaplex", "Function of Beauty", "Living Proof", "Kérastase", "Sephora", "Ulta Beauty",
  "Beautylish", "Dermalogica", "Murad", "Paula's Choice", "Sunday Riley", "Estée Lauder", "Lancôme", "Clinique", "Shiseido", "SK-II",
  "La Mer", "Dior Beauty", "Chanel Beauty", "YSL Beauty", "Charlotte Tilbury", "Pat McGrath Labs", "MAC Cosmetics", "Bobbi Brown", "NARS", "Make Up For Ever",
  "Hourglass", "bareMinerals", "IT Cosmetics", "Dr. Dennis Gross", "Algenist", "Elemis", "Kate Somerville", "Peter Thomas Roth", "Augustinus Bader", "La Roche-Posay",
  "Vichy", "Avène", "Biossance", "Farmacy", "TULA", "Dr. Jart+", "COSRX", "Peach & Lily", "Naturium", "Tower 28 Beauty"
];

const beautySearches = [
  "K-beauty skincare", "skin barrier repair", "hypochlorous acid spray", "azelaic acid serum", "PDRN skincare", "exosome skincare", "glass skin mask", "body retinol", "serum body wash", "body milk",
  "fragrance layering", "heatless curls", "bond repair hair mask", "hair growth serum", "scalp care", "anti-dandruff shampoo", "sensitive skin routine", "acne-safe makeup", "clean girl makeup", "maximalist glam",
  "lip oil", "SPF skin tint", "ceramide moisturizer", "niacinamide serum", "redness relief skincare", "cosmetologist product review", "before and after hair repair", "licensed cosmetologist reacts", "TikTok Shop beauty", "viral beauty products"
];

const packages = [
  { name: "Starter Test", price: "$300", includes: ["3 UGC videos", "3 hooks", "Raw footage add-on available", "7-day delivery"] },
  { name: "Growth Pack", price: "$900", includes: ["10 UGC videos", "Hook variations", "Voiceover + demo shots", "Ad-ready format"] },
  { name: "Empire Retainer", price: "$2,000+", includes: ["30 monthly assets", "Weekly content testing", "Script strategy", "Priority delivery"] },
];

const emailTemplates = [
  { title: "Cold Email #1", subject: "UGC content ideas for [Brand Name]", body: `Hi [Brand Name],\n\nMy name is Tawny Stockli. I’m a licensed cosmetologist and beauty UGC creator based in Seattle.\n\nI came across [product/brand] and had a few content ideas that could work well for TikTok, Reels, and paid ads — especially from a professional cosmetology perspective.\n\nA few quick concepts:\n• Licensed cosmetologist tests [product]\n• What this product actually does for [skin/hair concern]\n• Before/after routine using [product]\n\nWould you be open to a product test or paid UGC collaboration?\n\nBest,\nTawny Stockli\nTAWNYSTOCKLI20@GMAIL.com\n206-482-5369` },
  { title: "Follow-Up #1", subject: "Quick follow-up — UGC for [Brand Name]", body: `Hi [Name],\n\nJust following up on my last note. I’d love to create authentic beauty content for [Brand Name] that brands can use for organic posts, product education, and ads.\n\nAs a licensed cosmetologist, I can bring professional credibility while keeping the content natural and customer-friendly.\n\nWould you like me to send over 2–3 specific concepts for your product?\n\nBest,\nTawny` },
  { title: "Final Follow-Up", subject: "Should I send content ideas?", body: `Hi [Name],\n\nI don’t want to flood your inbox, so I’ll make this my last follow-up.\n\nI still think [Brand Name] would be a strong fit for licensed-cosmetologist UGC — especially product demos, before/after education, and ad-style short videos.\n\nShould I send over a few content ideas, or is there someone else on your team I should contact?\n\nThank you,\nTawny` },
  { title: "Booking Reply", subject: "UGC package options", body: `Hi [Name],\n\nThank you for your interest. Here are my current UGC options:\n\nStarter Test: 3 videos — $300\nGrowth Pack: 10 videos — $900\nEmpire Retainer: 30 monthly assets — $2,000+\n\nEach video includes script strategy, filming, basic editing, captions, and ad-ready formatting. Usage rights can be added based on campaign needs.\n\nWould you like to book the Starter Test or schedule a call first?\n\nBest,\nTawny` },
];

const scripts = [
  { name: "Licensed Cosmetologist Tests", hook: "Licensed cosmetologist here — I had to test this before anyone wastes money.", shots: ["Face-to-camera hook", "Product close-up", "Texture macro shot", "Application demo", "Result/reaction"], cta: "I’d recommend this for [skin/hair type] if you want [result]." },
  { name: "Stop Using This Wrong", hook: "You might be using this product wrong — here’s the right way.", shots: ["Wrong method", "Correct method", "Side-by-side", "Quick education", "Final result"], cta: "Save this before your next routine." },
  { name: "Before/After Authority", hook: "I tested this for [X days] so you can see the real result.", shots: ["Day 1", "Day 3", "Day 7", "Product routine", "Before/after reveal"], cta: "This is the kind of result I look for as a cosmetologist." },
];

const calendar = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const actions = [
    "Post 1 educational beauty tip video",
    "Send 20 brand emails",
    "Add 10 new brands to CRM",
    "Follow up with old leads",
  ];
  if ([1, 8, 15, 22, 29].includes(day)) actions.push("Batch film 5 UGC clips");
  if ([3, 10, 17, 24].includes(day)) actions.push("Update portfolio with best-performing video");
  if ([7, 14, 21, 28].includes(day)) actions.push("Review weekly numbers: outreaches, replies, booked calls, closed deals");
  return { day, actions };
});

const metrics = [
  { label: "Monthly Goal", value: "$3,500", icon: DollarSign },
  { label: "Daily Outreach", value: "20–50", icon: Mail },
  { label: "Weekly Posts", value: "14–21", icon: Video },
  { label: "Target Brands", value: "100", icon: Users },
];

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-8">
      <p className="text-sm font-bold tracking-[0.25em] uppercase" style={{ color: BRAND_GOLD }}>{eyebrow}</p>
      <h2 className="text-3xl md:text-5xl font-black mt-2" style={{ color: BRAND_BLUE }}>{title}</h2>
      {subtitle && <p className="text-slate-600 mt-3 max-w-3xl text-lg">{subtitle}</p>}
    </div>
  );
}

function BookingForm() {
  return (
    <Card className="rounded-3xl shadow-xl border-0 overflow-hidden">
      <CardContent className="p-6 md:p-8" style={{ background: BRAND_WHITE }}>
        <h3 className="text-2xl font-black mb-2" style={{ color: BRAND_BLUE }}>Book Tawny</h3>
        <p className="text-slate-600 mb-6">Future clients can request UGC services here. Connect this form to Formspree, Supabase, Airtable, or Calendly.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <input className="rounded-2xl border p-4" placeholder="Brand name" />
          <input className="rounded-2xl border p-4" placeholder="Contact email" />
          <select className="rounded-2xl border p-4">
            <option>Starter Test — 3 videos</option>
            <option>Growth Pack — 10 videos</option>
            <option>Empire Retainer — monthly</option>
          </select>
          <input className="rounded-2xl border p-4" placeholder="Product category" />
          <textarea className="md:col-span-2 rounded-2xl border p-4 min-h-32" placeholder="Tell Tawny about the product, campaign goal, deadline, and usage rights needed." />
        </div>
        <a href={`mailto:${tawny.email}?subject=UGC Booking Request for Tawny Stockli`}>
          <Button className="mt-5 rounded-2xl px-6 py-6 font-bold" style={{ background: BRAND_GOLD, color: BRAND_BLUE }}>Send Booking Request</Button>
        </a>
      </CardContent>
    </Card>
  );
}

export default function UGCBeautyEmpireSite() {
  const [brandSearch, setBrandSearch] = useState("");
  const filteredBrands = useMemo(() => topBrands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase())), [brandSearch]);

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(180deg, ${BRAND_LIGHT_BLUE} 0%, #ffffff 28%, #f8fbff 100%)` }}>
      <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/60" style={{ background: "rgba(255,255,255,0.78)" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: BRAND_BLUE }}><Scissors style={{ color: BRAND_GOLD }} /></div>
            <div><p className="font-black" style={{ color: BRAND_BLUE }}>UGC Beauty Empire</p><p className="text-xs text-slate-500">Tawny Stockli</p></div>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-semibold text-slate-700">
            <a href="#portfolio">Portfolio</a><a href="#booking">Book</a><a href="#course">Course</a><a href="#crm">CRM</a><a href="#brands">Brands</a>
          </div>
          <a href={`mailto:${tawny.email}`}><Button className="rounded-2xl" style={{ background: BRAND_BLUE, color: BRAND_WHITE }}>Contact</Button></a>
        </div>
      </nav>

      <header className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold mb-6" style={{ background: BRAND_WHITE, color: BRAND_BLUE }}><Sparkles size={18} style={{ color: BRAND_GOLD }} /> Licensed Cosmetologist-Led UGC</div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight" style={{ color: BRAND_BLUE }}>{tawny.name}</h1>
          <p className="text-2xl font-bold mt-3" style={{ color: BRAND_GOLD }}>{tawny.title}</p>
          <p className="text-xl text-slate-700 mt-5 max-w-xl">{tawny.tagline}</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="#booking"><Button className="rounded-2xl px-7 py-6 font-black" style={{ background: BRAND_GOLD, color: BRAND_BLUE }}>Book UGC Services</Button></a>
            <a href="#course"><Button variant="outline" className="rounded-2xl px-7 py-6 font-black border-2" style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}>View Course Funnel</Button></a>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 text-slate-700">
            <span className="flex items-center gap-2"><MapPin size={18}/> {tawny.city}</span>
            <span className="flex items-center gap-2"><Mail size={18}/> {tawny.email}</span>
            <span className="flex items-center gap-2"><Phone size={18}/> {tawny.phone}</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .6, delay: .1 }}>
          <Card className="rounded-[2rem] shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[4/5] relative flex items-center justify-center" style={{ background: `radial-gradient(circle at 30% 20%, ${BRAND_GOLD} 0%, transparent 18%), linear-gradient(145deg, ${BRAND_BLUE}, #123d70)` }}>
                <div className="text-center p-8 text-white">
                  <Camera size={72} className="mx-auto mb-6" style={{ color: BRAND_GOLD }} />
                  <h2 className="text-4xl font-black">Portfolio Hero</h2>
                  <p className="mt-4 text-white/80">Add Tawny’s best beauty reel, product demo, or headshot here.</p>
                  <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
                    <div className="rounded-2xl p-4 bg-white/10">Skincare</div>
                    <div className="rounded-2xl p-4 bg-white/10">Haircare</div>
                    <div className="rounded-2xl p-4 bg-white/10">Makeup</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-4">
        {metrics.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="rounded-3xl border-0 shadow-lg"><CardContent className="p-6"><Icon style={{ color: BRAND_GOLD }} /><p className="text-3xl font-black mt-3" style={{ color: BRAND_BLUE }}>{value}</p><p className="text-slate-600 font-semibold">{label}</p></CardContent></Card>
        ))}
      </section>

      <section id="portfolio" className="max-w-7xl mx-auto px-4 py-16">
        <SectionTitle eyebrow="Portfolio" title="Beauty UGC Portfolio Page" subtitle="Drop finished videos into these slots: TikTok embeds, Reel links, or uploaded MP4 previews." />
        <div className="grid md:grid-cols-3 gap-6">
          {["Skincare Test", "Hair Repair Demo", "Makeup GRWM", "Product Texture", "Before/After", "Cosmetologist Reacts"].map((v, idx) => (
            <Card key={v} className="rounded-3xl overflow-hidden shadow-xl border-0"><CardContent className="p-0"><div className="aspect-[9/16] flex flex-col items-center justify-center text-center p-6" style={{ background: idx % 2 ? BRAND_LIGHT_BLUE : BRAND_BLUE, color: idx % 2 ? BRAND_BLUE : BRAND_WHITE }}><PlayCircle size={56} style={{ color: BRAND_GOLD }} /><h3 className="font-black text-2xl mt-4">{v}</h3><p className="mt-2 text-sm opacity-80">Add video embed/link here</p></div></CardContent></Card>
          ))}
        </div>
      </section>

      <section id="booking" className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <SectionTitle eyebrow="Client Funnel" title="Book Tawny’s Services" subtitle="This section is built for brands. Add Calendly, Stripe, PayPal, or Supabase later for full automation." />
          <div className="grid gap-4">
            {packages.map(p => <Card key={p.name} className="rounded-3xl shadow-lg border-0"><CardContent className="p-6"><div className="flex justify-between items-start"><h3 className="text-2xl font-black" style={{ color: BRAND_BLUE }}>{p.name}</h3><p className="text-2xl font-black" style={{ color: BRAND_GOLD }}>{p.price}</p></div><ul className="mt-4 space-y-2">{p.includes.map(x => <li key={x} className="flex gap-2 text-slate-700"><CheckCircle2 size={18} style={{ color: BRAND_GOLD }} />{x}</li>)}</ul></CardContent></Card>)}
          </div>
        </div>
        <BookingForm />
      </section>

      <section id="agent" className="max-w-7xl mx-auto px-4 py-16">
        <SectionTitle eyebrow="AI Agent Ready" title="Video + Writing Agent Dashboard" subtitle="Use this page as the command center for an AI assistant that writes scripts, prompts, shot lists, camera angles, captions, and outreach emails." />
        <div className="grid lg:grid-cols-3 gap-6">
          {scripts.map(s => <Card key={s.name} className="rounded-3xl shadow-xl border-0"><CardContent className="p-6"><Bot style={{ color: BRAND_GOLD }} /><h3 className="text-2xl font-black mt-3" style={{ color: BRAND_BLUE }}>{s.name}</h3><p className="font-bold mt-3">Hook:</p><p className="text-slate-700">“{s.hook}”</p><p className="font-bold mt-4">Camera Angles:</p><ul className="text-slate-700 space-y-1 mt-2">{s.shots.map(x => <li key={x}>• {x}</li>)}</ul><p className="font-bold mt-4">CTA:</p><p className="text-slate-700">{s.cta}</p></CardContent></Card>)}
        </div>
      </section>

      <section id="course" className="max-w-7xl mx-auto px-4 py-16">
        <SectionTitle eyebrow="Course Funnel" title="UGC Beauty Empire™ Course" subtitle="Sell this course to beauty pros who want to get paid testing products and making brand content." />
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="rounded-3xl shadow-xl border-0"><CardContent className="p-8"><BookOpen style={{ color: BRAND_GOLD }} /><h3 className="text-3xl font-black mt-3" style={{ color: BRAND_BLUE }}>Course Offer</h3><p className="text-slate-700 mt-4 text-lg">Turn your beauty skills into paid UGC content with a complete system for filming, outreach, closing brand deals, and scaling to $3,500/month.</p><div className="grid sm:grid-cols-3 gap-3 mt-6"><div className="rounded-2xl p-4" style={{ background: BRAND_LIGHT_BLUE }}><b>$97</b><br/>Launch</div><div className="rounded-2xl p-4" style={{ background: BRAND_LIGHT_BLUE }}><b>$197</b><br/>Core</div><div className="rounded-2xl p-4" style={{ background: BRAND_LIGHT_BLUE }}><b>$297</b><br/>Premium</div></div></CardContent></Card>
          <Card className="rounded-3xl shadow-xl border-0"><CardContent className="p-8"><h3 className="text-2xl font-black" style={{ color: BRAND_BLUE }}>Modules</h3><ol className="mt-4 space-y-3 text-slate-700 font-semibold"><li>1. UGC Beauty Blueprint</li><li>2. Creating Viral Beauty Content</li><li>3. Authority Positioning for Cosmetologists</li><li>4. Client Acquisition Machine</li><li>5. Closing Deals + Pricing</li><li>6. Scaling to $10K/month</li><li>7. Affiliate + TikTok Shop Expansion</li></ol></CardContent></Card>
        </div>
      </section>

      <section id="crm" className="max-w-7xl mx-auto px-4 py-16">
        <SectionTitle eyebrow="CRM" title="Lead Pipeline + 30-Day Action Calendar" subtitle="Track every brand, every email, every follow-up, and every booked client." />
        <Card className="rounded-3xl shadow-xl border-0 overflow-hidden mb-8"><CardContent className="p-0"><div className="grid grid-cols-2 md:grid-cols-7 text-center font-black" style={{ color: BRAND_BLUE }}>{["Leads","Contacted","Follow-Up","Replied","Negotiation","Closed","Retainer"].map(x => <div className="p-4 border-r" key={x}>{x}</div>)}</div></CardContent></Card>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {calendar.map(d => <Card key={d.day} className="rounded-3xl border-0 shadow-md"><CardContent className="p-5"><p className="font-black text-xl" style={{ color: BRAND_GOLD }}>Day {d.day}</p><ul className="mt-3 text-sm text-slate-700 space-y-2">{d.actions.map(a => <li key={a} className="flex gap-2"><Clock size={15}/> {a}</li>)}</ul></CardContent></Card>)}
        </div>
      </section>

      <section id="brands" className="max-w-7xl mx-auto px-4 py-16">
        <SectionTitle eyebrow="Lead List" title="Top 100 Beauty Brands to Contact" subtitle="Use this list for outreach. Prioritize brands actively posting short-form video, running TikTok Shop, or launching new products." />
        <div className="relative mb-6"><Search className="absolute left-4 top-4 text-slate-400" size={20}/><input value={brandSearch} onChange={e => setBrandSearch(e.target.value)} className="w-full rounded-2xl border p-4 pl-12" placeholder="Search brands..." /></div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">{filteredBrands.map((b, idx) => <div key={b} className="rounded-2xl p-4 font-bold shadow-sm" style={{ background: BRAND_WHITE, color: BRAND_BLUE }}><span style={{ color: BRAND_GOLD }}>{idx + 1}.</span> {b}</div>)}</div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionTitle eyebrow="Search Trends" title="Top Beauty Searches + Content Angles" subtitle="Build content around these search topics so brands see Tawny as trend-aware and conversion-ready." />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">{beautySearches.map(s => <div key={s} className="rounded-2xl p-4 font-semibold" style={{ background: BRAND_LIGHT_BLUE, color: BRAND_BLUE }}>{s}</div>)}</div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionTitle eyebrow="Templates" title="Emails Tawny Will Send" subtitle="Copy, paste, personalize, send, and track in the CRM." />
        <div className="grid lg:grid-cols-2 gap-6">{emailTemplates.map(t => <Card key={t.title} className="rounded-3xl shadow-xl border-0"><CardContent className="p-6"><FileText style={{ color: BRAND_GOLD }} /><h3 className="text-2xl font-black mt-3" style={{ color: BRAND_BLUE }}>{t.title}</h3><p className="font-bold mt-3">Subject: {t.subject}</p><pre className="whitespace-pre-wrap text-sm bg-slate-50 rounded-2xl p-4 mt-4 text-slate-700">{t.body}</pre></CardContent></Card>)}</div>
      </section>

      <footer className="mt-16" style={{ background: BRAND_BLUE, color: BRAND_WHITE }}>
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
          <div><h3 className="text-2xl font-black">UGC Beauty Empire</h3><p className="mt-3 text-white/70">Licensed cosmetology authority meets modern UGC content strategy.</p></div>
          <div><p className="font-black mb-2">Contact</p><p>{tawny.email}</p><p>{tawny.phone}</p><p>{tawny.city}</p></div>
          <div><p className="font-black mb-2">Next integrations</p><p className="text-white/70">Calendly • Stripe • Supabase • Airtable • AI Agent • Email Automation</p></div>
        </div>
      </footer>
    </div>
  );
}
