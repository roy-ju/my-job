export default function moveCenterScrollInContainer(element: HTMLElement, container: HTMLElement) {
  const elementRect = element.getBoundingClientRect();

  const containerRect = container.getBoundingClientRect();

  const elementTopRelativeToContainer = elementRect.top - containerRect.top;

  const scrollPosition =
    elementTopRelativeToContainer + container.scrollTop - container.clientHeight / 2 + elementRect.height / 2;

  container.scrollTop = scrollPosition;
}
