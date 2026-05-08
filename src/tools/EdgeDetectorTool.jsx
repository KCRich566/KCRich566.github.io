import { useRef, useState } from "react";

const KERNELS = {
  sobel: { x: [-1, 0, 1, -2, 0, 2, -1, 0, 1], y: [-1, -2, -1, 0, 0, 0, 1, 2, 1] },
  prewitt: { x: [-1, 0, 1, -1, 0, 1, -1, 0, 1], y: [-1, -1, -1, 0, 0, 0, 1, 1, 1] },
  scharr: { x: [-3, 0, 3, -10, 0, 10, -3, 0, 3], y: [-3, -10, -3, 0, 0, 0, 3, 10, 3] },
};

export default function EdgeDetectorTool({ locale }) {
  const sourceRef = useRef(null);
  const resultRef = useRef(null);
  const [method, setMethod] = useState("sobel");
  const [threshold, setThreshold] = useState(70);
  const [status, setStatus] = useState(locale === "zh" ? "尚未選擇圖片。" : "No image selected.");
  const [downloadUrl, setDownloadUrl] = useState("");

  function toGray(data, width, height) {
    const gray = new Float32Array(width * height);
    for (let i = 0, j = 0; i < data.length; i += 4, j += 1) {
      gray[j] = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    }
    return gray;
  }

  function convolveAt(values, width, height, x, y, kernel) {
    let sum = 0;
    let index = 0;
    for (let ky = -1; ky <= 1; ky += 1) {
      for (let kx = -1; kx <= 1; kx += 1) {
        const px = Math.min(width - 1, Math.max(0, x + kx));
        const py = Math.min(height - 1, Math.max(0, y + ky));
        sum += values[py * width + px] * kernel[index];
        index += 1;
      }
    }
    return sum;
  }

  function onSelectFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      const canvas = sourceRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      resultRef.current.width = image.naturalWidth;
      resultRef.current.height = image.naturalHeight;
      ctx.drawImage(image, 0, 0);
      URL.revokeObjectURL(url);
      setStatus(locale === "zh" ? "圖片已載入，可執行偵測。" : "Image loaded.");
    };
    image.src = url;
  }

  function process() {
    const source = sourceRef.current;
    const result = resultRef.current;
    if (!source.width || !source.height) return;
    const sctx = source.getContext("2d", { willReadFrequently: true });
    const rctx = result.getContext("2d");
    const { width, height } = source;
    const img = sctx.getImageData(0, 0, width, height);
    const gray = toGray(img.data, width, height);
    const kernel = KERNELS[method] || KERNELS.sobel;
    const out = new Uint8ClampedArray(width * height);
    let max = 1;
    const mag = new Float32Array(width * height);
    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        const gx = convolveAt(gray, width, height, x, y, kernel.x);
        const gy = convolveAt(gray, width, height, x, y, kernel.y);
        const idx = y * width + x;
        mag[idx] = Math.hypot(gx, gy);
        max = Math.max(max, mag[idx]);
      }
    }

    const outputImage = rctx.createImageData(width, height);
    for (let i = 0, j = 0; i < mag.length; i += 1, j += 4) {
      const v = (mag[i] / max) * 255;
      const pixel = v >= threshold ? v : 0;
      outputImage.data[j] = pixel;
      outputImage.data[j + 1] = pixel;
      outputImage.data[j + 2] = pixel;
      outputImage.data[j + 3] = 255;
    }
    rctx.putImageData(outputImage, 0, 0);
    const url = result.toDataURL("image/png");
    setDownloadUrl(url);
    setStatus(locale === "zh" ? "邊緣偵測完成。" : "Edge detection complete.");
  }

  return (
    <section className="tool">
      <h2>Edge Detection</h2>
      <p>{locale === "zh" ? "本機執行 Sobel / Prewitt / Scharr。" : "Run Sobel / Prewitt / Scharr locally."}</p>
      <div className="tool-controls">
        <input type="file" accept="image/*" onChange={onSelectFile} />
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="sobel">Sobel</option>
          <option value="prewitt">Prewitt</option>
          <option value="scharr">Scharr</option>
        </select>
        <input type="range" min="0" max="255" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} />
        <button onClick={process}>{locale === "zh" ? "執行偵測" : "Detect"}</button>
        {downloadUrl ? <a href={downloadUrl} download="edge-detection.png">Download</a> : null}
      </div>
      <p>{status}</p>
      <div className="canvas-wrap">
        <canvas ref={sourceRef} />
        <canvas ref={resultRef} />
      </div>
    </section>
  );
}
