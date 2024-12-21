import React from 'react';
import { BlogCard } from '../components/blog/BlogCard';
import { useCollection } from '../hooks/useFirebase';
import { BlogPost } from '../types';

export default function Blog() {
  const { data: posts, loading, error } = useCollection<BlogPost>('blog-posts');

  if (loading) return <div className="p-8 text-center">Loading posts...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error loading posts: {error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}