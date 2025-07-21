import Header from '@/components/Header';
import WarningBanner from '@/components/WarningBanner';
import ExchangeWidget from '@/components/ExchangeWidget';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        <WarningBanner />
        <div className="pt-8">
          <ExchangeWidget />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}