import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  MessageSquare, 
  Settings, 
  Fingerprint, 
  Scan, 
  Lock, 
  MapPin, 
  Battery, 
  Wifi, 
  Signal,
  ChevronRight,
  Send,
  Phone,
  Briefcase,
  Crosshair,
  Eye,
  Zap,
  Maximize2,
  X,
  FileText,
  AlertTriangle,
  Skull,
  Target,
  Activity,
  Globe,
  Database
} from 'lucide-react';

// Types
type Tab = 'home' | 'info' | 'profile' | 'arsenal';

interface Character {
  id: string;
  name: string;
  codename: string;
  role: string;
  image: string;
  status: 'online' | 'mission' | 'offline';
  description: string;
  theme: string;
  location: string;
  initialMessage: string;
  details: {
    age: string;
    height: string;
    affiliation: string;
    specialty: string;
    clearance: string;
  };
  gallery: string[];
}

const CHARACTERS: Character[] = [
  {
    id: '1',
    name: '필립 앤더슨',
    codename: '가드 (GUARD)',
    role: '위장 남편 / 왕실 보안 담당관',
    image: 'https://img.jjerrii.uk/SPY/sp1.png',
    status: 'online',
    description: 'SAS 출신 인간 병기. 감정 없는 시계 수리공으로 위장 중.',
    theme: 'text-spy-blue',
    location: '자택 (시계 수리 데스크)',
    initialMessage: '입양 서류 조작은 완료됐다. 내일 고아원에서 접선하지.',
    details: {
      age: '32세',
      height: '190cm',
      affiliation: 'S.C.R.T (왕실 보안국)',
      specialty: '근접 전투, 저격, 전술 운전',
      clearance: 'Level 9 (Top Secret)'
    },
    gallery: [
      'https://spy.jjerrii.uk/A/a/1.png',
      'https://spy.jjerrii.uk/A/a/2.png',
      'https://spy.jjerrii.uk/A/a/3.png',
      'https://spy.jjerrii.uk/A/a/4.png',
      'https://spy.jjerrii.uk/A/a/5.png',
      'https://spy.jjerrii.uk/A/a/6.png',
      'https://spy.jjerrii.uk/A/a/7.png',
      'https://spy.jjerrii.uk/A/a/8.png',
      'https://spy.jjerrii.uk/A/a/9.png',
      'https://spy.jjerrii.uk/A/a/10.png',
      'https://spy.jjerrii.uk/A/a/11.png'
    ]
  },
  {
    id: '2',
    name: '샬럿',
    codename: '에셋 (ASSET)',
    role: '입양 예정 / 중요 보호 대상',
    image: 'https://img.jjerrii.uk/SPY/sp2.jpeg',
    status: 'online',
    description: '비선 왕실 혈통의 마지막 생존자. 신분 위장을 위해 고아원에 은신 중.',
    theme: 'text-pink-400',
    location: '세인트 메리 고아원 (런던)',
    initialMessage: '원장 선생님이 오늘 새로운 부모님이 오실 거라고 했어요...',
    details: {
      age: '8세',
      height: '120cm',
      affiliation: '세인트 메리 고아원',
      specialty: '절대 음감, 직관적 위험 감지',
      clearance: 'Level 0 (Classified Asset)'
    },
    gallery: [
      'https://spy.jjerrii.uk/B/1.png',
      'https://spy.jjerrii.uk/B/2.png',
      'https://spy.jjerrii.uk/B/3.png',
      'https://spy.jjerrii.uk/B/4.png',
      'https://spy.jjerrii.uk/B/5.png',
      'https://spy.jjerrii.uk/B/6.png',
      'https://spy.jjerrii.uk/B/7.png',
      'https://spy.jjerrii.uk/B/8.png',
      'https://spy.jjerrii.uk/B/9.png',
      'https://spy.jjerrii.uk/B/10.png',
      'https://spy.jjerrii.uk/B/11.png',
      'https://spy.jjerrii.uk/B/12.png',
      'https://spy.jjerrii.uk/B/13.png',
      'https://spy.jjerrii.uk/B/14.png',
      'https://spy.jjerrii.uk/B/15.png'
    ]
  }
];

