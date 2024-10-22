import React, { useState, useEffect } from 'react';
import { db } from './firebase/firebaseConfig';
import Column from './components/Column';
import { collection, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import './App.css';

function App() {
  const [columns, setColumns] = useState([
    { title: 'Começar a Fazer', cards: [] },
    { title: 'Parar de Fazer', cards: [] },
    { title: 'Continuar Fazendo', cards: [] },
  ]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = prompt("Por favor, insira o seu nome:");
    if (name) {
      setUserName(name);
    }

    const unsubscribe = onSnapshot(collection(db, 'columns'), (snapshot) => {
      const newColumns = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title || 'Sem Título',
        cards: doc.data().cards || [],
      }));
      setColumns(newColumns);
    });

    return () => unsubscribe();
  }, []);

  const handleAddCard = async (columnIndex, content) => {
    if (!content) return; // Não adiciona card vazio

    const column = columns[columnIndex];
    if (!column || !column.id) {
      console.error("Column or column ID is undefined.");
      return;
    }

    const newCard = { content, revealed: false, userName };
    const columnRef = doc(db, 'columns', column.id); 

    const columnData = (await getDoc(columnRef)).data();
    const currentCards = columnData?.cards || [];

    await updateDoc(columnRef, {
      cards: [...currentCards, newCard],
    });
  };

  const handleRevealCard = async (columnIndex, cardIndex) => {
    const column = columns[columnIndex];
    if (!column || !column.id) {
      console.error("Column or column ID is undefined.");
      return;
    }

    const updatedCards = [...column.cards];
    updatedCards[cardIndex].revealed = true;

    const columnRef = doc(db, 'columns', column.id);

    await updateDoc(columnRef, {
      cards: updatedCards,
    });
  };

  const handleDeleteCard = async (columnIndex, cardIndex) => {
    const column = columns[columnIndex];
    if (!column || !column.id) {
      console.error("Column or column ID is undefined.");
      return;
    }

    const updatedCards = [...column.cards];
    updatedCards.splice(cardIndex, 1);

    const columnRef = doc(db, 'columns', column.id);

    await updateDoc(columnRef, {
      cards: updatedCards,
    });
  };

  const handleRevealAllCards = async (columnIndex) => {
    const column = columns[columnIndex];
    if (!column || !column.id) {
      console.error("Column or column ID is undefined.");
      return;
    }

    const updatedCards = column.cards.map((card) => ({
      ...card,
      revealed: true,
    }));

    const columnRef = doc(db, 'columns', column.id);

    await updateDoc(columnRef, {
      cards: updatedCards,
    });
  };

  const handleDeleteAllCards = async (columnIndex) => {
    if (!window.confirm("Tem certeza que deseja apagar todos os cards?")) return;

    const column = columns[columnIndex];
    if (!column || !column.id) {
      console.error("Column or column ID is undefined.");
      return;
    }

    const columnRef = doc(db, 'columns', column.id);

    await updateDoc(columnRef, {
      cards: [],
    });
  };

  return (
    <div className="app">
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
          />
        ))
      ) : (
        <p>Carregando colunas...</p>
      )}
    </div>
  );
}

export default App;
