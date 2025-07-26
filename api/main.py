from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from api.convert import process_image
from fastapi.staticfiles import StaticFiles
import os
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to ["https://snapembed.vercel.app"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.mount("/static", StaticFiles(directory="static"), name="static")

@app.post("/generate")
async def generate_embed(file: UploadFile = File(...)):
    contents = await file.read()
    result = process_image(contents, file.filename)
    return JSONResponse(content=result)
