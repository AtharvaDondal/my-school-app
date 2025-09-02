"use client"

import React, { useEffect, useState } from 'react';

type School = {
  id: number;
  name: string;
  address: string;
  city: string;
  imageUrl?: string | null;
};

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/getSchools')
      .then(res => res.json())
      .then(data => setSchools(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!schools.length) return <div className="p-6">No schools found.</div>;

  return (
   <div className="max-w-7xl mx-auto p-6">
  <h1 className="text-3xl font-bold mb-8 text-center">🏫 Schools</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {schools.map((s) => (
      <div
        key={s.id}
        className="group border rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
      >
        <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
          {s.imageUrl ? (
            <img
              src={s.imageUrl}
              alt={s.name}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="text-gray-400 text-lg">No Image</div>
          )}
        </div>
        <div className="p-5">
          <h2 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
            {s.name}
          </h2>
          <p className="text-sm text-gray-600 mt-1">{s.address}</p>
          <p className="text-sm text-gray-500 mt-2">{s.city}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
