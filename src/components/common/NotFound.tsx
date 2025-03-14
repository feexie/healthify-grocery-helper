
import React from 'react';
import { Link } from 'react-router-dom';
import SiteHeader from '@/components/layout/SiteHeader';
import Container from '@/components/layout/Container';
import SiteFooter from '@/components/layout/SiteFooter';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <>
      <SiteHeader />
      <main className="pt-24 pb-20">
        <Container>
          <div className="text-center py-16">
            <h1 className="text-6xl font-bold mb-6">404</h1>
            <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              The page you are looking for does not exist or has been moved.
            </p>
            <Link to="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
};

export default NotFound;
