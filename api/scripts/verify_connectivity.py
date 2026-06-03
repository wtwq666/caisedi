"""联调自检：需先启动 uvicorn（端口 8100）并完成 seed + sync_public_assets。"""

from __future__ import annotations

import json
import sys
import urllib.error
import urllib.parse
import urllib.request

BASE = "http://localhost:8100"

# seed 中已知资源，用于 HEAD 抽检
SAMPLE_ASSETS = [
    "stores/conghua-jinhui-2026/01-storefront.jpg",
    "training/2026年门店制度手册PDF.pdf",
]


def get(path: str, headers: dict | None = None) -> tuple[int, object]:
    req = urllib.request.Request(f"{BASE}{path}", headers=headers or {})
    with urllib.request.urlopen(req, timeout=10) as res:
        body = res.read()
        if not body:
            return res.status, None
        return res.status, json.loads(body.decode())


def post(path: str, body: dict) -> tuple[int, object]:
    data = json.dumps(body).encode()
    req = urllib.request.Request(
        f"{BASE}{path}",
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=10) as res:
        return res.status, json.loads(res.read().decode())


def head(path: str) -> int:
    req = urllib.request.Request(f"{BASE}{path}", method="HEAD")
    try:
        with urllib.request.urlopen(req, timeout=10) as res:
            return res.status
    except urllib.error.HTTPError as e:
        return e.code


def main() -> int:
    errors: list[str] = []
    token = ""
    try:
        status, health = get("/health")
        if status != 200 or not health or health.get("status") != "ok":
            errors.append(f"health unexpected: {health}")
        else:
            print("OK  /health")

        status, products = get("/api/v1/products")
        if status != 200 or not isinstance(products, list) or len(products) < 1:
            errors.append("products empty or failed")
        else:
            print(f"OK  /api/v1/products ({len(products)} items)")

        status, login = post("/api/v1/auth/login", {"username": "KS20250001", "password": "123456"})
        if status != 200 or not isinstance(login, dict) or "accessToken" not in login:
            errors.append(f"login failed: {login}")
        else:
            token = login["accessToken"]
            print(f"OK  /api/v1/auth/login -> {login['user']['name']}")

        auth_h = {"Authorization": f"Bearer {token}"}
        status, refresh = post("/api/v1/auth/refresh", {"refreshToken": login["refreshToken"]})
        if status != 200 or "accessToken" not in refresh:
            errors.append("refresh failed")
        else:
            print("OK  /api/v1/auth/refresh")

        status, _ = get("/api/v1/auth/me", auth_h)
        if status != 200:
            errors.append("auth/me failed")
        else:
            print("OK  /api/v1/auth/me")

        for path in ["/api/v1/documents?tab=management", "/api/v1/store-albums", "/api/v1/news/read-status"]:
            status, data = get(path, auth_h)
            if status != 200:
                errors.append(f"{path} -> {status}")
            else:
                n = len(data) if isinstance(data, list) else "ok"
                print(f"OK  {path} ({n})")

        status, search = get("/api/v1/search?q=" + urllib.parse.quote("棉"))
        if status != 200:
            errors.append("search failed")
        else:
            print(f"OK  /api/v1/search ({len(search)} hits)")

        for key in SAMPLE_ASSETS:
            encoded = "/".join(urllib.parse.quote(p, safe="") for p in key.split("/"))
            code = head(f"/assets/{encoded}")
            if code != 200:
                errors.append(f"HEAD /assets/{key} -> {code} (run sync_public_assets?)")
            else:
                print(f"OK  HEAD /assets/{key}")

    except urllib.error.URLError as e:
        errors.append(f"cannot reach API at {BASE}: {e}")
    except Exception as e:
        errors.append(str(e))

    if errors:
        for msg in errors:
            print("FAIL", msg, file=sys.stderr)
        return 1
    print("\n前后端 API 连通正常。前端请确保 app/.env 中 VITE_USE_MOCK=false 并重启 npm run dev。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
