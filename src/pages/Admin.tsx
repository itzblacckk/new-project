import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/admin/LoginForm';
import { AddTourForm } from '../components/admin/AddTourForm';
import { AddBlogForm } from '../components/admin/AddBlogForm';
import { AddEventForm } from '../components/admin/AddEventForm';
import { ItemList } from '../components/admin/ItemList';
import { ConfirmDialog } from '../components/admin/ConfirmDialog';
import { useCollection } from '../hooks/useFirebase';
import { Tour, BlogPost, Event } from '../types';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { PlusCircle, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Admin() {
  const { user, signOut } = useAuth();
  const [activeForm, setActiveForm] = useState<'tour' | 'blog' | 'event' | null>(null);
  const [editItem, setEditItem] = useState<Tour | BlogPost | Event | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<'tour' | 'blog' | 'event' | null>(null);

  const { 
    data: tours, 
    loading: toursLoading, 
    deleteItem: deleteTour,
    updateItem: updateTour 
  } = useCollection<Tour>('tours');
  
  const { 
    data: posts, 
    loading: postsLoading,
    deleteItem: deletePost,
    updateItem: updatePost
  } = useCollection<BlogPost>('blog-posts');
  
  const { 
    data: events, 
    loading: eventsLoading,
    deleteItem: deleteEvent,
    updateItem: updateEvent
  } = useCollection<Event>('events');

  const handleDelete = async () => {
    if (!deleteId || !deleteType) return;

    try {
      switch (deleteType) {
        case 'tour':
          await deleteTour(deleteId);
          break;
        case 'blog':
          await deletePost(deleteId);
          break;
        case 'event':
          await deleteEvent(deleteId);
          break;
      }
      toast.success('Item deleted successfully');
    } catch (error) {
      toast.error('Failed to delete item');
    }
    setDeleteId(null);
    setDeleteType(null);
  };

  const handleEdit = (item: Tour | BlogPost | Event, type: 'tour' | 'blog' | 'event') => {
    setEditItem(item);
    setActiveForm(type);
  };

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => signOut()}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Tours Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Tours</h2>
              <button 
                onClick={() => {
                  setEditItem(null);
                  setActiveForm('tour');
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {toursLoading ? (
              <p>Loading...</p>
            ) : (
              <ItemList
                items={tours}
                onEdit={(item) => handleEdit(item, 'tour')}
                onDelete={(id) => {
                  setDeleteId(id);
                  setDeleteType('tour');
                }}
                getTitle={(item) => item.title}
              />
            )}
          </CardContent>
        </Card>

        {/* Blog Posts Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Blog Posts</h2>
              <button 
                onClick={() => {
                  setEditItem(null);
                  setActiveForm('blog');
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {postsLoading ? (
              <p>Loading...</p>
            ) : (
              <ItemList
                items={posts}
                onEdit={(item) => handleEdit(item, 'blog')}
                onDelete={(id) => {
                  setDeleteId(id);
                  setDeleteType('blog');
                }}
                getTitle={(item) => item.title}
              />
            )}
          </CardContent>
        </Card>

        {/* Events Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Events</h2>
              <button 
                onClick={() => {
                  setEditItem(null);
                  setActiveForm('event');
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {eventsLoading ? (
              <p>Loading...</p>
            ) : (
              <ItemList
                items={events}
                onEdit={(item) => handleEdit(item, 'event')}
                onDelete={(id) => {
                  setDeleteId(id);
                  setDeleteType('event');
                }}
                getTitle={(item) => item.title}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {activeForm && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {editItem ? 'Edit' : 'Add New'} {activeForm.charAt(0).toUpperCase() + activeForm.slice(1)}
            </h2>
            <button
              onClick={() => {
                setActiveForm(null);
                setEditItem(null);
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
          
          {activeForm === 'tour' && (
            <AddTourForm 
              initialData={editItem as Tour} 
              onSuccess={() => {
                setActiveForm(null);
                setEditItem(null);
              }}
            />
          )}
          {activeForm === 'blog' && (
            <AddBlogForm 
              initialData={editItem as BlogPost}
              onSuccess={() => {
                setActiveForm(null);
                setEditItem(null);
              }}
            />
          )}
          {activeForm === 'event' && (
            <AddEventForm 
              initialData={editItem as Event}
              onSuccess={() => {
                setActiveForm(null);
                setEditItem(null);
              }}
            />
          )}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => {
          setDeleteId(null);
          setDeleteType(null);
        }}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </div>
  );
}