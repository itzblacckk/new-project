import React from 'react';
import { JobApplicationForm } from '../components/hiring/JobApplicationForm';

export default function Careers() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-xl text-gray-600">
          Be part of an adventure-driven company that's passionate about creating unforgettable experiences
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Why Work With Us?</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Adventure-First Culture</h3>
              <p className="text-gray-600">Work in an environment where adventure and exploration are part of the job</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Growth Opportunities</h3>
              <p className="text-gray-600">Continuous learning and career advancement opportunities</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Work-Life Balance</h3>
              <p className="text-gray-600">Flexible schedules and competitive time-off policies</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Competitive Benefits</h3>
              <p className="text-gray-600">Comprehensive benefits package including health insurance and travel perks</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Apply Now</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <JobApplicationForm />
          </div>
        </div>
      </div>
    </div>
  );
}