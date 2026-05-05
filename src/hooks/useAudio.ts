"use client";

import { STORAGE_KEYS } from "@/constants/storageKeys";
import { audioService } from "@/services/audio.service";
import { AudioEventType } from "@/types";

import * as React from "react";

export function useAudio() {
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.AUDIO);
      if (raw) audioService.hydrate(JSON.parse(raw));
    } catch {}
    setIsHydrated(true);
  }, []);

  const persist = React.useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIO, JSON.stringify(audioService.getState()));
    } catch {}
  }, []);

  const play = React.useCallback(
    (event: AudioEventType) => {
      if (isHydrated) audioService.play(event);
    },
    [isHydrated],
  );

  const enable = React.useCallback(() => {
    audioService.setEnabled(true);
    persist();
  }, [persist]);

  const disable = React.useCallback(() => {
    audioService.setEnabled(false);
    persist();
  }, [persist]);

  const setVolume = React.useCallback(
    (v: number) => {
      audioService.setVolume(v);
      persist();
    },
    [persist],
  );

  return {
    play,
    enable,
    disable,
    setVolume,
    getState: audioService.getState.bind(audioService),
  };
}
