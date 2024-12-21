import React from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BlogPost as BlogPostType } from '../types';
import { User, Clock } from 'lucide-react';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = React.useState<BlogPostType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'blog-posts', id!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as BlogPostType);
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load post'));
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading post...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error.message}</div>;
  if (!post) return <div className="p-8 text-center">Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <img 
        src={post.imageUrl} 
        alt={post.title}
        className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
      />
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      
      <div className="flex items-center space-x-6 text-gray-500 mb-8">
        <div className="flex items-center">
          <User className="w-5 h-5 mr-2" />
          {post.author}
        </div>
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="prose max-w-none">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span 
              key={tag}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}