import { useState, useEffect, useCallback } from 'react';
import './App.css';

/* ─────────────────────────────────────────────────────────────
   PROJECT DATA
───────────────────────────────────────────────────────────── */
const projects = [
  { id: 1,  img: '/photos/project1.jpeg',  label: 'Residential Tower',      tag: 'Structural Work'       },
  { id: 2,  img: '/photos/project2.jpeg',  label: 'High-Rise Complex',      tag: 'Multi-Block Project'   },
  { id: 3,  img: '/photos/project3.jpeg',  label: 'Architectural Design',   tag: 'Elevation & Form'      },
  { id: 4,  img: '/photos/project4.jpeg',  label: 'Mixed-Use Development',  tag: 'Construction Phase'    },
  { id: 5,  img: '/photos/project5.jpeg',  label: 'Integrated Township',    tag: 'Superstructure'        },
  { id: 6,  img: '/photos/project6.jpeg',  label: 'Site Development',       tag: 'Ground Works'          },
  { id: 7,  img: '/photos/project7.jpeg',  label: 'Urban Housing',          tag: 'RCC Framework'         },
  { id: 8,  img: '/photos/project8.jpeg',  label: 'Foundation Works',       tag: 'Sub-Structure'         },
  { id: 9,  img: '/photos/project9.jpeg',  label: 'Deep Foundation',        tag: 'Basement Excavation'   },
  { id: 10, img: '/photos/project10.jpeg', label: 'Raft Foundation',        tag: 'Reinforcement'         },
  { id: 11, img: '/photos/project11.jpeg', label: 'Pile Foundation',        tag: 'Structural Core'       },
  { id: 12, img: '/photos/project12.jpeg', label: 'Material Management',    tag: 'Site Logistics'        },
];

const services = [
  {
    icon: 'fa-building',
    title: 'Real Estate Development',
    desc: 'End-to-end real estate development — from land acquisition and feasibility studies to project delivery. We specialize in premium residential and mixed-use townships.',
  },
  {
    icon: 'fa-hard-hat',
    title: 'Construction & Engineering',
    desc: 'Precision-driven construction with a focus on quality, safety, and timelines. Our in-house teams handle RCC structures, MEP works, and finishing to the highest standards.',
  },
  {
    icon: 'fa-drafting-compass',
    title: 'Architecture & Design',
    desc: 'Contemporary architectural solutions tailored to client vision. We deliver detailed drawings, structural plans, and 3D visualizations that balance aesthetics with function.',
  },
];

const stats = [
  { value: '50+',  label: 'Projects Delivered'  },
  { value: '10M+', label: 'Sq. Ft. Constructed'  },
  { value: '15+',  label: 'Years of Excellence'  },
  { value: '500+', label: 'Happy Families'        },
];

