import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  MapPin, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 1,
    question: "Quel site est surnommé la 'Pompéi de l'Afrique du Nord' ?",
    options: ["Casbah d'Alger", "Ruines de Timgad", "Djemila", "Tipaza"],
    answer: "Ruines de Timgad",
    image: "https://images.pexels.com/photos/1531660/pexels-photo-1531660.jpeg?auto=compress&cs=tinysrgb&w=800",
    fact: "Timgad a été fondée par l'empereur Trajan en l'an 100 de notre ère."
  },
  {
    id: 2,
    question: "Dans quelle wilaya se trouve le parc national du Tassili n'Ajjer ?",
    options: ["Tamanrasset", "Illizi", "Djanet", "Adrar"],
    answer: "Djanet",
    image: "https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=800",
    fact: "C'est l'un des plus grands musées de plein air au monde, célèbre pour ses peintures rupestres."
  },
  {
    id: 3,
    question: "Quel pont suspendu est le symbole de la ville de Constantine ?",
    options: ["Sidi Rached", "Mellah Slimane", "Sidi M'Cid", "El Kantara"],
    answer: "Sidi M'Cid",
    image: "https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg?auto=compress&cs=tinysrgb&w=800",
    fact: "Inauguré en 1912, il culmine à 175 mètres au-dessus du Rhummel."
  },
  {
    id: 4,
    question: "La Vallée du M'zab est célèbre pour son architecture unique. Où se trouve-t-elle ?",
    options: ["Béchar", "Ghardaïa", "Laghouat", "El Oued"],
    answer: "Ghardaïa",
    image: "https://images.pexels.com/photos/3217686/pexels-photo-3217686.jpeg?auto=compress&cs=tinysrgb&w=800",
    fact: "Les cinq cités de la vallée forment une 'Pentapole' classée au patrimoine mondial de l'UNESCO."
  },
  {
    id: 5,
    question: "Quel monument d'Alger a été érigé en mémoire des combattants de la guerre d'indépendance ?",
    options: ["La Grande Poste", "Le Palais du Peuple", "Maqam Echahid", "Ketchaoua"],
    answer: "Maqam Echahid",
    image: "https://images.pexels.com/photos/3214995/pexels-photo-3214995.jpeg?auto=compress&cs=tinysrgb&w=800",
    fact: "Inauguré en 1982, il culmine à 92 mètres de hauteur."
  }
];

export default function HeritageGame() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFact, setShowFact] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    if (option === QUESTIONS[currentQuestion].answer) {
      setScore(s => s + 1);
    }
    setShowFact(true);
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedOption(null);
      setShowFact(false);
    } else {
      setGameState('finished');
    }
  };

  const resetGame = () => {
    setGameState('start');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setShowFact(false);
  };

  const getRank = () => {
    if (score === 5) return "Ambassadeur du Patrimoine 🇩🇿";
    if (score >= 3) return "Explorateur Éclairé";
    return "Voyageur Curieux";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 min-h-[70vh] flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center bg-white p-12 rounded-[3rem] shadow-2xl border border-[#F0F9F7]"
          >
            <div className="w-20 h-20 bg-[#F0F9F7] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
              <Trophy size={40} className="text-[#0F6E56]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>Le Défi Patrimoine</h1>
            <p className="text-gray-600 mb-10 text-lg max-w-md mx-auto">Testez vos connaissances sur les trésors de l'Algérie et devenez un Ambassadeur Wejha.</p>
            <button 
              onClick={() => setGameState('playing')}
              className="px-12 py-4 bg-[#0F6E56] text-white font-black rounded-2xl hover:scale-105 transition-all shadow-xl flex items-center gap-3 mx-auto"
            >
              Commencer le quiz <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Question {currentQuestion + 1} / {QUESTIONS.length}</div>
              <div className="flex gap-1">
                {QUESTIONS.map((_, i) => (
                  <div key={i} className={`h-2 w-8 rounded-full transition-all duration-500 ${i === currentQuestion ? 'bg-[#0F6E56]' : i < currentQuestion ? 'bg-[#0F6E56]/40' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-50">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img src={QUESTIONS[currentQuestion].image} className="w-full h-full object-cover blur-[2px] scale-105" alt="Quiz location" />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-white shadow-sm leading-tight">{QUESTIONS[currentQuestion].question}</h2>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {QUESTIONS[currentQuestion].options.map((option) => {
                    const isCorrect = option === QUESTIONS[currentQuestion].answer;
                    const isSelected = selectedOption === option;
                    
                    let bgColor = 'bg-gray-50 border-gray-100 hover:border-[#0F6E56] hover:bg-[#F0F9F7]';
                    let textColor = 'text-gray-700';
                    let icon = null;

                    if (selectedOption) {
                      if (isCorrect) {
                        bgColor = 'bg-green-100 border-green-500';
                        textColor = 'text-green-700';
                        icon = <CheckCircle2 size={20} className="text-green-500" />;
                      } else if (isSelected) {
                        bgColor = 'bg-red-100 border-red-500';
                        textColor = 'text-red-700';
                        icon = <XCircle size={20} className="text-red-500" />;
                      } else {
                        bgColor = 'bg-gray-50 opacity-40';
                      }
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        disabled={!!selectedOption}
                        className={`p-6 rounded-2xl border-2 font-bold text-left transition-all flex items-center justify-between ${bgColor} ${textColor}`}
                      >
                        {option}
                        {icon}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {showFact && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="bg-[#F0F9F7] p-6 rounded-2xl border-l-4 border-[#0F6E56] mb-8"
                    >
                      <div className="flex items-center gap-2 text-[#0F6E56] font-bold mb-2">
                        <HelpCircle size={18} /> Le saviez-vous ?
                      </div>
                      <p className="text-gray-700 italic">{QUESTIONS[currentQuestion].fact}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {selectedOption && (
                  <button 
                    onClick={handleNext}
                    className="w-full py-5 bg-[#0F6E56] text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-[#0F6E56]/40 transition-all flex items-center justify-center gap-3"
                  >
                    {currentQuestion === QUESTIONS.length - 1 ? 'Voir mon score' : 'Question suivante'} <ArrowRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'finished' && (
          <motion.div 
            key="finished"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center bg-white p-12 rounded-[3rem] shadow-2xl border border-[#F0F9F7] w-full max-w-xl"
          >
            <div className="w-24 h-24 bg-[#0F6E56] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl animate-bounce">
              <Award size={48} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>Bravo !</h2>
            <div className="text-5xl font-black mb-4 text-[#0F6E56]">{score} / {QUESTIONS.length}</div>
            <p className="text-gray-500 mb-2 uppercase tracking-widest font-bold">Votre Rang</p>
            <div className="text-2xl font-bold text-amber-600 mb-10 px-8 py-3 bg-amber-50 rounded-full inline-block">
              {getRank()}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={resetGame}
                className="py-4 border-2 border-[#0F6E56] text-[#0F6E56] font-bold rounded-xl hover:bg-[#0F6E56] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} /> Rejouer
              </button>
              <Link 
                to="/catalogue"
                className="py-4 bg-[#0F6E56] text-white font-bold rounded-xl shadow-lg hover:shadow-[#0F6E56]/30 transition-all flex items-center justify-center gap-2"
              >
                <MapPin size={18} /> Explorer les sites
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
