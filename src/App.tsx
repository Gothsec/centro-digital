import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BusinessListingContainer } from './components/container/BusinessListingContainer';
import { BusinessDetailContainer } from './components/container/BusinessDetailContainer';
import { RegisterBusinessContainer } from './components/container/RegisterBusinessContainer';
import { HelpCenterContainer } from './components/container/HelpCenterContainer';
import { TermsContainer } from './components/container/TermsContainer';
import { PrivacyContainer } from './components/container/PrivacyContainer';
import { ReportContainer } from './components/container/ReportContainer';
import NotFound from './components/presentation/Error404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BusinessListingContainer />} />
        <Route path="/business/:id" element={<BusinessDetailContainer />} />
        <Route path="/register-business" element={<RegisterBusinessContainer />} />
        <Route path="/help" element={<HelpCenterContainer />} />
        <Route path="/terms" element={<TermsContainer />} />
        <Route path="/privacy" element={<PrivacyContainer />} />
        <Route path="/report" element={<ReportContainer />} />


        {/*Ruta para manejar el error 404.*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;