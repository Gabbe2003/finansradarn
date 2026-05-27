export type AdSection = "header" | "scroll" | "popup";

export type LinkedPost = {
  id: number;
  title: string;
  excerpt: string;
  link: string;
  image: string;
};

export type Ad = {
  id: number;
  section: AdSection;
  use_custom: boolean;
  annons: boolean;
  target_blank: boolean;
  title: string;
  description: string;
  text?: string;
  cta: string;
  button?: string;
  link: string;
  image: string;
  image_srcset: string;
  image_id: number | null;
  bg_color?: string;
  button_bg_color?: string;
  linked_post: LinkedPost | null;
};

export type AdsResponse = {
  section: AdSection;
  display_mode: "queue" | "random";
  count: number;
  ads: Ad[];
  scroll_config?: { threshold_px: number };
  popup_config?: { session_cap: number; cooldown_days: number };
};

export type TrackResponse =
  | { ok: true }
  | {
      ok: false;
      reason:
        | "fa_bot"
        | "fa_dedupe"
        | "fa_admin_excluded"
        | "fa_inactive"
        | "fa_not_found"
        | "fa_no_click_tracking";
    };
