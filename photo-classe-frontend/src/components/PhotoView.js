import React, { useState } from 'react';

function PhotoView({ photos, codeAcces, onSubmitOrder }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [exemplaires, setExemplaires] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Ajout pour message d'erreur

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setSuccessMessage('');
    setErrorMessage(''); // Réinitialisation du message d'erreur
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPhoto || !name || !prenom || exemplaires < 1) {
      setErrorMessage("Veuillez sélectionner une photo, entrer le nom, le prénom, et un nombre d'exemplaires valide.");
      return;
    }
    const numberOfCopies = parseInt(exemplaires, 10);
    onSubmitOrder({ codeAcces, name, prenom, photoChosen: selectedPhoto, exemplaires: numberOfCopies });
    setSuccessMessage('Votre commande est validée !');
  };

  return (
    <div>
      <h2>Photos de la classe {codeAcces}</h2>

      {/* Affichage des photos */}
      <div className="photoContainer">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo.url || photo} // Vérifie que `photo` est bien une URL
            alt={`Photo ${index}`}
            onClick={() => handlePhotoClick(photo)}
            className={`photoItem ${selectedPhoto === photo ? 'selectedPhoto' : ''}`}
          />
        ))}
      </div>

      {/* Message d'erreur */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Formulaire de commande */}
      {selectedPhoto && (
        <div className="orderForm">
          <h3>Photo sélectionnée</h3>
          <img src={selectedPhoto.url || selectedPhoto} alt="Selected" className="selectedImage" style={{ width: '100%', marginBottom: '20px', borderRadius: '8px' }} />
          
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nom de l'enfant :</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label>Prénom de l'enfant :</label>
              <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
            </div>
            <div>
              <label>Nombre d'exemplaires :</label>
              <input
                type="number"
                min="1"
                value={exemplaires}
                onChange={(e) => setExemplaires(e.target.value)}
                required
              />
            </div>
            <button type="submit">Commander</button>
          </form>
        </div>
      )}

      {/* Message de confirmation */}
      {successMessage && (
        <div className="successMessage" style={{ color: 'green' }}>
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default PhotoView;
