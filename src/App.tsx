import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import Works from './pages/Works/Works';
import ScrollContainer from './components/ScrollContainer/ScrollContainer';

function App() {
  return (
    <ScrollContainer>
      <HomePage />
      <Works />
      <footer className="relative z-20 flex items-center justify-between px-16 py-6 text-xs text-gray-500 border-t border-gray-800">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-white">ENG</span>
          <span className="mx-1">/</span>
          <span>UA</span>
        </div>
        <div>© Designed by Illia Rozhok</div>
        <span className="tracking-widest text-xs text-gray-400">INNOVATION | SOCIAL</span>
      </footer>
    </ScrollContainer>
  );
}

export default App;