export default function SpyApp() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [bootSequence, setBootSequence] = useState(true);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [dossierChar, setDossierChar] = useState<Character | null>(null);
  const [galleryChar, setGalleryChar] = useState<Character | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (bootSequence) {
    return <BootScreen />;
  }

  return (
    <div className="flex flex-col h-full bg-spy-black font-sans relative">
      <StatusBar />
      
      <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pb-20">
        <AnimatePresence mode="wait">
          {selectedChar ? (
            <ChatInterface 
              key="chat-interface" 
              character={selectedChar} 
              onBack={() => setSelectedChar(null)} 
            />
          ) : galleryChar ? (
            <GalleryView 
              key="gallery-view"
              character={galleryChar}
              onClose={() => setGalleryChar(null)}
            />
          ) : dossierChar ? (
            <DossierView 
              key="dossier-view"
              character={dossierChar}
              onClose={() => setDossierChar(null)}
              onGallery={() => {
                setDossierChar(null);
                setGalleryChar(dossierChar);
              }}
            />
          ) : (
            <>
              {activeTab === 'home' && <HomeTab key="home" onSelect={setDossierChar} />}
              {activeTab === 'info' && <InfoTab key="info" />}
              {activeTab === 'arsenal' && <ArsenalTab key="arsenal" />}
              {activeTab === 'profile' && <ProfileTab key="profile" />}
            </>
          )}
        </AnimatePresence>
      </main>

      {!selectedChar && !dossierChar && !galleryChar && <BottomNav active={activeTab} onChange={setActiveTab} />}
    </div>
  );
}

// --- Sub Components ---

