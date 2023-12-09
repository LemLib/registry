import { Module } from '@nestjs/common';
import { StorageProvider } from './storage.service';
import { StorageLocalProviderService } from './storage-local-provider.service';

@Module({
  controllers: [],
  providers: [
    { provide: StorageProvider, useClass: StorageLocalProviderService },
  ],
})
export class StorageModule {}
