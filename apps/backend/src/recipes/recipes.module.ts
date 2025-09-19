import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { SupabaseModule } from 'src/common/supabase/supabase.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, SupabaseModule, AuthModule],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipesModule {}