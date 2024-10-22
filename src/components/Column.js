import React from 'react';

const Column = ({ title, cards, onAddCard, onDeleteCard, onRevealCard, onRevealAll, onDeleteAll }) => (
    <div className="column">
        <h2>{title}</h2>
        {cards.map((card, index) => (
        <div key={index} className="card">
        {card.revealed ? card.content : 'texto mascarado, pague-me um café pra liberar ☕'}
            <div class="buttons"> 
                {!card.revealed && (
                <button onClick={() => onRevealCard(index)}>Revelar</button>
                )}
                <button onClick={() => onDeleteCard(index)}>Apagar</button>
            </div>
        </div>
        ))}
        <div class="controls">
            <button onClick={() => {
            const content = prompt('Digite o conteúdo do card:');
            if (content !== null) onAddCard(content); // Só adiciona se o usuário não cancelar
            }}>
            Adicionar Card
            </button>
            <button onClick={onRevealAll}>Revelar Todos</button>
            <button onClick={onDeleteAll}>Apagar Todos</button>
        </div>
    </div>
);

export default Column;
