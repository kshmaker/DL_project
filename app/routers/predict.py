
# # from fastapi import APIRouter, UploadFile, File, HTTPException
# # from fastapi.responses import JSONResponse
# # import shutil, os, uuid

# # from ultralytics import YOLO
# # from app.routers.disease import get_summary_and_definition, get_management, get_severity, diseases

# # router = APIRouter()

# # MODEL_PATH = "app/model/best.pt"
# # OUTPUT_DIR = "app/static"

# # model = YOLO(MODEL_PATH)

# # # YOLO 클래스명 -> 실제 질병명 매핑
# # class_to_disease = {
# #     "A1": "구진/플라크",
# #     "A2": "비듬/각질/상피성 잔꼬리",
# #     "A3": "태선화/과다색소침착",
# #     "A4": "농포/여드름",
# #     "A5": "미란/궤양",
# #     "A6": "결정/종괴",
# # }

# # @router.post("/predict")
# # async def predict_image(file: UploadFile = File(...)):
    
# #     # 1. 이미지 저장
# #     if not file.content_type.startswith("image/"):
# #         raise HTTPException(status_code=400, detail="File is not an image.")
    
# #     img_id = str(uuid.uuid4())
# #     input_path = os.path.join(OUTPUT_DIR, f"{img_id}_input.png")
# #     os.makedirs(OUTPUT_DIR, exist_ok=True)
# #     with open(input_path, "wb") as buffer:
# #         shutil.copyfileobj(file.file, buffer)

# #     # 2. 모델 추론
# #     results = model.predict(
# #         source=input_path,
# #         save=True,
# #         save_dir=OUTPUT_DIR,
# #         imgsz=640,
# #         conf=0.25,
# #         max_det=3,
# #         show_conf=False,
# #         show_labels=False
# #     )


# #     # 3. 세그멘테이션 결과 이미지 경로 찾기 (저장된 최신 파일)
# #     # (ultralytics가 output 이미지를 같은 폴더에 저장)
# #     output_image_path = results[0].path  # 예: app/static/uuid_input.png

# #     # print(results[0].boxes.cls)


# #     # 4. 예측 질환명(클래스) 추출 (여러개일 경우, 첫 번째만 예시)
# #     if len(results[0].boxes.cls) == 0:
# #         disease_id = 0
# #         disease_name = "무증상 또는 질병 없음"
# #     else:
# #         pred_class = int(results[0].boxes.cls[0])
# #         disease_name = model.names[pred_class]
# #         disease_id = diseases.index(disease_name) + 1  # disease_id는 1-based

# #     # 5. 질환 상세 정보 가져오기
# #     if disease_id > 0:
# #         summary, definition = get_summary_and_definition(disease_name)
# #         management_common = (
# #             "긁거나 핥는 행동은 병변을 악화시키므로 주의 깊게 관찰해 주세요.\n"
# #             "정기적인 목욕과 보습, 그리고 스트레스 관리도 중요해요.\n"
# #             "피부 병변은 초기에 발견하고 관리하는 것이 치료 기간과 비용을 줄이는 지름길이에요."
# #         )
# #         management_detail = get_management(disease_name)
# #         severity = get_severity(disease_name)
# #     else:
# #         summary = definition = management_common = management_detail = severity = None

# #     # 6. 결과 반환
# #     return JSONResponse(content={
# #         "disease_id": disease_id,
# #         "disease": disease_name,
# #         "segmentation_image_url": f"/static/{os.path.basename(output_image_path)}",
# #         "summary": summary,
# #         "definition": definition,
# #         "management_common": management_common,
# #         "management_detail": management_detail,
# #         "severity": severity
# #     })


# # # yolo task=segment mode=predict model=runs/segment/train/weights/best.pt source=/home/DL/data/images/train/IMG_D_A6_204384.jpg imgsz=640 conf=0.25 save=true save_txt=false hide_labels=true hide_conf=true
# # # 김연우 inference.py 함수 돌려보는 코드

# from fastapi import APIRouter, UploadFile, File, HTTPException
# from fastapi.responses import JSONResponse
# import shutil, os, uuid

# from ultralytics import YOLO
# from app.routers.disease import get_summary_and_definition, get_management, get_severity, diseases

# router = APIRouter()

# MODEL_PATH = "app/model/best.pt"
# OUTPUT_DIR = "app/static"  # static 폴더로 변경해 이미지가 잘 노출되도록 수정

# model = YOLO(MODEL_PATH)

# # YOLO 클래스명 -> 실제 질병명 매핑
# class_to_disease = {
#     "A1": "구진/플라크",
#     "A2": "비듬/각질/상피성 잔꼬리",
#     "A3": "태선화/과다색소침착",
#     "A4": "농포/여드름",
#     "A5": "미란/궤양",
#     "A6": "결정/종괴",
# }

# @router.post("/predict")
# async def predict_image(file: UploadFile = File(...)):
    
#     # 1. 이미지 저장
#     if not file.content_type.startswith("image/"):
#         raise HTTPException(status_code=400, detail="File is not an image.")
#     img_id = str(uuid.uuid4())
#     input_path = os.path.join(OUTPUT_DIR, f"{img_id}_input.png")
#     os.makedirs(OUTPUT_DIR, exist_ok=True)
#     with open(input_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     # 2. 모델 추론
#     results = model.predict(
#         source=input_path,
#         save=True,
#         save_dir=OUTPUT_DIR,
#         imgsz=640,
#         conf=0.25,
#         max_det=3,
#         show_conf=False,
#         show_labels=False
#     )

