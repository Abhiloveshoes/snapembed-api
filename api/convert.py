from PIL import Image
from io import BytesIO
import os
import uuid

def process_image(content, filename):
      # Ensure the static directory exists
    static_dir = "static"
    os.makedirs(static_dir, exist_ok=True)

    # Generate unique filename
    unique_id = str(uuid.uuid4())
    base_name = filename.replace(" ", "_")  # sanitize filename
    output_filename = f"{unique_id}_{base_name}"
    path = os.path.join(static_dir, output_filename)

    # Save image
    img = Image.open(BytesIO(content))
    img.save(path)

    # Return embed code + URL
    embed_code = f'<img src="url": f"http://127.0.0.1:8000/static/{output_filename}", alt="{base_name}">'
    return {
        "url": f"http://127.0.0.1:8000/static/{output_filename}",
        "embed_code": embed_code
    }