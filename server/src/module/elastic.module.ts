import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'https://localhost:9200',
      auth: {
        apiKey: 'WHBTTXY1QUJNQWdNblVLQ0E4cVU6bkpWQ3RaOG1SWDZ5dHBHaUtUeHpUUQ==',
      },
      tls: {
        rejectUnauthorized: false,
      },
    }),
  ],
  exports: [ElasticsearchModule],
})
export class ElasticModule {}
