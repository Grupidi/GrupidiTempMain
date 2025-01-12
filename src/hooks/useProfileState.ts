import { useState } from 'react';
import { ProfileProps } from '../types/profile';

export function useProfileState(profile: ProfileProps) {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [isEditingQuirks, setIsEditingQuirks] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingAge, setIsEditingAge] = useState(false);
  const [newInterest, setNewInterest] = useState("");
  const [newQuirk, setNewQuirk] = useState("");
  const [editedBio, setEditedBio] = useState(profile.bio);
  const [editedInterests, setEditedInterests] = useState([...profile.interests]);
  const [editedQuirks, setEditedQuirks] = useState([...profile.quirks]);
  const [editedLocation, setEditedLocation] = useState(profile.location);
  const [editedBirthday, setEditedBirthday] = useState(profile.birthday);

  return {
    isEditingBio,
    setIsEditingBio,
    isEditingInterests,
    setIsEditingInterests,
    isEditingQuirks,
    setIsEditingQuirks,
    isEditingLocation,
    setIsEditingLocation,
    isEditingAge,
    setIsEditingAge,
    newInterest,
    setNewInterest,
    newQuirk,
    setNewQuirk,
    editedBio,
    setEditedBio,
    editedInterests,
    setEditedInterests,
    editedQuirks,
    setEditedQuirks,
    editedLocation,
    setEditedLocation,
    editedBirthday,
    setEditedBirthday
  };
}