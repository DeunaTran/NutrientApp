import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COOKIE_KEY = 'cookie_consent';

const Cookies: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Check if user already gave consent
  useEffect(() => {
    const hasConsent = document.cookie.includes(`${COOKIE_KEY}=true`);
    if (!hasConsent) {
      setIsOpen(true);
    }
  }, []);

  const giveConsent = () => {
    // Set cookie for 1 year
    document.cookie = `${COOKIE_KEY}=true; path=/; max-age=31536000`;
    setIsOpen(false);
  };

  const close = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween', duration: 0.4 }}
          className='fixed backdrop-blur-3xl md:w-2xl bottom-0 left-0 right-0 z-20 bg-white font-light text-xs text-black m-4 shadow-lg rounded-lg'
        >
          <div className='relative flex flex-col items-center justify-center p-4'>
            <p>
              This website uses <strong>cookies</strong> to ensure you get the
              best experience on our website.
            </p>
            <p className='underline cursor-pointer'>Privacy Policy</p>

            <button
              onClick={giveConsent}
              className='bg-black w-full text-white px-4 py-2 font-semibold mt-2 transition-colors'
            >
              ACCEPT
            </button>
            <button
              onClick={close}
              className='bg-white w-full text-black border px-4 py-2 font-semibold mt-2 transition-colors'
            >
              PREFERENCES
            </button>

            <div
              className='absolute -top-3 -right-3 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer'
              onClick={close}
              aria-label='Close'
            >
              ×
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cookies;
