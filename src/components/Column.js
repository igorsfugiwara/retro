import React from 'react';

const Column = ({ title, cards, onAddCard, onDeleteCard, onRevealCard, onRevealAll, onDeleteAll }) => (
    <div className="column">
        <h2>{title}</h2>
        {cards.map((card, index) => (
        <div key={index} className="card">
        {card.revealed ? card.content : 'Texto mascarado, pague-me um café pra liberar ☕'}
            <div class="buttons"> 
                {!card.revealed && (
                <button class="reveal" onClick={() => onRevealCard(index)}>👁️ Revelar</button>
                )}
                <button class="delete" onClick={() => onDeleteCard(index)}>🗑️ Apagar</button>
            </div>
            {card.userName && <span>por:  <b>{card.userName}</b></span>}
        </div>
        ))}
        <div class="controls">
            <button class="add" onClick={() => {
            const content = prompt('Digite o conteúdo do card:');
            if (content !== null) onAddCard(content); // Só adiciona se o usuário não cancelar
            }}>➕ 
            Adicionar Card
            </button>
            <button class="reveal" onClick={onRevealAll}>👁️ Revelar Todos</button>
            <button class="delete" onClick={onDeleteAll}>🗑️ Apagar Todos</button>
        </div>
    </div>
);

export default Column;
