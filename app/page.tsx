import Link from 'next/link';

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-6xl font-bold text-blue-900 mb-10">
          Студенческий совет СПбГМТУ
        </h1>
        <p className="text-xl text-black-600 mb-8 max-w-2xl">
          Студенческий совет обучающихся СПбГМТУ — это коллегиальный орган управления университетом, 
          призванный учитывать мнения и интересы студентов.
        </p>
        <div className="space-x-4">
          <Link 
            href="/about" 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            О нас
          </Link>
        </div>
      </div>
    </main>
  );
}
