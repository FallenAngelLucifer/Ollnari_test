import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Menu, X, MapPin, ArrowRight, CheckCircle2, Facebook, Instagram, Twitter, Clock, BookOpen, Users, Award, ShieldCheck, TrendingUp, Leaf, PlayCircle, Video, Calendar, Star, Play, Quote, Medal, Heart, Palette, ChevronLeft, ChevronRight, Sparkles, Globe, Map, Navigation, Coffee, Landmark, TreePine, Utensils, Hammer, Filter } from 'lucide-react';
import { MapaNicaragua as MapaSvg, Marker } from './components/MapaSvg';

// --- DATOS DUROS ---
const categoriasMapa = [
  { id: 'todas', nombre: 'Todas las Zonas', color: 'bg-coffee', icon: Map },
  { id: 'taller', nombre: 'Talleres Artesanales', color: 'bg-terracotta', icon: Palette },
  { id: 'historia', nombre: 'Patrimonio Histórico', color: 'bg-amber-700', icon: Landmark },
  { id: 'naturaleza', nombre: 'Parques y Naturaleza', color: 'bg-moss', icon: TreePine },
  { id: 'gastronomia', nombre: 'Gastronomía Local', color: 'bg-orange-600', icon: Coffee }
];

const puntosMapa = [
  { 
    id: 1, 
    nombre: "Estelí", 
    categoria: "taller",
    tipo: "Muralismo y Tabaco", 
    coordinates: [-86.35, 13.09],
    desc: "Conocida por el arte del muralismo y la producción artesanal en cuero y tabaco.", 
    historia: "Fundada en 1685, Estelí fue un bastión crucial durante la Revolución. Hoy es la capital del tabaco y el muralismo comunitario.",
    cultura: "Destaca por sus talabarterías donde se trabaja el cuero a mano y sus fábricas de puros de calidad mundial.",
    imagen: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 2, 
    nombre: "León", 
    categoria: "historia",
    tipo: "Patrimonio Histórico", 
    coordinates: [-86.88, 12.43],
    desc: "Ciudad universitaria llena de historia, poesía y arquitectura colonial.", 
    historia: "Primera capital de Nicaragua, fundada en 1524. Alberga la Catedral más grande de Centroamérica, Patrimonio de la Humanidad.",
    cultura: "Cuna de Rubén Darío, padre del Modernismo. Famosa por sus alfombras de aserrín en Semana Santa y la gritería.",
    imagen: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 3, 
    nombre: "Masaya", 
    categoria: "taller",
    tipo: "Ciudad Creativa", 
    coordinates: [-86.09, 11.97],
    desc: "Cuna del folklore nicaragüense. Famosa por sus hamacas, cerámica y mercado de artesanías.", 
    historia: "Conocida como la 'Ciudad de las Flores', Masaya ha mantenido vivas las tradiciones indígenas de la tribu de los Dirianes.",
    cultura: "Epicentro de la artesanía nacional: hamacas de doble puntada, tallado en madera y el famoso baile de Los Agüizotes.",
    imagen: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 4, 
    nombre: "San Juan de Oriente", 
    categoria: "taller",
    tipo: "Taller de Cerámica", 
    coordinates: [-86.07, 11.90],
    desc: "Pueblo de alfareros donde el barro cobra vida con técnicas precolombinas.", 
    historia: "Un asentamiento precolombino que ha transmitido el arte de la alfarería de generación en generación durante siglos.",
    cultura: "El 90% de sus habitantes se dedica a la cerámica, utilizando tornos de pie y hornos de leña tradicionales.",
    imagen: "https://images.unsplash.com/photo-1610715936287-6c2420ebbfb1?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 5, 
    nombre: "Camoapa", 
    categoria: "taller",
    tipo: "Artesanía en Pita", 
    coordinates: [-85.51, 12.38],
    desc: "Reconocida por la fina elaboración de sombreros de pita y trabajos en cuero trenzado.", 
    historia: "Tierra de ganaderos y artesanos, Camoapa desarrolló la técnica del tejido de pita en cuevas para mantener la humedad de la fibra.",
    cultura: "Los sombreros de pita de Camoapa son considerados los más finos del país, tardando hasta un mes en tejerse uno solo.",
    imagen: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 6, 
    nombre: "Solentiname", 
    categoria: "naturaleza",
    tipo: "Arte y Naturaleza", 
    coordinates: [-85.03, 11.18],
    desc: "Archipiélago cuna del arte primitivista y la colorida artesanía en madera de balsa.", 
    historia: "En los años 60, Ernesto Cardenal fundó aquí una comunidad contemplativa que dio origen al movimiento de arte primitivista nicaragüense.",
    cultura: "Pinturas vibrantes de flora y fauna local, y tallados en madera de balsa que representan garzas, tucanes y peces.",
    imagen: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 7, 
    nombre: "Rivas", 
    categoria: "gastronomia",
    tipo: "Cerámica y Turismo", 
    coordinates: [-85.82, 11.43],
    desc: "Tierra de historia, playas y la tradicional cerámica.", 
    historia: "Lugar del histórico encuentro entre el cacique Nicarao y el conquistador Gil González Dávila en 1523.",
    cultura: "Famosa por sus jícaras de filigrana, sus playas de surf y su gastronomía a base de plátano y mariscos.",
    imagen: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 8, 
    nombre: "Ometepe", 
    categoria: "naturaleza",
    tipo: "Reserva de Biosfera", 
    coordinates: [-85.55, 11.50],
    desc: "Isla formada por dos volcanes en el Gran Lago de Nicaragua.", 
    historia: "Considerada tierra sagrada por las culturas precolombinas, alberga cientos de petroglifos antiguos.",
    cultura: "Un oasis de paz donde la agricultura tradicional, la pesca y el ecoturismo conviven en armonía.",
    imagen: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 9, 
    nombre: "Granada", 
    categoria: "historia",
    tipo: "Arquitectura Colonial", 
    coordinates: [-85.95, 11.93],
    desc: "La ciudad más antigua de Nicaragua en su asentamiento original.", 
    historia: "Fundada en 1524 por Francisco Hernández de Córdoba. Sobrevivió a ataques piratas y al incendio de William Walker.",
    cultura: "Destaca por sus paseos en coche de caballos, el vigorón en el parque central y las Isletas en el lago.",
    imagen: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=500&q=80" 
  }
];

const productos = [
  { id: 1, nombre: "Hamaca de Hilo de Algodón", ciudad: "Masaya", precio: 1500, imagen: "/images/hamaca_algodon.jpg", descripcion: "Hamaca tradicional de doble puntada, tejida a mano en el barrio de Monimbó. Perfecta para exteriores e interiores, ofreciendo un descanso inigualable." },
  { id: 2, nombre: "Vasija de Cerámica Precolombina", ciudad: "Masaya", precio: 1200, imagen: "/images/ceramica_precolombina.jpg", descripcion: "Elaborada en San Juan de Oriente utilizando técnicas ancestrales de cocción a leña y engobes naturales. Sus grabados cuentan historias de nuestros ancestros." },
  { id: 3, nombre: "Escultura en Marmolina", ciudad: "Estelí", precio: 850, imagen: "/images/esculturas_marmolina.jpeg", descripcion: "Figura tallada a mano en piedra de marmolina de San Juan de Limay. Representa la vida campesina y la figura femenina con texturas increíblemente suaves." },
  { id: 4, nombre: "Garza de Madera de Balsa", ciudad: "Solentiname", precio: 450, imagen: "/images/garza_madera.jpeg", descripcion: "Pieza de arte primitivista tallada en madera de balsa y pintada con colores vibrantes que reflejan la rica biodiversidad del archipiélago." },
  { id: 5, nombre: "Sombrero de Pita Fino", ciudad: "Camoapa", precio: 1800, imagen: "/images/sombrero_pita.jpeg", descripcion: "Sombrero artesanal tejido finamente en cuevas para mantener la humedad de la fibra. Ligero, fresco, elegante y 100% biodegradable." },
  { id: 6, nombre: "Jícara de Filigrana Tallada", ciudad: "Rivas", precio: 600, imagen: "/images/jicara_tallada.jpeg", descripcion: "Jícara tradicional tallada a mano con técnica de filigrana. Una pieza decorativa que demuestra la paciencia y precisión de los artesanos del sur." },
  { id: 7, nombre: "Bolso de Cuero Repujado", ciudad: "Estelí", precio: 2200, imagen: "/images/bolso_cuero.jpeg", descripcion: "Bolso de cuero 100% genuino, trabajado con técnicas de talabartería tradicional y repujado a mano con motivos florales." },
  { id: 8, nombre: "Tapiz Tejido en Telar", ciudad: "Masaya", precio: 1100, imagen: "/images/tapiz_telar.jpg", descripcion: "Tapiz decorativo tejido en telar de cintura con hilos de algodón teñidos naturalmente. Aporta calidez y textura a cualquier espacio." }
];

