import React from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Tour } from '../types';
import { Calendar, MapPin, Users, Check, X, MessageCircle } from 'lucide-react';

export default function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = React.useState<Tour | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<string>('');

  React.useEffect(() => {
    const fetchTour = async () => {
      try {
        const docRef = doc(db, 'tours', id!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const tourData = { id: docSnap.id, ...docSnap.data() } as Tour;
          setTour(tourData);
          setSelectedImage(tourData.imageUrl);
        } else {
          throw new Error('Tour not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load tour'));
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  const handleBooking = () => {
    if (!tour) return;
    const message = `Hi, I'm interested in the ${tour.title} tour.\n\nDetails:\nDuration: ${tour.duration}\nLocation: ${tour.location}\nDifficulty: ${tour.difficulty}\n\nPlease provide more information.`;
    window.open(`https://wa.me/+919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) return <div className="p-8 text-center">Loading tour details...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error.message}</div>;
  if (!tour) return <div className="p-8 text-center">Tour not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <img 
            src={selectedImage} 
            alt={tour.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tour.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`flex-shrink-0 ${selectedImage === image ? 'ring-2 ring-blue-500' : ''}`}
              >
                <img 
                  src={image} 
                  alt={`${tour.title} ${index + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{tour.title}</h1>
          <p className="text-gray-600 mb-6">{tour.description}</p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              {tour.location}
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              {tour.duration}
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-2" />
              Maximum {tour.maxGroupSize} people
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">What's Included</h3>
              <ul className="space-y-2">
                {tour.included.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Not Included</h3>
              <ul className="space-y-2">
                {tour.notIncluded.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <X className="w-5 h-5 mr-2 text-red-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">₹{tour.price}</span>
              <span className="text-gray-600">per person</span>
            </div>
            <button 
              onClick={handleBooking}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Book Now via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}