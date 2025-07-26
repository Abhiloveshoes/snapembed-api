from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from api.convert import process_image
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()


app.mount("/static", StaticFiles(directory="static"), name="static")

@app.post("/generate")
async def generate_embed(file: UploadFile = File(...)):
    contents = await file.read()
    result = process_image(contents, file.filename)
    return JSONResponse(content=result)
