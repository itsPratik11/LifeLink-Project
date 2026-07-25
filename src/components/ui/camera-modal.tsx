"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  X, 
  RefreshCw, 
  Download, 
  Upload, 
  Check, 
  ShieldAlert, 
  Sparkles, 
  Heart, 
  Award,
  Layers,
  Image as ImageIcon,
  RotateCcw
} from "lucide-react";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePhoto?: (dataUrl: string) => void;
}

type FilterOption = "none" | "vibrant" | "warm" | "noir" | "sepia";
type OverlayOption = "hero" | "lifesaver" | "champion" | "badge";

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onSavePhoto,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionState, setPermissionState] = useState<"idle" | "requesting" | "granted" | "denied">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("vibrant");
  const [selectedOverlay, setSelectedOverlay] = useState<OverlayOption>("hero");
  const [isCapturingFlash, setIsCapturingFlash] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Stop video stream cleanup
  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  // Request camera access
  const startCamera = useCallback(async (mode: "user" | "environment" = facingMode) => {
    setPermissionState("requesting");
    setErrorMessage(null);

    // Stop existing stream if any
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API is not supported in this browser environment.");
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      setPermissionState("granted");

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setPermissionState("denied");
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setErrorMessage("Camera access was denied. Please allow camera permissions in your browser settings or upload a photo.");
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setErrorMessage("No camera hardware found on your device.");
      } else {
        setErrorMessage(err.message || "Failed to access camera.");
      }
    }
  }, [facingMode, stream]);

  // Handle modal open/close
  useEffect(() => {
    if (isOpen && !capturedImage) {
      startCamera(facingMode);
    } else if (!isOpen) {
      stopStream();
      setCapturedImage(null);
      setIsSaved(false);
    }
    return () => {
      stopStream();
    };
  }, [isOpen]);

  // Attach stream to video element when video element is rendered
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, videoRef.current]);

  // Toggle front / rear camera
  const toggleFacingMode = () => {
    const nextMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Draw overlay badge & text onto canvas
  const drawOverlayOnCanvas = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    overlay: OverlayOption,
    filter: FilterOption
  ) => {
    // Apply CSS filter simulation to canvas
    if (filter === "vibrant") {
      ctx.filter = "saturate(1.3) contrast(1.1)";
    } else if (filter === "warm") {
      ctx.filter = "sepia(0.25) saturate(1.2) contrast(1.05)";
    } else if (filter === "noir") {
      ctx.filter = "grayscale(1) contrast(1.2)";
    } else if (filter === "sepia") {
      ctx.filter = "sepia(0.85) contrast(1.1)";
    } else {
      ctx.filter = "none";
    }

    // Re-draw current canvas image with filter applied
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext("2d");
    if (tempCtx) {
      tempCtx.drawImage(ctx.canvas, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(tempCanvas, 0, 0);
    }

    ctx.filter = "none"; // Reset filter for drawing vector text and badges

    // Draw Branded LifeLink Bottom Banner
    const bannerHeight = Math.max(60, height * 0.12);
    const gradient = ctx.createLinearGradient(0, height - bannerHeight, 0, height);
    gradient.addColorStop(0, "rgba(15, 23, 42, 0)");
    gradient.addColorStop(1, "rgba(15, 23, 42, 0.95)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, height - bannerHeight - 40, width, bannerHeight + 40);

    // LifeLink Logo & Text
    const fontSize = Math.max(16, Math.floor(width * 0.035));
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillStyle = "#FFFFFF";

    let badgeText = "LIFELINK BLOOD DONOR";
    let subText = "Saving Lives Every Day • www.lifelink.org";

    if (overlay === "hero") {
      badgeText = "🩸 BLOOD DONOR HERO";
      subText = "I Saved A Life Today | LifeLink";
    } else if (overlay === "lifesaver") {
      badgeText = "❤️ LIFE SAVER CHAMPION";
      subText = "Every Drop Counts | LifeLink Community";
    } else if (overlay === "champion") {
      badgeText = "⚡ DONOR LEGEND 2026";
      subText = "Heroic Contribution | LifeLink App";
    } else if (overlay === "badge") {
      badgeText = "✨ PROUD BLOOD DONOR";
      subText = "Be The Reason Someone Smiles Today";
    }

    // Render Badge Title
    ctx.shadowColor = "rgba(225, 29, 72, 0.8)";
    ctx.shadowBlur = 12;
    ctx.fillText(badgeText, 24, height - 36);

    // Render Subtitle & Date Stamp
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.font = `500 ${Math.max(12, Math.floor(fontSize * 0.65))}px sans-serif`;
    ctx.fillStyle = "rgba(226, 232, 240, 0.85)";
    const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    ctx.fillText(`${subText} • ${dateStr}`, 24, height - 16);

    // Top Right Pill Tag
    const tagText = "LIFELINK VERIFIED";
    ctx.font = `bold ${Math.max(11, Math.floor(fontSize * 0.55))}px sans-serif`;
    const textWidth = ctx.measureText(tagText).width;
    const tagPadding = 12;
    const tagX = width - textWidth - tagPadding * 2 - 20;
    const tagY = 20;

    ctx.fillStyle = "#E11D48"; // Tailwind red-600
    ctx.beginPath();
    if ((ctx as any).roundRect) {
      (ctx as any).roundRect(tagX, tagY, textWidth + tagPadding * 2, 28, 14);
    } else {
      ctx.rect(tagX, tagY, textWidth + tagPadding * 2, 28);
    }
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(tagText, tagX + tagPadding, tagY + 18);
  };

  // Capture photo from video stream
  const capturePhoto = () => {
    if (!videoRef.current) return;

    // Visual shutter flash
    setIsCapturingFlash(true);
    setTimeout(() => setIsCapturingFlash(false), 200);

    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // If facing user camera, mirror image horizontally so selfie feels natural
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Reset transformation matrix before drawing overlay
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Apply overlay badge & filter
    drawOverlayOnCanvas(ctx, canvas.width, canvas.height, selectedOverlay, selectedFilter);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
    setCapturedImage(dataUrl);
    stopStream();
  };

  // Handle uploaded file fallback
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current || document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          drawOverlayOnCanvas(ctx, canvas.width, canvas.height, selectedOverlay, selectedFilter);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
          setCapturedImage(dataUrl);
          stopStream();
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Retake photo
  const handleRetake = () => {
    setCapturedImage(null);
    setIsSaved(false);
    startCamera(facingMode);
  };

  // Download captured image
  const handleDownload = () => {
    if (!capturedImage) return;
    const link = document.createElement("a");
    link.href = capturedImage;
    link.download = `lifelink-donor-moment-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save / Share photo
  const handleSave = () => {
    if (!capturedImage) return;
    if (onSavePhoto) {
      onSavePhoto(capturedImage);
    }
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 md:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-600/10 text-red-500 border border-red-500/20">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white leading-tight">Capture The Moment</h3>
                <p className="text-xs text-slate-400">Share your blood donation hero badge</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Viewport Content */}
          <div className="relative flex-1 bg-black flex items-center justify-center min-h-[360px] md:min-h-[440px] overflow-hidden">
            {/* Shutter Flash Animation */}
            {isCapturingFlash && (
              <div className="absolute inset-0 bg-white z-40 animate-out fade-out duration-200" />
            )}

            {/* Canvas for image processing (hidden) */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Hidden file input fallback */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            {/* STATE 1: Live Video Camera View */}
            {!capturedImage && permissionState === "granted" && (
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover max-h-[460px] ${
                    facingMode === "user" ? "scale-x-[-1]" : ""
                  }`}
                  style={{
                    filter:
                      selectedFilter === "vibrant"
                        ? "saturate(1.3) contrast(1.1)"
                        : selectedFilter === "warm"
                        ? "sepia(0.25) saturate(1.2)"
                        : selectedFilter === "noir"
                        ? "grayscale(1) contrast(1.2)"
                        : selectedFilter === "sepia"
                        ? "sepia(0.85)"
                        : "none",
                  }}
                />

                {/* Branded Live Overlay Preview */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-lg shadow-red-600/30 mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        {selectedOverlay === "hero" && "BLOOD DONOR HERO"}
                        {selectedOverlay === "lifesaver" && "LIFE SAVER CHAMPION"}
                        {selectedOverlay === "champion" && "DONOR LEGEND 2026"}
                        {selectedOverlay === "badge" && "PROUD BLOOD DONOR"}
                      </span>
                      <p className="text-white font-semibold text-sm drop-shadow-md">
                        I Saved A Life Today ❤️ | LifeLink
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-300 bg-slate-900/80 px-2 py-1 rounded-md border border-slate-700">
                      LIVE PREVIEW
                    </span>
                  </div>
                </div>

                {/* Camera Control Overlay Actions */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={toggleFacingMode}
                    className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 backdrop-blur-md shadow-lg transition-transform active:scale-95"
                    title="Switch Camera"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STATE 2: Requesting Access Loading */}
            {!capturedImage && permissionState === "requesting" && (
              <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-red-600/30 border-t-red-600 animate-spin" />
                  <Camera className="w-6 h-6 text-red-500 absolute inset-0 m-auto" />
                </div>
                <h4 className="text-white font-bold text-lg">Requesting Camera Access...</h4>
                <p className="text-slate-400 text-sm max-w-sm">
                  Please allow browser access to your camera to take your donation hero photo.
                </p>
              </div>
            )}

            {/* STATE 3: Permission Denied or Error */}
            {!capturedImage && permissionState === "denied" && (
              <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 max-w-md">
                <div className="p-4 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20">
                  <ShieldAlert className="w-10 h-10" />
                </div>
                <h4 className="text-white font-bold text-lg">Camera Access Needed</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {errorMessage || "Unable to open your camera. Check browser permissions or upload an image instead."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full">
                  <button
                    onClick={() => startCamera(facingMode)}
                    className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </button>
                </div>
              </div>
            )}

            {/* STATE 4: Captured Photo Preview Result */}
            {capturedImage && (
              <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
                <img
                  src={capturedImage}
                  alt="Captured donor moment"
                  className="w-full h-full object-contain max-h-[460px]"
                />
              </div>
            )}
          </div>

          {/* Controls Footer */}
          <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-5">
            {/* Overlay Frame Selection & Filter Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Overlay Badge Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-red-500" />
                  Hero Badge Frame
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "hero", label: "Blood Donor Hero" },
                    { id: "lifesaver", label: "Life Saver" },
                    { id: "champion", label: "Donor Legend" },
                    { id: "badge", label: "Proud Donor" },
                  ].map((overlay) => (
                    <button
                      key={overlay.id}
                      onClick={() => setSelectedOverlay(overlay.id as OverlayOption)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all text-left truncate ${
                        selectedOverlay === overlay.id
                          ? "bg-red-600/20 border-red-500 text-white"
                          : "bg-slate-800/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                      }`}
                    >
                      {overlay.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-500" />
                  Color Filter
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {[
                    { id: "none", label: "Normal" },
                    { id: "vibrant", label: "Vibrant" },
                    { id: "warm", label: "Warm" },
                    { id: "noir", label: "Noir B&W" },
                    { id: "sepia", label: "Sepia" },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id as FilterOption)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all whitespace-nowrap ${
                        selectedFilter === filter.id
                          ? "bg-blue-600/20 border-blue-500 text-white"
                          : "bg-slate-800/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              {/* Left Side: Upload Fallback button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4 text-slate-400" />
                Upload Image
              </button>

              {/* Center Shutter Button (When video is active) */}
              {!capturedImage && permissionState === "granted" && (
                <button
                  onClick={capturePhoto}
                  className="relative p-1 rounded-full bg-slate-800 border-2 border-red-500 hover:scale-105 active:scale-95 transition-transform shadow-xl shadow-red-600/20 group"
                  title="Take Photo"
                >
                  <div className="w-12 h-12 rounded-full bg-red-600 group-hover:bg-red-500 flex items-center justify-center text-white">
                    <Camera className="w-6 h-6" />
                  </div>
                </button>
              )}

              {/* Right Side: Preview Action Buttons (When photo captured) */}
              {capturedImage ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRetake}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Retake
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4 text-blue-400" />
                    Download
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaved}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/30 flex items-center gap-1.5"
                  >
                    {isSaved ? (
                      <>
                        <Check className="w-4 h-4" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 fill-current" />
                        Save Moment
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="w-24" /> // Spacing balancer
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CameraModal;
