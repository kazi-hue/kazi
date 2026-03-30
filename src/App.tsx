/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Wifi, Utensils, ParkingCircle, Clock, ConciergeBell, 
  Instagram, Facebook, Twitter, MapPin, Phone, Mail, ChevronRight,
  Star, Coffee, Wind, ShieldCheck, ArrowRight, Play
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import SkyBackground from './components/SkyBackground';

// --- Reusable Components ---

const AnimatedButton = ({ children, href, variant = 'primary', className = '' }: { children: React.ReactNode, href: string, variant?: 'primary' | 'outline' | 'ghost', className?: string }) => {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-primary hover:bg-primary/5"
  };

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.95, rotate: -1 }}
      className={`relative inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold tracking-wide transition-all duration-300 group ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ArrowRight size={18} />
        </motion.span>
      </span>
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
        />
      )}
    </motion.a>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Rooms', href: '#rooms' },
    { name: 'Dining', href: '#dining' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Booking', href: '#booking' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`relative flex justify-between items-center px-8 py-4 rounded-full transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-white/20' : 'bg-transparent'}`}>
            <div className="flex-shrink-0 z-[60]">
              <a href="#home" onClick={() => setIsOpen(false)} className={`text-2xl font-serif font-bold tracking-tighter transition-colors duration-500 ${scrolled || isOpen ? 'text-primary' : 'text-white'}`}>
                CHIYA<span className="text-gold">BAGAN</span>
              </a>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-10">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 hover:text-gold ${scrolled ? 'text-earth' : 'text-white/90'}`}
                  >
                    {link.name}
                  </a>
                ))}
                <a href="#booking" className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${scrolled ? 'bg-primary text-white hover:bg-gold' : 'bg-white text-primary hover:bg-gold hover:text-white'}`}>
                  Book Now
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden z-[60]">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-full transition-colors ${scrolled || isOpen ? 'text-earth hover:bg-primary/5' : 'text-white hover:bg-white/10'}`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[40] bg-secondary md:hidden flex flex-col justify-center px-8"
          >
            <div className="flex flex-col space-y-8 mt-16">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="text-4xl font-serif text-primary hover:text-gold transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + navLinks.length * 0.1, duration: 0.5 }}
                className="pt-8 border-t border-primary/10"
              >
                <a href="#booking" onClick={() => setIsOpen(false)} className="inline-block w-full text-center bg-primary text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gold transition-colors">
                  Book Your Stay
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 left-8 right-8 flex justify-between items-center text-primary/50 text-sm"
            >
              <span>Ilam, Nepal</span>
              <div className="flex space-x-4">
                <Instagram size={20} className="hover:text-gold transition-colors cursor-pointer" />
                <Facebook size={20} className="hover:text-gold transition-colors cursor-pointer" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-primary">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544735047-3829e5d3c242?auto=format&fit=crop&q=80&w=1920"
          alt="Tea Garden"
          className="w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-primary/40"></div>
      </motion.div>
      
      <div className="relative z-10 text-center px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-6 py-2 rounded-full border border-white/20 text-white/90 uppercase tracking-[0.5em] text-[10px] font-extrabold mb-10 backdrop-blur-md bg-white/5">
            Est. 1998 • Ilam, Nepal
          </span>
          <h1 className="text-7xl md:text-[11rem] text-white font-serif leading-[0.8] mb-10 tracking-[-0.04em] drop-shadow-2xl">
            Chiya <span className="italic font-normal text-gold drop-shadow-none">Bagan</span>
          </h1>
          <p className="text-white/90 text-xl md:text-3xl max-w-3xl mx-auto mb-16 font-sans font-light leading-relaxed tracking-tight drop-shadow-lg">
            Where the morning mist meets the emerald hills. 
            <span className="block mt-2 text-white/70 text-lg md:text-xl font-medium tracking-wide">Discover a sanctuary of peace in the heart of the Himalayas.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <AnimatedButton href="#booking" className="shadow-2xl shadow-primary/40">
              Explore Rooms
            </AnimatedButton>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-5 text-white group"
            >
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all duration-700 backdrop-blur-sm bg-white/5 shadow-xl">
                <Play size={22} fill="currentColor" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] group-hover:text-gold transition-colors">Watch Film</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-12 hidden lg:block"
      >
        <div className="glass p-6 rounded-2xl max-w-[200px]">
          <div className="flex text-gold mb-2"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
          <p className="text-white text-xs font-medium">"A truly ethereal experience. The tea tours are a must."</p>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to Discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
      </motion.div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-32 bg-secondary/80 backdrop-blur-md overflow-hidden relative">
    {/* Animated Background Blobs */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px] animate-float-delayed"></div>
    </div>

    <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">Our Heritage</span>
          <h2 className="text-5xl md:text-7xl font-serif text-primary mb-8 leading-tight">A Legacy Steeped in <span className="italic">Nature</span></h2>
          <p className="text-earth/80 text-lg mb-8 leading-relaxed font-light">
            Chiya Bagan Hotel is more than just a place to stay; it's an immersion into the tranquil beauty of the Eastern Himalayas. Nestled within rolling hills of emerald tea bushes, our hotel offers a unique blend of heritage charm and modern luxury.
          </p>
          <p className="text-earth/80 text-lg mb-12 leading-relaxed font-light">
            Whether you're here to witness the sunrise over the Kanchenjunga, explore the local culture, or simply unwind with a cup of the world's finest tea, we provide the perfect backdrop for unforgettable memories.
          </p>
          <div className="flex gap-12">
            <div>
              <h4 className="text-4xl font-serif text-primary mb-2">15+</h4>
              <p className="text-earth/40 text-[10px] uppercase font-bold tracking-widest">Years of Excellence</p>
            </div>
            <div className="w-[1px] h-12 bg-gray-200"></div>
            <div>
              <h4 className="text-4xl font-serif text-primary mb-2">5k+</h4>
              <p className="text-earth/40 text-[10px] uppercase font-bold tracking-widest">Global Guests</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1585089845349-112cb11b11b5?auto=format&fit=crop&q=80&w=800"
              alt="Traditional Nepali Architecture"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-12 -left-12 bg-white p-10 rounded-3xl shadow-2xl hidden md:block max-w-[300px] border border-gray-50"
          >
            <div className="text-gold mb-4 flex gap-1"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
            <p className="text-primary font-serif italic text-xl mb-4">"The best tea garden experience I've ever had."</p>
            <p className="text-earth/40 text-[10px] uppercase font-bold tracking-widest">- Sarah Jenkins</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Rooms = () => {
  const rooms = [
    {
      title: "Deluxe Garden View",
      price: "$120",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
      description: "Spacious room with a private balcony overlooking the lush tea gardens.",
      amenities: ["King Bed", "Free WiFi", "Mini Bar", "Garden View"]
    },
    {
      title: "Luxury Suite",
      price: "$250",
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800",
      description: "Our most premium offering with a separate living area and mountain views.",
      amenities: ["King Bed", "Jacuzzi", "Private Lounge", "Mountain View"]
    },
    {
      title: "Cozy Tea Cottage",
      price: "$180",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
      description: "A standalone cottage for ultimate privacy and a rustic feel.",
      amenities: ["Queen Bed", "Fireplace", "Private Porch", "Nature Sound"]
    }
  ];

  return (
    <section id="rooms" className="py-32 bg-white/80 backdrop-blur-md relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] animate-float-delayed"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px] animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div className="max-w-2xl">
            <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">Accommodation</span>
            <h2 className="text-5xl md:text-7xl font-serif text-primary leading-tight">Refined <span className="italic">Living</span></h2>
          </div>
          <div className="mt-8 md:mt-0">
            <AnimatedButton href="#booking" variant="outline">View All Rooms</AnimatedButton>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {rooms.map((room, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.98 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-secondary rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700"
            >
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl">
                  <span className="text-primary font-bold text-lg">{room.price}</span>
                  <span className="text-earth/40 text-[10px] uppercase font-bold tracking-widest"> / night</span>
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-serif text-primary mb-4">{room.title}</h3>
                <p className="text-earth/60 text-sm mb-8 leading-relaxed font-light">{room.description}</p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {room.amenities.map((amenity, i) => (
                    <span key={i} className="text-[9px] uppercase font-bold tracking-[0.15em] bg-white px-4 py-2 rounded-full text-accent border border-accent/10">
                      {amenity}
                    </span>
                  ))}
                </div>
                <motion.a 
                  href="#booking" 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-xs group/link"
                >
                  Check Availability 
                  <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all duration-300">
                    <ArrowRight size={14} />
                  </div>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { icon: <Wifi size={28} />, title: "High-Speed WiFi", desc: "Seamless connectivity in every corner of the estate." },
    { icon: <Utensils size={28} />, title: "Fine Dining", desc: "Organic farm-to-table cuisine prepared by master chefs." },
    { icon: <ParkingCircle size={28} />, title: "Valet Parking", desc: "Secure and effortless parking for all our guests." },
    { icon: <Clock size={28} />, title: "Concierge 24/7", desc: "Dedicated support for your every whim and desire." },
    { icon: <ConciergeBell size={28} />, title: "In-Room Dining", desc: "Exquisite meals served in the privacy of your suite." },
    { icon: <Coffee size={28} />, title: "Tea Sommelier", desc: "Guided tastings of the world's finest Ilam teas." }
  ];

  return (
    <section className="py-32 bg-primary/90 backdrop-blur-md text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">Our Amenities</span>
          <h2 className="text-5xl md:text-7xl font-serif leading-tight">Curated <span className="italic">Experiences</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.95, y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="mb-8 relative inline-block">
                <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative text-gold group-hover:text-white transition-colors duration-500">
                  {service.icon}
                </div>
              </div>
              <h4 className="text-2xl font-serif mb-4 group-hover:text-gold transition-colors duration-300">{service.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed font-light">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Dining = () => {
  const menuItems = [
    {
      name: "Thakali Dal Bhat",
      desc: "Authentic Nepali thali with lentil soup, rice, seasonal vegetable curries, and homemade pickles.",
      price: "Rs. 850",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Himalayan Momo",
      desc: "Steamed dumplings filled with spiced meat or vegetables, served with a tangy tomato and sesame achar.",
      price: "Rs. 450",
      image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Dhindo & Local Chicken",
      desc: "Traditional buckwheat porridge paired with a rich, slow-cooked local chicken curry.",
      price: "Rs. 950",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Ilam Tea & Sel Roti",
      desc: "Freshly brewed organic Ilam tea served with traditional sweet, ring-shaped rice bread.",
      price: "Rs. 350",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="dining" className="py-32 bg-secondary/80 backdrop-blur-md relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-24">
          <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">Culinary Journey</span>
          <h2 className="text-5xl md:text-7xl font-serif text-primary leading-tight">Authentic <span className="italic">Nepali Dining</span></h2>
          <p className="mt-6 text-earth/70 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the rich, diverse flavors of Nepal. Our menu features traditional recipes passed down through generations, prepared with fresh, locally sourced ingredients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {menuItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group flex flex-col sm:flex-row gap-6 items-center sm:items-start"
            >
              <div className="w-full sm:w-48 h-48 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-lg">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col justify-center flex-grow pt-2 w-full">
                <div className="flex justify-between items-baseline mb-3 border-b border-primary/10 pb-3">
                  <h3 className="text-2xl font-serif text-primary group-hover:text-gold transition-colors">{item.name}</h3>
                  <span className="text-gold font-bold tracking-wider whitespace-nowrap ml-4">{item.price}</span>
                </div>
                <p className="text-earth/60 text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    { url: "https://images.unsplash.com/photo-1544735047-3829e5d3c242?auto=format&fit=crop&q=80&w=800", size: "large" },
    { url: "https://images.unsplash.com/photo-1585089845349-112cb11b11b5?auto=format&fit=crop&q=80&w=800", size: "small" },
    { url: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&q=80&w=800", size: "small" },
    { url: "https://images.unsplash.com/photo-1518182170546-076616fd61fd?auto=format&fit=crop&q=80&w=800", size: "small" },
    { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800", size: "large" },
    { url: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=800", size: "small" }
  ];

  return (
    <section id="gallery" className="py-32 bg-secondary/80 backdrop-blur-md relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] w-[35%] h-[35%] bg-gold/5 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[35%] h-[35%] bg-accent/5 rounded-full blur-[120px] animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-24">
          <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">Visual Journey</span>
          <h2 className="text-5xl md:text-7xl font-serif text-primary leading-tight">The <span className="italic">Estate</span></h2>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg"
            >
              <img
                src={img.url}
                alt={`Gallery ${index}`}
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-primary scale-0 group-hover:scale-100 transition-transform duration-500">
                  <ChevronRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', checkIn: '', checkOut: '', guests: '1', roomType: 'deluxe'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Booking request sent! We will contact you shortly.');
  };

  return (
    <section id="booking" className="py-32 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-primary rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="lg:w-2/5 p-16 lg:p-24 bg-primary text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight relative z-10">Begin Your <span className="italic">Journey</span></h2>
            <p className="text-white/50 mb-12 leading-relaxed font-light relative z-10">
              Plan your perfect getaway with us. Fill out the form and our concierge team will handle the rest. We look forward to welcoming you to Chiya Bagan.
            </p>
            <div className="space-y-8 relative z-10">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold"><ShieldCheck size={24} /></div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest">Secure Booking</p>
                  <p className="text-xs text-white/40">Your data is encrypted</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold"><Clock size={24} /></div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest">Instant Response</p>
                  <p className="text-xs text-white/40">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-3/5 p-16 lg:p-24 bg-secondary">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-earth/40 mb-3">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-white border-b border-earth/10 px-0 py-4 focus:outline-none focus:border-gold transition-colors font-serif text-xl"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-earth/40 mb-3">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full bg-white border-b border-earth/10 px-0 py-4 focus:outline-none focus:border-gold transition-colors font-serif text-xl"
                  placeholder="hello@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-earth/40 mb-3">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="w-full bg-white border-b border-earth/10 px-0 py-4 focus:outline-none focus:border-gold transition-colors font-serif text-xl"
                  placeholder="+1 234 567 890"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-earth/40 mb-3">Check-In</label>
                <input
                  type="date"
                  required
                  className="w-full bg-white border-b border-earth/10 px-0 py-4 focus:outline-none focus:border-gold transition-colors text-lg"
                  value={formData.checkIn}
                  onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-earth/40 mb-3">Check-Out</label>
                <input
                  type="date"
                  required
                  className="w-full bg-white border-b border-earth/10 px-0 py-4 focus:outline-none focus:border-gold transition-colors text-lg"
                  value={formData.checkOut}
                  onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 mt-8">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-6 rounded-2xl font-bold uppercase tracking-[0.3em] text-xs hover:bg-gold transition-all duration-500 shadow-2xl shadow-primary/20"
                >
                  Request Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="py-24 bg-secondary/80 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <span className="text-accent uppercase tracking-widest text-sm font-bold mb-4 block">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-10">Contact Us</h2>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="bg-white p-4 rounded-2xl shadow-sm text-primary"><MapPin size={24} /></div>
              <div>
                <h4 className="text-lg font-serif mb-1">Location</h4>
                <p className="text-earth/60">Tea Garden Road, Ilam, Nepal</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="bg-white p-4 rounded-2xl shadow-sm text-primary"><Phone size={24} /></div>
              <div>
                <h4 className="text-lg font-serif mb-1">Phone</h4>
                <p className="text-earth/60">9768330156</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="bg-white p-4 rounded-2xl shadow-sm text-primary"><Mail size={24} /></div>
              <div>
                <h4 className="text-lg font-serif mb-1">Email</h4>
                <p className="text-earth/60">sushankunwar354@gmail.com</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 h-64 rounded-3xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56904.30132338604!2d87.89269415!3d26.91253455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e44a1420138433%3A0x62952db7b401272!2sIlam%2042700%2C%20Nepal!5e0!3m2!1sen!2sus!4v1710410000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        
        <div className="bg-white p-12 rounded-[2rem] shadow-sm">
          <h3 className="text-2xl font-serif text-primary mb-8">Send a Message</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-earth/50 mb-2">Your Name</label>
              <input type="text" className="w-full bg-secondary border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-earth/50 mb-2">Email Address</label>
              <input type="email" className="w-full bg-secondary border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-earth/50 mb-2">Message</label>
              <textarea rows={5} className="w-full bg-secondary border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none resize-none" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-accent transition-all duration-300">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-primary/90 backdrop-blur-md text-white py-32 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-serif font-bold tracking-tighter mb-8">CHIYA<span className="text-gold">BAGAN</span></h2>
          <p className="text-white/40 text-sm leading-relaxed mb-10 font-light">
            A boutique hotel experience nestled in the serene tea gardens of Ilam. Discover peace, luxury, and nature combined in a sanctuary of refined living.
          </p>
          <div className="flex space-x-6">
            <motion.a whileHover={{ y: -3 }} href="#" className="text-white/40 hover:text-gold transition-colors"><Facebook size={20} /></motion.a>
            <motion.a whileHover={{ y: -3 }} href="#" className="text-white/40 hover:text-gold transition-colors"><Instagram size={20} /></motion.a>
            <motion.a whileHover={{ y: -3 }} href="#" className="text-white/40 hover:text-gold transition-colors"><Twitter size={20} /></motion.a>
          </div>
        </div>
        
        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-gold mb-10">Navigation</h4>
          <ul className="space-y-6 text-white/40 text-sm font-light">
            <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#rooms" className="hover:text-white transition-colors">Rooms & Suites</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">Our Heritage</a></li>
            <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-gold mb-10">Contact</h4>
          <ul className="space-y-6 text-white/40 text-sm font-light">
            <li className="flex items-center gap-4"><MapPin size={16} className="text-gold" /> Ilam, Nepal</li>
            <li className="flex items-center gap-4"><Phone size={16} className="text-gold" /> 9768330156</li>
            <li className="flex items-center gap-4"><Mail size={16} className="text-gold" /> sushankunwar354@gmail.com</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-gold mb-10">Newsletter</h4>
          <p className="text-white/40 text-sm mb-8 font-light">Join our inner circle for exclusive offers and seasonal updates.</p>
          <div className="relative">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-white/5 border-b border-white/10 px-0 py-4 text-sm focus:outline-none focus:border-gold transition-colors outline-none"
            />
            <button className="absolute right-0 bottom-4 text-gold hover:text-white transition-colors">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold">
        <p>&copy; {new Date().getFullYear()} Chiya Bagan Hotel. All rights reserved.</p>
        <div className="flex gap-10">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen relative">
      <SkyBackground />
      <Navbar />
      <Hero />
      <About />
      <Rooms />
      <Services />
      <Dining />
      <Gallery />
      <Booking />
      <Contact />
      <Footer />
    </div>
  );
}
