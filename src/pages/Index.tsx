import { AdminProvider } from '@/context/AdminContext';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { PromiseSection } from '@/components/sections/PromiseSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { AdminToggle } from '@/components/admin/AdminToggle';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <AdminProvider>
      <Helmet>
        <title>Our Adoption Profile | Alex & Jordan</title>
        <meta name="description" content="Welcome to our adoption profile. We're Alex & Jordan, a loving couple excited to grow our family through adoption. Learn about our journey and connect with us." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <TimelineSection />
          <GallerySection />
          <PromiseSection />
          <ContactSection />
        </main>
        <Footer />
        <AdminToggle />
      </div>
    </AdminProvider>
  );
};

export default Index;
