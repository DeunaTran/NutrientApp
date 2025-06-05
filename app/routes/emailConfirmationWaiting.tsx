import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import supabase from 'utils/supabase';

export default function EmailConfirmationWaiting() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }

      const user = data.user;

      if (user?.email_confirmed_at) {
        console.log("Email confirmed:", user.email_confirmed_at);
        clearInterval(interval);
        navigate("/"); // or wherever the homepage is
      }
    }, 5000); // check every 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [navigate]);

  return (
    <div className="w-full fixed inset-0 text-center mt-10">
      <h1 className="text-xl font-semibold">Please confirm your email</h1>
      <p className="mt-4">We’ve sent a confirmation link to your email. Once you confirm, you’ll be redirected automatically.</p>
    </div>
  );
}
