import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../presentation/Footer';

export const PrivacyContainer = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-gray-600">
                We collect information that you provide directly to us, including when you register a business, create an account, or contact us for support.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600">
                We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to develop new services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="text-gray-600">
                We do not share your personal information with third parties except as described in this privacy policy or with your consent.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};