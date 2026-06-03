from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_login_and_refresh():
    r = client.post("/api/v1/auth/login", json={"username": "KS20250001", "password": "123456"})
    assert r.status_code == 200
    data = r.json()
    assert "accessToken" in data
    r2 = client.post("/api/v1/auth/refresh", json={"refreshToken": data["refreshToken"]})
    assert r2.status_code == 200
    assert "accessToken" in r2.json()


def test_products_list():
    r = client.get("/api/v1/products")
    assert r.status_code == 200
    assert isinstance(r.json(), list)
