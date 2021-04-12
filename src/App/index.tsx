import React, { useRef, useEffect } from 'react';
import styles from './index.module.scss';
import { Viz } from './viz';

export const App = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) { return }
    const viz = new Viz(ref.current);
    return viz.unregister;
  }, [ref])

  return <canvas ref={ref} className={styles.root} />
}