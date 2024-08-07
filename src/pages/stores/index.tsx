import Image from 'next/image';
import { StoreApiResponse, StoreType } from '@/interface';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loading from '@/components/Loading';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination';

export default function StoreListPage() {
  const router = useRouter();
  const { page = '1' }: any = router.query; // 페이지는 기본적으로 0으로 설정

  // useQuery로 데이터 가져오기 (현재 페이지에 해당하는 데이터를 가져옴)
  const {
    isLoading,
    isError,
    data: stores, // 이렇게 data의 이름을 stores로 지정할 수 있음
  } = useQuery(`stores-${page}`, async () => {
    // page마다 쿼리키가 달라야 함
    const { data } = await axios(`/api/stores?page=${page}`);
    return data as StoreApiResponse;
  });

  if (isError) {
    return (
      <div className='w-full h-screen mx-auto pt-[30%] text-red-500 text-center font-semibold'>
        다시 시도해주세요
      </div>
    );
  }

  return (
    <div className='px-4 md:max-w-4xl mx-auto py-8'>
      <ul role='list' className='divide-y divide-gray-100'>
        {isLoading ? (
          <Loading />
        ) : (
          stores?.data?.map((store, index) => (
            <li className='flex justify-between gap-x-6 py-5' key={index}>
              <div className='flex gap-4'>
                <Image
                  src={
                    store?.category
                      ? `/images/markers/${store?.category}.png`
                      : '/images/markers/default.png'
                  }
                  width={48}
                  height={48}
                  alt='아이콘 이미지'
                />
                <div>
                  <div className='text-sm font-semibold leading-6 text-gray-900'>
                    {store?.name}
                  </div>
                  <div className='mt-1 text-xs truncate font-semibold leading-5 text-gray-500'>
                    {store?.storeType}
                  </div>
                </div>
              </div>

              <div className='hidden sm:flex sm:flex-col sm:items-end'>
                <div className='text-sm font-semibold leading-6 text-gray-900'>
                  {store?.address}
                </div>
                <div className='mt-1 text-xs truncate font-semibold leading-5 text-gray-500'>
                  {store?.phone || '번호없음'} | {store?.foodCertifyName} |{' '}
                  {store?.category}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Pagination 부분 */}
      {stores?.totalPage && (
        <Pagination total={stores?.totalPage} page={page} />
      )}
    </div>
  );
}
