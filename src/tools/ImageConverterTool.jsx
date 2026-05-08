import { useMemo, useState } from "react";

const EXTENSIONS = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Cannot read ${file.name}`));
    };
    image.src = url;
  });
}

export default function ImageConverterTool({ locale }) {
  const [files, setFiles] = useState([]);
  const [format, setFormat] = useState("image/png");
  const [quality, setQuality] = useState(90);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [keepRatio, setKeepRatio] = useState(true);
  const [background, setBackground] = useState("#ffffff");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState(locale === "zh" ? "尚未選擇圖片。" : "No images selected.");

  const labels = useMemo(
    () =>
      locale === "zh"
        ? { title: "線上圖片轉檔", convert: "開始轉檔", clear: "清除", downloadAll: "全部下載" }
        : { title: "Online Image Converter", convert: "Convert", clear: "Clear", downloadAll: "Download all" },
    [locale]
  );

  async function convertFile(file) {
    const image = await loadImage(file);
    const sourceWidth = image.naturalWidth || image.width;
    const sourceHeight = image.naturalHeight || image.height;
    let targetWidth = Number.parseInt(width, 10);
    let targetHeight = Number.parseInt(height, 10);
    if (keepRatio) {
      if (targetWidth && !targetHeight) targetHeight = Math.round((targetWidth * sourceHeight) / sourceWidth);
      if (!targetWidth && targetHeight) targetWidth = Math.round((targetHeight * sourceWidth) / sourceHeight);
    }

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth || sourceWidth;
    canvas.height = targetHeight || sourceHeight;
    const context = canvas.getContext("2d");
    if (format === "image/jpeg") {
      context.fillStyle = background;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, format, quality / 100);
    });
    if (!blob) throw new Error(`Cannot export ${file.name}`);

    const ext = EXTENSIONS[format] || "png";
    const fileName = `${file.name.replace(/\.[^.]+$/, "")}.${ext}`;
    return { fileName, blob, width: canvas.width, height: canvas.height, url: URL.createObjectURL(blob) };
  }

  async function onConvert() {
    if (files.length === 0) return;
    const next = [];
    for (const file of files) {
      try {
        const result = await convertFile(file);
        next.push(result);
        setStatus(`${next.length}/${files.length}`);
      } catch {
        // ignore failed file
      }
    }
    setResults(next);
  }

  function onClear() {
    results.forEach((x) => URL.revokeObjectURL(x.url));
    setFiles([]);
    setResults([]);
    setStatus(locale === "zh" ? "尚未選擇圖片。" : "No images selected.");
  }

  return (
    <section className="tool">
      <h2>{labels.title}</h2>
      <p>{locale === "zh" ? "圖片不會上傳伺服器，全部在本機處理。" : "Files are processed locally in your browser."}</p>
      <div className="tool-controls">
        <input type="file" multiple accept="image/*" onChange={(e) => setFiles(Array.from(e.target.files || []))} />
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPEG</option>
          <option value="image/webp">WebP</option>
        </select>
        <input type="range" min="1" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} />
        <input type="number" min="1" placeholder="W" value={width} onChange={(e) => setWidth(e.target.value)} />
        <input type="number" min="1" placeholder="H" value={height} onChange={(e) => setHeight(e.target.value)} />
        <label><input type="checkbox" checked={keepRatio} onChange={(e) => setKeepRatio(e.target.checked)} /> ratio</label>
        <input type="color" value={background} onChange={(e) => setBackground(e.target.value)} />
        <button onClick={onConvert}>{labels.convert}</button>
        <button onClick={onClear}>{labels.clear}</button>
      </div>
      <p>{status}</p>
      <div className="cards">
        {results.map((item) => (
          <article className="card" key={item.url}>
            <img src={item.url} alt={item.fileName} />
            <p>{item.fileName}</p>
            <a href={item.url} download={item.fileName}>Download</a>
          </article>
        ))}
      </div>
    </section>
  );
}
