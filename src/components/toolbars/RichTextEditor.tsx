"use client";

import { useEffect } from "react";

import { BlockquoteToolbar } from "@/components/toolbars/blockquote";
import { BoldToolbar } from "@/components/toolbars/bold";
import { BulletListToolbar } from "@/components/toolbars/bullet-list";
import { CodeToolbar } from "@/components/toolbars/code";
import { CodeBlockToolbar } from "@/components/toolbars/code-block";
import { HardBreakToolbar } from "@/components/toolbars/hard-break";
import { HorizontalRuleToolbar } from "@/components/toolbars/horizontal-rule";
import { ItalicToolbar } from "@/components/toolbars/italic";
import { OrderedListToolbar } from "@/components/toolbars/ordered-list";
import { RedoToolbar } from "@/components/toolbars/redo";
import { StrikeThroughToolbar } from "@/components/toolbars/strikethrough";
import { ToolbarProvider } from "@/components/toolbars/toolbar-provider";
import { UndoToolbar } from "@/components/toolbars/undo";
import { Separator } from "@/components/ui/separator";
import { EditorContent, type Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ImageExtension } from "../extensions/image";
import { ImagePlaceholder } from "../extensions/image-placeholder";
import { ImagePlaceholderToolbar } from "./image-placeholder-toolbar";

const extensions = [
    StarterKit.configure({
        orderedList: {
            HTMLAttributes: {
                class: "list-decimal",
            },
        },
        bulletList: {
            HTMLAttributes: {
                class: "list-disc",
            },
        },
        code: {
            HTMLAttributes: {
                class: "bg-accent rounded-md p-1",
            },
        },
        horizontalRule: {
            HTMLAttributes: {
                class: "my-2",
            },
        },
        codeBlock: {
            HTMLAttributes: {
                class: "bg-primary text-primary-foreground p-2 text-sm rounded-md p-1",
            },
        },
        heading: {
            levels: [1, 2, 3, 4],
            HTMLAttributes: {
                class: "tiptap-heading",
            },
        },
    }),
    ImageExtension,
    ImagePlaceholder,
];

interface RichTextEditorProps {
    content: string;
    onChange: (richText: string) => void;
}

const RichTextEditor = ({ content, onChange, }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: extensions as Extension[],
        content,
        editorProps: {
            attributes: {
                class: "outline-none min-h-[300px] p-4",
            },
        },
        editable: true,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
    });

    // Update editor content when content prop changes (for edit mode)
    // Only update if the content is different to avoid cursor jumping and loops
    useEffect(() => {
        if (editor && content) {
            // Only update if editor is empty (initial load scenario) to prevent overwriting user typing
            // or loop issues. For full bi-directional sync, we need deeper comparison.
            // Given the use case is "Loading initial data", checking isEmpty on first load is usually safer.
            if (editor.isEmpty) {
                editor.commands.setContent(content)
            }
        }
    }, [content, editor]);

    if (!editor) {
        return null;
    }
    return (
        <div className="border w-full relative rounded-md overflow-hidden pb-3">
            <div className="flex w-full items-center py-2 px-2 justify-between border-b  sticky top-0 left-0 bg-background z-20">
                <ToolbarProvider editor={editor}>
                    <div className="flex items-center gap-2">
                        <UndoToolbar />
                        <RedoToolbar />
                        <Separator orientation="vertical" className="h-7" />
                        <BoldToolbar />
                        <ItalicToolbar />
                        <StrikeThroughToolbar />
                        <BulletListToolbar />
                        <OrderedListToolbar />
                        <CodeToolbar />
                        <CodeBlockToolbar />
                        <HorizontalRuleToolbar />
                        <BlockquoteToolbar />
                        <HardBreakToolbar />
                        <ImagePlaceholderToolbar />
                    </div>
                </ToolbarProvider>
            </div>
            <div
                onClick={() => {
                    editor?.chain().focus().run();
                }}
                className="cursor-text min-h-72 bg-background"
            >
                <EditorContent className="outline-none" editor={editor} />
            </div>
        </div>
    );
};

export default RichTextEditor;