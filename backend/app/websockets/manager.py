import json
import logging
from typing import Dict, List, Optional
from fastapi import WebSocket

logger = logging.getLogger("kyvuong_ws")

class ConnectionManager:
    def __init__(self):
        # room_id -> list of WebSockets
        self.active_rooms: Dict[str, List[WebSocket]] = {}
        # websocket -> metadata (user_id, player_color, room_id)
        self.client_meta: Dict[WebSocket, dict] = {}

    async def connect(self, websocket: WebSocket, room_id: str, user_id: str, color: str):
        await websocket.accept()
        if room_id not in self.active_rooms:
            self.active_rooms[room_id] = []
        self.active_rooms[room_id].append(websocket)
        self.client_meta[websocket] = {
            "room_id": room_id,
            "user_id": user_id,
            "color": color
        }
        logger.info(f"User {user_id} ({color}) connected to room {room_id}")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.client_meta:
            meta = self.client_meta[websocket]
            room_id = meta["room_id"]
            if room_id in self.active_rooms and websocket in self.active_rooms[room_id]:
                self.active_rooms[room_id].remove(websocket)
                if len(self.active_rooms[room_id]) == 0:
                    del self.active_rooms[room_id]
            del self.client_meta[websocket]
            logger.info(f"Client disconnected from room {room_id}")

    async def broadcast_to_room(self, room_id: str, message: dict, exclude: Optional[WebSocket] = None):
        if room_id in self.active_rooms:
            payload = json.dumps(message)
            for connection in self.active_rooms[room_id]:
                if connection != exclude:
                    try:
                        await connection.send_text(payload)
                    except Exception as e:
                        logger.error(f"Error broadcasting to client: {e}")

manager = ConnectionManager()
