import React, { useState } from 'react';

const Column = ({ title, cards, onAddCard, onDeleteCard, onRevealCard, onRevealAll, onDeleteAll, onLike, onDislike }) => {
  const [isAdding, setIsAdding] = useState(false); // Estado para controlar a exibição do campo de texto
  const [newCardContent, setNewCardContent] = useState(''); // Estado para armazenar o conteúdo do novo card

  const handleAddCardClick = () => {
    setIsAdding(true); // Exibe o campo de texto ao clicar no botão
  };

  const handleAddCardSubmit = () => {
    if (newCardContent.trim()) {
      onAddCard(newCardContent); // Chama a função de adicionar card
      setNewCardContent('');
      setIsAdding(false);
    }
  };

  return (
    <div className="column">
      <h2>{title}</h2>
      {cards.map((card, index) => (
        <div key={index} className="card">
          {card.revealed ? card.content : 'Texto mascarado, pague-me um café pra liberar ☕'}
          <div className="buttons">
            {!card.revealed && (
              <button className="reveal" onClick={() => onRevealCard(index)}>👁️ Revelar</button>
            )}
            <button className="delete" onClick={() => onDeleteCard(index)}>🗑️ Apagar</button>
          </div>
          {card.userName && <span>por: <b>{card.userName}</b></span>}
          
          {card.revealed && (
            <div className="like-dislike">
              <button onClick={() => onLike(index)}>👍 Like ({card.likes || 0})</button>
              <button onClick={() => onDislike(index)}>👎 Dislike ({card.dislikes || 0})</button>
            </div>
          )}
        </div>
      ))}
      <div className="controls">
        {isAdding ? (
          <div className='add_card'>
            <textarea
              placeholder="Digite o conteúdo do card..."
              value={newCardContent}
              onChange={(e) => setNewCardContent(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCardSubmit()}
            />
            <button className="add" onClick={handleAddCardSubmit}>➕ Adicionar Card</button>
            <button className="delete" onClick={() => setIsAdding(false)}>❌ Cancelar</button>
          </div>
        ) : (
        <button className="add" onClick={handleAddCardClick}>➕ Adicionar Card</button>
        )}
        <button className="reveal" onClick={onRevealAll}>👁️ Revelar Todos</button>
        <button className="delete" onClick={onDeleteAll}>🗑️ Apagar Todos</button>
      </div>
    </div>
  );
};

export default Column;
