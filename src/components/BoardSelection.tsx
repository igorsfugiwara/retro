import React, { useState, useEffect } from 'react';
import { LogIn, User, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface BoardSelectionProps {
    onBoardSelect: (boardName: string, userName: string) => void;
}

const BoardSelection: React.FC<BoardSelectionProps> = ({ onBoardSelect }) => {
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

    const handleKeyDown = (e: React.KeyboardEvent) => {
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
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="board-selection flex flex-col gap-6 w-full max-w-md p-8 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
        >
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-white">Bem-vindo à Retro</h2>
                <p className="text-zinc-400 text-sm">Entre com o nome do seu time e seu nome para começar.</p>
            </div>

            <div className="space-y-4">
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Seu nome"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={`w-full pl-12 pr-4 py-3 bg-zinc-800/50 border ${animations.userName ? 'border-red-500 animate-shake' : 'border-white/10'} rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                    />
                </div>

                <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Nome da equipe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={`w-full pl-12 pr-4 py-3 bg-zinc-800/50 border ${animations.password ? 'border-red-500 animate-shake' : 'border-white/10'} rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                    />
                </div>
            </div>

            <div className="errors space-y-1">
                {errors.userName && <p className="error-message text-xs text-red-400 font-medium">{errors.userName}</p>}
                {errors.password && <p className="error-message text-xs text-red-400 font-medium">{errors.password}</p>}
            </div>

            <button 
                onClick={handleLogin}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
            >
                <LogIn className="w-5 h-5" />
                Entrar no Board
            </button>
        </motion.div>
    );
};

export default BoardSelection;
