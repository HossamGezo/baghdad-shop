export const getOptimizedImageUrl = (url: string | undefined, width: number = 600): string => {
  if (!url) return "";

  if (url.includes("cloudinary.com")) {
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }

  return url;
};