#     # 3. 결과 이미지 경로
#     output_image_path = results[0].save_dir  # 예: app/static/uuid_input.png

#     # 4. 예측된 클래스명 변환
#     if len(results[0].boxes.cls) == 0:
#         disease_name = "무증상 또는 질병 없음"
#         disease_id = 0
#     else:
#         pred_class_idx = int(results[0].boxes.cls[0])
#         pred_class_name = model.names[pred_class_idx]  # 예: "A1"
#         disease_name = class_to_disease.get(pred_class_name, "무증상 또는 질병 없음")

#         if disease_name == "무증상 또는 질병 없음":
#             disease_id = 0
#         else:
#             try:
#                 disease_id = diseases.index(disease_name) + 1
#             except ValueError:
#                 disease_id = 0
#                 disease_name = "무증상 또는 질병 없음"

#     # 5. 상세정보 불러오기
#     if disease_id > 0:
#         summary, definition = get_summary_and_definition(disease_name)
#         management_common = (
#             "긁거나 핥는 행동은 병변을 악화시키므로 주의 깊게 관찰해 주세요.\n"
#             "정기적인 목욕과 보습, 그리고 스트레스 관리도 중요해요.\n"
#             "피부 병변은 초기에 발견하고 관리하는 것이 치료 기간과 비용을 줄이는 지름길이에요."
#         )
#         management_detail = get_management(disease_name)
#         severity = get_severity(disease_name)
#     else:
#         summary = definition = management_common = management_detail = severity = None

#     # 6. 결과 반환
#     return JSONResponse(content={
#         "disease_id": disease_id,
#         "disease": disease_name,
#         "segmentation_image_url": f"/static/{os.path.basename(output_image_path)}",
#         "summary": summary,
#         "definition": definition,
#         "management_common": management_common,
#         "management_detail": management_detail,
#         "severity": severity
#     })

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import shutil, os, uuid, glob

from ultralytics import YOLO
from app.routers.disease import get_summary_and_definition, get_management, get_severity, diseases

router = APIRouter()

MODEL_PATH = "app/model/best.pt"
OUTPUT_DIR = "app/static"  # static 폴더로 변경해 이미지가 노출되도록 지정

model = YOLO(MODEL_PATH)

# YOLO 클래스명 -> 실제 질병명 매핑
class_to_disease = {
    "A1": "구진/플라크",
    "A2": "비듬/각질/상피성 잔꼬리",
    "A3": "태선화/과다색소침착",
    "A4": "농포/여드름",
    "A5": "미란/궤양",
    "A6": "결정/종괴",
}

@router.post("/predict")
async def predict_image(file: UploadFile = File(...)):

    # 1. 이미지 저장
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File is not an image.")
    img_id = str(uuid.uuid4())
    input_path = os.path.join(OUTPUT_DIR, f"{img_id}_input.png")
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 2. 모델 추론
    results = model.predict(
        source=input_path,
        save=True,
        save_dir=OUTPUT_DIR,
        imgsz=640,
        conf=0.25,
        max_det=3,
        show_conf=False,
        show_labels=False
    )

    # 3. 결과 이미지 실제 경로 찾기 (glob 활용)
    # YOLO가 output_dir 내에 predictXYZ 같은 서브폴더를 만들 수 있으므로 탐색
    search_pattern = os.path.join(OUTPUT_DIR, "**", f"{img_id}*.png")
    found_images = glob.glob(search_pattern, recursive=True)

    if found_images:
        output_image_path = found_images[0]
    else:
        # fallback: 입력 이미지 경로 사용 (없으면 None 처리)
        output_image_path = input_path

    # 4. 예측된 클래스명 변환
    if len(results[0].boxes.cls) == 0:
        disease_name = "무증상 또는 질병 없음"
        disease_id = 0
    else:
        pred_class_idx = int(results[0].boxes.cls[0])
        pred_class_name = model.names[pred_class_idx]  # 예: "A1"
        disease_name = class_to_disease.get(pred_class_name, "무증상 또는 질병 없음")

        if disease_name == "무증상 또는 질병 없음":
            disease_id = 0
        else:
            try:
                disease_id = diseases.index(disease_name) + 1
            except ValueError:
                disease_id = 0
                disease_name = "무증상 또는 질병 없음"

    # 5. 상세정보 불러오기
    if disease_id > 0:
        summary, definition = get_summary_and_definition(disease_name)
        management_common = (
            "긁거나 핥는 행동은 병변을 악화시키므로 주의 깊게 관찰해 주세요.\n"
            "정기적인 목욕과 보습, 그리고 스트레스 관리도 중요해요.\n"
            "피부 병변은 초기에 발견하고 관리하는 것이 치료 기간과 비용을 줄이는 지름길이에요."
        )
        management_detail = get_management(disease_name)
        severity = get_severity(disease_name)
    else:
        summary = definition = management_common = management_detail = severity = None

    # 6. 결과 이미지 경로를 app/static 폴더 기준 상대 경로로 변환
    relative_path = os.path.relpath(output_image_path, OUTPUT_DIR).replace(os.sep, "/")

    # 7. 결과 반환
    return JSONResponse(content={
        "disease_id": disease_id,
        "disease": disease_name,
        "segmentation_image_url": f"/static/{relative_path}",
        "summary": summary,
        "definition": definition,
        "management_common": management_common,
        "management_detail": management_detail,
        "severity": severity
    })
