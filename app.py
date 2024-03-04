from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from PIL import Image
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = '/Users/arsenykonovalov/programming_itmo/csa/flaskProject/pic/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


class ImageUpload:
    @staticmethod
    def handle_upload():
        try:
            file = request.files['customFile']
            rotation_angle = int(request.form.get('rotation_angle', 0))
            image = Image.open(file)

            # Rotate the image
            rotated_image = image.rotate(rotation_angle, expand=True)

            # Save the rotated image
            rotated_image_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            rotated_image.save(rotated_image_path)

            # Construct the URL for the rotated image
            rotated_image_url = request.url_root + 'uploads/' + file.filename

            return jsonify({"message": "Upload successful", "image_url": rotated_image_url})
        except Exception as e:
            return jsonify({"error": str(e)})

@app.route('/upload_image', methods=['POST'])
def upload_image():
    return ImageUpload.handle_upload()

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)
