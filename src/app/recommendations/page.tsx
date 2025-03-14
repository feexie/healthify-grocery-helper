
import React from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';

// Import the actual recommendations page content
// This is assumed to be in the read-only files, so we're just creating a wrapper
const RecommendationsPage = () => {
  return (
    <>
      <SiteHeader />
      <main className="pt-24 pb-20">
        {/* The actual content from the read-only Recommendations.tsx would go here */}
      </main>
      <SiteFooter />
    </>
  );
};

export default RecommendationsPage;