const artesanos = [
  { 
    id: 101, 
    nombre: "Helio Gutiérrez", 
    especialidad: "Cerámica Precolombina", 
    ciudad: "San Juan de Oriente", 
    imagen: "/images/helio_gutierrez.jpeg",
    experiencia: "35 años",
    taller: "Taller de Arte Gutiérrez",
    descripcion: "Reconocido internacionalmente por rescatar técnicas precolombinas. Su trabajo con engobes naturales y bruñido a mano ha sido expuesto en galerías de Europa y América Latina. Cada pieza cuenta una historia de nuestros ancestros chorotegas, utilizando únicamente arcilla local y pigmentos minerales.",
    frase: "El barro tiene memoria; mis manos solo le ayudan a recordar las historias de nuestros ancestros.",
    obras: ["Vasijas ceremoniales", "Platos decorativos bruñidos", "Esculturas abstractas en barro"]
  },
  { 
    id: 102, 
    nombre: "Familia Suazo", 
    especialidad: "Tejido de Hamacas", 
    ciudad: "Masaya", 
    imagen: "/images/familia_suazo.jpeg",
    experiencia: "3 Generaciones",
    taller: "Hamacas El Carmen",
    descripcion: "Una familia dedicada por más de tres generaciones al arte del tejido en telar. Especialistas en la técnica de doble puntada de Masaya, crean hamacas que no solo son piezas de descanso, sino verdaderas obras de arte textil que combinan resistencia y belleza geométrica.",
    frase: "Cada hilo que tejemos entrelaza el legado de nuestros abuelos con el futuro de nuestros hijos.",
    obras: ["Hamacas matrimoniales de lujo", "Sillas colgantes", "Bolsos tejidos en macramé"]
  },
  { 
    id: 103, 
    nombre: "Cooperativa de Mujeres", 
    especialidad: "Talla en Marmolina", 
    ciudad: "San Juan de Limay", 
    imagen: "/images/cooperativa_mujeres.jpeg",
    experiencia: "20 años",
    taller: "Manos de Limay",
    descripcion: "Un colectivo de mujeres valientes que transformaron la dura piedra de marmolina en su medio de vida. Sus esculturas, caracterizadas por texturas increíblemente suaves y formas voluptuosas, representan la vida cotidiana, la maternidad y la naturaleza nicaragüense.",
    frase: "La piedra es dura, pero la voluntad de una mujer nicaragüense es invencible.",
    obras: ["Esculturas de la 'Gordita'", "Fauna local en piedra", "Morteros tradicionales"]
  },
  { 
    id: 104, 
    nombre: "Taller de Arte Solentiname", 
    especialidad: "Pintura Primitivista", 
    ciudad: "Solentiname", 
    imagen: "/images/taller_solentiname.jpg",
    experiencia: "40 años",
    taller: "Comunidad de Pintores",
    descripcion: "Herederos del movimiento fundado por Ernesto Cardenal. Este taller captura la exuberante flora, fauna y la vida campesina del archipiélago en piezas de madera de balsa, utilizando colores vibrantes que transmiten la paz y la espiritualidad del lago Cocibolca.",
    frase: "Pintamos el paraíso en el que vivimos para que el mundo entero pueda visitarlo.",
    obras: ["Garzas de madera pintada", "Cuadros primitivistas", "Móviles decorativos"]
  },
  { 
    id: 105, 
    nombre: "Tejedoras de Camoapa", 
    especialidad: "Tejido Fino en Pita", 
    ciudad: "Camoapa", 
    imagen: "/images/tejedoras_camoapa.jpeg",
    experiencia: "25 años",
    taller: "Asociación de Artesanas",
    descripcion: "Maestras en el delicado y laborioso arte de tejer la fibra de pita. Su trabajo requiere condiciones específicas de humedad y una paciencia infinita para crear sombreros tan finos que pueden doblarse y guardarse en un bolsillo sin perder su forma.",
    frase: "La paciencia es nuestro hilo principal; sin ella, la pita simplemente se rompe.",
    obras: ["Sombreros de pita finos", "Carteras tejidas", "Accesorios de fibra natural"]
  },
  { 
    id: 106, 
    nombre: "Talabartería El Potro", 
    especialidad: "Repujado en Cuero", 
    ciudad: "Estelí", 
    imagen: "/images/talabarteria_potro.jpeg",
    experiencia: "15 años",
    taller: "Taller Hermanos Ruiz",
    descripcion: "Representantes de la fuerte tradición ganadera del norte de Nicaragua. Especialistas en el repujado manual del cuero, creando diseños florales y geométricos profundos que adornan desde monturas hasta elegantes bolsos y cinturones de uso diario.",
    frase: "El cuero noble requiere manos firmes pero respetuosas para revelar su verdadera belleza.",
    obras: ["Bolsos de cuero repujado", "Cinturones artesanales", "Fundas y accesorios"]
  }
];

const talleres = [
  { id: 201, titulo: "Modelado en Barro y Engobes", categoria: "Cerámica", duracion: "4 Semanas", nivel: "Básico", precio: 600, imagen: "/images/modelado_barro.jpeg", instructor: "Taller Helio Gutiérrez", descripcion: "Aprende las técnicas milenarias de San Juan de Oriente. Desde la preparación del barro hasta el uso de engobes naturales para dar color a tus piezas sin químicos.", temario: ["Preparación de la arcilla", "Técnicas de modelado manual", "Aplicación de engobes", "Proceso de bruñido y horneado"] },
  { id: 202, titulo: "Tejido de Hamacas en Telar", categoria: "Textil", duracion: "6 Semanas", nivel: "Intermedio", precio: 800, imagen: "/images/tejido_hamacas.jpeg", instructor: "Familia Suazo", descripcion: "Domina el arte del tejido de doble puntada característico de Masaya. Crea tu propia hamaca paso a paso con la guía de maestros tejedores.", temario: ["Uso del telar tradicional", "Técnica de doble puntada", "Elaboración de los brazos", "Acabados y flecos decorativos"] },
  { id: 203, titulo: "Talla y Pulido de Marmolina", categoria: "Piedra", duracion: "4 Semanas", nivel: "Básico", precio: 500, imagen: "/images/tallado_marmolina.jpeg", instructor: "Cooperativa de Limay", descripcion: "Descubre cómo transformar la rústica piedra de marmolina en esculturas de texturas increíblemente suaves, representando la vida cotidiana nicaragüense.", temario: ["Selección de la piedra", "Uso de herramientas de desbaste", "Técnicas de tallado", "Lijado y pulido final"] },
  { id: 204, titulo: "Pintura Primitivista en Madera", categoria: "Pintura", duracion: "3 Semanas", nivel: "Básico", precio: 450, imagen: "/images/pintura_primitivista.jpg", instructor: "Taller de Arte Solentiname", descripcion: "Sumérgete en los colores vibrantes del archipiélago de Solentiname. Aprende a plasmar la flora y fauna local en piezas de madera de balsa.", temario: ["Preparación de la madera", "Bocetaje primitivista", "Teoría del color local", "Aplicación de acrílicos y sellado"] },
  { id: 205, titulo: "Extracción y Tejido de Pita", categoria: "Textil", duracion: "5 Semanas", nivel: "Avanzado", precio: 700, imagen: "/images/tejido_pita.jpeg", instructor: "Tejedoras de Camoapa", descripcion: "Un curso avanzado sobre el delicado proceso de tejer sombreros de pita. Conoce los secretos de la humedad y la tensión para lograr un tejido fino.", temario: ["Procesamiento de la fibra", "Inicio de la copa", "Tejido del ala", "Remate y planchado"] },
  { id: 206, titulo: "Repujado en Cuero Tradicional", categoria: "Cuero", duracion: "4 Semanas", nivel: "Intermedio", precio: 850, imagen: "/images/repujado_cuero.jpeg", instructor: "Talabartería El Potro", descripcion: "Aprende las técnicas de la talabartería norteña. Desde el corte y preparación del cuero hasta el repujado de motivos florales y geométricos.", temario: ["Tipos de cuero y herramientas", "Trazado de diseños", "Técnicas de repujado", "Teñido y acabados"] }
];

