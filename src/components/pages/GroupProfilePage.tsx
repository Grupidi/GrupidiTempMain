import { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { GroupProfileHeader } from './group-profile/GroupProfileHeader';
import { GroupProfileContent } from './group-profile/GroupProfileContent';
import { GroupProfileDialogs } from './group-profile/GroupProfileDialogs';
import { NavigationBar } from './group-profile/NavigationBar';
import { useGroupProfileState } from '../../hooks/useGroupProfileState';
import { useGroupProfileHandlers } from '../../hooks/useGroupProfileHandlers';
import { useGroupImages } from '../../hooks/useGroupImages';
import { useGroupMembership } from '../../hooks/useGroupMembership';
import { GroupProfileProps } from '../../types/groupProfile';
import { isMemberOfGroup } from '../../utils/groups/membership';
import { parseLocation } from '../../utils/location/distance';

export default function GroupProfilePage({ 
  groupProfile, 
  memberProfiles, 
  isSavedGroup = false,
  updateGroupProfile,
  onNavigate
}: GroupProfileProps) {
  const { state, updateState } = useGroupProfileState(groupProfile);
  const imageHandlers = useGroupImages(groupProfile, updateGroupProfile);
  const { handleLeaveGroup } = useGroupMembership(updateGroupProfile, () => onNavigate('groups'));

  // Get current user from memberProfiles
  const currentUser = memberProfiles["alice_adventurer"];
  const [isMember, setIsMember] = useState(false);

  // Check membership status whenever group profile changes
  useEffect(() => {
    if (currentUser && groupProfile) {
      const membership = isMemberOfGroup(currentUser, groupProfile);
      setIsMember(membership);
    }
  }, [currentUser, groupProfile, groupProfile.members]);

  const handlers = useGroupProfileHandlers({ 
    groupProfile, 
    updateGroupProfile, 
    state: { state, updateState },
    memberProfiles
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full">
        <div className="bg-pink-500 relative">
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => onNavigate('groups')}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>

            {isMember && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => onNavigate('groupChat', undefined, groupProfile.id)}
              >
                <MessageSquare className="h-6 w-6" />
              </Button>
            )}
          </div>

          <GroupProfileHeader 
            groupProfile={groupProfile}
            state={state}
            updateState={updateState}
            onMemberClick={(username) => {
              console.log('Navigating to member profile:', username);
              onNavigate('memberProfile', username);
            }}
            memberProfiles={memberProfiles}
            imageHandlers={imageHandlers}
            isSavedGroup={isSavedGroup}
            isMember={isMember}
          />
        </div>

        <GroupProfileContent
          groupProfile={groupProfile}
          state={state}
          updateState={updateState}
          isSavedGroup={isSavedGroup}
          isMember={isMember}
        />

        <GroupProfileDialogs
          groupProfile={groupProfile}
          memberProfiles={memberProfiles}
          state={state}
          updateState={updateState}
          handlers={handlers}
          isSavedGroup={isSavedGroup}
          isMember={isMember}
        />

        <NavigationBar onNavigate={onNavigate} />
      </div>
    </div>
  );
}