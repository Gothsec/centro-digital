import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../presentation/Footer';

export const HelpCenterContainer = () => {
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
            <h1 className="text-3xl font-bold">Help Center</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">How do I register my business?</h3>
                  <p className="text-gray-600">Click on the "Register Business" link in the footer and fill out the registration form with your business details.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">How can I edit my business information?</h3>
                  <p className="text-gray-600">Contact our support team with your business ID and the information you'd like to update.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">What are favorites?</h3>
                  <p className="text-gray-600">Favorites allow you to save businesses you're interested in for quick access later.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
              <p className="text-gray-600 mb-4">
                Need more help? Our support team is available Monday through Friday, 9am to 5pm.
              </p>
              <a
                href="mailto:garaven.camilo@gmail.com"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Contact Support
              </a>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};