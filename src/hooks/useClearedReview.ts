import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY_CLEARED_REVIEW = 'gorogoropanda.com/clearedReview';

export const clearedReviewDefaultValue = 0;

export const clearedReviewLocalStorageExists = () => {
  return localStorage.getItem(STORAGE_KEY_CLEARED_REVIEW) !== null;
};

export function useClearedReview(
  defaultValue: number,
  clearedReviewValues: string[],
): [clearedReview: number, setClearedReview: (clearedReview: number) => void] {
  const [clearedReviewInternal, setClearedReviewInternal] = useState(
    clearedReviewDefaultValue,
  );

  useEffect(() => {
    const storageClearedReview = localStorage.getItem(
      STORAGE_KEY_CLEARED_REVIEW,
    );
    const clearedReview: number =
      storageClearedReview === null
        ? 0
        : clearedReviewValues.indexOf(storageClearedReview);
    if (clearedReview > defaultValue) {
      setClearedReviewInternal(clearedReview);
    }
  }, [setClearedReviewInternal]);

  const setClearedReview = useCallback(
    (clearedReview: number) => {
      localStorage.setItem(
        STORAGE_KEY_CLEARED_REVIEW,
        clearedReviewValues[clearedReview],
      );
      setClearedReviewInternal(clearedReview);
    },
    [setClearedReviewInternal],
  );

  return [clearedReviewInternal, setClearedReview];
}
