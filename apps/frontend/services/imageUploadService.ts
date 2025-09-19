// Remove server-side cloudinary import to avoid 'fs' module issues in browser
// import { v2 as cloudinary } from 'cloudinary';

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

/**
 * Convert File to base64 string
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

/**
 * Get signature from backend for signed upload
 */
const getSignature = async (folder: string): Promise<{
  signature: string;
  timestamp: number;
  api_key: string;
  folder: string;
}> => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  const response = await fetch(`${apiBaseUrl}/cloudinary/signature`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ folder }),
  });

  if (!response.ok) {
    throw new Error('Failed to get signature from backend');
  }

  return response.json();
};

/**
 * Client-side upload using Cloudinary's signed upload
 * This is more secure and recommended for production
 */
export const uploadImageClientSide = async (
  file: File,
  folder: string = 'recipe'
): Promise<string> => {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    console.log('Cloudinary Config:', { cloudName, folder });

    if (!cloudName) {
      console.warn('Cloudinary cloud name not configured, using placeholder image');
      return `https://picsum.photos/400/250?random=${Date.now()}`;
    }

    // Get signature from backend
    const signatureData = await getSignature(folder);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', signatureData.api_key);
    formData.append('timestamp', signatureData.timestamp.toString());
    formData.append('signature', signatureData.signature);
    formData.append('folder', signatureData.folder);

    console.log('Uploading to Cloudinary with signed upload:', {
      file: file.name,
      size: file.size,
      type: file.type,
      folder: signatureData.folder,
      timestamp: signatureData.timestamp
    });

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    console.log('Cloudinary response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudinary error response:', errorText);
      throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
    }

    const result: CloudinaryUploadResult = await response.json();
    console.log('Cloudinary upload successful:', result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    console.warn('Using placeholder image instead');
    // Fallback to placeholder image
    return `https://picsum.photos/400/250?random=${Date.now()}`;
  }
};

// Main export - use client-side upload for frontend
export const uploadImageToCloudinary = uploadImageClientSide;