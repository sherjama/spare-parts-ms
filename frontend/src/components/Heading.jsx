import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Heading = ({ title }) => {
  const headerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Header animation
    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8 }
    );
  }, []);
  return (
    <div>
      <h1
        ref={headerRef}
        className="text-5xl font-nexar1 font-extrabold text-center mb-12 drop-shadow-[0_0_12px_rgba(99,102,241,0.3)]"
      >
        <span className="dark:text-indigo-400 text-indigo-900">{title}</span>
      </h1>
    </div>
  );
};

export default Heading;
