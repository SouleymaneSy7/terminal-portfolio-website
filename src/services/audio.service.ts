import { AudioStateType, AudioEventType } from "@/types";

const DEFAULT_STATE: AudioStateType = { enabled: false, volume: 60 };

class AudioService {
  private ctx: AudioContext | null = null;
  private state: AudioStateType = { ...DEFAULT_STATE };

  private getCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private get gain(): number {
    return (this.state.volume / 100) * 0.4; // 0.4 = volume max raisonnable
  }

  hydrate(saved: Partial<AudioStateType>): void {
    this.state = {
      enabled: saved.enabled ?? DEFAULT_STATE.enabled,
      volume: Math.min(100, Math.max(0, saved.volume ?? DEFAULT_STATE.volume)),
    };
  }

  getState(): AudioStateType {
    return { ...this.state };
  }

  setEnabled(enabled: boolean): void {
    this.state.enabled = enabled;
  }

  setVolume(volume: number): void {
    this.state.volume = Math.min(100, Math.max(0, volume));
  }

  play(event: AudioEventType): void {
    if (!this.state.enabled || typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    try {
      const ctx = this.getCtx();
      switch (event) {
        case "keypress":
          return this.playClick(ctx, 800, 0.04, "sine");
        case "backspace":
          return this.playClick(ctx, 500, 0.04, "sine");
        case "enter":
          return this.playChime(ctx, [880, 1100], 0.12);
        case "tab":
          return this.playChime(ctx, [660, 880], 0.08);
        case "escape":
          return this.playChime(ctx, [440, 330], 0.08);
        case "ctrl":
          return this.playClick(ctx, 350, 0.03, "square");
        case "error":
          return this.playBuzz(ctx);
        case "success":
          return this.playChime(ctx, [880, 1320, 1760], 0.1);
      }
    } catch {}
  }

  private playClick(
    ctx: AudioContext,
    freq: number,
    duration: number,
    type: OscillatorType,
  ): void {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gainNode.gain.setValueAtTime(this.gain, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + duration,
    );

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }

  private playChime(
    ctx: AudioContext,
    freqs: number[],
    duration: number,
  ): void {
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);

      const g = this.gain * (1 / (i + 1)); // décroissance harmonique
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.06);
      gainNode.gain.linearRampToValueAtTime(
        g,
        ctx.currentTime + i * 0.06 + 0.01,
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + i * 0.06 + duration,
      );

      osc.start(ctx.currentTime + i * 0.06);
      osc.stop(ctx.currentTime + i * 0.06 + duration);
    });
  }

  private playBuzz(ctx: AudioContext): void {
    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const source = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    source.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.value = 150;
    filter.Q.value = 0.5;

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    gainNode.gain.setValueAtTime(this.gain * 1.5, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    source.start(ctx.currentTime);
  }
}

export const audioService = new AudioService();
