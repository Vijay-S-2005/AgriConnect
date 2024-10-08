'use client';
import { useSession } from 'next-auth/react';
import { useLocale } from "next-intl";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FarmerDashboard = () => {
  const localeActive = useLocale();
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log("session",session); 

  useEffect(() => {
    // If user is not authenticated or not a farmer, redirect or show unauthorized
    if (session?.user?.type !== 'farmer') {
      router.push(`/${localeActive}/unauthorize`); // Redirect to an unauthorized page
    }
  }, [session, status]);

  if (session?.user?.type === 'farmer') {
    return <div>Welcome to the Farmer Dashboard</div>;

  }

  // If the user is not authenticated, show unauthorized message
  return <div>Unauthorized user</div>;
};

export default FarmerDashboard;
