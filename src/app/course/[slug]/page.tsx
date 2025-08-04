import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../../components/builder";
import { useDataBinding, CourseModel, DataTransformers } from "../../../lib/data-binding";
import { notFound } from "next/navigation";

// Initialize Builder
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface CoursePageProps {
  params: {
    slug: string;
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;

  // Try to get the course data from Builder.io data model
  let course: CourseModel | null = null;
  
  try {
    const dataService = new (await import("../../../lib/data-binding")).DataBindingService(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);
    course = await dataService.getContentBySlug<CourseModel>('course', slug);
  } catch (error) {
    console.error('Error fetching course:', error);
  }

  // Try to get Builder.io page content for this route
  const builderContent = await builder
    .get("page", {
      userAttributes: {
        urlPath: `/course/${slug}`,
      },
    })
    .toPromise();

  // If no Builder.io page and no course data, show 404
  if (!builderContent && !course) {
    notFound();
  }

  // If we have course data but no Builder page, create a default layout
  if (course && !builderContent) {
    return (
      <div className="course-detail-page">
        <div className="course-hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="course-title">{course.title}</h1>
              <p className="course-description">{course.description}</p>
              <div className="course-meta">
                <span className="instructor">By {course.instructor}</span>
                <span className="duration">{course.duration}</span>
                <span className="level">{course.level}</span>
                <div className="rating">
                  ⭐ {course.rating} ({course.studentsCount} students)
                </div>
              </div>
              <div className="course-price">
                <span className="price">{course.price}</span>
                <button className="enroll-btn">Enroll Now</button>
              </div>
            </div>
            <div className="hero-image">
              <img src={course.imageUrl} alt={course.title} />
            </div>
          </div>
        </div>

        {course.curriculum && (
          <div className="course-curriculum">
            <div className="container">
              <h2>Course Curriculum</h2>
              <div className="modules">
                {course.curriculum.map((module, index) => (
                  <div key={index} className="module">
                    <h3>{module.module}</h3>
                    <ul className="lessons">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="lesson">
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .course-detail-page {
            min-height: 100vh;
          }
          
          .course-hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 80px 20px;
          }
          
          .hero-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
          }
          
          .course-title {
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 20px;
            line-height: 1.2;
          }
          
          .course-description {
            font-size: 18px;
            line-height: 1.6;
            margin-bottom: 30px;
            opacity: 0.9;
          }
          
          .course-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 40px;
            font-size: 16px;
          }
          
          .course-meta span {
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 16px;
            border-radius: 20px;
          }
          
          .course-price {
            display: flex;
            align-items: center;
            gap: 20px;
          }
          
          .price {
            font-size: 36px;
            font-weight: 700;
          }
          
          .enroll-btn {
            background: #08AD98;
            color: white;
            border: none;
            padding: 16px 32px;
            font-size: 18px;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .enroll-btn:hover {
            background: #069688;
            transform: translateY(-2px);
          }
          
          .hero-image img {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          }
          
          .course-curriculum {
            padding: 80px 20px;
            background: #f8fafc;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .course-curriculum h2 {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 40px;
            text-align: center;
            color: #1f2937;
          }
          
          .modules {
            display: grid;
            gap: 30px;
          }
          
          .module {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .module h3 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #08AD98;
          }
          
          .lessons {
            list-style: none;
            padding: 0;
          }
          
          .lesson {
            padding: 12px 0;
            border-bottom: 1px solid #e5e7eb;
            color: #4b5563;
          }
          
          .lesson:last-child {
            border-bottom: none;
          }
          
          @media (max-width: 768px) {
            .hero-content {
              grid-template-columns: 1fr;
              gap: 40px;
            }
            
            .course-title {
              font-size: 32px;
            }
            
            .course-meta {
              justify-content: center;
              text-align: center;
            }
            
            .course-price {
              flex-direction: column;
              align-items: center;
            }
          }
        `}</style>
      </div>
    );
  }

  // If we have a Builder.io page, render it (it can include course data via data binding)
  return (
    <>
      <RenderBuilderContent content={builderContent} model="page" />
    </>
  );
}

// Generate static params for all published courses (optional, for static generation)
export async function generateStaticParams() {
  try {
    const dataService = new (await import("../../../lib/data-binding")).DataBindingService(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);
    const courses = await dataService.fetchCourses();
    
    return courses.map((course) => ({
      slug: course.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Metadata generation
export async function generateMetadata({ params }: CoursePageProps) {
  const { slug } = await params;
  
  try {
    const dataService = new (await import("../../../lib/data-binding")).DataBindingService(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);
    const course = await dataService.getContentBySlug<CourseModel>('course', slug);
    
    if (course) {
      return {
        title: `${course.title} - Online Course`,
        description: course.description,
        openGraph: {
          title: course.title,
          description: course.description,
          images: [course.imageUrl],
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  
  return {
    title: 'Course Not Found',
    description: 'The requested course could not be found.',
  };
}
