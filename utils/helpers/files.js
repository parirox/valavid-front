export const isFileImage = (file) => {
  if (file) {
    if (file["type"]) {
      return file["type"].split("/")[0] === "image";
    } else {
      return(file.match(/\.(jpeg|jpg|gif|png)$/))
    }
  }
};

export const isFileVideo = (file) => {
  if (file) {
    if (file["type"]) {
      return file["type"].split("/")[0] === "video";
    } else {
      return(file.match(/\.(mp4|3gp|ogg)$/))
    }
  }
};

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
