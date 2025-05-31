from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
import pandas as pd

router = APIRouter()

EXCEL_PATH = "app/data/disease.xlsx"
xls = pd.ExcelFile(EXCEL_PATH)

info1_df = xls.parse('info1', header=None)
method_df = xls.parse('method', header=None)
severity_df = xls.parse('severity', header=None)

diseases = [
    "구진/플라크",
    "비듬/각질/상피성 잔꼬리",
    "태선화/과다색소침착",
    "농포/여드름",
    "미란/궤양",
    "결정/종괴",
]

def get_summary_and_definition(disease_name: str):
    idx = diseases.index(disease_name)
    summary = info1_df.iloc[idx+1, 1]
    definition = info1_df.iloc[idx+1, 2]
    return summary, definition

def get_management(disease_name: str):
    idx = diseases.index(disease_name)
    col = idx + 1
    steps = method_df.iloc[1:5, col].dropna().tolist()
    return steps

def get_severity(disease_name: str):
    idx = diseases.index(disease_name)
    col = idx + 1
    severity = {
        "경증": severity_df.iloc[1, col],
        "중등도": severity_df.iloc[2, col],
        "중증": severity_df.iloc[3, col],
    }
    return severity

@router.get("/disease/{disease_id}")
async def disease_detail(disease_id: int):
    if disease_id < 1 or disease_id > len(diseases):
        raise HTTPException(status_code=404, detail="Disease ID out of range")
    disease_name = diseases[disease_id - 1]

    summary, definition = get_summary_and_definition(disease_name)
    management_common = (
        "긁거나 핥는 행동은 병변을 악화시키므로 주의 깊게 관찰해 주세요.\n"
        "정기적인 목욕과 보습, 그리고 스트레스 관리도 중요해요.\n"
        "피부 병변은 초기에 발견하고 관리하는 것이 치료 기간과 비용을 줄이는 지름길이에요."
    )
    management_detail = get_management(disease_name)
    severity = get_severity(disease_name)

    return JSONResponse(content={
        "id": disease_id,
        "name": disease_name,
        "summary": summary,
        "definition": definition,
        "management_common": management_common,
        "management_detail": management_detail,
        "severity": severity,
    })
