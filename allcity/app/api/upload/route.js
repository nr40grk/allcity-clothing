import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  if (req.headers.get('x-admin-token') !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'allcity/products' }, (err, res) => {
        if (err) reject(err); else resolve(res);
      }).end(buffer);
    });
    return NextResponse.json({ url: result.secure_url });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
