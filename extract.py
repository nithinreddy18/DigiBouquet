import cv2
import numpy as np
import os
from PIL import Image

def process_image(img_path, out_dir):
    # Read the image
    img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
    if img.shape[2] == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # The background is off-white. Thresholding to find objects.
    # Inverse threshold: background (bright) becomes black (0), objects (darker) become white (255)
    _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)

    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Filter small contours
    valid_contours = []
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
        if w > 50 and h > 50: # Assume flower is at least 50x50 pixels
            valid_contours.append((x, y, w, h, cnt))

    # Sort contours by y first (rows), then by x (columns)
    # To sort into rows, we can cluster by y coordinate
    valid_contours.sort(key=lambda b: b[1])
    
    rows = []
    current_row = []
    last_y = valid_contours[0][1]
    
    for bbox in valid_contours:
        x, y, w, h, cnt = bbox
        if abs(y - last_y) > 100: # New row if y diff > 100
            current_row.sort(key=lambda b: b[0]) # Sort row by x
            rows.append(current_row)
            current_row = [bbox]
        else:
            current_row.append(bbox)
        last_y = y
    
    if current_row:
        current_row.sort(key=lambda b: b[0])
        rows.append(current_row)

    # Flatten the list of sorted rows
    sorted_bboxes = []
    for row in rows:
        sorted_bboxes.extend(row)

    # Mapping based on visual inspection
    names = [
        "orchid", "tulip", "carnation", "anemone",
        "dahlia", "zinnia", "ranunculus",
        "sunflower", "lily", "daisy", "peony",
        "rose"
    ]
    
    if not os.path.exists(out_dir):
        os.makedirs(out_dir)

    for i, bbox in enumerate(sorted_bboxes):
        if i >= len(names):
            break
        x, y, w, h, cnt = bbox
        
        # Create a mask for this specific contour
        mask = np.zeros(img.shape[:2], dtype=np.uint8)
        cv2.drawContours(mask, [cnt], -1, 255, -1)
        
        # Add some padding
        padding = 10
        x1 = max(0, x - padding)
        y1 = max(0, y - padding)
        x2 = min(img.shape[1], x + w + padding)
        y2 = min(img.shape[0], y + h + padding)
        
        # Crop the image and mask
        flower_img = img[y1:y2, x1:x2].copy()
        flower_mask = mask[y1:y2, x1:x2]
        
        # Create an alpha channel where the mask is 0
        b, g, r, a = cv2.split(flower_img)
        # Background is close to white, let's make pixels outside the contour fully transparent
        # and pixels close to white fully transparent
        
        # Find pixels outside contour
        a[flower_mask == 0] = 0
        
        # Merge back
        final_img = cv2.merge([b, g, r, a])
        
        # Save as PNG
        out_path = os.path.join(out_dir, f"{names[i]}.webp")
        # Save as webp
        cv2.imwrite(out_path, final_img, [cv2.IMWRITE_WEBP_QUALITY, 100])
        print(f"Saved {names[i]}.webp")

if __name__ == '__main__':
    img_path = '/Users/nithinreddymalluri/.gemini/antigravity/brain/96d9a2cf-2c35-46da-9045-ee511bd50bbc/media__1778456008889.png'
    out_dir = '/Users/nithinreddymalluri/Documents/DigiBouquet/public/assets'
    process_image(img_path, out_dir)
