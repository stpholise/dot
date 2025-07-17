export const blobToFile = (
    blob: Blob,
    filename: string,
    lastModified: number = Date.now()
  ): File => {
    return new File([blob], filename, { type: blob.type, lastModified });
  };