/**
 * Korean TTS (Text-to-Speech) service for 7-year-old kindergarten space game
 * Uses browser Web Speech API with child-friendly pitch and rate
 */

class TTSService {
  private isEnabled: boolean = true;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private voicesLoaded: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.initVoices();
      };
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      this.voicesLoaded = true;
      // Find Korean voice
      const koVoice = voices.find(v => v.lang.includes('ko') || v.lang.includes('KR'));
      this.selectedVoice = koVoice || null;
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public speak(text: string, onEnd?: () => void) {
    if (!this.isEnabled) {
      if (onEnd) onEnd();
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    // Stop ongoing speech
    window.speechSynthesis.cancel();

    if (!this.voicesLoaded) {
      this.initVoices();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    // Child-friendly slightly higher pitch and gentle pace
    utterance.pitch = 1.25;
    utterance.rate = 0.92;

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }
}

export const ttsService = new TTSService();
