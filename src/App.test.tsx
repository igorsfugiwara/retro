import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import React from 'react';
import '@testing-library/jest-dom';

// Mocking Firebase
vi.mock('./firebase/firebaseConfig', () => ({
  db: {}
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  onSnapshot: vi.fn(() => vi.fn()),
  doc: vi.fn(),
  updateDoc: vi.fn(),
  getDoc: vi.fn()
}));

describe('App Component', () => {
  it('renders the welcome screen initially', () => {
    render(<App />);
    expect(screen.getByText(/Bem-vindo à Retro/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Seu nome/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nome da equipe/i)).toBeInTheDocument();
  });

  it('shows error when trying to enter with invalid name', () => {
    render(<App />);
    const enterButton = screen.getByText(/Entrar no Board/i);
    fireEvent.click(enterButton);
    expect(screen.getByText(/Insira um nome com pelo menos 2 letras/i)).toBeInTheDocument();
  });

  it('shows error when trying to enter with invalid team', () => {
    render(<App />);
    const nameInput = screen.getByPlaceholderText(/Seu nome/i);
    fireEvent.change(nameInput, { target: { value: 'Igor' } });
    
    const enterButton = screen.getByText(/Entrar no Board/i);
    fireEvent.click(enterButton);
    
    expect(screen.getByText(/Equipe não encontrada/i)).toBeInTheDocument();
  });
});
