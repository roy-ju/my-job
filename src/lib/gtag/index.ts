export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function pageview(url: string) {
  window.gtag('config', GA_TRACKING_ID, { page_path: url });
}

export function event({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: any;
}) {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
}