const GalleryView: React.FC<{ character: Character, onClose: () => void }> = ({ character, onClose }) => {
  const [selectedImg, setSelectedImg] = useState(character.gallery[0]);
  const [showFullImage, setShowFullImage] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="absolute inset-0 z-40 bg-black flex flex-col"
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10 pt-[env(safe-area-inset-top)]">
        <button onClick={onClose} className="p-2 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10">
          <ChevronRight className="rotate-180" />
        </button>
        <span className="font-serif text-white tracking-widest uppercase text-xs shadow-black drop-shadow-md">{character.codename} // GALLERY</span>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative bg-neutral-900">
        <img src={selectedImg} alt="Gallery" className="w-full h-full object-cover" />
        
        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent pt-32">
          <h2 className="text-3xl font-serif text-white mb-1">{character.name}</h2>
          <p className="text-spy-gold font-mono text-xs mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            {character.role}
          </p>
          
          <button 
            onClick={() => setShowFullImage(true)}
            className="w-full bg-spy-blue/20 hover:bg-spy-blue/30 text-spy-blue border border-spy-blue/50 py-4 rounded-xl font-mono flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Maximize2 size={18} />
            <span>자세히 보기</span>
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="h-24 bg-black border-t border-white/10 flex items-center gap-3 px-4 overflow-x-auto pb-[env(safe-area-inset-bottom)]">
        {character.gallery.map((img, idx) => (
          <button 
            key={idx}
            onClick={() => setSelectedImg(img)}
            className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${selectedImg === img ? 'border-spy-gold opacity-100 ring-2 ring-spy-gold/30' : 'border-transparent opacity-40 hover:opacity-70'}`}
          >
            <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Full Image Modal */}
      <AnimatePresence>
        {showFullImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black flex items-center justify-center p-2"
            onClick={() => setShowFullImage(false)}
          >
            <button className="absolute top-4 right-4 text-white p-2 bg-black/50 rounded-full backdrop-blur-md z-10">
              <X size={24} />
            </button>
            <img 
              src={selectedImg} 
              alt="Full View" 
              className="max-w-full max-h-full object-contain" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const DossierView: React.FC<{ character: Character, onClose: () => void, onGallery: () => void }> = ({ character, onClose, onGallery }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center"
    >
      <div 
        className="w-full max-w-sm bg-[#f0f0f0] text-black p-6 rounded-sm shadow-2xl relative overflow-hidden"
        style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/paper.png")` }}
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 p-2 text-gray-500 hover:text-black z-20">
          <ChevronRight className="rotate-90" />
        </button>

        {/* Stamps */}
        <div className="absolute top-10 right-4 border-4 border-red-700 text-red-700 px-4 py-1 text-lg font-bold uppercase -rotate-12 opacity-70 pointer-events-none">
          TOP SECRET
        </div>
        <div className="absolute bottom-20 left-4 w-24 h-24 rounded-full border-4 border-spy-blue/30 text-spy-blue/30 flex items-center justify-center -rotate-12 pointer-events-none">
          <span className="text-xs font-mono font-bold text-center">S.C.R.T<br/>VERIFIED</span>
        </div>

        {/* Header */}
        <div className="border-b-2 border-black pb-4 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={20} className="text-black" />
            <span className="font-serif font-bold tracking-widest">S.C.R.T PERSONNEL FILE</span>
          </div>
          <p className="font-mono text-[10px] text-gray-600">CLASSIFIED LEVEL 9 // EYES ONLY</p>
        </div>

        {/* Content */}
        <div className="flex gap-4 mb-6">
          <div className="w-28 h-36 bg-gray-200 border border-gray-400 p-1 shadow-inner shrink-0">
             <img src={character.image} alt={character.name} className="w-full h-full object-cover grayscale contrast-125" />
          </div>
          <div className="flex-1 space-y-3 font-mono text-xs">
            <div>
              <span className="block text-[9px] text-gray-500 uppercase">Codename</span>
              <span className="font-bold text-red-700 text-sm">{character.codename}</span>
            </div>
            <div>
              <span className="block text-[9px] text-gray-500 uppercase">Name</span>
              <span className="font-bold">{character.name}</span>
            </div>
            <div>
              <span className="block text-[9px] text-gray-500 uppercase">Age / Height</span>
              <span>{character.details.age} / {character.details.height}</span>
            </div>
            <div>
              <span className="block text-[9px] text-gray-500 uppercase">Affiliation</span>
              <span>{character.details.affiliation}</span>
            </div>
          </div>
        </div>

        {/* Details Table */}
        <div className="border border-gray-300 bg-white/50 p-3 mb-6 font-mono text-xs space-y-2">
          <div className="grid grid-cols-3 border-b border-gray-200 pb-1">
            <span className="text-gray-500 text-[9px] uppercase col-span-1">Role</span>
            <span className="col-span-2 font-semibold">{character.role}</span>
          </div>
          <div className="grid grid-cols-3 border-b border-gray-200 pb-1">
            <span className="text-gray-500 text-[9px] uppercase col-span-1">Specialty</span>
            <span className="col-span-2">{character.details.specialty}</span>
          </div>
          <div className="grid grid-cols-3 border-b border-gray-200 pb-1">
            <span className="text-gray-500 text-[9px] uppercase col-span-1">Clearance</span>
            <span className="col-span-2 text-red-600 font-bold">{character.details.clearance}</span>
          </div>
          <div className="pt-1">
            <span className="text-gray-500 text-[9px] uppercase block mb-1">Notes</span>
            <p className="leading-tight text-gray-800">{character.description}</p>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={onGallery}
          className="w-full bg-black text-white font-mono py-3 rounded-sm hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 group"
        >
          <Eye size={16} className="group-hover:text-spy-gold transition-colors" />
          <span>ACCESS VISUAL INTEL</span>
        </button>
      </div>
    </motion.div>
  );
}

const StatusBar: React.FC = () => {
  return (
    <div className="h-12 pt-[env(safe-area-inset-top)] px-6 flex items-end justify-between pb-2 text-xs font-mono text-gray-400 bg-gradient-to-b from-black/80 to-transparent z-20 shrink-0">
      <span className="flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/>
        S.C.R.T NET
      </span>
      <div className="flex items-center gap-3">
        <Signal size={14} />
        <Wifi size={14} />
        <Battery size={14} />
      </div>
    </div>
  );
}

