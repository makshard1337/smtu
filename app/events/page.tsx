import prisma from '../../lib/db'
import Image from 'next/image'
import Link from 'next/link'

// Отключаем статическую генерацию для этой страницы
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getEvents() {
  try {
    const events = await prisma.news.findMany({
      orderBy: {
        date: 'desc'
      }
    })
    return events
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">Мероприятия и новости</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <article 
            key={event.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {event.image && (
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                {event.title}
              </h2>
              <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                {event.text}
              </p>
              <div className="flex items-center justify-between">
                <time className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <Link 
                  href={`/events/${event.id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  Подробнее
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-lg">
          <p className="text-lg">На данный момент нет доступных мероприятий</p>
          <p className="text-sm mt-2">Пожалуйста, проверьте позже</p>
        </div>
      )}
    </div>
  )
}
