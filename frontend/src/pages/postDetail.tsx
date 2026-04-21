import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post } from '../types';

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="text-center py-20">Loading post...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link to="/" className="text-emerald-400 hover:underline mb-8 inline-block">← Back to all posts</Link>
      
      <div className="mb-10">
        <div className="text-emerald-400 text-sm mb-3">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <h1 className="text-5xl font-bold leading-tight mb-6">{post.title}</h1>
      </div>

      <div className="prose prose-invert prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br><br>') }} />
      </div>
    </div>
  );
}