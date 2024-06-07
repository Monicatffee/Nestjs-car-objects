import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//Punto de entrada a nuestra aplicacion
async function main() {
  const app = await NestFactory.create(AppModule);
  //Valida las rutas con DTO esto a nivel global
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true, //Elimina la data basura no especificada en el DTO (Sin error)
      // forbidNonWhitelisted: true //Saca error por las propiedades basura o no reconocidas
    })
  );
  await app.listen(3000);
}
main();
