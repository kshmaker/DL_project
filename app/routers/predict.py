from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
import os

router = APIRouter()

mapping = {
    "input1": {"disease": "구진/플라크", "image": "output1.png"},
    "input2": {"disease": "비듬/각질/상피성 잔고리", "image": "output2.png"},
    "input3": {"disease": "태선화/과다색소침착", "image": "output3.png"},
    "input4": {"disease": "농포/여드름", "image": "output4.png"},
    "input5": {"disease": "미란/궤양", "image": "output5.png"},
    "input6": {"disease": "결정/종괴", "image": "output6.png"},
    "input7": {"disease": "무증상 또는 질병 없음", "image": None},
}
@router.post("/predict")
async def predict_fake(
    input_id: str = Form(...),
    file: UploadFile = File(...)
):
    input_id_lower = input_id.lower()
    print(f"Received input_id: {input_id} (normalized: {input_id_lower})")
    print(f"Received file: {file.filename}")

    # 소문자 매칭
    if input_id_lower not in mapping:
        raise HTTPException(status_code=400, detail="Invalid input_id")

    data = mapping[input_id_lower]
    response = {"disease": data["disease"]}

    if data["image"]:
        image_path = os.path.join("app/static", data["image"])
        if not os.path.exists(image_path):
            raise HTTPException(status_code=500, detail="Segmentation image not found")
        response["segmentation_image_url"] = f"/static/{data['image']}"
    else:
        response["segmentation_image_url"] = None

    return JSONResponse(content=response)

