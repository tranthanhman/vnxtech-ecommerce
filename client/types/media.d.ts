export interface Media {
  id: number;
  url: string;
  type: string; // image, video, document
  mimeType: string; // image/png, video/mp4, etc.
  size: number; // in bytes
  altText?: string;
  title?: string;
  isPrimary?: boolean;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}