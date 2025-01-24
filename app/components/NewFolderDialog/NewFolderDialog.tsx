import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useFetcher, useNavigate } from "@remix-run/react";
import { Folder } from "~/contants/types";

const FOLDER_EMOJIS = [
  "📁",
  "📂",
  "🗂️",
  "📚",
  "📝",
  "📌",
  "🔖",
  "📎",
  "💼",
  "🗄️",
  "📊",
  "📈",
  "📋",
  "🗃️",
  "🗑️",
  "📥",
  "🎯",
  "⭐",
  "💡",
  "🎨",
  "🎬",
  "🎮",
  "📱",
  "💻",
  "🏠",
  "🌟",
  "❤️",
  "✨",
  "🔥",
  "🎵",
  "📷",
  "🎉",
];

export default function NewFolderDialog({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [folderName, setFolderName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("📁");
  const fetcher = useFetcher();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if ((fetcher.data as { newFolder: Folder }).newFolder) {
        const newFolder = (fetcher.data as { newFolder: Folder }).newFolder;
        setIsOpen(false);
        navigate(`/folders/${newFolder.id}/tasks`);
      }
    }
  }, [fetcher.state, fetcher.data, navigate, setIsOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!folderName.trim()) {
      return;
    }
    fetcher.submit(event.currentTarget, {
      method: "post",
      action: "/folders",
    });
  };

  return (
    <fetcher.Form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[42px] p-0">
              {selectedEmoji}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-2">
            <div className="grid grid-cols-8 gap-2">
              {FOLDER_EMOJIS.map((emoji) => (
                <Button
                  key={emoji}
                  variant="ghost"
                  className="h-8 w-8 p-0 hover:bg-muted"
                  onClick={() => setSelectedEmoji(emoji)}
                  type="button"
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <input type="hidden" name="emoji" value={selectedEmoji} />
        <Input
          placeholder="Folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="flex-1"
          name="name"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-[#1B4DFF] hover:bg-[#0F3CD9]"
        disabled={!folderName.trim() || fetcher.state === "submitting"}
      >
        {fetcher.state === "submitting" ? "Creating..." : "Create"}
      </Button>
    </fetcher.Form>
  );
}
