export interface Task {
  id: string;
  title: string;
  description: string;
  actionable?: boolean; // If true, opens AI assistant with context
  aiPrompt?: string; // Pre-filled prompt for the AI
}

export interface Phase {
  id: string;
  title: string;
  objective: string;
  tasks: Task[];
}

export interface RegionalData {
  id: string;
  name: string;
  code: string;
  focus: string;
  lanes: string[];
  notes: string;
}

export interface PlanData {
  phases: Phase[];
  regions: RegionalData[];
}