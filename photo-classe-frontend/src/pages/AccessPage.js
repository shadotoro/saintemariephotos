import React, { useState } from 'react';
import axios from 'axios';

function AccessPage({ onAccess }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/classes/access', { codeAcces: code });
      if (res.data.photos) {
        onAccess(code, res.data.photos);
        setError('');
      }
    } catch (err) {
      setError('Code invalide');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Entrez le code d'accès"
          className="code-input"
        />
        <button type="submit" className="submit-button">Valider</button>
      </form>
      {loading && <p>Chargement...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default AccessPage;
