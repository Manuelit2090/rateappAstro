import type { APIRoute } from 'astro';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Cliente S3 configurado para Cloudflare R2
const s3 = new S3Client({
  region: 'auto',
  endpoint: import.meta.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: import.meta.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: import.meta.env.R2_SECRET_ACCESS_KEY || '',
  },
  // Evita problemas de cálculo de suma de comprobación en R2
  requestChecksumCalculation: 'WHEN_REQUIRED',
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const { filename, contentType } = await request.json();

    // Validar que el nombre exista
    if (typeof filename !== 'string' || !filename.trim()) {
      return new Response(
        JSON.stringify({ error: 'El nombre del archivo es obligatorio' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar tipo de contenido permitido
    const allowedContentTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
    const isValidContentType = typeof contentType === 'string' && allowedContentTypes.has(contentType);

    if (!isValidContentType) {
      return new Response(
        JSON.stringify({ error: 'El archivo debe ser una imagen válida (JPG, PNG o WEBP)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Nombre único para el archivo en R2
    const uniqueFilename = `${Date.now()}-${filename.trim().replace(/\s+/g, '_')}`;

    const command = new PutObjectCommand({
      Bucket: import.meta.env.R2_BUCKET_NAME,
      Key: uniqueFilename,
      ContentType: contentType, // Firmado de forma estricta con el MIME type
    });

    // Generar la URL firmada (válida por 120 segundos)
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 120 });

    // Construir la URL pública de la imagen
    const fileUrl = `${import.meta.env.R2_PUBLIC_DOMAIN}/${uniqueFilename}`;

    return new Response(
      JSON.stringify({ uploadUrl, fileUrl }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error generando la URL presignada:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Error al generar la URL de subida' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};