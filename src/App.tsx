import { useState } from 'react';
import Background3D from './components/Background3D';
import LandingPage from './components/LandingPage';

function App() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Background3D activeCategory={activeCategory} />
      <LandingPage activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
    </div>
  );
}

export default App;
