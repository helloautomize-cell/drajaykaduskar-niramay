// Client-side event tracking. No-ops until GA consent is granted; the
// analytics module swaps in the real gtag-backed implementation.
export type TrackEvent =
  | "book_click"
  | "call_click"
  | "whatsapp_click"
  | "directions_click"
  | "map_load"
  | "video_play"
  | "generate_lead";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    __niramayTrack?: (event: TrackEvent, params?: Params) => void;
  }
}

export function track(event: TrackEvent, params?: Params) {
  if (typeof window !== "undefined") window.__niramayTrack?.(event, params);
}
