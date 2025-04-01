import React from "react";

const API_URL_FOTO = "https://localhost:7047/pasta-fotos";
const PLACEHOLDER = "../../../assets/no-photo.jpg";

const ImageBodyTemplateV2 = React.memo(({ rowData }) => {
  const imageUrl = rowData.fotoUrl 
    ? `${API_URL_FOTO}/${rowData.fotoUrl}?${new Date().getTime()}`  // Adiciona um parâmetro único
    : PLACEHOLDER;

  console.log("Renderizando imagem:", rowData.fotoUrl);
  console.log('rowData.fotoUrl:', rowData.fotoUrl);


  return (
    <img 
      src={imageUrl} 
      alt="Foto do aluno" 
      style={{ width: 50, height: 50, borderRadius: "50%" }}
      onError={(e) => {
        e.target.onerror = null; 
        e.target.src = PLACEHOLDER;
      }} 
    />
  );
});

export default ImageBodyTemplateV2;
