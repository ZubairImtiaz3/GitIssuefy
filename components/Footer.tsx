import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-4 bg-card border text-[#b8b8b8]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-[#B7B27D]" /> by
            Zubair Imtiaz
          </p>
        </div>
      </div>
    </footer>
  );
}
