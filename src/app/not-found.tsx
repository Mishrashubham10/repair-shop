import Image from 'next/image';

export const metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div className="px-2 w-full">
      <div className="mx-auto min-h-screen py-4 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl">Page Not Found</h2>
        <Image
          src="/images/not-found-1024x1024.png"
          className="m-0 rounded-xl"
          width={300}
          height={300}
          sizes="300px"
          alt="Page Not Found"
          title="Page Not Found"
          priority={true}
        />
      </div>
    </div>
  );
}
