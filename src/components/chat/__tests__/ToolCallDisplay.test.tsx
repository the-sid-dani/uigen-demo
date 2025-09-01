import { test, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolCallDisplay } from "../ToolCallDisplay";

afterEach(() => {
  cleanup();
});

// Test str_replace_editor tool
test("displays friendly message for create command", () => {
  const toolInvocation = {
    toolCallId: "test-1",
    toolName: "str_replace_editor",
    args: { command: "create", path: "/components/Button.jsx" },
    state: "result" as const,
    result: "File created successfully"
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Creating Button.jsx")).toBeDefined();
  
  const { container } = render(<ToolCallDisplay toolInvocation={toolInvocation} />);
  expect(container.querySelector("svg")).toBeDefined(); // FileText icon
});

test("displays friendly message for str_replace command", () => {
  const toolInvocation = {
    toolCallId: "test-2",
    toolName: "str_replace_editor",
    args: { command: "str_replace", path: "/App.jsx" },
    state: "result" as const,
    result: "Replacement successful"
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Editing App.jsx")).toBeDefined();
});

test("displays friendly message for view command", () => {
  const toolInvocation = {
    toolCallId: "test-3",
    toolName: "str_replace_editor",
    args: { command: "view", path: "/utils/helpers.js" },
    state: "result" as const,
    result: "File content retrieved"
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Viewing helpers.js")).toBeDefined();
});

test("displays friendly message for insert command", () => {
  const toolInvocation = {
    toolCallId: "test-4",
    toolName: "str_replace_editor",
    args: { command: "insert", path: "/components/Card.tsx" },
    state: "result" as const,
    result: "Content inserted"
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Adding content to Card.tsx")).toBeDefined();
});

test("handles unknown str_replace_editor command", () => {
  const toolInvocation = {
    toolCallId: "test-5",
    toolName: "str_replace_editor",
    args: { command: "unknown", path: "/test.js" },
    state: "result" as const,
    result: "Some result"
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Working with test.js")).toBeDefined();
});

// Test file_manager tool
test("displays friendly message for rename command with new path", () => {
  const toolInvocation = {
    toolCallId: "test-6",
    toolName: "file_manager",
    args: { 
      command: "rename", 
      path: "/old-component.jsx", 
      new_path: "/NewComponent.jsx" 
    },
    state: "result" as const,
    result: { success: true }
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Renaming old-component.jsx → NewComponent.jsx")).toBeDefined();
});

test("displays friendly message for rename command without new path", () => {
  const toolInvocation = {
    toolCallId: "test-7",
    toolName: "file_manager",
    args: { command: "rename", path: "/component.jsx" },
    state: "result" as const,
    result: { success: true }
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Renaming component.jsx")).toBeDefined();
});

test("displays friendly message for delete command - file", () => {
  const toolInvocation = {
    toolCallId: "test-8",
    toolName: "file_manager",
    args: { command: "delete", path: "/unused.js" },
    state: "result" as const,
    result: { success: true }
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Deleting unused.js")).toBeDefined();
});

test("displays friendly message for delete command - directory", () => {
  const toolInvocation = {
    toolCallId: "test-9",
    toolName: "file_manager",
    args: { command: "delete", path: "/old-components" },
    state: "result" as const,
    result: { success: true }
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Deleting old-components")).toBeDefined();
});

test("handles unknown file_manager command", () => {
  const toolInvocation = {
    toolCallId: "test-10",
    toolName: "file_manager",
    args: { command: "unknown", path: "/test.js" },
    state: "result" as const,
    result: "Some result"
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Managing test.js")).toBeDefined();
});

// Test file path handling
test("extracts filename from complex path", () => {
  const toolInvocation = {
    toolCallId: "test-11",
    toolName: "str_replace_editor",
    args: { command: "create", path: "/src/components/ui/Button.tsx" },
    state: "result" as const,
    result: "Success"
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Creating Button.tsx")).toBeDefined();
});

test("handles path with leading slashes", () => {
  const toolInvocation = {
    toolCallId: "test-12",
    toolName: "str_replace_editor",
    args: { command: "create", path: "///App.jsx" },
    state: "result" as const,
    result: "Success"
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Creating App.jsx")).toBeDefined();
});

test("handles empty or undefined path", () => {
  const toolInvocation = {
    toolCallId: "test-13",
    toolName: "str_replace_editor",
    args: { command: "create", path: "" },
    state: "result" as const,
    result: "Success"
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Creating file")).toBeDefined();
});

test("handles missing path argument", () => {
  const toolInvocation = {
    toolCallId: "test-14",
    toolName: "str_replace_editor",
    args: { command: "create" },
    state: "result" as const,
    result: "Success"
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Creating file")).toBeDefined();
});

// Test tool states
test("shows loading state for partial-call", () => {
  const toolInvocation = {
    toolCallId: "test-15",
    toolName: "str_replace_editor",
    args: { command: "create", path: "/App.jsx" },
    state: "partial-call" as const
  };

  const { container } = render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Creating App.jsx")).toBeDefined();
  expect(container.querySelector(".animate-spin")).toBeDefined();
});

test("shows loading state for call", () => {
  const toolInvocation = {
    toolCallId: "test-16",
    toolName: "str_replace_editor",
    args: { command: "create", path: "/App.jsx" },
    state: "call" as const
  };

  const { container } = render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Creating App.jsx")).toBeDefined();
  expect(container.querySelector(".animate-spin")).toBeDefined();
});

test("shows success state for completed result", () => {
  const toolInvocation = {
    toolCallId: "test-17",
    toolName: "str_replace_editor",
    args: { command: "create", path: "/App.jsx" },
    state: "result" as const,
    result: "File created successfully"
  };

  const { container } = render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Creating App.jsx")).toBeDefined();
  expect(container.querySelector(".bg-emerald-500")).toBeDefined();
  expect(container.querySelector(".animate-spin")).toBeNull();
});

test("shows error state for failed result", () => {
  const toolInvocation = {
    toolCallId: "test-18",
    toolName: "str_replace_editor",
    args: { command: "create", path: "/App.jsx" },
    state: "result" as const,
    result: "Error: File creation failed"
  };

  const { container } = render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Creating App.jsx (failed)")).toBeDefined();
  expect(container.querySelector(".bg-red-500")).toBeDefined();
});

// Test unknown tools
test("handles unknown tool gracefully", () => {
  const toolInvocation = {
    toolCallId: "test-19",
    toolName: "unknown_tool",
    args: { someArg: "value" },
    state: "result" as const,
    result: "Some result"
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("unknown_tool")).toBeDefined();
});

// Test custom className prop
test("applies custom className", () => {
  const toolInvocation = {
    toolCallId: "test-20",
    toolName: "str_replace_editor",
    args: { command: "create", path: "/App.jsx" },
    state: "result" as const,
    result: "Success"
  };

  const { container } = render(
    <ToolCallDisplay toolInvocation={toolInvocation} className="custom-class" />
  );

  expect(container.querySelector(".custom-class")).toBeDefined();
});

// Test complex scenarios
test("handles missing args gracefully", () => {
  const toolInvocation = {
    toolCallId: "test-21",
    toolName: "str_replace_editor",
    args: {},
    state: "result" as const,
    result: "Success"
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Working with file")).toBeDefined();
});

test("handles null args gracefully", () => {
  const toolInvocation = {
    toolCallId: "test-22",
    toolName: "str_replace_editor",
    args: null,
    state: "result" as const,
    result: "Success"
  };

  render(<ToolCallDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Working with file")).toBeDefined();
});