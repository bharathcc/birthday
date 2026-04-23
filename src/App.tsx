import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

const FERRARI_COLORS = {
  bg: "#f1e194",
  text: "#5b0e14",
};

const WILLIAMS_COLORS = {
  bg: "#10234a",
  accent: "#47c3f5",
  text: "#ffffff",
};

const MAIN_PAGE_COLORS = {
  base: "#ffede3",
  layered: "#fa4d01",
};

const Racing55 = ({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 200 120" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.g 
      style={{ stroke: color, strokeWidth: 5 }}
      initial={false}
      animate={{ stroke: color }}
      transition={{ duration: 0.8 }}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="skewX(-15) translate(40, 30)">
        <path d="M60 0 H10 L5 35 H45 C60 35 60 75 40 75 H0" />
        <path d="M55 8 H15 L10 30 H40 C50 30 50 65 35 65 H5" opacity="0.3" />
      </g>
      <g transform="skewX(-15) translate(110, 30)">
        <path d="M60 0 H10 L5 35 H45 C60 35 60 75 40 75 H0" />
        <path d="M55 8 H15 L10 30 H40 C50 30 50 65 35 65 H5" opacity="0.3" />
      </g>
    </motion.g>
  </svg>
);

const LiquidGlass = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`liquid-glass rounded-[40px] px-8 py-6 ${className}`}>
    {children}
  </div>
);

const FloatingTile = ({ src, delay, x, y, scale = 1, objectPosition = "center", onClick, aspect = "3/4" }: { src: string, delay: number, x: string, y: string, scale?: number, objectPosition?: string, onClick?: () => void, aspect?: "1/1" | "3/4" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale }}
    whileHover={{ 
      scale: scale * 1.05,
      rotate: 0,
      zIndex: 50,
      transition: { duration: 0.2 }
    }}
    viewport={{ once: false }}
    onClick={onClick}
    animate={{ 
      y: [0, -20, 0],
      rotate: [0, 1.5, -1.5, 0]
    }}
    transition={{ 
      y: { duration: 4 + delay, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 6 + delay, repeat: Infinity, ease: "easeInOut" },
      opacity: { duration: 1, delay: delay * 0.2, ease: "easeOut" }
    }}
    style={{ left: x, top: y, translateX: "-50%" }}
    className="absolute z-30 cursor-pointer group"
  >
    <LiquidGlass className="!p-0 overflow-hidden shadow-2xl border-white/30 group-hover:border-[#fa4d01]/60 transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(250,77,1,0.3)]">
      <div className={`w-64 md:w-80 lg:w-[420px] overflow-hidden ${aspect === '1/1' ? 'aspect-square' : 'aspect-[3/4]'}`}>
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={src} 
          alt="Gallery" 
          className="w-full h-full object-cover"
          style={{ objectPosition }}
          referrerPolicy="no-referrer"
        />
      </div>
    </LiquidGlass>
  </motion.div>
);

