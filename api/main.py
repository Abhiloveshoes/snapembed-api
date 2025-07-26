from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
import uuid
from fastapi import HTTPException
# ------------------- CONFIG -------------------

BASE_URL = os.getenv("BASE_URL", "https://snapembed.onrender.com")  # Change if deploying elsewhere
UPLOAD_DIR = "static"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ------------------- INIT APP -------------------

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict to ["https://snapembed.vercel.app"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=UPLOAD_DIR), name="static")

# ------------------- UTILS -------------------

def save_uploaded_file(file_data: bytes, filename: str) -> str:
    ext = os.path.splitext(filename)[1]
    unique_name = f"{uuid.uuid4()}{ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_name)
    with open(file_path, "wb") as f:
        f.write(file_data)
    return unique_name

# ------------------- ROUTES -------------------

@app.post("/generate")
async def generate_embed(file: UploadFile = File(...)):
    contents = await file.read()
    saved_filename = save_uploaded_file(contents, file.filename)
    public_url = f"{BASE_URL}/static/{saved_filename}"
    
    embed_code = f'<img src="{public_url}" style="max-width: 100%;" alt="SnapEmbed" />'
    
    return JSONResponse(content={
        "image_url": public_url,
        "embed_code": embed_code,
    })

#-------------------- limits check for api-------------------


MAX_FILE_SIZE_MB = 2
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}

@app.post("/generate")
async def generate_embed(file: UploadFile = File(...)):
    contents = await file.read()

    # Size check
    if len(contents) > MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File too large. Max 2MB allowed.")

    # Extension check
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Unsupported file type.")

    saved_filename = save_uploaded_file(contents, file.filename)
    public_url = f"{BASE_URL}/static/{saved_filename}"
    
    embed_code = f'<img src="{public_url}" style="max-width: 100%;" alt="SnapEmbed" />'
    
    return JSONResponse(content={
        "image_url": public_url,
        "embed_code": embed_code,
    })
