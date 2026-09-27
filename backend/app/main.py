from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.websockets.manager import manager
import json

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="High-Concurrency Real-Time Backend for Three Kingdoms Xiangqi"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "active_rooms": len(manager.active_rooms)
    }

@app.websocket("/ws/match/{room_id}")
async def websocket_match_endpoint(websocket: WebSocket, room_id: str, user_id: str = "guest", color: str = "red"):
    await manager.connect(websocket, room_id, user_id, color)
    try:
        # Notify opponent that player joined
        await manager.broadcast_to_room(
            room_id,
            {"type": "player_joined", "user_id": user_id, "color": color},
            exclude=websocket
        )

        while True:
            data = await websocket.receive_text()
            message = json.loads(data)

            msg_type = message.get("type")
            if msg_type == "move":
                # Broadcast move to room opponent with ultra-low latency (<20ms)
                await manager.broadcast_to_room(room_id, message, exclude=websocket)
            elif msg_type == "emote":
                await manager.broadcast_to_room(room_id, message, exclude=websocket)
            elif msg_type == "resign":
                await manager.broadcast_to_room(room_id, message)
            elif msg_type == "ping":
                await websocket.send_text(json.dumps({"type": "pong"}))

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast_to_room(
            room_id,
            {"type": "player_disconnected", "user_id": user_id, "color": color}
        )
