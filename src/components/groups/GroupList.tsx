const handleLeave = async (e: React.MouseEvent, groupId: string) => {
  e.stopPropagation();
  const group = groups[groupId];
  
  if (!group || !currentUser) return;

  if (confirm('Are you sure you want to leave this group?')) {
    const result = await handleLeaveGroup(
      currentUser.id,
      groupId,
      currentUser,
      group,
      memberProfiles
    );

    if (result.success) {
      // Update UI immediately
      onLeaveGroup?.(groupId);
      setOpenDropdown(null);
      
      // Show success message
      alert(result.message);
    } else {
      alert(result.message);
    }
  }
};