/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { db } from './firebase/firebaseConfig';
import Column from './components/Column';
import { collection, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import BoardSelection from './components/BoardSelection';
import { ChevronLeft, Github, ExternalLink, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Card {
  content: string;
  revealed: boolean;
  userName: string;
  likes: number;
  dislikes: number;
  likesBy?: string[];
  dislikesBy?: string[];
}

interface ColumnData {
  id: string;
  title: string;
  cards: Card[];
}

export default function App() {
  const [columns, setColumns] = useState<ColumnData[]>([
    { id: '1', title: 'Começar a Fazer', cards: [] },
    { id: '2', title: 'Parar de Fazer', cards: [] },
    { id: '3', title: 'Continuar Fazendo', cards: [] },
  ]);
  const [userName, setUserName] = useState('');
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedBoard) return;

    const unsubscribe = onSnapshot(collection(db, selectedBoard), (snapshot) => {
      const newColumns = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title || 'Sem Título',
        cards: doc.data().cards || [],
      })) as ColumnData[];
      setColumns(newColumns);
    });

    return () => unsubscribe(); 
  }, [selectedBoard]);

  const handleBoardSelect = (boardName: string, name: string) => {
    setSelectedBoard(boardName);
    setUserName(name);
  };

  const handleAddCard = async (columnIndex: number, content: string) => {
    if (!content || !selectedBoard) return;

    const column = columns[columnIndex];
    if (!column || !column.id) return;

    const newCard: Card = { content, revealed: false, userName, likes: 0, dislikes: 0 };
    const columnRef = doc(db, selectedBoard, column.id);  

    const columnDoc = await getDoc(columnRef);
    const currentCards = columnDoc.data()?.cards || [];

    await updateDoc(columnRef, {
      cards: [...currentCards, newCard],
    });
  };

  const handleRevealCard = async (columnIndex: number, cardIndex: number) => {
    if (!selectedBoard) return;
    const column = columns[columnIndex];
    if (!column || !column.id) return;

    const updatedCards = [...column.cards];
    updatedCards[cardIndex].revealed = true;

    const columnRef = doc(db, selectedBoard, column.id);
    await updateDoc(columnRef, { cards: updatedCards });
  };

  const handleDeleteCard = async (columnIndex: number, cardIndex: number) => {
    if (!selectedBoard) return;
    const column = columns[columnIndex];
    if (!column || !column.id) return;

    const updatedCards = [...column.cards];
    updatedCards.splice(cardIndex, 1);

    const columnRef = doc(db, selectedBoard, column.id);
    await updateDoc(columnRef, { cards: updatedCards });
  };

  const handleRevealAllCards = async (columnIndex: number) => {
    if (!selectedBoard) return;
    const column = columns[columnIndex];
    if (!column || !column.id) return;

    const updatedCards = column.cards.map((card) => ({
      ...card,
      revealed: true,
    }));

    const columnRef = doc(db, selectedBoard, column.id);
    await updateDoc(columnRef, { cards: updatedCards });
  };

  const handleDeleteAllCards = async (columnIndex: number) => {
    if (!window.confirm("Tem certeza que deseja apagar todos os cards?")) return;
    if (!selectedBoard) return;

    const column = columns[columnIndex];
    if (!column || !column.id) return;

    const columnRef = doc(db, selectedBoard, column.id);
    await updateDoc(columnRef, { cards: [] });
  };

  const handleLike = async (columnIndex: number, cardIndex: number) => {
    if (!selectedBoard) return;
    const column = columns[columnIndex];
    if (!column || !column.id) return;

    const card = column.cards[cardIndex];
    if (!card) return;

    const userHasLiked = card.likesBy?.includes(userName);

    const updatedCard = {
        ...card,
        likes: userHasLiked ? card.likes - 1 : card.likes + 1,
        dislikes: userHasLiked ? card.dislikes : Math.max(card.dislikes - 1, 0),
        likesBy: userHasLiked
            ? card.likesBy?.filter((user) => user !== userName)
            : [...(card.likesBy || []), userName],
        dislikesBy: userHasLiked ? card.dislikesBy : (card.dislikesBy || []).filter((user) => user !== userName),
    };

    const updatedCards = [...column.cards];
    updatedCards[cardIndex] = updatedCard;

    const columnRef = doc(db, selectedBoard, column.id);
    await updateDoc(columnRef, { cards: updatedCards });
  };

  const handleDislike = async (columnIndex: number, cardIndex: number) => {
    if (!selectedBoard) return;
    const column = columns[columnIndex];
    if (!column || !column.id) return;

    const card = column.cards[cardIndex];
    if (!card) return;

    const userHasDisliked = card.dislikesBy?.includes(userName);

    const updatedCard = {
        ...card,
        dislikes: userHasDisliked ? card.dislikes - 1 : card.dislikes + 1,
        likes: userHasDisliked ? card.likes : Math.max(card.likes - 1, 0),
        dislikesBy: userHasDisliked
            ? card.dislikesBy?.filter((user) => user !== userName)
            : [...(card.dislikesBy || []), userName],
        likesBy: userHasDisliked ? card.likesBy : (card.likesBy || []).filter((user) => user !== userName),
    };

    const updatedCards = [...column.cards];
    updatedCards[cardIndex] = updatedCard;

    const columnRef = doc(db, selectedBoard, column.id);
    await updateDoc(columnRef, { cards: updatedCards });
  };

  return (
    <div className="app min-h-screen flex flex-col bg-zinc-950 selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AnimatePresence>
              {selectedBoard && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => setSelectedBoard(null)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-400 hover:text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Layout className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">Retro<span className="text-emerald-500">spectiva</span></h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {selectedBoard && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-white/5 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{selectedBoard}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
              <span className="hidden sm:inline">Olá,</span>
              <span className="text-zinc-200">{userName || 'Visitante'}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        <div className="app-wrapper flex flex-col items-center justify-center min-h-[60vh]">
          <AnimatePresence mode="wait">
            {!selectedBoard ? (
              <BoardSelection onBoardSelect={handleBoardSelect} />
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col md:flex-row gap-6 items-start justify-center w-full"
              >
                {columns.length > 0 ? (
                  columns.map((column, index) => (
                    <Column
                      key={column.id}
                      title={column.title}
                      cards={column.cards}
                      onAddCard={(content) => handleAddCard(index, content)}
                      onRevealCard={(cardIndex) => handleRevealCard(index, cardIndex)}
                      onDeleteCard={(cardIndex) => handleDeleteCard(index, cardIndex)}
                      onRevealAll={() => handleRevealAllCards(index)}
                      onDeleteAll={() => handleDeleteAllCards(index)}
                      onLike={(cardIndex) => handleLike(index, cardIndex)}
                      onDislike={(cardIndex) => handleDislike(index, cardIndex)}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center gap-4 py-20">
                    <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                    <p className="text-zinc-500 font-medium">Carregando colunas...</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="credits flex flex-col items-center md:items-start gap-1">
            <p className="text-zinc-500 text-sm">Desenvolvido por <a href="https://github.com/igorsfugiwara/" className="text-zinc-200 hover:text-emerald-400 transition-colors font-medium">Igor Simões Fugiwara</a></p>
            <p className="text-zinc-600 text-xs">© 2026 Retro Modern App</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/igorsfugiwara/retro" 
              className="repo flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-all group"
            >
              <Github className="w-5 h-5" />
              Repositório
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
