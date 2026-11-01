import assert from "node:assert/strict";
import { mock } from "node:test";
import { Writable } from "node:stream";
import {
  v2 as cloudinary,
  type UploadApiOptions,
  type UploadApiResponse,
} from "cloudinary";
import { cloudinaryConfig, uploadImage } from "../src/lib/media/cloudinary";
import { isImageUrl } from "../src/lib/media/image-url";
import { postSchema, toRich } from "../src/lib/cms/model";
import { getPublishedPosts } from "../src/content/blog";
async function main() {
  const keys = [
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ] as const;
  const previous = keys.map((k) => process.env[k]);
  try {
    keys.forEach((k) => delete process.env[k]);
    assert.throws(cloudinaryConfig, /not configured/);
    process.env.CLOUDINARY_CLOUD_NAME = "test-shop";
    process.env.CLOUDINARY_API_KEY = "test-key";
    process.env.CLOUDINARY_API_SECRET = "test-secret";
    let options: UploadApiOptions | undefined;
    let received = Buffer.alloc(0);
    const stub = mock.method(
      cloudinary.uploader,
      "upload_stream",
      (
        opts: UploadApiOptions,
        callback: (error: unknown, result?: UploadApiResponse) => void,
      ) => {
        options = opts;
        return new Writable({
          write(chunk, _encoding, done) {
            received = Buffer.concat([received, chunk]);
            done();
          },
          final(done) {
            callback(undefined, {
              public_id: "tha-shop/test-image",
              version: 1,
              format: "jpg",
              width: 100,
              height: 80,
            } as UploadApiResponse);
            done();
          },
        });
      },
    );
    const bytes = Buffer.from("test-image-bytes");
    const image = await uploadImage(bytes);
    assert.deepEqual(received, bytes);
    assert.equal(options?.resource_type, "image");
    assert.equal(options?.overwrite, false);
    assert.deepEqual(options?.transformation, [
      { width: 1920, height: 1920, crop: "limit", quality: "auto" },
    ]);
    assert(
      image.url.startsWith(
        "https://res.cloudinary.com/test-shop/image/upload/",
      ),
    );
    assert(image.url.includes("f_auto"));
    assert(image.url.includes("q_auto"));
    assert(!JSON.stringify(image).includes("test-secret"));
    const original = getPublishedPosts()[0];
    assert(
      postSchema.safeParse({
        ...original,
        featuredImage: image.url,
        featuredImageAlt: "Shop photo",
        richContent: {
          type: "doc",
          content: [
            { type: "image", attrs: { src: image.url, alt: "Shop photo" } },
          ],
        },
      }).success,
    );
    assert(
      postSchema.safeParse({ ...original, richContent: toRich(original) })
        .success,
    );
    for (const url of [
      "https://attacker.example/image.jpg",
      "https://res.cloudinary.com.attacker.example/a/image/upload/x",
      "https://res.cloudinary.com/a/image/fetch/x",
      "http://res.cloudinary.com/a/image/upload/x",
      "//attacker.example/x",
      "javascript:alert(1)",
      "data:image/svg+xml,x",
    ])
      assert.equal(isImageUrl(url), false, url);
    assert(isImageUrl("/api/blog-images/existing"));
    assert(isImageUrl("/images/shop/hero-photo.jpg"));
    stub.mock.restore();
    mock.method(
      cloudinary.uploader,
      "upload_stream",
      (_opts: UploadApiOptions, callback: (error: unknown) => void) =>
        new Writable({
          write(_chunk, _encoding, done) {
            done();
          },
          final(done) {
            callback(new Error("upstream error with secret"));
            done();
          },
        }),
    );
    await assert.rejects(uploadImage(bytes), {
      message: "Image upload failed",
    });
    console.log(
      "PASS: signed upload options, resizing, optimized HTTPS URL, feature/inline validation, legacy images, unsafe URLs, missing credentials, sanitized upstream failures.",
    );
  } finally {
    mock.restoreAll();
    keys.forEach((k, i) => {
      if (previous[i] === undefined) delete process.env[k];
      else process.env[k] = previous[i];
    });
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