const VideoTile = ({ src }: { src: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="w-full"
  >
    <LiquidGlass className="!p-0 overflow-hidden border-white/10 hover:border-[#fa4d01]/30 transition-all duration-500 shadow-2xl group flex flex-col items-center">
      <div className="w-full bg-black relative flex items-center justify-center">
        <video 
          src={src} 
          controls 
          preload="metadata"
          playsInline
          className="w-full h-auto max-h-[80vh] block"
          onError={(e) => console.error(`Video failed to load: ${src}`, e)}
        />
      </div>
    </LiquidGlass>
  </motion.div>
);

const FinalPage = ({ onReset }: { onReset: () => void }) => {
  const navigate = useNavigate();
  const videos = [
    "/fv1.mp4",
    "/fv2.mp4",
    "/fv6.mp4",
    "/fv4.mp4",
    "/fv5.mp4",
    "/fv7.mp4",
  ];

  return (
    <div className="min-h-screen w-full bg-[#020202] overflow-x-hidden flex flex-col items-center relative font-sans py-20 px-6">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-br from-[#fa4d01]/10 via-black to-[#fa4d01]/5"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl relative z-20 mb-32"
      >
        <LiquidGlass className="w-full flex flex-col items-center gap-12 py-20 px-8 md:px-16 border-white/10 backdrop-blur-3xl shadow-[0_40px_100px_-20px_rgba(250,77,1,0.2)]">
          <div className="relative">
            <motion.div 
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -inset-8 bg-[#fa4d01]/20 blur-3xl rounded-full"
            />
            <h2 className="text-4xl md:text-6xl font-black text-[#fa4d01] leading-[1.1] tracking-tighter text-center">
              Thank you for playing 🧡,<br/>skip cheyledhu kada ?? 🤔
            </h2>
          </div>
        </LiquidGlass>
      </motion.div>

      {/* Video Gallery Section */}
      <div className="w-full max-w-5xl relative z-20 space-y-16 pb-20">
        <div className="flex flex-col items-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#fa4d01]/50 to-transparent mb-4" />
          <h3 className="text-3xl md:text-5xl font-black text-[#fa4d01] tracking-tighter uppercase">
            Video Gallery
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {videos.map((src, idx) => (
            <div key={idx} className={idx === 0 ? "md:col-span-2 max-w-3xl mx-auto w-full" : "w-full"}>
              <VideoTile src={src} />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl relative z-20 flex flex-col items-center gap-12 mt-20 pb-32">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="text-center space-y-6"
        >
          <p className="text-[#fa4d01] text-lg md:text-xl font-bold tracking-wide leading-relaxed text-balance">
            Once again happyy birthdayy varshi, thank you for being the highlight of my world.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onReset();
              navigate('/');
            }}
            className="px-8 py-3 bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 text-[#fa4d01] rounded-full text-[11px] uppercase tracking-[0.4em] font-black transition-all border border-[#fa4d01]/20"
          >
            ← Back to start
          </motion.button>

          <div className="pt-8">
            <motion.a
              href="https://imagine.gsfc.nasa.gov/hst_bday/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, color: "#fff" }}
              className="text-[#fa4d01]/60 hover:text-[#fa4d01] text-[12px] font-medium transition-all flex items-center gap-2 group italic underline decoration-[#fa4d01]/20 underline-offset-4"
            >
              wanna check what photo did NASA took on your Birthday -&gt;
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Film Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-grain z-50" />
    </div>
  );
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState<'ferrari' | 'williams'>('ferrari');
  const [isZooming, setIsZooming] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [colorStep, setColorStep] = useState(0); 
  const [showFlash, setShowFlash] = useState(false);
  
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState<number | string>(1);
  const [noCount, setNoCount] = useState<number | null>(null);

  const bruhAudio = useRef<HTMLAudioElement | null>(null);
  const clickAudio = useRef<HTMLAudioElement | null>(null);
  const correctAudio = useRef<HTMLAudioElement | null>(null);
  const sadcatAudio = useRef<HTMLAudioElement | null>(null);
  const dexterAudio = useRef<HTMLAudioElement | null>(null);
  const rickrollAudio = useRef<HTMLAudioElement | null>(null);
  const undertakerAudio = useRef<HTMLAudioElement | null>(null);
  const rizzAudio = useRef<HTMLAudioElement | null>(null);
  const spongebobAudio = useRef<HTMLAudioElement | null>(null);
  const yayboiAudio = useRef<HTMLAudioElement | null>(null);
  const yayyyAudio = useRef<HTMLAudioElement | null>(null);
  const nellyAudio = useRef<HTMLAudioElement | null>(null);
  const heavenlyAudio = useRef<HTMLAudioElement | null>(null);
  const sleepAudio = useRef<HTMLAudioElement | null>(null);
  const wowAudio = useRef<HTMLAudioElement | null>(null);
  const weekendrizzAudio = useRef<HTMLAudioElement | null>(null);
  const frenchAudio = useRef<HTMLAudioElement | null>(null);
  const elevatorAudio = useRef<HTMLAudioElement | null>(null);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);

  const startAudioTransition = (audio: HTMLAudioElement | null, gifs: string[], nextQuestion: number | string) => {
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    
    setTransitionGifs(gifs);
    setIsTransitioning(true);

    const cleanup = () => {
      setIsTransitioning(false);
      setCurrentQuestion(nextQuestion);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    };

    const MAX_DISPLAY_TIME = 5000;

    if (audio) {
      audio.currentTime = 0;
      
      const handleEnded = () => {
        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        cleanup();
      };

      audio.onended = handleEnded;
      audio.onerror = () => {
        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        cleanup();
      };
      
      // Hard cap at 5 seconds: GIF and Audio stop here if they haven't finished
      transitionTimeoutRef.current = window.setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        cleanup();
      }, MAX_DISPLAY_TIME);
      
      audio.play().catch(e => {
        console.log("Audio play failed, showing GIF for 5s fallback:", e);
        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = window.setTimeout(cleanup, MAX_DISPLAY_TIME);
      });
    } else {
      // No audio, just a 5s GIF display
      transitionTimeoutRef.current = window.setTimeout(cleanup, MAX_DISPLAY_TIME);
    }
  };

  const [quizResponses, setQuizResponses] = useState<{questionId: string | number, answer: string}[]>([]);

  const sendNotification = async (type: 'LOGIN' | 'ACTIVITY', payload: any) => {
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data: { ...payload, name: payload.name || name, timestamp: Date.now() } }),
      });
    } catch (e) {
      console.error('Failed to send notification:', e);
    }
  };

  const recordAnswer = (questionId: string | number, answer: string) => {
    setQuizResponses(prev => [...prev, { questionId, answer }]);
  };

  const [transitionGifs, setTransitionGifs] = useState<string[]>([]);
  const [countdown, setCountdown] = useState(10);
  const [showRickroll, setShowRickroll] = useState(false);

  const resetQuiz = () => {
    if (quizResponses.length > 0) {
      sendNotification('ACTIVITY', { responses: quizResponses, name });
    }
    setCurrentQuestion(1);
    setNoCount(null);
    setCountdown(10);
    setShowRickroll(false);
    setQuizResponses([]);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const audioFiles = [
      { ref: bruhAudio, src: '/bruhh.mpeg' },
      { ref: clickAudio, src: '/mclick.mpeg' },
      { ref: correctAudio, src: '/correctanswer.mpeg' },
      { ref: sadcatAudio, src: '/sadcat.mpeg' },
      { ref: dexterAudio, src: '/dexter.mpeg' },
      { ref: rickrollAudio, src: '/rickroll.mpeg' },
      { ref: undertakerAudio, src: '/undertaker.mpeg' },
      { ref: rizzAudio, src: '/rizzsound.mpeg' },
      { ref: spongebobAudio, src: '/spongebob.mpeg' },
      { ref: yayboiAudio, src: '/yayboi.mpeg' },
      { ref: yayyyAudio, src: '/yayyy.mpeg' },
      { ref: nellyAudio, src: '/nellyahh.mpeg' },
      { ref: heavenlyAudio, src: '/heveanly.mpeg' },
      { ref: sleepAudio, src: '/sleep.mpeg' },
      { ref: wowAudio, src: '/woww.mpeg' },
      { ref: weekendrizzAudio, src: '/weekendrizz.mpeg' },
      { ref: frenchAudio, src: '/french.mpeg' },
      { ref: elevatorAudio, src: '/elevator.mp3' }
    ];

    audioFiles.forEach(file => {
      const audio = new Audio(file.src);
      audio.preload = 'auto';
      if (file.ref === elevatorAudio) {
        audio.loop = true;
        audio.volume = 0.3;
      }
      
      // Add error logging
      audio.onerror = () => {
        console.error(`Failed to load audio: ${file.src}`);
      };
      
      audio.load();
      file.ref.current = audio;
    });
  }, []);

  useEffect(() => {
    let timer: number;
    if (currentQuestion === "2.5" && countdown > 0 && !showRickroll) {
      timer = window.setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (currentQuestion === "2.5" && countdown === 0) {
      setCurrentQuestion(3);
    }
    return () => clearInterval(timer);
  }, [currentQuestion, countdown, showRickroll]);

  useEffect(() => {
    if (currentQuestion === 9) {
      const timer = setTimeout(() => {
        setCurrentQuestion("video");
      }, 5000); // 5 seconds to read
      return () => clearTimeout(timer);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (isAuthenticated) {
      window.scrollTo(0, 0);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const isQuizState = !["video", "final-page", "final"].includes(currentQuestion.toString());
    const isFinalPageRoute = location.pathname === '/final-page';
    const isSadCatPlaying = noCount === -1;

    if (isAuthenticated && isQuizState && !isFinalPageRoute && !isSadCatPlaying) {
      if (elevatorAudio.current && elevatorAudio.current.paused) {
        elevatorAudio.current.play().catch(e => console.log("Elevator music play failed:", e));
      }
    } else {
      if (elevatorAudio.current && !elevatorAudio.current.paused) {
        elevatorAudio.current.pause();
        // Only reset to 0 if it's not the sad cat pause (to allow resume if interrupted)
        if (!isSadCatPlaying) {
          elevatorAudio.current.currentTime = 0;
        }
      }
    }
  }, [currentQuestion, isAuthenticated, location.pathname, noCount]);

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll(); // Track global window scroll for the main page

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });
  
  // Adjust transform values for the longer scroll experience
  const galleryOpacity = useTransform(smoothProgress, [0.08, 0.22], [0, 1]);
  const galleryRisingY = useTransform(smoothProgress, [0.08, 0.35], [500, 0]);
  const quizY = useTransform(smoothProgress, [0.85, 1], [400, 0]);
  const quizOpacity = useTransform(smoothProgress, [0.85, 0.95], [0, 1]);
  const contentBlur = useTransform(smoothProgress, [0.92, 1], ["blur(0px)", "blur(20px)"]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.15], [0, -150]);
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 0.9]);
  const footerOpacity = useTransform(smoothProgress, [0, 0.05], [0.6, 0]);
  const memoryOpacity = useTransform(smoothProgress, [0.12, 0.2, 0.8, 0.85], [0, 1, 1, 0]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Unblock all audio objects on first user gesture
    const allAudios = [
      bruhAudio, clickAudio, correctAudio, sadcatAudio, dexterAudio, 
      rickrollAudio, undertakerAudio, rizzAudio, spongebobAudio, 
      yayboiAudio, yayyyAudio, nellyAudio, heavenlyAudio, sleepAudio, 
      wowAudio, weekendrizzAudio, frenchAudio, elevatorAudio
    ];

    allAudios.forEach(audioRef => {
      if (audioRef.current) {
        // Play and immediately pause/mute to unblock the context
        const audio = audioRef.current;
        const wasPaused = audio.paused;
        audio.play().then(() => {
          if (wasPaused && audioRef !== elevatorAudio) {
            audio.pause();
            audio.currentTime = 0;
          } else if (audioRef === elevatorAudio) {
             // Let elevator music handle itself via useEffect/currentQuestion logic
             if (typeof currentQuestion !== 'number') {
               audio.pause();
             }
          }
        }).catch(err => console.log("Audio unblock failed for a ref:", err));
      }
    });

    if (dob === '2004-04-24' && name.trim() !== '') {
      setIsAuthenticated(true);
      sendNotification('LOGIN', { name, dob });
    } else if (name.trim() === '') {
      setError('Please enter your name');
    } else {
      setError('Incorrect date of birth');
    }
  };

  const handleNo = () => {
    // Unblock audio for mobile on first interaction
    if (elevatorAudio.current && elevatorAudio.current.paused && isAuthenticated && typeof currentQuestion === 'number') {
      elevatorAudio.current.play().catch(() => {});
    }

    if (currentQuestion === 1) {
      recordAnswer(1, "No");
      if (noCount === -1) return;
      if (noCount === null) {
        if (bruhAudio.current) {
          bruhAudio.current.currentTime = 0;
          bruhAudio.current.play().catch(e => console.log("Audio play failed:", e));
        }
        setNoCount(5);
      } else if (noCount > 0) {
        if (clickAudio.current) {
          clickAudio.current.currentTime = 0;
          clickAudio.current.play().catch(e => console.log("Audio play failed:", e));
        }
        setNoCount(noCount - 1);
      } else {
        if (sadcatAudio.current) {
          setNoCount(-1);
          sadcatAudio.current.currentTime = 0;
          sadcatAudio.current.onended = () => {
            sendNotification('ACTIVITY', { responses: quizResponses, name });
            navigate('/final-page');
          };
          sadcatAudio.current.play().catch(e => {
            console.log("Audio play failed:", e);
            sendNotification('ACTIVITY', { responses: quizResponses, name });
            navigate('/final-page');
          });
        } else {
          sendNotification('ACTIVITY', { responses: quizResponses, name });
          navigate('/final-page');
        }
      }
    }
  };

  const handleYes = () => {
    // Unblock audio for mobile on first interaction
    if (elevatorAudio.current && elevatorAudio.current.paused && isAuthenticated && typeof currentQuestion === 'number') {
      elevatorAudio.current.play().catch(() => {});
    }

    if (currentQuestion === 1) {
      recordAnswer(1, "Yes");
      // If sadcat is playing (noCount === -1), allow interruption
      if (noCount === -1) {
        if (sadcatAudio.current) {
          sadcatAudio.current.pause();
          sadcatAudio.current.currentTime = 0;
          sadcatAudio.current.onended = null;
        }
        setNoCount(null); // Reset noCount so user can continue
      }

      if (correctAudio.current) {
        correctAudio.current.currentTime = 0;
        correctAudio.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setCurrentQuestion("2.2");
    }
  };

  useEffect(() => {
    if (theme === 'williams' && colorStep === 0) {
      const colorTimer = setTimeout(() => {
        setColorStep(1);
      }, 600);
      return () => clearTimeout(colorTimer);
    }
  }, [theme, colorStep]);

  useEffect(() => {
    if (colorStep === 1) {
      const zoomTimer = setTimeout(() => {
        setIsZooming(true);
        setColorStep(2);
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 400);
      }, 700);
      return () => clearTimeout(zoomTimer);
    }
  }, [colorStep]);

  useEffect(() => {
    if (isZooming) {
      const loginTimer = setTimeout(() => {
        setShowLogin(true);
      }, 1400);
      return () => clearTimeout(loginTimer);
    }
  }, [isZooming]);

  const currentColors = theme === 'ferrari' ? FERRARI_COLORS : WILLIAMS_COLORS;

  const mainView = (
      <div ref={scrollRef} className="min-h-[800vh] w-full bg-[#ffede3] font-sans selection:bg-[#fa4d01] selection:text-white overflow-x-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none minimalist-lines opacity-[0.1]" />
        
        {/* Background Watermark Title - Now integrated into the scroll flow occasionally for better "after image" feel */}
        <motion.div
          style={{ opacity: memoryOpacity }}
          className="fixed top-1/2 -translate-y-1/2 left-0 w-full z-10 text-center pointer-events-none px-4 select-none"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-[#fa4d01] tracking-tighter opacity-15">
            ALL OF YOUU
          </h2>
        </motion.div>
        
        <motion.div 
          className="fixed inset-0 z-[25] pointer-events-none bg-[#ffede3]/10"
          style={{ backdropFilter: contentBlur }}
        />

        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-3xl flex items-center justify-center p-4 md:p-10 cursor-alias"
            >
              <motion.div 
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                className="relative max-w-5xl w-full h-full flex items-center justify-center"
              >
                <LiquidGlass className="!p-0 border-white/20 shadow-[0_0_100px_rgba(250,77,1,0.2)] overflow-hidden max-h-full">
                  <img 
                    src={selectedImage} 
                    alt="Enlarged" 
                    className="max-h-[85vh] w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </LiquidGlass>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors text-2xl font-black"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-10 p-6 pointer-events-none">
          <motion.div
            style={{ 
              opacity: heroOpacity,
              scale: heroScale,
              y: heroY
            }}
            className="pointer-events-auto"
          >
            <LiquidGlass>
              <h1 className="text-4xl md:text-5xl font-black text-[#fa4d01] tracking-tight text-center whitespace-nowrap px-4 py-2">
                Varshiiiiiiiii🧡 !!!!
              </h1>
            </LiquidGlass>
          </motion.div>

          <motion.div 
            style={{ opacity: footerOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#fa4d01]">scroll to see my fav pics</p>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-16 bg-[#fa4d01]/40"
            />
          </motion.div>
        </div>

        <div className="relative w-full pt-[40vh]">
          <div className="h-[600vh] w-full relative">
            <motion.div 
              style={{ 
                opacity: galleryOpacity,
                y: galleryRisingY
              }}
              className="absolute inset-0 z-0"
            >
                {/* Memory Title appears right after pic0.jpeg (at 4% y) */}
                <div style={{ top: "7%" }} className="absolute left-0 w-full z-20 pointer-events-none px-4 select-none flex justify-center">
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#fa4d01] tracking-tight text-center">
                    ALL OF YOUU
                  </h2>
                </div>

               {/* Comprehensive Effortless scattering: Utilizing all 14 available images (pic0-13) - centered for mobile safety */}
               <FloatingTile src="/pic0.jpeg" delay={0} x="45%" y="4%" scale={0.9} onClick={() => setSelectedImage("/pic0.jpeg")} aspect="3/4" />
               <FloatingTile src="/pic1.jpeg" delay={0.3} x="55%" y="10%" scale={1.05} onClick={() => setSelectedImage("/pic1.jpeg")} aspect="1/1" />
               <FloatingTile src="/pic2.jpeg" delay={0.6} x="40%" y="16%" scale={1} onClick={() => setSelectedImage("/pic2.jpeg")} aspect="3/4" />
               <FloatingTile src="/pic3.jpeg" delay={0.9} x="60%" y="22%" scale={0.95} onClick={() => setSelectedImage("/pic3.jpeg")} aspect="1/1" />
               <FloatingTile src="/pic4.jpeg" delay={1.2} x="48%" y="28%" scale={1.1} onClick={() => setSelectedImage("/pic4.jpeg")} aspect="3/4" />
               <FloatingTile src="/pic5.jpeg" delay={1.5} x="52%" y="34%" scale={1} onClick={() => setSelectedImage("/pic5.jpeg")} aspect="1/1" />
               <FloatingTile src="/pic6.jpeg" delay={1.8} x="42%" y="40%" scale={0.9} onClick={() => setSelectedImage("/pic6.jpeg")} aspect="3/4" />
               <FloatingTile src="/pic7.jpeg" delay={2.1} x="58%" y="46%" scale={1.15} onClick={() => setSelectedImage("/pic7.jpeg")} aspect="1/1" />
               <FloatingTile src="/pic8.jpeg" delay={0.2} x="45%" y="52%" scale={1.2} onClick={() => setSelectedImage("/pic8.jpeg")} aspect="3/4" />
               <FloatingTile src="/pic9.jpeg" delay={0.5} x="55%" y="58%" scale={1.05} onClick={() => setSelectedImage("/pic9.jpeg")} aspect="1/1" />
               <FloatingTile src="/pic10.jpeg" delay={0.8} x="40%" y="64%" scale={0.95} onClick={() => setSelectedImage("/pic10.jpeg")} aspect="3/4" />
               <FloatingTile src="/pic11.jpeg" delay={1.1} x="60%" y="70%" scale={1.1} onClick={() => setSelectedImage("/pic11.jpeg")} aspect="1/1" />
               <FloatingTile src="/pic12.jpeg" delay={1.4} x="45%" y="76%" scale={0.85} onClick={() => setSelectedImage("/pic12.jpeg")} aspect="3/4" />
               <FloatingTile src="/pic13.jpeg" delay={1.7} x="55%" y="84%" scale={1.2} objectPosition="center top" onClick={() => setSelectedImage("/pic13.jpeg")} aspect="3/4" />
            </motion.div>
          </div>

          <div className="h-screen w-full flex flex-col items-center justify-center relative">
            <motion.div 
              style={{ 
                y: quizY,
                opacity: quizOpacity
              }}
              className="z-40 w-full max-w-xl px-6"
            >
      {/* LiquidGlass wrap for Quiz state */}
      <LiquidGlass className={`w-full flex flex-col items-center justify-center overflow-hidden relative transition-all duration-500 ${currentQuestion === 'video' ? 'p-2 md:p-4 !rounded-[30px] min-h-[500px] md:min-h-[600px]' : 'py-16 px-12 md:py-20 md:px-14 gap-10 min-h-[400px] md:min-h-[500px]'}`}>
        {/* Layer 1: Transition GIFs Overlay - High z-index to appear instantly over questions */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div 
              key="transition-overlay"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-row items-stretch justify-stretch gap-0 z-[100] bg-[#020202]"
            >
              {transitionGifs.map((src, idx) => (
                <div key={idx} className="flex-1 overflow-hidden relative h-full">
                  <img 
                    src={src} 
                    alt="Transition" 
                    className="absolute inset-0 w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layer 2: Rickroll Overlay */}
        <AnimatePresence>
          {showRickroll && (
            <motion.div 
              key="rickroll-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[101] overflow-hidden bg-black"
            >
              <img 
                src="https://i.giphy.com/lgcUUCXgC8mEo.gif" 
                alt="Rickroll!" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layer 3: Main Quiz Content Logic */}
        <AnimatePresence mode="wait">
          {!isTransitioning && !showRickroll && currentQuestion === 1 && (
            <motion.div 
              key="q1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center gap-10 w-full relative z-10"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#fa4d01] leading-[1.1] tracking-tight">
                Heyyy want to take a quick quiz??
              </h2>
              
              <div className="flex gap-4 w-full">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                  onClick={handleNo}
                >
                  <LiquidGlass className="!py-5 !rounded-[30px] border-[#fa4d01]/10 bg-[#fa4d01]/5 hover:bg-[#fa4d01]/10 transition-all duration-300">
                    <span className="text-[#fa4d01] font-black uppercase tracking-[0.4em] text-xs ml-[0.4em]">
                      No {noCount !== null ? `(${noCount < 0 ? 0 : noCount})` : ''}
                    </span>
                  </LiquidGlass>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                  onClick={handleYes}
                >
                  <LiquidGlass className="!py-5 !rounded-[30px] bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 transition-all duration-300">
                    <span className="text-[#fa4d01] font-black uppercase tracking-[0.4em] text-xs ml-[0.4em]">Yes</span>
                  </LiquidGlass>
                </motion.button>
              </div>
            </motion.div>
          )}

          {!isTransitioning && !showRickroll && currentQuestion === "2.2" && (
            <motion.div 
              key="q2.2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center gap-10 w-full relative z-10"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#fa4d01] leading-[1.1] tracking-tight text-center">
                It will be a quick test Don't worry!!!
              </h2>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
                onClick={() => {
                  recordAnswer("2.2", "continue");
                  startAudioTransition(
                    dexterAudio.current,
                    [
                      "https://i.giphy.com/KvZsnr6sURMJ5EeyO3.gif",
                      "https://i.giphy.com/bTOkX7GHQPnnzDPeE2.gif"
                    ],
                    "2.5"
                  );
                }}
              >
                <LiquidGlass className="!py-5 !rounded-[30px] bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 transition-all duration-300">
                  <span className="text-[#fa4d01] font-black uppercase tracking-[0.4em] text-xs ml-[0.4em]">continue</span>
                </LiquidGlass>
              </motion.button>
            </motion.div>
          )}

          {!isTransitioning && !showRickroll && currentQuestion === "2.5" && (
            <motion.div 
              key="q2.5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center gap-10 w-full relative z-10"
            >
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#fa4d01] leading-[1.1] tracking-tight">
                  DO NOT PRESS!!
                </h2>
                <div className="text-4xl font-black text-[#fa4d01]">
                  {countdown}
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02, rotate: [0, 2, -2, 0] }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
                onClick={() => {
                  recordAnswer("2.5", "PRESS");
                  setShowRickroll(true);
                  const MAX_RICKROLL_TIME = 5000;

                  const cleanup = () => {
                    setShowRickroll(false);
                    setCurrentQuestion(3);
                    if (rickrollAudio.current) {
                      rickrollAudio.current.pause();
                      rickrollAudio.current.currentTime = 0;
                    }
                  };

                  if (rickrollAudio.current) {
                    rickrollAudio.current.currentTime = 0;
                    rickrollAudio.current.onended = cleanup;
                    rickrollAudio.current.onerror = cleanup;
                    
                    // Cap at 5 seconds
                    const timer = setTimeout(cleanup, MAX_RICKROLL_TIME);
                    
                    rickrollAudio.current.play().catch(e => {
                      console.log("Rickroll audio play failed, waiting 5s:", e);
                    });
                  } else {
                    setTimeout(cleanup, MAX_RICKROLL_TIME);
                  }
                }}
              >
                <LiquidGlass className="!py-5 !rounded-[30px] bg-[#fa4d01] hover:bg-[#fa4d01]/90 transition-all duration-300 shadow-[0_0_30px_rgba(250,77,1,0.3)]">
                  <span className="text-white font-black uppercase tracking-[0.4em] text-xs ml-[0.4em]">PRESS</span>
                </LiquidGlass>
              </motion.button>
            </motion.div>
          )}

          {!isTransitioning && !showRickroll && currentQuestion === 3 && (
            <motion.div 
              key="q3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center gap-10 w-full relative z-10"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#fa4d01] leading-[1.1] tracking-tight text-center">
                Nuvvu pottiga unnav ani neeku thelusa??
              </h2>
              
              <div className="flex gap-4 w-full">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                  onClick={() => {
                    recordAnswer(3, "Yes");
                    startAudioTransition(
                      correctAudio.current,
                      ["https://i.giphy.com/YVT4w8N5O7qSiftMNq.gif"],
                      4
                    );
                  }}
                >
                  <LiquidGlass className="!py-5 !rounded-[30px] bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 transition-all duration-300">
                    <span className="text-[#fa4d01] font-black uppercase tracking-[0.4em] text-xs ml-[0.4em]">Yes</span>
                  </LiquidGlass>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                  onClick={() => {
                    recordAnswer(3, "No");
                    startAudioTransition(
                      undertakerAudio.current,
                      ["https://i.giphy.com/lVrwaz7p7aSoCiPLHl.gif"],
                      4
                    );
                  }}
                >
                  <LiquidGlass className="!py-5 !rounded-[30px] bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 transition-all duration-300">
                    <span className="text-[#fa4d01] font-black uppercase tracking-[0.4em] text-xs ml-[0.4em]">No</span>
                  </LiquidGlass>
                </motion.button>
              </div>
            </motion.div>
          )}

          {!isTransitioning && !showRickroll && currentQuestion === 4 && (
            <motion.div 
              key="q4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center gap-10 w-full relative z-10"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#fa4d01] leading-[1.1] tracking-tight text-center">
                CHOOSE : 
              </h2>
              
              <div className="flex flex-col gap-4 w-full">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                  onClick={() => {
                    recordAnswer(4, "ME 😏");
                    startAudioTransition(
                      rizzAudio.current,
                      ["https://i.giphy.com/f0lS4lOcrGGaAVpxT8.gif"],
                      5
                    );
                  }}
                >
                  <LiquidGlass className="!py-5 !rounded-[30px] bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 transition-all duration-300">
                    <span className="text-[#fa4d01] font-black uppercase tracking-[0.4em] text-xs ml-[0.4em]">ME 😏</span>
                  </LiquidGlass>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                  onClick={() => {
                    recordAnswer(4, "CARLOS SAINZ🥱");
                    startAudioTransition(
                      spongebobAudio.current,
                      ["https://i.giphy.com/Lz6971fkGSgCMOOncl.gif"],
                      5
                    );
                  }}
                >
                  <LiquidGlass className="!py-5 !rounded-[30px] bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 transition-all duration-300">
                    <span className="text-[#fa4d01] font-black uppercase tracking-[0.4em] text-xs ml-[0.4em]">CARLOS SAINZ🥱</span>
                  </LiquidGlass>
                </motion.button>
              </div>
            </motion.div>
          )}

          {!isTransitioning && !showRickroll && currentQuestion === 5 && (
            <motion.div 
              key="q5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center gap-10 w-full relative z-10"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#fa4d01] leading-[1.1] tracking-tight text-center">
                What do u prefer??
              </h2>
              
              <div className="flex flex-col gap-4 w-full">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                  onClick={() => {
                    recordAnswer(5, "Potti >>");
                    startAudioTransition(
                      yayboiAudio.current,
                      ["https://i.giphy.com/aQwvKKi4Lv3t63nZl9.gif"],
                      6
                    );
                  }}
                >
                  <LiquidGlass className="!py-5 !rounded-[30px] bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 transition-all duration-300">
                    <span className="text-[#fa4d01] font-black uppercase tracking-[0.4em] text-xs ml-[0.4em]">Potti &gt;&gt;</span>
                  </LiquidGlass>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                  onClick={() => {
                    recordAnswer(5, "Varsiiiiiiii 😁");
                    startAudioTransition(
                      yayyyAudio.current,
                      ["https://i.giphy.com/fUQ4rhUZJYiQsas6WD.gif"],
                      6
                    );
                  }}
                >
                  <LiquidGlass className="!py-5 !rounded-[30px] bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 transition-all duration-300">
                    <span className="text-[#fa4d01] font-black uppercase tracking-[0.4em] text-xs ml-[0.4em]">Varsiiiiiiii 😁</span>
                  </LiquidGlass>
                </motion.button>
              </div>
            </motion.div>
          )}

          {!isTransitioning && !showRickroll && currentQuestion === 6 && (
            <motion.div 
              key="q6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center gap-10 w-full relative z-10"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#fa4d01] leading-[1.1] tracking-tight text-center uppercase">
                CHOOSE ONE FOR REST OF THE LIFE :
              </h2>
              
              <div className="flex flex-col gap-4 w-full">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                  onClick={() => {
                    recordAnswer(6, "Chicken and Any Dosa 🤤");
                    startAudioTransition(
                      nellyAudio.current,
                      ["https://i.giphy.com/2tu5GIeUSNXuvm8p1S.gif"],
                      7
                    );
                  }}
                >
                  <LiquidGlass className="!py-5 !rounded-[30px] bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 transition-all duration-300">
                    <span className="text-[#fa4d01] font-black uppercase tracking-[0.4em] text-xs ml-[0.4em]">Chicken and Any Dosa 🤤</span>
                  </LiquidGlass>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                  onClick={() => {
                    recordAnswer(6, "Predator energy and chocolate flavoured Ice-creams");
                    startAudioTransition(
                      heavenlyAudio.current,
                      ["https://i.giphy.com/ZPAX9fkncCWRBphFxK.gif"],
                      7
                    );
                  }}
                >
                  <LiquidGlass className="!py-5 !rounded-[30px] bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 transition-all duration-300">
                    <span className="text-[#fa4d01] font-black uppercase tracking-[0.4em] text-xs ml-[0.4em] text-balance">Predator energy and chocolate flavoured Ice-creams</span>
                  </LiquidGlass>
                </motion.button>
              </div>
            </motion.div>
          )}

          {!isTransitioning && !showRickroll && currentQuestion === 7 && (
            <motion.div 
              key="q7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center gap-10 w-full relative z-10"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#fa4d01] leading-[1.1] tracking-tight text-center">
                sleep or shopping??
              </h2>
              
              <div className="flex flex-col gap-4 w-full">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                  onClick={() => {
                    recordAnswer(7, "Padkuntaa 👌");
                    startAudioTransition(
                      sleepAudio.current,
                      ["https://i.giphy.com/gjsBu8ZUniOODwgPP5.gif"],
                      8
                    );
                  }}
                >
                  <LiquidGlass className="!py-5 !rounded-[30px] bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 transition-all duration-300">
                    <span className="text-[#fa4d01] font-black uppercase tracking-[0.4em] text-xs ml-[0.4em]">Padkuntaa 👌</span>
                  </LiquidGlass>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                  onClick={() => {
                    recordAnswer(7, "Fullll shoppingg 😎");
                    startAudioTransition(
                      wowAudio.current,
                      ["https://i.giphy.com/RLJk7R3mvmawWdjmCq.gif"],
                      8
                    );
                  }}
                >
                  <LiquidGlass className="!py-5 !rounded-[30px] bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 transition-all duration-300">
                    <span className="text-[#fa4d01] font-black uppercase tracking-[0.4em] text-xs ml-[0.4em]">Fullll shoppingg 😎</span>
                  </LiquidGlass>
                </motion.button>
              </div>
            </motion.div>
          )}

          {!isTransitioning && !showRickroll && currentQuestion === 8 && (
            <motion.div 
              key="q8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center gap-10 w-full relative z-10"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#fa4d01] leading-[1.1] tracking-tight text-center">
                What should i give you daily?
              </h2>
              
              <div className="flex flex-col gap-4 w-full">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                  onClick={() => {
                    recordAnswer(8, "KinderJoy !!");
                    startAudioTransition(
                      weekendrizzAudio.current,
                      ["https://i.giphy.com/QBosWy0XVrehzTJ2pF.gif"],
                      9
                    );
                  }}
                >
                  <LiquidGlass className="!py-5 !rounded-[30px] bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 transition-all duration-300">
                    <span className="text-[#fa4d01] font-black uppercase tracking-[0.4em] text-xs ml-[0.4em]">KinderJoy !!</span>
                  </LiquidGlass>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                  onClick={() => {
                    recordAnswer(8, "best part of cone ice-cream");
                    startAudioTransition(
                      frenchAudio.current,
                      ["https://i.giphy.com/1C3WJML9LCshi.gif"],
                      9
                    );
                  }}
                >
                  <LiquidGlass className="!py-5 !rounded-[30px] bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 transition-all duration-300">
                    <span className="text-[#fa4d01] font-black uppercase tracking-[0.4em] text-xs ml-[0.4em]">best part of cone ice-cream</span>
                  </LiquidGlass>
                </motion.button>
              </div>
            </motion.div>
          )}

          {!isTransitioning && !showRickroll && currentQuestion === 9 && (
            <motion.div 
              key="q9"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center gap-6 w-full relative z-10"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#fa4d01] leading-[1.1] tracking-tight text-center">
                Ok i'll stop with the questions
              </h2>
            </motion.div>
          )}

          {!isTransitioning && !showRickroll && currentQuestion === "video" && (
            <motion.div 
              key="video-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center py-8 px-4"
            >
              <h2 className="text-xl md:text-2xl font-black text-[#fa4d01] mb-8 tracking-tight text-center">
                Happiest Birthday Varshii 🧡🥳
              </h2>
              <div className="w-full h-full relative group flex flex-col items-center">
                <video 
                  src="/hbdwishes.mp4" 
                  autoPlay 
                  muted
                  playsInline
                  controls
                  preload="auto"
                  className="w-full h-auto max-h-[70vh] md:max-h-[60vh] object-contain rounded-[30px] bg-black/40"
                  onError={(e) => console.error("HBD Video failed to load", e)}
                />
                
                <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 2 }}
                   className="mt-6 flex justify-center w-full"
                >
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      sendNotification('ACTIVITY', { responses: quizResponses, name });
                      navigate('/final-page');
                    }}
                    className="px-3 py-1.5 bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 backdrop-blur-md rounded-full border border-[#fa4d01]/20 transition-all duration-300 group"
                  >
                    <span className="text-[9px] text-[#fa4d01] font-black uppercase tracking-[0.4em]">Go to final page</span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {!isTransitioning && !showRickroll && currentQuestion === "final-page" && (
            <motion.div 
              key="final-page"
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center gap-8 w-full relative z-10 py-10"
            >
              <div className="relative">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -inset-4 bg-[#fa4d01]/10 blur-2xl rounded-full"
                />
                <h2 className="text-4xl md:text-6xl font-black text-[#fa4d01] leading-[1.1] tracking-tighter text-center">
                  HAPPIEST BIRTHDAY<br/>VARSHIIII 🧡
                </h2>
              </div>
              
              <div className="space-y-4 max-w-sm">
                <p className="text-[#fa4d01]/80 text-sm md:text-base font-medium tracking-wide text-center leading-relaxed">
                  Hope this little journey brought a smile to your face today! You're absolutely amazing and deserve the world.
                </p>
                <div className="flex justify-center pt-4">
                  <div className="px-4 py-1 bg-[#fa4d01]/5 rounded-full border border-[#fa4d01]/10">
                    <span className="text-[10px] text-[#fa4d01]/40 font-black uppercase tracking-[0.4em]">Forever Yours</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {!isTransitioning && !showRickroll && currentQuestion === "final" && (
            <motion.div 
              key="final"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 w-full relative z-10"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#fa4d01] leading-[1.1] tracking-tight">
                That's all for now! 🧡
              </h2>
              <p className="text-[#fa4d01]/60 font-medium tracking-wide">
                Wishing you the best day ever Varshiii!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </LiquidGlass>
            </motion.div>
          </div>
        </div>

        <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-transparent via-[#fa4d01]/5 to-transparent shadow-[inset_0_0_200px_rgba(250,77,1,0.05)]" />
      </div>
  );

  const loginView = (
    <div className="min-h-screen w-full overflow-hidden flex items-center justify-center relative font-sans bg-[#020202]">
      
      {/* Film Grain & Scanline Overlays */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] bg-grain" />
      <div className="fixed inset-0 z-[101] pointer-events-none scanlines opacity-20" />
      
      {/* Background Glow - Optimized with Opacity crossfade */}
      <div className="absolute inset-0 -z-50 blur-[120px] pointer-events-none">
        <motion.div 
          className="absolute inset-0 opacity-30"
          initial={false}
          animate={{ 
            opacity: isZooming ? 0 : 0.3,
            background: `radial-gradient(circle at center, ${theme === 'ferrari' ? currentColors.text : WILLIAMS_COLORS.accent}, transparent)`
          }}
          transition={{ duration: 1.5 }}
        />
        <motion.div 
          className="absolute inset-0"
          initial={false}
          animate={{ 
            opacity: isZooming ? 0.3 : 0,
          }}
          style={{ background: 'radial-gradient(circle at center, #000, transparent)' }}
          transition={{ duration: 1.5 }}
        />
      </div>

      {/* Screen Flash */}
      <AnimatePresence>
        {showFlash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[200] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
        <AnimatePresence>
          {!showLogin && (
              <motion.div
                className="flex items-center justify-center pointer-events-auto will-change-transform"
                animate={isZooming ? { 
                  scale: 60, // Slightly reduced but still effective
                  opacity: 0,
                } : { 
                  scale: 1, 
                  opacity: 1 
                }}
                transition={{ 
                  duration: isZooming ? 1.5 : 0.8, // Speed up slightly for punchiness
                  ease: isZooming ? [0.45, 0, 0.55, 1] : "easeInOut" 
                }}
              >
              <motion.div 
                onMouseEnter={() => setTheme('williams')}
                onMouseLeave={() => {
                  if (!isZooming) setTheme('ferrari');
                }}
                onClick={() => setIsZooming(true)}
                className="cursor-pointer relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 blur-2xl opacity-40 bg-white/5 rounded-full scale-150 group-hover:scale-200 transition-transform duration-500" />
                
                <Racing55 
                  color={currentColors.text} 
                  className="w-64 h-64 relative z-10"
                  style={{
                    filter: isZooming ? 'none' : `drop-shadow(0 0 30px ${theme === 'ferrari' ? 'rgba(91, 14, 20, 0.2)' : 'rgba(71, 195, 245, 0.4)'})`,
                    willChange: 'filter, transform'
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0, y: 10, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, y: 0, backdropFilter: "blur(40px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="z-50 w-full max-w-[320px] p-8 rounded-[40px] bg-white/[0.03] border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] mx-4 backdrop-blur-xl relative"
          >
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <form className="space-y-6 relative z-10" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.4em] font-medium text-white/30 ml-1">name</label>
                <input 
                  type="text" 
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                  className="w-full bg-white/[0.04] border border-white/5 rounded-[20px] py-4 px-6 text-white text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.4em] font-medium text-[#fa4d01]/50 ml-1">date-of-birth</label>
                <input 
                  type="date" 
                  name="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/5 rounded-[20px] py-4 px-6 text-white text-sm focus:outline-none focus:border-[#fa4d01]/30 focus:bg-[#fa4d01]/5 transition-all duration-300 [color-scheme:dark]"
                />
              </div>

              {error && (
                <p className="text-[#fa4d01] text-xs text-center font-medium tracking-wide animate-pulse">{error}</p>
              )}

              <button 
                type="submit"
                className="w-full bg-[#fa4d01]/10 hover:bg-[#fa4d01]/20 text-[#fa4d01] rounded-[20px] py-4 px-4 text-[13px] font-bold uppercase tracking-[0.5em] transition-all duration-500 mt-6 active:scale-[0.98] border border-[#fa4d01]/20 hover:border-[#fa4d01]/40"
              >
                submit
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background zoom texture */}
      {showLogin && (
        <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.02]">
           <Racing55 color="#fff" className="w-[180vw] h-[180vw] scale-150 rotate-[-15deg] blur-md" />
        </div>
      )}

      {/* Dynamic background color transition */}
      <motion.div 
        className="fixed inset-0 -z-[60]"
        animate={{ 
          backgroundColor: isZooming ? "#020202" : currentColors.bg 
        }}
        transition={{ duration: 1.5 }}
      />
    </div>
  );

  return (
    <Routes>
      <Route path="/final-page" element={<FinalPage onReset={resetQuiz} />} />
      <Route path="/" element={isAuthenticated ? mainView : loginView} />
    </Routes>
  );
}
