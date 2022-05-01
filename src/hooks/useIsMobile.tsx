import { useMediaQuery } from "@chakra-ui/react"

export function useIsMobile(): boolean {
    return useMediaQuery("(max-width: 767px)")[0]
}

export function useIsMobileTernary<T1, T2>(mobile: T1, desktop: T2): T1 | T2 {
    return useIsMobile() ? mobile : desktop
}
