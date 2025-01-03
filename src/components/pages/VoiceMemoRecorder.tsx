import { useState, useRef, useEffect } from 'react';
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Mic, Square, Play, Download, X } from 'lucide-react';

interface VoiceMemoRecorderProps {
  onClose: () => void;
}

export default function VoiceMemoRecorder({ onClose }: VoiceMemoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      audioChunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setError(null);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Error accessing microphone. Please ensure you have granted the necessary permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (audioURL) {
      const audio = new Audio(audioURL);
      audio.play();
    }
  };

  const downloadRecording = () => {
    if (audioURL) {
      const a = document.createElement('a');
      a.href = audioURL;
      a.download = 'voice-memo.wav';
      a.click();
    }
  };

  const confirmRecording = () => {
    setIsConfirmed(true);
    // Here you could add logic to save the recording or process it further
  };

  const resetRecorder = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setAudioURL(null);
    setError(null);
    setIsConfirmed(false);
    audioChunksRef.current = [];
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-auto bg-white shadow-2xl">
        <CardHeader className="relative border-b pb-4">
          <CardTitle className="text-xl font-semibold text-center">Voice Memo Recorder</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-0 w-8 h-8 rounded-full hover:bg-gray-100" 
            onClick={resetRecorder}
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          <div className="flex justify-center mb-6">
            {isRecording ? (
              <Button 
                onClick={stopRecording} 
                variant="destructive"
                size="lg"
                className="rounded-full h-16 w-16 p-0"
              >
                <Square className="h-6 w-6" />
              </Button>
            ) : (
              <Button
                onClick={startRecording}
                size="lg"
                className="rounded-full h-16 w-16 p-0 bg-pink-500 hover:bg-pink-600"
              >
                <Mic className="h-6 w-6" />
              </Button>
            )}
          </div>
          {audioURL && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <audio className="w-full" controls src={audioURL} />
            </div>
          )}
          {isConfirmed && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg text-center mt-4">
              Recording confirmed and ready to send!
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="w-full grid grid-cols-3 gap-4">
            <Button 
              onClick={playRecording} 
              disabled={!audioURL || isConfirmed}
              variant="outline"
              className="w-full"
            >
              <Play className="mr-2 h-4 w-4" /> Play
            </Button>
            <Button 
              onClick={downloadRecording} 
              disabled={!audioURL || !isConfirmed}
              variant="outline"
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" /> Save
            </Button>
            <Button 
              onClick={() => {
                confirmRecording();
                setTimeout(onClose, 1500);
              }} 
              disabled={!audioURL || isConfirmed}
              className="w-full bg-pink-500 hover:bg-pink-600"
            >
              Send
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}