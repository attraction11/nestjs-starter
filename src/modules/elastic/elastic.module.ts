import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule, ElasticsearchModuleOptions } from '@nestjs/elasticsearch';

@Module({})
export class ElasticModule {
    static forRoot(): DynamicModule {
        return {
            global: true,
            module: ElasticModule,
            imports: [
                // 在当前已经存在的模块中，异步注册一个动态模块
                ElasticsearchModule.registerAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory(configService: ConfigService): ElasticsearchModuleOptions {
                        const elasticConfig = configService.get('elastic_config');
                        return { ...elasticConfig };
                    },
                }),
            ],
            exports: [ElasticsearchModule],
        };
    }
}
