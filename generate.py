import json
import cv2

dots = []

img = cv2.imread('world.png')

# loop trough all pixels in image
for i in range(img.shape[0]):
    for j in range(img.shape[1]):
        px = img[i, j]
        if px[0] == 255 and px[1] == 255 and px[2] == 255:
            dots.append({
                'water': False,
                "generations": []
            })
        else:
            dots.append({
                'water': True,
                "generations": []
            })

with open('dots.json', 'w') as f:
        f.write(json.dumps(dots, indent=2))