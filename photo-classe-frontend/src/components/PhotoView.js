import React, { useState } from 'react';

function PhotoView({ photos, codeAcces, onSubmitOrder }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [exemplaires, setExemplaires] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const commandeActive = false;

  const handlePhotoClick = (photo) => {
    if (selectedPhoto === photo) {
      setSelectedPhoto(null);
    } else {
      setSelectedPhoto(photo);
    }
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

      <div className="photoContainer">
  {photos.map((photo, index) => (
    <div key={index} className="photoItemContainer">
      <img
        src={photo.url}
        alt={`Photo ${photo.numero}`}
        onClick={() => handlePhotoClick(photo)}
        className={`photoItem ${selectedPhoto === photo ? 'selectedPhoto' : ''}`}
      />
      <p className="photoNumber">Photo n°{photo.numero}</p>
    </div>
  ))}
</div>


      {/* Message d'erreur */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {!commandeActive && (
        <p style={{ color: 'gray', textAlign: 'center', marginTop: '20px' }}>
          La commande en ligne est désactivée. Veuillez utiliser la version papier et reporter le numéro de la photo choisie. Merci de votre compréhension.
        </p>
      )}

      {/* Formulaire de commande */}
      {commandeActive && selectedPhoto && (
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
