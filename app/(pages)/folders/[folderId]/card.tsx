'use client';

import Image from 'next/image';

export default function ToolCard({
  name,
  image,
  quantity,
  description,
}: ToolCardProps) {
  return (
    <article className="group relative bg-gray-50 gap-5 w-full flex flex-col rounded-xl p-4 transition-all cursor-pointer duration-300">
      <>
        <span className="absolute top-0 right-0 p-3"></span>
      </>
      <>
        <div className="flex w-full rounded-xl overflow-hidden aspect-video items-center justify-center grow-0 h-[175px]">
          {image ? (
            <Image
              draggable={false}
              src={'/uploads/' + image.id + '.' + image.extension}
              alt="Failed to load resource."
              className="flex w-full object-fill"
              width={475}
              height={475}
            />
          ) : (
            <svg
              width={475}
              height={475}
              className="flex h-2/3 fill-slate-300"
              viewBox="0 0 512 512"
            >
              <path d="M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7L336 192c-8.8 0-16-7.2-16-16l0-57.4c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
            </svg>
          )}
        </div>
      </>
      <span className="flex flex-col w-full">
        <>
          <span className="flex w-full justify-between">
            <p className="font-medium text-lg truncate text-ellipsis">{name}</p>
            <span className="px-4 rounded-full bg-green-300/10 text-green-700 items-center justify-center flex">
              {quantity}
            </span>
          </span>
        </>
        <>
          {!!description && (
            <>
              <p className="text-sm text-gray-500 line-clamp-3">
                {description}
              </p>
            </>
          )}
        </>
      </span>
    </article>
  );
}

interface ToolCardProps {
  folderId: string | null;
  name: string;
  id: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  image: {
    id: string;
    extension: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  imageId: string | null;
}
