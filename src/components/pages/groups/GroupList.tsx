import { useState } from 'react';
import { Button } from "../../ui/button";
import { LogOut, X } from 'lucide-react';
import { GroupProfile, MemberProfile } from '../../../types/profiles';
import { useLeaveGroup } from '../../../hooks/useLeaveGroup';
import { isMemberOfGroup } from '../../../utils/groups/membership';

interface GroupListProps {
  groups: { [key: string]: GroupProfile };
  onNavigate: (groupId: string) => void;
  onDelete?: (groupId: string) => void;
  onLeaveGroup?: (groupId: string) => void;
  memberProfiles: { [key: string]: MemberProfile };
  updateGroupProfile: (groupId: string, updates: Partial<GroupProfile>) => void;
}

export function GroupList({
  groups,
  onNavigate,
  onDelete,
  onLeaveGroup,
  memberProfiles,
  updateGroupProfile
}: GroupListProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { handleLeaveGroup, isLeaving } = useLeaveGroup(memberProfiles, updateGroupProfile);

  // Get current user
  const currentUser = memberProfiles["Alice Johnson"];
  
  // If no groups or current user, show appropriate message
  if (!groups || Object.keys(groups).length === 0) {
    return <div className="p-4 text-gray-500">No groups found</div>;
  }

  if (!currentUser) {
    return <div className="p-4 text-gray-500">Loading groups...</div>;
  }

  const handleCardClick = (groupId: string) => {
    if (openDropdown !== groupId) {
      onNavigate(groupId);
    }
  };

  const handleDropdownClick = (e: React.MouseEvent, groupId: string) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === groupId ? null : groupId);
  };

  const handleLeave = async (e: React.MouseEvent, groupId: string) => {
    e.stopPropagation();
    const group = groups[groupId];
    if (!group) return;

    if (confirm('Are you sure you want to leave this group?')) {
      const result = await handleLeaveGroup(
        currentUser.id,
        groupId,
        currentUser,
        group
      );

      if (result.success) {
        onLeaveGroup?.(groupId);
        setOpenDropdown(null);
      }
      alert(result.message);
    }
  };

  // Filter groups to only show ones where the current user is a member
  const userGroups = Object.entries(groups).filter(([_, group]) => 
    isMemberOfGroup(currentUser, group)
  );

  return (
    <div className="space-y-2">
      {userGroups.map(([groupId, group]) => (
        <div 
          key={groupId} 
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:bg-pink-50 transition-colors"
          onClick={() => handleCardClick(groupId)}
        >
          <div className="p-4 flex items-center">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-semibold">
                {group.name.slice(0, 2)}
              </span>
            </div>
            <div className="flex-1">
              <span className="text-gray-800 font-medium">{group.name}</span>
              <p className="text-gray-500 text-sm">{group.username}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-pink-500 hover:bg-pink-100"
              onClick={(e) => handleDropdownClick(e, groupId)}
            >
              <span className={`transform transition-transform ${openDropdown === groupId ? 'rotate-180' : ''}`}>
                ⌄
              </span>
            </Button>
          </div>
          {openDropdown === groupId && (
            <div className="border-t border-gray-100 divide-y divide-gray-100">
              <Button
                variant="ghost"
                className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-50 flex items-center gap-2"
                onClick={(e) => handleLeave(e, groupId)}
                disabled={isLeaving}
              >
                <LogOut className="h-4 w-4" />
                {isLeaving ? 'Leaving...' : 'Leave Group'}
              </Button>
              {onDelete && (
                <Button
                  variant="ghost"
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Are you sure you want to delete this group?')) {
                      onDelete(groupId);
                      setOpenDropdown(null);
                    }
                  }}
                >
                  <X className="h-4 w-4" />
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}