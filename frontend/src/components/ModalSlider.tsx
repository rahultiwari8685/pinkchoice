"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import { useMemo, useState } from "react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Link from "next/link";
import Image from "next/image";

interface Props {
  thumbnail?: string;
  gallery?: string[];
}

export default function ModalSlider({ thumbnail = "", gallery = [] }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const images = useMemo(() => {
    const arr = [];

    if (thumbnail) {
      arr.push(thumbnail);
    }

    if (gallery?.length) {
      arr.push(...gallery);
    }

    return arr;
  }, [thumbnail, gallery]);

  const hoverEffect = (e: any) => {
    const rect = e.target.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 50;
    const y = ((e.clientY - rect.top) / rect.height) * 50;

    e.target.style.cursor = "pointer";
    e.target.style.transition = "0.1s";
    e.target.style.transform = "scale(1.5)";
    e.target.style.transformOrigin = `${x}% ${y}%`;
  };

  const removeHover = (e: any) => {
    e.target.style.transform = "scale(1)";
  };

  return (
    <>
      <LightGallery plugins={[lgThumbnail, lgZoom]} selector=".DZoomImage">
        <Swiper
          className="quick-modal-swiper2"
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs]}
        >
          {images.map((img, index) => {
            const url = `https://api.pinkchoice.in/uploads/images/${img}`;

            return (
              <SwiperSlide key={index}>
                <div className="dz-media">
                  <Link
                    href={url}
                    data-src={url}
                    className="mfp-link lg-item DZoomImage"
                  >
                    <i className="feather icon-maximize dz-maximize top-right z-1" />
                  </Link>

                  <Image
                    src={url}
                    alt=""
                    width={600}
                    height={600}
                    onMouseEnter={hoverEffect}
                    onMouseLeave={removeHover}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </LightGallery>

      <Swiper
        className="quick-modal-swiper thumb-swiper-lg thumb-sm swiper-vertical"
        slidesPerView={4}
        spaceBetween={15}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Thumbs]}
        onSwiper={setThumbsSwiper}
      >
        {images.map((img, index) => {
          const url = `https://api.pinkchoice.in/uploads/images/${img}`;

          return (
            <SwiperSlide key={index}>
              <Image
                src={url}
                alt=""
                width={120}
                height={120}
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
