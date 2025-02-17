import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Prevent Ctrl+P and Cmd+P
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        alert('Please use the Download PDF button to save your resume.');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp; 