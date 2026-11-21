"use client";

// The old site was stuck on "© 2022". Read the year in the browser so this never goes stale.
export function Year() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
