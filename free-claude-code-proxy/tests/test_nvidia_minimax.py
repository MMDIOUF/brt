from openai import OpenAI

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="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"
)

def test_nvidia_minimax():
    completion = client.chat.completions.create(
        model="minimaxai/minimax-m2.7",
        messages=[{"role": "user", "content": "Bonjour, peux-tu te présenter ?"}],
        temperature=1,
        top_p=0.95,
        max_tokens=8192,
        stream=True
    )
    for chunk in completion:
        if not getattr(chunk, "choices", None):
            continue
        if chunk.choices[0].delta.content is not None:
            print(chunk.choices[0].delta.content, end="")

if __name__ == "__main__":
    test_nvidia_minimax()
