import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={rydeRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <img src="/images/stockexx.png" alt="Ryde App Interface" />
            </div>
            <div className="text-content">
              <h2>
                StockEx — A Real-Time Paper Trading Android App for Smart
                Investors
              </h2>
              <p className="text-white-50 md:text-xl">
                Built during my internship at <strong>Nextin</strong> as a
                collaboration project. Developed natively in{" "}
                <strong>Java</strong> with an <strong>XML</strong> UI, powered
                by <strong>Firebase</strong> for auth & data, and connected to a
                live <strong>Stock API</strong> for real-time market data —
                letting users practice trading without real money.
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={libraryRef}>
              <div className="image-wrapper bg-[#FFEFDB]">
                <img
                  src="/images/cafeproject.png"
                  alt="Pizza Cafe Builder App"
                />
              </div>
              <h2>Pizza Cafe — Build & Order Your Perfect Pizza Online</h2>
              <p className="text-white-50 text-sm md:text-base mt-2">
                A live full-stack pizza builder crafted with{" "}
                <strong>React + JSX</strong> and{" "}
                <strong>Tailwind CSS</strong>, backed by{" "}
                <strong>Supabase</strong> for real-time order management
                and user data.
              </p>
              <a
                href="https://pizza-builder-tau.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1c1c21] text-white border border-[#2d2d38] text-sm font-semibold hover:bg-[#282732] transition-colors duration-300"
              >
                🔗 View Live Site
              </a>
            </div>

            <div className="project" ref={ycDirectoryRef}>
              <div className="image-wrapper bg-[#FFE7EB]">
                <img src="/images/project3.png" alt="YC Directory App" />
              </div>
              <h2>YC Directory - A Startup Showcase App</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;