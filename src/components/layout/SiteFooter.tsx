
import React from 'react';
import Container from './Container';

const SiteFooter = () => {
  return (
    <footer className="py-8 bg-gray-50">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-semibold bg-gradient-to-r from-health-600 to-health-800 bg-clip-text text-transparent">
              HealthGrocery
            </span>
          </div>
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} HealthGrocery. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default SiteFooter;
