import React, { useState } from 'react';

const BoardSelection = ({ onBoardSelect }) => {
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const teamNames = ['jupiter', 'xingu', 'turing', 'saturno', 'monaco'];
        if (teamNames.includes(password.toLowerCase())) {
            onBoardSelect(password.toLowerCase()); // Passa o nome do board selecionado para o App.js
        } else {
            alert('Equipe não encontrada. Por favor, verifique o nome.');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="board-selection">
            <h2>Entre com o nome do seu time</h2>
            <input
                type="text"
                placeholder="Digite o nome da sua equipe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress} // Adiciona o evento para capturar Enter
            />
            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
};

export default BoardSelection;
