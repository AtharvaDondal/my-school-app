import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
  <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
    🏫 School Management
  </h1>
  
  <div className="flex space-x-6">
    <Link
      href="/addSchool"
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105"
    >
      ➕ Add School
    </Link>
    <Link
      href="/showSchools"
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105"
    >
      📋 Show Schools
    </Link>
  </div>
</main>


  );
}
