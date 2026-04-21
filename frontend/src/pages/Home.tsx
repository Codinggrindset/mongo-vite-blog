import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Latest Posts</h1>
        <p className="text-gray-400">Thoughts, tutorials, and ideas.</p>
      </div>

      <div className="space-y-8">
        {posts.map(post => (
          <Link
            key={post.slug}
            to={`/post/${post.slug}`}
            className="block group bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all hover:-translate-y-0.5"
          >
            <div className="text-sm text-emerald-400 mb-3">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <h2 className="text-3xl font-semibold mb-3 group-hover:text-emerald-400 transition-colors">{post.title}</h2>
            <p className="text-gray-400 text-lg leading-relaxed">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}