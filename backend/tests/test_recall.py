import asyncio
import cognee

async def main():

    results = await cognee.recall(
        query_text="What is Terraform apply?",
        datasets=["terraform"]
    )

    for result in results:
        print(result)

asyncio.run(main())