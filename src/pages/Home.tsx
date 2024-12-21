import React from 'react';
import { ArrowRight, Mountain, Users, Building2, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="h-screen bg-cover bg-center flex items-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Your Next Adventure</h1>
          <p className="text-xl md:text-2xl mb-8">Experience the thrill of mountain trekking with expert guides</p>
          <a href="/tours" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg inline-flex items-center">
            Explore Tours <ArrowRight className="ml-2" />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">About Mountain Mirage</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Mountain trekking"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <p className="text-lg text-gray-600 mb-6">
                At Mountain Mirage Backpackers, we believe in creating unforgettable adventures that challenge, inspire, and transform. With over a decade of experience in mountain trekking and adventure tourism, we provide safe, sustainable, and immersive experiences for adventure enthusiasts of all levels.
              </p>
              <p className="text-lg text-gray-600">
                Our team of certified guides and local experts ensures that every journey is not just about reaching the summit, but about creating lasting memories and connections along the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard 
              icon={<Mountain />}
              title="Mountain Treks"
              description="Expert-guided mountain treks for all skill levels"
            />
            <ServiceCard 
              icon={<Users />}
              title="Family Tours"
              description="Custom family adventures and religious pilgrimages"
            />
            <ServiceCard 
              icon={<Building2 />}
              title="Corporate Events"
              description="Team building and corporate retreat packages"
            />
            <ServiceCard 
              icon={<Heart />}
              title="CSR Activities"
              description="Social responsibility programs for organizations"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Expert Guides</h3>
              <p>Certified professionals with years of mountain experience</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Safety First</h3>
              <p>Comprehensive safety measures and emergency protocols</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Custom Experiences</h3>
              <p>Tailored adventures to match your preferences</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}