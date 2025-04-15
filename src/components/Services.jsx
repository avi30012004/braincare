import Section from "./Section";
import Heading from "./Heading";
import { meditating, moodtracking, wellbeing, check } from "../assets";
import { brainwaveServices, brainwaveServicesIcons } from "../constants";
import {
  PhotoChatMessage,
  Gradient,
  VideoBar,
  VideoChatMessage,
} from "./design/Services";

import Generating from "./Generating";

const Services = () => {
  return (
    <Section id="how-to-use">
      <div className="container">
        <Heading
          title="Empower Your Mental Well-being"
          text="Explore our services designed to help you understand, improve, and maintain your mental health."
        />

        <div className="relative">
          <div
            className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]"
            style={{
              backgroundImage: `url(${wellbeing})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50">
              </div>







            <div className="relative z-1 max-w-[22rem] ml-auto">
              <h4 className="h4 mb-4">Wellbeing Resources</h4>
              <p className="body-2 mb-[3rem] text-n-3 leading-relaxed">
                Connect with our AI companion for empathetic conversations and guidance. Get support
                anytime, anywhere. Use our mood tracking feature.
              </p>
              <ul className="body-2 leading-relaxed">
                {[ "AI Chat","Track Your Emotions","Personalized insights"].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start py-4 border-t border-n-6"
                  >
                    <img width={24} height={24} src={check} />
                    <p className="ml-4">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Generating className="absolute left-4 right-4 bottom-4 border-n-1/10 border lg:left-1/2 lg-right-auto lg:bottom-8 lg:-translate-x-1/2" />
          </div>

          <div className="relative z-1 grid gap-5 lg:grid-cols-2">
          <div className="relative min-h-[39rem] border border-n-1/10 rounded-3xl overflow-hidden">
              <div className="absolute inset-0">              <img
                  src={moodtracking}
                  className="h-full w-full object-cover"
                  width={630}
                  height={750}
                  alt="Wellbeing resources"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15 leading-relaxed">
              <h4 className="h4 mb-4">Personalized Reflection Prompts</h4>
                <p className="body-2 mb-[3rem] text-n-3 leading-relaxed">
                  Receive tailored prompts designed to encourage self-reflection and personal growth.
                  Explore your thoughts and emotions in a safe and supportive space.
                  
                </p> 
               </div>

              
            </div>

            <div className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem]">
              <div className="py-12 px-4 xl:px-8">
                <h4 className="h4 mb-4">Stress Management Toolkit</h4>
                <p className="body-2 mb-[2rem] text-n-3 leading-relaxed">  
                Discover a variety of meditation guides and practices designed to foster relaxation and improve focus.
                  
                </p>

                <ul className="flex items-center justify-between">
                  {brainwaveServicesIcons.slice(0, 3).map((item, index) => (
                     <li
                      
                      key={index}
                      className={`rounded-2xl flex items-center justify-center ${
                        index === 2
                          ? "w-[3rem] h-[3rem] p-0.25 bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]"
                          : "flex w-10 h-10 bg-n-6 md:w-15 md:h-15"
                      }`}
                    >
                      <div
                        className={
                          index === 2
                            ? "flex items-center justify-center w-full h-full bg-n-7 rounded-[1rem]"
                            : ""
                        }
                      >
                        <img src={item} width={24} height={24} alt={item} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem]">
                <img
                  src={meditating}
                  className="w-full h-full object-cover"
                  width={512}
                  height={400}
                  alt="robot"
                />

                
              </div>
            </div>
          </div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default Services;