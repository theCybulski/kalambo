import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './Cursor.module.scss';

export type CursorProps = {
  toolSize: number;
  color: string;
  cursorArea: React.MutableRefObject<any>;
}

export const Cursor = ({ cursorArea, toolSize, color }: CursorProps) => {
  const [cursorPos, setCursorPos] = useState({
    x: '0px',
    y: '0px',
  });
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const cursor = (e) => {
      setIsHidden(!cursorArea.current.contains(e.target));

      setCursorPos({
        x: `${e.pageX - 50}px`,
        y: `${e.pageY - 85}px`,
      });
    };

    window.addEventListener('mousemove', cursor);

    return () => window.removeEventListener('mousemove', cursor);
  }, [cursorArea]);

  return (
    <div
      className={cn(styles.cursor, { [styles.isHidden]: isHidden })}
      style={{
        width: `${toolSize}px`,
        height: `${toolSize}px`,
        backgroundColor: color,
        left: cursorPos.x,
        top: cursorPos.y,
      }}
    />
  );
};