const BootScreen: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-black text-spy-blue font-mono p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 relative"
      >
        <Fingerprint size={80} className="text-spy-blue animate-pulse" />
        <motion.div 
          className="absolute inset-0 border-t-2 border-spy-blue"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <div className="w-full max-w-[200px] space-y-2">
        <TypewriterText text="S.C.R.T 서버 접속 중..." delay={0} />
        <TypewriterText text="홍채/음성/DNA 대조..." delay={1} />
        <TypewriterText text="메일 레일 네트워크 동기화..." delay={2} />
        <TypewriterText text="OPERATION: ROYAL RECEPTION 승인." delay={3} color="text-green-500" />
      </div>

      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 3.5, ease: "circOut" }}
        className="absolute bottom-0 left-0 h-1 bg-spy-blue"
      />
    </div>
  );
}

const TypewriterText: React.FC<{ text: string, delay: number, color?: string }> = ({ text, delay, color = "text-gray-400" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay, duration: 0.3 }}
      className={`text-xs ${color}`}
    >
      {`> ${text}`}
    </motion.div>
  );
}

const HomeTab: React.FC<{ onSelect: (c: Character) => void }> = ({ onSelect }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-4 space-y-6"
    >
      {/* Header */}
      <div className="space-y-1 text-center mb-6">
        <h2 className="text-spy-gold font-serif text-xl tracking-widest border-b border-spy-gold/30 pb-2">OPERATION: ROYAL RECEPTION</h2>
        <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mt-1">TOP SECRET // EYES ONLY</p>
      </div>

      {/* Dossier Files */}
      <div className="space-y-6">
        {CHARACTERS.map((char) => (
          <div 
            key={char.id}
            onClick={() => onSelect(char)}
            className="relative bg-[#f0f0f0] text-black p-4 rounded-sm shadow-lg rotate-1 hover:rotate-0 transition-transform duration-300 cursor-pointer group"
            style={{
              backgroundImage: `url("https://www.transparenttextures.com/patterns/paper.png")`,
            }}
          >
            {/* Paper Clip / Stamp */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-300 rounded-full shadow-sm z-10 flex items-center justify-center">
              <div className="w-4 h-12 bg-gray-400/50 rounded-full -mt-6"></div>
            </div>
            <div className="absolute top-4 right-4 border-2 border-red-600 text-red-600 px-2 py-1 text-[10px] font-bold uppercase -rotate-12 opacity-80">
              CONFIDENTIAL
            </div>

            <div className="flex gap-4 mt-2">
              {/* Mugshot */}
              <div className="shrink-0">
                <div className="w-24 h-32 bg-gray-200 border-2 border-gray-400 p-1 shadow-inner relative">
                  <img src={char.image} alt={char.name} className="w-full h-full object-cover grayscale contrast-125" />
                  <div className="absolute bottom-0 left-0 w-full bg-black text-white text-[8px] text-center font-mono py-0.5">
                    {char.id === '1' ? 'S.C.R.T-001' : 'S.C.R.T-002'}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 font-mono text-xs space-y-2">
                <div className="border-b border-gray-300 pb-1">
                  <span className="text-gray-500 block text-[8px] uppercase">Name</span>
                  <span className="font-bold text-sm">{char.name}</span>
                </div>
                <div className="border-b border-gray-300 pb-1">
                  <span className="text-gray-500 block text-[8px] uppercase">Codename</span>
                  <span className="font-bold text-red-700">{char.codename}</span>
                </div>
                <div className="border-b border-gray-300 pb-1">
                  <span className="text-gray-500 block text-[8px] uppercase">Role</span>
                  <span>{char.role}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[8px] uppercase">Notes</span>
                  <p className="leading-tight text-[10px] text-gray-700 mt-0.5 line-clamp-3">
                    {char.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="mt-4 pt-2 border-t border-gray-300 flex justify-between items-center">
              <div className="flex items-center gap-1 text-[10px] font-bold text-gray-600">
                <div className={`w-2 h-2 rounded-full ${char.status === 'online' ? 'bg-green-600' : 'bg-red-600'}`}></div>
                STATUS: {char.status.toUpperCase()}
              </div>
              <div className="text-[8px] text-gray-400 font-mono">
                LAST SEEN: {char.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const InfoTab: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 pt-6 space-y-6 pb-24"
    >
      {/* Header */}
      <div className="flex justify-between items-end border-b-2 border-spy-gold pb-2 mb-6">
        <div>
          <h2 className="text-2xl font-serif text-spy-gold tracking-widest">INTEL REPORT</h2>
          <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em]">EYES ONLY // LEVEL 9</p>
        </div>
        <div className="text-right">
           <div className="text-red-500 font-mono text-xs animate-pulse">● LIVE FEED</div>
           <div className="text-gray-600 font-mono text-[10px]">SECURE CHANNEL</div>
        </div>
      </div>

      {/* 1. Uncrown (Hostile Force) */}
      <section className="relative bg-gradient-to-br from-red-950/40 to-black border border-red-900/50 p-5 rounded-xl overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <Skull size={80} className="text-red-500" />
        </div>
        <div className="absolute -left-1 top-4 w-1 h-12 bg-red-600 rounded-r-full" />
        
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="text-red-500" size={18} />
          <h3 className="text-lg font-serif text-red-500 tracking-wider">UNCROWN</h3>
          <span className="bg-red-900/50 text-red-400 text-[10px] px-2 py-0.5 rounded border border-red-800 ml-auto">THREAT: EXTREME</span>
        </div>

        <div className="grid grid-cols-1 gap-3 text-sm font-mono relative z-10">
          <div className="bg-black/40 p-3 rounded border border-red-900/30">
            <span className="text-red-400 text-[10px] block mb-1 uppercase">정체 (Identity)</span>
            <span className="text-gray-300 block">폐위된 왕족 후손들의 복수 조직</span>
          </div>
          <div className="bg-black/40 p-3 rounded border border-red-900/30">
             <span className="text-red-400 text-[10px] block mb-1 uppercase">목표 (Objective)</span>
             <span className="text-gray-300 block">샬럿 이용해 현 왕실 전복 + 영국 첩보망 장악</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/40 p-3 rounded border border-red-900/30">
              <span className="text-red-400 text-[10px] block mb-1 uppercase">수장 (Leader)</span>
              <span className="text-gray-300 block">'킹메이커'</span>
              <span className="text-[9px] text-gray-500 block mt-1">(정체 불명)</span>
            </div>
            <div className="bg-black/40 p-3 rounded border border-red-900/30">
              <span className="text-red-400 text-[10px] block mb-1 uppercase">특징 (Feature)</span>
              <span className="text-gray-300 block">정계/사교계 침투</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Charlotte's Birth (Bio/Tech) */}
      <section className="relative bg-slate-900/30 border border-slate-700/50 p-5 rounded-xl">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-700/50 pb-2">
          <Fingerprint className="text-spy-blue" size={18} />
          <h3 className="text-lg font-serif text-spy-blue tracking-wider">SUBJECT: CHARLOTTE</h3>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4 items-start">
             <div className="w-8 h-8 rounded bg-spy-blue/10 flex items-center justify-center shrink-0 text-spy-blue mt-1">
               <Activity size={16} />
             </div>
             <div>
               <h4 className="text-white text-sm font-bold mb-1">출생의 비밀: 혈통</h4>
               <p className="text-xs text-gray-400 font-mono leading-relaxed">
                 비선 왕실 혈통의 유일한 생존자. 공식 기록 없는 왕실 직계 계승권 백업 가문의 <span className="text-spy-blue">마지막 후손</span>.
               </p>
             </div>
          </div>
          
          <div className="flex gap-4 items-start">
             <div className="w-8 h-8 rounded bg-spy-blue/10 flex items-center justify-center shrink-0 text-spy-blue mt-1">
               <Database size={16} />
             </div>
             <div>
               <h4 className="text-white text-sm font-bold mb-1">유전적 암호화 (Bio-Key)</h4>
               <p className="text-xs text-gray-400 font-mono leading-relaxed">
                 DNA 서열 내 인공 조작된 양자 암호 조각 내장. 샬럿 가문 특유의 유전적 파동과 결합 시 활성화되는 '생체 각인'. <span className="text-spy-blue">샬럿 자체가 영국 최종 보안 시스템</span>.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Tragedy (Case File) */}
      <section className="bg-[#1a1a1a] border border-white/10 p-5 rounded-xl relative">
        <div className="absolute top-3 right-3">
           <span className="text-[10px] font-mono text-gray-600 border border-gray-700 px-1">CASE #77-X</span>
        </div>
        <h3 className="text-lg font-serif text-gray-200 mb-4 flex items-center gap-2">
          <FileText className="text-gray-500" size={18} />
          BACKGROUND: TRAGEDY
        </h3>
        
        <div className="space-y-3 font-mono text-xs text-gray-400 bg-black/30 p-4 rounded border border-white/5">
           <p>
             <span className="text-red-500 mr-2">[7 YEARS AGO]</span>
             적대 조직 '언크라운드' 습격으로 친부모 살해당함.
           </p>
           <p>
             <span className="text-gray-500 mr-2">[RESCUE]</span>
             갓난아기 샬럿은 요원들의 구출 작전으로 극적 생존. 정부가 모든 기록 말소 후 고아로 위장.
           </p>
           <p className="text-spy-gold/80 pt-2 border-t border-white/5 mt-2">
             <span className="text-spy-gold mr-2">&gt;&gt; CURRENT OP:</span>
             생체 암호 안정화 후, 최정예 요원 2명(유저+필립)을 '평범한 공무원 부부'로 위장시켜 샬럿의 방패로 투입.
           </p>
        </div>
      </section>

      {/* 4. Reason (Strategic Value) */}
      <section className="bg-yellow-950/10 border border-yellow-700/30 p-5 rounded-xl">
        <h3 className="text-lg font-serif text-yellow-500 mb-4 flex items-center gap-2">
          <Target className="text-yellow-500" size={18} />
          STRATEGIC VALUE
        </h3>

        <div className="grid grid-cols-1 gap-3">
           <div className="flex items-center gap-3 bg-yellow-900/10 p-3 rounded border border-yellow-700/20">
              <Globe className="text-yellow-600 shrink-0" size={20} />
              <div>
                <div className="text-yellow-100 text-xs font-bold mb-0.5">시스템 장악</div>
                <p className="text-[10px] text-gray-400">샬럿의 홍채+음성+DNA로 영국 첩보 위성/핵미사일/비자금 금고 장악 가능. (영국 항복 문서와 동급)</p>
              </div>
           </div>
           <div className="flex items-center gap-3 bg-yellow-900/10 p-3 rounded border border-yellow-700/20">
              <AlertTriangle className="text-yellow-600 shrink-0" size={20} />
              <div>
                <div className="text-yellow-100 text-xs font-bold mb-0.5">정통성 파괴</div>
                <p className="text-[10px] text-gray-400">샬럿 존재 폭로 시 왕실 비밀 노출 → 국가적 혼란 유발 → 적국의 영국 체제 전복 기회.</p>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
}

const ArsenalTab: React.FC = () => {
  const gadgets = [
    { name: '메일 레일 패스', type: 'Transport', icon: MapPin, desc: '지하 30m 비밀 우편 열차 탑승권.' },
    { name: '개조된 장우산', type: 'Weapon', icon: Crosshair, desc: '방탄 캐노피 및 스터너 내장.' },
    { name: '시계 수리 키트', type: 'Disguise', icon: Settings, desc: '총기 손질 도구 은닉용.' },
    { name: '암호 해독 립스틱', type: 'Tech', icon: Zap, desc: '생체 정보 스캔 및 해킹 툴.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 space-y-6"
    >
      <div className="space-y-1">
        <h2 className="text-spy-gold font-serif text-2xl tracking-wider">Q-부서 보급품</h2>
        <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">사용 승인 완료</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {gadgets.map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center text-center gap-3 hover:border-spy-blue/50 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-spy-blue group-hover:text-white transition-colors">
              <item.icon size={24} />
            </div>
            <div>
              <h4 className="text-white font-serif text-sm">{item.name}</h4>
              <p className="text-[10px] text-gray-500 font-mono mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 border border-dashed border-gray-700 rounded-xl text-center">
        <p className="text-xs text-gray-500 font-mono">위장 신분: 왕실 행사 기획국(BRCTP) 직원증 필수 지참</p>
      </div>
    </motion.div>
  );
}

const ProfileTab: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 space-y-6 h-full overflow-y-auto pb-24"
    >
      {/* Header */}
      <div className="flex justify-between items-end border-b-2 border-spy-gold pb-2">
        <div>
          <h2 className="text-2xl font-serif text-spy-gold tracking-widest">AGENT PROFILE</h2>
          <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em]">IDENTITY VERIFIED // LEVEL 9</p>
        </div>
        <div className="w-8 h-8 border border-spy-gold/30 flex items-center justify-center">
          <Shield size={16} className="text-spy-gold" />
        </div>
      </div>

      {/* ID Card */}
      <div className="bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-xl p-5 relative overflow-hidden shadow-lg">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-4 right-4 text-spy-blue/20">
          <Fingerprint size={80} />
        </div>

        <div className="relative z-10 flex gap-5 items-center">
          <div className="relative shrink-0">
            <div className="w-20 h-24 bg-gray-800 rounded border-2 border-white/20 overflow-hidden">
              <img src="https://img.jjerrii.uk/SPY/sp3.png" alt="User" className="w-full h-full object-cover grayscale contrast-125" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-spy-gold text-black text-[8px] font-bold px-1.5 py-0.5 rounded border border-white/20">
              LVL.9
            </div>
          </div>
          
          <div className="flex-1 min-w-0 space-y-1">
            <div>
              <span className="text-[9px] text-gray-500 font-mono uppercase block">Codename</span>
              <h3 className="text-xl font-serif text-white tracking-wider truncate">UNKNOWN</h3>
            </div>
            <div>
              <span className="text-[9px] text-gray-500 font-mono uppercase block">Role</span>
              <p className="text-xs text-spy-blue font-mono truncate">의전 총괄 서기관 (전략/심리전)</p>
            </div>
            <div className="pt-2 flex gap-2">
              <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-[8px] text-gray-400 rounded">S.C.R.T</span>
              <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-[8px] text-gray-400 rounded">BRCTP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Objectives */}
      <div className="space-y-3">
        <h3 className="text-sm font-serif text-white flex items-center gap-2">
          <Target size={14} className="text-red-500" />
          CURRENT OBJECTIVES
        </h3>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
          {[
            { text: '샬럿의 순수함 사수', status: 'ongoing' },
            { text: '언크라운드 조직원 식별 및 제거', status: 'pending' },
            { text: '필립과 완벽한 부부 연기 수행', status: 'warning' }
          ].map((obj, i) => (
            <div key={i} className="flex items-start gap-3 text-xs font-mono">
              <div className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                obj.status === 'ongoing' ? 'bg-green-500 animate-pulse' : 
                obj.status === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'
              }`} />
              <span className="text-gray-300 leading-relaxed">{obj.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="space-y-3">
        <h3 className="text-sm font-serif text-white flex items-center gap-2">
          <Activity size={14} className="text-green-500" />
          PERFORMANCE METRICS
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3">
            <span className="text-[9px] text-gray-500 font-mono uppercase block mb-1">Cover Identity</span>
            <div className="flex items-end justify-between">
              <span className="text-green-400 font-bold text-lg">STABLE</span>
              <span className="text-[9px] text-green-500/50 mb-1">98%</span>
            </div>
            <div className="w-full h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-green-500 w-[98%]" />
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3">
            <span className="text-[9px] text-gray-500 font-mono uppercase block mb-1">Couple Sync</span>
            <div className="flex items-end justify-between">
              <span className="text-yellow-500 font-bold text-lg">RISK</span>
              <span className="text-[9px] text-yellow-500/50 mb-1">32%</span>
            </div>
            <div className="w-full h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-yellow-500 w-[32%]" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const ChatInterface: React.FC<{ character: Character, onBack: () => void }> = ({ character, onBack }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: '보안 채널이 수립되었습니다.', sender: 'system' },
    { id: 2, text: character.initialMessage, sender: 'them' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: text, sender: 'me' }]);
    setInput('');
    
    // Character specific replies
    setTimeout(() => {
      let reply = '';
      if (character.id === '1') { // Philip
        const replies = [
          "알겠다. 샬럿 앞에서는 조금 더 다정하게 굴도록 하지. 훈련의 일환이다.",
          "언크라운드의 동향이 심상치 않아. 오늘 밤 경계를 강화한다.",
          "침대는... 내가 바닥에서 자겠다. 임무에 방해된다.",
          "쓸데없는 감정 소모는 사절이다. 상황 보고나 해."
        ];
        reply = replies[Math.floor(Math.random() * replies.length)];
      } else { // Charlotte
        const replies = [
          "엄마! 아빠가 또 무서운 표정 지어... 화난 거 아니지?",
          "오늘 학교에서 이상한 아저씨가 길을 물어봤어. 근데 아빠가 쫓아냈어!",
          "헤헤, 엄마랑 아빠랑 손잡고 자는 거 보고 싶다!",
          "핫초코 마시고 싶어요~ 만들어주세요!"
        ];
        reply = replies[Math.floor(Math.random() * replies.length)];
      }

      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: reply, 
        sender: 'them' 
      }]);
    }, 1500);
  };

  const suggestions = character.id === '1' ? [
    "오늘 샬럿 기분 어때요?",
    "작전 브리핑 부탁해요.",
    "부부 연기 연습 좀 하죠.",
    "언크라운드 징후는?"
  ] : [
    "오늘 학교 어땠어?",
    "누가 말 걸면 도망쳐야 해.",
    "아빠가 잘 해줬니?",
    "사랑해 우리 딸!"
  ];

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-black z-30 flex flex-col"
    >
      {/* Chat Header */}
      <div className="h-24 pt-8 px-4 bg-white/5 border-b border-white/10 flex items-center gap-4 backdrop-blur-md shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ChevronRight className="rotate-180 text-gray-400" />
        </button>
        <div className="relative">
           <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden">
             <img src={character.image} alt={character.name} className="w-full h-full object-cover" />
           </div>
           <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-black ${character.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
        <div>
          <h3 className="font-serif text-white text-sm">{character.codename}</h3>
          <p className="text-[10px] font-mono text-spy-gold uppercase tracking-wider flex items-center gap-1">
            <MapPin size={8} /> {character.location}
          </p>
        </div>
        <div className="ml-auto flex gap-3 text-gray-400">
          <Phone size={18} className="hover:text-white cursor-pointer" />
          <Lock size={18} className="text-spy-blue" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] bg-fixed">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'me' ? 'justify-end' : msg.sender === 'system' ? 'justify-center' : 'justify-start'}`}
          >
            {msg.sender === 'system' ? (
              <span className="text-[10px] font-mono text-gray-600 bg-gray-900/50 px-2 py-1 rounded border border-gray-800">
                {msg.text}
              </span>
            ) : (
              <div className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'me' 
                  ? 'bg-spy-blue/10 text-spy-blue border border-spy-blue/20 rounded-tr-sm' 
                  : 'bg-white/10 text-gray-200 border border-white/5 rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Replies */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
        {suggestions.map((s, i) => (
          <button 
            key={i} 
            onClick={() => handleSend(s)}
            className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black border-t border-white/10 shrink-0">
        <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10 focus-within:border-spy-gold/50 transition-colors">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="메시지 암호화 중..."
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none font-mono"
          />
          <button onClick={() => handleSend()} className="p-2 bg-spy-gold/10 rounded-full text-spy-gold hover:bg-spy-gold hover:text-black transition-all">
            <Send size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const BottomNav: React.FC<{ active: Tab, onChange: (t: Tab) => void }> = ({ active, onChange }) => {
  const navItems = [
    { id: 'home', icon: Shield, label: '임무' },
    { id: 'info', icon: FileText, label: '정보' },
    { id: 'arsenal', icon: Briefcase, label: '장비' },
    { id: 'profile', icon: Settings, label: '프로필' },
  ];

  return (
    <div className="h-20 pb-[env(safe-area-inset-bottom)] bg-black/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-6 shrink-0 z-20">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id as Tab)}
          className={`flex flex-col items-center gap-1 transition-colors ${
            active === item.id ? 'text-spy-gold' : 'text-gray-600 hover:text-gray-400'
          }`}
        >
          <item.icon size={24} strokeWidth={active === item.id ? 2.5 : 2} />
          <span className="text-[10px] font-mono uppercase tracking-wide">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
