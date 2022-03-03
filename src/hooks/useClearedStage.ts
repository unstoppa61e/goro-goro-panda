import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY_CLEARED_STAGE = 'gorogoropanda.com/clearedStage';

export function useClearedStage(
  defaultValue: string,
): [clearedStage: string, setClearedStage: (clearedStage: string) => void] {
  const [clearedStageInternal, setClearedStageInternal] = useState('0');

  useEffect(() => {
    const storageClearedStage = localStorage.getItem(STORAGE_KEY_CLEARED_STAGE);
    const clearedStage: string =
      storageClearedStage === null ? '' : storageClearedStage;
    if (parseInt(clearedStage) > parseInt(defaultValue)) {
      setClearedStageInternal(clearedStage);
    }
  }, [setClearedStageInternal]);

  const setClearedStage = useCallback(
    (clearedStage: string) => {
      localStorage.setItem(STORAGE_KEY_CLEARED_STAGE, clearedStage);
      setClearedStageInternal(clearedStage);
    },
    [setClearedStageInternal],
  );

  return [clearedStageInternal, setClearedStage];
}
