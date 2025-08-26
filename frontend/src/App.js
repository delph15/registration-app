import React, { useState } from 'react';
import './index.css';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Réinitialiser le message

    try {
      const response = await fetch('http://localhost:5000/api/register', { // Adapte si ton backend n'est pas sur localhost:5000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Succès: ${data.message} ID: ${data.userId}`);
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        setMessage(`Erreur: ${data.message || 'Quelque chose a mal tourné.'}`);
      }
    } catch (error) {
      console.error('Erreur réseau ou serveur:', error);
      setMessage('Erreur de connexion au serveur.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Inscription Utilisateur</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom d'utilisateur:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Mot de passe:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default App;