import React, { useState, useEffect } from 'react';

const BoardSelection = ({ onBoardSelect }) => {
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [animateError, setAnimateError] = useState(false);

    const handleLogin = () => {
        const teamNames = ['jupiter', 'xingu', 'turing', 'saturno', 'monaco', 'teste'];
        const nameRegex = /^[a-zA-Z\s]{2,}$/;

        if (!nameRegex.test(userName)) {
            setErrorMessage(`Por favor, insira um nome válido com pelo menos 2 letras.
(ex: "Ed")`);
            setAnimateError(true);
            return;
        }
        if (teamNames.includes(password.toLowerCase())) {
            onBoardSelect(password.toLowerCase(), userName);
        } else {
            setErrorMessage(`Equipe não encontrada, favor verificar o nome.
Você pode acessar com a palavra chave "teste"`);
            setAnimateError(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    useEffect(() => {
        if (animateError) {
            const timer = setTimeout(() => setAnimateError(false), 500);
            return () => clearTimeout(timer);
        }
    }, [animateError]);

    return (
        <div className="board-selection">
            <h2>Entre com o nome do seu time e seu nome</h2>
            <input
                type="text"
                placeholder="Digite seu nome "
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ borderColor: animateError ? 'red' : '' }}
                className={animateError ? 'shake-animation' : ''} 
                class="name"
            />
            <input
                type="text"
                placeholder="Digite o nome da sua equipe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ borderColor: animateError ? 'red' : '' }}
                className={animateError ? 'shake-animation' : ''} 
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
};

export default BoardSelection;
