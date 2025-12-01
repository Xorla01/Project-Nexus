import { Suspense } from "react";
import HomeClient from "./home-content";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Movie App...</div>}>
      <HomeClient />
    </Suspense>
  );
}
