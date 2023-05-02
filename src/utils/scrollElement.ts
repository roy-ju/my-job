export function scrollToElement(element: HTMLElement, offsetTop: number) {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offsetTop;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}

export function scrollToElementNoneBehaviour(element: HTMLElement, offsetTop: number) {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offsetTop;

  window.scrollTo({
    top: offsetPosition,
  });
}

export function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

export function scrollToTop() {
  window.scrollTo(0, 0);
}
