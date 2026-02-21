import React, { useState } from 'react';
import { Eye, Trash2, Plus, X, ThumbsUp, ThumbsDown, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Card {
  content: string;
  revealed: boolean;
  userName?: string;
  likes: number;
  dislikes: number;
  likesBy?: string[];
  dislikesBy?: string[];
}

interface ColumnProps {
  title: string;
  cards: Card[];
  onAddCard: (content: string) => void;
  onDeleteCard: (cardIndex: number) => void;
  onRevealCard: (cardIndex: number) => void;
  onRevealAll: () => void;
  onDeleteAll: () => void;
  onLike: (cardIndex: number) => void;
  onDislike: (cardIndex: number) => void;
}

const Column: React.FC<ColumnProps> = ({ 
  title, 
  cards, 
  onAddCard, 
  onDeleteCard, 
  onRevealCard, 
  onRevealAll, 
  onDeleteAll, 
  onLike, 
  onDislike 
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCardContent, setNewCardContent] = useState('');

  const handleAddCardSubmit = () => {
    if (newCardContent.trim()) {
      onAddCard(newCardContent);
      setNewCardContent('');
      setIsAdding(false);
    }
  };

  return (
    <div className="column flex flex-col gap-4 w-full md:w-[350px] bg-zinc-900/40 border border-white/5 rounded-2xl p-4 h-fit">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-zinc-100 tracking-tight">{title}</h2>
        <span className="text-xs font-mono text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
          {cards.length}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card group bg-zinc-800/50 border border-white/5 rounded-xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all hover:bg-zinc-800"
            >
              <div className="card-content text-sm text-zinc-200 leading-relaxed">
                {card.revealed ? (
                  card.content
                ) : (
                  <span className="italic text-zinc-500 select-none">Texto oculto...</span>
                )}
              </div>

              <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                <div className="flex items-center gap-2">
                  {!card.revealed && (
                    <button 
                      className="reveal p-1.5 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
                      onClick={() => onRevealCard(index)}
                      title="Revelar"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    className="delete p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    onClick={() => onDeleteCard(index)}
                    title="Apagar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {card.revealed && (
                    <div className="like-dislike flex items-center gap-1">
                      <button 
                        onClick={() => onLike(index)}
                        className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-zinc-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        {card.likes > 0 && <span>{card.likes}</span>}
                      </button>
                      <button 
                        onClick={() => onDislike(index)}
                        className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                        {card.dislikes > 0 && <span>{card.dislikes}</span>}
                      </button>
                    </div>
                  )}
                  {card.userName && (
                    <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
                      <UserIcon className="w-3 h-3" />
                      {card.userName}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="controls mt-4 flex flex-col gap-2">
        <AnimatePresence>
          {isAdding ? (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="add_card flex flex-col gap-2 overflow-hidden"
            >
              <textarea
                placeholder="O que você tem em mente?"
                value={newCardContent}
                onChange={(e) => setNewCardContent(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleAddCardSubmit()}
                className="w-full h-24 p-3 bg-zinc-800 border border-white/10 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
                autoFocus
              />
              <div className="flex gap-2">
                <button 
                  className="add flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                  onClick={handleAddCardSubmit}
                >
                  <Plus className="w-4 h-4" /> Adicionar
                </button>
                <button 
                  className="delete p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-lg transition-all"
                  onClick={() => setIsAdding(false)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <button 
              className="add w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold rounded-xl border border-white/5 transition-all flex items-center justify-center gap-2 group"
              onClick={() => setIsAdding(true)}
            >
              <Plus className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" /> 
              Novo Card
            </button>
          )}
        </AnimatePresence>

        <div className="flex gap-2 mt-2">
          <button 
            className="reveal flex-1 py-1.5 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-white/5 transition-all flex items-center justify-center gap-1.5"
            onClick={onRevealAll}
          >
            <Eye className="w-3.5 h-3.5" /> Revelar Tudo
          </button>
          <button 
            className="delete flex-1 py-1.5 bg-zinc-900/50 hover:bg-red-900/20 text-zinc-500 hover:text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-white/5 transition-all flex items-center justify-center gap-1.5"
            onClick={onDeleteAll}
          >
            <Trash2 className="w-3.5 h-3.5" /> Limpar Tudo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Column;
