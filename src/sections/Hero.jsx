import React from 'react'
import { words, socialImgs } from '../constants'
import Button from '../components/Button'
import HeroExperience from '../components/HeroModels/HeroExperience'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import AnimatedCounter from '../components/AnimatedCounter'


const App = () => {
  useGSAP(() => {
    gsap.fromTo('.hero-text h1',
      {
        y: 50,
        opacity: 0

      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.inout'
      },
    )
  })
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="background" />
      </div>
      <div className="hero-layout">
        {/* LEFT: HERO CONTENT */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word) => (
                      <span key={word.text} className='flex items-center md:gap-3 gap-1 h-[48px] md:h-[78px]'>
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className='xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50' />
                        <span>
                          {word.text}
                        </span>

                      </span>
                    ))}
                  </span>
                </span>
              </h1>

              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>

            <p className='text-white-50 md:text-xl relative z-10 pointer-events-none'>Hi, I'm Mujjamil , a developer with a passion<br /> for 
            building real world projects. </p>


            <div className="flex flex-col gap-4">
              <Button
                className="md:w-80 md:h-14 w-60 h-12"
                id="button"
                text="See my Work"
              />
              <div className="flex items-center gap-4 mt-2 relative z-20">
                <span className="text-white-50 text-sm md:text-base font-medium">Follow me :</span>
                <div className="flex gap-3">
                  {socialImgs.map((socialImg, index) => (
                    <a
                      key={index}
                      href={socialImg.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-black-50 bg-black-100 hover:bg-black-50 flex justify-center items-center rounded-xl size-8 md:size-12 cursor-pointer transition-all duration-300 hover:scale-110 hover:border-white-50"
                    >
                      <img src={socialImg.imgPath} alt={socialImg.name} className="size-5 md:size-6" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="relative z-10 mt-0">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-transparent text-white-50 border border-[#2d2d38] text-sm md:text-base hover:text-white hover:border-white transition-all duration-300 w-fit cursor-pointer shadow-lg hover:scale-105"
                >
                  View Resume
                </a>
              </div>
            </div>
          </div>
        </header>
        {/* RIGHT:3D MODEL */}
        <figure className="w-full m-0 flex justify-center xl:contents">
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure>

      </div>
      <AnimatedCounter />

    </section>
  )
}

export default App
