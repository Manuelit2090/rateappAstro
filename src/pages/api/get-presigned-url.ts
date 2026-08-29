import type { APIRoute } from 'astro';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: 'auto',
  endpoint: import.meta.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: import.meta.env.R2_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.R2_SECRET_ACCESS_KEY,
  },
  // R2 no necesita checksums opcionales; evita que el presigner los añada a la URL.
  requestChecksumCalculation: 'WHEN_REQUIRED',
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const { filename, contentType } = await request.json();

    if (typeof filename !== 'string' || !filename.trim()) {
      return new Response(JSON.stringify({ error: 'El nombre del archivo es obligatorio' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const allowedContentTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
    const isValidContentType = typeof contentType === 'string'
      && allowedContentTypes.has(contentType);

    if (!isValidContentType) {
      return new Response(JSON.stringify({ error: 'El archivo debe ser una imagen válida' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Generar un nombre único para evitar colisiones
    const uniqueFilename = `${Date.now()}-${filename.trim()}`;
    
    const command = new PutObjectCommand({
      Bucket: import.meta.env.R2_BUCKET_NAME,
      Key: uniqueFilename,
      ContentType: contentType,
    });

    // La URL firmada expirará en 60 segundos
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
    
    // Construir el enlace final de consumo
    const fileUrl = `${import.meta.env.R2_PUBLIC_DOMAIN}/${uniqueFilename}`;

    return new Response(JSON.stringify({ uploadUrl, fileUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error generando la URL' }), { status: 500 });
  }
};
