// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { X, ZoomIn, Volume2, FileText, Film } from "lucide-react";

// /**
//  * PrimaryMediaView
//  *
//  * Props:
//  *  - url        {string}      media URL to display in the modal
//  *  - type       {string}      "image" | "video" | "audio" | "pdf"
//  *  - children   {ReactNode}   the trigger element (e.g. your existing <ImgComponent />)
//  *  - alt        {string}      accessible alt text (optional)
//  *  - title      {string}      modal title (optional)
//  */
// export function PrimaryMediaView({
//   url,
//   type,
//   children,
//   alt = "Media",
//   title,
// }: {
//   url: string;
//   type: string;
//   children: React.ReactNode;
//   alt?: string;
//   title?: string;
// }) {
//   const [open, setOpen] = useState(false);

//   const mediaType = type?.toLowerCase();

//   const TypeIcon =
//     ({ image: ZoomIn, video: Film, audio: Volume2, pdf: FileText } as Record<
//       string,
//       React.ElementType
//     >)[mediaType] ?? ZoomIn;

//   const displayTitle =
//     title ?? (mediaType ? mediaType.charAt(0).toUpperCase() + mediaType.slice(1) : "Media");

//   return (
//     <>
//       {/* ── Trigger wrapper ─────────────────────────── */}
//       <div
//         className="relative inline-block cursor-pointer outline-none group"
//         onClick={() => setOpen(true)}
//         role="button"
//         tabIndex={0}
//         onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
//         aria-label={`Open ${mediaType ?? "media"} viewer`}
//       >
//         {children}

//         {/* Hover overlay badge */}
//         <span
//           aria-hidden="true"
//           className="
//             absolute top-1.5 right-1.5
//             flex items-center justify-center
//             w-6 h-6 rounded-md
//             bg-black/55 backdrop-blur-sm text-white
//             opacity-0 scale-90 translate-x-1 -translate-y-1
//             group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 group-hover:translate-y-0
//             group-focus-visible:opacity-100 group-focus-visible:scale-100
//             transition-all duration-[180ms] ease-out
//             pointer-events-none
//           "
//         >
//           <TypeIcon size={13} strokeWidth={2.5} />
//         </span>
//       </div>

//       {/* ── Modal ───────────────────────────────────── */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent
//           aria-describedby={undefined}
//           className="
//             bg-[#0d0d0d] border border-white/[0.08]
//             rounded-2xl p-0
//             shadow-[0_32px_80px_rgba(0,0,0,0.65),inset_0_0_0_1px_rgba(255,255,255,0.04)]
//             max-w-[min(90vw,900px)] w-full
//             overflow-hidden flex flex-col
//           "
//         >
//           {/* Title bar */}
//           <DialogTitle
//             className="
//               text-[11px] font-semibold tracking-[0.12em] uppercase
//               text-white/35 font-mono
//               px-5 py-3.5 pr-12
//               border-b border-white/[0.06]
//               shrink-0 m-0
//             "
//           >
//             {displayTitle}
//           </DialogTitle>

//           {/* Close button */}
//           <button
//             onClick={() => setOpen(false)}
//             aria-label="Close"
//             className="
//               absolute top-2.5 right-3
//               flex items-center justify-center
//               w-7 h-7 rounded-[7px]
//               bg-white/[0.06] border-0
//               text-white/50 cursor-pointer z-10
//               hover:bg-white/[0.12] hover:text-white
//               transition-colors duration-150
//             "
//           >
//             <X size={16} strokeWidth={2.5} />
//           </button>

//           {/* Media area */}
//           <div
//             className="
//               flex items-center justify-center
//               p-6 min-h-[200px] max-h-[80vh] overflow-auto
//               bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.015)_0%,transparent_60%),#0d0d0d]
//             "
//           >
//             {mediaType === "image" && (
//               // eslint-disable-next-line @next/next/no-img-element
//               <img
//                 src={url}
//                 alt={alt}
//                 draggable={false}
//                 className="max-w-full max-h-[75vh] w-auto h-auto rounded-md block object-contain"
//               />
//             )}

//             {mediaType === "video" && (
//               <video
//                 src={url}
//                 controls
//                 autoPlay
//                 aria-label={alt}
//                 className="max-w-full max-h-[75vh] rounded-md block bg-black"
//               />
//             )}

