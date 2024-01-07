type ScrollToElementProps = {
  elementID: string;
  behavior?: ScrollBehavior;
};

export default function scrollToElement({ elementID, behavior = 'smooth' }: ScrollToElementProps) {
  const element = document.getElementById(elementID);

  if (element) {
    element.scrollIntoView({ behavior });
  }
}
