// Tiny bridge so the nav, hero and contents page can ask the book to jump somewhere.
// spread -1 = the closed cover, 0-4 = the page spreads.

export const BOOK_GO_EVENT = "book:go";

export function goBook(spread) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(BOOK_GO_EVENT, { detail: spread }));
}
