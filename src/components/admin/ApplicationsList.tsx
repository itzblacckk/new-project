import React from 'react';
import { JobApplication } from '../../types/hiring';
import { FileText, Mail, Phone } from 'lucide-react';

interface ApplicationsListProps {
  applications: JobApplication[];
  onStatusChange: (id: string, status: JobApplication['status']) => void;
}

export function ApplicationsList({ applications, onStatusChange }: ApplicationsListProps) {
  const getStatusColor = (status: JobApplication['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <div key={application.id} className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold">{application.name}</h3>
              <p className="text-blue-600 font-medium">{application.role}</p>
            </div>
            <select
              value={application.status}
              onChange={(e) => onStatusChange(application.id, e.target.value as JobApplication['status'])}
              className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(application.status)}`}
            >
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="contacted">Contacted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              {application.email}
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              {application.phone}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={application.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Resume
            </a>
            <a
              href={`https://wa.me/${application.phone}?text=Hi ${application.name}, regarding your application for ${application.role} position at Mountain Mirage...`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800"
            >
              Contact via WhatsApp
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}