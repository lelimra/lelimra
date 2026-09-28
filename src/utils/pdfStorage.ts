/**
 * IndexedDB helper to persist custom uploaded PDF files locally in the browser
 */
const DB_NAME = "LIMRA_CATALOGUE_DB";
const STORE_NAME = "catalogue_files";
const FILE_KEY = "active_catalogue_pdf";

interface StoredPdfData {
  fileName: string;
  fileSize: number;
  fileType: string;
  blob: Blob;
  uploadedAt: string;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveUploadedPdf(file: File): Promise<StoredPdfData> {
  const db = await openDB();
  const data: StoredPdfData = {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    blob: file,
    uploadedAt: new Date().toISOString(),
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(data, FILE_KEY);

    req.onsuccess = () => resolve(data);
    req.onerror = () => reject(req.error);
  });
}

export async function getSavedUploadedPdf(): Promise<StoredPdfData | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(FILE_KEY);

      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.error("IndexedDB error reading PDF", e);
    return null;
  }
}

export async function deleteSavedUploadedPdf(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(FILE_KEY);

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}
