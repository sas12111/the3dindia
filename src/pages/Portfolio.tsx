import { useState, useEffect, useRef } from 'react';
import { apiUrl } from '../utils/api';
import { Filter, X, Tag, Clock, User, Layers, Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  client: string;
  duration: string;
  materials: string[];
  tags: string[];
  fullDescription: string;
  active: boolean;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.close();
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  if (!project) return null;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      style={{
        padding: 0,
        border: 'none',
        borderRadius: '1rem',
        maxWidth: '42rem',
        width: 'calc(100% - 2rem)',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
      }}
    >
      <div style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Image header */}
        <div style={{ position: 'relative', height: '16rem', overflow: 'hidden' }}>
          <img
            src={project.image || '/images/3d-printer.jpg'}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
          <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem' }}>
            <span style={{ background: '#f98f00', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem' }}>
              {project.category}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute', top: '1rem', right: '1rem',
              width: '2.25rem', height: '2.25rem', borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            <X size={18} color="#374151" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
            {project.title}
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>{project.description}</p>

          {/* Meta */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f9fafb', borderRadius: '0.75rem', padding: '0.75rem' }}>
              <User size={20} color="#f98f00" />
              <div>
                <p style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1f2937' }}>{project.client || '—'}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f9fafb', borderRadius: '0.75rem', padding: '0.75rem' }}>
              <Clock size={20} color="#f98f00" />
              <div>
                <p style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Duration</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1f2937' }}>{project.duration || '—'}</p>
              </div>
            </div>
          </div>

          {/* Overview */}
          {project.fullDescription && (
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Project Overview
              </p>
              <p style={{ color: '#4b5563', lineHeight: 1.7 }}>{project.fullDescription}</p>
            </div>
          )}

          {/* Materials */}
          {project.materials?.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Layers size={16} color="#f98f00" />
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Materials Used
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.materials.map((mat) => (
                  <span key={mat} className="inline-block px-3 py-1 bg-[#fff8f0] text-[#e07e00] rounded-full text-sm border border-[#fff3e0]">
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags?.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Tag size={16} color="#f97316" />
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Tags
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={{ padding: '0.25rem 0.75rem', background: '#fff7ed', color: '#ea580c', borderRadius: '9999px', fontSize: '0.875rem', border: '1px solid #fed7aa' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}

export function Portfolio() {
  const [projects, setProjects]           = useState<Project[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject]   = useState<Project | null>(null);

  useEffect(() => {
    fetch(apiUrl('/api/portfolio'))
      .then(r => r.json())
      .then(data => {
        if (data.success) setProjects(data.projects);
        else setError('Failed to load projects.');
      })
      .catch(() => setError('Could not connect to server.'))
      .finally(() => setLoading(false));
  }, []);

  // Build category list dynamically from fetched data
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category))).sort()];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f78e00] to-orange-500 py-20">
        <div className="container01 mx-auto px-4 text-center">
          <h1 className="text-5xl text-white mb-6">Our Portfolio</h1>
          <p className="text-xl text-[#fff3e0] max-w-3xl mx-auto">
            Explore our diverse portfolio of successful projects across various industries and applications.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="container01 mx-auto px-4">
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <div className="flex items-center gap-2 text-gray-700">
              <Filter className="w-5 h-5" />
              <span>Filter by:</span>
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#f78e00] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container01 mx-auto px-4">

          {loading && (
            <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Loading projects…</span>
            </div>
          )}

          {error && (
            <div className="text-center py-24 text-red-500">{error}</div>
          )}

          {!loading && !error && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer text-left w-full"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image || '/images/3d-printer.jpg'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 bg-[#fff3e0] text-[#e07e00] rounded-full text-sm mb-3">
                      {project.category}
                    </div>
                    <h3 className="text-xl text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <span className="text-[#f78e00] text-sm font-medium group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!loading && !error && filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container01 mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl text-[#f78e00] mb-2">500+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl text-[#f78e00] mb-2">200+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl text-[#f78e00] mb-2">50+</div>
              <div className="text-gray-600">Industries Served</div>
            </div>
            <div>
              <div className="text-4xl text-[#f78e00] mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