//             {mediaType === "audio" && (
//               <div className="flex flex-col items-center gap-6 py-10 w-full">
//                 <Volume2 size={40} className="text-white/20" />
//                 <audio
//                   src={url}
//                   controls
//                   autoPlay
//                   aria-label={alt}
//                   className="w-full max-w-[480px]"
//                 />
//               </div>
//             )}

//             {mediaType === "pdf" && (
//               <iframe
//                 src={url}
//                 title={alt}
//                 className="w-full h-[75vh] border-0 rounded-sm bg-white"
//               />
//             )}

//             {!["image", "video", "audio", "pdf"].includes(mediaType) && (
//               <div className="flex flex-col items-center gap-3 text-white/40 p-12 text-center font-mono text-[13px]">
//                 <FileText size={32} />
//                 <p>
//                   Unsupported media type:{" "}
//                   <code className="bg-white/[0.08] px-1.5 py-0.5 rounded">{type}</code>
//                 </p>
//                 <a
//                   href={url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-white/60 underline underline-offset-[3px]"
//                 >
//                   Open in new tab ↗
//                 </a>
//               </div>
//             )}
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// export default PrimaryMediaView;

// // ─── Usage example ────────────────────────────────────────────────────────────
// //
// // <PrimaryMediaView
// //   url="https://example.com/photo.jpg"
// //   type="image"
// //   alt="A scenic mountain view"
// //   title="Mountain Photo"
// // >
// //   <MyImageComponent src="https://example.com/photo.jpg" alt="thumbnail" />
// // </PrimaryMediaView>

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, ZoomIn, Volume2, FileText, Film, ChevronRight } from "lucide-react";

/**
 * PrimaryMediaView
 *
 * Props:
 *  - url        {string}      media URL to display in the modal
 *  - type       {string}      "image" | "video" | "audio" | "pdf"
 *  - children   {ReactNode}   the trigger element (e.g. your existing <ImgComponent />)
 *  - alt        {string}      accessible alt text (optional)
 *  - title      {string}      modal title (optional)
 */
export function PrimaryMediaView({
  url,
  type,
  children,
  alt = "Media",
  title,
}: {
  url: string;
  type: string;
  children: React.ReactNode;
  alt?: string;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const mediaType = type?.toLowerCase();

  return (
    <>
      {/* ── Trigger wrapper ─────────────────────────── */}
      <div
        className="relative inline-block cursor-pointer outline-none group size-full"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        aria-label={`Open ${mediaType ?? "media"} viewer`}
      >
        {children}
      </div>

      {/* ── Modal ───────────────────────────────────── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
        className="w-full min-w-[75vw] min-h-[75vh] p-8"
          aria-describedby={undefined}
        >
          {/* Media area */}
          <div
            className="
              flex items-center justify-center
              h-full overflow-auto
              bg-background
              "
              // p-4 sm:p-8 min-h-[200px] max-h-[85vh] overflow-auto
          >
            {mediaType === "image" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={url}
                alt={alt}
                draggable={false}
                className="w-auto h-auto rounded-md object-contain"
                // className="max-w-full max-h-[75vh] w-auto h-auto rounded-md block object-contain shadow-2xl"
              />
            )}

            {mediaType === "video" && (
              <video
                src={url}
                controls
                autoPlay
                aria-label={alt}
                className="max-w-full max-h-[75vh] rounded-md block bg-black shadow-2xl"
              />
            )}

            {mediaType === "audio" && (
              <div className="flex flex-col items-center gap-6 py-12 w-full max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Volume2 size={32} className="text-muted-foreground" />
                </div>
                <audio
                  src={url}
                  controls
                  autoPlay
                  aria-label={alt}
                  className="w-full"
                />
              </div>
            )}

            {mediaType === "pdf" && (
              <iframe
                src={url}
                title={alt}
                className="w-full h-[75vh] border-0 rounded-md bg-white"
              />
            )}

            {!["image", "video", "audio", "pdf"].includes(mediaType) && (
              <div className="flex flex-col items-center gap-4 text-muted-foreground p-16 text-center">
                <div className="bg-muted p-4 rounded-xl">
                  <FileText size={40} />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Unsupported Preview</p>
                  <p className="text-sm">
                    This file type (<code className="bg-muted px-1.5 py-0.5 rounded text-xs">{type}</code>) cannot be previewed.
                  </p>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-primary font-medium hover:underline text-sm inline-flex items-center gap-1"
                >
                  Download File <ChevronRight size={14} />
                </a>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PrimaryMediaView;
