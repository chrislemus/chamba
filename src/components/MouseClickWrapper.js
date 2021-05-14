import { useRef, useEffect } from 'react';

export default function MouseClickWrapper({
  onClicked,
  onClickedOut,
  children,
}) {
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      const isClicked = ref?.current?.contains(event.target);
      if (isClicked) {
        onClicked();
      } else {
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
