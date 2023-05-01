import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from '@/modules/category/entities/category.entity';
import DatabaseModule from '@/modules/database/database.module';

import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
    imports: [
        /*
            将指定的实体类注册到当前模块的 TypeORM 模块中。
            category.service 中就可以通过注入 Repository<Category> 来使用 Category 实体类
        */
        TypeOrmModule.forFeature([Category]),
        /*
            使用 DatabaseModule.forRepository 方法注册了一个名为 users 的仓库，
            这样就可以在 category.service 中通过注入 Repository<Category> 来使用 Category 实体类
        */
        DatabaseModule.forRepository([CategoryRepository]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
