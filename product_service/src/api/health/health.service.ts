import { Injectable } from '@nestjs/common'
import {
  DiskHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus'

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}
  check() {
    return this.health.check([
      () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ])
  }
}
