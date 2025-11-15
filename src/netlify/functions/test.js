const handler = async (req) => {
    const { next_run } = await req.json()
    console.log("Received event! Next invocation at:", next_run)
}

export default handler

export const config = {
    schedule: "0 * * * *"
}