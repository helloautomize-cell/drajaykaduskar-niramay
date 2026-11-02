// Client-side event tracking. No-ops until GA consent is granted; the
// analytics module swaps in the real gtag-backed implementation.
export type TrackEvent =
  | "phone_click"
  | "whatsapp_click"
  | "email_click"
  | "directions_click"
  | "appointment_click"
  | "appointment_submit"
  | "generate_lead"
  | "map_load"
  | "video_play";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    __niramayTrack?: (event: TrackEvent, params?: Params) => void;
  }
}

export function track(event: TrackEvent, params?: Params) {
  if (typeof window !== "undefined") window.__niramayTrack?.(event, params);
}
