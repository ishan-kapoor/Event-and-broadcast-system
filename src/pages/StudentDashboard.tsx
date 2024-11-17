import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Users, Tag, CheckCircle, XCircle } from 'lucide-react';
import EventDetailsModal from '../components/EventDetailsModal';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  location: string;
  capacity: number;
  participants: string[];
  organizer: {
    name: string;
  };
}

function StudentDashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'available' | 'registered'>('available');

  useEffect(() => {
    fetchEvents();
    fetchRegisteredEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRegisteredEvents = async () => {
    try {
      const response = await fetch('/api/events/registered');
      const data = await response.json();
      setRegisteredEvents(data);
    } catch (error) {
      console.error('Error fetching registered events:', error);
    }
  };

  const handleRegister = async (eventId: string) => {
    try {
      await fetch(`/api/events/${eventId}/register`, {
        method: 'POST',
      });
      fetchEvents();
      fetchRegisteredEvents();
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  const handleUnregister = async (eventId: string) => {
    if (window.confirm('Are you sure you want to unregister from this event?')) {
      try {
        await fetch(`/api/events/${eventId}/unregister`, {
          method: 'POST',
        });
        fetchEvents();
        fetchRegisteredEvents();
      } catch (error) {
        console.error('Error unregistering from event:', error);
      }
    }
  };

  const isRegistered = (eventId: string) => {
    return registeredEvents.some(event => event._id === eventId);
  };

  const EventCard = ({ event, registered }: { event: Event; registered: boolean }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{event.title}</h3>
          <span className="flex items-center text-sm">
            <Tag className="w-4 h-4 mr-1" />
            {event.category}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {event.participants.length} / {event.capacity} participants
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Organized by: {event.organizer.name}
          </span>
          <button
            onClick={() => registered ? handleUnregister(event._id) : handleRegister(event._id)}
            className={`flex items-center px-4 py-2 rounded-md ${
              registered
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            disabled={!registered && event.participants.length >= event.capacity}
          >
            {registered ? (
              <>
                <XCircle className="w-4 h-4 mr-2" />
                Unregister
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                {event.participants.length >= event.capacity ? 'Full' : 'Register'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome, {user?.name}!</p>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('available')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'available'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Available Events
        </button>
        <button
          onClick={() => setActiveTab('registered')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'registered'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          My Registrations
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading events...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'available'
            ? events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  registered={isRegistered(event._id)}
                />
              ))
            : registeredEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  registered={true}
                />
              ))}
        </div>
      )}

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          isRegistered={isRegistered(selectedEvent._id)}
          onRegister={() => handleRegister(selectedEvent._id)}
          onUnregister={() => handleUnregister(selectedEvent._id)}
        />
      )}
    </div>
  );
}

export default StudentDashboard;