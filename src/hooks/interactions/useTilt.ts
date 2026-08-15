"use client";

import {useEffect, useRef} from "react";

/**
 * Pointer-following 3D tilt for a card. Values are eased towards the pointer on
 * an animation frame, so the card keeps moving after the pointer stops.
 * Coarse pointers and reduced-motion get a static card.
 */
export function useTilt<T extends HTMLElement>() {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!fine || reduced) return;

        let raf = 0;
        let tx = 0, ty = 0, lift = 0;
        let cx = 0, cy = 0, cl = 0;

        const render = () => {
            cx += (tx - cx) * 0.14;
            cy += (ty - cy) * 0.14;
            cl += (lift - cl) * 0.14;
            el.style.transform = `perspective(900px) rotateX(${-cy * 7}deg) rotateY(${cx * 9}deg) translateZ(${cl * 14}px)`;
            const settled = Math.abs(tx - cx) < 0.001 && Math.abs(ty - cy) < 0.001 && Math.abs(lift - cl) < 0.001;
            raf = settled ? 0 : requestAnimationFrame(render);
        };
        const kick = () => {
            if (!raf) raf = requestAnimationFrame(render);
        };

        const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            tx = (e.clientX - r.left) / r.width - 0.5;
            ty = (e.clientY - r.top) / r.height - 0.5;
            lift = 1;
            kick();
        };
        const leave = () => {
            tx = 0;
            ty = 0;
            lift = 0;
            kick();
        };

        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
            cancelAnimationFrame(raf);
        };
    }, []);

    return ref;
}
