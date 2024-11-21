import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../presentation/Footer';

export const TermsContainer = () => {
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
            <h1 className="text-3xl font-bold">Terms & Conditions</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
              <p className="text-gray-600">
                Permission is granted to temporarily download one copy of the materials (information or software) on Business Directory's website for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Disclaimer</h2>
              <p className="text-gray-600">
                The materials on Business Directory's website are provided on an 'as is' basis. Business Directory makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};