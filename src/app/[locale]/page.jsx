// import React from "react";
// import Slider from "@/components/Slider";
// import DisplayCategoryCard from "@/components/DisplayCategoryCard";
// import { unstable_setRequestLocale } from "next-intl/server";
// import { useTranslations } from "next-intl";

// export default function HomePage({ params: { locale } }) {
//   unstable_setRequestLocale(locale);
//   const t = useTranslations("Index");
//   return (
//     <div>
//       <Slider />
//       <div style={containerStyles}>
//         <DisplayCategoryCard />
//       </div>
//     </div>
//   );
// }

// const containerStyles = {
//   display: "grid",
//   gridTemplateColumns: "repeat(4, 1fr)", // 4 columns for 4 boxes in a row
//   gap: "20px",
//   marginTop: "40px",
//   maxWidth: "1800px", // Adjust the max width if needed
//   margin: "0 auto",
// };



"use client"; // Ensure this component is client-side

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct hook for navigation in Next.js app directory
import { useLocale } from "next-intl";

export default function RedirectToLocaleHome() {
  const router = useRouter();
  const localeActive = useLocale(); // Get the current active locale

  useEffect(() => {
    if (localeActive) {
      router.push(`/${localeActive}/home`); // Dynamically redirect to the /locale/home path
    }
  }, [router, localeActive]);

  return null; // Return nothing since this is just a redirect
}
