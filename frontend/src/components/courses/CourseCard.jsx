import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Users } from 'lucide-react';

function CourseCard({ course }) {
  const {
    id,
    title,
    description,
    difficulty,
    duration,
    price,
    image_url,
    category,
    rating
  } = course;

  // Function to determine difficulty badge style
  const getDifficultyBadgeClass = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'badge-beginner';
      case 'intermediate':
        return 'badge-intermediate';
      case 'advanced':
        return 'badge-advanced';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Truncate description
  const truncateDescription = (text, maxLength = 100) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  // Format price
  const formatPrice = (price) => {
    if (price === 0) return 'Free';
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        <img
          src={image_url || 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getDifficultyBadgeClass(difficulty)}`}>
            {difficulty || 'All Levels'}
          </span>
        </div>
        {price === 0 && (
          <div className="absolute top-3 right-3">
            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-accent-500 text-white">
              Free
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="capitalize">{category || 'General'}</span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{duration || 'Self-paced'}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-secondary-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {truncateDescription(description)}
        </p>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center">
            <Star size={16} className="text-accent-500 mr-1" />
            <span className="text-sm font-medium">{rating || '4.5'}</span>
          </div>
          
          <span className="font-semibold text-primary-900">
            {formatPrice(price || 0)}
          </span>
        </div>
        
        <Link 
          to={`/courses/${id}`} 
          className="btn-secondary w-full mt-4"
        >
          View Course
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;