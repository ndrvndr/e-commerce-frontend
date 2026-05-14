export type LayerColor =
  | 'nuxt'
  | 'laravel'
  | 'filament'
  | 'infra-nuxt'
  | 'infra-laravel'

export type BadgeColor = LayerColor | 'neutral'

export interface BadgeData {
  label: string
  color: BadgeColor
}

export interface NodeData {
  icon: string
  label: string
  sub: string
  badges: BadgeData[]
}

export interface WireLabel {
  text: string
  color: string
  borderColor: string
}

export const COLOR_MAP: Record<
  LayerColor,
  { accent: string; nodeBase: string; nodeHover: string; bodyBorder: string }
> = {
  nuxt: {
    accent: '#41b883',
    nodeBase: 'rgba(65,184,131,0.10)',
    nodeHover: 'rgba(65,184,131,0.16)',
    bodyBorder: 'rgba(65,184,131,0.15)',
  },
  laravel: {
    accent: '#ff2d20',
    nodeBase: 'rgba(255,45,32,0.09)',
    nodeHover: 'rgba(255,45,32,0.15)',
    bodyBorder: 'rgba(255,45,32,0.15)',
  },
  filament: {
    accent: '#f59e0b',
    nodeBase: 'rgba(245,158,11,0.09)',
    nodeHover: 'rgba(245,158,11,0.15)',
    bodyBorder: 'rgba(245,158,11,0.15)',
  },
  'infra-nuxt': {
    accent: '#a78bfa',
    nodeBase: 'rgba(167,139,250,0.08)',
    nodeHover: 'rgba(167,139,250,0.14)',
    bodyBorder: 'rgba(167,139,250,0.15)',
  },
  'infra-laravel': {
    accent: '#60a5fa',
    nodeBase: 'rgba(96,165,250,0.08)',
    nodeHover: 'rgba(96,165,250,0.14)',
    bodyBorder: 'rgba(96,165,250,0.15)',
  },
}

export const BADGE_PALETTE: Record<
  BadgeColor,
  { bg: string; text: string; border: string }
> = {
  nuxt:            { bg: 'rgba(65,184,131,0.10)',  text: '#41b883', border: 'rgba(65,184,131,0.25)' },
  laravel:         { bg: 'rgba(255,45,32,0.09)',   text: '#ff2d20', border: 'rgba(255,45,32,0.25)' },
  filament:        { bg: 'rgba(245,158,11,0.09)',  text: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
  'infra-laravel': { bg: 'rgba(96,165,250,0.09)',  text: '#60a5fa', border: 'rgba(96,165,250,0.25)' },
  'infra-nuxt':    { bg: 'rgba(167,139,250,0.09)', text: '#a78bfa', border: 'rgba(167,139,250,0.25)' },
  neutral:         { bg: 'rgba(107,114,128,0.10)', text: '#565d6e', border: 'rgba(107,114,128,0.20)' },
}
