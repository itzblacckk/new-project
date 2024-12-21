import React, { useState } from 'react';
import { useCollection } from '../../hooks/useFirebase';
import { uploadImage } from '../../lib/storage';
import { JobApplication, JobRole } from '../../types/hiring';
import { toast } from 'react-hot-toast';

const JOB_ROLES: JobRole[] = [
  'Trek Guide',
  'Tour Organizer',
  'Web Developer',
  'Content Writer',
  'Marketing Manager'
];

export function JobApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Trek Guide' as JobRole,
    experience: '',
    coverLetter: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { addItem } = useCollection<JobApplication>('job-applications');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let resumeUrl = '';
      if (resumeFile) {
        resumeUrl = await uploadImage(resumeFile, 'resumes');
      }

      const applicationData: Omit<JobApplication, 'id'> = {
        ...formData,
        experience: Number(formData.experience),
        resume: resumeUrl,
        status: 'pending',
        appliedAt: new Date().toISOString(),
      };

      await addItem(applicationData);
      
      // Create WhatsApp message
      const message = `New Job Application\n\nName: ${formData.name}\nRole: ${formData.role}\nExperience: ${formData.experience} years\nEmail: ${formData.email}\nPhone: ${formData.phone}`;
      const whatsappUrl = `https://wa.me/918291616335?text=${encodeURIComponent(message)}`;
      
      toast.success('Application submitted successfully!');
      window.open(whatsappUrl, '_blank');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'Trek Guide',
        experience: '',
        coverLetter: '',
      });
      setResumeFile(null);
    } catch (error) {
      toast.error('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value as JobRole })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        >
          {JOB_ROLES.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
        <input
          type="number"
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Resume</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => e.target.files && setResumeFile(e.target.files[0])}
          className="mt-1 block w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
        <textarea
          value={formData.coverLetter}
          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}