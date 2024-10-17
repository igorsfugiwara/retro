// src/App.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase/firebaseConfig';
import Column from './components/Column';
import './App.css';

function App() {
  const [columns, setColumns] = useState([
    { title: 'Começar a Fazer', cards: [] },
    { title: 'Parar de Fazer', cards: [] },
    { title: 'Continuar Fazendo', cards: [] },
  ]);

  useEffect(() => {
    // Sincroniza as colunas com o Firestore
    const unsubscribe = db.collection('columns').onSnapshot((snapshot) => {
      const newColumns = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setColumns(newColumns);
    });
    return () => unsubscribe();
  }, []);

  const handleAddCard = (columnIndex, content) => {
    const newCard = { content, revealed: false };
    const columnRef = db.collection('columns').doc(columns[columnIndex].id);

    columnRef.update({
      cards: [...columns[columnIndex].cards, newCard],
    });
  };

  const handleRevealCard = (columnIndex, cardIndex) => {
    const updatedCards = [...columns[columnIndex].cards];
    updatedCards[cardIndex].revealed = true;

    const columnRef = db.collection('columns').doc(columns[columnIndex].id);
    columnRef.update({
      cards: updatedCards,
    });
  };

  return (
    <div className="app">
      {columns.map((column, index) => (
        <Column
          key={index}
          title={column.title}
          cards={column.cards}
          onAddCard={(content) => handleAddCard(index, content)}
          onRevealCard={(cardIndex) => handleRevealCard(index, cardIndex)}
        />
      ))}
    </div>
  );
}

export default App;
