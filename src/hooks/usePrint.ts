"use client";

import {useCallback} from "react";

/** Opens the browser print dialog: the sheet is laid out for A4 in resume.module.scss. */
export function usePrint() {
    return useCallback(() => window.print(), []);
}
