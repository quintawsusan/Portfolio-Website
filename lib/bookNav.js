export const BOOK_GO_EVENT = "book:go";
export const BOOK_MESSAGE_EVENT = "book:message";

let bookMessage = null;

export function goBook(spread) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(BOOK_GO_EVENT, { detail: spread }));
}

export function setBookMessage(message) {
  bookMessage = message;
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(BOOK_MESSAGE_EVENT));
}

export function getBookMessage() {
  return bookMessage;
}