import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChefHat,
  SlidersHorizontal,
  Sparkles,
  Shuffle,
  Salad,
  Flame,
  Heart,
  ThumbsDown,
  Wallet,
  Check,
  ArrowLeft,
  UtensilsCrossed,
  ExternalLink,
} from "lucide-react";

// --- Mock Menu DB (MVP) ---
const MENU_DB = [
  {
    id: 1,
    name: "연어 포케",
    price: 11000,
    cuisine: "하와이",
    tags: ["해산물", "건강", "샐러드"],
    goal: ["diet", "protein", "tasty"],
    spicy: 0,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "치킨 덮밥",
    price: 9000,
    cuisine: "아시아",
    tags: ["닭고기", "든든", "한그릇"],
    goal: ["protein", "tasty"],
    spicy: 1,
    img: "https://images.unsplash.com/photo-1604908176997-43162d0f6100?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "제육볶음",
    price: 8000,
    cuisine: "한식",
    tags: ["돼지고기", "매콤", "밥도둑"],
    goal: ["tasty"],
    spicy: 2,
    img: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?q=80&w=1600&auto=format&fit=crop",
  },
];

// --- Small Helpers ---
function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}
const card = "rounded-2xl bg-white shadow-lg overflow-hidden";
const primary = "bg-[#FF7A00] text-white hover:brightness-110";
const subtle = "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50";

const makeOrderLinks = (q) => ({
  baemin: `https://m.baemin.com/search?keyword=${encodeURIComponent(q)}`,
  yogiyo: `https://www.yogiyo.co.kr/mobile/#/search/${encodeURIComponent(q)}`,
});

// --- Main Component ---
export default function TodayEatApp() {
  const [view, setView] = useState("home"); // home | results
  const [seed, setSeed] = useState(0);

  const results = useMemo(() => {
    const rng = mulberry32(seed || 1);
    let items = [...MENU_DB];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items.slice(0, 3);
  }, [seed]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900">
      <header className="sticky top-0 bg-white/80 backdrop-blur border-b">
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between">
          <button onClick={() => setView("home")} className="flex items-center gap-2 font-bold">
            <ChefHat className="w-5 h-5 text-[#FF7A00]" /> 오늘 뭐 쳐먹지?
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center space-y-8"
            >
              <h1 className="text-4xl font-extrabold">오늘 뭐 쳐먹지? 🤔</h1>
              <p className="text-gray-600">고민 말고, 랜덤 추천 받아 시바라</p>
              <button
                onClick={() => setView("results")}
                className={classNames("px-6 py-4 text-lg rounded-2xl shadow-lg", primary)}
              >
                <Shuffle className="inline w-5 h-5 mr-2" />
                랜덤 추천 받기
              </button>
            </motion.div>
          )}

          {view === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <button
                onClick={() => setView("home")}
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> 뒤로
              </button>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6" /> 오늘의 추천 메뉴
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                {results.map((m) => (
                  <MenuCard key={m.id} menu={m} />
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setSeed(Math.floor(Math.random() * 100000))}
                  className={classNames("px-6 py-4 text-lg rounded-2xl shadow", subtle)}
                >
                  <Shuffle className="inline w-5 h-5 mr-2" />
                  랜덤 다시 돌리기
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Card Component ---
function MenuCard({ menu }) {
  const links = makeOrderLinks(menu.name);
  return (
    <div className={card}>
      <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
        <img src={menu.img} alt={menu.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold">{menu.name}</h3>
        <p className="text-gray-500 text-sm">₩ {menu.price.toLocaleString()} · {menu.cuisine}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
          {menu.tags.map((t) => (
            <span key={t} className="rounded-full bg-gray-100 px-3 py-1">#{t}</span>
          ))}
          {menu.spicy > 0 && (
            <span className="rounded-full bg-red-50 text-red-600 px-3 py-1">
              {"🌶️".repeat(menu.spicy)}
            </span>
          )}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <a href={links.baemin} target="_blank" rel="noreferrer" className={classNames("rounded-xl px-4 py-3 text-center", subtle)}>
            배민 주문 <ExternalLink className="inline w-4 h-4 ml-1" />
          </a>
          <a href={links.yogiyo} target="_blank" rel="noreferrer" className={classNames("rounded-xl px-4 py-3 text-center", primary)}>
            요기요 주문 <ExternalLink className="inline w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}

// --- Simple RNG ---
function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
