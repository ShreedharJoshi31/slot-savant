import os
import cv2
import numpy as np
import json
import imutils
import easyocr
import re
import pickle
from collections import Counter
from skimage.transform import resize

# Constants
EMPTY = True
NOT_EMPTY = False
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MASK_PATH = os.path.join(SCRIPT_DIR, 'crop_test_mask.png')
IMAGE_PATH = os.path.join(os.path.dirname(os.path.dirname(SCRIPT_DIR)), 'data', 'parkinglot', 'result.png')
EMPTY_IMAGE_PATH = os.path.join(os.path.dirname(os.path.dirname(SCRIPT_DIR)), 'data', 'parkinglot', '14 slots.png')
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(SCRIPT_DIR)), 'models', 'model.p')
MODEL = pickle.load(open(MODEL_PATH, "rb"))


# Load the image and mask
def exit_car(index):
    index = index - 1
    img = cv2.imread(IMAGE_PATH)
    mask = cv2.imread('crop_test_mask.png', cv2.IMREAD_GRAYSCALE)
    empty_parking_lot_img = cv2.imread(EMPTY_IMAGE_PATH)

    # Find contours in the mask
    contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    # Sort contours from left to right and top to bottom
    # Split contours into left and right sides
    left_contours = [c for c in contours if cv2.boundingRect(c)[0] < img.shape[1] // 2]
    right_contours = [c for c in contours if cv2.boundingRect(c)[0] >= img.shape[1] // 2]

    # Sort contours on the left side from top to bottom
    left_contours_sorted = sorted(left_contours, key=lambda c: cv2.boundingRect(c)[1])

    # Sort contours on the right side from top to bottom
    right_contours_sorted = sorted(right_contours, key=lambda c: cv2.boundingRect(c)[1])

    # Combine the sorted contours
    contours_sorted = left_contours_sorted + right_contours_sorted

    # Select the desired parking spot contour
    parking_spot_contour = contours_sorted[index]

    # Get the bounding rectangle of the parking spot contour
    x, y, w, h = cv2.boundingRect(parking_spot_contour)

    # Extract the region of interest (ROI) from the empty parking lot image
    roi = empty_parking_lot_img[y:y+h, x:x+w]

    # Remove the car from the parking spot by replacing it with the ROI
    result = img.copy()
    result[y:y+h, x:x+w] = roi

    # Save the resulting image
    cv2.imwrite(IMAGE_PATH, result)


# Load the image and mask
def entry(index):
    index = index - 1
    img = cv2.imread(IMAGE_PATH)
    mask = cv2.imread('crop_test_mask.png', cv2.IMREAD_GRAYSCALE)

    # Find contours in the mask
    contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    # Split contours into left and right sides
    left_contours = [c for c in contours if cv2.boundingRect(c)[0] < img.shape[1] // 2]
    right_contours = [c for c in contours if cv2.boundingRect(c)[0] >= img.shape[1] // 2]

    # Sort contours on the left side from top to bottom
    left_contours_sorted = sorted(left_contours, key=lambda c: cv2.boundingRect(c)[1])

    # Sort contours on the right side from top to bottom
    right_contours_sorted = sorted(right_contours, key=lambda c: cv2.boundingRect(c)[1])

    # Combine the sorted contours
    contours_sorted = left_contours_sorted + right_contours_sorted

    # Load the car image
    car_img = cv2.imread('car-top-view.png')

    # Select the desired parking spot contour
    parking_spot_contour = contours_sorted[index]

    # Get the bounding rectangle of the parking spot contour
    x, y, w, h = cv2.boundingRect(parking_spot_contour)

    # Resize the car image to fit the parking spot
    car_img_resized = cv2.resize(car_img, (w, h))

    # Add the car image to the parking spot
    result = img.copy()
    result[y:y+h, x:x+w] = cv2.addWeighted(result[y:y+h, x:x+w], 0.5, car_img_resized, 0.5, 0)

    cv2.imwrite(IMAGE_PATH, result)


def detect_most_common_text():
    # Load the EasyOCR reader
    reader = easyocr.Reader(['en'])

    # Create a VideoCapture object
    cap = cv2.VideoCapture(0)
    results = []

    while True:
        # Capture frame-by-frame
        ret, frame = cap.read()

        if not ret:
            break

        # 1. Read in Image, Grayscale and Blur
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # 2. Apply filter and find edges for localization
        bfilter = cv2.bilateralFilter(gray, 11, 17, 17)  # Noise reduction
        edged = cv2.Canny(bfilter, 30, 200)  # Edge detection

        # 3. Find Contours and Apply Mask
        keypoints = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        contours = imutils.grab_contours(keypoints)
        contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]
        location = None
        for contour in contours:
            approx = cv2.approxPolyDP(contour, 10, True)
            if len(approx) == 4:
                location = approx
                break

        if location is not None:
            mask = np.zeros(gray.shape, np.uint8)
            new_image = cv2.drawContours(mask, [location], 0, 255, -1)
            new_image = cv2.bitwise_and(frame, frame, mask=mask)

            (x, y) = np.where(mask == 255)
            (x1, y1) = (np.min(x), np.min(y))
            (x2, y2) = (np.max(x), np.max(y))
            cropped_image = gray[x1:x2 + 1, y1:y2 + 1]

            cropped_image = cv2.cvtColor(cropped_image, cv2.COLOR_BGR2RGB)
            # plt.imshow(cropped_image)  # Remove or comment out this line if running headless

            # 4. Use Easy OCR To Read Text
            result = reader.readtext(cropped_image)
            if result:
                text = result[0][-2]
                text = re.sub(r'[^A-Z0-9]', '', text)
                print(text)
                results.append(text)
                if len(results) == 25:
                    break

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    if results:
        most_common_text = Counter(results).most_common(1)[0][0]
        print(most_common_text)
        return most_common_text
    return None

def empty_or_not(spot_bgr):
    flat_data = []
    img_resized = resize(spot_bgr, (15, 15, 3))
    flat_data.append(img_resized.flatten())
    flat_data = np.array(flat_data)
    y_output = MODEL.predict(flat_data)
    if y_output == 0:
        return EMPTY
    else:
        return NOT_EMPTY

def get_parking_spots_bboxes(connected_components):
    (totalLabels, label_ids, values, centroids) = connected_components

    slots = []
    coef = 1
    
    for i in range(1, totalLabels):
        # Extract the centroid points
        cX = int(centroids[i, 0] * coef)
        cY = int(centroids[i, 1] * coef)

        # Extract the coordinate points
        x1 = int(values[i, cv2.CC_STAT_LEFT] * coef)
        y1 = int(values[i, cv2.CC_STAT_TOP] * coef)
        w = int(values[i, cv2.CC_STAT_WIDTH] * coef)
        h = int(values[i, cv2.CC_STAT_HEIGHT] * coef)

        slots.append([cX, cY, x1, y1, w, h])

    return slots


def process_parking_image(image_path):
    mask_path = 'crop_test_mask.png'
    # Read the mask image
    mask = cv2.imread(MASK_PATH, 0)

    # Read the parking image
    image = cv2.imread(image_path)

    # Get connected components from the mask
    connected_components = cv2.connectedComponentsWithStats(mask, 4, cv2.CV_32S)

    # Get bounding boxes for parking spots
    spots = get_parking_spots_bboxes(connected_components)

    # Sort spots based on their centroids (x, y) coordinates to ensure column-first traversal
    spots = sorted(spots, key=lambda spot: (spot[0], spot[1]))

    # Initialize spot status list and spots info list
    spots_status = [None for _ in spots]
    empty_spots = []

    # Process the image
    for spot_indx, spot in enumerate(spots):
        cX, cY, x1, y1, w, h = spot

        # Crop the parking spot from the image
        spot_crop = image[y1:y1 + h, x1:x1 + w, :]

        # Determine if the spot is empty or not
        spot_status = empty_or_not(spot_crop)

        # Update the status list
        spots_status[spot_indx] = spot_status

        # If the spot is empty, add to empty_spots list
        if spot_status:
            empty_spots.append(spot_indx + 1)

    return empty_spots, len(spots)



