/** Only local images and Cloudinary HTTPS image-upload URLs are accepted. */
export function isImageUrl(value: string): boolean {
  if (!value || /[\s\\\u0000-\u001f]/.test(value)) return false;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "res.cloudinary.com" &&
      !url.port &&
      !url.username &&
      !url.password &&
      /^\/[a-zA-Z0-9_-]+\/image\/upload\/.+/.test(url.pathname) &&
      !url.search &&
      !url.hash
    );
  } catch {
    return false;
  }
}
