import { Button } from "../../ui/button";
import { PlusCircle, Mail, Bookmark } from 'lucide-react';

interface ActionButtonsProps {
  showAddButtons: boolean;
  setShowAddButtons: (show: boolean) => void;
  setShowInvitations: (show: boolean) => void;
  setShowSaved: (show: boolean) => void;
  savedGroupsCount: number;
  onNavigate: (page: string) => void;
}

export function ActionButtons({
  showAddButtons,
  setShowAddButtons,
  setShowInvitations,
  setShowSaved,
  savedGroupsCount,
  onNavigate
}: ActionButtonsProps) {
  const handleCreateGroup = () => {
    onNavigate('createGroup');
  };

  const handleFindGroup = () => {
    onNavigate('findGroup');
  };

  return (
    <>
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 flex justify-center space-x-4">
        <Button
          size="icon"
          className="rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
          onClick={() => setShowAddButtons(!showAddButtons)}
        >
          <PlusCircle className="h-6 w-6" />
        </Button>
        <Button
          size="icon"
          className="rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg relative"
          onClick={() => setShowInvitations(true)}
        >
          <Mail className="h-6 w-6" />
        </Button>
        <Button
          size="icon"
          className="rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg relative"
          onClick={() => setShowSaved(true)}
        >
          <Bookmark className="h-6 w-6" />
          {savedGroupsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {savedGroupsCount}
            </span>
          )}
        </Button>
      </div>

      {showAddButtons && (
        <div className="fixed bottom-36 left-1/2 transform -translate-x-1/2 flex flex-col space-y-2">
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white whitespace-nowrap shadow-lg"
            onClick={handleFindGroup}
          >
            Find Group
          </Button>
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white whitespace-nowrap shadow-lg"
            onClick={handleCreateGroup}
          >
            Create Group
          </Button>
        </div>
      )}
    </>
  );
}