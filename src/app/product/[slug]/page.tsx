import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../../components/builder";
import { useDataBinding, ProductModel, DataTransformers } from "../../../lib/data-binding";
import { notFound } from "next/navigation";

// Initialize Builder
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Try to get the product data from Builder.io data model
  let product: ProductModel | null = null;
  
  try {
    const dataService = new (await import("../../../lib/data-binding")).DataBindingService(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);
    product = await dataService.getContentBySlug<ProductModel>('product', slug);
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  // Try to get Builder.io page content for this route
  const builderContent = await builder
    .get("page", {
      userAttributes: {
        urlPath: `/product/${slug}`,
      },
    })
    .toPromise();

  // If no Builder.io page and no product data, show 404
  if (!builderContent && !product) {
    notFound();
  }

  // If we have product data but no Builder page, create a default layout
  if (product && !builderContent) {
    return (
      <div className="product-detail-page">
        <div className="product-hero">
          <div className="hero-content">
            <div className="product-image">
              <img src={product.imageUrl} alt={product.title} />
              {product.isOnSale && <div className="sale-badge">On Sale!</div>}
            </div>
            <div className="product-info">
              <div className="category-badge">{product.category}</div>
              <h1 className="product-title">{product.title}</h1>
              <div className="rating">
                ⭐ {product.rating} ({product.reviewsCount} reviews)
              </div>
              <p className="product-description">{product.description}</p>
              
              <div className="pricing">
                <span className="current-price">{product.price}</span>
                {product.originalPrice && (
                  <span className="original-price">{product.originalPrice}</span>
                )}
              </div>

              {product.tags && product.tags.length > 0 && (
                <div className="product-tags">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              )}

              <div className="stock-status">
                {product.inStock ? (
                  <span className="in-stock">✅ In Stock</span>
                ) : (
                  <span className="out-of-stock">❌ Out of Stock</span>
                )}
              </div>

              <div className="action-buttons">
                <button 
                  className="add-to-cart-btn"
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button className="wishlist-btn">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {product.features && product.features.length > 0 && (
          <div className="product-features">
            <div className="container">
              <h2>What's Included</h2>
              <div className="features-grid">
                {product.features.map((feature, index) => (
                  <div key={index} className="feature">
                    <span className="feature-icon">✓</span>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .product-detail-page {
            min-height: 100vh;
          }
          
          .product-hero {
            padding: 80px 20px;
            background: #ffffff;
          }
          
          .hero-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: start;
          }
          
          .product-image {
            position: relative;
          }
          
          .product-image img {
            width: 100%;
            height: 500px;
            object-fit: cover;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
          
          .sale-badge {
            position: absolute;
            top: 20px;
            left: 20px;
            background: #ef4444;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 14px;
          }
          
          .product-info {
            padding: 20px 0;
          }
          
          .category-badge {
            display: inline-block;
            background: #f3f4f6;
            color: #6b7280;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 14px;
            margin-bottom: 16px;
          }
          
          .product-title {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 16px;
            color: #1f2937;
            line-height: 1.3;
          }
          
          .rating {
            font-size: 16px;
            color: #6b7280;
            margin-bottom: 20px;
          }
          
          .product-description {
            font-size: 18px;
            line-height: 1.6;
            color: #4b5563;
            margin-bottom: 30px;
          }
          
          .pricing {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 24px;
          }
          
          .current-price {
            font-size: 32px;
            font-weight: 700;
            color: #08AD98;
          }
          
          .original-price {
            font-size: 20px;
            color: #9ca3af;
            text-decoration: line-through;
          }
          
          .product-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 24px;
          }
          
          .tag {
            background: #f3f4f6;
            color: #374151;
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 14px;
          }
          
          .stock-status {
            margin-bottom: 30px;
          }
          
          .in-stock {
            color: #059669;
            font-weight: 500;
          }
          
          .out-of-stock {
            color: #dc2626;
            font-weight: 500;
          }
          
          .action-buttons {
            display: flex;
            gap: 16px;
          }
          
          .add-to-cart-btn {
            background: #08AD98;
            color: white;
            border: none;
            padding: 16px 32px;
            font-size: 18px;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            flex: 1;
          }
          
          .add-to-cart-btn:hover:not(:disabled) {
            background: #069688;
            transform: translateY(-2px);
          }
          
          .add-to-cart-btn:disabled {
            background: #d1d5db;
            color: #6b7280;
            cursor: not-allowed;
            transform: none;
          }
          
          .wishlist-btn {
            background: transparent;
            color: #6b7280;
            border: 2px solid #d1d5db;
            padding: 16px 24px;
            font-size: 16px;
            font-weight: 500;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .wishlist-btn:hover {
            border-color: #08AD98;
            color: #08AD98;
          }
          
          .product-features {
            padding: 80px 20px;
            background: #f8fafc;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .product-features h2 {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 40px;
            text-align: center;
            color: #1f2937;
          }
          
          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
          }
          
          .feature {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .feature-icon {
            color: #08AD98;
            font-weight: bold;
            font-size: 18px;
          }
          
          .feature-text {
            color: #374151;
            font-size: 16px;
          }
          
          @media (max-width: 768px) {
            .hero-content {
              grid-template-columns: 1fr;
              gap: 40px;
            }
            
            .product-title {
              font-size: 28px;
            }
            
            .action-buttons {
              flex-direction: column;
            }
            
            .features-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    );
  }

  // If we have a Builder.io page, render it (it can include product data via data binding)
  return (
    <>
      <RenderBuilderContent content={builderContent} model="page" />
    </>
  );
}

// Generate static params for all published products
export async function generateStaticParams() {
  try {
    const dataService = new (await import("../../../lib/data-binding")).DataBindingService(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);
    const products = await dataService.fetchProducts();
    
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Metadata generation
export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  
  try {
    const dataService = new (await import("../../../lib/data-binding")).DataBindingService(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);
    const product = await dataService.getContentBySlug<ProductModel>('product', slug);
    
    if (product) {
      return {
        title: `${product.title} - ${product.price}`,
        description: product.description,
        openGraph: {
          title: product.title,
          description: product.description,
          images: [product.imageUrl],
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  
  return {
    title: 'Product Not Found',
    description: 'The requested product could not be found.',
  };
}
