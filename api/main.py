from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from scraper import get_mcx_price, get_lme_settlements
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/mcx-price")
async def mcx_price():
    try:
        price_data = get_mcx_price()
        if price_data:
            return price_data
        raise HTTPException(status_code=500, detail="Failed to fetch price data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/lme-settlements")
async def lme_settlements():
    try:
        settlements = get_lme_settlements()
        if settlements:
            return settlements
        raise HTTPException(status_code=500, detail="Failed to fetch LME settlements")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
