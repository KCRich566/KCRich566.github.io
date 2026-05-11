import { useEffect, useRef, useState } from "react";

// Draw a checkerboard pattern behind transparent images
function drawCheckerboard(ctx, width, height, size = 12) {
    for (let y = 0; y < height; y += size) {
        for (let x = 0; x < width; x += size) {
            // Determine which color to use for this pixel
            ctx.fillStyle = (Math.floor(x / size) + Math.floor(y / size)) % 2 === 0 ? "#d0d0d0" : "#ffffff";
            ctx.fillRect(x, y, size, size);
        }
    }
}

export default function AffineTransformTool({ locale }) {
    const canvasRef = useRef(null);
    const previewRef = useRef(null);
    const imageRef = useRef(null);

    // Affine state stored in refs to avoid re-renders on every mouse/wheel event
    const txRef = useRef(0);
    const tyRef = useRef(0);
    const scaleRef = useRef(1);
    const draggingRef = useRef(false);
    const lastPosRef = useRef({ x: 0, y: 0 });

    // ROI state
    const roiModeRef = useRef(false);
    const roiDrawingRef = useRef(false);
    const roiStartRef = useRef({ x: 0, y: 0 });
    const roiRef = useRef(null);

    const [mode, setMode] = useState("pan"); // "pan" || "roi"
    const [status, setStatus] = useState(locale === "zh" ? "尚未選擇圖片." : "No image selected.");
    const [hasImage, setHasImage] = useState(false);
    const [hasRoi, setHasRoi] = useState(false);

    // Keep ref in sync with state
    // Update roiModeRef whenever mode changes
    // current: current value
    useEffect(() => {
        roiModeRef.current = mode === "roi";
    }, [mode]);

    // 
    function canvasToImage(cx, cy) {
        const tx = txRef.current;
        const ty = tyRef.current;
        const scale = scaleRef.current;
        return { 
            x: (cx - tx) / scale, 
            y: (cy - ty) / scale 
        };
    }

    function redraw() {
        const canvas = canvasRef.current;
        const img = imageRef.current;
        if (!canvas || !img) return;

        // preparing the canvas
        const ctx = canvas.getContext("2d");
        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);

        //
        drawCheckerboard(ctx, width, height);

        const tx = txRef.current;
        const ty = tyRef.current;
        const scale = scaleRef.current;
        // Save current canvas status
        ctx.save();
        ctx.translate(tx, ty);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        // Restore current canvas status
        ctx.restore();

        // Draw ROI overlay
        // roi 的座標是相對於誰的?
        const roi = roiRef.current;
        if (roi) {
            const rx = roi.x * scale + tx;
            const ry = roi.y * scale + ty;
            const rw = roi.w * scale;
            const rh = roi.h * scale;
            ctx.save();
            ctx.strokeStyle = "#f97316";
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 3]);
            ctx.strokeRect(rx, ry, rw, rh);
            ctx.fillStyle = "rgba(249, 115, 22, 0.10)";
            ctx.fillRect(rx, ry, rw, rh);
            ctx.restore();
            drawPreview(roi, img);
        }
    }

    function drawPreview(roi, img) {
        const preview = previewRef.current;
        if (!preview || !img) return;
        const pctx = preview.getContext("2d");
        pctx.clearRect(0, 0, preview.width, preview.height);
        drawCheckerboard(pctx, preview.width, preview.height);

        const x = Math.max(0, roi.x);
        const y = Math.max(0, roi.y);
        const w = Math.min(roi.w, img.naturalWidth - x);
        const h = Math.min(roi.h, img.naturalHeight - y);
        if (w <= 0 || h <= 0) return;
        const scale = Math.min(preview.width / w, preview.height / h);
        const dw = w * scale;
        const dh = h * scale;
        const dx = (preview.width - dw) / 2;
        const dy = (preview.height - dh) / 2;
        pctx.drawImage(img, x, y, w, h, dx, dy, dw, dh);
    }

    function fitImage(img, canvas) {
        const margin = 20;
        const scale = Math.min(
            (canvas.width - margin * 2) / img.naturalWidth,
            (canvas.height - margin * 2) / img.naturalHeight,
            1
        );
        txRef.current = (canvas.width - img.naturalWidth * scale) / 2;
        tyRef.current = (canvas.height - img.naturalHeight * scale) / 2;
        scaleRef.current = scale;
    }


    function reset() {
        const img = imageRef.current;
        const canvas = canvasRef.current;
        if (!img || !canvas) return;
        fitImage(img, canvas);
        roiRef.current = null;
        setHasRoi(false);
        redraw();
    }

    function onSelectFile(e) {
        // [?.]: Optional Chaining
        const file = e.target.files?.[0];
        if (!file) return;
        // 暫時的記憶體網址
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            // 等圖片載入完成 就可以釋放記憶體
            URL.revokeObjectURL(url);
            imageRef.current = img;
            roiRef.current = null;
            setHasRoi(false);
            const canvas = canvasRef.current;
            fitImage(img, canvas);
            setHasImage(true);
            setStatus(locale == "zh" ? "圖片以載入. 可平移, 縮放或選取ROI." : "Image loaded. Pan, zoom, or select ROI");
            redraw();
        };
        img.src = url;
    }

    // Attach wheel listener ( non-passive )
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        function onWheel(e) {
            e.preventDefault();
            if (!imageRef.current) return;
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
            const newScale = Math.max(0.05, Math.min(100, scaleRef.current * factor));
            txRef.current = mx - (mx - txRef.current) * (newScale / scaleRef.current);
            tyRef.current = my - (my - tyRef.current) * (newScale / scaleRef.current);
            scaleRef.current = newScale;
            redraw();
        }
        canvas.addEventListener("wheel", onWheel, { passive: false });
        // 在被卸載時才會執行return () => ....
        return () => canvas.removeEventListener("wheel", onWheel);
    },
        // []: 空, 表示只執行一次
        []);

    // get the mouse position on canvas(no coordication change)
    function getCanvasPos(e) {
        const rect = canvasRef.current.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    function onMouseDown(e) {
        if (!imageRef.current) return;
        const pos = getCanvasPos(e);
        if (roiModeRef.current) {
            roiDrawingRef.current = true;
            const imgPos = canvasToImage(pos.x, pos.y);
            roiStartRef.current = imgPos;
            roiRef.current = { x: imgPos.x, y: imgPos.y, w: 0, h: 0 };

        } else {
            draggingRef.current = true;
            lastPosRef.current = pos;
        }
    }

    function onMouseMove(e) {
        if (!imageRef.current) return;
        const pos = getCanvasPos(e);
        if (roiModeRef.current && roiDrawingRef.current) {
            const imgPos = canvasToImage(pos.x, pos.y);
            const start = roiStartRef.current;
            roiRef.current = {
                x: Math.min(start.x, imgPos.x),
                y: Math.min(start.y, imgPos.y),
                w: Math.abs(imgPos.x - start.x),
                h: Math.abs(imgPos.y - start.y),
            };
            redraw();
        } else if (!roiModeRef.current && draggingRef.current) {
            txRef.current += pos.x - lastPosRef.current.x;
            tyRef.current += pos.y - lastPosRef.current.y;
            lastPosRef.current = pos;
            redraw();
        }
    }

    function onMouseUp() {
        draggingRef.current = false;
        if (roiDrawingRef.current) {
            roiDrawingRef.current = false;
            const roi = roiRef.current;

            if (roi && roi.w > 2 && roi.h > 2) {
                setHasRoi(true);
                setStatus(locale === "zh" ?
                    `ROI: ${Math.round(roi.x)}, ${Math.round(roi.y)}, ${Math.round(roi.w)}x${Math.round(roi.h)}` :
                    `ROI: ${Math.round(roi.x)}, ${Math.round(roi.y)}, ${Math.round(roi.w)}x${Math.round(roi.h)}`);
            }
            else {
                roiRef.current = null;
                setHasRoi(false);
            }
        }
    }

    return (
        <section className="tool">
            <p>{locale === "zh" ? "滑鼠拖曳平移, 滾輪縮放(以滑鼠游標為中心); 切換ROI模式後拖曳框選區域." : "Drag to pan, scroll to zoom (cursor-anchored). Switch to ROI mode to draw a crop region."}</p>
            <div className="tool-controls">
                <input type="file" accept="image/*" onChange={onSelectFile} />
                <button
                    onClick={() => setMode(mode === "pan" ? "roi" : "pan")}
                    style={{
                        background: mode === "roi" ? "#f97316" : undefined,
                        color: mode === "roi" ? "#fff" : undefined
                    }}>
                    {mode === "roi" ?
                        (locale === "zh" ? "切換: 平移" : "Mode: Pan") :
                        (locale === "zh" ? "切換: ROI" : "Mode: ROI")}
                </button>
                <button onClick={reset} disabled={!hasImage}>{locale === "zh" ? "重設" : "Reset"}</button>
            </div>
            <p style={{ fontSize: "0.85em", color: "#6b7280" }}>{status}</p>
            <div style={{ position: "relative", display: "inline-block", userSelect: "none" }}>
                
                <canvas
                    ref={canvasRef}
                    width={740}
                    height={480}
                    style={{
                        border: "1px solid #e5e7eb",
                        cursor: mode === "roi" ? "crosshair" : "grab", display: "block"
                    }}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                />

                <canvas
                    ref={previewRef}
                    width={180}
                    height={140}
                    style={{
                        display: hasRoi ? "block" : "none",
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        border: "2px solid #f97316",
                        background: "#fff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    }}
                />
            </div>
        </section>
    );



}