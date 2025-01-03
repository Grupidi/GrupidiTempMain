import { useState } from 'react';
import { Button } from "../ui/button";
import { ChevronLeft } from 'lucide-react';

export default function GifMaker() {
  const [selectedGif, setSelectedGif] = useState<string | null>(null);

  // Placeholder GIFs - in a real app these would come from a GIF API like GIPHY
  const popularGifs = [
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd6Y2E4OWF1dWF6NXJ0M2t5Y3Jxc2t4ZXE2aHd0ZmF6Y2tzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKnrAkwZAd4cYBW/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd6Y2E4OWF1dWF6NXJ0M2t5Y3Jxc2t4ZXE2aHd0ZmF6Y2tzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKnrAkwZAd4cYBW/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd6Y2E4OWF1dWF6NXJ0M2t5Y3Jxc2t4ZXE2aHd0ZmF6Y2tzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKnrAkwZAd4cYBW/giphy.gif',
  ];

  return (
    <div className="flex flex-col h-full">
      <header className="bg-white border-b p-4 flex items-center">
        <Button variant="ghost" size="icon" className="mr-2">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold">GIF Maker</h1>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {popularGifs.map((gif, index) => (
            <div 
              key={index}
              className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                selectedGif === gif ? 'border-pink-500' : 'border-transparent'
              }`}
              onClick={() => setSelectedGif(gif)}
            >
              <img src={gif} alt={`GIF ${index + 1}`} className="w-full h-auto" />
            </div>
          ))}
        </div>
      </main>

      {selectedGif && (
        <footer className="bg-white border-t p-4">
          <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
            Send GIF
          </Button>
        </footer>
      )}
    </div>
  );
}