/* ─────────────────────────────────────────────────────────────
   PROJECT TYPES DATA
───────────────────────────────────────────────────────────── */
const projectTypes = [
  {
    icon: 'fa-building',
    title: 'High-Rise Residential',
    desc: 'Multi-storey towers from G+10 to G+40+, delivering premium apartments with world-class amenities.',
    points: [
      'RCC framed structure with advanced formwork systems',
      'Towers up to 40+ floors with full MEP integration',
      'Podium + Tower typology with basement parking',
      'High-speed passenger & service lifts',
      'Fire safety and sprinkler systems as per NBC norms',
    ],
  },
  {
    icon: 'fa-home',
    title: 'Low-Rise Housing',
    desc: 'Villas, row houses, and plotted developments crafted for comfort, privacy, and lifestyle.',
    points: [
      'Independent villas and duplex row houses',
      'Gated community layouts with landscaped streets',
      'Stilt + 2/3 floor configurations',
      'Private gardens and open terrace options',
      'Rainwater harvesting and EV charging provisions',
    ],
  },
  {
    icon: 'fa-store',
    title: 'Commercial Complexes',
    desc: 'Retail spaces, shopping malls, and mixed-use commercial hubs built for high footfall and visibility.',
    points: [
      'Retail high-streets and shopping centres',
      'Mixed-use podium retail with residential above',
      'Large-format anchor store provisions',
      'Ample basement and surface parking',
      'High-specification MEP and fire systems',
    ],
  },
  {
    icon: 'fa-briefcase',
    title: 'Office Spaces',
    desc: 'Corporate parks and IT office campuses designed for productivity, prestige, and future flexibility.',
    points: [
      'Grade-A commercial office buildings',
      'Column-free floor plates up to 30,000 sq.ft.',
      'Central air-conditioning and BMS integration',
      'Green building features (IGBC / LEED ready)',
      'Dedicated server room and UPS provisions',
    ],
  },
  {
    icon: 'fa-swimmer',
    title: 'Clubs & Amenity Blocks',
    desc: 'Clubhouses and recreational centres that become the social heart of every residential community.',
    points: [
      'Swimming pools, gyms, and sports courts',
      'Banquet halls and multipurpose event spaces',
      'Kids play zones and senior citizen areas',
      'Spa, wellness, and indoor game rooms',
      'Landscape integration with outdoor seating',
    ],
  },
  {
    icon: 'fa-city',
    title: 'Integrated Townships',
    desc: 'Master-planned self-sufficient communities combining housing, retail, offices, and amenities.',
    points: [
      'Large-scale township planning from 10–200+ acres',
      'Mix of high-rise, low-rise, and commercial zones',
      'Internal road network and utility infrastructure',
      'Dedicated schools, hospitals, and civic areas',
      'Phased construction with independent utility supply',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   CAPABILITIES DATA (5 M's)
───────────────────────────────────────────────────────────── */
const capabilities = [
  {
    icon: 'fa-users-cog',
    title: 'Manpower',
    subtitle: 'Skilled & Unskilled Workforce',
    points: [
      'Licensed engineers, architects & quantity surveyors',
      'Skilled tradesmen — formwork, rebar, masonry, finishing',
      'Supervised unskilled labour teams with daily briefings',
      'Dedicated safety officers on every active site',
      'Workforce strength scalable from 50 to 2000+ per project',
    ],
  },
  {
    icon: 'fa-boxes',
    title: 'Material',
    subtitle: 'Availability & Procurement',
    points: [
      'Established vendor network across PAN India',
      'Quality-tested cement, TMT steel, and aggregates',
      'Just-in-time material delivery to minimise storage waste',
      'On-site material tracking and inventory management',
      'Long-term rate contracts ensuring price stability',
    ],
  },
  {
    icon: 'fa-truck-monster',
    title: 'Machines',
    subtitle: 'Equipment & Plant',
    points: [
      'Tower cranes and mobile cranes of varying capacities',
      'In-house concrete batching plants (30–60 m³/hr)',
      'Excavators, dumpers, compactors and transit mixers',
      'Modern jump-form and slip-form shuttering systems',
      'Dedicated equipment maintenance team on-site',
    ],
  },
  {
    icon: 'fa-project-diagram',
    title: 'Method',
    subtitle: 'Modus Operandi',
    points: [
      'ISO 9001:2015 aligned construction methodology',
      'Detailed method statements for every major activity',
      'RCC framed structure with proven sequencing',
      'Quality audits and concrete cube testing at every pour',
      'Bar chart scheduling with weekly progress reviews',
    ],
  },
  {
    icon: 'fa-sitemap',
    title: 'Management',
    subtitle: 'Levels & Structure',
    points: [
      'Senior project directors overseeing overall delivery',
      'Resident Engineers and Site Managers per block',
      'Section-wise supervisors and gang foremen',
      'Weekly client reporting with photo documentation',
      'On-site EHS manager ensuring zero-incident culture',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */
function Navbar() {
  return (
    <div className="w3-top">
      <div className="w3-bar w3-white w3-wide w3-padding w3-card navbar-bar">
        <a href="#home" className="w3-bar-item w3-button brand-logo">
          <span className="brand-rs">RS</span>
          <span className="brand-name"> Rudrarise Structures LLP</span>
        </a>
        <div className="w3-right w3-hide-small nav-links">
          <a href="#services"      className="w3-bar-item w3-button nav-link"><i className="fas fa-cogs nav-icon"></i> Services</a>
          <a href="#project-types" className="w3-bar-item w3-button nav-link"><i className="fas fa-th nav-icon"></i> Project Types</a>
          <a href="#projects"      className="w3-bar-item w3-button nav-link"><i className="fas fa-th-large nav-icon"></i> Gallery</a>
          <a href="#capabilities"  className="w3-bar-item w3-button nav-link"><i className="fas fa-sitemap nav-icon"></i> Capabilities</a>
          <a href="#about"         className="w3-bar-item w3-button nav-link"><i className="fas fa-info-circle nav-icon"></i> About</a>
          <a href="#contact"       className="w3-bar-item w3-button nav-link nav-cta"><i className="fas fa-phone-alt nav-icon"></i> Contact</a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <header className="w3-display-container w3-content hero-header" id="home">
      <img className="w3-image hero-img" src="/photos/hero.jpeg" alt="Rudrarise Structures LLP" />
      <div className="hero-overlay"></div>
      <div className="w3-display-middle w3-center hero-content">
        <div className="hero-badge">BUILDING EXCELLENCE SINCE 2009</div>
        <h1 className="hero-title">
          <span className="hero-title-block">RUDRARISE</span>
          <span className="hero-title-sub">STRUCTURES LLP</span>
        </h1>
        <p className="hero-tagline">Real Estate · Construction · Architecture</p>
        <div className="hero-buttons">
          <a href="#projects" className="hero-btn-primary">View Our Projects <i className="fas fa-arrow-right"></i></a>
          <a href="#contact"  className="hero-btn-outline">Get In Touch</a>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <i className="fas fa-chevron-down"></i>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────
   STATS BAR
───────────────────────────────────────────────────────────── */
function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="w3-content w3-row-padding stats-inner">
        {stats.map((s, i) => (
          <div key={i} className="w3-col l3 m6 stat-item">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────────────────────── */
function Services() {
  return (
    <div className="w3-content w3-padding-32 services-section" id="services">
      <div className="section-header">
        <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16 section-title">Our Services</h3>
        <p className="section-subtitle">Comprehensive solutions across the entire construction and real estate lifecycle</p>
      </div>
      <div className="w3-row-padding w3-margin-top">
        {services.map((s, i) => (
          <div key={i} className="w3-col l4 m12 w3-margin-bottom">
            <div className="service-card">
              <div className="service-icon-wrap"><i className={`fas ${s.icon} service-icon`}></i></div>
              <h4 className="service-title">{s.title}</h4>
              <p className="service-desc">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────────────────────── */
function Lightbox({ project, total, onClose, onPrev, onNext }) {
  // Close on Escape, navigate with arrow keys
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowRight')  onNext();
      if (e.key === 'ArrowLeft')   onPrev();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if (!project) return null;

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      {/* Stop propagation on the inner box so clicking image doesn't close */}
      <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>

        {/* Close button */}
        <button className="lb-close" onClick={onClose} title="Close (Esc)">
          <i className="fas fa-times"></i>
        </button>

        {/* Prev arrow */}
        <button className="lb-arrow lb-prev" onClick={onPrev} title="Previous">
          <i className="fas fa-chevron-left"></i>
        </button>

        {/* Image */}
        <img src={project.img} alt={project.label} className="lb-img" />

        {/* Caption */}
        <div className="lb-caption">
          <span className="lb-tag">{project.tag}</span>
          <span className="lb-label">{project.label}</span>
          <span className="lb-counter">{project.id} / {total}</span>
        </div>

        {/* Next arrow */}
        <button className="lb-arrow lb-next" onClick={onNext} title="Next">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────────────────────── */
function Projects() {
  const [activeIndex, setActiveIndex] = useState(null);

  const openAt  = useCallback((i) => setActiveIndex(i), []);
  const close   = useCallback(() => setActiveIndex(null), []);
  const prev    = useCallback(() => setActiveIndex((i) => (i - 1 + projects.length) % projects.length), []);
  const next    = useCallback(() => setActiveIndex((i) => (i + 1) % projects.length), []);

  return (
    <>
      <div className="w3-content w3-padding-32 projects-section" id="projects">
        <div className="section-header">
          <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16 section-title">Our Projects</h3>
          <p className="section-subtitle">Showcasing our active sites and delivered landmarks across India</p>
        </div>
        <div className="w3-row-padding w3-margin-top">
          {projects.map((p, i) => (
            <div key={p.id} className="w3-col l3 m6 w3-margin-bottom project-col">
              <div
                className="w3-display-container project-card"
                onClick={() => openAt(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openAt(i)}
                title={`View: ${p.label}`}
              >
                <div className="w3-display-topleft project-label">
                  <span className="project-tag">{p.tag}</span>
                </div>
                <img src={p.img} alt={p.label} className="project-img" />
                <div className="project-overlay">
                  <div className="project-overlay-content">
                    <p className="project-name">{p.label}</p>
                    <i className="fas fa-search-plus project-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <Lightbox
          project={projects[activeIndex]}
          total={projects.length}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROJECT TYPES
───────────────────────────────────────────────────────────── */
function ProjectTypes() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="pt-section" id="project-types">
      <div className="w3-content pt-inner">
        <div className="pt-header">
          <div className="pt-header-badge">WHAT WE BUILD</div>
          <h3 className="pt-title">Project Types</h3>
          <p className="pt-subtitle">
            From foundation to skyline — we deliver across every segment of the built environment
          </p>
        </div>

        <div className="pt-grid">
          {projectTypes.map((p, i) => (
            <div key={i} className={`pt-card ${openIndex === i ? 'pt-card--open' : ''}`}>
              <div className="pt-card-top" onClick={() => toggle(i)}>
                <div className="pt-icon-wrap">
                  <i className={`fas ${p.icon} pt-icon`}></i>
                </div>
                <div className="pt-card-text">
                  <h4 className="pt-card-title">{p.title}</h4>
                  <p className="pt-card-desc">{p.desc}</p>
                </div>
                <button className="pt-toggle-btn" aria-label="expand">
                  <i className={`fas ${openIndex === i ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </button>
              </div>

              {openIndex === i && (
                <div className="pt-expand">
                  <ul className="pt-points">
                    {p.points.map((pt, j) => (
                      <li key={j} className="pt-point">
                        <i className="fas fa-check-circle pt-check"></i>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   OUR CAPABILITIES (5 M's)
───────────────────────────────────────────────────────────── */
function Capabilities() {
  return (
    <div className="cap-section" id="capabilities">
      <div className="w3-content cap-inner">
        <div className="section-header">
          <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16 section-title">
            Our Capabilities
          </h3>
          <p className="section-subtitle">
            The 5 pillars that power every project we undertake — from ground-breaking to hand-over
          </p>
        </div>

        <div className="cap-grid">
          {capabilities.map((c, i) => (
            <div key={i} className="cap-card">
              <div className="cap-top-bar"></div>
              <div className="cap-card-body">
                <div className="cap-icon-wrap">
                  <i className={`fas ${c.icon} cap-icon`}></i>
                </div>
                <h4 className="cap-title">{c.title}</h4>
                <p className="cap-subtitle">{c.subtitle}</p>
                <ul className="cap-points">
                  {c.points.map((pt, j) => (
                    <li key={j} className="cap-point">
                      <i className="fas fa-angle-right cap-arrow"></i>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────────────── */
function About() {
  return (
    <div className="about-section" id="about">
      <div className="w3-content w3-padding-32">
        <div className="section-header">
          <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16 section-title">About Us</h3>
        </div>
        <div className="w3-row-padding w3-margin-top about-grid">
          <div className="w3-col l7 m12 about-text-col">
            <h4 className="about-headline">Building Dreams, Engineering Excellence</h4>
            <p className="about-body">
              <strong>Rudrarise Structures LLP</strong> is a premier real estate and construction company
              delivering landmark residential, commercial, and infrastructure projects with uncompromising
              quality since 2009. We combine bold architectural vision with engineering precision to create
              spaces that endure.
            </p>
            <p className="about-body">
              From foundation to finishing, our vertically integrated team handles every phase — site
              acquisition, architectural design, structural engineering, construction, and project
              management. This end-to-end capability ensures quality control, cost efficiency, and
              on-time delivery at every step.
            </p>
            <p className="about-body">
              We currently operate across multiple large-scale township projects, managing millions of
              square feet of high-rise residential development. Our portfolio showcases a commitment to
              modern design, structural integrity, and sustainable construction practices.
            </p>
            <div className="about-values">
              {['ISO-compliant construction processes','Experienced in-house architectural team','On-time delivery guarantee','Transparent client communication'].map((v, i) => (
                <div key={i} className="value-item">
                  <i className="fas fa-check-circle value-icon"></i>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w3-col l5 m12 about-img-col">
            <img src="/photos/project3.jpeg" alt="Rudrarise Construction" className="about-img" />
            <div className="about-img-card">
              <div className="about-img-stat">15+</div>
              <div className="about-img-label">Years Building India&apos;s Skyline</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────────────────────── */
function Contact() {
  return (
    <div className="contact-section" id="contact">
      <div className="w3-content w3-padding-32">
        <div className="section-header">
          <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16 section-title">Contact Us</h3>
          <p className="section-subtitle">Let&apos;s discuss your next project. Our team is ready to help you build.</p>
        </div>
        <div className="w3-row-padding w3-margin-top contact-grid">
          {/* Form */}
          <div className="w3-col l7 m12 contact-form-col">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group half">
                  <label className="form-label">Full Name *</label>
                  <input className="w3-input w3-border form-input" type="text" placeholder="Your full name" required />
                </div>
                <div className="form-group half">
                  <label className="form-label">Email Address *</label>
                  <input className="w3-input w3-border form-input" type="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label className="form-label">Phone Number</label>
                  <input className="w3-input w3-border form-input" type="tel" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="form-group half">
                  <label className="form-label">Subject *</label>
                  <input className="w3-input w3-border form-input" type="text" placeholder="Project inquiry" required />
                </div>
              </div>
              <div className="form-group full">
                <label className="form-label">Message *</label>
                <textarea className="w3-input w3-border form-textarea" placeholder="Tell us about your project requirements..." rows={5} required></textarea>
              </div>
              <button className="w3-button form-submit-btn" type="submit">
                <i className="fas fa-paper-plane"></i>&nbsp; SEND MESSAGE
              </button>
            </form>
          </div>
          {/* Info */}
          <div className="w3-col l5 m12 contact-info-col">
            <div className="contact-info-card">
              <h4 className="contact-info-title">Get In Touch</h4>
              {[
                { icon: 'fa-map-marker-alt', label: 'Registered Office', value: 'Rudrarise Structures LLP, India' },
                { icon: 'fa-phone-alt',      label: 'Phone',             value: '+91 XXXXX XXXXX'                 },
                { icon: 'fa-envelope',       label: 'Email',             value: 'info@rudrarisestructures.com'    },
                { icon: 'fa-clock',          label: 'Office Hours',      value: 'Mon – Sat: 9:00 AM – 6:00 PM'   },
              ].map((item, i) => (
                <div key={i} className="contact-info-item">
                  <div className="contact-info-icon-wrap"><i className={`fas ${item.icon} contact-info-icon`}></i></div>
                  <div>
                    <div className="contact-info-label">{item.label}</div>
                    <div className="contact-info-value">{item.value}</div>
                  </div>
                </div>
              ))}
              <div className="contact-social">
                {['fa-linkedin-in','fa-facebook-f','fa-instagram','fa-whatsapp'].map((icon, i) => (
                  <a key={i} href="#" className="social-btn"><i className={`fab ${icon}`}></i></a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="w3-content footer-inner">
        <div className="w3-row-padding footer-top">
          <div className="w3-col l4 m12 footer-brand-col">
            <div className="footer-logo">
              <span className="footer-logo-rs">RS</span>
              <div>
                <div className="footer-logo-name">Rudrarise Structures LLP</div>
                <div className="footer-logo-tagline">Building Tomorrow, Today.</div>
              </div>
            </div>
            <p className="footer-about-text">
              A trusted name in real estate development, construction, and architectural design.
              Delivering excellence across every project we undertake.
            </p>
          </div>
          <div className="w3-col l2 m6 footer-links-col">
            <h5 className="footer-col-title">Quick Links</h5>
            <ul className="footer-links">
              {[['#home','Home'],['#services','Services'],['#project-types','Project Types'],['#projects','Gallery'],['#capabilities','Capabilities'],['#about','About'],['#contact','Contact']].map(([href,label]) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div className="w3-col l3 m6 footer-links-col">
            <h5 className="footer-col-title">Our Services</h5>
            <ul className="footer-links">
              {['Real Estate Development','Construction & Engineering','Architecture & Design','Project Management'].map((s) => (
                <li key={s}><a href="#services">{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="w3-col l3 m12 footer-links-col">
            <h5 className="footer-col-title">Contact</h5>
            {[
              { icon: 'fa-phone-alt',      text: '+91 XXXXX XXXXX'              },
              { icon: 'fa-envelope',       text: 'info@rudrarisestructures.com' },
              { icon: 'fa-map-marker-alt', text: 'India'                        },
            ].map((c, i) => (
              <div key={i} className="footer-contact-item">
                <i className={`fas ${c.icon} footer-contact-icon`}></i>
                <span>{c.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <span>© 2025 Rudrarise Structures LLP. All rights reserved.</span>
          <span className="footer-bottom-right">Designed with <i className="fas fa-heart footer-heart"></i> for excellence</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────────────────────── */
function App() {
  return (
    <div className="site-wrapper">
      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
      <ProjectTypes />
      <Projects />
      <Capabilities />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
