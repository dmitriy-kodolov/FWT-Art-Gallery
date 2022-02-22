import { useEffect, MutableRefObject } from 'react';

const useOutsideClick = (
  ref: MutableRefObject<HTMLDivElement | undefined>,
  handler: any,
) => {
  useEffect(
    () => {
      const listener = (event: MouseEvent) => {
        if (!ref.current
            || ref.current.contains(event.target as Node)) {
          return;
        }
        handler();
      };
      document.addEventListener('mousedown', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
      };
    },
  );
};

export default useOutsideClick;
