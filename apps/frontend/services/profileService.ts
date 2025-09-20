import axiosClient from './axiosClient';

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  avatar?: string;
}

export interface UpdateProfileData {
  username?: string;
}

export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Get user profile
export const getProfile = async (): Promise<UserProfile> => {
  try {
    const response = await axiosClient.get('/auth/profile');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};

// Update user profile
export const updateProfile = async (data: UpdateProfileData): Promise<UserProfile> => {
  try {
    const response = await axiosClient.patch('/auth/profile', data);
    return response.data;
  } catch (error: any) {
    console.error('Error updating profile:', error);
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};

// Update password
export const updatePassword = async (data: UpdatePasswordData): Promise<void> => {
  try {
    await axiosClient.patch('/auth/change-password', {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  } catch (error: any) {
    console.error('Error updating password:', error);
    throw new Error(error.response?.data?.message || 'Failed to update password');
  }
};

// Upload avatar to Cloudinary
export const uploadAvatar = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await axiosClient.post('/auth/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.avatarUrl;
  } catch (error: any) {
    console.error('Error uploading avatar:', error);
    throw new Error(error.response?.data?.message || 'Failed to upload avatar');
  }
};