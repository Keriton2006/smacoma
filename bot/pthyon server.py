import asyncio
import websockets
import json
import random

AI_RESPONSES = [
    "Processing your input... Here's my analysis: ",
    "Interesting perspective! My AI circuits suggest: ",
    "Computing response... ",
    "After careful consideration, I conclude: "
]

async def handler(websocket, path):
    try:
        async for message in websocket:
            data = json.loads(message)
            # More AI-like response
            prefix = random.choice(AI_RESPONSES)
            response = {
                "message": f"{prefix}'{data['message']}' sounds fascinating!",
                "timestamp": asyncio.get_event_loop().time(),
                "status": "online",
                "typing": False
            }
            # Simulate typing delay
            await asyncio.sleep(0.5)
            await websocket.send(json.dumps(response))
    except websockets.ConnectionClosed:
        print("Client disconnected")

async def main():
    server = await websockets.serve(
        handler,
        "localhost",
        8765
    )
    print("AI Chat server running on ws://localhost:8765")
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())