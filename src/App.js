import React, { useState, useEffect } from 'react';
import { db } from './firebase/firebaseConfig';
import Column from './components/Column';
import { collection, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import BoardSelection from './components/BoardSelection';
import './App.css';

function App() {
  const [columns, setColumns] = useState([
    { title: 'Começar a Fazer', cards: [] },
    { title: 'Parar de Fazer', cards: [] },
    { title: 'Continuar Fazendo', cards: [] },
  ]);
  const [userName, setUserName] = useState('');
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    if (!selectedBoard) return;

    const unsubscribe = onSnapshot(collection(db, selectedBoard), (snapshot) => {
      const newColumns = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title || 'Sem Título',
        cards: doc.data().cards || [],
      }));
      setColumns(newColumns);
    });

    return () => unsubscribe(); 
  }, [selectedBoard]);


  const handleBoardSelect = (boardName) => {
    setSelectedBoard(boardName); // Atualiza o board selecionado
    const name = prompt("Por favor, insira o seu nome:");
    if (name) {
      setUserName(name);
    }
  };

  const handleAddCard = async (columnIndex, content) => {
    if (!content) return; // Não adiciona card vazio

    const column = columns[columnIndex];
    if (!column || !column.id) return;

    const newCard = { content, revealed: false, userName, likes: 0, dislikes: 0 };
    const columnRef = doc(db, selectedBoard, column.id);  

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

    const columnRef = doc(db, selectedBoard, column.id);

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

    const columnRef = doc(db, selectedBoard, column.id);

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

    const columnRef = doc(db, selectedBoard, column.id);

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

    const columnRef = doc(db, selectedBoard, column.id);

    await updateDoc(columnRef, {
      cards: [],
    });
  };

  const handleLike = async (columnIndex, cardIndex) => {
    const column = columns[columnIndex];
    if (!column || !column.id) return;
  
    const card = column.cards[cardIndex];
    if (!card) return;
  
    // Verifica se o usuário já interagiu com o card
    if (card.interactedBy && card.interactedBy.includes(userName)) {
      alert("Você já interagiu com este card!");
      return;
    }
  
    const updatedCard = {
      ...card,
      likes: (card.likes || 0) + 1,
      interactedBy: [...(card.interactedBy || []), userName], // Armazena o usuário no array 'interactedBy'
    };
  
    const updatedCards = [...column.cards];
    updatedCards[cardIndex] = updatedCard;
  
    const columnRef = doc(db, selectedBoard, column.id);
    await updateDoc(columnRef, {
      cards: updatedCards,
    });
  };
  
  const handleDislike = async (columnIndex, cardIndex) => {
    const column = columns[columnIndex];
    if (!column || !column.id) return;
  
    const card = column.cards[cardIndex];
    if (!card) return;
  
    // Verifica se o usuário já interagiu com o card
    if (card.interactedBy && card.interactedBy.includes(userName)) {
      alert("Você já interagiu com este card!");
      return;
    }
  
    const updatedCard = {
      ...card,
      dislikes: (card.dislikes || 0) + 1,
      interactedBy: [...(card.interactedBy || []), userName], // Armazena o usuário no array 'interactedBy'
    };
  
    const updatedCards = [...column.cards];
    updatedCards[cardIndex] = updatedCard;
  
    const columnRef = doc(db, selectedBoard, column.id);
    await updateDoc(columnRef, {
      cards: updatedCards,
    });
  };

  return (
    <div className="app">
      <div className="app-wrapper"> 
      {!selectedBoard ? (
        <BoardSelection onBoardSelect={handleBoardSelect} />
      ) : (
        // Exibe o conteúdo do board selecionado
        columns.length > 0 ? (
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
          <p>Carregando colunas...</p>
        )
      )}
      </div>
      <div className='credits'>
        <p>Desenvolvido por <a href='https://github.com/igorsfugiwara/'>Igor Simões Fugiwara </a></p>
        <p><a className='repo' href='https://github.com/igorsfugiwara/retro'>Link do repositório</a></p>
      </div>
    </div>
  );
}

export default App;