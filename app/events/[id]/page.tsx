import prisma from '../../../lib/db'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getEvent(id: string) {
  const eventId = parseInt(id, 10)
  if (isNaN(eventId)) {
    return null
  }

  try {
    const event = await prisma.news.findUnique({
      where: {
        id: eventId
      }
    })
    return event
  } catch (error) {
    console.error('Error fetching event:', error)
    return null
  }
}

export default async function EventPage({ 
  params 
}: { 
  params: { id: string }
}) {
  const event = await getEvent(params.id)
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Мероприятие не найдено</h1>
          <p className="text-gray-600 mb-8">Запрашиваемое мероприятие не существует или было удалено</p>
          <Link 
            href="/events"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Вернуться к списку мероприятий
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {event.image && (
          <div className="relative h-96 w-full">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        )}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {event.title}
          </h1>
          <time className="block text-gray-600 mb-8 text-lg">
            {new Date(event.date).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <div className="prose prose-lg max-w-none mb-8">
            <p className="whitespace-pre-wrap">{event.text}</p>
          </div>
          <div className="flex justify-center">
            <Link 
              href="/events"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Вернуться к списку мероприятий
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
