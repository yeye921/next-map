import { NextApiRequest, NextApiResponse } from 'next';
import { StoreApiResponse, StoreType } from '@/interface';
import { PrismaClient } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse>
) {
  const { page = '1' }: { page?: string } = req.query; // req 가져옴
  const skipPage = parseInt(page) - 1; // 건너뛸 페이지

  const prisma = new PrismaClient();
  const count = await prisma.store.count();
  const stores = await prisma.store.findMany({
    orderBy: { id: 'desc' },
    take: 10, // 한번에 10개의 데이터만 가져옴
    skip: skipPage * 10, // 건너뛸 데이터들
  });

  // totalPage, data, page, totalCount

  res.status(200).json({
    page: parseInt(page),
    data: stores,
    totalCount: count, // 총 레코드의 개수 넘겨줌
    totalPage: Math.ceil(count / 10),
  });
}
