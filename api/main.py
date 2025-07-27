from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.responses import JSONResponse, PlainTextResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware
from slowapi.errors import RateLimitExceeded
import os
import uuid

# ------------------- CONFIG -------------------

BASE_URL = os.getenv("BASE_URL", "https://snapembed.onrender.com")
UPLOAD_DIR = "static"
os.makedirs(UPLOAD_DIR, exist_ok=True)

MAX_FILE_SIZE_MB = 2
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}

# ------------------- INIT APP -------------------

app = FastAPI()
@app.get("/ping")
async def ping():
    return {"status": "awake"}


# ------------------- MIDDLEWARE -------------------

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict if needed
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

@app.exception_handler(RateLimitExceeded)
def rate_limit_handler(request, exc):
    return PlainTextResponse("Rate limit exceeded", status_code=429)

@app.post("/generate")
@limiter.limit("20/minute")  # ✅ RATE LIMIT ACTIVE
async def generate_embed(request: Request, file: UploadFile = File(...)):
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
