import type { RulesPieces } from '@/modules/interfaces/gamefuntions/pieces.interface';

export const coronation = (p: RulesPieces[]) => {
  const decision = { d: false };
  interface Row {
    f: number | null;
    c: number | null;
  }

  const rowToCo: Row = {
    f: null,
    c: null,
  };
  for (const coronation of p) {
    if (coronation.co) {
      decision.d = coronation.co;
      rowToCo.f = coronation.top;
      rowToCo.c = coronation.left;
    }
  }
  return {
    d: decision.d,
    f: rowToCo.f,
    c: rowToCo.c,
  };
};
