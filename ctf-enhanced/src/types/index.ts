export interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    role: 'admin' | 'team_leader' | 'participant';
    team?: Team;
    score: number;
    solvedChallenges: string[];
  }
  
  export interface Team {
    id: string;
    name: string;
    members: User[];
    score: number;
    rank: number;
  }
  
  export interface Challenge {
    id: string;
    title: string;
    category: string;
    description: string;
    points: number;
    difficulty: 'easy' | 'medium' | 'hard';
    solved: boolean;
    hints: string[];
    solvedBy: number;
  }