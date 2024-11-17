import React from 'react';
import { X, Calendar, MapPin, Users, Tag, CheckCircle, XCircle } from 'lucide-react';

interface EventDetailsModalProps {
  event: any;
  onClose: () => void;
  isRegistered: boolean;
  onRegister: () => void;
  onUnregister: () => void;
  viewOnly?: boolean;
}

function EventDetailsModal({
  event,
  onClose,
  isRegistered,
  onRegister,
  onUnregister,
  viewOnly = false,
}: EventDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold">{event.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {event.image && (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}

          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              <Tag className="w-4 h-4 mr-1" />
              {event.category}
            </span>
            <span className="text-gray-600">
              Organized by: {event.organizer.name}
            </span>
          </div>

          <p className="text-gray-700 mb-6">{event.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              <div>
                <p className="font-medium">Date</p>
                <p>{event.date}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <div>
                <p className="font-medium">Location</p>
                <p>{event.location}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-2" />
              <div>
                <p className="font-medium">Capacity</p>
                <p>
                  {event.participants?.length || 0} / {event.capacity} participants
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Close
            </button>
            {!viewOnly && (
              <button
                onClick={isRegistered ? onUnregister : onRegister}
                disabled={!isRegistered && event.participants?.length >= event.capacity}
                className={`flex items-center px-4 py-2 rounded-md ${
                  isRegistered
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300'
                }`}
              >
                {isRegistered ? (
                  <>
                    <XCircle className="w-4 h-4 mr-2" />
                    Unregister
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {event.participants?.length >= event.capacity ? 'Full' : 'Register'}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsModal;