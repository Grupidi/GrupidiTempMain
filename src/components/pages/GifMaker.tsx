import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Slider } from "../ui/slider";
import { Crop, Image, Type, Scissors, FolderOpen } from "lucide-react";

interface GIFMakerProps {
  onClose: () => void;
}

export default function GIFMaker({ onClose }: GIFMakerProps) {
  const [text, setText] = useState("");
  const [editingStep, setEditingStep] = useState("crop");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(10); // Assuming 10 second video
  const [mediaSource, setMediaSource] = useState("/placeholder.mp4");
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateGIF = () => {
    // Simulating GIF creation
    alert(`GIF created successfully! Snipped from ${startTime}s to ${endTime}s`);
    onClose();
  };

  const handleCancel = () => {
    // Simulating cancellation
    if (confirm("Are you sure you want to cancel? All changes will be lost.")) {
      onClose();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      if (currentTime >= endTime) {
        videoRef.current.pause();
        videoRef.current.currentTime = startTime;
      }
    }
  };

  const handleMediaSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd handle the file here.
      // For this example, we'll just update the media source with a placeholder.
      setMediaSource("/placeholder.mp4");
      alert(`Selected file: ${file.name}`);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <header className="bg-white border-b p-4 flex items-center justify-center">
        <h1 className="text-xl font-semibold">GIF Maker</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="border rounded-lg p-4">
            <video 
              ref={videoRef}
              src={mediaSource}
              className="w-full h-64 object-cover"
              onTimeUpdate={handleTimeUpdate}
              controls
            />
          </div>

          <Button onClick={handleMediaSelect} className="w-full">
            <FolderOpen className="mr-2 h-4 w-4" />
            Select Media from Camera Roll
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*,image/*"
            className="hidden"
          />

          <Tabs value={editingStep} onValueChange={setEditingStep}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="snip">
                <Scissors className="mr-2 h-4 w-4" />
                Snip
              </TabsTrigger>
              <TabsTrigger value="crop">
                <Crop className="mr-2 h-4 w-4" />
                Crop
              </TabsTrigger>
              <TabsTrigger value="text">
                <Type className="mr-2 h-4 w-4" />
                Add Text
              </TabsTrigger>
              <TabsTrigger value="effects">
                <Image className="mr-2 h-4 w-4" />
                Effects
              </TabsTrigger>
            </TabsList>
            <TabsContent value="snip" className="space-y-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="start-time">Start Time (s)</Label>
                <Input
                  id="start-time"
                  type="number"
                  min={0}
                  max={endTime}
                  value={startTime}
                  onChange={(e) => setStartTime(Number(e.target.value))}
                />
                <Label htmlFor="end-time">End Time (s)</Label>
                <Input
                  id="end-time"
                  type="number"
                  min={startTime}
                  max={10}
                  value={endTime}
                  onChange={(e) => setEndTime(Number(e.target.value))}
                />
              </div>
              <Button onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = startTime;
                  videoRef.current.play();
                }
              }}>
                Preview Snip
              </Button>
            </TabsContent>
            <TabsContent value="crop" className="space-y-4">
              <Label>Crop Size</Label>
              <Slider defaultValue={[100]} max={100} step={1} />
            </TabsContent>
            <TabsContent value="text" className="space-y-4">
              <Label htmlFor="text-input">Enter Text</Label>
              <Input
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to add to your GIF"
              />
            </TabsContent>
            <TabsContent value="effects" className="space-y-4">
              <Button variant="outline" className="mr-2">
                Invert Colors
              </Button>
              <Button variant="outline" className="mr-2">
                Black & White
              </Button>
              <Button variant="outline">
                Sepia
              </Button>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleCreateGIF}>Create GIF</Button>
          </div>
        </div>
      </div>
    </div>
  );
}