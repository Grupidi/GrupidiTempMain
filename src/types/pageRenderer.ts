// Update PageRendererProps interface to include updateGroupProfile
export interface PageRendererProps {
  // ... existing props ...
  onUpdateGroup: (groupId: string, updates: Partial<GroupProfile>) => void;
  updateGroupProfile?: (groupId: string, updates: Partial<GroupProfile>) => void;
}