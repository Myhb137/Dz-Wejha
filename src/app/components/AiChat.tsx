import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare, X, Send, Sparkles, Loader2,
  Bot, User, Lightbulb, RefreshCw, ChevronRight,
} from 'lucide-react';
import { sendChatMessage, getSuggestions, type ChatMessage } from '../services/geminiService';

// ── Quick suggestion chips ────────────────────────────────────────────────────
const SUGGESTION_CHIPS = [
  { label: 'Sites UNESCO', prompt: 'loves UNESCO World Heritage sites and history' },
  { label: 'Aventure Sahara', prompt: 'loves adventure and desert landscapes' },
  { label: 'Budget < 500 DZD', prompt: 'has a tight budget under 500 DZD and wants max value' },
  { label: 'Famille avec enfants', prompt: 'is travelling with young children and needs accessible, family-friendly sites' },
  { label: 'Nature & Randonnée', prompt: 'loves nature hikes and outdoor activities' },
  { label: 'Court séjour 1-2h', prompt: 'only has 1-2 hours and wants a quick but memorable visit' },
];

const QUICK_QUESTIONS = [
  'Quels sites sont accessibles en fauteuil roulant ?',
  'Quel est le meilleur moment pour visiter le Sahara ?',
  'Comment réserver un créneau sur la plateforme ?',
  'Quels sites sont gratuits ou très peu chers ?',
];

