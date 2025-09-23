import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { EmailModule } from './email/email.module';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { RatingsModule } from './ratings/ratings.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    EmailModule,
    UsersModule,
    RecipesModule,
    RatingsModule,
    CloudinaryModule,
    StatsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
