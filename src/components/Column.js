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
          <div className="card-content">
          {card.revealed ? card.content : 'Texto mascarado, pague-me um café pra liberar ☕'}
          </div>
          <div className="buttons">
            {!card.revealed && (
              <button className="reveal" onClick={() => onRevealCard(index)}><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5C8.24261 5 5.43602 7.4404 3.76737 9.43934C2.51521 10.9394 2.51521 13.0606 3.76737 14.5607C5.43602 16.5596 8.24261 19 12 19C15.7574 19 18.564 16.5596 20.2326 14.5607C21.4848 13.0606 21.4848 10.9394 20.2326 9.43934C18.564 7.4404 15.7574 5 12 5Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Revelar</button>
            )}
            <button className="delete" onClick={() => onDeleteCard(index)}><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 9.5C14 9.5 14.5 10.5 14.5 12.5C14.5 14.5 14 15.5 14 15.5M10 9.5C10 9.5 9.5 10.5 9.5 12.5C9.5 14.5 10 15.5 10 15.5M5.99999 6C5.99999 11.8587 4.63107 20 12 20C19.3689 20 18 11.8587 18 6M4 6H20M15 6V5C15 3.22496 13.3627 3 12 3C10.6373 3 9 3.22496 9 5V6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Apagar</button>
          </div>
          <div className="interation-at-cards">
          {card.userName && <span>por: <b>{card.userName}</b></span>}
          
          {card.revealed && (
            <div className="like-dislike">
              <button onClick={() => onLike(index)}>
                <div className="like-dislike-counter">
                  {card.likes === 0? "" : card.likes}
                  </div> <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              
              </button>
              <button onClick={() => onDislike(index)}>
                <div className="like-dislike-counter">
                {card.dislikes === 0? "" : card.dislikes}
                </div> <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14V4M8 14L4 14V4.00002L8 4M8 14L13.1956 20.0615C13.6886 20.6367 14.4642 20.884 15.1992 20.7002L15.2467 20.6883C16.5885 20.3529 17.1929 18.7894 16.4258 17.6387L14 14H18.5604C19.8225 14 20.7691 12.8454 20.5216 11.6078L19.3216 5.60779C19.1346 4.67294 18.3138 4.00002 17.3604 4.00002L8 4" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              </button>
            </div>
          )}
          </div>
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
            <button className="add" onClick={handleAddCardSubmit}><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 7V17M7 12H17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Adicionar Card</button>
            <button className="delete" onClick={() => setIsAdding(false)}><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 5L4.99998 19M5.00001 5L19 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Cancelar</button>
          </div>
        ) : (
        <button className="add" onClick={handleAddCardClick}><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 7V17M7 12H17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Adicionar Card</button>
        )}
        <button className="reveal" onClick={onRevealAll}><svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5C8.24261 5 5.43602 7.4404 3.76737 9.43934C2.51521 10.9394 2.51521 13.0606 3.76737 14.5607C5.43602 16.5596 8.24261 19 12 19C15.7574 19 18.564 16.5596 20.2326 14.5607C21.4848 13.0606 21.4848 10.9394 20.2326 9.43934C18.564 7.4404 15.7574 5 12 5Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Revelar Todos</button>
        <button className="delete" onClick={onDeleteAll}><svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 9.5C14 9.5 14.5 10.5 14.5 12.5C14.5 14.5 14 15.5 14 15.5M10 9.5C10 9.5 9.5 10.5 9.5 12.5C9.5 14.5 10 15.5 10 15.5M5.99999 6C5.99999 11.8587 4.63107 20 12 20C19.3689 20 18 11.8587 18 6M4 6H20M15 6V5C15 3.22496 13.3627 3 12 3C10.6373 3 9 3.22496 9 5V6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Apagar Todos</button>
      </div>
    </div>
  );
};

export default Column;
