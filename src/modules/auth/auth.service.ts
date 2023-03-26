import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { DatabaseUtilService } from 'src/shared/services/database-util.service';
import { DataSource, EntityManager, Like, QueryRunner, Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectDataSource()
        private readonly dataSource: DataSource,
        private readonly databaseUtilService: DatabaseUtilService
    ) {
    }

    async login() {
        const users = this.databaseUtilService.executeTransaction(this.dataSource, async (queryRunner: QueryRunner) => {
            return await queryRunner.manager.find(UserEntity, {
                where: {
                    username: Like('%thang%')
                }
            })
        })


        return users
    }
}
