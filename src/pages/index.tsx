import { useState } from 'react';
import Map from '@/components/Map';
import Markers from '@/components/Markers';
import StoreBox from '@/components/StoreBox';
import { StoreType } from '@/interface';
import axios from 'axios';

export default function Home({ stores }: { stores: StoreType[] }) {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  return (
    <>
      <Map setMap={setMap} />
      <Markers stores={stores} map={map} setCurrentStore={setCurrentStore} />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}

// 정적인 데이터를 가져옴
export async function getStaticProps() {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API}/api/stores`);

  return {
    props: { stores: stores.data },
    revalidate: 60 * 60, // 60분마다 업데이트함
  };
}
