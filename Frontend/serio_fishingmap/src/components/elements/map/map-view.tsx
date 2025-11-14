// "use client";

// // eslint-disable-next-line import/order
// import { useEffect, useRef } from "react";
// import { Box } from "@chakra-ui/react";
// // eslint-disable-next-line import/order
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   ScaleControl,
//   ZoomControl,
// } from "react-leaflet";
// import L from "leaflet";

// // Next.js のバンドル環境でデフォルトのマーカー画像パスが欠ける問題を補正
// // （これをしないとピンが表示されないことがあります）
// import "leaflet/dist/leaflet.css";
// import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// // 既存の _getIconUrl をクリアしてパスを再設定
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-expect-error
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl,
//   iconUrl,
//   shadowUrl,
// });

// type Props = {
//   height?: string | number;
//   center?: [number, number];
//   zoom?: number;
// };

// export default function MapView({
//   height = "60vh",
//   center = [35.6804, 139.769], // 東京駅あたり
//   zoom = 13,
// }: Props) {
//   // MapContainer はクライアント専用。ここでは特に副作用は不要ですが、例として記載
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   useEffect(() => {}, []);

//   const mapRef = useRef<HTMLDivElement>(null);

//   return (
//     <Box borderWidth="1px" rounded="2xl" overflow="hidden">
//       <MapContainer
//         center={center}
//         zoom={zoom}
//         ref={mapRef}
//         scrollWheelZoom
//         // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//         style={{ height: typeof height === "number" ? `${height}px` : height }}
//         zoomControl={false} // 右上に移動するため一旦消す
//       >
//         <TileLayer
//           // OpenStreetMap タイル
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           // 表示上 OSM のクレジットは必須
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {/* スケールとズームコントロール */}
//         <ScaleControl position="bottomleft" />
//         <ZoomControl position="topright" />

//         {/* サンプルのマーカー（東京駅） */}
//         <Marker position={[35.681236, 139.767125]}>
//           <Popup>
//             東京駅
//             <br />
//             （サンプル）
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </Box>
//   );
// }
