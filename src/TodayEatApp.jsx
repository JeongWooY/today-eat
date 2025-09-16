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

// --- Mock Menu DB (확장판) ---
const MENU_DB = [
  // 한식
  {
    id: 1,
    name: "제육볶음",
    price: 8000,
    cuisine: "한식",
    tags: ["돼지고기", "매콤", "밥도둑"],
    goal: ["tasty"],
    spicy: 2,
    img: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "비빔밥",
    price: 10000,
    cuisine: "한식",
    tags: ["야채", "비건옵션", "한그릇"],
    goal: ["diet", "tasty"],
    spicy: 1,
    img: "https://images.unsplash.com/photo-1604908554028-99035e6d56c3?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "김치찌개",
    price: 9000,
    cuisine: "한식",
    tags: ["국/찌개", "돼지고기", "집밥"],
    goal: ["tasty"],
    spicy: 2,
    img: "https://images.unsplash.com/photo-1582878826629-29b7d46df9f2?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "불고기 덮밥",
    price: 9500,
    cuisine: "한식",
    tags: ["소고기", "달짝지근", "한그릇"],
    goal: ["protein", "tasty"],
    spicy: 0,
    img: "https://images.unsplash.com/photo-1606857521015-7f3b3b0bdc7d?q=80&w=1600&auto=format&fit=crop",
  },

  // 일식
  {
    id: 5,
    name: "연어 사케동",
    price: 12000,
    cuisine: "일식",
    tags: ["해산물", "사케동", "회"],
    goal: ["protein", "tasty"],
    spicy: 0,
    img: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "치킨 가츠동",
    price: 9000,
    cuisine: "일식",
    tags: ["돈카츠", "한그릇", "든든"],
    goal: ["protein", "tasty"],
    spicy: 0,
    img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "규동",
    price: 9500,
    cuisine: "일식",
    tags: ["소고기", "덮밥", "간장"],
    goal: ["protein", "tasty"],
    spicy: 0,
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1600&auto=format&fit=crop",
  },

  // 중식
  {
    id: 8,
    name: "마파두부 덮밥",
    price: 8500,
    cuisine: "중식",
    tags: ["두부", "마라", "한그릇"],
    goal: ["diet", "tasty"],
    spicy: 2,
    img: "https://images.unsplash.com/photo-1585032089185-9b3b3b18f0a8?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "꿔바로우 정식",
    price: 12000,
    cuisine: "중식",
    tags: ["튀김", "새콤달콤", "공유메뉴"],
    goal: ["tasty"],
    spicy: 0,
    img: "https://images.unsplash.com/photo-1553621042-2b8bfadef4f1?q=80&w=1600&auto=format&fit=crop",
  },

  // 양식/브런치
  {
    id: 10,
    name: "마르게리타 피자",
    price: 13000,
    cuisine: "이탈리아",
    tags: ["치즈", "토마토", "빵"],
    goal: ["tasty"],
    spicy: 0,
    img: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 11,
    name: "까르보나라 파스타",
    price: 12000,
    cuisine: "이탈리아",
    tags: ["크림", "베이컨", "면"],
    goal: ["tasty"],
    spicy: 0,
    img: "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 12,
    name: "치즈버거 세트",
    price: 10500,
    cuisine: "미국",
    tags: ["버거", "감자튀김", "패스트푸드"],
    goal: ["tasty"],
    spicy: 0,
    img: "https://images.unsplash.com/photo-1551782450-17144c3a8f59?q=80&w=1600&auto=format&fit=crop",
  },

  // 아시아/면
  {
    id: 13,
    name: "쌀국수",
    price: 9000,
    cuisine: "베트남",
    tags: ["국물", "가벼움", "면"],
    goal: ["diet", "tasty"],
    spicy: 0,
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 14,
    name: "팟타이",
    price: 11000,
    cuisine: "태국",
    tags: ["달짝지근", "볶음면", "땅콩"],
    goal: ["tasty"],
    spicy: 1,
    img: "https://images.unsplash.com/photo-1599021328423-4a0a6fb63a08?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 15,
    name: "비프 브리또",
    price: 11500,
    cuisine: "멕시코",
    tags: ["랩", "한손식사", "소고기"],
    goal: ["protein", "tasty"],
    spicy: 1,
    img: "https://images.unsplash.com/photo-1604908554031-3b6a5e672ff8?q=80&w=1600&auto=format&fit=crop",
  },

  // 건강/샐러드/포케
  {
    id: 16,
    name: "연어 포케",
    price: 11000,
    cuisine: "하와이",
    tags: ["해산물", "건강", "샐러드"],
    goal: ["diet", "protein", "tasty"],
    spicy: 0,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 17,
    name: "닭가슴살 샐러드",
    price: 9500,
    cuisine: "서양",
    tags: ["샐러드", "닭고기", "가벼움"],
    goal: ["diet", "protein"],
    spicy: 0,
    img: "https://images.unsplash.com/photo-1512621776951-4b87b5a9f1f6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 18,
    name: "아보카도 샐러드볼",
    price: 10500,
    cuisine: "서양",
    tags: ["비건", "샐러드", "고섬유"],
    goal: ["diet"],
    spicy: 0,
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1600&auto=format&fit=crop",
  },

  // 치킨/분식
  {
    id: 19,
    name: "간장치킨 도시락",
    price: 11500,
    cuisine: "한식",
    tags: ["치킨", "단짠", "도시락"],
    goal: ["protein", "tasty"],
    spicy: 0,
    img: "https://images.unsplash.com/photo-1604908553993-ef2a8ffb0a59?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 20,
    name: "라볶이 세트",
    price: 8500,
    cuisine: "분식",
    tags: ["라면", "떡볶이", "길거리음식"],
    goal: ["tasty"],
    spicy: 2,
    img: "https://images.unsplash.com/photo-1628840042765-356c8c2c5a7e?q=80&w=1600&auto=format&fit=crop",
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
