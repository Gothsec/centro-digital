import { supabase } from '../../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { checkAuthentication } = useAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      localStorage.removeItem('sb-access-token');
      localStorage.removeItem('sb-refresh-token');

      await checkAuthentication();
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
