import cv2
import numpy as np
import os

def extract_greenery(img_path, out_path):
    img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
    if img.shape[2] == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

    # Convert to HSV for better color segmentation
    hsv = cv2.cvtColor(cv2.cvtColor(img, cv2.COLOR_BGRA2BGR), cv2.COLOR_BGR2HSV)

    # Define range for green color
    # These values might need adjustment
    lower_green = np.array([35, 20, 20])
    upper_green = np.array([85, 255, 255])

    mask = cv2.inRange(hsv, lower_green, upper_green)
    
    # Remove flowers by looking for non-green areas? 
    # Actually, the greenery in the mockup is quite distinct.
    
    # Let's just try to find the largest green clusters at the bottom/sides
    # Or just save the whole mask as alpha
    
    img[:, :, 3] = mask
    
    # Crop to content
    coords = cv2.findNonZero(mask)
    if coords is not None:
        x, y, w, h = cv2.boundingRect(coords)
        img = img[y:y+h, x:x+w]

    cv2.imwrite(out_path, img, [cv2.IMWRITE_WEBP_QUALITY, 100])

def extract_babys_breath(img_path, out_path):
    img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
    if img.shape[2] == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

    # Convert to HSV for better color segmentation
    hsv = cv2.cvtColor(cv2.cvtColor(img, cv2.COLOR_BGRA2BGR), cv2.COLOR_BGR2HSV)

    # Define range for white/very light colors
    lower_white = np.array([0, 0, 200])
    upper_white = np.array([180, 50, 255])

    mask = cv2.inRange(hsv, lower_white, upper_white)
    
    # Clean up mask
    kernel = np.ones((3,3), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)

    img[:, :, 3] = mask
    
    # Crop to content
    coords = cv2.findNonZero(mask)
    if coords is not None:
        x, y, w, h = cv2.boundingRect(coords)
        img = img[y:y+h, x:x+w]

    cv2.imwrite(out_path, img, [cv2.IMWRITE_WEBP_QUALITY, 100])

if __name__ == '__main__':
    # Image 5 has lots of white Baby's Breath
    extract_babys_breath('/Users/nithinreddymalluri/.gemini/antigravity/brain/96d9a2cf-2c35-46da-9045-ee511bd50bbc/media__1778456913769.png', 
                     '/Users/nithinreddymalluri/Documents/DigiBouquet/public/assets/deco_white.webp')

