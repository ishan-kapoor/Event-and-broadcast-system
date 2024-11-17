import React from 'react';
import { Calendar, Tag } from 'lucide-react';

interface EventCardProps {
  title: string;
  date: string;
  image: string;
  description: string;
  category: string;
  onLearnMore: () => void;
}

function EventCard({ title, date, image, description, category, onLearnMore }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-1" />
            {date}
          </span>
          <span className="flex items-center text-sm text-blue-600">
            <Tag className="w-4 h-4 mr-1" />
            {category}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <button 
          onClick={onLearnMore}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

export default EventCard;