import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

function getPublicIdFromUrl(url) {
    // Extract the part of the URL after the base Cloudinary path
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    
    // If 'upload' is not found in the URL, return null
    if (uploadIndex === -1) {
      return null;
    }
    
    // Get everything after 'upload' and join it back into a string
    const pathAfterUpload = parts.slice(uploadIndex + 1).join('/');
    
    // Remove the version segment if present
    const versionPattern = /^v\d+\/(.+)/;
    const pathWithoutVersion = pathAfterUpload.match(versionPattern)
      ? pathAfterUpload.replace(versionPattern, '$1')
      : pathAfterUpload;
    
    // Remove the file extension
    const publicId = pathWithoutVersion.replace(/\.[^/.]+$/, '');
    
    return publicId;
  }
  

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) 
        return null;
    }
}

const deleteOnCloudinary = async (public_url) => {
    const public_id = getPublicIdFromUrl(public_url);
    try {
        if (!public_id) return null
        const response = await cloudinary.uploader.destroy(public_id)
        return response;
    } catch (error) {
        return null;
    }
};



export {uploadOnCloudinary, deleteOnCloudinary};