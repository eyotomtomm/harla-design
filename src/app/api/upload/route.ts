import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { requireAdmin } from '@/lib/require-admin';

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_WIDTH = 2000;

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'File is larger than 10 MB' }, { status: 413 });
    }

    // Decode with sharp: this both proves the payload is a real image and
    // strips metadata. Re-encode as WebP at a sensible size for the site.
    const input = Buffer.from(await file.arrayBuffer());
    let output: Buffer;
    try {
      output = await sharp(input, { limitInputPixels: 40_000_000 })
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();
    } catch {
      return NextResponse.json({ error: 'File is not a supported image' }, { status: 415 });
    }

    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.webp`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), output);

    return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
