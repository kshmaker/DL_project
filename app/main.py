from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routers import predict, disease

app = FastAPI()

# CORS: 프론트엔드(React)에서 접근 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 시 모두 허용, 운영 시 도메인 지정 권장
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(predict.router)
app.include_router(disease.router)

# static 경로 설정: segmentation 이미지 제공
app.mount("/static", StaticFiles(directory="app/static"), name="static")
