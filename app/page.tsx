'use client';
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [currentGallerySlide, setCurrentGallerySlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', location: '', message: '' });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageZoom, setImageZoom] = useState(1);
  const slides = [
    {
      src: "/sliderone.jpg",
      alt: "Slide 1",
      title: "Welcome to Our World",
      description: "Discover innovative solutions that transform your business and drive success forward with cutting-edge technology."
    },
    {
      src: "/slidertwo.jpg",
      alt: "Slide 2",
      title: "Excellence in Every Detail",
      description: "Experience premium quality and unmatched service that exceeds expectations and delivers outstanding results."
    },
    {
      src: "/sliderthree.jpg",
      alt: "Slide 3",
      title: "Your Success is Our Mission",
      description: "Partner with us to achieve your goals through strategic planning, expert guidance, and dedicated support."
    }
  ];

  const products = [
    {
      title: "Kirloskar",
      desc: "• Enclosed diesel power generators\n• From 30kva – 250kva\n• Ultimate Convenience with AMF\n• Status Indicators",
      image: "/kirloskar.jpg",
      icon: "🏭"
    },
    {
      title: "Cummins",
      desc: "• Enclosed diesel power generators\n• From 30kva – 250kva\n• Ultimate Convenience with AMF\n• Low emission",
      image: "/cummin.jpg",
      icon: "⚙️"
    },
    {
      title: "Mahindra Power Generators",
      desc: "• Enclosed diesel power generators\n• From 30kva – 250kva\n• Robust design for optimal functioning under the most extreme conditions\n• Fuel Efficient",
      image: "/images.jpeg",
      icon: "⚡"
    },
    // {
    //   title: "Parts & Accessories",
    //   desc: "• Comprehensive range of genuine parts and accessories\n• Maintain peak performance of your equipment\n• Professional installation and support\n• Quality guaranteed components",
    //   image: "/product4.png", 
    //   icon: "🔧"
    // },
    {
      title: "Ashok Leyland",
      desc: "• Enclosed diesel power generators\n• From 30kva – 250kva\n• Ultimate Convenience with AMF\n• Status Indicators",
      image: "/asok.webp",
      icon: "🚚"
    }
  ];

  const galleryImages = [
    "/gal1.jpg",
    "/gal2.jpg",
    "/gal3.jpg",
    "/gal4.jpg",
    "/gallery/gal1.jpg",
    "/gallery/gal2.jpg",
    "/gallery/gal3.jpg",
    "/gallery/gal4.jpg",
    "/gallery/gal5.jpg",
    "/gallery/gal6.jpg",
    "/gallery/gal7.jpg",
    "/gallery/gal8.jpg",
    "/gallery/gal9.jpg",
    "/gallery/gal10.jpg",
    "/gallery/gal11.jpg",
    "/gallery/gal12.jpg",
    "/gallery/gal13.jpg",
    "/gallery/gal14.jpg",
    "/gallery/gal15.jpg",

  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const productTimer = setInterval(() => {
      setCurrentProductSlide((prev) => {
        const next = prev + 1;
        if (next >= products.length) {
          setTimeout(() => setCurrentProductSlide(0), 500);
          return next;
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(productTimer);
  }, [products.length]);

  useEffect(() => {
    const galleryTimer = setInterval(() => {
      setCurrentGallerySlide((prev) => {
        const totalSlides = Math.ceil(galleryImages.length / 4);
        if (prev >= totalSlides - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 10000); // Slower transition - 5 seconds
    return () => clearInterval(galleryTimer);
  }, [galleryImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextProductSlide = () => {
    setCurrentProductSlide((prev) => {
      const next = prev + 1;
      if (next >= products.length) {
        setTimeout(() => setCurrentProductSlide(0), 500);
        return next;
      }
      return next;
    });
  };

  const prevProductSlide = () => {
    setCurrentProductSlide((prev) => {
      if (prev <= 0) {
        setTimeout(() => setCurrentProductSlide(products.length - 1), 500);
        return -1;
      }
      return prev - 1;
    });
  };

  const nextGallerySlide = () => {
    const totalSlides = Math.ceil(galleryImages.length / 4);
    setCurrentGallerySlide((prev) => (prev + 1) % totalSlides);
  };

  const prevGallerySlide = () => {
    const totalSlides = Math.ceil(galleryImages.length / 4);
    setCurrentGallerySlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const openImagePopup = (image: string) => {
    setSelectedImage(image);
    setImageZoom(1);
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
    setImageZoom(1);
  };

  const zoomIn = () => {
    setImageZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setImageZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = () => {
    setImageZoom(1);
  };

  // Smooth scroll function with offset for sticky header
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Account for sticky header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    // Close mobile menu after clicking
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      mobile: "9876543210", // Placeholder value
      location: "Chennai" // Placeholder value
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL ;
      if (!apiUrl) throw new Error('API URL is not defined');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', mobile: '', location: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  // Responsive items per slide for carousel
  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth >= 768 ? 4 : 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen w-full font-sans">
      {/* Navigation Bar */}
      <header className="flex items-center justify-between px-6 py-2 bg-white/90 backdrop-blur-md shadow-lg shadow-[#eb3337]/20 border-b border-[#eb3337]/10 sticky top-0 z-50 transition-all duration-300" style={{
        background: "linear-gradient(45deg, #00000000, #3c77af)"
      }}>
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="NMD Logo" width={150} height={100} />
          {/* <span className="text-3xl font-bold text-red-600 tracking-tight animate-pulse">NMD</span> */}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex gap-6 text-gray-700 font-medium text-base">
            <li>
              <button
                onClick={() => scrollToSection('home')}
                className="text-white hover:text-red-600 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('products')}
                className="text-white hover:text-red-600 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-pointer"
              >
                Products
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('services')}
                className="text-white hover:text-red-600 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-pointer"
              >
                Services
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-red-600 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-pointer"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-white hover:text-red-600 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-pointer"
              >
                Gallery
              </button>
            </li>
            {/* <li>
              <button
                onClick={() => scrollToSection('testimonial')}
                className="text-white hover:text-red-600 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-pointer"
              >
                Testimonial
              </button>
            </li> */}
            {/* <li>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="text-white hover:text-red-600 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-pointer"
              >
                FAQ
              </button>
            </li> */}
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-red-600 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-pointer"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center space-y-1 group"
          aria-label="Toggle mobile menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''
              }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
          ></span>
        </button>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl shadow-[#eb3337]/20 border-b border-[#eb3337]/10 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
          <nav className="px-6 py-4">
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="block w-full text-left py-3 px-4 text-gray-700 font-medium hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('products')}
                  className="block w-full text-left py-3 px-4 text-gray-700 font-medium hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="block w-full text-left py-3 px-4 text-gray-700 font-medium hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="block w-full text-left py-3 px-4 text-gray-700 font-medium hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="block w-full text-left py-3 px-4 text-gray-700 font-medium hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonial')}
                  className="block w-full text-left py-3 px-4 text-gray-700 font-medium hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                >
                  Testimonial
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="block w-full text-left py-3 px-4 text-gray-700 font-medium hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left py-3 px-4 text-gray-700 font-medium hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Full Screen Carousel Section */}
      <section id="home" className="relative w-full h-[650px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover w-full h-full"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Left side content overlay with #eb3337 background */}
        <div className="absolute left-0 top-0 w-full md:w-1/2 h-full bg-[#eb3337]/20 backdrop-blur-sm flex items-center justify-start p-8 md:p-12 z-10 animate-fadeIn" style={{
          opacity: 0.9,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          boxShadow: 'inset 0 0 50px rgba(235, 51, 55, 0.3)'
        }}>
          <div className="text-white max-w-lg animate-slideInLeft">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight drop-shadow-2xl">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed drop-shadow-lg">
              {slides[currentSlide].description}
            </p>
            <button className="bg-white/90 backdrop-blur-sm text-[#eb3337] font-semibold px-8 py-3 rounded-lg hover:bg-white hover:scale-105 transition-all duration-300 text-lg shadow-2xl shadow-[#eb3337]/30 border border-white/20 cursor-pointer" onClick={() => scrollToSection('contact')} >
              Contact
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full w-12 h-12 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-2xl shadow-[#eb3337]/30 border border-white/20 z-20 cursor-pointer"
        >
          &#8249;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full w-12 h-12 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-2xl shadow-[#eb3337]/30 border border-white/20 z-20 cursor-pointer"
        >
          &#8250;
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white shadow-2xl shadow-[#eb3337]/50 scale-125 border-2 border-[#eb3337]/30' : 'bg-white/60 hover:bg-white/80 hover:scale-110 backdrop-blur-sm'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-22 px-6 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        <h3 className="text-2xl font-bold text-center my-10 text-gray-900 drop-shadow-sm">Our Products</h3>
        <div className="relative max-w-full mx-auto">
          {/* Multi-Product Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentProductSlide * (100 / itemsPerSlide)}%)`
              }}
            >
              {[...products, ...products, ...products].map((product, index) => (
                <div key={index} className="w-full md:w-1/4 flex-shrink-0 px-2">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center shadow-2xl shadow-[#eb3337]/20 hover:shadow-2xl hover:shadow-[#eb3337]/30 transition-all duration-500 border border-white/30 hover:scale-105 hover:-translate-y-2 group min-h-[430px]">
                    <div className="w-40 h-40 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-[#eb3337] to-[#d12832] flex items-center justify-center relative shadow-lg shadow-[#eb3337]/40 group-hover:shadow-xl group-hover:shadow-[#eb3337]/50 transition-all duration-300">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h4 className="font-bold text-lg mb-3 text-gray-900 group-hover:text-[#eb3337] transition-colors duration-300">{product.title}</h4>
                    <div className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                      {product.desc.includes('•') ? (
                        <ul className="text-left space-y-1">
                          {product.desc.split('\n').map((point, idx) => (
                            <li key={idx} className="text-[16px]">{point}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[16px]">{product.desc}</p>
                      )}
                    </div>
                    <button className="mt-auto bg-[#eb3337] text-white px-6 py-2 rounded-lg hover:bg-[#d12832] hover:scale-105 transition-all duration-300 text-sm font-medium shadow-lg shadow-[#eb3337]/30 hover:shadow-xl hover:shadow-[#eb3337]/40 border border-[#eb3337]/20 cursor-pointer" onClick={() => scrollToSection('contact')}>
                      Contact
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevProductSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-[#eb3337] rounded-full w-12 h-12 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-2xl shadow-[#eb3337]/30 border border-[#eb3337]/20 z-10 cursor-pointer"
          >
            &#8249;
          </button>
          <button
            onClick={nextProductSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-[#eb3337] rounded-full w-12 h-12 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-2xl shadow-[#eb3337]/30 border border-[#eb3337]/20 z-10 cursor-pointer"
          >
            &#8250;
          </button>


        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-16 px-6 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#eb3337]/5 to-transparent"></div>
        <h3 className="text-2xl font-bold text-center mb-10 relative z-10 drop-shadow-sm text-[#000]">
          Our Services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
          {[
            {
              title: "Installation",
              desc: "Expert installation service to ensure optimal performance. Automated control panel are customized by our technical team during installation for generator switching. Generators rental for monthly and yearly basis is installed within 2-5 business day. Generator rental for daily basis is installed as trolley mounted in accordance to the customer’s need.",
              image: "/gallery/installation.jpg",
              icon: "🏭",
            },
            {
              title: "Maintenance",
              desc: "Generators on rental will be on regularmaintenance plans to upheld our equipment in top condition. Generators are coated with weather proof to ensure uninterrupted service during the time of tough weather conditions. Annual maintenance contract is also done. Rental generator radiators are maintained pre-eminent.",
              image: "/gallery/maintanence.jpg",
              icon: "⚙️",
            },
            {
              title: "Technical support",
              desc: "We also do consultation services for choosing appropriate type of Generator for specifics needs based on load calculation done by our skilled professionals. We also recommend Generator sales in Chennai and across Tamil Nadu for choosing the right quality Generator based on various criteria such as fuel efficiency, low noise, eco-friendly, low maintenance, long term availability of spares in the market etc,.",
              image: "/ser3.jpg",
              icon: "⚡",
            },
            {
              title: "Re-winding",
              desc: "AC and DC electrical motors rewinding are done. High-tension and Low-tension motor shop. All types of alternator re-winding are done.",
              image: "/gallery/rewinding.jpeg",
              icon: "🔧",
            },
            {
              title: "Rental",
              desc: "We also come up with rental for Bosch pipe cutter, paint mixing machine, air compressor, welding machine, inverter welding machine, demolishing machine, hand grinder, car polishing machine.",
              image: "/gallery/rental.jpg",
              icon: "🔧",
            },
            {
              title: "Parts and accessories",
              desc: "All types of enclosed diesel power generator spare parts available for sale and services. The service is provided by our enhanced technical team upon inspection. We also sell spares and deliver restoring services to all kinds of welding, grinder and demolishing machines.",
              image: "/gallery/parts and accessory.jpeg",
              icon: "🔧",
            },

          ].map((service, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center group p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#eb3337]/30 transition-all duration-300"
            >
              {/* Image/Icon */}
              <div className="relative w-36 h-36 mb-4 flex items-center justify-center">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-36 h-36 object-cover border border-gray-200 shadow-md group-hover:scale-110 transition-transform duration-300"
                />
                {/* <span className="absolute -bottom-2 right-0 text-2xl">
            {service.icon}
          </span> */}
              </div>

              {/* Title */}
              <h4 className="font-bold mb-2 group-hover:text-[#eb3337] transition-colors duration-300 text-lg text-[#000]">
                {service.title}
              </h4>

              {/* Description */}
              <p className="text-gray-600 text-[16px]">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* About Us Section */}
      <section id="about" className="py-16 px-6 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-[#eb3337]/5 to-transparent"></div>
        <h3 className="text-2xl font-bold text-center mb-2 relative z-10 drop-shadow-sm text-[#000]">About Us</h3>
        <h5 className="text-[20px] font-bold text-center mb-10 relative z-10 drop-shadow-sm text-[#000]">Welcome to NMD Electrical services</h5>
        <div className="max-w-7xl mx-auto text-center text-gray-700 relative z-10 bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-2xl shadow-[#eb3337]/10 border border-white/30">
          Founded in 1967 as an electric and wiring service
          provider from small to medium scale business in
          Chennai. NMD Electricals services has provided
          startling generator service to the businesses in need of
          power.
          Our mission is to deliver consistent power and reliable
          solutions that enhance the productivity and efficiency of
          our clients. Over 58 years of industry experience and
          countless client handling with rigorous quality control
          and management.<br></br>
          The ultimate aim of our company is to provide best
          quality generator rental service in Chennai, Tamil Nadu
          and ensure highest customer satisfaction, for which we
          NMD electrical services and NMD power work round the
          clock.
          Here at NMD Electricals service we have committed
          ourselves for the soul purpose of ensuring uninterrupted power supply even during disaster and calamity times
          like cyclones, floods and the recent pandemic situation.
        </div>
      </section>


      <section id="about" className="py-16 px-6 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-[#eb3337]/5 to-transparent"></div>
        <h3 className="text-2xl font-bold text-center mb-2 relative z-10 drop-shadow-sm text-[#000]"> Why choose us? </h3>

        <div className="max-w-7xl mx-auto text-center text-gray-700 relative z-10 bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-2xl shadow-[#eb3337]/10 border border-white/30">
          Dedicated support team available 24/7. Emergency
          situations are addressed promptly with utmost
          importance and care. For small business to large scale
          operations, we’re the right fit for you because our
          platform is specifically designed to handle the unique
          challenges of rapid growth while keeping costs
          manageable.
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="py-16 px-6 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#eb3337]/5 to-transparent"></div>
        <h3 className="text-2xl font-bold text-center mb-10 relative z-10 drop-shadow-sm text-[#000]">
          Gallery
        </h3>

        <div className="relative max-w-7xl mx-auto">
          {/* Gallery Slider Container */}
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentGallerySlide * 100}%)`
              }}
            >
              {Array.from({ length: Math.ceil(galleryImages.length / 4) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-4 gap-4">
                    {galleryImages.slice(slideIndex * 4, (slideIndex + 1) * 4).map((image, i) => (
                      <div
                        key={i}
                        className="bg-white/70 backdrop-blur-sm rounded-lg h-58 flex items-center justify-center shadow-xl shadow-[#eb3337]/20 hover:shadow-2xl hover:shadow-[#eb3337]/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-white/30 overflow-hidden group cursor-pointer"
                        onClick={() => openImagePopup(image)}
                      >
                        <Image
                          src={image}
                          alt={`Gallery ${slideIndex * 4 + i + 1}`}
                          fill
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevGallerySlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-[#eb3337] rounded-full w-12 h-12 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-2xl shadow-[#eb3337]/30 border border-[#eb3337]/20 z-10 cursor-pointer"
          >
            &#8249;
          </button>
          <button
            onClick={nextGallerySlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-[#eb3337] rounded-full w-12 h-12 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-2xl shadow-[#eb3337]/30 border border-[#eb3337]/20 z-10 cursor-pointer"
          >
            &#8250;
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {Array.from({ length: Math.ceil(galleryImages.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentGallerySlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentGallerySlide
                    ? 'bg-[#eb3337] shadow-2xl shadow-[#eb3337]/50 scale-125 border-2 border-white'
                    : 'bg-gray-300 hover:bg-[#eb3337]/50 hover:scale-110'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeImagePopup}
        >
          {/* Close Button */}
          <button
            onClick={closeImagePopup}
            className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-[#eb3337] transition-colors duration-300 z-20 w-12 h-12 flex items-center justify-center cursor-pointer"
            aria-label="Close popup"
          >
            &times;
          </button>

          {/* Zoom Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                zoomOut();
              }}
              className="text-white text-2xl font-bold hover:text-[#eb3337] transition-colors duration-300 w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-110"
              aria-label="Zoom out"
            >
              −
            </button>
            <span className="text-white font-semibold min-w-[60px] text-center">
              {Math.round(imageZoom * 100)}%
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                zoomIn();
              }}
              className="text-white text-2xl font-bold hover:text-[#eb3337] transition-colors duration-300 w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-110"
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetZoom();
              }}
              className="text-white text-sm font-semibold hover:text-[#eb3337] transition-colors duration-300 px-3 py-1 cursor-pointer"
              aria-label="Reset zoom"
            >
              Reset
            </button>
          </div>

          {/* Image Container */}
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center overflow-hidden">
            <div 
              className="relative w-full h-full transition-transform duration-300 ease-out"
              style={{ 
                transform: `scale(${imageZoom})`,
                cursor: imageZoom > 1 ? 'move' : 'default'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Gallery Image"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}


      {/* Testimonials Section */}
      {/* <section id="testimonial" className="py-16 px-6 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-[#eb3337]/5 to-transparent"></div>
        <h3 className="text-2xl font-bold text-center mb-10 relative z-10 drop-shadow-sm">Testimonials</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
          {[
            { name: "Alice", text: "Fantastic service and quality products!" },
            { name: "Bob", text: "Highly recommend this company for their professionalism." },
            { name: "Charlie", text: "A wonderful experience from start to finish." },
          ].map((t, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-2xl shadow-[#eb3337]/15 hover:shadow-2xl hover:shadow-[#eb3337]/25 transition-all duration-500 flex flex-col gap-4 border border-white/30 hover:scale-105 hover:-translate-y-2 group">
              <p className="text-gray-700 text-sm">{t.text}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-gradient-to-br from-[#eb3337] to-[#d12832] text-white rounded-full w-8 h-8 flex items-center justify-center text-lg shadow-lg shadow-[#eb3337]/30 group-hover:scale-110 transition-transform duration-300">A</span>
                <span className="font-bold text-gray-800 group-hover:text-[#eb3337] transition-colors duration-300">{t.name}</span>
                <span className="text-gray-500 text-xs">Customer</span>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* FAQ Section */}
      {/* <section id="faq" className="py-16 px-6 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#eb3337]/5 to-transparent"></div>
        <h3 className="text-2xl font-bold text-center mb-10 relative z-10 drop-shadow-sm">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">
          <ul className="space-y-4">
            <li className="flex items-start gap-2 bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-lg shadow-[#eb3337]/10 border border-white/30 hover:shadow-xl hover:shadow-[#eb3337]/20 transition-all duration-300 hover:scale-105"><span className="text-xl text-[#eb3337]">•</span> <span>What services do you offer?</span></li>
            <li className="flex items-start gap-2 bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-lg shadow-[#eb3337]/10 border border-white/30 hover:shadow-xl hover:shadow-[#eb3337]/20 transition-all duration-300 hover:scale-105"><span className="text-xl text-[#eb3337]">•</span> <span>How can I contact you?</span></li>
            <li className="flex items-start gap-2 bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-lg shadow-[#eb3337]/10 border border-white/30 hover:shadow-xl hover:shadow-[#eb3337]/20 transition-all duration-300 hover:scale-105"><span className="text-xl text-[#eb3337]">•</span> <span>Do you provide support?</span></li>
          </ul>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-2xl shadow-[#eb3337]/15 text-gray-700 border border-white/30 hover:shadow-2xl hover:shadow-[#eb3337]/25 transition-all duration-300 hover:scale-105">
            <h4 className="font-bold mb-2 text-[#eb3337]">Need more information?</h4>
            <p className="text-sm">Feel free to reach out to us for any inquiries or additional information regarding our services and products.</p>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-[#eb3337]/5 to-transparent"></div>
        <h3 className="text-2xl font-bold text-center mb-10 relative z-10 drop-shadow-sm text-[#000]">Contact Us</h3>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl shadow-[#eb3337]/15 border border-white/30 hover:shadow-2xl hover:shadow-[#eb3337]/25 transition-all duration-300">
              <h4 className="font-bold text-xl mb-6 text-[#eb3337]">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[#eb3337] text-xl">📧</span>
                  <a
                    href="mailto:nmdgenerators@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-[#eb3337] underline cursor-pointer"
                  >
                    nmdgenerators@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#eb3337] text-xl">📞</span>
                  <a
                    href="https://wa.me/919841073317"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-[#eb3337] underline cursor-pointer"
                  >
                    +91 98410 73317
                  </a>
                  <a
                    href="https://wa.me/916381650216"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-[#eb3337] underline cursor-pointer"
                  >
                    +91 63816 50216
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#eb3337] text-xl">📍</span>
                  <span className="text-gray-700">no.26 Ground Floor,Syed Abdullah street,mount road,Chennai - 600014</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#eb3337] text-xl">🕒</span>
                  <span className="text-gray-700">Mon - Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl shadow-[#eb3337]/15 border border-white/30 hover:shadow-2xl hover:shadow-[#eb3337]/25 transition-all duration-300">
              <h4 className="font-bold text-xl mb-6 text-[#eb3337]">Send Message</h4>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#eb3337] focus:outline-none transition-colors backdrop-blur-sm bg-white/90 text-gray-900 placeholder:text-gray-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#eb3337] focus:outline-none transition-colors backdrop-blur-sm bg-white/90 text-gray-900 placeholder:text-gray-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Your Mobile"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#eb3337] focus:outline-none transition-colors backdrop-blur-sm bg-white/90 text-gray-900 placeholder:text-gray-500"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Your Location"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#eb3337] focus:outline-none transition-colors backdrop-blur-sm bg-white/90 text-gray-900 placeholder:text-gray-500"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#eb3337] focus:outline-none transition-colors backdrop-blur-sm bg-white/90 text-gray-900 placeholder:text-gray-500"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#eb3337] text-white py-3 rounded-lg hover:bg-[#d12832] hover:scale-105 transition-all duration-300 font-semibold shadow-lg shadow-[#eb3337]/30 hover:shadow-xl hover:shadow-[#eb3337]/40"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-200 to-gray-300 py-10 text-center text-xl font-bold text-gray-700 mt-10 relative overflow-hidden shadow-2xl shadow-[#eb3337]/20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#eb3337]/10 to-transparent"></div>
        <div className="relative z-10 backdrop-blur-sm">
          &copy; {new Date().getFullYear()} <span className="text-[#eb3337] drop-shadow-lg">NMD Electrical Services</span>. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
