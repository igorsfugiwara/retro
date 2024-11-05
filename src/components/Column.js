import React from 'react';

const Column = ({ title, cards, onAddCard, onDeleteCard, onRevealCard, onRevealAll, onDeleteAll, onLike, onDislike }) => (
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
        <button className="add" onClick={() => {
          const content = prompt('Digite o conteúdo do card:');
          if (content !== null) onAddCard(content);
        }}>➕ Adicionar Card</button>
        <button className="reveal" onClick={onRevealAll}>👁️ Revelar Todos</button>
        <button className="delete" onClick={onDeleteAll}>🗑️ Apagar Todos</button>
      </div>
    </div>
  );
  

export default Column;
