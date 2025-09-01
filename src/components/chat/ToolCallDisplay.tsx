import { Loader2, FileText, Edit3, FolderX, FileX, Eye } from "lucide-react";

interface ToolInvocation {
  toolCallId: string;
  toolName: string;
  args: any;
  state: "partial-call" | "call" | "result";
  result?: any;
}

interface ToolCallDisplayProps {
  toolInvocation: ToolInvocation;
  className?: string;
}

export function ToolCallDisplay({ toolInvocation, className = "" }: ToolCallDisplayProps) {
  const { toolName, args, state, result } = toolInvocation;
  
  const generateFriendlyMessage = (): { message: string; icon: React.ReactNode } => {
    const getFileName = (path: string): string => {
      if (!path) return "file";
      const normalized = path.replace(/^\/+/, "");
      return normalized.split("/").pop() || normalized || "file";
    };

    // Handle str_replace_editor tool
    if (toolName === "str_replace_editor") {
      const command = args?.command;
      const path = args?.path;
      const fileName = getFileName(path);
      
      switch (command) {
        case "create":
          return {
            message: `Creating ${fileName}`,
            icon: <FileText className="w-3 h-3 text-green-600" />
          };
        case "str_replace":
          return {
            message: `Editing ${fileName}`,
            icon: <Edit3 className="w-3 h-3 text-blue-600" />
          };
        case "view":
          return {
            message: `Viewing ${fileName}`,
            icon: <Eye className="w-3 h-3 text-gray-600" />
          };
        case "insert":
          return {
            message: `Adding content to ${fileName}`,
            icon: <Edit3 className="w-3 h-3 text-blue-600" />
          };
        default:
          return {
            message: `Working with ${fileName}`,
            icon: <FileText className="w-3 h-3 text-gray-600" />
          };
      }
    }
    
    // Handle file_manager tool
    if (toolName === "file_manager") {
      const command = args?.command;
      const path = args?.path;
      const newPath = args?.new_path;
      const fileName = getFileName(path);
      const newFileName = getFileName(newPath);
      
      switch (command) {
        case "rename":
          if (newPath) {
            return {
              message: `Renaming ${fileName} → ${newFileName}`,
              icon: <Edit3 className="w-3 h-3 text-orange-600" />
            };
          }
          return {
            message: `Renaming ${fileName}`,
            icon: <Edit3 className="w-3 h-3 text-orange-600" />
          };
        case "delete":
          // Check if it's likely a directory based on common patterns or lack of extension
          const isDirectory = !fileName.includes(".") || fileName.endsWith("/");
          return {
            message: `Deleting ${fileName}`,
            icon: isDirectory ? 
              <FolderX className="w-3 h-3 text-red-600" /> : 
              <FileX className="w-3 h-3 text-red-600" />
          };
        default:
          return {
            message: `Managing ${fileName}`,
            icon: <FileText className="w-3 h-3 text-gray-600" />
          };
      }
    }
    
    // Fallback for unknown tools
    return {
      message: toolName,
      icon: <FileText className="w-3 h-3 text-gray-600" />
    };
  };

  const { message, icon } = generateFriendlyMessage();
  const isComplete = state === "result";
  const hasError = result && typeof result === "string" && result.toLowerCase().includes("error");

  return (
    <div className={`inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200 ${className}`}>
      {isComplete && !hasError ? (
        <>
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          {icon}
          <span className="text-neutral-700 font-medium">{message}</span>
        </>
      ) : isComplete && hasError ? (
        <>
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          {icon}
          <span className="text-neutral-700 font-medium">{message} (failed)</span>
        </>
      ) : (
        <>
          <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
          {icon}
          <span className="text-neutral-700 font-medium">{message}</span>
        </>
      )}
    </div>
  );
}