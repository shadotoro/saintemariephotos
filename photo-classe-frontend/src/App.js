import React, { useState } from 'react';
import AccessPage from './pages/AccessPage';
import PhotoView from './components/PhotoView';
import axios from 'axios';

function App() {

  const [photos, setPhotos] = useState([]);
  const [codeAcces, setCodeAcces] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Gérer la validation du code d'accès et le chargement des photos
  const handleAccess = (code, photos) => {
    if (photos.length > 0) {
      setCodeAcces(code);
      setPhotos(photos);
      setError('');
    } else {
      setError('Aucune photo trouvée pour ce code');
    }
  };

  // Gérer la soumission de la commande
  const handleSubmitOrder = async (orderData) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/classes/order`, orderData);
      setSuccessMessage(res.data.message);
      // Reset après commande
      setPhotos([]);
      setCodeAcces('');
    } catch (err) {
      console.error('Erreur lors de la soumission de la commande', err);
      setSuccessMessage('Erreur lors de la commande. Veuillez réessayer.');
    }
  };

  return (
    <div className="App">
      <h1>Bienvenue sur les photos des classes de l'école Sainte-Marie</h1>
      <h2>2024 / 2025</h2>

      {successMessage && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid green', color: 'green' }}>
          {successMessage}
        </div>
      )}

      {/* Appel PhotoView */}
      {photos.length === 0 ? (
        <AccessPage onAccess={handleAccess} />
      ) : (
        <PhotoView photos={photos} codeAcces={codeAcces} onSubmitOrder={handleSubmitOrder} />
      )}
    </div>
  );
}

export default App;
