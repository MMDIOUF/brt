"""Custom provider implementation."""

from typing import Any
from loguru import logger

from providers.base import ProviderConfig
from providers.openai_compat import OpenAIChatTransport
from core.anthropic import build_base_request_body, ReasoningReplayMode
from core.anthropic.conversion import OpenAIConversionError
from providers.exceptions import InvalidRequestError

class CustomProvider(OpenAIChatTransport):
    """Generic OpenAI-compatible provider."""

    def __init__(self, config: ProviderConfig):
        super().__init__(
            config,
            provider_name="Custom",
            base_url=config.base_url,
            api_key=config.api_key,
        )

    def _build_request_body(
        self, request: Any, thinking_enabled: bool | None = None
    ) -> dict:
        """Build OpenAI-format request body from Anthropic request."""
        thinking = self._is_thinking_enabled(request, thinking_enabled)
        try:
            body = build_base_request_body(
                request,
                reasoning_replay=ReasoningReplayMode.REASONING_CONTENT
                if thinking
                else ReasoningReplayMode.DISABLED,
            )
        except OpenAIConversionError as exc:
            raise InvalidRequestError(str(exc)) from exc
        
        # Standardize model name (remove provider prefix if present)
        # This allows users to use 'custom/model-name' in .env
        if "/" in body.get("model", ""):
            body["model"] = body["model"].split("/", 1)[1]
            
        return body
