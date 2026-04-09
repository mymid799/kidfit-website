import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// TypeScript declaration for A-Frame custom elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-marker': any;
      'a-entity': any;
      'a-video': any;
      'a-assets': any;
      'a-text': any;
    }
  }
}

const ARViewer = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [arLoaded, setArLoaded] = useState(false);

    useEffect(() => {
        // Dynamic script loading for A-Frame and AR.js to avoid SSR/NPM issues
        const aframeScript = document.createElement('script');
        aframeScript.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
        
        const arjsScript = document.createElement('script');
        arjsScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';

        aframeScript.onload = () => {
            document.body.appendChild(arjsScript);
        };

        arjsScript.onload = () => {
            setArLoaded(true);
            
            // Re-initialize click handler for video play (Browsers block auto-play)
            window.addEventListener('click', () => {
                const video = document.querySelector('#vid') as HTMLVideoElement;
                if (video) video.play();
            }, { once: true });
        };

        document.head.appendChild(aframeScript);

        return () => {
            // Clean up: Remove A-Frame injected classes and camera on component unmount
            const aScene = document.querySelector('a-scene');
            if (aScene) aScene.remove();
            
            const video = document.querySelector('video');
            if (video && video.srcObject) {
                const tracks = (video.srcObject as MediaStream).getTracks();
                tracks.forEach(track => track.stop());
                video.remove();
            }

            document.body.classList.remove('a-container');
            // Remove scripts if needed, though usually safe to leave cached
        };
    }, []);

    if (!arLoaded) {
        return (
            <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center text-white z-50">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-black uppercase tracking-widest text-xs animate-pulse">Đang nạp không gian AR...</p>
                <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-wider">Vui lòng cho phép quyền truy cập Camera</p>
            </div>
        );
    }

    return (
        <>
            {/* UI Overlay */}
            <div className="fixed top-0 inset-x-0 z-[9999] p-6 pointer-events-none">
                <div className="flex items-center justify-between pointer-events-auto">
                    <button 
                        onClick={() => navigate(-1)}
                        className="size-12 bg-black/40 backdrop-blur-md rounded-2xl text-white flex items-center justify-center hover:bg-black/60 transition-all border border-white/20"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div className="bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
                        <p className="text-[10px] font-black text-white uppercase tracking-widest text-center">AR Scanner: ON</p>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-10 inset-x-0 z-[9999] px-6 text-center pointer-events-none">
                <div className="inline-block bg-primary/20 backdrop-blur-xl border border-primary/30 p-4 rounded-[32px] pointer-events-auto animate-bounce shadow-2xl shadow-primary/20">
                    <p className="text-white font-black text-xs uppercase tracking-[2px]">Hãy đưa Camera vào mã QR/Marker</p>
                </div>
            </div>

            {/* A-Frame AR Scene */}
            <a-scene
                embedded
                arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
                vr-mode-ui="enabled: false"
                renderer="logarithmicDepthBuffer: true;"
            >
                <a-assets>
                    {/* Intro Video Asset */}
                    <video id="vid" src="/assets/video/intro.mp4" loop crossOrigin="anonymous"></video>
                </a-assets>

                {/* Marker-based Video Display */}
                <a-marker preset="hiro">
                    {/* Video on a plane */}
                    <a-video 
                        src="#vid" 
                        width="1.6" 
                        height="0.9" 
                        position="0 0.1 0" 
                        rotation="-90 0 0"
                        play-on-click
                    ></a-video>
                    
                    {/* Instructional text in AR */}
                    <a-text 
                        value="KidFit STEAM - Product Intro" 
                        position="0 0.1 0.8" 
                        rotation="-90 0 0" 
                        scale="0.5 0.5 0.5" 
                        align="center"
                        color="#4cae4f"
                        font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"
                    ></a-text>
                </a-marker>

                <a-entity camera></a-entity>
            </a-scene>
        </>
    );
};

export default ARViewer;
