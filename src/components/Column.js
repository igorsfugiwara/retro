// src/components/Column.js
import React from 'react';

const Column = ({ title, cards, onAddCard, onRevealCard }) => (
    <div className="column">
        <h2>{title}</h2>
        {cards.map((card, index) => (
            <div key={index} className="card">
                {card.revealed ? card.content : '****'}
                {!card.revealed && (
                <button onClick={() => onRevealCard(index)}>Revelar</button>
                )}
            </div>
        ))}
        <button onClick={() => onAddCard(prompt('Digite o conteúdo do card:'))}>
        Adicionar Card
        </button>
    </div>
);

export default Column;
