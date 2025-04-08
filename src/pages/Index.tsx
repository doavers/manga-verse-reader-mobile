
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Redirect to the home page
    window.location.href = "/";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-manga-dark">
      <div className="animate-spin-slow w-12 h-12 border-4 border-manga-primary border-t-transparent rounded-full"></div>
    </div>
  );
};

export default Index;
