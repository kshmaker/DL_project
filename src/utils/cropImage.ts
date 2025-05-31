// export default function getCroppedImg(
//   imageSrc: string,
//   pixelCrop: { x: number; y: number; width: number; height: number },
//   outputSize: number
// ): Promise<Blob> {
//   return new Promise((resolve, reject) => {
//     const image = new Image();
//     image.src = imageSrc;
//     image.crossOrigin = "anonymous";

//     image.onload = () => {
//       const canvas = document.createElement("canvas");
//       canvas.width = outputSize;
//       canvas.height = outputSize;
//       const ctx = canvas.getContext("2d");

//       if (!ctx) {
//         reject(new Error("canvas not supported"));
//         return;
//       }

//       ctx.drawImage(
//         image,
//         pixelCrop.x,
//         pixelCrop.y,
//         pixelCrop.width,
//         pixelCrop.height,
//         0,
//         0,
//         outputSize,
//         outputSize
//       );

//       canvas.toBlob((blob) => {
//         if (blob) resolve(blob);
//         else reject(new Error("blob 생성 실패"));
//       }, "image/jpeg");
//     };

//     image.onerror = (err) => reject(err);
//   });
// }

// export default function getCroppedImg(
//   imageSrc: string,
//   pixelCrop: { x: number; y: number; width: number; height: number },
//   outputSize: number
// ): Promise<Blob> {
//   return new Promise((resolve, reject) => {
//     const image = new Image();
//     image.src = imageSrc;
//     image.crossOrigin = "anonymous";

//     image.onload = () => {
//       const canvas = document.createElement("canvas");
//       canvas.width = outputSize;
//       canvas.height = outputSize;
//       const ctx = canvas.getContext("2d");
//       if (!ctx) {
//         reject(new Error("canvas not supported"));
//         return;
//       }
//       ctx.drawImage(
//         image,
//         pixelCrop.x,
//         pixelCrop.y,
//         pixelCrop.width,
//         pixelCrop.height,
//         0,
//         0,
//         outputSize,
//         outputSize
//       );

//       canvas.toBlob((blob) => {
//         if (blob) resolve(blob);
//         else reject(new Error("blob 생성 실패"));
//       }, "image/jpeg");
//     };

//     image.onerror = (err) => reject(err);
//   });
// }

export default function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  outputWidth: number,
  outputHeight: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous";

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("canvas not supported"));
        return;
      }

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        outputWidth,
        outputHeight
      );

      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("blob 생성 실패"));
      }, "image/jpeg");
    };

    image.onerror = (err) => reject(err);
  });
}
