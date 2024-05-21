export const variants = {
  toLeft: {
    x: '-100%',
    pointerEvents: 'none',
  },
  toRight: {
    x: '100%',
    pointerEvents: 'none',
  },
  center: {
    x: 0,
    pointerEvents: 'initial',
  },
};

export const transition = {
  x: { type: 'spring', mass: 0.5, stiffness: 500, damping: 50 },
};
