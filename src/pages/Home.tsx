import React, { useState } from 'react';
import { Calendar, Users, BookOpen } from 'lucide-react';
import EventCard from '../components/EventCard';
import EventDetailsModal from '../components/EventDetailsModal';

const featuredEvents = [
  {
    _id: '1',
    title: 'Annual Tech Symposium',
    date: 'March 25, 2024',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
    description: 'Join us for a day of technology talks, workshops, and networking opportunities. Learn from industry experts, participate in hands-on coding sessions, and explore the latest trends in software development, AI, and cloud computing.',
    category: 'Technical',
    location: 'Main Auditorium',
    capacity: 200,
    organizer: { name: 'Dr. Sarah Johnson' },
    participants: []
  },
  {
    _id: '2',
    title: 'Cultural Fest 2024',
    date: 'April 15, 2024',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000',
    description: 'Experience the vibrant culture through music, dance, and art performances. Showcase your talents, enjoy diverse cultural performances, and be part of an unforgettable celebration of creativity and artistic expression.',
    category: 'Cultural',
    location: 'College Amphitheater',
    capacity: 500,
    organizer: { name: 'Prof. Michael Chen' },
    participants: []
  },
  {
    _id: '3',
    title: 'Research Conference',
    date: 'May 5, 2024',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000',
    description: 'Present your research work and learn from leading academics in various fields. Network with researchers, attend keynote speeches, and participate in panel discussions on cutting-edge research topics.',
    category: 'Academic',
    location: 'Research Center',
    capacity: 150,
    organizer: { name: 'Dr. Emily Martinez' },
    participants: []
  }
];

function Home() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to College Event And Broadcast System
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover and participate in exciting college events, workshops, and activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
          <p className="text-gray-600">Stay updated with all college events</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-green-600" />
          <h3 className="text-xl font-semibold mb-2">Easy Registration</h3>
          <p className="text-gray-600">Quick and simple event registration</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-purple-600" />
          <h3 className="text-xl font-semibold mb-2">Academic Events</h3>
          <p className="text-gray-600">Access academic workshops and seminars</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredEvents.map((event) => (
          <EventCard
            key={event._id}
            title={event.title}
            date={event.date}
            image={event.image}
            description={event.description}
            category={event.category}
            onLearnMore={() => setSelectedEvent(event)}
          />
        ))}
      </div>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          isRegistered={false}
          onRegister={() => {}}
          onUnregister={() => {}}
          viewOnly={true}
        />
      )}
    </div>
  );
}

export default Home;