// app/components/Footer.tsx

import React from 'react';

type Props = {};

const Footer: React.FC<Props> = () => {
  return (
    <footer className="bg-blue-900 text-white py-6">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; 2024 Catering4U. All rights reserved.</p>
        <div className="mt-4">
          <a href="#" className="text-yellow-500 hover:text-yellow-400 mx-2">Privacy Policy</a>
          <a href="#" className="text-yellow-500 hover:text-yellow-400 mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
