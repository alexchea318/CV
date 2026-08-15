"use client";

import {type CSSProperties, useEffect, useState} from "react";

/** Read progress 0…1 of the document, for the hairline under the nav. */
export function useScrollProgress(): CSSProperties {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let raf = 0;
        const read = () => {
            raf = 0;
            const doc = document.documentElement;
            const scrollable = doc.scrollHeight - window.innerHeight;
            setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(read);
        };

        read();
        window.addEventListener("scroll", onScroll, {passive: true});
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(raf);
        };
    }, []);

    return {"--progress": progress} as CSSProperties;
}
