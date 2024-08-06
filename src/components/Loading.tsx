export default function Loading() {
  return (
    <>
      {[...Array(10)].map((e, i) => (
        <div
          className='w-full h-20 animate-pulse bg-gray-200 rounded-md mt-2'
          key={i}
        ></div>
      ))}
    </>
  );
}
