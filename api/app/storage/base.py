from abc import ABC, abstractmethod


class StorageProvider(ABC):
    @abstractmethod
    def get_public_url(self, storage_key: str) -> str:
        pass

    @abstractmethod
    def exists(self, storage_key: str) -> bool:
        pass
