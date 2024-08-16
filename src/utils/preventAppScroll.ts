const hideScrollBar = () => {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollBarWidth}px`;
};

const showScrollBar = () => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

const preventAppScroll = (isPrevent: boolean) => {
  if (isPrevent) {
    hideScrollBar();
  } else {
    showScrollBar();
  }
};

export default preventAppScroll;
