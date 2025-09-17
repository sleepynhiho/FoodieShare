import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { VersioningType, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  // Enable URI versioning
  app.enableVersioning({
    type: VersioningType.URI, // other options: HEADER, MEDIA_TYPE, CUSTOM
    defaultVersion: "1",      // optional default version
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // remove properties not in DTO
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: true, 
    credentials: true               
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
