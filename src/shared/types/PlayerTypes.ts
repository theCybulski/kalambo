export type PlayerTypes = {
  selectedTheme: 'lightTheme' | 'darkTheme';
  id: string | null;
  name: string | null;
  avatar: string | null;
  totalScore: number;
  currentScore: number;
  currentRoom: string | null;
  isDrawing: boolean;
};
