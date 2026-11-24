// src/hooks/useExperienceProgress.ts
import { useState, useCallback } from 'react';

export type ActivityId = 'hearts' | 'constellation' | 'moon' | 'bottle' | 'vault';

interface Progress {
  starsCollected: number;
  completedActivities: ActivityId[];
  letterChapter: number;
  letterComplete: boolean;
  finaleUnlocked: boolean;
}

const STORAGE_KEY = 'captains-universe-progress';

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Progress;
  } catch {}
  return {
    starsCollected: 0,
    completedActivities: [],
    letterChapter: 0,
    letterComplete: false,
    finaleUnlocked: false,
  };
}

function save(p: Progress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
}

export function useExperienceProgress() {
  const [progress, setProgress] = useState<Progress>(load);

  const update = useCallback((patch: Partial<Progress>) => {
    setProgress((prev) => {
      const next = { ...prev, ...patch };
      save(next);
      return next;
    });
  }, []);

  const completeActivity = useCallback((id: ActivityId) => {
    setProgress((prev) => {
      if (prev.completedActivities.includes(id)) return prev;
      const next: Progress = {
        ...prev,
        completedActivities: [...prev.completedActivities, id],
        starsCollected: prev.starsCollected + 1,
        finaleUnlocked: prev.starsCollected + 1 >= 4,
      };
      save(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    const fresh: Progress = {
      starsCollected: 0,
      completedActivities: [],
      letterChapter: 0,
      letterComplete: false,
      finaleUnlocked: false,
    };
    save(fresh);
    setProgress(fresh);
  }, []);

  const isCompleted = useCallback(
    (id: ActivityId) => progress.completedActivities.includes(id),
    [progress.completedActivities],
  );

  const canOpenVault = progress.starsCollected >= 4;

  return { progress, completeActivity, isCompleted, canOpenVault, update, reset };
}

