import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, Trash2, ShieldCheck } from 'lucide-react';
import { PHOTOS } from '../constantes';

const STORAGE_KEY = 'julieta_portfolio_photos';

const PhotographyApp = ({ isAdmin = false }) => {
  const [allPhotos, setAllPhotos] = useState(() => {
    const savedPhotos = localStorage.getItem(STORAGE_KEY);
    if (savedPhotos) {
      try {
        const parsed = JSON.parse(savedPhotos);
        return { ...PHOTOS, ...parsed };
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        return PHOTOS;
      }
    }
    return PHOTOS;
  });

  const [viewMode, setViewMode] = useState('folders');
  const [activeCategory, setActiveCategory] = useState('editorial');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newPhotosTitle, setNewPhotosTitle] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState('editorial');
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);

  const categories = [
    { id: 'editorial', label: 'Editorial', description: 'Moda y Retrato' },
    { id: 'eventos', label: 'Eventos', description: 'Sociales y Coberturas' },
    { id: 'producto', label: 'Producto', description: 'E-commerce y Gastronomía' },
    { id: 'publicidad', label: 'Publicidad', description: 'Campañas y Marcas' },
    { id: 'personal', label: 'Personal', description: 'Proyectos de Autor' }
  ];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allPhotos));
  }, [allPhotos]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), url: reader.result }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddPhotos = () => {
    if (previews.length === 0 || !newPhotosTitle.trim()) return;
    
    const newPhotos = previews.map((p, index) => ({
      url: p.url,
      title: previews.length > 1 ? `${newPhotosTitle} (${index + 1})` : newPhotosTitle
    }));

    setAllPhotos(prev => ({
      ...prev,
      [newPhotoCategory]: [...newPhotos, ...(prev[newPhotoCategory] || [])]
    }));

    setNewPhotosTitle('');
    setPreviews([]);
    setShowUploadForm(false);
    setActiveCategory(newPhotoCategory); // Ahora usamos la categoría que se seleccionó
    setViewMode('gallery');
  };

  const deletePhoto = (category, index) => {
    setAllPhotos(prev => {
      const updatedCategoryPhotos = [...prev[category]];
      updatedCategoryPhotos.splice(index, 1);
      return { ...prev, [category]: updatedCategoryPhotos };
    });
  };

  return (
    <div className="flex flex-col h-full bg-black text-white relative">
      <div className="shrink-0 px-8 py-6 sticky top-0 bg-black/80 backdrop-blur-xl z-30 flex items-center justify-between border-b border-white/5">
        {viewMode === 'gallery' ? (
          <button onClick={() => setViewMode('folders')} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ChevronLeft size={24} />
            <span className="font-bold text-sm uppercase tracking-widest">Álbumes</span>
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold tracking-tight uppercase">Portafolio</h2>
            {isAdmin && <ShieldCheck size={12} className="text-emerald-500" />}
          </div>
        )}
        
        {isAdmin && (
          <button onClick={() => setShowUploadForm(true)} className="bg-white text-black px-4 py-2 rounded-xl text-[10px] font-bold uppercase">
            Gestionar
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6">
        {viewMode === 'folders' ? (
          <div className="grid grid-cols-2 gap-6 pb-10">
            {categories.map((cat) => (
              <div key={cat.id} onClick={() => { setActiveCategory(cat.id); setViewMode('gallery'); }} className="group cursor-pointer space-y-3">
                <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                  {allPhotos[cat.id]?.[0] ? (
                    <img src={allPhotos[cat.id][0].url} alt={cat.label} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10 italic">Vacío</div>
                  )}
                </div>
                <div className="px-1">
                  <h3 className="font-bold text-base">{cat.label}</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{cat.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6 pb-24">
            <h1 className="text-3xl font-extrabold uppercase mb-4">{categories.find(c => c.id === activeCategory)?.label}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allPhotos[activeCategory]?.map((photo, idx) => (
                <div key={idx} className="group relative rounded-3xl overflow-hidden bg-gray-900 aspect-[3/4]">
                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black flex flex-col justify-end p-6">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-white text-lg">{photo.title}</p>
                      {isAdmin && (
                        <button onClick={() => deletePhoto(activeCategory, idx)} className="p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showUploadForm && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-3xl p-8 flex flex-col items-center">
          <div className="w-full max-w-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-extrabold text-emerald-400">Subir Contenido</h2>
              <button onClick={() => { setShowUploadForm(false); setPreviews([]); }} className="text-white"><X size={28} /></button>
            </div>

            <div className="space-y-6">
              <div className="min-h-[200px] rounded-[2rem] border-2 border-dashed border-white/10 bg-white/5 flex flex-wrap gap-4 p-8">
                {previews.map((p) => (
                  <img key={p.id} src={p.url} className="w-20 h-20 rounded-lg object-cover" />
                ))}
                <button onClick={() => fileInputRef.current?.click()} className="w-20 h-20 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center text-white/40">+</button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" multiple />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  value={newPhotosTitle} 
                  onChange={(event) => setNewPhotosTitle(event.target.value)} 
                  placeholder="Título del proyecto" 
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 font-bold text-white" 
                />
                <select 
                  value={newPhotoCategory} 
                  onChange={(event) => setNewPhotoCategory(event.target.value)} // Aquí es donde se usa setNewPhotoCategory
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 font-bold text-white appearance-none"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id} className="bg-zinc-900">{cat.label}</option>
                  ))}
                </select>
              </div>

              <button onClick={handleAddPhotos} className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-extrabold">CONFIRMAR Y GUARDAR</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographyApp;