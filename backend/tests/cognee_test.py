import asyncio
import cognee

async def main():

    await cognee.forget(everything=True)

    await cognee.remember(
        "Cognee turns documents into AI memory."
    )

    results = await cognee.recall(
        query_text="What does Cognee do?"
    )

    for result in results:
        print(result.text)

asyncio.run(main())