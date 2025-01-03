import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ArrowLeft, X } from "lucide-react";

type PollOption = {
  id: string;
  text: string;
}

type Vote = {
  userId: string;
  optionId: string;
}

interface PollCreatorProps {
  onClose: () => void;
}

export default function PollCreator({ onClose }: PollCreatorProps) {
  const [pollQuestion, setPollQuestion] = useState("");
  const [options, setOptions] = useState<PollOption[]>([]);
  const [newOption, setNewOption] = useState("");
  const [pollCreated, setPollCreated] = useState(false);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [pollSubmitted, setPollSubmitted] = useState(false);

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      setOptions([...options, { id: Date.now().toString(), text: newOption.trim() }]);
      setNewOption("");
    }
  };

  const handleCreatePoll = () => {
    if (pollQuestion.trim() !== "" && options.length >= 2) {
      setPollCreated(true);
    }
  };

  const handleVote = () => {
    if (currentUserId.trim() !== "" && selectedOption !== "") {
      setVotes([...votes, { userId: currentUserId, optionId: selectedOption }]);
      setPollSubmitted(true);
    }
  };

  const getVotesForOption = (optionId: string) => {
    return votes.filter((vote) => vote.optionId === optionId);
  };

  const handleBack = () => {
    if (pollSubmitted) {
      setPollSubmitted(false);
      setSelectedOption("");
      setCurrentUserId("");
    } else if (pollCreated) {
      setPollCreated(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-auto bg-white shadow-2xl">
        {!pollCreated ? (
          <>
            <CardHeader className="relative border-b pb-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-0 w-8 h-8 rounded-full hover:bg-gray-100" 
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
              <CardTitle className="text-xl font-semibold text-center">Create a Poll</CardTitle>
              <CardDescription className="text-center">Enter your question and add at least two options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <Label htmlFor="question">Poll Question</Label>
                <Input
                  id="question"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  placeholder="Enter your poll question"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newOption">Add Option</Label>
                <div className="flex space-x-2">
                  <Input
                    id="newOption"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Enter an option"
                  />
                  <Button onClick={handleAddOption}>Add</Button>
                </div>
              </div>
              {options.length > 0 && (
                <div className="space-y-2">
                  <Label>Options:</Label>
                  <ul className="list-disc pl-5">
                    {options.map((option) => (
                      <li key={option.id}>{option.text}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button 
                onClick={handleCreatePoll} 
                disabled={pollQuestion.trim() === "" || options.length < 2}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white"
              >
                Create Poll
              </Button>
            </CardFooter>
          </>
        ) : !pollSubmitted ? (
          <>
            <CardHeader className="relative border-b pb-4">
              <CardTitle className="text-xl font-semibold text-center">{pollQuestion}</CardTitle>
              <CardDescription className="text-center">Select an option and enter your name to vote</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                {options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={option.id}
                      name="poll-option"
                      value={option.id}
                      checked={selectedOption === option.id}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="w-4 h-4 text-pink-500"
                    />
                    <Label htmlFor={option.id}>{option.text}</Label>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="userName">Your Name</Label>
                <Input
                  id="userName"
                  value={currentUserId}
                  onChange={(e) => setCurrentUserId(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t p-4 flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                onClick={handleVote} 
                disabled={selectedOption === "" || currentUserId.trim() === ""}
                className="bg-pink-500 hover:bg-pink-600 text-white"
              >
                Submit Vote
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader className="relative border-b pb-4">
              <CardTitle className="text-xl font-semibold text-center">Poll Results</CardTitle>
              <CardDescription className="text-center">{pollQuestion}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {options.map((option) => {
                const optionVotes = getVotesForOption(option.id);
                const percentage = votes.length > 0 ? (optionVotes.length / votes.length) * 100 : 0;
                return (
                  <div key={option.id} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{option.text}</span>
                      <span>{optionVotes.length} vote(s)</span>
                    </div>
                    <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
                      <div
                        className="bg-pink-500 h-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-500">
                      Voters: {optionVotes.map((vote) => vote.userId).join(", ")}
                    </div>
                  </div>
                );
              })}
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline" onClick={handleBack} className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Voting
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}