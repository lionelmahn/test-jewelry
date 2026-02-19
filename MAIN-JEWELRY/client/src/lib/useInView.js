import { useEffect, useRef, useState } from "react";


export function useInView() {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                io.unobserve(entry.target);
            }
        });
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, []);

    return { ref, inView };
}
