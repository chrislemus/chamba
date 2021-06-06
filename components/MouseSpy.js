import { useRef, useEffect } from 'react';

export default function MouseSpy({ onClicked, onClickedOut, children }) {
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      const isClicked = ref?.current?.contains(event.target);
      if (isClicked && onClicked) {
        onClicked();
      } else if (onClickedOut) {
        onClickedOut();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  return <div ref={ref}>{children}</div>;
}