// ── Markdown-lite renderer (bold + lists + line breaks) ────────────────────────
function RenderText({ text, onSelectSite }: { text: string, onSelectSite: (name: string) => void }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        // Handle bullet points
        const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
        const cleanLine = isBullet ? line.trim().substring(2) : line;

        // Process bold markers **text**
        const parts = cleanLine.split(/(\*\*[^*]+\*\*)/g);
        const content = parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const siteName = part.slice(2, -2);
            return (
              <strong 
                key={j} 
                onClick={() => onSelectSite(siteName)}
                className="text-[#0F6E56] cursor-pointer hover:underline"
              >
                {siteName}
              </strong>
            );
          }
          return part;
        });

        return (
          <div key={i} className={`flex gap-2 ${isBullet ? 'pl-2' : ''}`}>
            {isBullet && <span className="text-[#0F6E56]">•</span>}
            <span className="flex-1">{content}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Main AI Chat Panel ────────────────────────────────────────────────────────
export default function AiChat({ onSelectSite }: { onSelectSite: (name: string) => void }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'chat' | 'suggest'>('chat');

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Marhba ! Je suis **Wejha AI**, votre guide touristique intelligent. 🌟\n\nPosez-moi vos questions sur les sites patrimoniaux d\'Algérie, ou laissez-moi vous suggérer des destinations selon vos préférences !' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggestions state
  const [suggestResult, setSuggestResult] = useState('');
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [activeChip, setActiveChip] = useState<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');

    const userMsg: ChatMessage = { role: 'user', text };
    const history = messages.filter(m => m.role !== 'model' || messages.indexOf(m) > 0);
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const reply = await sendChatMessage(history, text);
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Erreur inconnue';
      setMessages(prev => [...prev, { role: 'model', text: `⚠️ Erreur: ${message}` }]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSuggest(chip: typeof SUGGESTION_CHIPS[0]) {
    setActiveChip(chip.label);
    setSuggestResult('');
    setSuggestLoading(true);
    try {
      const result = await getSuggestions(chip.prompt);
      setSuggestResult(result);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Erreur inconnue';
      setSuggestResult(`⚠️ Erreur: ${message}`);
    } finally {
      setSuggestLoading(false);
    }
  }

  function handleQuickQuestion(q: string) {
    setTab('chat');
    setInput(q);
  }

  return (
    <>
      {/* ── Floating button ── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 999,
          width: 58, height: 58, borderRadius: '50%', border: 'none',
          background: 'linear-gradient(135deg, #0F6E56, #1D9E75)',
          color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(15,110,86,.45)',
        }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: .2 }}><X size={22} /></motion.span>
            : <motion.span key="chat" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: .2 }}><MessageSquare size={22} /></motion.span>
          }
        </AnimatePresence>
        {/* pulse ring */}
        {!open && (
          <motion.span
            style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid rgba(29,158,117,.5)' }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            style={{
              position: 'fixed', bottom: 98, right: 28, zIndex: 998,
              width: 'min(420px, calc(100vw - 32px))',
              height: 'min(600px, calc(100vh - 120px))',
              borderRadius: 20,
              background: 'rgba(255,255,255,.97)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 24px 80px rgba(0,0,0,.18), 0 0 0 1px rgba(15,110,86,.12)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #0F6E56, #1D9E75)',
              padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12,
              flexShrink: 0,
            }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={18} color="white" />
              </div>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>Wejha AI</div>
                <div style={{ color: 'rgba(255,255,255,.75)', fontSize: 12 }}>Guide touristique intelligent</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                {/* online dot */}
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', alignSelf: 'center' }} />
                <span style={{ color: 'rgba(255,255,255,.7)', fontSize: 11 }}>En ligne</span>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
              {(['chat', 'suggest'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  flex: 1, padding: '12px 0', border: 'none', background: 'transparent', cursor: 'pointer',
                  fontWeight: 600, fontSize: 13,
                  color: tab === t ? '#0F6E56' : '#888',
                  borderBottom: tab === t ? '2px solid #0F6E56' : '2px solid transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  transition: 'all .2s',
                }}>
                  {t === 'chat' ? <><MessageSquare size={14} /> Chat</> : <><Lightbulb size={14} /> Suggestions</>}
                </button>
              ))}
            </div>

            {/* ── CHAT TAB ── */}
            {tab === 'chat' && (
              <>
                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>

                  {/* Quick question chips */}
                  {messages.length === 1 && (
                    <div style={{ marginBottom: 8 }}>
                      <p style={{ fontSize: 11, color: '#999', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.05em' }}>Questions rapides</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {QUICK_QUESTIONS.map(q => (
                          <button key={q} onClick={() => handleQuickQuestion(q)} style={{
                            padding: '6px 12px', borderRadius: 999, border: '1.5px solid #e0f0ea',
                            background: '#f0faf5', color: '#0F6E56', fontSize: 11, fontWeight: 600,
                            cursor: 'pointer', transition: 'all .2s',
                          }}>{q}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: .25 }}
                      style={{ display: 'flex', gap: 8, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}
                    >
                      {/* Avatar */}
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                        background: msg.role === 'model' ? 'linear-gradient(135deg, #0F6E56, #1D9E75)' : '#f0f0f0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        alignSelf: 'flex-end',
                      }}>
                        {msg.role === 'model' ? <Bot size={14} color="white" /> : <User size={14} color="#666" />}
                      </div>
                      {/* Bubble */}
                      <div style={{
                        maxWidth: '78%', padding: '10px 14px', borderRadius: msg.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                        background: msg.role === 'user' ? 'linear-gradient(135deg, #0F6E56, #1D9E75)' : '#f4f4f4',
                        color: msg.role === 'user' ? 'white' : '#222',
                        fontSize: 13, lineHeight: 1.55,
                      }}>
                        <RenderText text={msg.text} onSelectSite={onSelectSite} />
                      </div>
                    </motion.div>
                  ))}

                  {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #0F6E56, #1D9E75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Bot size={14} color="white" />
                      </div>
                      <div style={{ padding: '10px 16px', borderRadius: '4px 16px 16px 16px', background: '#f4f4f4', display: 'flex', gap: 4, alignItems: 'center' }}>
                        {[0, 1, 2].map(d => (
                          <motion.div key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: '#0F6E56' }}
                            animate={{ y: [0, -5, 0] }} transition={{ duration: .6, repeat: Infinity, delay: d * .15 }} />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0', display: 'flex', gap: 8, flexShrink: 0 }}>
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    placeholder="Posez votre question..."
                    style={{
                      flex: 1, padding: '10px 14px', borderRadius: 12, border: '1.5px solid #e5e7eb',
                      fontSize: 13, outline: 'none', background: '#f9f9f9', color: '#222',
                      transition: 'border-color .2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#0F6E56'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <motion.button
                    whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    style={{
                      width: 40, height: 40, borderRadius: 12, border: 'none',
                      background: input.trim() && !loading ? 'linear-gradient(135deg, #0F6E56, #1D9E75)' : '#e5e7eb',
                      color: 'white', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      transition: 'background .2s',
                    }}
                  >
                    {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={16} />}
                  </motion.button>
                </div>
              </>
            )}

            {/* ── SUGGESTIONS TAB ── */}
            {tab === 'suggest' && (
              <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{ fontSize: 13, color: '#555', lineHeight: 1.5, margin: 0 }}>
                  Choisissez votre profil de voyageur et l'IA vous proposera les sites idéaux.
                </p>

                {/* Chips grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {SUGGESTION_CHIPS.map(chip => (
                    <motion.button
                      key={chip.label}
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => handleSuggest(chip)}
                      style={{
                        padding: '10px 12px', borderRadius: 12, border: '1.5px solid',
                        borderColor: activeChip === chip.label ? '#0F6E56' : '#e5e7eb',
                        background: activeChip === chip.label ? '#f0faf5' : 'white',
                        color: activeChip === chip.label ? '#0F6E56' : '#555',
                        fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 6,
                        transition: 'all .2s', textAlign: 'left',
                      }}
                    >
                      <ChevronRight size={12} style={{ flexShrink: 0 }} />
                      {chip.label}
                    </motion.button>
                  ))}
                </div>

                {/* Result */}
                <AnimatePresence>
                  {suggestLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px', background: '#f4f4f4', borderRadius: 14, color: '#555', fontSize: 13 }}>
                      <Loader2 size={16} color="#0F6E56" style={{ animation: 'spin 1s linear infinite' }} />
                      Wejha AI analyse vos préférences...
                    </motion.div>
                  )}
                  {!suggestLoading && suggestResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      style={{
                        padding: '14px 16px', background: 'linear-gradient(135deg, #f0faf5, #e8f5f0)',
                        borderRadius: 14, border: '1px solid #c8e6dd', fontSize: 13, lineHeight: 1.65, color: '#222',
                        maxHeight: '300px', overflowY: 'auto'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, fontWeight: 700, color: '#0F6E56' }}>
                        <Sparkles size={14} /> Suggestions personnalisées
                      </div>
                      <RenderText text={suggestResult} onSelectSite={onSelectSite} />
                      <button onClick={() => { setSuggestResult(''); setActiveChip(null); }} style={{
                        marginTop: 14, display: 'flex', alignItems: 'center', gap: 4, background: 'none',
                        border: 'none', color: '#0F6E56', fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0,
                      }}>
                        <RefreshCw size={12} /> Réessayer avec un autre profil
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bridge to chat */}
                <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 12 }}>
                  <p style={{ fontSize: 12, color: '#999', margin: '0 0 8px' }}>Vous voulez en savoir plus ?</p>
                  <button onClick={() => setTab('chat')} style={{
                    width: '100%', padding: '10px', borderRadius: 12,
                    border: '1.5px dashed #c8e6dd', background: 'transparent',
                    color: '#0F6E56', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}>
                    <MessageSquare size={14} /> Poser une question à Wejha AI
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* spin keyframe for loader */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
