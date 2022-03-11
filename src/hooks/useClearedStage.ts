import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY_CLEARED_STAGE = 'gorogoropanda.com/clearedStage';

export const clearedStageDefaultValue = 0;

export const clearedStageLocalStorageExists = () => {
  return localStorage.getItem(STORAGE_KEY_CLEARED_STAGE) !== null;
};

export function useClearedStage(
  defaultValue: number,
  clearedStageValues: string[],
): [clearedStage: number, setClearedStage: (clearedStage: number) => void] {
  const [clearedStageInternal, setClearedStageInternal] = useState(
    clearedStageDefaultValue,
  );

  useEffect(() => {
    const storageClearedStage = localStorage.getItem(STORAGE_KEY_CLEARED_STAGE);
    const clearedStage: number =
      storageClearedStage === null
        ? 0
        : clearedStageValues.indexOf(storageClearedStage);
    if (clearedStage > defaultValue) {
      setClearedStageInternal(clearedStage);
    }
  }, [setClearedStageInternal]);

  const setClearedStage = useCallback(
    (clearedStage: number) => {
      localStorage.setItem(
        STORAGE_KEY_CLEARED_STAGE,
        clearedStageValues[clearedStage],
      );
      setClearedStageInternal(clearedStage);
    },
    [setClearedStageInternal],
  );

  return [clearedStageInternal, setClearedStage];
}