const equipo = [
  { id: 1, nombre: "María del Pilar Bermúdez", rol: "Coordinadora (Ing. Industrial)", imagen: "/images/members/pilar_bermudez.jpeg" },
  { id: 2, nombre: "Walter Noel Solorzano", rol: "Investigador (Ing. Industrial)", imagen: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" },
  { id: 3, nombre: "Amy Reneé López", rol: "Investigadora (Arquitectura)", imagen: "/images/members/amy_lopez.jpeg" },
  { id: 4, nombre: "Ángel Lenin Vivas", rol: "Desarrollador/diseñador (Ing. Computación)", imagen: "/images/members/angel_vivas.jpeg" },
  { id: 5, nombre: "Lance Andrew Sobalvarro", rol: "Investigador (Ing. Industrial)", imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" }
];

export default function App() {
  // --- ESTADOS ---
  const [vistaActual, setVistaActual] = useState('Inicio');
  const [carrito, setCarrito] = useState<any[]>([]);
  const [isCarritoOpen, setIsCarritoOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<any | null>(null);
  const [tallerSeleccionado, setTallerSeleccionado] = useState<any | null>(null);
  const [artesanoSeleccionado, setArtesanoSeleccionado] = useState<any | null>(null);
  const [filtroCiudad, setFiltroCiudad] = useState('Todas');
  const [filtroCategoriaTaller, setFiltroCategoriaTaller] = useState('Todos');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- FUNCIONES ---
  const cambiarVista = (vista: string) => {
    setVistaActual(vista);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const agregarAlCarrito = (producto: any) => {
    setCarrito([...carrito, producto]);
    setProductoSeleccionado(null);
    setIsCarritoOpen(true);
  };

  const eliminarDelCarrito = (index: number) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  // --- COMPONENTES DE VISTA ---

  const VistaInicio = () => {
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const interval = setInterval(() => {
        if (carouselRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            carouselRef.current.scrollBy({ left: 350, behavior: 'smooth' });
          }
        }
      }, 3500);
      return () => clearInterval(interval);
    }, []);

    const scrollCarousel = (direction: 'left' | 'right') => {
      if (carouselRef.current) {
        const scrollAmount = direction === 'left' ? -350 : 350;
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

    return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=1920&q=80" alt="Artesanía" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-coffee/80 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-16">
          <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 backdrop-blur-md border border-white/30">
            <Sparkles className="w-4 h-4 text-terracotta-light" /> Descubre la Esencia de Nicaragua
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 drop-shadow-2xl leading-tight">
            Conectando Raíces <br/><span className="text-terracotta-light italic">y Tecnología</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto font-light">
            Ollnari es el puente directo entre el talento ancestral de nuestras Ciudades Creativas y el mundo. Sin intermediarios, 100% comercio justo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => cambiarVista('Catálogo de Productos')} className="bg-terracotta hover:bg-terracotta-light text-white px-8 py-4 rounded-full font-bold tracking-wide transition-all hover:scale-105 shadow-xl flex items-center gap-2 w-full sm:w-auto justify-center">
              Explorar Colección <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => cambiarVista('Acerca de Nosotros')} className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold tracking-wide transition-all hover:scale-105 shadow-xl flex items-center gap-2 w-full sm:w-auto justify-center">
              Nuestra Historia
            </button>
          </div>
        </div>
      </section>

      {/* Cifras de Impacto */}
      <section className="py-12 bg-moss text-white relative z-20 -mt-10 mx-6 md:mx-12 rounded-3xl shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="p-4">
            <MapPin className="w-10 h-10 mx-auto mb-3 text-terracotta-light" />
            <h3 className="text-4xl font-serif font-bold mb-1">6</h3>
            <p className="text-sm uppercase tracking-widest opacity-90 font-medium">Ciudades Creativas</p>
          </div>
          <div className="p-4">
            <Users className="w-10 h-10 mx-auto mb-3 text-terracotta-light" />
            <h3 className="text-4xl font-serif font-bold mb-1">+50</h3>
            <p className="text-sm uppercase tracking-widest opacity-90 font-medium">Maestros Artesanos</p>
          </div>
          <div className="p-4">
            <ShieldCheck className="w-10 h-10 mx-auto mb-3 text-terracotta-light" />
            <h3 className="text-4xl font-serif font-bold mb-1">100%</h3>
            <p className="text-sm uppercase tracking-widest opacity-90 font-medium">Comercio Justo</p>
          </div>
        </div>
      </section>

      {/* Productos Destacados (Carrusel) */}
      <section className="py-24 bg-white px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h3 className="text-terracotta font-bold tracking-widest uppercase text-sm mb-2 flex items-center gap-2">
                <Star className="w-4 h-4" /> Colección Exclusiva
              </h3>
              <h2 className="font-serif text-4xl md:text-5xl text-coffee">Obras Maestras</h2>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => scrollCarousel('left')} className="w-12 h-12 rounded-full border-2 border-beige-dark flex items-center justify-center text-coffee hover:bg-coffee hover:text-white hover:border-coffee transition-all">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={() => scrollCarousel('right')} className="w-12 h-12 rounded-full border-2 border-beige-dark flex items-center justify-center text-coffee hover:bg-coffee hover:text-white hover:border-coffee transition-all">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div 
            id="productos-carousel" 
            ref={carouselRef}
            className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {productos.map(producto => (
              <div key={producto.id} className="min-w-[300px] md:min-w-[350px] snap-start bg-beige rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-moss flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3" /> Original
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-terracotta text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {producto.ciudad}
                  </p>
                  <h3 className="text-xl font-medium text-coffee mb-2 leading-tight">{producto.nombre}</h3>
                  <p className="font-serif text-2xl font-bold text-moss mb-6 mt-auto">C$ {producto.precio}</p>
                  <button onClick={() => setProductoSeleccionado(producto)} className="w-full bg-white border border-beige-dark text-coffee hover:bg-coffee hover:text-white hover:border-coffee py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                    Ver Detalles <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* El Proceso Artesanal (Nueva Sección) */}
      <section className="py-24 bg-beige px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-terracotta font-bold tracking-widest uppercase text-sm mb-2">El Valor de lo Nuestro</h3>
            <h2 className="font-serif text-4xl md:text-5xl text-coffee mb-4">El Proceso Artesanal</h2>
            <p className="text-coffee-light max-w-2xl mx-auto text-lg">Cada pieza en Ollnari pasa por un riguroso proceso que garantiza su autenticidad, calidad y respeto por el medio ambiente.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Línea conectora (solo desktop) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-beige-dark z-0"></div>
            
            <div className="relative z-10 text-center group">
              <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6 border-4 border-beige group-hover:border-terracotta transition-colors duration-300">
                <Leaf className="w-10 h-10 text-moss" />
              </div>
              <h4 className="font-serif text-2xl text-coffee font-bold mb-3">1. Extracción Natural</h4>
              <p className="text-coffee-light leading-relaxed">Materiales obtenidos de forma sostenible, respetando los ciclos de la naturaleza y utilizando pigmentos 100% orgánicos.</p>
            </div>
            
            <div className="relative z-10 text-center group">
              <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6 border-4 border-beige group-hover:border-terracotta transition-colors duration-300">
                <Palette className="w-10 h-10 text-terracotta" />
              </div>
              <h4 className="font-serif text-2xl text-coffee font-bold mb-3">2. Creación Manual</h4>
              <p className="text-coffee-light leading-relaxed">Semanas de trabajo meticuloso utilizando técnicas heredadas de generación en generación, sin procesos industriales.</p>
            </div>
            
            <div className="relative z-10 text-center group">
              <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6 border-4 border-beige group-hover:border-terracotta transition-colors duration-300">
                <Globe className="w-10 h-10 text-coffee" />
              </div>
              <h4 className="font-serif text-2xl text-coffee font-bold mb-3">3. Comercio Justo</h4>
              <p className="text-coffee-light leading-relaxed">Conexión directa contigo. El artesano recibe el precio justo por su obra, mejorando la calidad de vida de su comunidad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* El Desafío y Nuestra Solución */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-terracotta font-bold tracking-widest uppercase text-sm mb-2 flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4" /> Impacto Social
            </h3>
            <h2 className="font-serif text-4xl md:text-5xl text-coffee mb-4">Transformando Realidades</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="bg-beige-dark/30 p-10 md:p-14 rounded-[3rem] shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-bl-full"></div>
              <h3 className="text-terracotta font-bold tracking-widest uppercase text-sm mb-4">El Problema</h3>
              <h2 className="font-serif text-3xl md:text-4xl text-coffee mb-6 leading-tight">El Desafío Actual</h2>
              <p className="text-lg text-coffee-light leading-relaxed">
                Actualmente, las alcaldías y comisiones locales carecen de herramientas para visibilizar a los artesanos, limitando la economía creativa y poniendo en riesgo el patrimonio cultural.
              </p>
            </div>
            <div className="bg-coffee p-10 md:p-14 rounded-[3rem] shadow-2xl text-white transform md:-translate-y-8 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-tl-full"></div>
              <h3 className="text-terracotta-light font-bold tracking-widest uppercase text-sm mb-4">Nuestra Solución</h3>
              <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-tight">Ollnari</h2>
              <p className="text-lg text-white/90 leading-relaxed mb-8">
                Ollnari es un puente digital sin intermediarios. Conectamos talento ancestral con mercados modernos, integrando trazabilidad y nuestro sello <strong>'Origen Garantizado'</strong>.
              </p>
              <button onClick={() => cambiarVista('Acerca de Nosotros')} className="text-terracotta-light font-bold flex items-center gap-2 hover:text-white transition-colors">
                Conoce más sobre el proyecto <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  };

  const VistaCatalogo = () => {
    const ciudades = ["Todas", "Masaya", "Estelí", "Solentiname", "Camoapa", "Rivas"];
    const productosFiltrados = filtroCiudad === "Todas" ? productos : productos.filter(p => p.ciudad === filtroCiudad);

    return (
      <div className="pt-20 pb-24 bg-beige min-h-screen animate-in fade-in duration-500">
        {/* Hero Catálogo */}
        <div className="relative bg-coffee text-white py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-40 mix-blend-multiply">
            <img src="https://images.unsplash.com/photo-1610715936287-6c2420ebbfb1?auto=format&fit=crop&w=1920&q=80" alt="Catálogo Ollnari" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 backdrop-blur-md border border-white/20">
              <ShoppingCart className="w-4 h-4 text-terracotta-light" /> Colección Exclusiva
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Catálogo de Productos</h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Explora piezas únicas elaboradas a mano por maestros artesanos de las Ciudades Creativas de Nicaragua. Cada compra apoya directamente a sus creadores.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 px-6">
          {/* Banner de Garantía */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-16 border border-beige-dark flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h3 className="text-terracotta font-bold tracking-widest uppercase text-sm mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Garantía Ollnari
              </h3>
              <h2 className="font-serif text-3xl text-coffee mb-4">Autenticidad y Comercio Justo</h2>
              <p className="text-coffee-light leading-relaxed">
                Cada pieza en nuestro catálogo incluye un certificado de origen digital. Garantizamos que el 100% de las ganancias (después de costos operativos) llega directamente a las manos del artesano creador.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-beige p-4 rounded-2xl flex flex-col items-center text-center">
                <Award className="w-8 h-8 text-moss mb-2" />
                <span className="font-bold text-coffee text-sm">Calidad Premium</span>
              </div>
              <div className="bg-beige p-4 rounded-2xl flex flex-col items-center text-center">
                <Globe className="w-8 h-8 text-terracotta mb-2" />
                <span className="font-bold text-coffee text-sm">Envío Internacional</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-terracotta font-bold tracking-widest uppercase text-sm mb-2 flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" /> Explora por Origen
            </h3>
            <h2 className="font-serif text-4xl md:text-5xl text-coffee mb-8">Filtra por Ciudad Creativa</h2>
            {/* Barra de Filtros */}
            <div className="flex flex-wrap justify-center gap-3">
              {ciudades.map(ciudad => (
                <button
                  key={ciudad}
                  onClick={() => setFiltroCiudad(ciudad)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    filtroCiudad === ciudad ? 'bg-terracotta text-white' : 'bg-white text-coffee hover:bg-beige-dark border border-beige-dark'
                  }`}
                >
                  {ciudad}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productosFiltrados.map(producto => (
              <div key={producto.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="aspect-square relative overflow-hidden cursor-pointer" onClick={() => setProductoSeleccionado(producto)}>
                  <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  
                  {/* Quick Add Button Overlay */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        agregarAlCarrito(producto);
                      }}
                      className="bg-white text-coffee hover:bg-terracotta hover:text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" /> Añadir Rápido
                    </button>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 relative">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-bold text-terracotta uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {producto.ciudad}
                    </p>
                    <span className="bg-beige-dark text-coffee-light text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                      Hecho a mano
                    </span>
                  </div>
                  <h3 className="text-xl font-serif text-coffee mb-3 leading-tight flex-1 group-hover:text-terracotta transition-colors">{producto.nombre}</h3>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-beige-dark">
                    <p className="font-serif text-2xl font-bold text-moss">C$ {producto.precio}</p>
                    <button onClick={() => setProductoSeleccionado(producto)} className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-coffee hover:bg-coffee hover:text-white transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {productosFiltrados.length === 0 && (
            <div className="text-center py-20 text-coffee-light bg-white rounded-3xl border border-dashed border-beige-dark">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-beige-dark" />
              <p className="text-xl font-serif text-coffee">No hay productos disponibles para esta ciudad.</p>
              <button onClick={() => setFiltroCiudad("Todas")} className="mt-4 text-terracotta font-bold hover:underline">
                Ver todo el catálogo
              </button>
            </div>
          )}

          {/* Newsletter Section */}
          <div className="mt-24 bg-moss rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img src="https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1920&q=80" alt="Fondo" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <Sparkles className="w-10 h-10 text-terracotta-light mx-auto mb-6" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Únete a la Comunidad Ollnari</h2>
              <p className="text-white/80 text-lg mb-8">
                Recibe historias exclusivas de nuestros artesanos, acceso anticipado a nuevas colecciones y un <strong>10% de descuento</strong> en tu primera pieza.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="flex-1 px-6 py-4 rounded-full text-coffee focus:outline-none focus:ring-2 focus:ring-terracotta-light"
                />
                <button type="submit" className="bg-terracotta hover:bg-terracotta-light text-white px-8 py-4 rounded-full font-bold transition-colors shadow-lg">
                  Suscribirme
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const VistaMapa = () => {
    // Cambiamos el nombre a "seleccionActual" porque puede ser un Departamento o un Lugar específico
    const [seleccionActual, setSeleccionActual] = useState<any>(puntosMapa[2]); 
    const [filtroCategoria, setFiltroCategoria] = useState('todas');

    const puntosFiltrados = filtroCategoria === 'todas' 
      ? puntosMapa 
      : puntosMapa.filter(p => p.categoria === filtroCategoria);

    // NUEVA FUNCIÓN: Hace que TODO el mapa sea clickeable
    const handleRegionClick = (regionNombre: string) => {
      // 1. Le agregamos ": any" para que TypeScript no sea tan estricto con la estructura
      let infoDepto: any = puntosMapa.find(p => p.nombre === regionNombre);
      
      // 2. Si haces clic en una ciudad que aún no tiene datos en tu array, le creamos información genérica al vuelo.
      if (!infoDepto) {
        infoDepto = {
          id: Date.now(), // <-- ¡Solución! Ahora el ID es un número único, no un texto.
          nombre: regionNombre,
          departamento: regionNombre, 
          categoria: 'historia',
          tipo: 'Departamento',
          historia: `La información histórica y patrimonial de ${regionNombre} estará disponible próximamente en nuestra base de datos.`,
          cultura: `Explorando las tradiciones, economía creativa y maestros artesanos de la región de ${regionNombre}.`,
          imagen: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=500&q=80" 
        };
      }
      
      setSeleccionActual(infoDepto);
    };

    return (
      <div className="pt-20 pb-24 bg-beige min-h-screen animate-in fade-in duration-500">
        {/* ... Hero del Mapa (Igual) ... */}
        <div className="relative bg-coffee text-white py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-30 mix-blend-multiply">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=80" alt="Mapa de Nicaragua" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 backdrop-blur-md border border-white/20">
              <Navigation className="w-4 h-4 text-terracotta-light" /> Turismo Cultural
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Explora Nicaragua</h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Descubre las Ciudades Creativas y los epicentros culturales de nuestro país. Un viaje interactivo por la cuna de nuestra identidad.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 px-6">
          <div className="text-center mb-12">
            <h3 className="text-terracotta font-bold tracking-widest uppercase text-sm mb-2 flex items-center justify-center gap-2">
              <Map className="w-4 h-4" /> Mapa Interactivo
            </h3>
            <h2 className="font-serif text-4xl md:text-5xl text-coffee mb-8">Nuestras Ciudades Creativas</h2>
            
            {/* Leyenda / Filtros */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categoriasMapa.map(cat => {
                const Icon = cat.icon;
                const isSelected = filtroCategoria === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFiltroCategoria(cat.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-sm ${
                      isSelected 
                        ? `${cat.color} text-white shadow-md scale-105` 
                        : 'bg-white text-coffee hover:bg-beige-dark border border-beige-dark'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.nombre}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-[2.5rem] shadow-xl border border-beige-dark">
            {/* Contenedor del Mapa (Izquierda) */}
            <div className="lg:w-2/3 relative bg-[#eef2f5] rounded-[2rem] overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center justify-center border-4 border-beige shadow-inner">
              
              <div className="absolute inset-0 p-8 opacity-90">
                <MapaSvg 
                  className="w-full h-full drop-shadow-2xl"
                  // Esta línea verifica si el marcador tiene asignado un departamento para no perder el color de fondo
                  activeRegion={seleccionActual.departamento || seleccionActual.nombre}
                  onRegionClick={handleRegionClick} // Llama a la función que revisamos arriba
                >
                  {/* Pines Interactivos */}
                  {puntosFiltrados.map(punto => {
                    const categoria = categoriasMapa.find(c => c.id === punto.categoria) || categoriasMapa[0];
                    const Icon = categoria.icon;
                    const isSelected = seleccionActual.id === punto.id;

                    return (
                      <Marker key={punto.id} coordinates={punto.coordinates as [number, number]}>
                        <g
                          className={`group transition-all duration-500 ease-out ${isSelected ? 'z-40' : 'z-20 hover:z-50'}`}
                          onClick={(e) => {
                            // ¡Súper importante! Esto detiene el clic para que no toque la ciudad de fondo
                            e.stopPropagation(); 
                            setSeleccionActual(punto);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <foreignObject x="-24" y="-24" width="48" height="48" style={{ overflow: 'visible' }}>
                            <div className="relative w-12 h-12">
                              {isSelected && (
                                <div className={`absolute inset-0 ${categoria.color} rounded-full animate-ping opacity-75`}></div>
                              )}
                              <div className={`relative w-full h-full rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border-2 border-white ${isSelected ? `${categoria.color} text-white scale-110` : 'bg-white text-coffee hover:scale-110 group-hover:bg-beige'}`}>
                                <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-coffee'}`} />
                              </div>
                            </div>
                          </foreignObject>
                        </g>
                      </Marker>
                    );
                  })}
                </MapaSvg>
              </div>
              
              {/* Título interno del mapa */}
              <div className="absolute top-8 left-8 text-coffee/30 font-serif text-3xl font-bold tracking-widest uppercase pointer-events-none">
                Nicaragua
              </div>
            </div>

            {/* Panel de Detalles (Derecha) */}
            <div className="lg:w-1/3 flex flex-col">
              <div className="bg-beige p-8 rounded-[2rem] flex-1 flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-bl-full -z-0"></div>
                
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 shadow-md relative z-10">
                  <img src={seleccionActual.imagen} alt={seleccionActual.nombre} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
                  <div className={`absolute top-4 right-4 ${categoriasMapa.find(c => c.id === seleccionActual.categoria)?.color || 'bg-terracotta'} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1`}>
                    {React.createElement(categoriasMapa.find(c => c.id === seleccionActual.categoria)?.icon || MapPin, { className: "w-3 h-3" })}
                    {categoriasMapa.find(c => c.id === seleccionActual.categoria)?.nombre}
                  </div>
                </div>
                
                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="font-serif text-4xl text-coffee mb-2 leading-tight">{seleccionActual.nombre}</h3>
                  <p className="text-terracotta font-bold text-sm mb-4">{seleccionActual.tipo}</p>
                  
                  <div className="bg-white/60 p-4 rounded-xl mb-4">
                    <h4 className="text-xs font-bold text-coffee uppercase tracking-wider mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-terracotta" /> Historia
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{seleccionActual.historia}</p>
                  </div>

                  <div className="bg-white/60 p-4 rounded-xl mb-6 flex-1">
                    <h4 className="text-xs font-bold text-coffee uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-terracotta" /> Cultura y Tradición
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{seleccionActual.cultura}</p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setFiltroCiudad(seleccionActual.departamento || seleccionActual.nombre);
                      cambiarVista('Catálogo de Productos');
                    }}
                    className="w-full bg-coffee hover:bg-terracotta text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-3 shadow-lg group/btn mt-auto"
                  >
                    Ver Artesanías <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const VistaArtesanos = () => (
    <div className="pt-20 pb-24 bg-white min-h-screen animate-in fade-in duration-500">
      {/* Hero Artesanos */}
      <div className="relative bg-moss text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-multiply">
          <img src="https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1920&q=80" alt="Manos Artesanas" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 backdrop-blur-md border border-white/20">
            <Heart className="w-4 h-4 text-terracotta-light" /> El Alma de Ollnari
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Manos que Cuentan Historias</h1>
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            Conoce a los guardianes de nuestro patrimonio. Detrás de cada pieza hay una familia, una tradición y una vida dedicada a preservar la identidad cultural de Nicaragua.
          </p>
        </div>
      </div>

      {/* Grid de Artesanos */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="text-center mb-16">
          <h3 className="text-terracotta font-bold tracking-widest uppercase text-sm mb-2 flex items-center justify-center gap-2">
            <Users className="w-4 h-4" /> Guardianes del Patrimonio
          </h3>
          <h2 className="font-serif text-4xl md:text-5xl text-coffee mb-4">Perfiles de Artesanos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {artesanos.map(artesano => (
            <div key={artesano.id} className="bg-beige rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group relative flex flex-col">
              <div className="relative h-80 overflow-hidden cursor-pointer" onClick={() => setArtesanoSeleccionado(artesano)}>
                <img src={artesano.imagen} alt={artesano.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-terracotta flex items-center gap-2 shadow-lg transform group-hover:-translate-y-1 transition-transform">
                  <Medal className="w-4 h-4" /> {artesano.experiencia}
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-terracotta-light text-sm font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Palette className="w-4 h-4" /> {artesano.especialidad}
                  </p>
                  <h3 className="font-serif text-3xl font-bold mb-2 leading-tight">{artesano.nombre}</h3>
                  <p className="flex items-center gap-2 text-white/80 text-sm">
                    <MapPin className="w-4 h-4" /> {artesano.ciudad}
                  </p>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1 bg-white relative">
                <div className="absolute -top-6 right-8 w-12 h-12 bg-terracotta rounded-full flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform cursor-pointer" onClick={() => setArtesanoSeleccionado(artesano)}>
                  <ArrowRight className="w-6 h-6" />
                </div>
                <p className="text-coffee-light leading-relaxed mb-6 line-clamp-3">
                  {artesano.descripcion}
                </p>
                <div className="mt-auto border-t border-beige-dark pt-6">
                  <button 
                    onClick={() => setArtesanoSeleccionado(artesano)}
                    className="w-full text-center text-coffee font-bold hover:text-terracotta transition-colors uppercase tracking-widest text-sm"
                  >
                    Ver Perfil Completo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const VistaTalleres = () => {
    const categorias = ["Todos", "Cerámica", "Textil", "Piedra", "Pintura", "Cuero"];
    const talleresFiltrados = filtroCategoriaTaller === "Todos" ? talleres : talleres.filter(t => t.categoria === filtroCategoriaTaller);

    return (
      <div className="pt-20 pb-24 bg-beige min-h-screen animate-in fade-in duration-500">
        {/* Hero Talleres */}
        <div className="relative bg-coffee text-white py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1920&q=80" alt="Fondo Talleres" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-terracotta/20 text-terracotta-light px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
              <Video className="w-4 h-4" /> Academia Ollnari
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Aprende de los Maestros</h1>
            <p className="text-xl text-white/80 leading-relaxed mb-10">
              Preserva nuestra herencia cultural desde cualquier parte del mundo. Accede a clases magistrales interactivas impartidas directamente por los artesanos de nuestras Ciudades Creativas.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16">
          <div className="text-center mb-12">
            <h3 className="text-terracotta font-bold tracking-widest uppercase text-sm mb-2 flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" /> Oferta Académica
            </h3>
            <h2 className="font-serif text-4xl md:text-5xl text-coffee mb-8">Cursos Disponibles</h2>
          </div>
          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setFiltroCategoriaTaller(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  filtroCategoriaTaller === cat ? 'bg-terracotta text-white shadow-md' : 'bg-white text-coffee hover:bg-beige-dark border border-beige-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid de Talleres */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {talleresFiltrados.map(taller => (
              <div key={taller.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col">
                <div className="aspect-video relative overflow-hidden cursor-pointer" onClick={() => setTallerSeleccionado(taller)}>
                  <img src={taller.imagen} alt={taller.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform shadow-lg">
                      <Play className="w-6 h-6 text-terracotta ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-coffee uppercase tracking-wider shadow-sm">
                    {taller.nivel}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {taller.duracion}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-terracotta text-sm font-bold uppercase tracking-wider mb-2">{taller.categoria}</p>
                  <h3 className="font-serif text-2xl text-coffee mb-3 leading-tight flex-1">{taller.titulo}</h3>
                  <p className="text-coffee-light text-sm mb-6 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Por: {taller.instructor}
                  </p>
                  <div className="flex justify-between items-center pt-6 border-t border-beige-dark mt-auto">
                    <div>
                      <span className="font-serif font-bold text-moss text-2xl">C$ {taller.precio}</span>
                      <span className="text-coffee-light text-sm"> / mes</span>
                    </div>
                    <button onClick={() => setTallerSeleccionado(taller)} className="bg-coffee hover:bg-coffee-light text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors">
                      Ver Curso
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const VistaNosotros = () => (
    <div className="pt-20 pb-0 bg-white min-h-screen animate-in fade-in duration-500">
      {/* Hero Nosotros */}
      <div className="relative bg-moss text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-multiply">
          <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1920&q=80" alt="Equipo Ollnari" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 backdrop-blur-md border border-white/20">
            <Award className="w-4 h-4 text-terracotta-light" /> 3er Rally Nacional de Innovación
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Operación Titán</h1>
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            Somos estudiantes de la Universidad Nacional de Ingeniería (UNI-RUPAP) unidos por un propósito: revolucionar la economía creativa de Nicaragua mediante la tecnología.
          </p>
        </div>
      </div>

      {/* El Problema */}
      <div className="bg-beige py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-terracotta font-bold tracking-widest uppercase text-sm mb-2 flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4" /> Contexto Actual
            </h3>
            <h2 className="font-serif text-4xl md:text-5xl text-coffee mb-4">El Problema que Resolvemos</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h3 className="font-serif text-3xl md:text-4xl text-coffee mb-6 leading-tight">La brecha digital en nuestras Ciudades Creativas</h3>
              <p className="text-lg text-coffee-light leading-relaxed mb-6">
                En lugares como San Juan de Oriente, el <strong>80% de los negocios dependen de la artesanía</strong>, pero enfrentan grandes obstáculos tecnológicos para promocionarse.
              </p>
              <p className="text-lg text-coffee-light leading-relaxed">
                Además, el patrimonio cultural está en riesgo: un <strong>20% de los artesanos en Monimbó no está transmitiendo su conocimiento ancestral</strong>, evidenciando una posible pérdida cultural si no se implementan mecanismos efectivos de gestión local.
              </p>
            </div>
            <div className="md:w-1/2 bg-white p-10 md:p-12 rounded-[3rem] shadow-xl border-l-8 border-terracotta relative">
              <div className="absolute -top-6 -left-6 text-6xl text-terracotta/20 font-serif">"</div>
              <p className="text-xl md:text-2xl font-serif text-coffee italic leading-relaxed relative z-10">
                Las alcaldías y comisiones locales carecen de una herramienta integral para identificar, visibilizar y conectar de forma eficiente a los artesanos con los mercados.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Propuesta de Valor */}
      <div className="py-24 px-6 max-w-6xl mx-auto text-center">
        <div className="text-center mb-16">
          <h3 className="text-terracotta font-bold tracking-widest uppercase text-sm mb-2 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Innovación Social
          </h3>
          <h2 className="font-serif text-4xl md:text-5xl text-coffee mb-4">Nuestra Propuesta de Valor</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-beige group hover:-translate-y-2">
            <div className="w-16 h-16 bg-terracotta/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-terracotta transition-colors">
              <MapPin className="w-8 h-8 text-terracotta group-hover:text-white transition-colors" />
            </div>
            <h4 className="font-bold text-coffee text-2xl mb-4">Mapa Interactivo</h4>
            <p className="text-coffee-light leading-relaxed">Permite explorar ciudades creativas y acceder a productos culturales con su historia y trazabilidad, fortaleciendo el turismo cultural.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-beige group hover:-translate-y-2">
            <div className="w-16 h-16 bg-moss/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-moss transition-colors">
              <ShieldCheck className="w-8 h-8 text-moss group-hover:text-white transition-colors" />
            </div>
            <h4 className="font-bold text-coffee text-2xl mb-4">Origen Garantizado</h4>
            <p className="text-coffee-light leading-relaxed">Conexión directa y transparente sin intermediarios, impulsando el comercio justo y garantizando la autenticidad de cada pieza.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-beige group hover:-translate-y-2">
            <div className="w-16 h-16 bg-coffee/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-coffee transition-colors">
              <BookOpen className="w-8 h-8 text-coffee group-hover:text-white transition-colors" />
            </div>
            <h4 className="font-bold text-coffee text-2xl mb-4">Turismo Virtual</h4>
            <p className="text-coffee-light leading-relaxed">Talleres interactivos donde los artesanos comparten sus técnicas, preservando y reproduciendo el conocimiento ancestral.</p>
          </div>
        </div>
      </div>

      {/* Evaluación de Impacto */}
      <div className="bg-coffee text-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-terracotta-light font-bold tracking-widest uppercase text-sm mb-4">Evaluación de Impacto</h2>
            <h3 className="font-serif text-4xl md:text-5xl mb-6">Transformando realidades</h3>
            <div className="w-24 h-1 bg-terracotta-light mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-terracotta/30 rounded-full"></div>
              <div className="flex items-center gap-4 mb-6 pl-4">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shadow-inner">
                  <Users className="w-7 h-7 text-terracotta-light" />
                </div>
                <h4 className="font-serif text-3xl font-bold">Social</h4>
              </div>
              <p className="text-white/80 leading-relaxed pl-4 text-lg">
                Conectamos a más de 1.1 millones de turistas anuales con el arte local. Fortalecemos la identidad cultural, promovemos el orgullo por nuestras tradiciones y reducimos la migración al generar oportunidades sostenibles.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-moss/30 rounded-full"></div>
              <div className="flex items-center gap-4 mb-6 pl-4">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shadow-inner">
                  <TrendingUp className="w-7 h-7 text-moss" />
                </div>
                <h4 className="font-serif text-3xl font-bold">Económico</h4>
              </div>
              <p className="text-white/80 leading-relaxed pl-4 text-lg">
                Servimos como vitrina para emprendedores, facilitando el acceso a nuevos mercados. Fomentamos la creación de empleos directos e indirectos, esperando un efecto multiplicador en las economías locales.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-green-400/30 rounded-full"></div>
              <div className="flex items-center gap-4 mb-6 pl-4">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shadow-inner">
                  <Leaf className="w-7 h-7 text-green-400" />
                </div>
                <h4 className="font-serif text-3xl font-bold">Ambiental</h4>
              </div>
              <p className="text-white/80 leading-relaxed pl-4 text-lg">
                Promovemos el consumo responsable de productos hechos a mano con materiales sostenibles. Centralizamos la promoción digital, reduciendo el uso de impresos y minimizando la huella ambiental.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* El Equipo */}
      <div className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-terracotta font-bold tracking-widest uppercase text-sm mb-2 flex items-center justify-center gap-2">
            <Users className="w-4 h-4" /> Operación Titán
          </h3>
          <h2 className="font-serif text-4xl md:text-5xl text-coffee mb-6">Conoce al Equipo</h2>
          <p className="text-lg text-coffee-light font-medium bg-beige inline-block px-6 py-2 rounded-full">
            Tutor: Arq. Francis Alejandra Cruz Pérez
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-center">
          {equipo.map(miembro => (
            <div key={miembro.id} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center group border border-beige hover:-translate-y-3">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 shadow-md border-4 border-white group-hover:border-terracotta transition-colors">
                <img src={miembro.imagen} alt={miembro.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h4 className="font-serif text-xl font-bold text-coffee mb-2 leading-tight">{miembro.nombre}</h4>
              <p className="text-terracotta font-medium text-xs uppercase tracking-wider">{miembro.rol}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --- RENDER PRINCIPAL ---
  return (
    <div className="min-h-screen font-sans selection:bg-terracotta selection:text-white flex flex-col">
      
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-beige-dark">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => cambiarVista('Inicio')}>
            <Award className="w-8 h-8 text-terracotta" />
            <span className="font-serif text-2xl font-bold text-coffee tracking-wide">Ollnari</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {['Inicio', 'Catálogo de Productos', 'Mapa Cultural', 'Nuestros Artesanos', 'Talleres Virtuales', 'Acerca de Nosotros'].map(vista => (
              <button 
                key={vista}
                onClick={() => cambiarVista(vista)}
                className={`text-sm font-medium transition-colors ${vistaActual === vista ? 'text-terracotta border-b-2 border-terracotta pb-1' : 'text-coffee-light hover:text-terracotta'}`}
              >
                {vista}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => setIsCarritoOpen(true)} className="relative p-2 text-coffee hover:bg-beige rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {carrito.length > 0 && (
                <span className="absolute top-0 right-0 bg-terracotta text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {carrito.length}
                </span>
              )}
            </button>
            <button className="lg:hidden p-2 text-coffee" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-beige-dark shadow-lg">
            <nav className="flex flex-col p-4">
              {['Inicio', 'Catálogo de Productos', 'Mapa Cultural', 'Nuestros Artesanos', 'Talleres Virtuales', 'Acerca de Nosotros'].map(vista => (
                <button 
                  key={vista}
                  onClick={() => { cambiarVista(vista); setMobileMenuOpen(false); }}
                  className={`text-left p-4 text-lg font-medium border-b border-beige-dark last:border-0 ${vistaActual === vista ? 'text-terracotta' : 'text-coffee'}`}
                >
                  {vista}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ÁREA DE CONTENIDO DINÁMICO */}
      <main className="flex-1">
        {vistaActual === 'Inicio' && <VistaInicio />}
        {vistaActual === 'Catálogo de Productos' && <VistaCatalogo />}
        {vistaActual === 'Mapa Cultural' && <VistaMapa />}
        {vistaActual === 'Nuestros Artesanos' && <VistaArtesanos />}
        {vistaActual === 'Talleres Virtuales' && <VistaTalleres />}
        {vistaActual === 'Acerca de Nosotros' && <VistaNosotros />}
      </main>

      {/* MODAL DE PRODUCTO */}
      {productoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setProductoSeleccionado(null)}></div>
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row shadow-2xl relative z-10 max-h-[90vh]">
            <button onClick={() => setProductoSeleccionado(null)} className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-20 text-coffee shadow-sm">
              <X className="w-6 h-6" />
            </button>
            
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre} className="w-full h-full object-cover" />
            </div>
            
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto bg-beige">
              <div className="flex items-center gap-2 mb-4 text-terracotta text-sm font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" /> {productoSeleccionado.ciudad}
              </div>
              <h3 className="text-3xl font-serif text-coffee mb-4 leading-tight">{productoSeleccionado.nombre}</h3>
              <p className="text-4xl font-serif font-bold text-moss mb-6">C$ {productoSeleccionado.precio}</p>
              <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
                <h4 className="font-bold text-coffee mb-2">Descripción del Producto</h4>
                <p className="text-coffee-light leading-relaxed">{productoSeleccionado.descripcion}</p>
              </div>
              <button 
                onClick={() => agregarAlCarrito(productoSeleccionado)}
                className="mt-auto w-full bg-terracotta hover:bg-terracotta-light text-white py-4 rounded-xl font-bold tracking-wide transition-all hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3 text-lg"
              >
                <ShoppingCart className="w-6 h-6" /> Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE TALLER */}
      {tallerSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setTallerSeleccionado(null)}></div>
          <div className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden flex flex-col md:flex-row shadow-2xl relative z-10 max-h-[90vh]">
            <button onClick={() => setTallerSeleccionado(null)} className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm rounded-full transition-colors z-20 shadow-sm">
              <X className="w-6 h-6" />
            </button>
            
            {/* Columna Izquierda: Video/Imagen */}
            <div className="md:w-1/2 bg-coffee relative flex flex-col">
              <div className="aspect-video relative bg-black flex items-center justify-center group cursor-pointer">
                <img src={tallerSeleccionado.imagen} alt={tallerSeleccionado.titulo} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity" />
                <div className="w-20 h-20 bg-terracotta rounded-full flex items-center justify-center relative z-10 shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <p className="text-sm font-medium opacity-80 mb-1">Clase de muestra gratuita</p>
                  <div className="h-1 w-full bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-terracotta w-1/3"></div>
                  </div>
                </div>
              </div>
              <div className="p-8 text-white flex-1">
                <h4 className="font-serif text-2xl mb-4">Acerca del Instructor</h4>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-terracotta-light" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{tallerSeleccionado.instructor}</p>
                    <p className="text-white/70 text-sm">Maestro Artesano Certificado</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Aprenderás directamente de los creadores que han mantenido viva esta tradición por generaciones. Tu suscripción apoya directamente a su taller y comunidad.
                </p>
              </div>
            </div>
            
            {/* Columna Derecha: Detalles */}
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto bg-beige">
              <div className="flex items-center gap-2 mb-4 text-terracotta text-sm font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" /> {tallerSeleccionado.categoria}
              </div>
              <h3 className="text-3xl font-serif text-coffee mb-4 leading-tight">{tallerSeleccionado.titulo}</h3>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-coffee-light flex items-center gap-2 shadow-sm">
                  <Clock className="w-4 h-4" /> {tallerSeleccionado.duracion}
                </span>
                <span className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-coffee-light flex items-center gap-2 shadow-sm">
                  <Star className="w-4 h-4 text-yellow-500" /> {tallerSeleccionado.nivel}
                </span>
              </div>

              <p className="text-coffee-light leading-relaxed mb-8">{tallerSeleccionado.descripcion}</p>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
                <h4 className="font-bold text-coffee mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-terracotta" /> Temario del Curso
                </h4>
                <ul className="space-y-3">
                  {tallerSeleccionado.temario.map((tema: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-coffee-light">
                      <span className="w-6 h-6 rounded-full bg-beige-dark text-coffee flex items-center justify-center flex-shrink-0 font-bold text-xs">
                        {idx + 1}
                      </span>
                      <span className="pt-0.5">{tema}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6 border-t border-beige-dark flex items-center justify-between gap-6">
                <div>
                  <p className="text-sm text-coffee-light mb-1">Suscripción mensual</p>
                  <p className="text-4xl font-serif font-bold text-moss">C$ {tallerSeleccionado.precio}</p>
                </div>
                <button 
                  onClick={() => {
                    agregarAlCarrito({ ...tallerSeleccionado, nombre: `Suscripción: ${tallerSeleccionado.titulo}` });
                    setTallerSeleccionado(null);
                  }}
                  className="flex-1 bg-terracotta hover:bg-terracotta-light text-white py-4 rounded-xl font-bold tracking-wide transition-all hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 text-lg"
                >
                  <PlayCircle className="w-6 h-6" /> Inscribirse
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE ARTESANO */}
      {artesanoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setArtesanoSeleccionado(null)}></div>
          <div className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden flex flex-col md:flex-row shadow-2xl relative z-10 max-h-[90vh]">
            <button onClick={() => setArtesanoSeleccionado(null)} className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-coffee backdrop-blur-sm rounded-full transition-colors z-20 shadow-sm">
              <X className="w-6 h-6" />
            </button>
            
            {/* Columna Izquierda: Imagen y Frase */}
            <div className="md:w-2/5 relative flex flex-col">
              <div className="absolute inset-0">
                <img src={artesanoSeleccionado.imagen} alt={artesanoSeleccionado.nombre} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee via-coffee/40 to-transparent"></div>
              </div>
              <div className="relative z-10 p-8 mt-auto text-white">
                <Quote className="w-10 h-10 text-terracotta-light mb-4 opacity-80" />
                <p className="font-serif text-2xl leading-snug italic mb-6">
                  "{artesanoSeleccionado.frase}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-terracotta rounded-full flex items-center justify-center">
                    <Medal className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70 uppercase tracking-widest">Experiencia</p>
                    <p className="font-bold">{artesanoSeleccionado.experiencia}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Columna Derecha: Perfil Detallado */}
            <div className="md:w-3/5 p-8 md:p-12 flex flex-col overflow-y-auto bg-beige">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-white px-4 py-2 rounded-full text-sm font-bold text-terracotta flex items-center gap-2 shadow-sm">
                  <Palette className="w-4 h-4" /> {artesanoSeleccionado.especialidad}
                </span>
                <span className="bg-white px-4 py-2 rounded-full text-sm font-bold text-moss flex items-center gap-2 shadow-sm">
                  <MapPin className="w-4 h-4" /> {artesanoSeleccionado.ciudad}
                </span>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-serif text-coffee mb-2 leading-tight">{artesanoSeleccionado.nombre}</h3>
              <p className="text-lg text-terracotta font-medium mb-8">{artesanoSeleccionado.taller}</p>
              
              <div className="bg-white p-8 rounded-3xl shadow-sm mb-8 border border-beige-dark">
                <h4 className="font-bold text-coffee mb-4 flex items-center gap-2 text-lg">
                  <BookOpen className="w-5 h-5 text-terracotta" /> Historia y Tradición
                </h4>
                <p className="text-coffee-light leading-relaxed text-lg">
                  {artesanoSeleccionado.descripcion}
                </p>
              </div>

              <div className="mb-8">
                <h4 className="font-bold text-coffee mb-4 flex items-center gap-2 text-lg">
                  <Award className="w-5 h-5 text-moss" /> Obras Destacadas
                </h4>
                <div className="flex flex-wrap gap-3">
                  {artesanoSeleccionado.obras.map((obra: string, idx: number) => (
                    <span key={idx} className="bg-white border border-beige-dark px-4 py-2 rounded-lg text-sm text-coffee-light shadow-sm">
                      {obra}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-beige-dark">
                <button 
                  onClick={() => {
                    setArtesanoSeleccionado(null);
                    setVistaActual('Catálogo de Productos');
                  }}
                  className="w-full bg-coffee hover:bg-coffee-light text-white py-4 rounded-xl font-bold tracking-wide transition-all hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 text-lg"
                >
                  Ver Productos en el Catálogo <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR DEL CARRITO */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isCarritoOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCarritoOpen(false)}></div>
        <div className={`absolute top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isCarritoOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 border-b border-beige-dark flex justify-between items-center bg-beige">
            <h2 className="font-serif text-2xl text-coffee font-bold">Tu Carrito</h2>
            <button onClick={() => setIsCarritoOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors text-coffee">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {carrito.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-coffee-light text-center">
                <ShoppingCart className="w-16 h-16 text-beige-dark mb-4" />
                <p className="text-xl font-serif text-coffee mb-2">Aún no has agregado productos</p>
                <p className="text-sm">Explora nuestro catálogo para descubrir obras únicas.</p>
                <button onClick={() => { setIsCarritoOpen(false); cambiarVista('Catálogo de Productos'); }} className="mt-8 bg-coffee text-white px-6 py-2 rounded-full font-medium">
                  Ir al Catálogo
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {carrito.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center bg-beige p-3 rounded-2xl">
                    <img src={item.imagen} alt={item.nombre} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                    <div className="flex-1">
                      <h4 className="font-medium text-coffee leading-tight mb-1">{item.nombre}</h4>
                      <p className="font-serif font-bold text-moss">C$ {item.precio}</p>
                    </div>
                    <button onClick={() => eliminarDelCarrito(idx)} className="p-2 text-terracotta hover:bg-white rounded-full transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {carrito.length > 0 && (
            <div className="p-6 border-t border-beige-dark bg-beige">
              <div className="flex justify-between items-center mb-6">
                <span className="text-coffee font-medium text-lg">Total a pagar:</span>
                <span className="font-serif text-3xl text-coffee font-bold">C$ {carrito.reduce((sum, item) => sum + item.precio, 0)}</span>
              </div>
              <button className="w-full bg-moss hover:bg-emerald-700 text-white py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg flex justify-center items-center gap-2">
                Proceder al Pago <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER GLOBAL */}
      <footer className="bg-coffee text-white pt-16 pb-8 px-6 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-8 h-8 text-terracotta-light" />
                <span className="font-serif text-3xl font-bold tracking-wide">Ollnari</span>
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                Conectando las raíces culturales de Nicaragua con el mundo a través de la tecnología y el comercio justo.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-terracotta transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-terracotta transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-terracotta transition-colors"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-serif text-xl mb-6 font-bold">Enlaces Rápidos</h4>
              <ul className="space-y-3 text-white/70">
                <li><button onClick={() => cambiarVista('Inicio')} className="hover:text-terracotta-light transition-colors">Inicio</button></li>
                <li><button onClick={() => cambiarVista('Catálogo de Productos')} className="hover:text-terracotta-light transition-colors">Catálogo</button></li>
                <li><button onClick={() => cambiarVista('Nuestros Artesanos')} className="hover:text-terracotta-light transition-colors">Artesanos</button></li>
                <li><button onClick={() => cambiarVista('Acerca de Nosotros')} className="hover:text-terracotta-light transition-colors">Acerca de Nosotros</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-xl mb-6 font-bold">Contacto</h4>
              <p className="text-white/70 mb-4">¿Tienes dudas o quieres unirte como artesano?</p>
              <a href="tel:+50575433467" className="inline-flex items-center gap-3 bg-terracotta hover:bg-terracotta-light text-white px-6 py-3 rounded-full font-medium transition-colors">
                Llámanos: +505 7543 3467
              </a>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p>&copy; {new Date().getFullYear()} Proyecto Ollnari. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Políticas de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
