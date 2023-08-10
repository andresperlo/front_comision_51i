import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ContactPage = () => {
  const location = useLocation();
  const { name } = location.state || {};
  const [state, setState] = useState('');

  useEffect(() => {
    setState(name || '');
  }, [name]);

  return (
    <div>Contacto: {state}</div>
  );
}

export default ContactPage;
