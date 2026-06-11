export interface PolaroidPhoto {
  id: string;
  imageSrc: string; // we can use elegant placeholder SVGs or scenic imagery
  caption: string;
  rotate: number; // degrees
  top: string;
  left: string;
}

export interface StickyNoteData {
  id: string;
  text: string;
  x: string; // percentage positions
  y: string;
  rotate: number;
  color: string; // warm shades of yellow/beige list
}

export interface BookState {
  currentPage: number; // 0 is cover, 1..10 are pages, 11 is secret ending cover
  isCoverOpened: boolean;
  isUnlockedSecret: boolean;
  soundEnabled: boolean;
}
