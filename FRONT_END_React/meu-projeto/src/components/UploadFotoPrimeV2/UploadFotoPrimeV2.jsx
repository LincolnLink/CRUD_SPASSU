import React, { useState, useEffect } from "react";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Button } from "primereact/button";

const API_URL = "https://localhost:7047";
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg"];

const UploadFoto = ({ onFileSelected, existingImage, onRemovePhoto }) => {
  const [preview, setPreview] = useState(existingImage || null);
  const [error, setError] = useState("");


  useEffect(() => {
    if (existingImage) {
      const isAbsoluteUrl = existingImage.startsWith("http");
      setPreview(isAbsoluteUrl ? existingImage : `${API_URL}/pasta-fotos/${existingImage}`);
    } else {
      setPreview(null);
    }
  }, [existingImage]);

  const handleUpload = (event) => {
    const file = event.files[0];

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Apenas arquivos JPEG/JPG são permitidos.");
      setPreview(existingImage || null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("O arquivo excede o tamanho máximo de 1MB.");
      setPreview(existingImage || null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    setError("");
        
    if (onFileSelected) {
      onFileSelected(file);
      if (onRemovePhoto) onRemovePhoto(false);
    }
    
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    setError("");
    if (onFileSelected) onFileSelected(null);
    if (onRemovePhoto) onRemovePhoto(true);
  };

  return (
    <div className="upload-container">
      <FileUpload
        name="fotoUpdate"
        mode="basic"
        accept="image/jpeg, image/jpg"        
        customUpload
        auto
        chooseLabel="Escolher Foto"
        onSelect={handleUpload}
      />

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {preview ? (
        <>
          <Image src={preview} alt="Preview" width="150" className="mt-2" />
          <Button
            label="Remover"
            icon="pi pi-trash"
            className="p-button-danger p-button-sm mt-2"
            onClick={handleRemovePhoto}
          />
        </>
      ) : (
        <p style={{ fontSize: "12px", marginTop: "10px" }}>Nenhuma imagem selecionada.</p>
      )}
    </div>
  );
};

export default UploadFoto;
