import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../../components/builder";
import { useDataBinding, BlogModel, DataTransformers } from "../../../lib/data-binding";
import { notFound } from "next/navigation";

// Initialize Builder
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  // Try to get the blog post data from Builder.io data model
  let blog: BlogModel | null = null;
  
  try {
    const dataService = new (await import("../../../lib/data-binding")).DataBindingService(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);
    blog = await dataService.getContentBySlug<BlogModel>('blog', slug);
  } catch (error) {
    console.error('Error fetching blog post:', error);
  }

  // Try to get Builder.io page content for this route
  const builderContent = await builder
    .get("page", {
      userAttributes: {
        urlPath: `/blog/${slug}`,
      },
    })
    .toPromise();

  // If no Builder.io page and no blog data, show 404
  if (!builderContent && !blog) {
    notFound();
  }

  // If we have blog data but no Builder page, create a default layout
  if (blog && !builderContent) {
    return (
      <div className="blog-detail-page">
        <article className="blog-article">
          <header className="article-header">
            <div className="header-content">
              {blog.isFeatured && (
                <div className="featured-badge">Featured</div>
              )}
              <div className="category-badge">{blog.category}</div>
              <h1 className="article-title">{blog.title}</h1>
              <div className="article-meta">
                <div className="author-info">
                  <img src={blog.authorImage} alt={blog.author} className="author-avatar" />
                  <div className="author-details">
                    <span className="author-name">{blog.author}</span>
                    <div className="meta-row">
                      <span className="publish-date">{blog.publishDate}</span>
                      <span className="separator">•</span>
                      <span className="read-time">{blog.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {blog.tags && blog.tags.length > 0 && (
                <div className="article-tags">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div className="article-image">
            <img src={blog.imageUrl} alt={blog.title} />
          </div>

          <div className="article-content">
            <div className="content-container">
              <div className="excerpt">
                {blog.excerpt}
              </div>
              
              <div className="content" dangerouslySetInnerHTML={{ __html: blog.content }} />
              
              <div className="article-footer">
                <div className="share-section">
                  <h3>Share this article</h3>
                  <div className="share-buttons">
                    <button className="share-btn twitter">Twitter</button>
                    <button className="share-btn facebook">Facebook</button>
                    <button className="share-btn linkedin">LinkedIn</button>
                    <button className="share-btn copy">Copy Link</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <style jsx>{`
          .blog-detail-page {
            min-height: 100vh;
            background: #ffffff;
          }
          
          .blog-article {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 20px;
          }
          
          .article-header {
            padding: 80px 0 40px;
            text-align: center;
          }
          
          .featured-badge {
            display: inline-block;
            background: #ef4444;
            color: white;
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 16px;
            text-transform: uppercase;
          }
          
          .category-badge {
            display: inline-block;
            background: #08AD98;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 24px;
          }
          
          .article-title {
            font-size: 48px;
            font-weight: 700;
            line-height: 1.2;
            color: #1f2937;
            margin-bottom: 32px;
          }
          
          .article-meta {
            margin-bottom: 32px;
          }
          
          .author-info {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
          }
          
          .author-avatar {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            object-fit: cover;
          }
          
          .author-details {
            text-align: left;
          }
          
          .author-name {
            display: block;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 4px;
          }
          
          .meta-row {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #6b7280;
            font-size: 14px;
          }
          
          .separator {
            color: #d1d5db;
          }
          
          .article-tags {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 8px;
          }
          
          .tag {
            background: #f3f4f6;
            color: #374151;
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 14px;
          }
          
          .article-image {
            margin-bottom: 60px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
          
          .article-image img {
            width: 100%;
            height: 400px;
            object-fit: cover;
          }
          
          .article-content {
            padding-bottom: 80px;
          }
          
          .excerpt {
            font-size: 20px;
            line-height: 1.6;
            color: #4b5563;
            font-style: italic;
            margin-bottom: 40px;
            padding: 20px 0;
            border-left: 4px solid #08AD98;
            padding-left: 24px;
            background: rgba(8, 173, 152, 0.05);
            border-radius: 0 8px 8px 0;
          }
          
          .content {
            font-size: 18px;
            line-height: 1.8;
            color: #374151;
          }
          
          .content h2 {
            font-size: 32px;
            font-weight: 700;
            color: #1f2937;
            margin: 40px 0 20px;
          }
          
          .content h3 {
            font-size: 24px;
            font-weight: 600;
            color: #1f2937;
            margin: 32px 0 16px;
          }
          
          .content p {
            margin-bottom: 20px;
          }
          
          .content ul, .content ol {
            margin: 20px 0;
            padding-left: 24px;
          }
          
          .content li {
            margin-bottom: 8px;
          }
          
          .content blockquote {
            border-left: 4px solid #08AD98;
            padding-left: 20px;
            margin: 32px 0;
            font-style: italic;
            color: #6b7280;
          }
          
          .content code {
            background: #f3f4f6;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 16px;
          }
          
          .article-footer {
            margin-top: 60px;
            padding-top: 40px;
            border-top: 1px solid #e5e7eb;
          }
          
          .share-section h3 {
            font-size: 20px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 16px;
          }
          
          .share-buttons {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }
          
          .share-btn {
            padding: 10px 20px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            background: white;
            color: #374151;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .share-btn:hover {
            border-color: #08AD98;
            color: #08AD98;
          }
          
          .share-btn.twitter:hover {
            background: #1da1f2;
            border-color: #1da1f2;
            color: white;
          }
          
          .share-btn.facebook:hover {
            background: #4267b2;
            border-color: #4267b2;
            color: white;
          }
          
          .share-btn.linkedin:hover {
            background: #0077b5;
            border-color: #0077b5;
            color: white;
          }
          
          @media (max-width: 768px) {
            .article-title {
              font-size: 32px;
            }
            
            .author-info {
              flex-direction: column;
              text-align: center;
            }
            
            .author-details {
              text-align: center;
            }
            
            .article-image img {
              height: 250px;
            }
            
            .content {
              font-size: 16px;
            }
            
            .share-buttons {
              justify-content: center;
            }
          }
        `}</style>
      </div>
    );
  }

  // If we have a Builder.io page, render it (it can include blog data via data binding)
  return (
    <>
      <RenderBuilderContent content={builderContent} model="page" />
    </>
  );
}

// Generate static params for all published blog posts
export async function generateStaticParams() {
  try {
    const dataService = new (await import("../../../lib/data-binding")).DataBindingService(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);
    const blogPosts = await dataService.fetchBlogPosts();
    
    return blogPosts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Metadata generation
export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  
  try {
    const dataService = new (await import("../../../lib/data-binding")).DataBindingService(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);
    const blog = await dataService.getContentBySlug<BlogModel>('blog', slug);
    
    if (blog) {
      return {
        title: blog.title,
        description: blog.excerpt,
        authors: [{ name: blog.author }],
        publishedTime: blog.publishDate,
        openGraph: {
          title: blog.title,
          description: blog.excerpt,
          images: [blog.imageUrl],
          type: 'article',
          publishedTime: blog.publishDate,
          authors: [blog.author],
        },
        twitter: {
          card: 'summary_large_image',
          title: blog.title,
          description: blog.excerpt,
          images: [blog.imageUrl],
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  
  return {
    title: 'Blog Post Not Found',
    description: 'The requested blog post could not be found.',
  };
}
