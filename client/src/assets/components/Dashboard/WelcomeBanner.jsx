import React, { useEffect, useState } from 'react';
import './WelcomeBanner.css';

const phrases = [
  'npm install devconnect',
  'Welcome, <Developer />',
  'console.log("Connected.");',
  'Version 1.0.0 – Commit. Push. Deploy.',
  'Connecting developers like APIs',
  'Booting DevConnect OS...',
  'cd ~/devconnect && start.sh',
  'You are now in: $ /dashboard',
  'Rendering Community Feed...'
];

const WelcomeBanner = () => {
  const [currentText, setCurrentText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = deleting ? 40 : 100;

    const timeout = setTimeout(() => {
      const updatedText = deleting
        ? currentPhrase.substring(0, charIndex - 1)
        : currentPhrase.substring(0, charIndex + 1);

      setCurrentText(updatedText);
      setCharIndex(prev => deleting ? prev - 1 : prev + 1);

      if (!deleting && updatedText === currentPhrase) {
        setTimeout(() => setDeleting(true), 2000);
      } else if (deleting && updatedText === '') {
        setDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex]);

  return (
    <div className="welcome-banner">
      <h1 className="typing-text text-lg md:text-xl lg:text-2xl">{currentText}</h1>
    </div>
  );
};

export default WelcomeBanner;
