import React from 'react';

import './styles.css';

export default function PatientRequest() {
    const handleClick = () => {
        window.location.href= "https://api.whatsapp.com/send?phone=5548996601926&text=Ol%C3%A1%2C%20gostaria%20de%20me%20tornar%20um%20paciente";
        return null;
    }
  return (
    <div className="patient-request">
        <h2>Quer ser paciente?</h2>
        <p>Tenha seu cardápio sempre em mãos</p>
        <p>Contato direto com a nutri</p>
        <p>Acesso a diversas funcionalidades</p>
        <button onClick={handleClick}>Eu quero</button>
    </div>
  );
}
