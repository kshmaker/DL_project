// import React, { useState, useEffect, useCallback } from "react";
// import Cropper, { Area } from "react-easy-crop";
// import getCroppedImg from "../utils/cropImage";

// type Props = {
//   onCropComplete: (blob: Blob) => void;
//   initialImageSrc?: string; // 캡처된 이미지나 업로드된 데이터URL
// };

// export default function CropImageUploader({
//   onCropComplete,
//   initialImageSrc,
// }: Props) {
//   const [imageSrc, setImageSrc] = useState<string | null>(
//     initialImageSrc || null
//   );
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);

//   // initialImageSrc가 바뀌면 반영
//   useEffect(() => {
//     if (initialImageSrc) setImageSrc(initialImageSrc);
//   }, [initialImageSrc]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => setImageSrc(reader.result as string);
//     reader.readAsDataURL(file);
//   };

//   const onCropDone = useCallback(
//     async (_: Area, croppedAreaPixels: Area) => {
//       if (imageSrc) {
//         const blob = await getCroppedImg(imageSrc, croppedAreaPixels, 256);
//         onCropComplete(blob);
//       }
//     },
//     [imageSrc, onCropComplete]
//   );

//   return (
//     <div className="space-y-2">
//       {!initialImageSrc && (
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//       )}
//       {imageSrc && (
//         <div className="relative w-full h-64 bg-gray-100">
//           <Cropper
//             image={imageSrc}
//             crop={crop}
//             zoom={zoom}
//             aspect={1}
//             onCropChange={setCrop}
//             onZoomChange={setZoom}
//             onCropComplete={onCropDone}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect, useCallback } from "react";
// import Cropper, { Area } from "react-easy-crop";
// import getCroppedImg from "../utils/cropImage";

// type Props = {
//   onCropComplete: (blob: Blob) => void;
//   initialImageSrc?: string;
// };

// export default function CropImageUploader({
//   onCropComplete,
//   initialImageSrc,
// }: Props) {
//   const [imageSrc, setImageSrc] = useState<string | null>(
//     initialImageSrc || null
//   );
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);

//   useEffect(() => {
//     if (initialImageSrc) setImageSrc(initialImageSrc);
//   }, [initialImageSrc]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => setImageSrc(reader.result as string);
//     reader.readAsDataURL(file);
//   };

//   const onCropDone = useCallback(
//     async (_: Area, croppedAreaPixels: Area) => {
//       if (imageSrc) {
//         const blob = await getCroppedImg(imageSrc, croppedAreaPixels, 256);
//         onCropComplete(blob);
//       }
//     },
//     [imageSrc, onCropComplete]
//   );

//   return (
//     <div className="space-y-2">
//       {/* {!initialImageSrc && (
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//       )} */}
//       {imageSrc && (
//         <div className="relative w-full h-64 bg-gray-100">
//           <Cropper
//             image={imageSrc}
//             crop={crop}
//             zoom={zoom}
//             aspect={1}
//             onCropChange={setCrop}
//             onZoomChange={setZoom}
//             onCropComplete={onCropDone}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect, useCallback } from "react";
// import Cropper, { Area } from "react-easy-crop";
// import getCroppedImg from "../utils/cropImage";

// type Props = {
//   onCropComplete: (blob: Blob) => void;
//   initialImageSrc?: string;
// };

// export default function CropImageUploader({
//   onCropComplete,
//   initialImageSrc,
// }: Props) {
//   const [imageSrc, setImageSrc] = useState<string | null>(
//     initialImageSrc || null
//   );
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);

//   useEffect(() => {
//     if (initialImageSrc) setImageSrc(initialImageSrc);
//   }, [initialImageSrc]);

//   const onCropDone = useCallback(
//     async (_: Area, croppedAreaPixels: Area) => {
//       if (imageSrc) {
//         const blob = await getCroppedImg(
//           imageSrc,
//           croppedAreaPixels,
//           1920,
//           1080
//         );
//         onCropComplete(blob);
//       }
//     },
//     [imageSrc, onCropComplete]
//   );

//   return (
//     <div className="space-y-2">
//       {imageSrc && (
//         <div className="relative w-full h-64 bg-gray-100">
//           <Cropper
//             image={imageSrc}
//             crop={crop}
//             zoom={zoom}
//             aspect={16 / 9}
//             onCropChange={setCrop}
//             onZoomChange={setZoom}
//             onCropComplete={onCropDone}
//           />
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";

type Props = {
  onCropComplete: (blob: Blob) => void;
  initialImageSrc?: string;
};

export default function CropImageUploader({
  onCropComplete,
  initialImageSrc,
}: Props) {
  const [imageSrc, setImageSrc] = useState<string | null>(
    initialImageSrc || null
  );
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (initialImageSrc) setImageSrc(initialImageSrc);
  }, [initialImageSrc]);

  const onCropDone = useCallback(
    async (_: Area, croppedAreaPixels: Area) => {
      if (imageSrc) {
        const blob = await getCroppedImg(
          imageSrc,
          croppedAreaPixels,
          1920,
          1080
        );
        onCropComplete(blob);
      }
    },
    [imageSrc, onCropComplete]
  );

  return (
    <div className="space-y-2">
      {imageSrc && (
        <div className="relative w-full h-64 bg-gray-100">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropDone}
          />
        </div>
      )}
    </div>
  );
}
