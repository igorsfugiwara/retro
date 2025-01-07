import React, { useState, useEffect } from 'react';

const BoardSelection = ({ onBoardSelect }) => {
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [errors, setErrors] = useState({ userName: '', password: '' });
    const [animations, setAnimations] = useState({ userName: false, password: false });

    const teamNames = ['jupiter', 'xingu', 'xingu1', 'turing', 'saturno', 'monaco', 'teste'];
    const nameRegex = /^[a-zA-Z\s]{2,}$/;

    const validateFields = () => {
        let hasError = false;
        if (!nameRegex.test(userName)) {
            setErrors((prev) => ({ ...prev, userName: 'Insira um nome com pelo menos 2 letras.' }));
            setAnimations((prev) => ({ ...prev, userName: true }));
            hasError = true;
        } else {
            setErrors((prev) => ({ ...prev, userName: '' }));
        }

        if (!teamNames.includes(password.toLowerCase())) {
            setErrors((prev) => ({ ...prev, password: 'Equipe não encontrada. Tente "teste" para acessar.' }));
            setAnimations((prev) => ({ ...prev, password: true }));
            hasError = true;
        } else {
            setErrors((prev) => ({ ...prev, password: '' }));
        }

        return hasError;
    };

    const handleLogin = () => {
        if (!validateFields()) {
            onBoardSelect(password.toLowerCase(), userName);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    useEffect(() => {
        const resetAnimations = () => setAnimations({ userName: false, password: false });
        if (animations.userName || animations.password) {
            const timer = setTimeout(resetAnimations, 500);
            return () => clearTimeout(timer);
        }
    }, [animations]);

    return (
        <div className="board-selection">
            <h2>Entre com o nome do seu time e seu nome</h2>

            <input
                type="text"
                placeholder="Digite seu nome"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ borderColor: animations.userName ? 'red' : '' }}
                className={animations.userName ? 'shake-animation' : ''}
                class="name"
            />

            <input
                type="text"
                placeholder="Digite o nome da sua equipe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ borderColor: animations.password ? 'red' : '' }}
                className={animations.password ? 'shake-animation' : ''}
            />
            <div className="errors">
            {errors.userName && <p className="error-message">{errors.userName}</p>}
            {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
};

export default BoardSelection;
