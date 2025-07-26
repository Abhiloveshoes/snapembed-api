// app/page.tsx
'use client';

import { useState } from 'react';
import UploadForm from './upload-form';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-white-100">
      <h1 className="text-3xl font-bold mb-6">SnapEmbed – Generate Social Screenshot Embeds</h1>
      <UploadForm />
    </main>
  );
}
