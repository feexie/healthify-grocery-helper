
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "@/app/home/page";
import Profile from "@/app/profile/page";
import Recommendations from "@/app/recommendations/page";
import NotFound from "@/components/common/NotFound";

export default function Page() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/recommendations" element={<Recommendations />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
