import { AdminProvider } from '@/context/AdminContext';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { HomeSection } from '@/components/sections/HomeSection';
import { FamilyFriendsSection } from '@/components/sections/FamilyFriendsSection';
import { OurLifeSection } from '@/components/sections/OurLifeSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { PromiseSection } from '@/components/sections/PromiseSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
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
          <HomeSection />
          <FamilyFriendsSection />
          <OurLifeSection />
          <TimelineSection />
          <GallerySection />
          <PromiseSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </AdminProvider>
  );
};

export default Index;
