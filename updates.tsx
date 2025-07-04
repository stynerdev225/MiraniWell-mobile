// filepath: /Users/stynerstiner/Downloads/social_media_app-main/updates.tsx
import React, { useState } from "react";

const Updates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState("");

  return (
    <div className="updates-container">
      {/* Module 4 */}
      <div className="relative flex items-start gap-5">
        <div className="absolute top-0 left-6 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full"></div>
        <div className="w-12 text-center pt-2 text-light-3 text-xs">
          <div className="font-medium">04</div>
        </div>
        <div className="flex-1 bg-dark-2 p-5 rounded-xl">
            <div className="flex flex-row">
                {/* Left content area (2/3 width) */}
                <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-amber-600 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                                <path d="M12 2v4"></path>
                                <path d="M12 18v4"></path>
                                <path d="m4.93 4.93 2.83 2.83"></path>
                                <path d="m16.24 16.24 2.83 2.83"></path>
                                <path d="M2 12h4"></path>
                                <path d="M18 12h4"></path>
                                <path d="m4.93 19.07 2.83-2.83"></path>
                                <path d="m16.24 7.76 2.83-2.83"></path>
                            </svg>
                        </div>
                        <h4 className="text-lg font-medium text-white">Spiritual Growth</h4>
                    </div>
                    <p className="text-light-2 mb-3 text-sm">Develop a deeper connection with your inner self and the world around you through spiritual practices.</p>
                    <p className="text-light-2 mb-4 text-sm">Embark on a journey to deepen your spiritual awareness through proven practices that foster a sense of connection and purpose. This module helps you tap into the wisdom that lies beyond the physical and mental realms.</p>
                    <div className="flex items-center gap-2 mt-3">
                        <svg className="text-primary-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span className="text-sm text-light-3">4.5 hours</span>
                    </div>
                </div>
                
                {/* Right preview video area (1/3 width) */}
                <div className="w-1/3">
                    <div
                        className="w-full relative overflow-hidden rounded-lg cursor-pointer group border border-dark-4"
                        onClick={() => {
                            setIsModalOpen(true);
                            setModalVideoUrl("https://www.youtube.com/embed/8GtTyC53kjU");
                        }}
                    >
                    <div className="relative aspect-video bg-dark-4 rounded-md overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 to-dark-4 opacity-70"></div>
                        <img
                            src="https://img.youtube.com/vi/8GtTyC53kjU/mqdefault.jpg"
                            alt="Video thumbnail"
                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-primary-500 rounded-full p-2 shadow-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                            </div>
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-end p-3">
                            <div className="flex flex-col items-start max-w-[70%] z-10">
                                <div className="text-xs text-light-2 mb-1">Preview (2:50)</div>
                                <div className="text-xs text-primary-500 font-medium">Explore techniques for spiritual awareness</div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-1 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Module 5 */}
      <div className="relative flex items-start gap-5">
          <div className="absolute top-0 left-6 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full"></div>
          <div className="w-12 text-center pt-2 text-light-3 text-xs">
              <div className="font-medium">05</div>
          </div>
          <div className="flex-1 bg-dark-2 p-5 rounded-xl">
              <div className="flex flex-row">
                  {/* Left content area (2/3 width) */}
                  <div className="flex-1 pr-4">
                      <div className="flex items-center gap-3 mb-2">
                          <div className="bg-green-600 p-2 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                  <path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
                                  <line x1="8" y1="10" x2="16" y2="10"></line>
                                  <line x1="8" y1="14" x2="14" y2="14"></line>
                                  <line x1="8" y1="18" x2="12" y2="18"></line>
                              </svg>
                          </div>
                          <h4 className="text-lg font-medium text-white">Integration Practices</h4>
                      </div>
                      <p className="text-light-2 mb-3 text-sm">Learn to integrate these practices into your everyday life for sustained growth and wellbeing.</p>
                      <p className="text-light-2 mb-4 text-sm">Understand the science behind how mental patterns directly influence your physical health and how to use this connection constructively. This module bridges the gap between your thoughts and bodily responses.</p>
                      <div className="flex items-center gap-2 mt-3">
                          <svg className="text-primary-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span className="text-sm text-light-3">5 hours</span>
                      </div>
                  </div>
                  
                  {/* Right preview video area (1/3 width) */}
                  <div className="w-1/3">
                      <div
                          className="w-full relative overflow-hidden rounded-lg cursor-pointer group border border-dark-4"
                          onClick={() => {
                              setIsModalOpen(true);
                              setModalVideoUrl("https://www.youtube.com/embed/XiVVYl2kZ68");
                          }}
                      >
                      <div className="relative aspect-video bg-dark-4 rounded-md overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-dark-4 opacity-70"></div>
                          <img
                              src="https://img.youtube.com/vi/XiVVYl2kZ68/mqdefault.jpg"
                              alt="Video thumbnail"
                              className="absolute inset-0 w-full h-full object-cover opacity-50"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-primary-500 rounded-full p-2 shadow-lg flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                  </svg>
                              </div>
                          </div>
                          <div className="absolute inset-0 flex flex-col justify-end p-3">
                              <div className="flex flex-col items-start max-w-[70%] z-10">
                                  <div className="text-xs text-light-2 mb-1">Preview (3:10)</div>
                                  <div className="text-xs text-primary-500 font-medium">Learn how thoughts influence physical wellbeing</div>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-dark-1 to-transparent pointer-events-none"></div>
                          </div>
                      </div>
                      <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* Module 6 */}
      <div className="relative flex items-start gap-5">
          <div className="absolute top-0 left-6 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full"></div>
          <div className="w-12 text-center pt-2 text-light-3 text-xs">
              <div className="font-medium">06</div>
          </div>
          <div className="flex-1 bg-dark-2 p-5 rounded-xl">
              <div className="flex flex-row">
                  {/* Left content area (2/3 width) */}
                  <div className="flex-1 pr-4">
                      <div className="flex items-center gap-3 mb-2">
                          <div className="bg-blue-600 p-2 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                              </svg>
                          </div>
                          <h4 className="text-lg font-medium text-white">Mind-Body-Spirit Connection</h4>
                      </div>
                      <p className="text-light-2 mb-3 text-sm">Master advanced integration techniques and create your personalized holistic wellness plan.</p>
                      <p className="text-light-2 mb-4 text-sm">Explore the profound connection between physical movement and spiritual growth through dynamic practices that unite the body and soul. This module shows you how movement can become meditation and foster deeper spiritual awareness.</p>
                      <div className="flex items-center gap-2 mt-3">
                          <svg className="text-primary-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span className="text-sm text-light-3">4 hours</span>
                      </div>
                  </div>
                  
                  {/* Right preview video area (1/3 width) */}
                  <div className="w-1/3">
                      <div
                          className="w-full relative overflow-hidden rounded-lg cursor-pointer group border border-dark-4"
                          onClick={() => {
                              setIsModalOpen(true);
                              setModalVideoUrl("https://www.youtube.com/embed/inpok4MKVLM");
                          }}
                      >
                      <div className="relative aspect-video bg-dark-4 rounded-md overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-dark-4 opacity-70"></div>
                          <img
                              src="https://img.youtube.com/vi/inpok4MKVLM/mqdefault.jpg"
                              alt="Video thumbnail"
                              className="absolute inset-0 w-full h-full object-cover opacity-50"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-primary-500 rounded-full p-2 shadow-lg flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                  </svg>
                              </div>
                          </div>
                          <div className="absolute inset-0 flex flex-col justify-end p-3">
                              <div className="flex flex-col items-start max-w-[70%] z-10">
                                  <div className="text-xs text-light-2 mb-1">Preview (2:45)</div>
                                  <div className="text-xs text-primary-500 font-medium">Discover practices connecting movement with spirit</div>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-dark-1 to-transparent pointer-events-none"></div>
                          </div>
                      </div>
                      <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* Module 7 */}
      <div className="relative flex items-start gap-5">
          <div className="absolute top-0 left-6 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full"></div>
          <div className="w-12 text-center pt-2 text-light-3 text-xs">
              <div className="font-medium">07</div>
          </div>
          <div className="flex-1 bg-dark-2 p-5 rounded-xl">
              <div className="flex flex-row">
                  {/* Left content area (2/3 width) */}
                  <div className="flex-1 pr-4">
                      <div className="flex items-center gap-3 mb-2">
                          <div className="bg-purple-600 p-2 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                          </div>
                          <h4 className="text-lg font-medium text-white">Complete Integration</h4>
                      </div>
                      <p className="text-light-2 mb-3 text-sm">Bring all aspects of mind, body, and spirit together in this final comprehensive module.</p>
                      <p className="text-light-2 mb-4 text-sm">Experience the culmination of your Mind Body Spirit journey as you learn to seamlessly integrate all practices into a personalized lifestyle approach. This final module helps you create sustainable routines that will continue to nurture your holistic wellbeing long-term.</p>
                      <div className="flex items-center gap-2 mt-3">
                          <svg className="text-primary-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span className="text-sm text-light-3">6 hours</span>
                      </div>
                  </div>
                  
                  {/* Right preview video area (1/3 width) */}
                  <div className="w-1/3">
                      <div
                          className="w-full relative overflow-hidden rounded-lg cursor-pointer group border border-dark-4"
                          onClick={() => {
                              setIsModalOpen(true);
                              setModalVideoUrl("https://www.youtube.com/embed/a0JlQNryh-o");
                          }}
                      >
                      <div className="relative aspect-video bg-dark-4 rounded-md overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-dark-4 opacity-70"></div>
                          <img
                              src="https://img.youtube.com/vi/a0JlQNryh-o/mqdefault.jpg"
                              alt="Video thumbnail"
                              className="absolute inset-0 w-full h-full object-cover opacity-50"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-primary-500 rounded-full p-2 shadow-lg flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                  </svg>
                              </div>
                          </div>
                          <div className="absolute inset-0 flex flex-col justify-end p-3">
                              <div className="flex flex-col items-start max-w-[70%] z-10">
                                  <div className="text-xs text-light-2 mb-1">Preview (3:25)</div>
                                  <div className="text-xs text-primary-500 font-medium">Complete integration of mind, body & spirit journey</div>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-dark-1 to-transparent pointer-events-none"></div>
                          </div>
                      </div>
                      <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="bg-dark-2 p-2 rounded-xl w-full max-w-3xl">
            <div className="flex justify-end mb-2">
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setModalVideoUrl("");
                }}
                className="text-light-2 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="relative aspect-video">
              <iframe
                src={modalVideoUrl}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Updates;
